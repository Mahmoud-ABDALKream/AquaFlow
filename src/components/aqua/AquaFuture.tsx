import { motion, useInView, useScroll, useTransform, useReducedMotion } from 'framer-motion'
import { useRef } from 'react'
import { Brain, Zap, LineChart } from 'lucide-react'

const visions = [
  { icon: Brain, title: 'AI Integration', desc: 'Machine learning algorithms to predict usage patterns and auto-optimize water flow.' },
  { icon: Zap, title: 'Smart Ecosystem', desc: 'Expand beyond water to include electricity and gas — a unified smart utility platform.' },
  { icon: LineChart, title: 'Predictive Analytics', desc: 'Advanced data models to forecast consumption, detect issues before they happen.' },
]

export function AquaFuture() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })
  const prefersReducedMotion = useReducedMotion()

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const glowY = useTransform(scrollYProgress, [0, 1], ['0%', prefersReducedMotion ? '0%' : '-25%'])
  const headerY = useTransform(scrollYProgress, [0, 1], ['0%', prefersReducedMotion ? '0%' : '-12%'])
  const cardsY = useTransform(scrollYProgress, [0, 1], ['0%', prefersReducedMotion ? '0%' : '8%'])

  return (
    <section className="relative py-24 lg:py-32 bg-background overflow-hidden" ref={ref}>
      {/* Parallax background glow */}
      <motion.div style={{ y: glowY }} className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/4 left-1/3 w-[500px] h-[500px] rounded-full blur-[120px] opacity-50 animate-aurora"
          style={{ background: 'radial-gradient(circle, hsl(var(--primary) / 0.15), transparent 70%)' }}
        />
        <div
          className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full blur-[100px] opacity-40 animate-aurora"
          style={{
            background: 'radial-gradient(circle, hsl(var(--accent) / 0.18), transparent 70%)',
            animationDelay: '6s',
          }}
        />
      </motion.div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          style={{ y: headerY }}
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <p className="text-sm font-semibold tracking-widest uppercase text-primary mb-3">What's Next</p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
            The <span className="text-primary">Future</span> of Water
          </h2>
          <p className="text-muted-foreground text-lg">
            We're just getting started. Our roadmap is ambitious and our vision is clear.
          </p>
        </motion.div>

        <motion.div style={{ y: cardsY }} className="grid md:grid-cols-3 gap-8">
          {visions.map((v, i) => (
            <motion.div
              key={v.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 + i * 0.15 }}
              className="p-8 rounded-2xl border border-dashed border-primary/30 bg-primary/5 hover:bg-primary/10 transition-all duration-300 group"
            >
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-colors">
                <v.icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="font-bold text-xl mb-3">{v.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{v.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
