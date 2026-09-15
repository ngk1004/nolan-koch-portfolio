import { site } from '../data/site'
import { useReveal } from '../hooks/useReveal'

export default function Stack() {
  const { ref, visible } = useReveal()

  return (
    <section
      id="stack"
      ref={ref}
      className={`reveal-block border-t border-[var(--line)] ${visible ? 'is-visible' : ''}`}
    >
      <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8">
        <h2 className="font-display text-[clamp(1.8rem,4vw,2.8rem)] tracking-tight text-[var(--paper)]">
          Stack
        </h2>
        <dl className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {site.stack.map((group) => (
            <div key={group.group}>
              <dt className="font-mono text-[11px] uppercase tracking-[0.16em] text-[var(--mute)]">
                {group.group}
              </dt>
              <dd className="mt-4">
                <ul className="space-y-1.5 text-[0.95rem] text-[var(--paper)]">
                  {group.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
