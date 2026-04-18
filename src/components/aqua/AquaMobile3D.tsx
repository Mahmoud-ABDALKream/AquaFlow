import { Suspense, lazy, useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

// Lazy-load the heavy 3D canvas only when this section is needed
const Mobile3DCanvas = lazy(() =>
  import('./Mobile3DCanvas').then((m) => ({ default: m.Mobile3DCanvas }))
)

function useIsTouchDevice() {
  const [isTouch, setIsTouch] = useState<boolean>(false)
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 1024px)')
    const update = () => setIsTouch(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])
  return isTouch
}

function useInView<T extends HTMLElement>(rootMargin = '200px') {
  const ref = useRef<T | null>(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    if (!ref.current || inView) return
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setInView(true)
            io.disconnect()
          }
        })
      },
      { rootMargin }
    )
    io.observe(ref.current)
    return () => io.disconnect()
  }, [inView, rootMargin])
  return { ref, inView }
}

export function AquaMobile3D() {
  const isTouch = useIsTouchDevice()
  const prefersReducedMotion = useReducedMotion()
  const { ref, inView } = useInView<HTMLDivElement>('150px')

  // Desktop: render nothing — keeps layout unchanged
  if (!isTouch) return null

  return (
    <section
      id="explore-3d"
      aria-label="Interactive 3D experience"
      className="relative py-16 px-4 overflow-hidden bg-gradient-to-b from-background via-background to-[#001428]"
    >
      {/* Ambient glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-[#00d4ff]/10 blur-3xl" />
      </div>

      <div className="relative max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.8 }}
          className="text-center mb-8"
        >
          <div className="inline-block mb-3 px-3 py-1 rounded-full border border-[#00d4ff]/30 bg-[#00d4ff]/5">
            <span className="text-[10px] font-mono tracking-[0.3em] text-[#00d4ff]">
              INTERACTIVE · MOBILE & TABLET
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-semibold text-foreground mb-2">
            Explore in 3D
          </h2>
          <p className="text-sm md:text-base text-foreground/60 max-w-md mx-auto">
            Drag to rotate · Pinch to zoom · Tap to interact
          </p>
        </motion.div>

        <motion.div
          ref={ref}
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.9, ease: 'easeOut' }}
          className="relative rounded-3xl border border-[#00d4ff]/20 bg-gradient-to-b from-[#001428]/80 to-[#000a14]/80 backdrop-blur-xl overflow-hidden shadow-[0_20px_60px_-15px_rgba(0,212,255,0.25)]"
        >
          {/* Aspect-ratio safe container */}
          <div className="relative w-full aspect-square sm:aspect-[4/3] max-h-[70vh]">
            {inView && !prefersReducedMotion ? (
              <Suspense
                fallback={
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-10 h-10 border-2 border-[#00d4ff]/30 border-t-[#00d4ff] rounded-full animate-spin" />
                  </div>
                }
              >
                <Mobile3DCanvas />
              </Suspense>
            ) : (
              // Fallback for reduced motion or before lazy-load
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center px-6">
                  <div className="w-24 h-24 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-[#00d4ff]/30 to-[#0066ff]/20 border border-[#00d4ff]/30 flex items-center justify-center">
                    <span className="text-3xl">💧</span>
                  </div>
                  <p className="text-xs text-foreground/50 font-mono">
                    {prefersReducedMotion ? 'STATIC PREVIEW' : 'LOADING...'}
                  </p>
                </div>
              </div>
            )}

            {/* Gesture hint */}
            <div className="pointer-events-none absolute bottom-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-black/40 backdrop-blur-md border border-[#00d4ff]/20">
              <span className="text-[10px] font-mono tracking-[0.25em] text-[#00d4ff]/80">
                DRAG TO EXPLORE
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
