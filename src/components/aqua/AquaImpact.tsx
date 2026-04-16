import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Leaf, Droplets, TrendingUp } from 'lucide-react'

const impacts = [
  { icon: Droplets, value: '30%', label: 'Water Saved', desc: 'Average reduction in household water consumption.' },
  { icon: Leaf, value: '100%', label: 'Sustainable', desc: 'Eco-friendly design promoting conservation.' },
  { icon: TrendingUp, value: '50%', label: 'Cost Reduction', desc: 'Lower water bills through smart management.' },
]

export function AquaImpact() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="impact" className="relative py-24 lg:py-32 overflow-hidden" style={{ background: 'var(--hero-gradient)' }} ref={ref}>
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
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

        <div className="grid md:grid-cols-3 gap-8">
          {impacts.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 + i * 0.15 }}
              className="p-8 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 text-center hover:bg-white/15 transition-all duration-300"
            >
              <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-5">
                <item.icon className="w-8 h-8 text-[#00d4ff]" />
              </div>
              <div className="text-5xl font-bold text-white mb-2">{item.value}</div>
              <div className="text-[#00d4ff] font-semibold mb-2">{item.label}</div>
              <p className="text-white/60 text-sm">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
