import { motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import productImage from '@/assets/product-device.jpg'

export function AquaHero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden" style={{ background: 'var(--hero-gradient)' }}>
      {/* Animated water circles */}
      {[...Array(5)].map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full border border-white/10 animate-ripple"
          style={{
            width: `${200 + i * 150}px`,
            height: `${200 + i * 150}px`,
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            animationDelay: `${i * 0.5}s`,
            animationDuration: `${3 + i * 0.5}s`,
          }}
        />
      ))}

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-32 grid lg:grid-cols-2 gap-12 items-center">
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
      </div>

      <motion.a
        href="#about"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/50 hover:text-white transition-colors"
      >
        <ChevronDown size={32} className="animate-bounce" />
      </motion.a>
    </section>
  )
}
