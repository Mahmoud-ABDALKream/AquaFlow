import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { useRef, useMemo } from 'react'
import productImage from '@/assets/product-device.jpg'

export function AquaHero() {
  const sectionRef = useRef<HTMLElement>(null)
  const prefersReducedMotion = useReducedMotion()

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  })

  // Parallax transforms (disabled if user prefers reduced motion)
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', prefersReducedMotion ? '0%' : '40%'])
  const auroraY = useTransform(scrollYProgress, [0, 1], ['0%', prefersReducedMotion ? '0%' : '25%'])
  const ripplesY = useTransform(scrollYProgress, [0, 1], ['0%', prefersReducedMotion ? '0%' : '15%'])
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', prefersReducedMotion ? '0%' : '-15%'])
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0])
  const productY = useTransform(scrollYProgress, [0, 1], ['0%', prefersReducedMotion ? '0%' : '-30%'])
  const productScale = useTransform(scrollYProgress, [0, 1], [1, prefersReducedMotion ? 1 : 1.1])
  const wavesY = useTransform(scrollYProgress, [0, 1], ['0%', prefersReducedMotion ? '0%' : '-20%'])

  // Pre-generated bubbles for performance
  const bubbles = useMemo(
    () =>
      Array.from({ length: 14 }).map((_, i) => ({
        left: `${(i * 7.3) % 100}%`,
        size: 6 + ((i * 11) % 18),
        delay: (i * 1.7) % 12,
        duration: 14 + ((i * 3) % 12),
      })),
    []
  )

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ background: 'var(--hero-gradient)' }}
    >
      {/* Parallax base gradient overlay */}
      <motion.div
        style={{ y: bgY }}
        className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#001d3d]/60 pointer-events-none"
      />

      {/* Aurora glow blobs (parallax) */}
      <motion.div style={{ y: auroraY }} className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full blur-[120px] animate-aurora"
          style={{ background: 'radial-gradient(circle, rgba(0,212,255,0.35), transparent 70%)' }}
        />
        <div
          className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] rounded-full blur-[140px] animate-aurora"
          style={{
            background: 'radial-gradient(circle, rgba(20,184,166,0.3), transparent 70%)',
            animationDelay: '4s',
          }}
        />
        <div
          className="absolute top-1/2 left-1/2 w-[400px] h-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[100px] animate-shimmer"
          style={{ background: 'radial-gradient(circle, rgba(10,106,191,0.4), transparent 70%)' }}
        />
      </motion.div>

      {/* Caustic shimmer overlay */}
      <div
        className="absolute inset-0 opacity-30 mix-blend-overlay pointer-events-none animate-shimmer"
        style={{
          backgroundImage:
            'radial-gradient(circle at 20% 30%, rgba(255,255,255,0.15), transparent 40%), radial-gradient(circle at 70% 60%, rgba(0,212,255,0.2), transparent 40%), radial-gradient(circle at 40% 80%, rgba(255,255,255,0.1), transparent 40%)',
        }}
      />

      {/* Rising bubbles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {bubbles.map((b, i) => (
          <span
            key={i}
            className="absolute bottom-0 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 animate-bubble"
            style={{
              left: b.left,
              width: `${b.size}px`,
              height: `${b.size}px`,
              animationDelay: `${b.delay}s`,
              animationDuration: `${b.duration}s`,
            }}
          />
        ))}
      </div>

      {/* Animated water ripples (parallax) */}
      <motion.div style={{ y: ripplesY }} className="absolute inset-0 pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full border border-white/15 animate-ripple"
            style={{
              width: `${200 + i * 150}px`,
              height: `${200 + i * 150}px`,
              top: '50%',
              left: '50%',
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${3 + i * 0.5}s`,
            }}
          />
        ))}
      </motion.div>

      {/* Hero content (parallax + fade on scroll) */}
      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative z-10 max-w-7xl mx-auto px-6 py-32 grid lg:grid-cols-2 gap-12 items-center w-full"
      >
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white/90 text-sm mb-6"
          >
            <span className="w-2 h-2 rounded-full bg-accent-cyan animate-pulse" />
            Smart IoT Water System
          </motion.div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-[1.1] mb-6">
            Where Technology
            <br />
            <span className="bg-gradient-to-r from-[#00d4ff] to-[#14b8a6] bg-clip-text text-transparent">
              Meets Tranquility
            </span>
          </h1>

          <p className="text-lg text-white/70 max-w-lg mb-8 leading-relaxed">
            Aqua Flow is an intelligent water management system that helps you monitor, control, and optimize your water usage in real-time.
          </p>

          <div className="flex flex-wrap gap-4">
            <a
              href="#how-it-works"
              className="px-8 py-3.5 rounded-full bg-white text-[#003566] font-semibold hover:bg-white/90 transition-all hover:scale-105"
            >
              See How It Works
            </a>
            <a
              href="#features"
              className="px-8 py-3.5 rounded-full border border-white/30 text-white font-semibold hover:bg-white/10 transition-all"
            >
              Explore Features
            </a>
          </div>
        </motion.div>

        <motion.div
          style={{ y: productY, scale: productScale }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="hidden lg:flex justify-center"
        >
          <div className="relative">
            <div className="absolute inset-0 bg-[#00d4ff]/20 rounded-full blur-[100px]" />
            <img
              src={productImage}
              alt="Aqua Flow Smart Device"
              className="relative z-10 w-80 h-auto drop-shadow-2xl animate-float"
            />
          </div>
        </motion.div>
      </motion.div>

      {/* Animated SVG waves at the bottom (parallax) */}
      <motion.div
        style={{ y: wavesY }}
        className="absolute bottom-0 left-0 right-0 pointer-events-none"
      >
        <div className="relative h-40 overflow-hidden">
          <svg
            className="absolute bottom-0 left-0 h-32 animate-wave-slow"
            style={{ width: '200%' }}
            viewBox="0 0 2880 200"
            preserveAspectRatio="none"
          >
            <path
              d="M0,100 C360,180 720,20 1440,100 C2160,180 2520,20 2880,100 L2880,200 L0,200 Z"
              fill="rgba(0, 212, 255, 0.15)"
            />
          </svg>
          <svg
            className="absolute bottom-0 left-0 h-28 animate-wave"
            style={{ width: '200%' }}
            viewBox="0 0 2880 200"
            preserveAspectRatio="none"
          >
            <path
              d="M0,120 C360,60 720,180 1440,120 C2160,60 2520,180 2880,120 L2880,200 L0,200 Z"
              fill="rgba(20, 184, 166, 0.2)"
            />
          </svg>
          <svg
            className="absolute bottom-0 left-0 h-24 animate-wave-slow"
            style={{ width: '200%', animationDuration: '22s' }}
            viewBox="0 0 2880 200"
            preserveAspectRatio="none"
          >
            <path
              d="M0,140 C360,100 720,180 1440,140 C2160,100 2520,180 2880,140 L2880,200 L0,200 Z"
              fill="rgba(0, 29, 61, 0.6)"
            />
          </svg>
        </div>
      </motion.div>

      <motion.a
        href="#about"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        style={{ opacity: contentOpacity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/60 hover:text-white transition-colors z-20"
      >
        <ChevronDown size={32} className="animate-bounce" />
      </motion.a>
    </section>
  )
}
