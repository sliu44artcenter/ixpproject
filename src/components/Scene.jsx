import React, { useRef, useState, useEffect, Suspense } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import {
  OrbitControls,
  PerspectiveCamera,
  Environment,
  Stars,
  useHelper
} from '@react-three/drei'
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing'
import * as THREE from 'three'
import gsap from 'gsap'

/**
 * MAIN SCENE COMPONENT
 * Orchestrates the entire 3D narrative experience
 */
function Scene() {
  return (
    <Canvas
      shadows
      gl={{
        antialias: true,
        alpha: false,
        powerPreference: "high-performance"
      }}
      dpr={[1, 2]}
    >
      {/* Camera setup with cinematic positioning */}
      <PerspectiveCamera makeDefault position={[0, 2, 8]} fov={50} />

      {/* Lighting setup for dramatic effect */}
      <Lighting />

      {/* Main 3D content */}
      <Suspense fallback={null}>
        <SceneContent />
      </Suspense>

      {/* Camera controls - limited rotation for cinematic feel */}
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        minPolarAngle={Math.PI / 3}
        maxPolarAngle={Math.PI / 2}
        minAzimuthAngle={-Math.PI / 6}
        maxAzimuthAngle={Math.PI / 6}
        target={[0, 1.5, 0]}
      />

      {/* Post-processing effects for visual polish */}
      <EffectComposer>
        <Bloom
          intensity={0.5}
          luminanceThreshold={0.9}
          luminanceSmoothing={0.9}
        />
        <Vignette
          offset={0.3}
          darkness={0.5}
          eskil={false}
        />
      </EffectComposer>
    </Canvas>
  )
}

/**
 * LIGHTING SETUP
 * Creates atmospheric and dramatic lighting
 */
function Lighting() {
  const ambientRef = useRef()
  const mainLightRef = useRef()
  const rimLightRef = useRef()

  return (
    <>
      {/* Ambient base lighting */}
      <ambientLight ref={ambientRef} intensity={0.3} color="#ffffff" />

      {/* Main key light */}
      <directionalLight
        ref={mainLightRef}
        position={[5, 8, 5]}
        intensity={1.5}
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-camera-far={50}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
      />

      {/* Rim light for character definition */}
      <spotLight
        ref={rimLightRef}
        position={[-5, 5, -5]}
        intensity={0.8}
        angle={0.6}
        penumbra={1}
        color="#6495ED"
      />

      {/* Fill light from below */}
      <pointLight position={[0, -1, 0]} intensity={0.3} color="#87CEEB" />
    </>
  )
}

/**
 * SCENE CONTENT
 * Contains all the 3D objects and interactive elements
 */
function SceneContent() {
  const [selectedChoice, setSelectedChoice] = useState(null)

  return (
    <>
      {/* Animated background */}
      <Background selectedChoice={selectedChoice} />

      {/* Stars for depth */}
      <Stars radius={100} depth={50} count={5000} factor={4} fade speed={1} />

      {/* Ground plane */}
      <Ground />

      {/* Main character */}
      <Character selectedChoice={selectedChoice} />

      {/* Three interactive choice icons */}
      <ChoiceIcons onChoiceSelect={setSelectedChoice} selectedChoice={selectedChoice} />

      {/* Particle effects */}
      {selectedChoice && <ParticleEffects type={selectedChoice} />}
    </>
  )
}

/**
 * ANIMATED BACKGROUND
 * Changes color based on user's moral choice
 */
function Background({ selectedChoice }) {
  const { scene } = useThree()
  const bgColorRef = useRef(new THREE.Color('#1a1a2e'))

  useEffect(() => {
    scene.background = bgColorRef.current
    scene.fog = new THREE.Fog(bgColorRef.current, 10, 50)
  }, [scene])

  useEffect(() => {
    if (selectedChoice === 'good') {
      // Warm golden tone for good choice
      gsap.to(bgColorRef.current, {
        r: 0.8,
        g: 0.65,
        b: 0.3,
        duration: 2,
        ease: 'power2.inOut',
        onUpdate: () => {
          scene.background = bgColorRef.current
          scene.fog.color = bgColorRef.current
        }
      })
    } else if (selectedChoice === 'evil') {
      // Deep red for evil choice
      gsap.to(bgColorRef.current, {
        r: 0.4,
        g: 0.05,
        b: 0.05,
        duration: 2,
        ease: 'power2.inOut',
        onUpdate: () => {
          scene.background = bgColorRef.current
          scene.fog.color = bgColorRef.current
        }
      })
    }
  }, [selectedChoice, scene])

  return null
}

/**
 * GROUND PLANE
 * Reflective surface beneath the character
 */
function Ground() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
      <planeGeometry args={[50, 50]} />
      <meshStandardMaterial
        color="#2a2a3e"
        roughness={0.8}
        metalness={0.2}
      />
    </mesh>
  )
}

/**
 * CHARACTER MODEL
 * The central humanoid figure that transforms based on choices
 */
function Character({ selectedChoice }) {
  const groupRef = useRef()
  const bodyRef = useRef()
  const headRef = useRef()
  const angelWingsRef = useRef()
  const devilWingsRef = useRef()

  // Idle animation - subtle breathing effect
  useFrame((state) => {
    if (groupRef.current && !selectedChoice) {
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.05 + 1
    }
  })

  // Transformation when choice is made
  useEffect(() => {
    if (selectedChoice === 'good' && angelWingsRef.current) {
      gsap.fromTo(angelWingsRef.current.scale,
        { x: 0, y: 0, z: 0 },
        {
          x: 1,
          y: 1,
          z: 1,
          duration: 1.5,
          ease: 'back.out(1.7)',
          delay: 0.3
        }
      )
      // Glow effect on character
      gsap.to(bodyRef.current.material, {
        emissive: new THREE.Color('#ffd700'),
        emissiveIntensity: 0.3,
        duration: 1.5
      })
    } else if (selectedChoice === 'evil' && devilWingsRef.current) {
      gsap.fromTo(devilWingsRef.current.scale,
        { x: 0, y: 0, z: 0 },
        {
          x: 1,
          y: 1,
          z: 1,
          duration: 1.5,
          ease: 'back.out(1.7)',
          delay: 0.3
        }
      )
      // Red glow effect on character
      gsap.to(bodyRef.current.material, {
        emissive: new THREE.Color('#ff0000'),
        emissiveIntensity: 0.3,
        duration: 1.5
      })
    }
  }, [selectedChoice])

  return (
    <group ref={groupRef} position={[0, 1, 0]}>
      {/* Body - simple humanoid shape */}
      <mesh ref={bodyRef} castShadow position={[0, 0.5, 0]}>
        <capsuleGeometry args={[0.35, 1, 16, 32]} />
        <meshStandardMaterial
          color="#8B7355"
          roughness={0.7}
          metalness={0.1}
        />
      </mesh>

      {/* Head */}
      <mesh ref={headRef} castShadow position={[0, 1.6, 0]}>
        <sphereGeometry args={[0.3, 32, 32]} />
        <meshStandardMaterial
          color="#C9A581"
          roughness={0.6}
          metalness={0.1}
        />
      </mesh>

      {/* Arms */}
      <mesh castShadow position={[-0.5, 0.3, 0]} rotation={[0, 0, 0.3]}>
        <capsuleGeometry args={[0.12, 0.8, 8, 16]} />
        <meshStandardMaterial color="#8B7355" roughness={0.7} />
      </mesh>
      <mesh castShadow position={[0.5, 0.3, 0]} rotation={[0, 0, -0.3]}>
        <capsuleGeometry args={[0.12, 0.8, 8, 16]} />
        <meshStandardMaterial color="#8B7355" roughness={0.7} />
      </mesh>

      {/* Legs */}
      <mesh castShadow position={[-0.2, -0.3, 0]}>
        <capsuleGeometry args={[0.15, 0.9, 8, 16]} />
        <meshStandardMaterial color="#654321" roughness={0.8} />
      </mesh>
      <mesh castShadow position={[0.2, -0.3, 0]}>
        <capsuleGeometry args={[0.15, 0.9, 8, 16]} />
        <meshStandardMaterial color="#654321" roughness={0.8} />
      </mesh>

      {/* Angel Wings - hidden initially */}
      <group ref={angelWingsRef} position={[0, 0.8, -0.2]} scale={0}>
        <AngelWings />
      </group>

      {/* Devil Wings - hidden initially */}
      <group ref={devilWingsRef} position={[0, 0.8, -0.2]} scale={0}>
        <DevilWings />
      </group>
    </group>
  )
}

/**
 * ANGEL WINGS
 * Beautiful white feathered wings
 */
function AngelWings() {
  return (
    <>
      {/* Left wing */}
      <mesh position={[-0.3, 0, 0]} rotation={[0, 0.5, 0]} castShadow>
        <boxGeometry args={[0.1, 1.2, 0.8]} />
        <meshStandardMaterial
          color="#FFFFFF"
          roughness={0.3}
          metalness={0.1}
          emissive="#FFD700"
          emissiveIntensity={0.2}
        />
      </mesh>
      {/* Left wing feather detail */}
      <mesh position={[-0.35, 0, -0.2]} rotation={[0, 0.7, 0]} castShadow>
        <boxGeometry args={[0.05, 0.9, 0.6]} />
        <meshStandardMaterial
          color="#F0F0F0"
          roughness={0.4}
          emissive="#FFD700"
          emissiveIntensity={0.1}
        />
      </mesh>

      {/* Right wing */}
      <mesh position={[0.3, 0, 0]} rotation={[0, -0.5, 0]} castShadow>
        <boxGeometry args={[0.1, 1.2, 0.8]} />
        <meshStandardMaterial
          color="#FFFFFF"
          roughness={0.3}
          metalness={0.1}
          emissive="#FFD700"
          emissiveIntensity={0.2}
        />
      </mesh>
      {/* Right wing feather detail */}
      <mesh position={[0.35, 0, -0.2]} rotation={[0, -0.7, 0]} castShadow>
        <boxGeometry args={[0.05, 0.9, 0.6]} />
        <meshStandardMaterial
          color="#F0F0F0"
          roughness={0.4}
          emissive="#FFD700"
          emissiveIntensity={0.1}
        />
      </mesh>
    </>
  )
}

/**
 * DEVIL WINGS
 * Dark bat-like wings
 */
function DevilWings() {
  return (
    <>
      {/* Left wing */}
      <mesh position={[-0.3, 0, 0]} rotation={[0, 0.6, 0]} castShadow>
        <coneGeometry args={[0.6, 1.2, 3]} />
        <meshStandardMaterial
          color="#1a0000"
          roughness={0.6}
          metalness={0.3}
          emissive="#8B0000"
          emissiveIntensity={0.3}
        />
      </mesh>
      {/* Left wing membrane */}
      <mesh position={[-0.4, 0, -0.1]} rotation={[0, 0.8, 0]} castShadow>
        <boxGeometry args={[0.05, 0.9, 0.5]} />
        <meshStandardMaterial
          color="#330000"
          roughness={0.7}
          emissive="#8B0000"
          emissiveIntensity={0.2}
        />
      </mesh>

      {/* Right wing */}
      <mesh position={[0.3, 0, 0]} rotation={[0, -0.6, 0]} castShadow>
        <coneGeometry args={[0.6, 1.2, 3]} />
        <meshStandardMaterial
          color="#1a0000"
          roughness={0.6}
          metalness={0.3}
          emissive="#8B0000"
          emissiveIntensity={0.3}
        />
      </mesh>
      {/* Right wing membrane */}
      <mesh position={[0.4, 0, -0.1]} rotation={[0, -0.8, 0]} castShadow>
        <boxGeometry args={[0.05, 0.9, 0.5]} />
        <meshStandardMaterial
          color="#330000"
          roughness={0.7}
          emissive="#8B0000"
          emissiveIntensity={0.2}
        />
      </mesh>
    </>
  )
}

/**
 * CHOICE ICONS
 * Three floating interactive symbols representing moral choices
 */
function ChoiceIcons({ onChoiceSelect, selectedChoice }) {
  return (
    <group>
      {/* Good choice - Golden Halo */}
      <ChoiceIcon
        position={[-3, 2.5, 2]}
        type="good"
        color="#FFD700"
        onSelect={onChoiceSelect}
        disabled={selectedChoice !== null}
      />

      {/* Evil choice - Red Flame */}
      <ChoiceIcon
        position={[3, 2.5, 2]}
        type="evil"
        color="#DC143C"
        onSelect={onChoiceSelect}
        disabled={selectedChoice !== null}
      />

      {/* Neutral choice - Gray Balance */}
      <ChoiceIcon
        position={[0, 3.5, 2]}
        type="neutral"
        color="#808080"
        onSelect={onChoiceSelect}
        disabled={selectedChoice !== null}
      />
    </group>
  )
}

/**
 * INDIVIDUAL CHOICE ICON
 * Interactive floating symbol with hover effects
 */
function ChoiceIcon({ position, type, color, onSelect, disabled }) {
  const meshRef = useRef()
  const glowRef = useRef()
  const [hovered, setHovered] = useState(false)

  // Floating animation
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 2 + position[0]) * 0.1
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.5
    }
  })

  // Hover effect
  useEffect(() => {
    if (meshRef.current && !disabled) {
      if (hovered) {
        gsap.to(meshRef.current.scale, {
          x: 1.3,
          y: 1.3,
          z: 1.3,
          duration: 0.3,
          ease: 'power2.out'
        })
        gsap.to(glowRef.current.material, {
          opacity: 0.6,
          duration: 0.3
        })
      } else {
        gsap.to(meshRef.current.scale, {
          x: 1,
          y: 1,
          z: 1,
          duration: 0.3,
          ease: 'power2.out'
        })
        gsap.to(glowRef.current.material, {
          opacity: 0.2,
          duration: 0.3
        })
      }
    }
  }, [hovered, disabled])

  const handleClick = () => {
    if (!disabled) {
      onSelect(type)
      // Dramatic click animation
      gsap.to(meshRef.current.scale, {
        x: 0.5,
        y: 0.5,
        z: 0.5,
        duration: 0.5,
        ease: 'power2.in'
      })
      gsap.to(meshRef.current.material, {
        opacity: 0,
        duration: 0.5
      })
    }
  }

  return (
    <group position={position}>
      {/* Outer glow */}
      <mesh ref={glowRef}>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshBasicMaterial
          color={color}
          transparent
          opacity={0.2}
        />
      </mesh>

      {/* Main icon */}
      <mesh
        ref={meshRef}
        onPointerOver={() => !disabled && setHovered(true)}
        onPointerOut={() => setHovered(false)}
        onClick={handleClick}
        castShadow
      >
        {type === 'good' && <HaloIcon />}
        {type === 'evil' && <FlameIcon />}
        {type === 'neutral' && <BalanceIcon />}
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.5}
          roughness={0.3}
          metalness={0.7}
        />
      </mesh>
    </group>
  )
}

/**
 * HALO ICON GEOMETRY
 * Ring shape representing goodness
 */
function HaloIcon() {
  return <torusGeometry args={[0.3, 0.08, 16, 32]} />
}

/**
 * FLAME ICON GEOMETRY
 * Pointed shape representing evil
 */
function FlameIcon() {
  return <coneGeometry args={[0.25, 0.6, 8]} />
}

/**
 * BALANCE ICON GEOMETRY
 * Scale shape representing neutrality
 */
function BalanceIcon() {
  return (
    <group>
      <boxGeometry args={[0.5, 0.05, 0.05]} />
    </group>
  )
}

/**
 * PARTICLE EFFECTS
 * Ambient particles based on moral choice
 */
function ParticleEffects({ type }) {
  const particlesRef = useRef()
  const particleCount = 100

  const positions = React.useMemo(() => {
    const positions = new Float32Array(particleCount * 3)
    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 10
      positions[i * 3 + 1] = Math.random() * 5
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10
    }
    return positions
  }, [])

  useFrame((state) => {
    if (particlesRef.current) {
      const positions = particlesRef.current.geometry.attributes.position.array
      for (let i = 0; i < particleCount; i++) {
        if (type === 'good') {
          // Rising golden particles
          positions[i * 3 + 1] += 0.01
          if (positions[i * 3 + 1] > 6) positions[i * 3 + 1] = 0
        } else if (type === 'evil') {
          // Falling ember particles
          positions[i * 3 + 1] -= 0.01
          if (positions[i * 3 + 1] < 0) positions[i * 3 + 1] = 5
        }
      }
      particlesRef.current.geometry.attributes.position.needsUpdate = true
    }
  })

  const particleColor = type === 'good' ? '#FFD700' : type === 'evil' ? '#FF4500' : '#808080'

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particleCount}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.1}
        color={particleColor}
        transparent
        opacity={0.6}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}

export default Scene
