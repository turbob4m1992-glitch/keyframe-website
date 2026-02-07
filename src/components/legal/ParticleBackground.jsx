/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useMemo, useRef } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

function Scene() {
  const count = 3000
  const points = useRef()
  const { viewport } = useThree()

  // Initial positions
  const [positions, originalPositions] = useMemo(() => {
    const positions = new Float32Array(count * 3)
    const originalPositions = new Float32Array(count * 3)

    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * 25
      const y = (Math.random() - 0.5) * 25
      const z = (Math.random() - 0.5) * 10

      positions[i * 3] = x
      positions[i * 3 + 1] = y
      positions[i * 3 + 2] = z

      originalPositions[i * 3] = x
      originalPositions[i * 3 + 1] = y
      originalPositions[i * 3 + 2] = z
    }

    return [positions, originalPositions]
  }, [count])

  useFrame((state) => {
      // Mouse in world coordinates
      const mouseX = (state.pointer.x * viewport.width) / 2
      const mouseY = (state.pointer.y * viewport.height) / 2

      const time = state.clock.getElapsedTime()

      for (let i = 0; i < count; i++) {
          const i3 = i * 3
          let x = positions[i3]
          let y = positions[i3 + 1]
          let z = positions[i3 + 2]

          const ox = originalPositions[i3]
          const oy = originalPositions[i3 + 1]

          // Repel from mouse
          const dx = mouseX - x
          const dy = mouseY - y
          const dist = Math.sqrt(dx*dx + dy*dy)
          const maxDist = 4

          if (dist < maxDist) {
              const force = (maxDist - dist) / maxDist
              const angle = Math.atan2(dy, dx)

              // Move away
              const repelStrength = 0.2 // Strength of repulsion
              x -= Math.cos(angle) * force * repelStrength
              y -= Math.sin(angle) * force * repelStrength
          } else {
             // Return to original (spring) with some ease
             x += (ox - x) * 0.05
             y += (oy - y) * 0.05
          }

          // Add subtle floating drift
          // Using sine waves based on position and time to create "nebula" feel
          x += Math.sin(time * 0.2 + y * 0.5) * 0.002
          y += Math.cos(time * 0.2 + x * 0.5) * 0.002

          positions[i3] = x
          positions[i3 + 1] = y
          positions[i3 + 2] = z
      }

      points.current.geometry.attributes.position.needsUpdate = true
  })

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.04}
        color="#00f2ff"
        transparent
        opacity={0.6}
        sizeAttenuation={true}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  )
}

export default function ParticleBackground() {
    return (
        <div className="absolute inset-0 z-0 bg-void-black">
             <Canvas camera={{ position: [0, 0, 10], fov: 60 }} dpr={[1, 2]}>
                <Scene />
             </Canvas>
        </div>
    )
}
