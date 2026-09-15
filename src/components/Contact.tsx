import { resumeSrc, site } from '../data/site'
import { useReveal } from '../hooks/useReveal'

export default function Contact() {
  const { ref, visible } = useReveal()

  return (
    <section
      id="contact"
      ref={ref}
      className={`reveal-block border-t border-[var(--line)] ${visible ? 'is-visible' : ''}`}
    >
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-5 py-24 sm:px-8 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <h2 className="font-display text-[clamp(2rem,5vw,3.4rem)] tracking-tight text-[var(--paper)]">
            Hire me for systems that have to work.
          </h2>
          <p className="mt-4 max-w-md text-[var(--mute)]">
            {site.location}. Open for software, security, and AI roles.
          </p>
        </div>
        <div className="flex flex-col gap-3 font-mono text-sm">
          <a href={`mailto:${site.email}`} className="text-[var(--lime)]">
            {site.email}
          </a>
          <a
            href={resumeSrc()}
            target="_blank"
            rel="noreferrer"
            className="text-[var(--paper)] hover:text-[var(--lime)]"
          >
            Download resume
          </a>
          <a
            href={site.github}
            target="_blank"
            rel="noreferrer"
            className="text-[var(--paper)] hover:text-[var(--lime)]"
          >
            github.com/ngk1004
          </a>
        </div>
      </div>
    </section>
  )
}
