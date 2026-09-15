import { site } from '../data/site'
import HeroSchematic from './HeroSchematic'

type HeroProps = {
  onOpenResume: () => void
}

export default function Hero({ onOpenResume }: HeroProps) {
  return (
    <section
      id="top"
      className="relative grid min-h-[100dvh] items-end overflow-hidden lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]"
    >
      <div className="relative z-10 flex flex-col justify-end px-5 pb-16 pt-28 sm:px-8 lg:px-12 lg:pb-24">
        <h1 className="max-w-[14ch] font-display text-[clamp(3.1rem,9vw,6.4rem)] font-medium leading-[0.92] tracking-[-0.04em] text-[var(--paper)]">
          {site.name}
        </h1>
        <p className="mt-8 max-w-md text-[0.95rem] leading-relaxed text-[var(--mute)]">
          {site.subtext}
        </p>
        <div className="mt-10 flex flex-wrap gap-3">
          <a
            href="#experience"
            className="pressable bg-[var(--lime)] px-5 py-2.5 font-mono text-[11px] uppercase tracking-[0.16em] text-[var(--ink)]"
          >
            Experience
          </a>
          <button
            type="button"
            onClick={onOpenResume}
            className="pressable border border-[var(--line)] px-5 py-2.5 font-mono text-[11px] uppercase tracking-[0.16em] text-[var(--paper)]"
          >
            Resume
          </button>
        </div>
      </div>
      <HeroSchematic />
    </section>
  )
}
