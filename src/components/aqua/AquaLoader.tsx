import { useEffect, useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import logo from '@/assets/aquaflow-logo.png'

interface AquaLoaderProps {
  onComplete?: () => void
  duration?: number
}

const PHASES = [
  'Initializing AquaFlow',
  'Calibrating sensors',
  'Syncing flow data',
  'Optimizing pressure',
  'Ready to dive in',
]

export function AquaLoader({ onComplete, duration = 4200 }: AquaLoaderProps) {
  const [progress, setProgress] = useState(0)
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const start = performance.now()
    let raf = 0
    const tick = (t: number) => {
      const elapsed = t - start
      // ease-out for a more cinematic finish
      const linear = Math.min(1, elapsed / duration)
      const eased = 1 - Math.pow(1 - linear, 1.6)
      setProgress(eased * 100)
      if (linear < 1) raf = requestAnimationFrame(tick)
      else {
        setTimeout(() => {
          setVisible(false)
          onComplete?.()
        }, 600)
      }
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [duration, onComplete])

  const phase = PHASES[Math.min(PHASES.length - 1, Math.floor((progress / 100) * PHASES.length))]

  // Pre-compute bubble + particle positions once
  const bubbles = useMemo(
    () =>
      Array.from({ length: 26 }).map(() => ({
        size: 5 + Math.random() * 26,
        left: Math.random() * 100,
        dur: 7 + Math.random() * 10,
        delay: Math.random() * 8,
        sway: 10 + Math.random() * 30,
      })),
    [],
  )

  const orbitParticles = useMemo(
    () => Array.from({ length: 8 }).map((_, i) => ({ angle: (i / 8) * 360, delay: i * 0.4 })),
    [],
  )

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="aqua-loader"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            scale: 1.05,
            filter: 'blur(8px)',
            transition: { duration: 0.9, ease: 'easeInOut' },
          }}
          className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden"
          style={{
            background:
              'radial-gradient(ellipse at top, #003566 0%, #001d3d 55%, #00060f 100%)',
          }}
        >
          {/* Deep water vignette */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                'radial-gradient(ellipse at center, transparent 30%, rgba(0,6,15,0.7) 100%)',
            }}
          />

          {/* Aurora glow blobs */}
          <div className="absolute inset-0 pointer-events-none">
            <div
              className="absolute -top-40 -left-40 w-[44rem] h-[44rem] rounded-full blur-3xl opacity-50 animate-aurora"
              style={{ background: 'radial-gradient(circle, rgba(0,212,255,0.55), transparent 70%)' }}
            />
            <div
              className="absolute -bottom-48 -right-48 w-[50rem] h-[50rem] rounded-full blur-3xl opacity-40 animate-aurora"
              style={{
                background: 'radial-gradient(circle, rgba(10,106,191,0.6), transparent 70%)',
                animationDelay: '5s',
              }}
            />
            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[30rem] h-[30rem] rounded-full blur-3xl opacity-30 animate-aurora"
              style={{
                background: 'radial-gradient(circle, rgba(20,184,166,0.5), transparent 70%)',
                animationDelay: '2s',
              }}
            />
          </div>

          {/* Caustic shimmer */}
          <div className="absolute inset-0 pointer-events-none mix-blend-overlay">
            <div
              className="absolute top-1/4 left-1/3 w-[28rem] h-[28rem] rounded-full blur-3xl animate-shimmer"
              style={{ background: 'radial-gradient(circle, rgba(255,255,255,0.45), transparent 70%)' }}
            />
            <div
              className="absolute bottom-1/4 right-1/3 w-[24rem] h-[24rem] rounded-full blur-3xl animate-shimmer"
              style={{
                background: 'radial-gradient(circle, rgba(0,212,255,0.55), transparent 70%)',
                animationDelay: '6s',
              }}
            />
          </div>

          {/* Rising bubbles */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {bubbles.map((b, i) => (
              <span
                key={i}
                className="absolute rounded-full animate-bubble"
                style={{
                  left: `${b.left}%`,
                  bottom: `-${b.size}px`,
                  width: b.size,
                  height: b.size,
                  background:
                    'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.95), rgba(0,212,255,0.25) 60%, transparent 70%)',
                  border: '1px solid rgba(255,255,255,0.4)',
                  animationDuration: `${b.dur}s`,
                  animationDelay: `${b.delay}s`,
                  filter: 'drop-shadow(0 0 6px rgba(0,212,255,0.4))',
                }}
              />
            ))}
          </div>

          {/* Subtle grid horizon */}
          <div
            className="absolute inset-x-0 bottom-0 h-1/2 pointer-events-none opacity-20"
            style={{
              backgroundImage:
                'linear-gradient(to right, rgba(0,212,255,0.4) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,212,255,0.4) 1px, transparent 1px)',
              backgroundSize: '60px 60px',
              maskImage: 'linear-gradient(to top, black, transparent)',
              WebkitMaskImage: 'linear-gradient(to top, black, transparent)',
              transform: 'perspective(600px) rotateX(60deg)',
              transformOrigin: 'bottom',
            }}
          />

          {/* Center stage */}
          <div className="relative z-10 flex flex-col items-center px-6">
            {/* Droplet stage */}
            <div className="relative w-56 h-56 md:w-72 md:h-72 flex items-center justify-center mb-12">
              {/* Outer concentric rings */}
              {[0, 0.7, 1.4, 2.1].map((delay, i) => (
                <motion.span
                  key={i}
                  className="absolute inset-0 rounded-full border"
                  style={{ borderColor: 'rgba(0, 212, 255, 0.45)' }}
                  initial={{ scale: 0.55, opacity: 0.9 }}
                  animate={{ scale: 1.8, opacity: 0 }}
                  transition={{
                    duration: 3.2,
                    repeat: Infinity,
                    ease: 'easeOut',
                    delay,
                  }}
                />
              ))}

              {/* Rotating dashed orbit */}
              <motion.svg
                className="absolute inset-0"
                viewBox="0 0 100 100"
                animate={{ rotate: 360 }}
                transition={{ duration: 22, repeat: Infinity, ease: 'linear' }}
              >
                <circle
                  cx="50"
                  cy="50"
                  r="48"
                  fill="none"
                  stroke="rgba(0,212,255,0.35)"
                  strokeWidth="0.4"
                  strokeDasharray="1 3"
                />
              </motion.svg>

              {/* Counter-rotating orbit with particles */}
              <motion.div
                className="absolute inset-0"
                animate={{ rotate: -360 }}
                transition={{ duration: 16, repeat: Infinity, ease: 'linear' }}
              >
                {orbitParticles.map((p, i) => (
                  <motion.span
                    key={i}
                    className="absolute top-1/2 left-1/2 w-1.5 h-1.5 rounded-full"
                    style={{
                      background: '#00d4ff',
                      boxShadow: '0 0 10px #00d4ff, 0 0 20px rgba(0,212,255,0.6)',
                      transform: `rotate(${p.angle}deg) translate(0, -45%) translate(-50%, -50%)`,
                      transformOrigin: 'center',
                    }}
                    animate={{ opacity: [0.4, 1, 0.4] }}
                    transition={{ duration: 2.4, repeat: Infinity, delay: p.delay }}
                  />
                ))}
              </motion.div>

              {/* Soft halo */}
              <div
                className="absolute inset-6 rounded-full blur-2xl"
                style={{ background: 'radial-gradient(circle, rgba(0,212,255,0.7), transparent 70%)' }}
              />

              {/* Progress ring (gradient) */}
              <svg className="absolute inset-0 -rotate-90" viewBox="0 0 100 100">
                <defs>
                  <linearGradient id="aqua-loader-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
                    <stop offset="50%" stopColor="#00d4ff" />
                    <stop offset="100%" stopColor="#0a6abf" />
                  </linearGradient>
                  <filter id="aqua-loader-glow">
                    <feGaussianBlur stdDeviation="1.2" result="b" />
                    <feMerge>
                      <feMergeNode in="b" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>
                <circle
                  cx="50"
                  cy="50"
                  r="44"
                  fill="none"
                  stroke="rgba(255,255,255,0.12)"
                  strokeWidth="1.5"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="44"
                  fill="none"
                  stroke="url(#aqua-loader-grad)"
                  strokeWidth="2.6"
                  strokeLinecap="round"
                  strokeDasharray={2 * Math.PI * 44}
                  strokeDashoffset={2 * Math.PI * 44 * (1 - progress / 100)}
                  filter="url(#aqua-loader-glow)"
                  style={{ transition: 'stroke-dashoffset 0.1s linear' }}
                />
              </svg>

              {/* Liquid fill clipped to a circle behind logo */}
              <div className="absolute inset-8 rounded-full overflow-hidden border border-white/10 backdrop-blur-sm bg-white/5">
                <div
                  className="absolute inset-x-0 bottom-0 transition-[height] duration-200 ease-linear"
                  style={{ height: `${progress}%` }}
                >
                  <div
                    className="absolute inset-0"
                    style={{
                      background:
                        'linear-gradient(180deg, rgba(0,212,255,0.55) 0%, rgba(10,106,191,0.85) 100%)',
                    }}
                  />
                  {/* Wave surface */}
                  <svg
                    className="absolute -top-3 left-0 w-[200%] h-6 animate-wave"
                    viewBox="0 0 1200 24"
                    preserveAspectRatio="none"
                  >
                    <path
                      d="M0,12 C150,0 300,24 450,12 C600,0 750,24 900,12 C1050,0 1200,24 1200,12 L1200,24 L0,24 Z"
                      fill="rgba(255,255,255,0.55)"
                    />
                  </svg>
                  <svg
                    className="absolute -top-2 left-0 w-[200%] h-5 animate-wave-slow opacity-70"
                    viewBox="0 0 1200 24"
                    preserveAspectRatio="none"
                  >
                    <path
                      d="M0,12 C200,24 400,0 600,12 C800,24 1000,0 1200,12 L1200,24 L0,24 Z"
                      fill="rgba(0,212,255,0.7)"
                    />
                  </svg>
                </div>
              </div>

              {/* Logo with float */}
              <motion.img
                src={logo}
                alt="AquaFlow"
                className="relative z-10 w-28 h-28 md:w-36 md:h-36 object-contain drop-shadow-[0_0_30px_rgba(0,212,255,0.9)]"
                animate={{ y: [0, -10, 0], scale: [1, 1.04, 1] }}
                transition={{ duration: 4.2, repeat: Infinity, ease: 'easeInOut' }}
              />

              {/* Scanning beam */}
              <motion.div
                className="absolute inset-0 rounded-full overflow-hidden pointer-events-none"
                style={{ maskImage: 'radial-gradient(circle, black 60%, transparent 62%)', WebkitMaskImage: 'radial-gradient(circle, black 60%, transparent 62%)' }}
              >
                <motion.div
                  className="absolute left-1/2 top-1/2 w-[160%] h-[2px] origin-left"
                  style={{
                    background:
                      'linear-gradient(90deg, transparent, rgba(0,212,255,0.9), transparent)',
                    boxShadow: '0 0 14px rgba(0,212,255,0.9)',
                  }}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 3.5, repeat: Infinity, ease: 'linear' }}
                />
              </motion.div>
            </div>

            {/* Wordmark */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.1, delay: 0.3 }}
              className="text-center"
            >
              <h1
                className="text-5xl md:text-7xl tracking-tight text-white"
                style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700 }}
              >
                {'Aqua'.split('').map((c, i) => (
                  <motion.span
                    key={`a-${i}`}
                    className="inline-block"
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.5 + i * 0.07 }}
                  >
                    {c}
                  </motion.span>
                ))}
                {'Flow'.split('').map((c, i) => (
                  <motion.span
                    key={`f-${i}`}
                    className="inline-block"
                    style={{ color: '#00d4ff', textShadow: '0 0 18px rgba(0,212,255,0.7)' }}
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.85 + i * 0.07 }}
                  >
                    {c}
                  </motion.span>
                ))}
              </h1>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 1.4 }}
                className="mt-4 text-xs md:text-sm text-white/70 tracking-[0.45em] uppercase"
              >
                Smart Water Intelligence
              </motion.p>
            </motion.div>

            {/* Phase + progress */}
            <div className="mt-12 w-72 md:w-96">
              <div className="relative h-[3px] w-full rounded-full bg-white/10 overflow-hidden">
                <motion.div
                  className="absolute inset-y-0 left-0 rounded-full"
                  style={{
                    background:
                      'linear-gradient(90deg, #ffffff, #00d4ff 50%, #0a6abf)',
                    width: `${progress}%`,
                    boxShadow: '0 0 14px rgba(0,212,255,0.9)',
                  }}
                />
                {/* Trailing shimmer */}
                <motion.div
                  className="absolute inset-y-0 w-24 -translate-x-full"
                  style={{
                    background:
                      'linear-gradient(90deg, transparent, rgba(255,255,255,0.6), transparent)',
                    left: `${progress}%`,
                  }}
                  animate={{ opacity: [0.2, 1, 0.2] }}
                  transition={{ duration: 1.4, repeat: Infinity }}
                />
              </div>
              <div className="mt-4 flex items-center justify-between text-[11px] tracking-[0.3em] uppercase text-white/60">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={phase}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.4 }}
                    className="text-white/80"
                  >
                    {phase}
                  </motion.span>
                </AnimatePresence>
                <span className="tabular-nums text-white/90">
                  {String(Math.floor(progress)).padStart(2, '0')}%
                </span>
              </div>
            </div>
          </div>

          {/* Bottom layered waves */}
          <div className="absolute bottom-0 left-0 right-0 pointer-events-none">
            <svg
              className="block w-full h-36 md:h-44"
              viewBox="0 0 1440 220"
              preserveAspectRatio="none"
            >
              <defs>
                <linearGradient id="loader-wave-1" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="#00d4ff" stopOpacity="0.5" />
                  <stop offset="100%" stopColor="#0a6abf" stopOpacity="0.95" />
                </linearGradient>
                <linearGradient id="loader-wave-2" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="#ffffff" stopOpacity="0.25" />
                  <stop offset="100%" stopColor="#00d4ff" stopOpacity="0.65" />
                </linearGradient>
                <linearGradient id="loader-wave-3" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="#001d3d" stopOpacity="0.6" />
                  <stop offset="100%" stopColor="#000814" stopOpacity="1" />
                </linearGradient>
              </defs>
              <g className="animate-wave-slow" style={{ opacity: 0.6 }}>
                <path
                  d="M0,90 C240,150 480,30 720,90 C960,150 1200,30 1440,90 L1440,220 L0,220 Z"
                  fill="url(#loader-wave-2)"
                />
              </g>
              <g className="animate-wave">
                <path
                  d="M0,120 C240,70 480,170 720,120 C960,70 1200,170 1440,120 L1440,220 L0,220 Z"
                  fill="url(#loader-wave-1)"
                />
              </g>
              <g className="animate-wave-slow">
                <path
                  d="M0,160 C240,200 480,130 720,160 C960,200 1200,130 1440,160 L1440,220 L0,220 Z"
                  fill="url(#loader-wave-3)"
                />
              </g>
            </svg>
          </div>

          {/* Edge corner brackets — premium HUD feel */}
          <div className="absolute inset-6 pointer-events-none">
            {[
              'top-0 left-0 border-l-2 border-t-2',
              'top-0 right-0 border-r-2 border-t-2',
              'bottom-0 left-0 border-l-2 border-b-2',
              'bottom-0 right-0 border-r-2 border-b-2',
            ].map((cls, i) => (
              <motion.span
                key={i}
                className={`absolute w-10 h-10 ${cls}`}
                style={{ borderColor: 'rgba(0,212,255,0.5)' }}
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 + i * 0.1 }}
              />
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
