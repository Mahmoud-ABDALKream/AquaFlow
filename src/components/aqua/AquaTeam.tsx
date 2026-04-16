import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const members = [
  { name: 'Mohamed Hassan', role: 'Finance Manager', initials: 'MH' },
  { name: 'Mohannad', role: 'Marketing & Financial Manager', initials: 'MN' },
  { name: 'Mahmoud Abdelkarim', role: 'Quality Manager', initials: 'MA' },
  { name: 'Younes', role: 'Inventory & Sales Manager', initials: 'YN' },
]

const colors = ['from-[#0a6abf] to-[#00d4ff]', 'from-[#14b8a6] to-[#00d4ff]', 'from-[#003566] to-[#0a6abf]', 'from-[#00d4ff] to-[#14b8a6]']

export function AquaTeam() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="team" className="py-24 lg:py-32 bg-muted/50" ref={ref}>
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <p className="text-sm font-semibold tracking-widest uppercase text-primary mb-3">The Team</p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
            Meet the <span className="text-primary">Innovators</span>
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {members.map((m, i) => (
            <motion.div
              key={m.name}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.15 + i * 0.1 }}
              className="p-8 rounded-2xl bg-card border border-border text-center hover:shadow-xl hover:border-primary/30 transition-all duration-300 group"
            >
              <div className={`w-20 h-20 rounded-full bg-gradient-to-br ${colors[i]} flex items-center justify-center mx-auto mb-5 text-white text-2xl font-bold shadow-lg`}>
                {m.initials}
              </div>
              <h3 className="font-bold text-lg mb-1">{m.name}</h3>
              <p className="text-muted-foreground text-sm">{m.role}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
