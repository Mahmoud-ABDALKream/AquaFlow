import { Suspense, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, useGLTF, Environment, ContactShadows, Float, Html } from '@react-three/drei'
import * as THREE from 'three'

function Model() {
  const group = useRef<THREE.Group>(null)
  const { scene } = useGLTF('/models/aquaflow.glb')

  useFrame((_, delta) => {
    if (group.current) group.current.rotation.y += delta * 0.18
  })

  scene.traverse((obj) => {
    if ((obj as THREE.Mesh).isMesh) {
      const mesh = obj as THREE.Mesh
      mesh.castShadow = true
      mesh.receiveShadow = true
    }
  })

  return (
    <Float speed={1.1} rotationIntensity={0.15} floatIntensity={0.5}>
      <group ref={group} dispose={null}>
        <primitive object={scene} scale={2.2} position={[0, -0.2, 0]} />
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

export function Mobile3DCanvas() {
  return (
    <Canvas
      shadows
      dpr={[1, 1.5]}
      camera={{ position: [2.6, 1.2, 3.2], fov: 40 }}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
    >
      <ambientLight intensity={0.55} />
      <directionalLight
        position={[5, 8, 5]}
        intensity={1.2}
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
        enableZoom={true}
        enableDamping
        dampingFactor={0.08}
        minDistance={2.2}
        maxDistance={6}
        minPolarAngle={Math.PI / 4}
        maxPolarAngle={Math.PI / 1.7}
        rotateSpeed={0.7}
        touches={{ ONE: THREE.TOUCH.ROTATE, TWO: THREE.TOUCH.DOLLY_PAN }}
      />
    </Canvas>
  )
}
