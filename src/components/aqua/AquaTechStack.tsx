import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Cpu, Smartphone, Cloud, Radio } from 'lucide-react'

const techs = [
  { icon: Cpu, name: 'ESP32', desc: 'Dual-core microcontroller with WiFi & Bluetooth' },
  { icon: Smartphone, name: 'React Native', desc: 'Cross-platform mobile application' },
  { icon: Cloud, name: 'Firebase', desc: 'Real-time database, auth, and cloud functions' },
  { icon: Radio, name: 'IoT Sensors', desc: 'Flow rate and temperature measurement' },
]

export function AquaTechStack() {
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
          <p className="text-sm font-semibold tracking-widest uppercase text-primary mb-3">Technology</p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
            Built With <span className="text-primary">Cutting-Edge</span> Tech
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {techs.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.4, delay: 0.1 + i * 0.1 }}
              className="p-8 rounded-2xl bg-card border border-border text-center hover:shadow-xl hover:border-primary/30 transition-all duration-300 group"
            >
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-5 group-hover:bg-primary/20 transition-colors">
                <t.icon className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-bold text-lg mb-2">{t.name}</h3>
              <p className="text-muted-foreground text-sm">{t.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
