import { useEffect, useRef } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { resumeSrc } from '../data/site'

const EASE_OUT = [0.23, 1, 0.32, 1] as const

type ResumeSheetProps = {
  open: boolean
  onClose: () => void
}

export default function ResumeSheet({ open, onClose }: ResumeSheetProps) {
  const closeRef = useRef<HTMLButtonElement>(null)
  const reduce = useReducedMotion()

  useEffect(() => {
    if (!open) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = previous
    }
  }, [open, onClose])

  return (
    <AnimatePresence>
      {open ? (
        <div className="fixed inset-0 z-[80]">
          <motion.button
            type="button"
            aria-label="Close resume"
            className="absolute inset-0 bg-[color-mix(in_srgb,var(--ink)_72%,transparent)]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22, ease: EASE_OUT }}
            onClick={onClose}
          />
          <motion.aside
            role="dialog"
            aria-modal="true"
            aria-labelledby="resume-sheet-title"
            className="absolute inset-x-0 bottom-0 flex max-h-[92dvh] flex-col border-t border-[var(--line)] bg-[var(--panel)] sm:inset-y-0 sm:left-auto sm:right-0 sm:w-[min(42rem,100%)] sm:border-l sm:border-t-0"
            initial={
              reduce
                ? { opacity: 0 }
                : { opacity: 0, transform: 'translateY(16px) scale(0.98)' }
            }
            animate={
              reduce
                ? { opacity: 1 }
                : { opacity: 1, transform: 'translateY(0) scale(1)' }
            }
            exit={
              reduce
                ? { opacity: 0 }
                : { opacity: 0, transform: 'translateY(12px) scale(0.98)' }
            }
            transition={{ duration: 0.28, ease: EASE_OUT }}
          >
            <div className="flex items-center justify-between gap-3 border-b border-[var(--line)] px-5 py-3">
              <h2
                id="resume-sheet-title"
                className="font-display text-lg text-[var(--paper)]"
              >
                Resume
              </h2>
              <div className="flex items-center gap-2">
                <a
                  href={resumeSrc()}
                  download
                  className="pressable border border-[var(--line)] px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.16em] text-[var(--paper)]"
                >
                  Download
                </a>
                <button
                  ref={closeRef}
                  type="button"
                  className="pressable border border-[var(--lime)] bg-[var(--lime)] px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.16em] text-[var(--ink)]"
                  onClick={onClose}
                >
                  Close
                </button>
              </div>
            </div>
            <iframe
              title="Nolan Koch resume PDF"
              src={resumeSrc()}
              className="min-h-[70dvh] w-full flex-1 bg-[var(--ink)]"
            />
          </motion.aside>
        </div>
      ) : null}
    </AnimatePresence>
  )
}
