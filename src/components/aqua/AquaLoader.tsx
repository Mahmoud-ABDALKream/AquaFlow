import { useEffect, useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import logo from '@/assets/aquaflow-logo.png'

interface AquaLoaderProps {
  onComplete?: () => void
  duration?: number
}

const PHASES = [
  { label: 'Booting AquaFlow OS', code: 'SYS.INIT' },
  { label: 'Establishing secure uplink', code: 'NET.LINK' },
  { label: 'Calibrating flow sensors', code: 'SNS.CAL' },
  { label: 'Streaming telemetry', code: 'TLM.SYNC' },
  { label: 'Optimizing pressure model', code: 'AI.OPT' },
  { label: 'System ready', code: 'SYS.OK' },
]

// Deterministic pseudo-random for stable SSR-safe layouts
const seeded = (i: number, salt = 1) => {
  const x = Math.sin(i * 9301 + salt * 49297) * 233280
  return x - Math.floor(x)
}

export function AquaLoader({ onComplete, duration = 4600 }: AquaLoaderProps) {
  const [progress, setProgress] = useState(0)
  const [visible, setVisible] = useState(true)
  const [now, setNow] = useState(() => new Date())

  useEffect(() => {
    const start = performance.now()
    let raf = 0
    const tick = (t: number) => {
      const elapsed = t - start
      const linear = Math.min(1, elapsed / duration)
      const eased = 1 - Math.pow(1 - linear, 1.7)
      setProgress(eased * 100)
      if (linear < 1) raf = requestAnimationFrame(tick)
      else {
        setTimeout(() => {
          setVisible(false)
          onComplete?.()
        }, 700)
      }
    }
    raf = requestAnimationFrame(tick)
    const clock = setInterval(() => setNow(new Date()), 1000)
    return () => {
      cancelAnimationFrame(raf)
      clearInterval(clock)
    }
  }, [duration, onComplete])

  const phaseIndex = Math.max(
    0,
    Math.min(
      PHASES.length - 1,
      Math.floor((progress / 100) * PHASES.length),
    ),
  )
  const phase = PHASES[phaseIndex] ?? PHASES[0]

  // Live-feel telemetry values driven by progress
  const flow = (12 + Math.sin(progress / 6) * 4 + progress * 0.18).toFixed(1)
  const pressure = (2.1 + Math.cos(progress / 5) * 0.4).toFixed(2)
  const ph = (7.0 + Math.sin(progress / 9) * 0.25).toFixed(2)
  const temp = (21.4 + Math.sin(progress / 11) * 0.6).toFixed(1)
  const nodes = Math.min(128, Math.floor(progress * 1.28))

  const bubbles = useMemo(
    () =>
      Array.from({ length: 22 }).map((_, i) => ({
        size: 4 + seeded(i, 2) * 22,
        left: seeded(i, 3) * 100,
        dur: 8 + seeded(i, 4) * 9,
        delay: seeded(i, 5) * 8,
      })),
    [],
  )

  const orbitParticles = useMemo(
    () => Array.from({ length: 6 }).map((_, i) => ({ angle: (i / 6) * 360, delay: i * 0.5 })),
    [],
  )

  const sonarRings = [0, 1.2, 2.4]

  // Mini sparkline waveform path
  const sparkPath = useMemo(() => {
    const pts = Array.from({ length: 40 }).map((_, i) => {
      const x = (i / 39) * 100
      const y = 50 + Math.sin(i * 0.6 + progress / 8) * 18 + Math.sin(i * 0.22) * 6
      return `${x.toFixed(2)},${y.toFixed(2)}`
    })
    return `M ${pts.join(' L ')}`
  }, [progress])

  const timeStr = now.toLocaleTimeString('en-GB', { hour12: false })

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="aqua-loader"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            scale: 1.04,
            filter: 'blur(10px)',
            transition: { duration: 1, ease: [0.4, 0, 0.2, 1] },
          }}
          className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden"
          style={{
            background:
              'radial-gradient(ellipse at 50% 20%, #003566 0%, #001a36 50%, #00060f 100%)',
          }}
        >
          {/* Vignette */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                'radial-gradient(ellipse at center, transparent 30%, rgba(0,6,15,0.85) 100%)',
            }}
          />

          {/* Aurora ambient blobs */}
          <div className="absolute inset-0 pointer-events-none">
            <div
              className="absolute -top-40 -left-40 w-[44rem] h-[44rem] rounded-full blur-3xl opacity-40 animate-aurora"
              style={{ background: 'radial-gradient(circle, rgba(0,212,255,0.55), transparent 70%)' }}
            />
            <div
              className="absolute -bottom-48 -right-48 w-[50rem] h-[50rem] rounded-full blur-3xl opacity-35 animate-aurora"
              style={{
                background: 'radial-gradient(circle, rgba(10,106,191,0.6), transparent 70%)',
                animationDelay: '5s',
              }}
            />
          </div>

          {/* Caustic shimmer */}
          <div className="absolute inset-0 pointer-events-none mix-blend-overlay opacity-80">
            <div
              className="absolute top-1/4 left-1/3 w-[28rem] h-[28rem] rounded-full blur-3xl animate-shimmer"
              style={{ background: 'radial-gradient(circle, rgba(255,255,255,0.35), transparent 70%)' }}
            />
            <div
              className="absolute bottom-1/4 right-1/3 w-[24rem] h-[24rem] rounded-full blur-3xl animate-shimmer"
              style={{
                background: 'radial-gradient(circle, rgba(0,212,255,0.45), transparent 70%)',
                animationDelay: '6s',
              }}
            />
          </div>

          {/* Bubbles */}
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
                    'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.9), rgba(0,212,255,0.2) 60%, transparent 70%)',
                  border: '1px solid rgba(255,255,255,0.3)',
                  animationDuration: `${b.dur}s`,
                  animationDelay: `${b.delay}s`,
                  filter: 'drop-shadow(0 0 6px rgba(0,212,255,0.4))',
                }}
              />
            ))}
          </div>

          {/* Perspective grid horizon */}
          <div
            className="absolute inset-x-0 bottom-0 h-1/2 pointer-events-none opacity-25"
            style={{
              backgroundImage:
                'linear-gradient(to right, rgba(0,212,255,0.45) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,212,255,0.45) 1px, transparent 1px)',
              backgroundSize: '60px 60px',
              maskImage: 'linear-gradient(to top, black, transparent)',
              WebkitMaskImage: 'linear-gradient(to top, black, transparent)',
              transform: 'perspective(600px) rotateX(60deg)',
              transformOrigin: 'bottom',
            }}
          />

          {/* TOP HUD BAR */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="absolute top-6 left-6 right-6 flex items-center justify-between text-[10px] md:text-[11px] tracking-[0.3em] uppercase text-white/60 font-mono pointer-events-none"
          >
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-ping" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
                </span>
                <span className="text-emerald-300/90">Online</span>
              </span>
              <span className="hidden md:inline text-white/30">|</span>
              <span className="hidden md:inline">AquaFlow OS · v2.4.1</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="hidden md:inline">Region · EU-WEST</span>
              <span className="hidden md:inline text-white/30">|</span>
              <span className="tabular-nums text-white/80">{timeStr}</span>
            </div>
          </motion.div>

          {/* CENTER STAGE */}
          <div className="relative z-10 flex flex-col items-center px-6">
            {/* Droplet stage with sonar */}
            <div className="relative w-60 h-60 md:w-80 md:h-80 flex items-center justify-center mb-10">
              {/* Sonar concentric rings */}
              {sonarRings.map((delay, i) => (
                <motion.span
                  key={`sonar-${i}`}
                  className="absolute inset-0 rounded-full border"
                  style={{ borderColor: 'rgba(0, 212, 255, 0.4)' }}
                  initial={{ scale: 0.5, opacity: 0.9 }}
                  animate={{ scale: 1.9, opacity: 0 }}
                  transition={{
                    duration: 3.6,
                    repeat: Infinity,
                    ease: 'easeOut',
                    delay,
                  }}
                />
              ))}

              {/* Crosshair brackets */}
              {['top-0 left-1/2 -translate-x-1/2 -translate-y-2', 'bottom-0 left-1/2 -translate-x-1/2 translate-y-2', 'left-0 top-1/2 -translate-y-1/2 -translate-x-2', 'right-0 top-1/2 -translate-y-1/2 translate-x-2'].map((cls, i) => (
                <span
                  key={`cross-${i}`}
                  className={`absolute ${cls} text-cyan-300/70 text-xs font-mono`}
                >
                  +
                </span>
              ))}

              {/* Rotating dashed orbit */}
              <motion.svg
                className="absolute inset-0"
                viewBox="0 0 100 100"
                animate={{ rotate: 360 }}
                transition={{ duration: 24, repeat: Infinity, ease: 'linear' }}
              >
                <circle
                  cx="50"
                  cy="50"
                  r="48"
                  fill="none"
                  stroke="rgba(0,212,255,0.3)"
                  strokeWidth="0.3"
                  strokeDasharray="1 3"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="none"
                  stroke="rgba(0,212,255,0.18)"
                  strokeWidth="0.25"
                  strokeDasharray="0.6 2.4"
                />
              </motion.svg>

              {/* Counter-rotating orbit with particles */}
              <motion.div
                className="absolute inset-0"
                animate={{ rotate: -360 }}
                transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
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
                    transition={{ duration: 2.6, repeat: Infinity, delay: p.delay }}
                  />
                ))}
              </motion.div>

              {/* Soft halo behind logo */}
              <div
                className="absolute inset-8 rounded-full blur-2xl"
                style={{ background: 'radial-gradient(circle, rgba(0,212,255,0.6), transparent 70%)' }}
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
                  stroke="rgba(255,255,255,0.1)"
                  strokeWidth="1.2"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="44"
                  fill="none"
                  stroke="url(#aqua-loader-grad)"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                  strokeDasharray={2 * Math.PI * 44}
                  strokeDashoffset={2 * Math.PI * 44 * (1 - progress / 100)}
                  filter="url(#aqua-loader-glow)"
                  style={{ transition: 'stroke-dashoffset 0.1s linear' }}
                />
                {/* Progress tick marks */}
                {Array.from({ length: 60 }).map((_, i) => {
                  const a = (i / 60) * Math.PI * 2
                  const r1 = 36
                  const r2 = i % 5 === 0 ? 33 : 34.5
                  const x1 = 50 + Math.cos(a) * r1
                  const y1 = 50 + Math.sin(a) * r1
                  const x2 = 50 + Math.cos(a) * r2
                  const y2 = 50 + Math.sin(a) * r2
                  return (
                    <line
                      key={i}
                      x1={x1}
                      y1={y1}
                      x2={x2}
                      y2={y2}
                      stroke="rgba(255,255,255,0.18)"
                      strokeWidth="0.3"
                    />
                  )
                })}
              </svg>

              {/* Liquid fill clipped to circle */}
              <div className="absolute inset-8 rounded-full overflow-hidden border border-white/10 backdrop-blur-sm bg-white/5">
                <div
                  className="absolute inset-x-0 bottom-0 transition-[height] duration-200 ease-linear"
                  style={{ height: `${progress}%` }}
                >
                  <div
                    className="absolute inset-0"
                    style={{
                      background:
                        'linear-gradient(180deg, rgba(0,212,255,0.5) 0%, rgba(10,106,191,0.85) 100%)',
                    }}
                  />
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

              {/* Logo */}
              <motion.img
                src={logo}
                alt="AquaFlow"
                className="relative z-10 w-28 h-28 md:w-40 md:h-40 object-contain drop-shadow-[0_0_30px_rgba(0,212,255,0.9)]"
                animate={{ y: [0, -8, 0], scale: [1, 1.03, 1] }}
                transition={{ duration: 4.8, repeat: Infinity, ease: 'easeInOut' }}
              />

              {/* Sweeping radar beam */}
              <motion.div
                className="absolute inset-0 rounded-full overflow-hidden pointer-events-none"
                style={{
                  maskImage: 'radial-gradient(circle, black 60%, transparent 62%)',
                  WebkitMaskImage: 'radial-gradient(circle, black 60%, transparent 62%)',
                }}
              >
                <motion.div
                  className="absolute left-1/2 top-1/2 w-[160%] h-[2px] origin-left"
                  style={{
                    background:
                      'linear-gradient(90deg, transparent, rgba(0,212,255,0.9), transparent)',
                    boxShadow: '0 0 14px rgba(0,212,255,0.9)',
                  }}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 3.8, repeat: Infinity, ease: 'linear' }}
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
                className="mt-4 text-[10px] md:text-xs text-white/70 tracking-[0.5em] uppercase font-mono"
              >
                Smart Water Intelligence Platform
              </motion.p>
            </motion.div>

            {/* Telemetry tiles */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 1.6 }}
              className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-3 w-[20rem] md:w-[34rem]"
            >
              {[
                { k: 'Flow', v: flow, u: 'L/min' },
                { k: 'Pressure', v: pressure, u: 'bar' },
                { k: 'pH', v: ph, u: '' },
                { k: 'Temp', v: temp, u: '°C' },
              ].map((m, i) => (
                <motion.div
                  key={m.k}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 1.7 + i * 0.08 }}
                  className="relative rounded-md border border-cyan-300/15 bg-white/[0.03] backdrop-blur-sm px-3 py-2 overflow-hidden"
                >
                  <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-300/60 to-transparent" />
                  <div className="text-[9px] tracking-[0.3em] uppercase text-white/50 font-mono">
                    {m.k}
                  </div>
                  <div className="mt-0.5 flex items-baseline gap-1">
                    <span
                      className="text-base md:text-lg text-white tabular-nums"
                      style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600 }}
                    >
                      {m.v}
                    </span>
                    <span className="text-[10px] text-cyan-300/70 font-mono">{m.u}</span>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Phase row + sparkline */}
            <div className="mt-8 w-[20rem] md:w-[34rem]">
              <div className="flex items-center justify-between text-[10px] md:text-[11px] tracking-[0.3em] uppercase font-mono mb-2">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={phase.code}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.4 }}
                    className="flex items-center gap-2 text-white/80"
                  >
                    <span className="text-cyan-300">[{phase.code}]</span>
                    <span>{phase.label}</span>
                  </motion.div>
                </AnimatePresence>
                <span className="tabular-nums text-white/90">
                  {String(Math.floor(progress)).padStart(3, '0')}%
                </span>
              </div>

              {/* Progress bar */}
              <div className="relative h-[3px] w-full rounded-full bg-white/10 overflow-hidden">
                <motion.div
                  className="absolute inset-y-0 left-0 rounded-full"
                  style={{
                    background: 'linear-gradient(90deg, #ffffff, #00d4ff 50%, #0a6abf)',
                    width: `${progress}%`,
                    boxShadow: '0 0 14px rgba(0,212,255,0.9)',
                  }}
                />
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

              {/* Sparkline + meta */}
              <div className="mt-3 flex items-center justify-between gap-3">
                <svg
                  viewBox="0 0 100 100"
                  preserveAspectRatio="none"
                  className="h-8 w-2/3"
                >
                  <defs>
                    <linearGradient id="spark-grad" x1="0" x2="0" y1="0" y2="1">
                      <stop offset="0%" stopColor="#00d4ff" stopOpacity="0.5" />
                      <stop offset="100%" stopColor="#00d4ff" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  <path d={`${sparkPath} L 100,100 L 0,100 Z`} fill="url(#spark-grad)" />
                  <path
                    d={sparkPath}
                    fill="none"
                    stroke="#00d4ff"
                    strokeWidth="1.2"
                    vectorEffect="non-scaling-stroke"
                  />
                </svg>
                <div className="text-right text-[10px] tracking-[0.25em] uppercase text-white/50 font-mono leading-tight">
                  <div>
                    Nodes <span className="text-cyan-300/90 tabular-nums">{nodes}/128</span>
                  </div>
                  <div>
                    Latency <span className="text-cyan-300/90 tabular-nums">{(28 - progress * 0.12).toFixed(0)}ms</span>
                  </div>
                </div>
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

          {/* HUD corner brackets */}
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

          {/* Bottom legal-style strip */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="absolute bottom-3 left-6 right-6 flex items-center justify-between text-[9px] md:text-[10px] tracking-[0.3em] uppercase text-white/40 font-mono pointer-events-none"
          >
            <span>© AquaFlow Systems</span>
            <span className="hidden md:inline">Encrypted Channel · TLS 1.3</span>
            <span>Build {timeStr.replace(/:/g, '')}</span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
