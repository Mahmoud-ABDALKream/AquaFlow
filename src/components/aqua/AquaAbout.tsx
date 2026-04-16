import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { Droplets, Wifi, Smartphone } from 'lucide-react'

const items = [
  { icon: Droplets, title: 'Smart Sensors', desc: 'Precision flow and temperature sensors monitor every drop.' },
  { icon: Wifi, title: 'IoT Connected', desc: 'Real-time data synced to the cloud via ESP32.' },
  { icon: Smartphone, title: 'App Controlled', desc: 'Full control from your phone, anywhere, anytime.' },
]

export function AquaAbout() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="about" className="py-24 lg:py-32 bg-background" ref={ref}>
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <p className="text-sm font-semibold tracking-widest uppercase text-primary mb-3">About The Project</p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
            Rethinking How We
            <span className="text-primary"> Use Water</span>
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Aqua Flow is an IoT-based smart water management system designed for households and businesses. It integrates advanced sensors with a smart valve controlled through a mobile app, making water conservation effortless.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {items.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 + i * 0.15 }}
              className="relative p-8 rounded-2xl bg-card border border-border hover:shadow-xl hover:border-primary/30 transition-all duration-300 group"
            >
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-colors">
                <item.icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">{item.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
