import { Suspense, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, useGLTF, Environment, ContactShadows, Float, Html } from '@react-three/drei'
import * as THREE from 'three'

function Model() {
  const group = useRef<THREE.Group>(null)
  const { scene } = useGLTF('/models/aquaflow.glb')

  useFrame((_, delta) => {
    if (group.current) group.current.rotation.y += delta * 0.25
  })

  scene.traverse((obj) => {
    if ((obj as THREE.Mesh).isMesh) {
      const mesh = obj as THREE.Mesh
      mesh.castShadow = true
      mesh.receiveShadow = true
    }
  })

  return (
      <Float speed={1.2} rotationIntensity={0.15} floatIntensity={0.5}>
        <group ref={group} dispose={null}>
          <primitive object={scene} scale={2.4} position={[0, -0.2, 0]} />
        </group>
      </Float>
  )
}

function Loader() {
  return (
    <Html center>
      <div className="w-8 h-8 border-2 border-[#00d4ff]/30 border-t-[#00d4ff] rounded-full animate-spin" />
    </Html>
  )
}

useGLTF.preload('/models/aquaflow.glb')

export function AquaHeroModel() {
  return (
    <div className="relative w-full h-[460px] md:h-[560px]">
      <Canvas
        shadows
        dpr={[1, 2]}
        camera={{ position: [1.8, 0.8, 2.3], fov: 32 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight
          position={[5, 8, 5]}
          intensity={1.3}
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
        />
        <pointLight position={[-5, 2, -5]} intensity={0.7} color="#00d4ff" />
        <pointLight position={[5, -2, 3]} intensity={0.4} color="#0066ff" />

        <Suspense fallback={<Loader />}>
          <Model />
          <ContactShadows position={[0, -1.4, 0]} opacity={0.45} scale={10} blur={2.5} far={4} />
          <Environment preset="city" />
        </Suspense>

        <OrbitControls
          enablePan={false}
          enableZoom={false}
          minPolarAngle={Math.PI / 3}
          maxPolarAngle={Math.PI / 1.8}
          rotateSpeed={0.6}
        />
      </Canvas>

      {/* Subtle hint */}
      <div className="pointer-events-none absolute bottom-2 left-1/2 -translate-x-1/2 text-[10px] font-mono tracking-[0.3em] text-[#00d4ff]/60">
        DRAG TO ROTATE
      </div>
    </div>
  )
}
