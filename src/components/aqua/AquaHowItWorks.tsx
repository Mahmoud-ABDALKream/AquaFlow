import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Settings, Wifi, BarChart3, Bell } from 'lucide-react'

const steps = [
  {
    icon: Settings,
    title: 'Install the Device',
    desc: 'Easily attach the Aqua Flow valve to your main water line. No specialized tools required for most setups.',
    color: 'from-blue-400 to-cyan-400'
  },
  {
    icon: Wifi,
    title: 'Connect to Wi-Fi',
    desc: 'Use the Aqua Flow app to connect your device to your home network in just a few simple steps.',
    color: 'from-cyan-400 to-teal-400'
  },
  {
    icon: BarChart3,
    title: 'Monitor & Analyze',
    desc: 'Get real-time data on your water usage and receive insights on how to optimize consumption.',
    color: 'from-teal-400 to-emerald-400'
  },
  {
    icon: Bell,
    title: 'Stay Protected',
    desc: 'The system automatically detects leaks and can shut off the water to prevent costly damage.',
    color: 'from-emerald-400 to-green-400'
  }
]

export function AquaHowItWorks() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="how-it-works" className="py-24 lg:py-32 bg-slate-950 text-white overflow-hidden" ref={ref}>
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <h2 className="text-sm font-semibold tracking-widest uppercase text-[#00d4ff] mb-3">Workflow</h2>
          <h3 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
            Simple Setup, <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00d4ff] to-[#14b8a6]">Powerful Protection</span>
          </h3>
          <p className="text-slate-400 text-lg">
            Getting started with Aqua Flow is quick and easy. Follow these steps to transform your home's water management.
          </p>
        </motion.div>

        <div className="relative">
          {/* Connection Line (Desktop) */}
          <div className="hidden lg:block absolute top-1/2 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-slate-800 to-transparent -translate-y-1/2 z-0" />

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
            {steps.map((step, i) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                className="group relative"
              >
                <div className="flex flex-col items-center text-center">
                  <div className="relative mb-8">
                    {/* Circle Background */}
                    <div className={`w-20 h-20 rounded-full bg-gradient-to-br ${step.color} opacity-20 group-hover:opacity-30 transition-opacity blur-xl absolute inset-0 -m-2`} />
                    <div className="w-16 h-16 rounded-full bg-slate-900 border border-slate-700 flex items-center justify-center relative z-10 group-hover:border-[#00d4ff]/50 transition-colors shadow-2xl">
                      <step.icon className="w-8 h-8 text-[#00d4ff]" />
                      <span className="absolute -top-2 -right-2 w-7 h-7 bg-[#00d4ff] text-slate-950 text-xs font-black rounded-full flex items-center justify-center border-2 border-slate-950">
                        0{i + 1}
                      </span>
                    </div>
                  </div>
                  <h4 className="text-xl font-bold mb-3 group-hover:text-[#00d4ff] transition-colors">{step.title}</h4>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
