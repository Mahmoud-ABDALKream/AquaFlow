import { motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { Plug, Activity, BellRing, Droplets, PiggyBank } from 'lucide-react'

const steps = [
  {
    icon: Plug,
    title: 'Connect Your Device',
    desc: 'Pair Aqua Flow in seconds.',
    detail: 'Plug it in, scan the QR, and you’re live — no setup headaches.',
  },
  {
    icon: Activity,
    title: 'Monitor Water Usage',
    desc: 'See every drop in real time.',
    detail: 'Beautiful live dashboards show consumption by hour, day, and room.',
  },
  {
    icon: BellRing,
    title: 'Receive Smart Alerts',
    desc: 'Catch leaks before they cost you.',
    detail: 'Instant notifications for unusual usage, leaks, or temperature spikes.',
  },
  {
    icon: Droplets,
    title: 'Control Water Remotely',
    desc: 'Open or shut off — from anywhere.',
    detail: 'One tap from your phone. Vacation mode, schedules, and full manual control.',
  },
  {
    icon: PiggyBank,
    title: 'Save Water & Money',
    desc: 'Reduce bills by up to 30%.',
    detail: 'Smart insights help you waste less and spend less every single month.',
  },
]

export function AquaHowItWorks() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })
  const [active, setActive] = useState<number | null>(null)

  return (
    <section
      id="how-it-works"
      ref={ref}
      className="relative py-24 lg:py-32 overflow-hidden bg-gradient-to-b from-background via-[#001428] to-background"
    >
      {/* Ambient glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[700px] rounded-full bg-[#00d4ff]/5 blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-block mb-4 px-3 py-1 rounded-full border border-[#00d4ff]/30 bg-[#00d4ff]/5">
            <span className="text-[10px] font-mono tracking-[0.3em] text-[#00d4ff]">
              YOUR JOURNEY
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 text-foreground">
            How It <span className="bg-gradient-to-r from-[#00d4ff] to-[#0066ff] bg-clip-text text-transparent">Works</span>
          </h2>
          <p className="text-foreground/60 text-base sm:text-lg">
            Five simple steps to take full control of your water — effortlessly.
          </p>
          <p className="lg:hidden mt-3 text-[10px] font-mono tracking-[0.25em] text-[#00d4ff]/70">
            TAP A CARD TO EXPLORE
          </p>
        </motion.div>

        {/* Steps */}
        <div className="relative">
          {/* Animated connecting line — desktop only */}
          <div className="hidden lg:block absolute top-[72px] left-[8%] right-[8%] h-px z-0 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#00d4ff]/30 to-transparent" />
            <motion.div
              initial={{ scaleX: 0 }}
              animate={inView ? { scaleX: 1 } : {}}
              transition={{ duration: 1.4, delay: 0.4, ease: 'easeOut' }}
              style={{ transformOrigin: 'left' }}
              className="absolute inset-0 bg-gradient-to-r from-[#00d4ff] via-[#00d4ff] to-[#0066ff] shadow-[0_0_12px_rgba(0,212,255,0.6)]"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5 lg:gap-4 relative z-10">
            {steps.map((step, i) => {
              const Icon = step.icon
              const isActive = active === i
              return (
                <motion.button
                  key={step.title}
                  type="button"
                  onClick={() => setActive((prev) => (prev === i ? null : i))}
                  onMouseEnter={() => setActive(i)}
                  onMouseLeave={() => setActive(null)}
                  initial={{ opacity: 0, y: 30 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.15 + i * 0.1, ease: 'easeOut' }}
                  whileHover={{ y: -6 }}
                  className={`group relative text-left rounded-2xl border backdrop-blur-xl p-6 transition-all duration-500 ${
                    isActive
                      ? 'border-[#00d4ff]/60 bg-gradient-to-b from-[#001428]/90 to-[#000a14]/90 shadow-[0_20px_60px_-15px_rgba(0,212,255,0.4)] scale-[1.02]'
                      : 'border-[#00d4ff]/15 bg-gradient-to-b from-[#001428]/50 to-[#000a14]/50 hover:border-[#00d4ff]/35'
                  }`}
                >
                  {/* Step number */}
                  <div className="absolute top-3 right-4 text-[10px] font-mono tracking-widest text-[#00d4ff]/40">
                    0{i + 1}
                  </div>

                  {/* Icon */}
                  <div
                    className={`relative w-14 h-14 rounded-xl flex items-center justify-center mb-5 transition-all duration-500 ${
                      isActive
                        ? 'bg-gradient-to-br from-[#00d4ff] to-[#0066ff] shadow-[0_0_30px_rgba(0,212,255,0.5)]'
                        : 'bg-[#00d4ff]/10 border border-[#00d4ff]/25 group-hover:bg-[#00d4ff]/20'
                    }`}
                  >
                    <Icon
                      className={`w-7 h-7 transition-colors duration-300 ${
                        isActive ? 'text-white' : 'text-[#00d4ff]'
                      }`}
                      strokeWidth={1.8}
                    />
                  </div>

                  {/* Title */}
                  <h3 className="font-semibold text-foreground text-base mb-2 leading-tight">
                    {step.title}
                  </h3>

                  {/* Short description */}
                  <p className="text-foreground/60 text-sm leading-relaxed">
                    {step.desc}
                  </p>

                  {/* Expandable detail */}
                  <motion.div
                    initial={false}
                    animate={{
                      height: isActive ? 'auto' : 0,
                      opacity: isActive ? 1 : 0,
                      marginTop: isActive ? 12 : 0,
                    }}
                    transition={{ duration: 0.35, ease: 'easeOut' }}
                    className="overflow-hidden"
                  >
                    <div className="pt-3 border-t border-[#00d4ff]/15">
                      <p className="text-xs text-[#00d4ff]/85 leading-relaxed">
                        {step.detail}
                      </p>
                    </div>
                  </motion.div>

                  {/* Mobile arrow connector */}
                  {i < steps.length - 1 && (
                    <div className="lg:hidden flex justify-center mt-4 -mb-1">
                      <div className="w-px h-4 bg-gradient-to-b from-[#00d4ff]/40 to-transparent" />
                    </div>
                  )}
                </motion.button>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
