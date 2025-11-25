import { useRef, useMemo, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { easing } from 'maath'

// --- 1. SHAPE GENERATORS ---

// --- NATURAL GALAXY (Idle State) ---
const getNaturalGalaxy = (count, r = 5) => {
  const p = new Float32Array(count * 3)
  for (let i = 0; i < count; i++) {
    const i3 = i * 3
    // Logarithmic spiral for more natural arms
    const angle = Math.random() * Math.PI * 2
    const radius = Math.pow(Math.random(), 2) * r // More points near center
    const spin = radius * 1.5 // Tighter spin near center
    const armOffset = (i % 3) * (Math.PI * 2 / 3) // 3 arms

    const x = Math.cos(angle + spin + armOffset) * radius
    const z = Math.sin(angle + spin + armOffset) * radius
    // Flattened disc with some thickness
    const y = (Math.random() - 0.5) * (Math.pow(1 - radius / r, 2) * 1.5)

    // Add random noise for a nebula look
    p[i3] = x + (Math.random() - 0.5) * 0.3
    p[i3 + 1] = y + (Math.random() - 0.5) * 0.1
    p[i3 + 2] = z + (Math.random() - 0.5) * 0.3
  }
  return p
}

// --- STUDIO: 3D CLAPPERBOARD WITH PLAY BUTTON ---
const getClapperboard = (count) => {
  const p = new Float32Array(count * 3)
  const baseCount = Math.floor(count * 0.6)
  const stickCount = Math.floor(count * 0.2)
  const playCount = count - baseCount - stickCount
  let idx = 0

  // 1. Main Slate Body (Rectangle)
  for (let i = 0; i < baseCount; i++) {
    p[idx++] = (Math.random() - 0.5) * 4 // Width
    p[idx++] = (Math.random() - 0.5) * 2.5 - 0.5 // Height (shifted down)
    p[idx++] = (Math.random() - 0.5) * 0.2 // Thickness
  }

  // 2. Top Clap Stick (Open at an angle)
  for (let i = 0; i < stickCount; i++) {
    const x = (Math.random() - 0.5) * 4
    const y = (Math.random() - 0.5) * 0.4
    const z = (Math.random() - 0.5) * 0.2
    
    // Rotate ~30 degrees around Z-axis, pivoted at left edge
    const angle = Math.PI / 6
    const pivotX = -2
    const rotatedX = (x - pivotX) * Math.cos(angle) - y * Math.sin(angle) + pivotX
    const rotatedY = (x - pivotX) * Math.sin(angle) + y * Math.cos(angle) + 1 // Shifted up

    p[idx++] = rotatedX
    p[idx++] = rotatedY
    p[idx++] = z
  }

  // 3. Play Button (Triangle on front)
  for (let i = 0; i < playCount; i++) {
    // Triangle math
    const r1 = Math.random(); const r2 = Math.random()
    const sqrtR1 = Math.sqrt(r1)
    const A = [-0.5, -0.5]; const B = [0.5, 0]; const C = [-0.5, 0.5] // Points of triangle
    const x = (1 - sqrtR1) * A[0] + (sqrtR1 * (1 - r2)) * B[0] + (sqrtR1 * r2) * C[0]
    const y = (1 - sqrtR1) * A[1] + (sqrtR1 * (1 - r2)) * B[1] + (sqrtR1 * r2) * C[1]

    p[idx++] = x * 1.5 // Scale up
    p[idx++] = y * 1.5 - 0.5 // Scale and position
    p[idx++] = 0.15 // Slightly in front of the slate
  }
  return p
}

// --- STRATEGY: LIGHTBULB WITH BRAIN & NEURONS ---
const getLightbulbBrain = (count) => {
  const p = new Float32Array(count * 3)
  const bulbCount = Math.floor(count * 0.4)
  const brainCount = count - bulbCount
  let idx = 0

  // 1. Glass Bulb & Base
  for (let i = 0; i < bulbCount; i++) {
    if (i < bulbCount * 0.8) { // Bulb Sphere
      const phi = Math.acos(-1 + (2 * i) / (bulbCount*0.8))
      const theta = Math.sqrt((bulbCount*0.8) * Math.PI) * phi
      p[idx++] = 2 * Math.cos(theta) * Math.sin(phi)
      p[idx++] = 2 * Math.sin(theta) * Math.sin(phi) + 1
      p[idx++] = 2 * Math.cos(phi)
    } else { // Metal Base
      const angle = Math.random() * Math.PI * 2
      const r = 0.8
      const h = Math.random() * 1 - 1.5
      p[idx++] = r * Math.cos(angle)
      p[idx++] = h
      p[idx++] = r * Math.sin(angle)
    }
  }

  // 2. Brain Inside (Denser sphere)
  for (let i = 0; i < brainCount; i++) {
      const phi = Math.acos(-1 + (2 * i) / brainCount)
      const theta = Math.sqrt(brainCount * Math.PI) * phi
      const r = 1.2 // Smaller radius
      // Add noise for a "wrinkly" brain look
      const noise = 1 + (Math.random() - 0.5) * 0.2
      p[idx++] = r * noise * Math.cos(theta) * Math.sin(phi)
      p[idx++] = r * noise * Math.sin(theta) * Math.sin(phi) + 1
      p[idx++] = r * noise * Math.cos(phi)
  }
  return p
}

// --- DESIGN: LAPTOP WITH HOLOGRAPHIC BRUSH ---
const getLaptopHologram = (count) => {
  const p = new Float32Array(count * 3)
  const laptopCount = Math.floor(count * 0.6)
  const holoCount = count - laptopCount
  let idx = 0

  // 1. Laptop Base & Screen
  for (let i = 0; i < laptopCount; i++) {
    if (i < laptopCount / 2) { // Base
      p[idx++] = (Math.random() - 0.5) * 4
      p[idx++] = (Math.random() - 0.5) * 0.2 - 1.5
      p[idx++] = (Math.random() - 0.5) * 3 + 1
    } else { // Screen (Open 90 deg)
      p[idx++] = (Math.random() - 0.5) * 4
      p[idx++] = (Math.random() - 0.5) * 3
      p[idx++] = (Math.random() - 0.5) * 0.2 - 0.5
    }
  }

  // 2. Holographic Brush Stroke (Parametric curve)
  for (let i = 0; i < holoCount; i++) {
    const t = i / holoCount
    const angle = t * Math.PI * 4 // 2 spirals
    const radius = t * 2
    const x = Math.cos(angle) * radius
    const z = Math.sin(angle) * radius
    const y = t * 3 - 1 // Rising upwards

    p[idx++] = x + (Math.random() -0.5) * 0.2
    p[idx++] = y
    p[idx++] = z + (Math.random() -0.5) * 0.2
  }
  return p
}
// 2. GENERIC GLOBAL SPHERE (No countries)
const getGlobe = (count) => {
  const p = new Float32Array(count * 3)
  const r = 2.5
  
  for (let i = 0; i < count; i++) {
    const i3 = i * 3
    
    // Even distribution on sphere surface using Golden Angle
    const phi = Math.acos(1 - 2 * (i + 0.5) / count);
    const theta = Math.PI * (1 + Math.sqrt(5)) * (i + 0.5);
    
    // Add some noise to make it less perfect/wireframe-like, more like a particle cloud
    const radiusVariation = r + (Math.random() - 0.5) * 0.1

    p[i3] = radiusVariation * Math.sin(phi) * Math.cos(theta)
    p[i3 + 1] = radiusVariation * Math.sin(phi) * Math.sin(theta)
    p[i3 + 2] = radiusVariation * Math.cos(phi)
  }
  return p
}
// --- GLOBAL: SPECIFIC COUNTRIES GLOBE ---
const getSpecificGlobe = (count) => {
  const p = new Float32Array(count * 3)
  let idx = 0
  const globeR = 2.5

  // Helper to convert lat/lon to xyz
  const toXYZ = (lat, lon) => {
    const phi = (90 - lat) * (Math.PI / 180)
    const theta = (lon + 180) * (Math.PI / 180)
    return [
      -(globeR * Math.sin(phi) * Math.cos(theta)),
      globeR * Math.cos(phi),
      globeR * Math.sin(phi) * Math.sin(theta)
    ]
  }

  // Country Centers (Approx Lat/Lon) & Particle Counts
  const countries = [
    { name: 'USA', lat: 37, lon: -95, particles: Math.floor(count * 0.3), spread: 15 },
    { name: 'Jordan', lat: 30.5, lon: 36, particles: Math.floor(count * 0.1), spread: 2 },
    { name: 'Lebanon', lat: 33.8, lon: 35.5, particles: Math.floor(count * 0.1), spread: 1.5 },
    { name: 'Qatar', lat: 25.3, lon: 51.2, particles: Math.floor(count * 0.1), spread: 1.5 },
  ]
  const outlineCount = count - countries.reduce((acc, c) => acc + c.particles, 0)

  // 1. Generate Countries
  countries.forEach(c => {
    for (let i = 0; i < c.particles; i++) {
      const lat = c.lat + (Math.random() - 0.5) * c.spread
      const lon = c.lon + (Math.random() - 0.5) * c.spread
      const [x, y, z] = toXYZ(lat, lon)
      p[idx++] = x; p[idx++] = y; p[idx++] = z
    }
  })

  // 2. Faint Globe Outline
  for (let i = 0; i < outlineCount; i++) {
      const phi = Math.acos(-1 + (2 * i) / outlineCount)
      const theta = Math.sqrt(outlineCount * Math.PI) * phi
      p[idx++] = globeR * Math.cos(theta) * Math.sin(phi)
      p[idx++] = globeR * Math.sin(theta) * Math.sin(phi)
      p[idx++] = globeR * Math.cos(phi)
  }
  return p
}


// --- 2. COMPONENT ---

export default function ParticleBrain({ shape }) {
  const points = useRef()
  // Increased count for better detail on complex shapes
  const count = 8000 
  
  // --- GENERATE ALL SHAPES ONCE ---
  const shapes = useMemo(() => ({
    cloud: getNaturalGalaxy(count),
    // Map new shapes to existing button names
    sphere: getSpecificGlobe(count),    // Global
    cube: getLightbulbBrain(count),     // Strategy
    helix: getLaptopHologram(count),    // Design
    ring: getClapperboard(count),       // Studio
    // Keep others for fallback or future use
    pyramid: getLightbulbBrain(count), 
    icosahedron: getLaptopHologram(count)
  }), [])
  
  // --- NEURON FLASHING STATE ---
  // We need a separate array to track color/brightness for the brain effect
  const colors = useMemo(() => new Float32Array(count * 3).fill(0.2), []) // Start dim green
  const neuronIndices = useMemo(() => {
      // Indices for the "brain" part of the lightbulb shape
      const bulbCount = Math.floor(count * 0.4)
      const indices = []
      for(let i = bulbCount; i < count; i++) indices.push(i)
      return indices
  }, [])

  // Initial geometry
  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry()
    const startPositions = new Float32Array(shapes.cloud)
    geo.setAttribute('position', new THREE.BufferAttribute(startPositions, 3))
    // Add color attribute for flashing
    geo.setAttribute('color', new THREE.BufferAttribute(colors, 3))
    return geo
  }, [shapes, colors])

  useFrame((state, delta) => {
    if (!points.current) return

    // 1. ROTATION LOGIC
    if (shape === 'cloud') {
      points.current.rotation.y += delta * 0.02 // Slower galaxy spin
      points.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.1) * 0.05
    } else {
      points.current.rotation.y += delta * 0.1
      easing.damp(points.current.rotation, 'x', 0, 0.25, delta)
      easing.damp(points.current.rotation, 'z', 0, 0.25, delta)
    }

    // 2. MORPHING LOGIC
    const target = shapes[shape] || shapes.cloud
    const currentPositions = points.current.geometry.attributes.position.array
    const speed = 4 * delta 

    for (let i = 0; i < count * 3; i++) {
      currentPositions[i] += (target[i] - currentPositions[i]) * speed
    }
    points.current.geometry.attributes.position.needsUpdate = true


    // 3. NEURON FLASHING LOGIC (Only for Strategy/Cube)
    const currentColors = points.current.geometry.attributes.color.array
    if (shape === 'cube') {
        // Randomly pick a few neurons to fire
        if (Math.random() > 0.8) {
            const fireIdx = neuronIndices[Math.floor(Math.random() * neuronIndices.length)]
            const i3 = fireIdx * 3
            currentColors[i3] = 1.0; // R - Flash White
            currentColors[i3+1] = 1.0; // G
            currentColors[i3+2] = 1.0; // B
        }
    }

    // Fade all colors back to base neon green
    for (let i = 0; i < count; i++) {
        const i3 = i * 3
        // Lerp towards base color (R=0.2, G=1.0, B=0.2 for neon greenish)
        currentColors[i3] = THREE.MathUtils.lerp(currentColors[i3], 0.22, 0.1) // R
        currentColors[i3+1] = THREE.MathUtils.lerp(currentColors[i3+1], 1.0, 0.1) // G
        currentColors[i3+2] = THREE.MathUtils.lerp(currentColors[i3+2], 0.08, 0.1) // B
    }
    points.current.geometry.attributes.color.needsUpdate = true
  })

  return (
    <points ref={points} geometry={geometry}>
      <pointsMaterial 
        size={0.02} 
        vertexColors // Enable per-particle coloring
        transparent 
        opacity={0.8} 
        sizeAttenuation={true}
        depthWrite={false} 
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}