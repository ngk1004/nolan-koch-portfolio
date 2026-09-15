import { resumeSrc, site } from '../data/site'
import { useReveal } from '../hooks/useReveal'

export default function Experience() {
  const { ref, visible } = useReveal()

  return (
    <section
      id="experience"
      ref={ref}
      className={`reveal-block border-t border-[var(--line)] ${visible ? 'is-visible' : ''}`}
    >
      <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h2 className="font-display text-[clamp(1.8rem,4vw,2.8rem)] tracking-tight text-[var(--paper)]">
            Experience
          </h2>
          <a
            href={resumeSrc()}
            target="_blank"
            rel="noreferrer"
            className="font-mono text-[11px] uppercase tracking-[0.16em] text-[var(--lime)]"
          >
            Download resume PDF
          </a>
        </div>

        <ol className="mt-12 divide-y divide-[var(--line)] border-y border-[var(--line)]">
          {site.experience.map((job) => (
            <li key={job.id} className="grid gap-4 py-8 lg:grid-cols-[14rem_1fr]">
              <div>
                <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-[var(--mute)]">
                  {job.dates}
                </p>
                <p className="mt-2 font-display text-xl text-[var(--paper)]">{job.org}</p>
                <p className="mt-1 text-sm text-[var(--mute)]">{job.role}</p>
              </div>
              <ul className="space-y-2 text-[0.95rem] leading-relaxed text-[var(--mute)]">
                {job.highlights.map((line) => (
                  <li key={line} className="text-[var(--mute)]">
                    {line}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ol>

        <div className="mt-12 grid gap-10 lg:grid-cols-2">
          <div>
            <h3 className="font-display text-xl text-[var(--paper)]">Education</h3>
            <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.14em] text-[var(--mute)]">
              {site.education.dates}
            </p>
            <p className="mt-2 text-[var(--paper)]">{site.education.school}</p>
            <p className="mt-1 text-sm text-[var(--mute)]">{site.education.degree}</p>
            {site.education.detail ? (
              <p className="mt-3 text-sm text-[var(--mute)]">{site.education.detail}</p>
            ) : null}
          </div>
          <div>
            <h3 className="font-display text-xl text-[var(--paper)]">Leadership</h3>
            <ul className="mt-4 space-y-5">
              {site.leadership.map((item) => (
                <li key={item.id}>
                  <p className="text-[var(--paper)]">
                    {item.org}
                    <span className="text-[var(--mute)]"> · {item.role}</span>
                  </p>
                  <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--mute)]">
                    {item.dates}
                  </p>
                  <p className="mt-2 text-sm text-[var(--mute)]">{item.highlights[0]}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
