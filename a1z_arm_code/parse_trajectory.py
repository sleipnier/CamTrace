"""Parse camera trajectory JSON → arm joint-space waypoints (JSON).

Transforms camera local-space motion into arm workspace using a
camera→base transformation, then runs DLS IK to get joint positions.

Camera coordinate convention (from JSON):
  x_right  → arm +Y (lateral)
  y_down   → arm -Z (gravity)
  z_forward → arm +X (forward)

Usage:
    python parse_trajectory.py [--input data/camera_trajectory.json] [--output location/traj.json]
"""

import argparse
import json
import os
import sys
from pathlib import Path

import numpy as np
import pinocchio as pin

SKILL_DIR = Path(__file__).resolve().parent
DEFAULT_TRAJ = SKILL_DIR / "data" / "camera_cartesian_trajectory.json"
DEFAULT_OUT = SKILL_DIR / "location" / "trajectory_waypoints.json"

# --- Transformation parameters ---
# Arm neutral EE pose in base frame (from FK):
NEUTRAL_EE = np.array([0.2205, 0.025, 0.3133])  # m
# Camera start position in base frame (at neutral)
CAM_START_IN_BASE = NEUTRAL_EE.copy()

# Rotation: camera frame → arm base frame
#   cam.x_right  → arm +Y
#   cam.y_down   → arm -Z
#   cam.z_forward → arm +X
_CAM_R_base = np.array([
    [0,  0,  1],   # arm.x = cam.z_forward
    [1,  0,  0],   # arm.y = cam.x_right
    [0, -1,  0],   # arm.z = -cam.y_down
])

# Default scale: ~1.5m camera range → ~0.15m arm range
DEFAULT_SCALE = 0.10

# IK parameters
IK_DAMPING = 1e-6
IK_MAX_ITER = 500
IK_POS_TOL = 1e-4
IK_ORI_TOL = 1e-4

# Waypoint sampling: every N frames (30fps source, ~0.033s/frame)
WAYPOINT_INTERVAL = 10  # every 10 frames ≈ every 0.33s

# Fixed orientation in base frame (neutral gripper pitch ≈ -18°)
_GRIPPER_R_BASE = pin.rpy.rpyToMatrix(np.deg2rad([0, -18, 0]))

EE_FRAME = "gripper_finger_rIght_link"


def build_kin(urdf_path: str) -> tuple:
    from a1z.robots.kinematics import Kinematics as SDKKinematics

    sdk_kin = SDKKinematics(urdf_path, end_effector_frame=EE_FRAME)
    model = sdk_kin._model
    data = model.createData()
    fid = sdk_kin._frame_id
    q_lower = sdk_kin._q_lower.copy()
    q_upper = sdk_kin._q_upper.copy()
    return model, data, fid, q_lower, q_upper


def solve_ik(model, data, fid, q_lower, q_upper,
             target_pos, target_rot, init_q) -> tuple[bool, np.ndarray]:
    target_se3 = pin.SE3(target_rot, target_pos)
    q = np.clip(init_q.copy(), q_lower, q_upper)

    for _ in range(IK_MAX_ITER):
        pin.forwardKinematics(model, data, q)
        pin.updateFramePlacements(model, data)
        oMf = data.oMf[fid]
        err_se3 = pin.log6(oMf.actInv(target_se3))
        err = err_se3.vector

        pos_err = np.linalg.norm(err[:3])
        ori_err = np.linalg.norm(err[3:])
        if pos_err <= IK_POS_TOL and ori_err <= IK_ORI_TOL:
            return True, q

        J = pin.computeFrameJacobian(model, data, q, fid, pin.LOCAL)
        JtJ = J.T @ J + IK_DAMPING * np.eye(model.nv)
        dq = np.linalg.solve(JtJ, J.T @ err)
        q = pin.integrate(model, q, dq)
        q = np.clip(q, q_lower, q_upper)

    return False, q


def transform_cam_to_base(cam_xyz: np.ndarray, scale: float) -> np.ndarray:
    scaled = cam_xyz * scale
    return CAM_START_IN_BASE + _CAM_R_base @ scaled


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument(
        "--input", "-i",
        default=str(DEFAULT_TRAJ),
        help=f"Input camera trajectory JSON (default: {DEFAULT_TRAJ})",
    )
    parser.add_argument(
        "--output", "-o",
        default=str(DEFAULT_OUT),
        help=f"Output waypoints JSON (default: {DEFAULT_OUT})",
    )
    parser.add_argument(
        "--interval", "-n",
        type=int,
        default=WAYPOINT_INTERVAL,
        help=f"Sample every N frames (default: {WAYPOINT_INTERVAL})",
    )
    parser.add_argument(
        "--scale", "-s",
        type=float,
        default=DEFAULT_SCALE,
        help=f"Displacement scale (camera m → arm m, default: {DEFAULT_SCALE})",
    )
    args = parser.parse_args()

    traj_path = Path(args.input)
    if not traj_path.exists():
        traj_path = SKILL_DIR / args.input
    if not traj_path.exists():
        print(f"ERROR: trajectory not found: {args.input}")
        return 1

    out_path = Path(args.output)
    out_path.parent.mkdir(parents=True, exist_ok=True)

    with open(traj_path) as f:
        traj = json.load(f)
    points = traj["points"]
    print(f"[parse] loaded {len(points)} camera frames from {traj_path.name}")
    print(f"[parse] scale={args.scale}, interval={args.interval}")

    sdk_path = SKILL_DIR / "GALAXEA-A1Z" / "a1z" / "robot_models" / "a1z" / "A1Z_G1Z.urdf"
    if not sdk_path.exists():
        print(f"ERROR: URDF not found at {sdk_path}")
        return 1
    sys.path.insert(0, str(SKILL_DIR / "GALAXEA-A1Z"))
    model, data, fid, q_lower, q_upper = build_kin(str(sdk_path))
    print(f"[parse] kin ready: nframes={model.nframes} fid={fid}")

    sampled = points[::args.interval]
    if points[-1] not in sampled:
        sampled = sampled + [points[-1]]

    print(f"[parse] sampled {len(sampled)} waypoints")

    waypoints = []
    init_q = np.deg2rad(np.array([0.0, 34.0, -23.0, -29.0, 0.0, 0.0]))
    prev_q = init_q.copy()

    for i, pt in enumerate(sampled):
        cam_xyz = np.array(pt["position_xyz"])
        base_pos = transform_cam_to_base(cam_xyz, args.scale)

        base_pos[0] = np.clip(base_pos[0], 0.12, 0.35)
        base_pos[1] = np.clip(base_pos[1], -0.20, 0.25)
        base_pos[2] = np.clip(base_pos[2], 0.12, 0.42)

        ok, q = solve_ik(model, data, fid, q_lower, q_upper, base_pos, _GRIPPER_R_BASE, prev_q)

        if not ok:
            print(f"  [WP {i+1}/{len(sampled)}] IK failed at t={pt['time_from_start_s']:.2f}s — using prev")
            q = prev_q
        else:
            max_jump = np.max(np.abs(q - prev_q))
            if max_jump > 0.5:
                print(f"  [WP {i+1}/{len(sampled)}] jump {np.degrees(max_jump):.1f}deg too large — clipping")
                q = prev_q + np.clip(q - prev_q, -0.5, 0.5)

        waypoints.append({
            "frame_index": pt.get("frame_index", i * args.interval),
            "time_from_start_s": pt["time_from_start_s"],
            "camera_xyz": cam_xyz.tolist(),
            "base_xyz": base_pos.tolist(),
            "joint_deg": np.degrees(q).tolist(),
        })
        prev_q = q.copy()

        if (i + 1) % 20 == 0 or i == 0:
            print(f"  [{i+1}/{len(sampled)}] base=({base_pos[0]:.3f},{base_pos[1]:.3f},{base_pos[2]:.3f}) "
                  f"→ joints={np.round(np.degrees(q), 1).tolist()}")

    output = {
        "schema_version": 1,
        "type": "arm_waypoints_from_camera",
        "source": str(traj_path.name),
        "displacement_scale": args.scale,
        "camera_to_base_rotation": _CAM_R_base.tolist(),
        "neutral_ee_base": NEUTRAL_EE.tolist(),
        "gripper_orientation_deg": [0, -18, 0],
        "num_waypoints": len(waypoints),
        "waypoints": waypoints,
    }
    with open(out_path, "w") as f:
        json.dump(output, f, indent=2)
    print(f"[parse] saved {len(waypoints)} waypoints to {out_path}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
