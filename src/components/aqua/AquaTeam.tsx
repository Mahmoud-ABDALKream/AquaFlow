import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Linkedin } from 'lucide-react'

const team = [
  {
    name: 'Mahmoud Abdelkarim',
    role: 'CEO & Product Lead',
    link: 'https://www.linkedin.com/in/mahmoud-ahmed-abdelkream/',
    bio: 'Passionate about building products that provide solutions. Over 10 years of experience in product management and software development.',
    skills: ['Product Management', 'Leadership', 'Agile']
  },
  {
    name: 'Mohannad Abdo',
    role: 'Marketing & Business Lead',
    link: 'https://www.linkedin.com/in/mohand-abdo-linkedeffe233/',
    bio: 'A skilled marketer and business strategist with a knack for driving growth and engagement.',
    skills: ['Digital Marketing', 'Business Development', 'SEO']
  },
  {
    name: 'Yunus Abdelghaffar',
    role: 'Product Owner',
    link: 'https://www.linkedin.com/in/yunus-abdelghaffar-49631231a/',
    bio: 'Expert in turning customer needs into actionable product deliverables with a strong focus on results.',
    skills: ['Product Ownership', 'Customer Relations', 'User Experience']
  },
  {
    name: 'Mohammed Hassan',
    role: 'Financial & Tech Lead',
    link: 'https://www.linkedin.com/in/muhammed-hassan-418b3a2b4/',
    bio: 'A finance and technology expert with a deep understanding of financial systems and their integration with tech solutions.',
    skills: ['Financial Analysis', 'Tech Solutions', 'Data Management']
  }
]

export function AquaTeam() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="team" className="py-24 lg:py-32 bg-slate-900 overflow-hidden" ref={ref}>
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <h2 className="text-sm font-semibold tracking-widest uppercase text-[#00d4ff] mb-3">The People</h2>
          <h3 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
            Meet the <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00d4ff] to-[#14b8a6]">Expert Team</span>
          </h3>
          <p className="text-slate-400 text-lg">
            A diverse group of passionate professionals dedicated to revolutionizing water management.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {team.map((member, i) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group relative bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6 hover:bg-slate-800 transition-all duration-300 hover:border-[#00d4ff]/30 hover:shadow-2xl hover:shadow-[#00d4ff]/10"
            >
              <div className="flex flex-col h-full">
                <div className="mb-4">
                  <h4 className="text-xl font-bold text-white group-hover:text-[#00d4ff] transition-colors">{member.name}</h4>
                  <p className="text-sm font-medium text-[#14b8a6]">{member.role}</p>
                </div>

                <p className="text-slate-400 text-sm mb-6 flex-grow leading-relaxed italic">
                  "{member.bio}"
                </p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {member.skills.map(skill => (
                    <span key={skill} className="px-2.5 py-1 rounded-md bg-slate-900/50 border border-slate-700 text-[10px] font-semibold text-slate-300 uppercase tracking-wider">
                      {skill}
                    </span>
                  ))}
                </div>

                <a
                  href={member.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-white/60 hover:text-[#00d4ff] transition-colors text-sm font-medium"
                >
                  <Linkedin className="w-4 h-4" />
                  View LinkedIn
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
