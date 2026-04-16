import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import logo from '@/assets/aquaflow-logo.png'

interface AquaLoaderProps {
  onComplete?: () => void
  duration?: number
}

export function AquaLoader({ onComplete, duration = 3200 }: AquaLoaderProps) {
  const [progress, setProgress] = useState(0)
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const start = performance.now()
    let raf = 0
    const tick = (t: number) => {
      const elapsed = t - start
      const pct = Math.min(100, (elapsed / duration) * 100)
      setProgress(pct)
      if (pct < 100) raf = requestAnimationFrame(tick)
      else {
        setTimeout(() => {
          setVisible(false)
          onComplete?.()
        }, 450)
      }
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [duration, onComplete])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="aqua-loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.8, ease: 'easeInOut' } }}
          className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden"
          style={{
            background:
              'linear-gradient(135deg, #001d3d 0%, #003566 35%, #0a6abf 75%, #00d4ff 100%)',
          }}
        >
          {/* Aurora glow blobs */}
          <div className="absolute inset-0 pointer-events-none">
            <div
              className="absolute -top-32 -left-32 w-[40rem] h-[40rem] rounded-full blur-3xl opacity-40 animate-aurora"
              style={{ background: 'radial-gradient(circle, hsl(var(--accent-cyan, 187 100% 50%) / 0.6), transparent 70%)' }}
            />
            <div
              className="absolute -bottom-40 -right-40 w-[45rem] h-[45rem] rounded-full blur-3xl opacity-30 animate-aurora"
              style={{
                background: 'radial-gradient(circle, hsl(187 100% 50% / 0.5), transparent 70%)',
                animationDelay: '4s',
              }}
            />
          </div>

          {/* Rising bubbles */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {Array.from({ length: 18 }).map((_, i) => {
              const size = 6 + Math.random() * 22
              const left = Math.random() * 100
              const dur = 7 + Math.random() * 9
              const delay = Math.random() * 6
              return (
                <span
                  key={i}
                  className="absolute rounded-full animate-bubble"
                  style={{
                    left: `${left}%`,
                    bottom: `-${size}px`,
                    width: size,
                    height: size,
                    background:
                      'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.9), rgba(0,212,255,0.25) 60%, transparent 70%)',
                    border: '1px solid rgba(255,255,255,0.35)',
                    animationDuration: `${dur}s`,
                    animationDelay: `${delay}s`,
                  }}
                />
              )
            })}
          </div>

          {/* Caustic shimmer */}
          <div className="absolute inset-0 pointer-events-none mix-blend-overlay">
            <div
              className="absolute top-1/4 left-1/3 w-96 h-96 rounded-full blur-3xl animate-shimmer"
              style={{ background: 'radial-gradient(circle, rgba(255,255,255,0.4), transparent 70%)' }}
            />
            <div
              className="absolute bottom-1/4 right-1/3 w-80 h-80 rounded-full blur-3xl animate-shimmer"
              style={{
                background: 'radial-gradient(circle, rgba(0,212,255,0.5), transparent 70%)',
                animationDelay: '6s',
              }}
            />
          </div>

          {/* Center content */}
          <div className="relative z-10 flex flex-col items-center px-6">
            {/* Droplet with concentric ripples */}
            <div className="relative w-44 h-44 md:w-56 md:h-56 flex items-center justify-center mb-10">
              {/* Ripple rings */}
              {[0, 0.6, 1.2].map((delay, i) => (
                <motion.span
                  key={i}
                  className="absolute inset-0 rounded-full border-2"
                  style={{ borderColor: 'rgba(0, 212, 255, 0.55)' }}
                  initial={{ scale: 0.6, opacity: 0.8 }}
                  animate={{ scale: 1.6, opacity: 0 }}
                  transition={{
                    duration: 2.4,
                    repeat: Infinity,
                    ease: 'easeOut',
                    delay,
                  }}
                />
              ))}

              {/* Soft halo */}
              <div
                className="absolute inset-4 rounded-full blur-2xl"
                style={{ background: 'radial-gradient(circle, rgba(0,212,255,0.55), transparent 70%)' }}
              />

              {/* Progress ring */}
              <svg className="absolute inset-0 -rotate-90" viewBox="0 0 100 100">
                <defs>
                  <linearGradient id="aqua-loader-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
                    <stop offset="50%" stopColor="#00d4ff" />
                    <stop offset="100%" stopColor="#0a6abf" />
                  </linearGradient>
                </defs>
                <circle
                  cx="50"
                  cy="50"
                  r="46"
                  fill="none"
                  stroke="rgba(255,255,255,0.15)"
                  strokeWidth="2"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="46"
                  fill="none"
                  stroke="url(#aqua-loader-grad)"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeDasharray={2 * Math.PI * 46}
                  strokeDashoffset={2 * Math.PI * 46 * (1 - progress / 100)}
                  style={{ transition: 'stroke-dashoffset 0.1s linear' }}
                />
              </svg>

              {/* Logo with float */}
              <motion.img
                src={logo}
                alt="AquaFlow"
                className="relative z-10 w-24 h-24 md:w-32 md:h-32 object-contain drop-shadow-[0_0_25px_rgba(0,212,255,0.8)]"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3.6, repeat: Infinity, ease: 'easeInOut' }}
              />
            </div>

            {/* Wordmark */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="text-center"
            >
              <h1
                className="text-4xl md:text-6xl tracking-tight text-white"
                style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700 }}
              >
                Aqua<span style={{ color: '#00d4ff' }}>Flow</span>
              </h1>
              <p className="mt-3 text-sm md:text-base text-white/70 tracking-[0.3em] uppercase">
                Smart Water Intelligence
              </p>
            </motion.div>

            {/* Progress bar */}
            <div className="mt-10 w-64 md:w-80">
              <div className="h-[3px] w-full rounded-full bg-white/15 overflow-hidden">
                <motion.div
                  className="h-full rounded-full"
                  style={{
                    background: 'linear-gradient(90deg, #ffffff, #00d4ff, #0a6abf)',
                    width: `${progress}%`,
                    boxShadow: '0 0 12px rgba(0,212,255,0.8)',
                  }}
                />
              </div>
              <div className="mt-3 flex items-center justify-between text-[11px] tracking-widest uppercase text-white/60">
                <span>Calibrating sensors</span>
                <span className="tabular-nums text-white/80">{Math.floor(progress)}%</span>
              </div>
            </div>
          </div>

          {/* Bottom water waves */}
          <div className="absolute bottom-0 left-0 right-0 pointer-events-none">
            <svg
              className="block w-full h-32 md:h-40"
              viewBox="0 0 1440 200"
              preserveAspectRatio="none"
            >
              <defs>
                <linearGradient id="loader-wave-1" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="#00d4ff" stopOpacity="0.5" />
                  <stop offset="100%" stopColor="#0a6abf" stopOpacity="0.9" />
                </linearGradient>
                <linearGradient id="loader-wave-2" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="#ffffff" stopOpacity="0.25" />
                  <stop offset="100%" stopColor="#00d4ff" stopOpacity="0.6" />
                </linearGradient>
              </defs>
              <g className="animate-wave-slow">
                <path
                  d="M0,100 C240,160 480,40 720,100 C960,160 1200,40 1440,100 L1440,200 L0,200 Z"
                  fill="url(#loader-wave-2)"
                />
              </g>
              <g className="animate-wave">
                <path
                  d="M0,130 C240,80 480,180 720,130 C960,80 1200,180 1440,130 L1440,200 L0,200 Z"
                  fill="url(#loader-wave-1)"
                />
              </g>
            </svg>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
