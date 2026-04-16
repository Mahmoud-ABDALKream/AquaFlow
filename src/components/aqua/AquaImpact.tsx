import { motion, useInView, useScroll, useTransform, useReducedMotion, useMotionValue, animate } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { Leaf, Droplets, TrendingUp } from 'lucide-react'

const impacts = [
  { icon: Droplets, target: 30, suffix: '%', label: 'Water Saved', desc: 'Average reduction in household water consumption.' },
  { icon: Leaf, target: 100, suffix: '%', label: 'Sustainable', desc: 'Eco-friendly design promoting conservation.' },
  { icon: TrendingUp, target: 50, suffix: '%', label: 'Cost Reduction', desc: 'Lower water bills through smart management.' },
]

function CountUp({ to, suffix = '', start, duration = 2 }: { to: number; suffix?: string; start: boolean; duration?: number }) {
  const count = useMotionValue(0)
  const [display, setDisplay] = useState(0)
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => {
    if (!start) return
    if (prefersReducedMotion) {
      setDisplay(to)
      return
    }
    const controls = animate(count, to, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setDisplay(Math.round(v)),
    })
    return () => controls.stop()
  }, [start, to, duration, count, prefersReducedMotion])

  return <>{display}{suffix}</>
}

export function AquaImpact() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })
  const prefersReducedMotion = useReducedMotion()

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const blobsY = useTransform(scrollYProgress, [0, 1], ['0%', prefersReducedMotion ? '0%' : '-30%'])
  const headerY = useTransform(scrollYProgress, [0, 1], ['0%', prefersReducedMotion ? '0%' : '-15%'])
  const cardsY = useTransform(scrollYProgress, [0, 1], ['0%', prefersReducedMotion ? '0%' : '10%'])

  return (
    <section
      id="impact"
      className="relative py-24 lg:py-32 overflow-hidden"
      style={{ background: 'var(--hero-gradient)' }}
      ref={ref}
    >
      {/* Parallax aurora blobs */}
      <motion.div style={{ y: blobsY }} className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-10 left-10 w-[400px] h-[400px] rounded-full blur-[120px] animate-aurora"
          style={{ background: 'radial-gradient(circle, rgba(0,212,255,0.3), transparent 70%)' }}
        />
        <div
          className="absolute bottom-10 right-10 w-[500px] h-[500px] rounded-full blur-[140px] animate-aurora"
          style={{
            background: 'radial-gradient(circle, rgba(20,184,166,0.25), transparent 70%)',
            animationDelay: '5s',
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
          <p className="text-sm font-semibold tracking-widest uppercase text-[#00d4ff] mb-3">Impact</p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
            Making a Real <span className="text-[#00d4ff]">Difference</span>
          </h2>
          <p className="text-white/70 text-lg">
            Every drop counts. Aqua Flow delivers measurable environmental and financial impact.
          </p>
        </motion.div>

        <motion.div style={{ y: cardsY }} className="grid md:grid-cols-3 gap-8">
          {impacts.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 + i * 0.15 }}
              className="p-8 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 text-center hover:bg-white/15 transition-all duration-300"
            >
              <div className="relative w-24 h-24 mx-auto mb-5">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="none"
                    stroke="rgba(255,255,255,0.1)"
                    strokeWidth="4"
                  />
                  <motion.circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="none"
                    stroke="#00d4ff"
                    strokeWidth="4"
                    strokeLinecap="round"
                    pathLength={1}
                    strokeDasharray={1}
                    initial={{ strokeDashoffset: 1 }}
                    animate={inView ? { strokeDashoffset: 1 - item.target / 100 } : {}}
                    transition={{ duration: 2, delay: 0.2 + i * 0.15, ease: [0.16, 1, 0.3, 1] }}
                    style={{ filter: 'drop-shadow(0 0 6px rgba(0,212,255,0.6))' }}
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center">
                    <item.icon className="w-7 h-7 text-[#00d4ff]" />
                  </div>
                </div>
              </div>
              <div className="text-5xl font-bold text-white mb-2 tabular-nums">
                <CountUp to={item.target} suffix={item.suffix} start={inView} />
              </div>
              <div className="text-[#00d4ff] font-semibold mb-2">{item.label}</div>
              <p className="text-white/60 text-sm">{item.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
