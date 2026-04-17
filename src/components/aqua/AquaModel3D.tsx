import { Suspense, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import {
  OrbitControls,
  useGLTF,
  Environment,
  ContactShadows,
  Html,
  Float,
} from '@react-three/drei'
import { motion } from 'framer-motion'
import * as THREE from 'three'

function Model() {
  const group = useRef<THREE.Group>(null)
  const { scene } = useGLTF('/models/aquaflow.glb')

  // Slow elegant auto-rotation on Y axis
  useFrame((_, delta) => {
    if (group.current) {
      group.current.rotation.y += delta * 0.25
    }
  })

  // Enable shadows on all meshes
  scene.traverse((obj) => {
    if ((obj as THREE.Mesh).isMesh) {
      const mesh = obj as THREE.Mesh
      mesh.castShadow = true
      mesh.receiveShadow = true
    }
  })

  return (
    <Float speed={1.2} rotationIntensity={0.15} floatIntensity={0.4}>
      <group ref={group} dispose={null}>
        <primitive object={scene} scale={1.6} position={[0, -0.2, 0]} />
      </group>
    </Float>
  )
}

function Loader() {
  return (
    <Html center>
      <div className="flex flex-col items-center gap-3">
        <div className="w-10 h-10 border-2 border-[#00d4ff]/30 border-t-[#00d4ff] rounded-full animate-spin" />
        <p className="text-xs tracking-[0.3em] text-[#00d4ff]/80 font-mono">
          LOADING MODEL
        </p>
      </div>
    </Html>
  )
}

useGLTF.preload('/models/aquaflow.glb')

export function AquaModel3D() {
  return (
    <section
      id="model"
      className="relative w-full py-24 md:py-32 overflow-hidden bg-gradient-to-b from-[#020617] via-[#0a1628] to-[#020617]"
    >
      {/* Ambient glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#00d4ff]/10 rounded-full blur-[120px]" />
        <div className="absolute top-0 left-0 w-[300px] h-[300px] bg-[#0066ff]/10 rounded-full blur-[100px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 md:mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full border border-[#00d4ff]/30 bg-[#00d4ff]/5 text-[#00d4ff] text-xs font-mono tracking-[0.3em] mb-4">
            3D PREVIEW
          </span>
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-4">
            Explore the Device
          </h2>
          <p className="text-white/60 max-w-2xl mx-auto text-base md:text-lg">
            Drag to rotate • Scroll to zoom • Pinch on mobile
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 1 }}
          className="relative w-full h-[60vh] min-h-[420px] md:h-[70vh] rounded-3xl overflow-hidden border border-white/10 bg-gradient-to-br from-white/5 to-transparent backdrop-blur-sm"
        >
          {/* HUD corners */}
          <div className="pointer-events-none absolute inset-0 z-10">
            <div className="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-[#00d4ff]/60" />
            <div className="absolute top-4 right-4 w-8 h-8 border-r-2 border-t-2 border-[#00d4ff]/60" />
            <div className="absolute bottom-4 left-4 w-8 h-8 border-l-2 border-b-2 border-[#00d4ff]/60" />
            <div className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-[#00d4ff]/60" />
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-[10px] font-mono tracking-[0.4em] text-[#00d4ff]/70">
              AQUAFLOW · MODEL.V1
            </div>
          </div>

          <Canvas
            shadows
            dpr={[1, 2]}
            camera={{ position: [3, 1.5, 4], fov: 40 }}
            gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
          >
            <color attach="background" args={['#020617']} />
            <fog attach="fog" args={['#020617', 8, 20]} />

            <ambientLight intensity={0.4} />
            <directionalLight
              position={[5, 8, 5]}
              intensity={1.2}
              castShadow
              shadow-mapSize-width={1024}
              shadow-mapSize-height={1024}
              shadow-camera-far={20}
              shadow-camera-left={-5}
              shadow-camera-right={5}
              shadow-camera-top={5}
              shadow-camera-bottom={-5}
            />
            <pointLight position={[-5, 2, -5]} intensity={0.6} color="#00d4ff" />
            <pointLight position={[5, -2, 3]} intensity={0.4} color="#0066ff" />

            <Suspense fallback={<Loader />}>
              <Model />
              <ContactShadows
                position={[0, -1.4, 0]}
                opacity={0.5}
                scale={10}
                blur={2.5}
                far={4}
              />
              <Environment preset="city" />
            </Suspense>

            <OrbitControls
              enablePan={false}
              enableZoom
              minDistance={2.5}
              maxDistance={8}
              autoRotate={false}
              rotateSpeed={0.6}
              zoomSpeed={0.7}
              minPolarAngle={Math.PI / 4}
              maxPolarAngle={Math.PI / 1.6}
            />
          </Canvas>
        </motion.div>
      </div>
    </section>
  )
}
