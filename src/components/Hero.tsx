import { imageSrc, resumeSrc, site } from '../data/site'

export default function Hero() {
  return (
    <section
      id="top"
      className="relative grid min-h-[100dvh] items-end overflow-hidden lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]"
    >
      <div className="relative z-10 flex flex-col justify-end px-5 pb-16 pt-28 sm:px-8 lg:px-12 lg:pb-24">
        <h1 className="max-w-[14ch] font-display text-[clamp(3.1rem,9vw,6.4rem)] font-medium leading-[0.92] tracking-[-0.04em] text-[var(--paper)]">
          {site.name}
        </h1>
        <p className="mt-8 max-w-xl font-display text-[clamp(1.35rem,3vw,2rem)] leading-snug text-[var(--paper)]">
          {site.headline}
        </p>
        <p className="mt-4 max-w-md text-[0.95rem] leading-relaxed text-[var(--mute)]">
          {site.subtext}
        </p>
        <div className="mt-10 flex flex-wrap gap-3">
          <a
            href="#experience"
            className="bg-[var(--lime)] px-5 py-2.5 font-mono text-[11px] uppercase tracking-[0.16em] text-[var(--ink)]"
          >
            Experience
          </a>
          <a
            href={resumeSrc()}
            target="_blank"
            rel="noreferrer"
            className="border border-[var(--line)] px-5 py-2.5 font-mono text-[11px] uppercase tracking-[0.16em] text-[var(--paper)] hover:border-[var(--lime)] hover:text-[var(--lime)]"
          >
            Resume
          </a>
        </div>
      </div>
      <div className="hero-visual relative min-h-[42vh] lg:min-h-full">
        <img
          src={imageSrc('cuda-matrix-diagram.png')}
          alt="CUDA tiled matrix multiply diagram"
          className="absolute inset-0 h-full w-full object-cover object-left opacity-80"
        />
        <div className="hero-grain pointer-events-none absolute inset-0" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[var(--ink)] via-transparent to-[var(--ink)]/40 lg:bg-gradient-to-l" />
      </div>
    </section>
  )
}
