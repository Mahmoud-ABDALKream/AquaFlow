import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Cpu, Waves, Thermometer, Settings, Smartphone, Cloud } from 'lucide-react'

const steps = [
  { icon: Waves, label: 'Flow Sensor', desc: 'Measures water flow rate' },
  { icon: Thermometer, label: 'Temp Sensor', desc: 'Monitors water temperature' },
  { icon: Cpu, label: 'ESP32', desc: 'Processes sensor data' },
  { icon: Settings, label: 'Solenoid Valve', desc: 'Controls water flow' },
  { icon: Cloud, label: 'Firebase', desc: 'Cloud database & sync' },
  { icon: Smartphone, label: 'Mobile App', desc: 'User control & analytics' },
]

export function AquaHowItWorks() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="how-it-works" className="py-24 lg:py-32 bg-muted/50" ref={ref}>
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <p className="text-sm font-semibold tracking-widest uppercase text-primary mb-3">System Architecture</p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
            How It <span className="text-primary">Works</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            A seamless pipeline from physical sensors to your fingertips.
          </p>
        </motion.div>

        <div className="relative">
          {/* Connection line */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-border -translate-y-1/2 z-0" />

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 relative z-10">
            {steps.map((step, i) => (
              <motion.div
                key={step.label}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.1 + i * 0.1 }}
                className="flex flex-col items-center text-center"
              >
                <div className="w-20 h-20 rounded-2xl bg-card border-2 border-primary/20 flex items-center justify-center mb-4 shadow-lg hover:border-primary/50 transition-colors">
                  <step.icon className="w-9 h-9 text-primary" />
                </div>
                <h4 className="font-bold text-sm mb-1">{step.label}</h4>
                <p className="text-muted-foreground text-xs">{step.desc}</p>
                {i < steps.length - 1 && (
                  <span className="lg:hidden text-primary text-xl mt-2">↓</span>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
