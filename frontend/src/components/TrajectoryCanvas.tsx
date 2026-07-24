import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import type { Trajectory } from '../api'

export function TrajectoryCanvas({ trajectory, activeIndex }: {
  trajectory: Trajectory; activeIndex: number
}) {
  const hostRef = useRef<HTMLDivElement>(null)
  const markerRef = useRef<THREE.Mesh | null>(null)

  useEffect(() => {
    const host = hostRef.current
    if (!host) return
    const scene = new THREE.Scene()
    scene.background = new THREE.Color('#171717')
    const camera = new THREE.PerspectiveCamera(48, host.clientWidth / host.clientHeight, 0.1, 100)
    camera.position.set(5.2, 4.2, 6.5)
    camera.lookAt(1, 0.4, 0)
    const renderer = new THREE.WebGLRenderer({ antialias: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setSize(host.clientWidth, host.clientHeight)
    host.appendChild(renderer.domElement)

    const points = trajectory.points.map((p) => new THREE.Vector3(...p.positionXYZ))
    const geometry = new THREE.BufferGeometry().setFromPoints(points)
    scene.add(new THREE.Line(geometry, new THREE.LineBasicMaterial({ color: '#70f000' })))

    const grid = new THREE.GridHelper(12, 12, '#f5f0e8', '#444444')
    grid.position.y = -1.4
    scene.add(grid)
    scene.add(new THREE.AxesHelper(1.2))

    const marker = new THREE.Mesh(
      new THREE.BoxGeometry(0.24, 0.24, 0.24),
      new THREE.MeshBasicMaterial({ color: '#ff5c35' }),
    )
    markerRef.current = marker
    scene.add(marker)
    const start = new THREE.Mesh(new THREE.SphereGeometry(0.12), new THREE.MeshBasicMaterial({ color: '#70f000' }))
    start.position.copy(points[0])
    scene.add(start)

    let drag = false
    let previousX = 0
    let previousY = 0
    const group = new THREE.Group()
    scene.children.filter((child) => child !== camera).forEach((child) => group.add(child))
    scene.add(group)
    const down = (event: PointerEvent) => { drag = true; previousX = event.clientX; previousY = event.clientY }
    const move = (event: PointerEvent) => {
      if (!drag) return
      group.rotation.y += (event.clientX - previousX) * 0.008
      group.rotation.x += (event.clientY - previousY) * 0.005
      previousX = event.clientX; previousY = event.clientY
    }
    const up = () => { drag = false }
    renderer.domElement.addEventListener('pointerdown', down)
    window.addEventListener('pointermove', move)
    window.addEventListener('pointerup', up)
    let raf = 0
    const draw = () => { renderer.render(scene, camera); raf = requestAnimationFrame(draw) }
    draw()
    const resize = () => {
      camera.aspect = host.clientWidth / host.clientHeight
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
      geometry.dispose(); renderer.dispose(); host.replaceChildren()
    }
  }, [trajectory])

  useEffect(() => {
    const point = trajectory.points[Math.min(activeIndex, trajectory.points.length - 1)]
    if (markerRef.current && point) markerRef.current.position.set(...point.positionXYZ)
  }, [activeIndex, trajectory])

  return <div className="trajectory-canvas" ref={hostRef} aria-label="可交互三维相机轨迹" />
}
