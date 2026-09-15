import { site } from '../data/site'
import { useReveal } from '../hooks/useReveal'

export default function Research() {
  const { ref, visible } = useReveal()
  const { research } = site

  return (
    <section
      id="research"
      ref={ref}
      className={`reveal-block border-y border-[var(--line)] ${visible ? 'is-visible' : ''}`}
    >
      <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 lg:py-20">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--lime)]">
            {research.venue}
          </p>
          <h2 className="mt-3 max-w-3xl font-display text-[clamp(1.4rem,2.6vw,2.05rem)] leading-tight text-[var(--paper)]">
            {research.title}
          </h2>
          <p className="mt-4 max-w-2xl text-[0.95rem] leading-relaxed text-[var(--mute)]">
            {research.blurb}
          </p>
          {research.href ? (
            <a
              href={research.href}
              target="_blank"
              rel="noreferrer"
              className="mt-6 inline-block font-mono text-[11px] uppercase tracking-[0.16em] text-[var(--lime)]"
            >
              OpenReview
            </a>
          ) : null}
        </div>
      </div>
    </section>
  )
}
