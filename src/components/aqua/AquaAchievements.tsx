import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Tv, GraduationCap, Award } from 'lucide-react'

const achievements = [
  { icon: Tv, title: 'Featured on ON TV', desc: 'National television coverage showcasing our innovation.' },
  { icon: Tv, title: 'Featured on Al-Hayat TV', desc: 'Media spotlight on smart water conservation technology.' },
  { icon: GraduationCap, title: 'University Exhibitions', desc: 'Presented at major academic and tech exhibitions.' },
]

export function AquaAchievements() {
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
          <p className="text-sm font-semibold tracking-widest uppercase text-primary mb-3">Recognition</p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
            Our <span className="text-primary">Achievements</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {achievements.map((a, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 + i * 0.15 }}
              className="p-8 rounded-2xl bg-card border border-border text-center hover:shadow-xl hover:border-primary/30 transition-all duration-300 group"
            >
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-5 group-hover:bg-primary/20 transition-colors">
                <a.icon className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-bold text-xl mb-2">{a.title}</h3>
              <p className="text-muted-foreground text-sm">{a.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
