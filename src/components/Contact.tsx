import { site } from '../data/site'
import { useReveal } from '../hooks/useReveal'

type ContactProps = {
  onOpenResume: () => void
}

export default function Contact({ onOpenResume }: ContactProps) {
  const { ref, visible } = useReveal()

  return (
    <section
      id="contact"
      ref={ref}
      className={`reveal-block border-t border-[var(--line)] ${visible ? 'is-visible' : ''}`}
    >
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-5 py-24 sm:px-8 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="max-w-md text-[var(--mute)]">
            {site.location}. Open to remote for software, security, and AI roles.
          </p>
        </div>
        <div className="flex flex-col gap-3 font-mono text-sm">
          <a href={`mailto:${site.email}`} className="text-[var(--lime)]">
            {site.email}
          </a>
          <button
            type="button"
            onClick={onOpenResume}
            className="pressable text-left text-[var(--paper)]"
          >
            Resume
          </button>
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
