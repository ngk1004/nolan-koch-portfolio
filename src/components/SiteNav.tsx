import { useEffect, useState } from 'react'
import { site } from '../data/site'

const links = [
  { href: '#work', id: 'work', label: 'Work' },
  { href: '#research', id: 'research', label: 'Research' },
  { href: '#stack', id: 'stack', label: 'Stack' },
  { href: '#contact', id: 'contact', label: 'Contact' },
] as const

export default function SiteNav() {
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState<string>('work')
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const ids = links.map((link) => link.id)
    const nodes = ids
      .map((id) => document.getElementById(id))
      .filter((node): node is HTMLElement => node !== null)
    if (nodes.length === 0) return
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (visible?.target.id) setActive(visible.target.id)
      },
      { rootMargin: '-35% 0px -50% 0px', threshold: [0.1, 0.25, 0.5] },
    )
    nodes.forEach((node) => observer.observe(node))
    return () => observer.disconnect()
  }, [])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[border-color,background-color] duration-300 ${
        scrolled
          ? 'border-b border-[var(--line)] bg-[color-mix(in_srgb,var(--ink)_92%,transparent)] backdrop-blur-md'
          : 'border-b border-transparent bg-transparent'
      }`}
    >
      <nav className="mx-auto flex h-14 max-w-6xl items-center justify-between px-5 sm:px-8">
        <a
          href="#top"
          className="font-display text-[1.05rem] font-medium tracking-tight text-[var(--paper)]"
        >
          {site.name}
        </a>
        <ul className="hidden items-center gap-7 md:flex">
          {links.map((link) => (
            <li key={link.id}>
              <a
                href={link.href}
                className={`font-mono text-[11px] uppercase tracking-[0.16em] transition-colors ${
                  active === link.id
                    ? 'text-[var(--lime)] underline decoration-[var(--lime)] underline-offset-8'
                    : 'text-[var(--mute)] hover:text-[var(--paper)]'
                }`}
              >
                {link.label}
              </a>
            </li>
          ))}
          <li>
            <a
              href={site.github}
              target="_blank"
              rel="noreferrer"
              className="font-mono text-[11px] uppercase tracking-[0.16em] text-[var(--mute)] hover:text-[var(--lime)]"
            >
              GitHub
            </a>
          </li>
        </ul>
        <button
          type="button"
          className="relative h-8 w-8 md:hidden"
          aria-expanded={open}
          aria-label="Menu"
          onClick={() => setOpen((value) => !value)}
        >
          <span
            className={`absolute left-1.5 top-2.5 block h-px w-5 bg-[var(--paper)] transition ${open ? 'translate-y-[5px] rotate-45' : ''}`}
          />
          <span
            className={`absolute left-1.5 top-[15px] block h-px w-5 bg-[var(--paper)] transition ${open ? 'opacity-0' : ''}`}
          />
          <span
            className={`absolute left-1.5 top-[21px] block h-px w-5 bg-[var(--paper)] transition ${open ? '-translate-y-[6px] -rotate-45' : ''}`}
          />
        </button>
      </nav>
      {open ? (
        <div className="border-t border-[var(--line)] bg-[var(--ink)] px-5 py-4 md:hidden">
          <ul className="flex flex-col gap-3">
            {links.map((link) => (
              <li key={link.id}>
                <a
                  href={link.href}
                  className="font-mono text-xs uppercase tracking-[0.16em] text-[var(--paper)]"
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li>
              <a
                href={site.github}
                target="_blank"
                rel="noreferrer"
                className="font-mono text-xs uppercase tracking-[0.16em] text-[var(--lime)]"
              >
                GitHub
              </a>
            </li>
          </ul>
        </div>
      ) : null}
    </header>
  )
}
