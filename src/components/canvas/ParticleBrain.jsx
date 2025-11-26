import { useRef, useMemo, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { easing } from 'maath'

// --- 1. SHAPE GENERATORS ---

// --- NATURAL GALAXY (Interstellar Black Hole / Idle State with Lens Look) ---
const getNaturalGalaxy = (count, r = 5) => {
  const p = new Float32Array(count * 3)
  const innerRadius = r * 0.2; // Event Horizon
  const outerRadius = r * 0.8; 
  
  // Split particles between HORIZONTAL (70%) and VERTICAL (30%) rings
  const horizontalCount = Math.floor(count * 0.7);
  
  let idx = 0;

  // 1. HORIZONTAL DISK (The main accretion disk, with vertical warp)
  for (let i = 0; i < horizontalCount; i++) {
    const r_disk = innerRadius + (Math.random() * (outerRadius - innerRadius));
    const angle = Math.random() * Math.PI * 2
    
    // Base XZ positions
    const x = Math.cos(angle) * r_disk
    const z = Math.sin(angle) * r_disk
    
    // Adds a subtle vertical warp (curves the disk up/down) to simulate lensing
    const warpFactor = 0.5
    const y_warp = Math.sin(z * 1.5 / r) * warpFactor * (r_disk / outerRadius)

    const y = (Math.random() - 0.5) * (r_disk / outerRadius) * 0.4 // Base thickness
    
    p[idx++] = x + (Math.random() - 0.5) * 0.05
    p[idx++] = (y * 0.4) + y_warp // Combined thickness and subtle warp
    p[idx++] = z + (Math.random() - 0.5) * 0.05
  }
  
  // 2. VERTICAL RING (To complete the spherical light bending illusion)
  for (let i = horizontalCount; i < count; i++) {
    const r_disk = innerRadius + (Math.random() * (outerRadius - innerRadius));
    const angle = Math.random() * Math.PI * 2
    
    // Positions in the YZ plane (vertical ring)
    const y = Math.cos(angle) * r_disk
    const z = Math.sin(angle) * r_disk
    
    // X is the thickness (very thin)
    const x = (Math.random() - 0.5) * 0.1

    p[idx++] = x
    p[idx++] = y * 0.9 
    p[idx++] = z 
  }

  return p
}

// --- STUDIO: 3D CLAPPERBOARD WITH PLAY BUTTON (Reduced Size) ---
const getClapperboard = (count) => {
  const p = new Float32Array(count * 3)
  const baseCount = Math.floor(count * 0.6)
  const stickCount = Math.floor(count * 0.2)
  const playCount = count - baseCount - stickCount
  let idx = 0
  const scaleFactor = 0.7 // Applied consistent scaling

  // 1. Main Slate Body (Rectangle)
  for (let i = 0; i < baseCount; i++) {
    p[idx++] = (Math.random() - 0.5) * 4 * scaleFactor // Width
    p[idx++] = (Math.random() - 0.5) * 2.5 * scaleFactor - 0.5 * scaleFactor // Height (shifted down)
    p[idx++] = (Math.random() - 0.5) * 0.2 * scaleFactor // Thickness
  }

  // 2. Top Clap Stick (Open at an angle)
  for (let i = 0; i < stickCount; i++) {
    const x = (Math.random() - 0.5) * 4
    const y = (Math.random() - 0.5) * 0.4
    const z = (Math.random() - 0.5) * 0.2
    
    // Rotate ~30 degrees around Z-axis, pivoted at left edge
    const angle = Math.PI / 6
    const pivotX = -2 * scaleFactor
    const rotatedX = (x * scaleFactor - pivotX) * Math.cos(angle) - (y * scaleFactor) * Math.sin(angle) + pivotX
    const rotatedY = (x * scaleFactor - pivotX) * Math.sin(angle) + (y * scaleFactor) * Math.cos(angle) + 1 * scaleFactor // Shifted up

    p[idx++] = rotatedX
    p[idx++] = rotatedY
    p[idx++] = z * scaleFactor
  }

  // 3. Play Button (Triangle on front)
  for (let i = 0; i < playCount; i++) {
    // Triangle math
    const r1 = Math.random(); const r2 = Math.random()
    const sqrtR1 = Math.sqrt(r1)
    const A = [-0.5, -0.5]; const B = [0.5, 0]; const C = [-0.5, 0.5] // Points of triangle
    const x = (1 - sqrtR1) * A[0] + (sqrtR1 * (1 - r2)) * B[0] + (sqrtR1 * r2) * C[0]
    const y = (1 - sqrtR1) * A[1] + (sqrtR1 * (1 - r2)) * B[1] + (sqrtR1 * r2) * C[1]

    p[idx++] = x * 1.5 * scaleFactor // Scale up
    p[idx++] = y * 1.5 * scaleFactor - 0.5 * scaleFactor // Scale and position
    p[idx++] = 0.15 * scaleFactor // Slightly in front of the slate
  }
  return p
}

// --- STRATEGY: LIGHTBULB WITH BRAIN & NEURONS (Reduced Size & Wrinkles) ---
const getLightbulbBrain = (count) => {
  const p = new Float32Array(count * 3)
  const bulbCount = Math.floor(count * 0.4)
  const brainCount = count - bulbCount
  let idx = 0
  const scaleFactor = 0.7 

  // 1. Glass Bulb & Base
  for (let i = 0; i < bulbCount; i++) {
    if (i < bulbCount * 0.8) { // Bulb Sphere
      const phi = Math.acos(-1 + (2 * i) / (bulbCount*0.8))
      const theta = Math.sqrt((bulbCount*0.8) * Math.PI) * phi
      p[idx++] = 2 * Math.cos(theta) * Math.sin(phi) * scaleFactor
      p[idx++] = 2 * Math.sin(theta) * Math.sin(phi) * scaleFactor + 1 * scaleFactor
      p[idx++] = 2 * Math.cos(phi) * scaleFactor
    } else { // Metal Base
      const angle = Math.random() * Math.PI * 2
      const r = 0.8 * scaleFactor
      const h = Math.random() * 1 - 1.5
      p[idx++] = r * Math.cos(angle)
      p[idx++] = h * scaleFactor // Scale height position
      p[idx++] = r * Math.sin(angle)
    }
  }

  // 2. Brain Inside (Denser sphere with wrinkles)
  for (let i = 0; i < brainCount; i++) {
      const phi = Math.acos(1 - 2 * (i + 0.5) / brainCount);
      const theta = Math.PI * (1 + Math.sqrt(5)) * (i + 0.5);
      
      const r = 1.2 * scaleFactor // Base radius
      
      const noiseFactor = 0.2
      const wrinkle = Math.sin(phi * 10) * Math.cos(theta * 5) * noiseFactor + 
                      Math.cos(phi * 7) * Math.sin(theta * 3) * noiseFactor;
      
      const radiusVariation = r + (wrinkle * 0.5 * scaleFactor) + (Math.random() - 0.5) * 0.1 * scaleFactor

      p[idx++] = radiusVariation * Math.sin(phi) * Math.cos(theta)
      p[idx++] = radiusVariation * Math.sin(phi) * Math.sin(theta) + 1 * scaleFactor // Shifted up
      p[idx++] = radiusVariation * Math.cos(phi)
  }
  return p
}

// --- DESIGN: LAPTOP WITH HOLOGRAPHIC BRUSH (Reduced Size & Clearer End) ---
const getLaptopHologram = (count) => {
  const p = new Float32Array(count * 3)
  const laptopCount = Math.floor(count * 0.6)
  const holoCount = count - laptopCount
  let idx = 0
  const scaleFactor = 0.7 

  // 1. Laptop Base & Screen
  for (let i = 0; i < laptopCount; i++) {
    if (i < laptopCount / 2) { // Base
      p[idx++] = (Math.random() - 0.5) * 4 * scaleFactor
      p[idx++] = (Math.random() - 0.5) * 0.2 * scaleFactor - 1.5 * scaleFactor // Scale Y position
      p[idx++] = (Math.random() - 0.5) * 3 * scaleFactor + 1 * scaleFactor // Scale Z position
    } else { // Screen
      p[idx++] = (Math.random() - 0.5) * 4 * scaleFactor
      p[idx++] = (Math.random() - 0.5) * 3 * scaleFactor
      p[idx++] = (Math.random() - 0.5) * 0.2 * scaleFactor - 0.5 * scaleFactor // Scale Z position
    }
  }

  // 2. Holographic Brush Stroke
  for (let i = 0; i < holoCount; i++) {
    const t = i / holoCount
    const angle = t * Math.PI * 6 
    const radius = t * 2.5 * scaleFactor // Scaled radius
    const x = Math.cos(angle) * radius
    const z = Math.sin(angle) * radius
    const y = t * 3 * scaleFactor - 1 * scaleFactor // Scaled Y height

    p[idx++] = x + (Math.random() -0.5) * 0.1 * scaleFactor
    p[idx++] = y + (Math.random() -0.5) * 0.1 * scaleFactor
    p[idx++] = z + (Math.random() -0.5) * 0.1 * scaleFactor
  }
  return p
}

// --- GLOBAL: GENERIC SPHERE (Reduced Size & Texture, No Countries) ---
const getGlobe = (count) => {
  const p = new Float32Array(count * 3)
  const r = 1.8 // Reduced from 2.5
  
  for (let i = 0; i < count; i++) {
    const i3 = i * 3
    
    const phi = Math.acos(1 - 2 * (i + 0.5) / count);
    const theta = Math.PI * (1 + Math.sqrt(5)) * (i + 0.5);
    
    // Add a gentle, repeating texture wave effect to the radius
    const wave = Math.sin(phi * 12) * 0.1 + Math.cos(theta * 8) * 0.1;

    // Combine wave, base radius, and small noise
    const radiusVariation = r + (wave * 0.5) + (Math.random() - 0.5) * 0.05

    p[i3] = radiusVariation * Math.sin(phi) * Math.cos(theta)
    p[i3 + 1] = radiusVariation * Math.sin(phi) * Math.sin(theta)
    p[i3 + 2] = radiusVariation * Math.cos(phi)
  }
  return p
}
// (getSpecificGlobe removed for brevity as it is unused now)


// --- 2. COMPONENT ---

export default function ParticleBrain({ shape }) {
  const points = useRef()
  const count = 8000 
  
  // --- GENERATE ALL SHAPES ONCE ---
  const shapes = useMemo(() => ({
    cloud: getNaturalGalaxy(count), // BLACK HOLE GEOMETRY
    sphere: getGlobe(count),    
    cube: getLightbulbBrain(count),     
    helix: getLaptopHologram(count),    
    ring: getClapperboard(count),      
    pyramid: getLightbulbBrain(count), 
    icosahedron: getLaptopHologram(count)
  }), [])
  
  // --- COLOR SETUP: BLACK HOLE GRADIENT & MUTABLE ARRAY ---
  // This memo initializes the colors array with the Black Hole gradient
  const currentColors = useMemo(() => {
      const colorArray = new Float32Array(count * 3)
      const positions = shapes.cloud // Get Black Hole positions
      const tempColor = new THREE.Color()

      for (let i = 0; i < count; i++) {
          const i3 = i * 3
          const x = positions[i3]
          const z = positions[i3 + 2]
          
          let angle = Math.atan2(z, x) 
          let t = (angle + Math.PI) / (Math.PI * 2) // Normalized 0 to 1

          // Create the Interstellar-like gradient based on position (Red/Orange -> White/Yellow)
          if (t < 0.5) {
              // Hotter/faster side (White/Yellow)
              tempColor.setHSL(0.1, 0.5, 0.7 + t * 0.6) 
          } else {
              // Cooler/slower side (Orange/Red)
              tempColor.setHSL(0.05, 0.9, 0.4 + (t - 0.5) * 0.4) 
          }
          
          colorArray[i3] = tempColor.r
          colorArray[i3 + 1] = tempColor.g
          colorArray[i3 + 2] = tempColor.b
      }
      return colorArray
  }, [shapes])

  // --- NEURON FLASHING STATE ---
  const neuronIndices = useMemo(() => {
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
    // Use the color array initialized with the Black Hole gradient
    geo.setAttribute('color', new THREE.BufferAttribute(currentColors, 3)) 
    return geo
  }, [shapes, currentColors])

  useFrame((state, delta) => {
    if (!points.current) return

    // 1. ROTATION LOGIC
if (shape === 'cloud') {
  // Reduced orbit speed from 0.2 to 0.05 for a slow, heavy feel
  points.current.rotation.y += delta * 0.05 
  
  // MOUSE MOVEMENT LOGIC (Slower Parallax)
  // Target influence (0.05) and dampening (2.0) remain the same for heavy parallax
  const targetRotX = -state.pointer.y * 0.05; 
  const targetRotZ = state.pointer.x * 0.05;
  
  easing.damp(points.current.rotation, 'x', targetRotX, 2.0, delta); 
  easing.damp(points.current.rotation, 'z', targetRotZ, 2.0, delta); 
  
} else {
  points.current.rotation.y += delta * 0.1
  easing.damp(points.current.rotation, 'x', 0, 0.25, delta)
  easing.damp(points.current.rotation, 'z', 0, 0.25, delta)
}

    // 2. MORPHING LOGIC (BIG BANG EFFECT)
    const target = shapes[shape] || shapes.cloud
    const currentPositions = points.current.geometry.attributes.position.array

    // Base speed
    let speed = 4 * delta 
    // BIG BANG EFFECT: Apply a rapid speed boost (10 * delta) when transitioning 
    // from the default 'cloud' (Black Hole) to any other shape.
    if (shape !== 'cloud') {
        speed = 10 * delta 
    }
    
    for (let i = 0; i < count * 3; i++) {
      currentPositions[i] += (target[i] - currentPositions[i]) * speed
    }
    points.current.geometry.attributes.position.needsUpdate = true


    // 3. NEURON FLASHING LOGIC (Only for Strategy/Cube)
    const colorAttributeArray = points.current.geometry.attributes.color.array
    if (shape === 'cube') {
        // Randomly pick a few neurons to fire
        if (Math.random() > 0.8) {
            const fireIdx = neuronIndices[Math.floor(Math.random() * neuronIndices.length)]
            const i3 = fireIdx * 3
            colorAttributeArray[i3] = 1.0; // R - Flash White
            colorAttributeArray[i3+1] = 1.0; // G
            colorAttributeArray[i3+2] = 1.0; // B
        }
    }

    // Fade all colors back to base neon green (for non-Black Hole states)
    if (shape !== 'cloud') {
        for (let i = 0; i < count; i++) {
            const i3 = i * 3
            // Lerp towards base color (R=0.22, G=1.0, B=0.08 for neon greenish)
            colorAttributeArray[i3] = THREE.MathUtils.lerp(colorAttributeArray[i3], 0.22, 0.1) // R
            colorAttributeArray[i3+1] = THREE.MathUtils.lerp(colorAttributeArray[i3+1], 1.0, 0.1) // G
            colorAttributeArray[i3+2] = THREE.MathUtils.lerp(colorAttributeArray[i3+2], 0.08, 0.1) // B
        }
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