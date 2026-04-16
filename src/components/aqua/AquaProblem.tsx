import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { AlertTriangle, TrendingDown, Eye } from 'lucide-react'

const stats = [
  { icon: AlertTriangle, value: '60%', label: 'of household water is wasted due to inefficiency', color: 'text-red-500' },
  { icon: TrendingDown, value: '25%', label: 'of water loss from undetected leaks', color: 'text-orange-500' },
  { icon: Eye, value: '80%', label: 'of users lack awareness of their consumption', color: 'text-yellow-500' },
]

export function AquaProblem() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section className="py-24 lg:py-32 bg-muted/50" ref={ref}>
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <p className="text-sm font-semibold tracking-widest uppercase text-primary mb-3">Problem & Research</p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
            A Crisis We Can't <span className="text-primary">Ignore</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Water waste is a growing global problem. Most people don't realize how much they lose daily.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 + i * 0.15 }}
              className="relative p-8 rounded-2xl bg-card border border-border text-center hover:shadow-xl transition-all duration-300"
            >
              <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-5">
                <stat.icon className={`w-8 h-8 ${stat.color}`} />
              </div>
              <div className={`text-5xl font-bold mb-3 ${stat.color}`}>{stat.value}</div>
              <p className="text-muted-foreground leading-relaxed">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
