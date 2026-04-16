import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Activity, Thermometer, Smartphone, ShieldAlert, Clock } from 'lucide-react'

const features = [
  { icon: Activity, title: 'Real-Time Monitoring', desc: 'Track water flow rates and total consumption live from your dashboard.' },
  { icon: Thermometer, title: 'Temperature Control', desc: 'Monitor water temperature to prevent waste and ensure safety.' },
  { icon: Smartphone, title: 'Mobile App Control', desc: 'Open, close, and schedule your valve from anywhere in the world.' },
  { icon: ShieldAlert, title: 'Leak Detection', desc: 'Instant alerts when abnormal flow is detected — prevent water damage.' },
  { icon: Clock, title: 'Smart Scheduling', desc: 'Set automated schedules for watering, filling, and conservation modes.' },
]

export function AquaFeatures() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="features" className="py-24 lg:py-32 bg-background" ref={ref}>
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <p className="text-sm font-semibold tracking-widest uppercase text-primary mb-3">Features</p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
            Everything You Need to
            <span className="text-primary"> Control Water</span>
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.1 }}
              className={`p-8 rounded-2xl border border-border hover:border-primary/30 hover:shadow-xl transition-all duration-300 group ${
                i === features.length - 1 && features.length % 3 !== 0 ? 'sm:col-span-2 lg:col-span-1' : ''
              }`}
              style={{ background: 'linear-gradient(135deg, var(--card) 0%, var(--muted) 100%)' }}
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-colors">
                <f.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-bold mb-2">{f.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
