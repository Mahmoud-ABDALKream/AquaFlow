import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Smartphone, Tablet } from 'lucide-react'
import { AquaHeroModel } from './AquaHeroModel'

export function AquaDeviceShowcase() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section
      ref={ref}
      className="relative py-24 lg:py-32 overflow-hidden"
      style={{ background: 'var(--hero-gradient)' }}
    >
      {/* Ambient glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/3 left-1/4 w-[500px] h-[500px] rounded-full blur-[140px] opacity-60"
          style={{ background: 'radial-gradient(circle, rgba(0,212,255,0.25), transparent 70%)' }}
        />
        <div
          className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] rounded-full blur-[160px] opacity-50"
          style={{ background: 'radial-gradient(circle, rgba(20,184,166,0.2), transparent 70%)' }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <p className="text-sm font-semibold tracking-widest uppercase text-[#00d4ff] mb-3">
            Cross-Device Experience
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
            Aqua Flow on{' '}
            <span className="bg-gradient-to-r from-[#00d4ff] to-[#14b8a6] bg-clip-text text-transparent">
              Every Screen
            </span>
          </h2>
          <p className="text-white/70 text-lg">
            Experience the same immersive 3D control center on your mobile and tablet — designed to feel native everywhere.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center justify-items-center">
          {/* Tablet frame */}
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative w-full max-w-[520px] order-2 lg:order-1"
          >
            <div className="flex items-center gap-2 mb-4 text-white/80">
              <Tablet className="w-5 h-5 text-[#00d4ff]" />
              <span className="text-sm font-mono tracking-widest uppercase">Tablet</span>
            </div>

            {/* Tablet bezel */}
            <div className="relative aspect-[4/3] rounded-[36px] bg-gradient-to-br from-[#1a2332] to-[#0a1220] p-3 shadow-[0_30px_80px_-20px_rgba(0,212,255,0.4)] border border-white/10">
              {/* Inner screen */}
              <div className="relative w-full h-full rounded-[24px] overflow-hidden bg-gradient-to-br from-[#001d3d] to-[#003566]">
                <AquaHeroModel />
                {/* Reflection */}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/10" />
              </div>
              {/* Camera dot */}
              <div className="absolute top-1/2 -translate-y-1/2 left-1.5 w-1.5 h-1.5 rounded-full bg-white/30" />
            </div>
          </motion.div>

          {/* Phone frame */}
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative w-full max-w-[280px] order-1 lg:order-2"
          >
            <div className="flex items-center gap-2 mb-4 text-white/80">
              <Smartphone className="w-5 h-5 text-[#00d4ff]" />
              <span className="text-sm font-mono tracking-widest uppercase">Mobile</span>
            </div>

            {/* Phone bezel */}
            <div className="relative aspect-[9/19] rounded-[44px] bg-gradient-to-br from-[#1a2332] to-[#0a1220] p-2.5 shadow-[0_30px_80px_-20px_rgba(0,212,255,0.5)] border border-white/10">
              {/* Inner screen */}
              <div className="relative w-full h-full rounded-[36px] overflow-hidden bg-gradient-to-br from-[#001d3d] to-[#003566]">
                <div className="absolute inset-0">
                  <AquaHeroModel />
                </div>
                {/* Notch */}
                <div className="absolute top-2 left-1/2 -translate-x-1/2 w-20 h-5 rounded-full bg-black/80 z-10" />
                {/* Reflection */}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/10" />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
