import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { BarChart3, Bell, Gauge, ToggleRight } from 'lucide-react'

const screens = [
  { icon: Gauge, title: 'Dashboard', desc: 'Live water flow, temperature, and system status at a glance.' },
  { icon: BarChart3, title: 'Analytics', desc: 'Daily, weekly, and monthly usage charts to track your savings.' },
  { icon: Bell, title: 'Notifications', desc: 'Instant leak alerts, schedule reminders, and usage warnings.' },
  { icon: ToggleRight, title: 'Remote Control', desc: 'Open or close the valve with a single tap from anywhere.' },
]

export function AquaAppShowcase() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section className="py-24 lg:py-32 bg-background" ref={ref}>
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <p className="text-sm font-semibold tracking-widest uppercase text-primary mb-3">Mobile App</p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
            Control at Your <span className="text-primary">Fingertips</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Our React Native app puts the full power of Aqua Flow in your pocket.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {screens.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.15 + i * 0.1 }}
              className="p-6 rounded-2xl border border-border bg-card hover:shadow-xl hover:border-primary/30 transition-all duration-300 group"
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center mb-4 group-hover:from-primary/20 group-hover:to-accent/20 transition-colors">
                <s.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-bold text-lg mb-2">{s.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
