import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import type { Trajectory } from '../api'

function disposeObject(root: THREE.Object3D) {
  root.traverse((child) => {
    if (!(child instanceof THREE.Mesh || child instanceof THREE.Line || child instanceof THREE.LineSegments)) return
    child.geometry.dispose()
    const materials = Array.isArray(child.material) ? child.material : [child.material]
    materials.forEach((material) => material.dispose())
  })
}

export function TrajectoryCanvas({ trajectory, activeIndex }: {
  trajectory: Trajectory; activeIndex: number
}) {
  const hostRef = useRef<HTMLDivElement>(null)
  const cameraGlyphRef = useRef<THREE.Group | null>(null)

  useEffect(() => {
    const host = hostRef.current
    if (!host || trajectory.points.length === 0) return

    const scene = new THREE.Scene()
    scene.background = new THREE.Color('#171717')

    const points = trajectory.points.map((point) => new THREE.Vector3(...point.positionXYZ))
    const bounds = new THREE.Box3().setFromPoints(points)
    const center = bounds.getCenter(new THREE.Vector3())
    const size = bounds.getSize(new THREE.Vector3())
    const extent = Math.max(size.x, size.y, size.z, 1e-3)
    const displayScale = Math.max(extent, 1)

    const camera = new THREE.PerspectiveCamera(
      48,
      Math.max(host.clientWidth, 1) / Math.max(host.clientHeight, 1),
      Math.max(displayScale / 1000, 0.001),
      displayScale * 100,
    )
    const viewOffset = new THREE.Vector3(1.35, 1.05, 1.55).normalize().multiplyScalar(displayScale * 2.4)
    camera.position.copy(viewOffset)
    camera.lookAt(0, 0, 0)

    const renderer = new THREE.WebGLRenderer({ antialias: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setSize(host.clientWidth, host.clientHeight)
    host.appendChild(renderer.domElement)

    const content = new THREE.Group()
    content.position.copy(center).multiplyScalar(-1)
    scene.add(content)

    const trajectoryGeometry = new THREE.BufferGeometry().setFromPoints(points)
    content.add(new THREE.Line(trajectoryGeometry, new THREE.LineBasicMaterial({ color: '#70f000' })))

    const gridSize = displayScale * 2.8
    const grid = new THREE.GridHelper(gridSize, 14, '#f5f0e8', '#444444')
    grid.position.set(center.x, bounds.min.y - displayScale * 0.08, center.z)
    content.add(grid)

    const axes = new THREE.AxesHelper(displayScale * 0.22)
    axes.position.copy(points[0])
    content.add(axes)

    const start = new THREE.Mesh(
      new THREE.SphereGeometry(displayScale * 0.025, 16, 12),
      new THREE.MeshBasicMaterial({ color: '#70f000' }),
    )
    start.position.copy(points[0])
    content.add(start)

    const glyphSize = displayScale * 0.12
    const glyphVertices = [
      0, 0, 0, -glyphSize, -glyphSize * 0.7, glyphSize * 1.5,
      0, 0, 0, glyphSize, -glyphSize * 0.7, glyphSize * 1.5,
      0, 0, 0, glyphSize, glyphSize * 0.7, glyphSize * 1.5,
      0, 0, 0, -glyphSize, glyphSize * 0.7, glyphSize * 1.5,
      -glyphSize, -glyphSize * 0.7, glyphSize * 1.5, glyphSize, -glyphSize * 0.7, glyphSize * 1.5,
      glyphSize, -glyphSize * 0.7, glyphSize * 1.5, glyphSize, glyphSize * 0.7, glyphSize * 1.5,
      glyphSize, glyphSize * 0.7, glyphSize * 1.5, -glyphSize, glyphSize * 0.7, glyphSize * 1.5,
      -glyphSize, glyphSize * 0.7, glyphSize * 1.5, -glyphSize, -glyphSize * 0.7, glyphSize * 1.5,
    ]
    const glyphGeometry = new THREE.BufferGeometry()
    glyphGeometry.setAttribute('position', new THREE.Float32BufferAttribute(glyphVertices, 3))
    const glyph = new THREE.Group()
    glyph.add(new THREE.LineSegments(glyphGeometry, new THREE.LineBasicMaterial({ color: '#ff5c35' })))
    glyph.add(new THREE.AxesHelper(glyphSize * 0.9))
    cameraGlyphRef.current = glyph
    content.add(glyph)

    let drag = false
    let previousX = 0
    let previousY = 0
    const down = (event: PointerEvent) => {
      drag = true
      previousX = event.clientX
      previousY = event.clientY
      renderer.domElement.setPointerCapture?.(event.pointerId)
    }
    const move = (event: PointerEvent) => {
      if (!drag) return
      content.rotation.y += (event.clientX - previousX) * 0.008
      content.rotation.x += (event.clientY - previousY) * 0.005
      previousX = event.clientX
      previousY = event.clientY
    }
    const up = () => { drag = false }

    renderer.domElement.addEventListener('pointerdown', down)
    window.addEventListener('pointermove', move)
    window.addEventListener('pointerup', up)

    let raf = 0
    const draw = () => {
      renderer.render(scene, camera)
      raf = requestAnimationFrame(draw)
    }
    draw()

    const resize = () => {
      camera.aspect = Math.max(host.clientWidth, 1) / Math.max(host.clientHeight, 1)
      camera.updateProjectionMatrix()
      renderer.setSize(host.clientWidth, host.clientHeight)
    }
    window.addEventListener('resize', resize)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
      window.removeEventListener('pointermove', move)
      window.removeEventListener('pointerup', up)
      renderer.domElement.removeEventListener('pointerdown', down)
      cameraGlyphRef.current = null
      disposeObject(content)
      renderer.dispose()
      host.replaceChildren()
    }
  }, [trajectory])

  useEffect(() => {
    const point = trajectory.points[Math.min(activeIndex, trajectory.points.length - 1)]
    const glyph = cameraGlyphRef.current
    if (!glyph || !point) return
    glyph.position.set(...point.positionXYZ)
    glyph.quaternion.set(...point.orientationXYZW).normalize()
  }, [activeIndex, trajectory])

  return <div className="trajectory-canvas" ref={hostRef} aria-label="可交互三维相机轨迹与当前相机朝向" />
}
