import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { easing } from 'maath'

// --- SHAPE GENERATORS ---

const getNeuralFlow = (count) => {
  const p = new Float32Array(count * 3)
  const goldenRatio = (1 + Math.sqrt(5)) / 2
  let idx = 0
  
  for (let i = 0; i < count; i++) {
    const t = i / count
    const inclination = Math.acos(1 - 2 * t)
    const azimuth = 2 * Math.PI * goldenRatio * i

    const wave1 = Math.sin(azimuth * 3) * Math.cos(inclination * 4)
    const wave2 = Math.cos(azimuth * 10) * Math.sin(inclination * 10) * 0.2
    
    const r = 3.5 + (wave1 * 0.8) + wave2 

    const x = r * Math.sin(inclination) * Math.cos(azimuth)
    const y = r * Math.sin(inclination) * Math.sin(azimuth)
    const z = r * Math.cos(inclination)

    p[idx++] = x
    p[idx++] = y
    p[idx++] = z
  }
  return p
}

const getClapperboard = (count) => {
  const p = new Float32Array(count * 3)
  const baseCount = Math.floor(count * 0.6)
  const stickCount = Math.floor(count * 0.2)
  const playCount = count - baseCount - stickCount
  let idx = 0
  const scaleFactor = 0.7 
  for (let i = 0; i < baseCount; i++) {
    p[idx++] = (Math.random() - 0.5) * 4 * scaleFactor
    p[idx++] = (Math.random() - 0.5) * 2.5 * scaleFactor - 0.5 * scaleFactor 
    p[idx++] = (Math.random() - 0.5) * 0.2 * scaleFactor
  }
  for (let i = 0; i < stickCount; i++) {
    const x = (Math.random() - 0.5) * 4
    const y = (Math.random() - 0.5) * 0.4
    const z = (Math.random() - 0.5) * 0.2
    const angle = Math.PI / 6
    const pivotX = -2 * scaleFactor
    const rotatedX = (x * scaleFactor - pivotX) * Math.cos(angle) - (y * scaleFactor) * Math.sin(angle) + pivotX
    const rotatedY = (x * scaleFactor - pivotX) * Math.sin(angle) + (y * scaleFactor) * Math.cos(angle) + 1 * scaleFactor
    p[idx++] = rotatedX; p[idx++] = rotatedY; p[idx++] = z * scaleFactor
  }
  for (let i = 0; i < playCount; i++) {
    const r1 = Math.random(); const r2 = Math.random()
    const sqrtR1 = Math.sqrt(r1)
    const A = [-0.5, -0.5]; const B = [0.5, 0]; const C = [-0.5, 0.5]
    const x = (1 - sqrtR1) * A[0] + (sqrtR1 * (1 - r2)) * B[0] + (sqrtR1 * r2) * C[0]
    const y = (1 - sqrtR1) * A[1] + (sqrtR1 * (1 - r2)) * B[1] + (sqrtR1 * r2) * C[1]
    p[idx++] = x * 1.5 * scaleFactor; p[idx++] = y * 1.5 * scaleFactor - 0.5 * scaleFactor; p[idx++] = 0.15 * scaleFactor
  }
  return p
}

const getLightbulbBrain = (count) => {
  const p = new Float32Array(count * 3)
  const bulbCount = Math.floor(count * 0.4)
  const brainCount = count - bulbCount
  let idx = 0
  const scaleFactor = 0.7 
  for (let i = 0; i < bulbCount; i++) {
    if (i < bulbCount * 0.8) { 
      const phi = Math.acos(-1 + (2 * i) / (bulbCount*0.8))
      const theta = Math.sqrt((bulbCount*0.8) * Math.PI) * phi
      p[idx++] = 2 * Math.cos(theta) * Math.sin(phi) * scaleFactor
      p[idx++] = 2 * Math.sin(theta) * Math.sin(phi) * scaleFactor + 1 * scaleFactor
      p[idx++] = 2 * Math.cos(phi) * scaleFactor
    } else { 
      const angle = Math.random() * Math.PI * 2
      const r = 0.8 * scaleFactor
      const h = Math.random() * 1 - 1.5
      p[idx++] = r * Math.cos(angle); p[idx++] = h * scaleFactor; p[idx++] = r * Math.sin(angle)
    }
  }
  for (let i = 0; i < brainCount; i++) {
      const phi = Math.acos(1 - 2 * (i + 0.5) / brainCount);
      const theta = Math.PI * (1 + Math.sqrt(5)) * (i + 0.5);
      const r = 1.2 * scaleFactor 
      const noiseFactor = 0.2
      const wrinkle = Math.sin(phi * 10) * Math.cos(theta * 5) * noiseFactor + 
                      Math.cos(phi * 7) * Math.sin(theta * 3) * noiseFactor;
      const radiusVariation = r + (wrinkle * 0.5 * scaleFactor) + (Math.random() - 0.5) * 0.1 * scaleFactor
      p[idx++] = radiusVariation * Math.sin(phi) * Math.cos(theta)
      p[idx++] = radiusVariation * Math.sin(phi) * Math.sin(theta) + 1 * scaleFactor 
      p[idx++] = radiusVariation * Math.cos(phi)
  }
  return p
}

const getLaptopHologram = (count) => {
  const p = new Float32Array(count * 3)
  const laptopCount = Math.floor(count * 0.6)
  const holoCount = count - laptopCount
  let idx = 0
  const scaleFactor = 0.7 
  for (let i = 0; i < laptopCount; i++) {
    if (i < laptopCount / 2) { 
      p[idx++] = (Math.random() - 0.5) * 4 * scaleFactor
      p[idx++] = (Math.random() - 0.5) * 0.2 * scaleFactor - 1.5 * scaleFactor 
      p[idx++] = (Math.random() - 0.5) * 3 * scaleFactor + 1 * scaleFactor 
    } else { 
      p[idx++] = (Math.random() - 0.5) * 4 * scaleFactor
      p[idx++] = (Math.random() - 0.5) * 3 * scaleFactor
      p[idx++] = (Math.random() - 0.5) * 0.2 * scaleFactor - 0.5 * scaleFactor 
    }
  }
  for (let i = 0; i < holoCount; i++) {
    const t = i / holoCount
    const angle = t * Math.PI * 6 
    const radius = t * 2.5 * scaleFactor 
    const x = Math.cos(angle) * radius
    const z = Math.sin(angle) * radius
    const y = t * 3 * scaleFactor - 1 * scaleFactor 
    p[idx++] = x + (Math.random() -0.5) * 0.1 * scaleFactor
    p[idx++] = y + (Math.random() -0.5) * 0.1 * scaleFactor
    p[idx++] = z + (Math.random() -0.5) * 0.1 * scaleFactor
  }
  return p
}

const getGlobe = (count) => {
  const p = new Float32Array(count * 3)
  const r = 1.8 
  for (let i = 0; i < count; i++) {
    const i3 = i * 3
    const phi = Math.acos(1 - 2 * (i + 0.5) / count);
    const theta = Math.PI * (1 + Math.sqrt(5)) * (i + 0.5);
    const wave = Math.sin(phi * 12) * 0.1 + Math.cos(theta * 8) * 0.1;
    const radiusVariation = r + (wave * 0.5) + (Math.random() - 0.5) * 0.05
    p[i3] = radiusVariation * Math.sin(phi) * Math.cos(theta)
    p[i3 + 1] = radiusVariation * Math.sin(phi) * Math.sin(theta)
    p[i3 + 2] = radiusVariation * Math.cos(phi)
  }
  return p
}

// --- COMPONENT ---

export default function ParticleBrain({ shape }) {
  const points = useRef()
  const materialRef = useRef() 
  const count = 15000 
  
  const shapes = useMemo(() => ({
    cloud: getNeuralFlow(count), 
    sphere: getGlobe(count),    
    cube: getLightbulbBrain(count),     
    helix: getLaptopHologram(count),    
    ring: getClapperboard(count),      
    pyramid: getLightbulbBrain(count), 
    icosahedron: getLaptopHologram(count)
  }), [])
  
  // UNIFIED COLOR SETUP: Always use the darker/uniform green logic
  const currentColors = useMemo(() => {
      const colorArray = new Float32Array(count * 3)
      const positions = shapes.cloud 
      const tempColor = new THREE.Color()

      for (let i = 0; i < count; i++) {
          const i3 = i * 3
          // Apply the same gradient logic (0.1 to 0.8 green) that shapes use
          // This ensures consistency.
          const x = positions[i3]; const y = positions[i3+1]; const z = positions[i3+2];
          const dist = Math.sqrt(x*x + y*y + z*z)
          const t = Math.max(0, Math.min(1, (dist - 2.5) / 2.0))

          // Lerp between Dark Core (0.1, 0.4, 0.03) and Bright Outer (0.2, 0.8, 0.1)
          const r = THREE.MathUtils.lerp(0.1, 0.2, t)
          const g = THREE.MathUtils.lerp(0.4, 0.8, t)
          const b = THREE.MathUtils.lerp(0.03, 0.1, t)
          
          colorArray[i3] = r
          colorArray[i3 + 1] = g
          colorArray[i3 + 2] = b
      }
      return colorArray
  }, [shapes])

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry()
    const startPositions = new Float32Array(shapes.cloud)
    geo.setAttribute('position', new THREE.BufferAttribute(startPositions, 3))
    geo.setAttribute('color', new THREE.BufferAttribute(currentColors, 3)) 
    return geo
  }, [shapes, currentColors])

  useFrame((state, delta) => {
    if (!points.current) return

    // 1. ROTATION
    if (shape === 'cloud') {
      points.current.rotation.y += delta * 0.03
      points.current.rotation.x += delta * 0.015
      
      const targetRotX = -state.pointer.y * 0.05; 
      const targetRotZ = state.pointer.x * 0.05;
      easing.damp(points.current.rotation, 'x', points.current.rotation.x + targetRotX, 2.0, delta); 
      easing.damp(points.current.rotation, 'z', points.current.rotation.z + targetRotZ, 2.0, delta); 
      
    } else {
      points.current.rotation.y += delta * 0.1
      easing.damp(points.current.rotation, 'x', 0, 0.25, delta)
      easing.damp(points.current.rotation, 'z', 0, 0.25, delta)
    }

    // 2. MORPHING
    const target = shapes[shape] || shapes.cloud
    const currentPositions = points.current.geometry.attributes.position.array
    let speed = 4 * delta 
    if (shape !== 'cloud') speed = 10 * delta 
    
    for (let i = 0; i < count * 3; i++) {
      currentPositions[i] += (target[i] - currentPositions[i]) * speed
    }
    points.current.geometry.attributes.position.needsUpdate = true

    // 3. COLOR UNIFICATION
    // Always lerp towards currentColors (which is now the unified dark green theme)
    // We don't need complex conditional logic anymore since they match.
    const colorAttributeArray = points.current.geometry.attributes.color.array
    for (let i = 0; i < count; i++) {
        const i3 = i * 3
        colorAttributeArray[i3] = THREE.MathUtils.lerp(colorAttributeArray[i3], currentColors[i3], 0.1)
        colorAttributeArray[i3+1] = THREE.MathUtils.lerp(colorAttributeArray[i3+1], currentColors[i3+1], 0.1)
        colorAttributeArray[i3+2] = THREE.MathUtils.lerp(colorAttributeArray[i3+2], currentColors[i3+2], 0.1)
    }
    points.current.geometry.attributes.color.needsUpdate = true

    // 4. PULSE EFFECT
    if (materialRef.current) {
        let targetOpacity = 0.8
        if (shape === 'cloud') {
            const t = state.clock.getElapsedTime()
            targetOpacity = 0.8 + Math.sin(t * 2.5) * 0.2
        }
        materialRef.current.opacity = THREE.MathUtils.lerp(materialRef.current.opacity, targetOpacity, 0.1)
    }
  })

  return (
    <points ref={points} geometry={geometry} frustumCulled={false}>
      <pointsMaterial 
        ref={materialRef} 
        size={0.02} 
        vertexColors 
        transparent 
        opacity={0.8} 
        sizeAttenuation={true}
        depthWrite={false} 
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}