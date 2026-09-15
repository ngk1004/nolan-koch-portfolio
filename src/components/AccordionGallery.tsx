import {
  useRef,
  useEffect,
  useState,
  useCallback,
  type CSSProperties,
  type KeyboardEvent,
  type MouseEvent,
  type ReactNode,
} from 'react'
import { gsap } from 'gsap'

export type AccordionGalleryItem = {
  id: string
  label: string
  /** Short label shown on collapsed vertical strips. */
  spine?: string
  link?: string
  alt?: string
  media: ReactNode
}

export type AccordionGalleryProps = {
  items: AccordionGalleryItem[]
  defaultIndex?: number
  accentColor?: string
  overlayColor?: string
  textColor?: string
  height?: number
  gap?: number
  radius?: number
  expandRatio?: number
  orientation?: 'horizontal' | 'vertical'
  duration?: number
  ease?: string
  parallax?: number
  tilt?: number
  stagger?: number
  trigger?: 'hover' | 'click'
  showLabels?: boolean
  grayscale?: boolean
  className?: string
  onActiveChange?: (index: number, item: AccordionGalleryItem) => void
}

export default function AccordionGallery({
  items,
  defaultIndex = 0,
  accentColor = '#d4ff58',
  overlayColor = '#0b0a09',
  textColor = '#e8e2d9',
  height = 420,
  gap = 8,
  radius = 0,
  expandRatio = 0.48,
  orientation = 'horizontal',
  duration = 0.35,
  ease = 'power2.out',
  parallax = 0.35,
  tilt = 4,
  stagger = 0.04,
  trigger = 'hover',
  showLabels = true,
  grayscale = false,
  className = '',
  onActiveChange,
}: AccordionGalleryProps) {
  const rootRef = useRef<HTMLDivElement>(null)
  const panelRefs = useRef<(HTMLElement | null)[]>([])
  const mediaRefs = useRef<(HTMLElement | null)[]>([])
  const barRefs = useRef<(HTMLElement | null)[]>([])
  const textRefs = useRef<(HTMLElement | null)[]>([])
  const tlRef = useRef<gsap.core.Timeline | null>(null)
  const firstRunRef = useRef(true)
  const mediaSizeRef = useRef(320)
  const onActiveChangeRef = useRef(onActiveChange)
  onActiveChangeRef.current = onActiveChange

  const vertical = orientation === 'vertical'
  const count = items.length
  const [active, setActive] = useState(() =>
    Math.min(Math.max(defaultIndex, 0), Math.max(count - 1, 0)),
  )

  useEffect(() => {
    setActive(Math.min(Math.max(defaultIndex, 0), Math.max(count - 1, 0)))
    firstRunRef.current = true
  }, [count, defaultIndex, items])

  useEffect(() => {
    const item = items[active]
    if (item) onActiveChangeRef.current?.(active, item)
  }, [active, items])

  const prefersReduced =
    typeof window !== 'undefined' && window.matchMedia
      ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
      : false

  const overlayBg = `linear-gradient(180deg, transparent 62%, color-mix(in srgb, ${overlayColor} 55%, transparent) 100%)`

  const applyLayout = useCallback(
    (animate: boolean) => {
      const panels = panelRefs.current
      if (!panels.length) return

      const r = Math.min(Math.max(expandRatio, 0.2), 0.9)
      const grow = count > 1 ? (r * (count - 1)) / (1 - r) : 1
      const mediaSize = mediaSizeRef.current

      tlRef.current?.kill()
      const dur = animate && !prefersReduced ? duration : 0
      const tl = gsap.timeline()

      panels.forEach((panel, i) => {
        if (!panel) return
        const isActive = i === active
        const media = mediaRefs.current[i]
        const bar = barRefs.current[i]
        const text = textRefs.current[i]

        const rot = isActive ? 0 : i < active ? tilt : -tilt
        const rotProp = vertical ? { rotateX: -rot } : { rotateY: rot }

        tl.to(panel, { flexGrow: isActive ? grow : 1, ...rotProp, duration: dur, ease }, 0)

        if (media) {
          const drift = Math.max(-1.5, Math.min(1.5, active - i))
          const shift = drift * parallax * mediaSize * 0.04
          const gray = grayscale ? (isActive ? 0 : 1) : 0
          tl.to(
            media,
            {
              scale: isActive ? 1 : 1.02,
              x: vertical ? 0 : isActive ? 0 : shift,
              y: vertical ? (isActive ? 0 : shift) : 0,
              '--ag-gray': gray,
              '--ag-dim': 0,
              duration: dur,
              ease,
            },
            0,
          )
        }

        if (showLabels && bar && text) {
          if (isActive) {
            tl.to(
              [bar, text],
              {
                opacity: 1,
                x: 0,
                duration: dur,
                ease,
                stagger: prefersReduced ? 0 : stagger,
              },
              0,
            )
          } else {
            tl.to([bar, text], { opacity: 0, x: -12, duration: dur * 0.55, ease }, 0)
          }
        }
      })

      tlRef.current = tl
    },
    [
      active,
      count,
      expandRatio,
      duration,
      ease,
      vertical,
      tilt,
      parallax,
      grayscale,
      showLabels,
      stagger,
      prefersReduced,
    ],
  )

  useEffect(() => {
    const el = rootRef.current
    if (!el) return

    const measure = () => {
      const rect = el.getBoundingClientRect()
      const total = vertical ? rect.height : rect.width
      const usable = Math.max(total - gap * (count - 1), 120)
      const size = Math.max(140, usable * Math.min(Math.max(expandRatio, 0.2), 0.9) * 1.22)
      mediaSizeRef.current = size
      el.style.setProperty('--ag-media-size', `${size}px`)
      applyLayout(!firstRunRef.current)
    }

    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(el)
    return () => ro.disconnect()
  }, [applyLayout, gap, count, expandRatio, vertical])

  useEffect(() => {
    applyLayout(!firstRunRef.current)
    firstRunRef.current = false
  }, [applyLayout])

  useEffect(
    () => () => {
      tlRef.current?.kill()
    },
    [],
  )

  const handleEnter = (i: number) => {
    if (trigger === 'hover') setActive(i)
  }

  const handleClick = (i: number, e: MouseEvent) => {
    if (i !== active) {
      e.preventDefault()
      setActive(i)
    }
  }

  const handleKeyDown = (i: number, e: KeyboardEvent) => {
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      e.preventDefault()
      setActive((i + 1) % count)
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault()
      setActive((i - 1 + count) % count)
    }
  }

  if (count === 0) return null

  return (
    <div
      ref={rootRef}
      className={`flex w-full max-w-full [perspective:1200px] max-[640px]:!flex-col max-[640px]:[perspective:none] ${vertical ? 'flex-col' : 'flex-row'} ${className}`}
      style={{
        gap: `${gap}px`,
        height: vertical ? `${Math.round(height * 1.5)}px` : `${height}px`,
      }}
      role="list"
      aria-label="Project accordion gallery"
    >
      {items.map((item, i) => {
        const isActive = i === active
        const Tag = (item.link ? 'a' : 'div') as 'a'
        return (
          <Tag
            key={item.id}
            ref={(el: HTMLElement | null) => {
              panelRefs.current[i] = el
            }}
            className="group relative block min-h-0 min-w-0 flex-[1_1_0] cursor-pointer overflow-hidden bg-[var(--ink)] no-underline outline-none [transform-origin:center] [transform-style:preserve-3d] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--ag-accent)] max-[640px]:min-h-[88px] max-[640px]:!transform-none"
            style={
              {
                borderRadius: `${radius}px`,
                '--ag-accent': accentColor,
                willChange: 'flex-grow, transform',
              } as CSSProperties
            }
            href={item.link || undefined}
            target={item.link ? '_blank' : undefined}
            rel={item.link ? 'noreferrer' : undefined}
            onClick={(e) => handleClick(i, e)}
            onMouseEnter={() => handleEnter(i)}
            onFocus={() => setActive(i)}
            onKeyDown={(e) => handleKeyDown(i, e)}
            role="listitem"
            tabIndex={0}
            aria-current={isActive ? 'true' : undefined}
            aria-label={item.label}
          >
            <span className="absolute inset-0 overflow-hidden [border-radius:inherit]">
              <span
                ref={(el: HTMLElement | null) => {
                  mediaRefs.current[i] = el
                }}
                className="absolute inset-0 [filter:grayscale(var(--ag-gray,0))] [transform-origin:center]"
                style={{ willChange: 'transform, filter' }}
              >
                {item.media}
              </span>
              <span
                className="pointer-events-none absolute inset-0"
                style={{ background: overlayBg }}
                aria-hidden="true"
              />
            </span>
            {!isActive && (item.spine || item.label) && (
              <span
                className="pointer-events-none absolute inset-x-0 bottom-3 top-3 z-[2] flex justify-center"
                aria-hidden="true"
              >
                <span
                  className="font-mono text-[10px] uppercase tracking-[0.2em] [writing-mode:vertical-rl] [text-orientation:mixed]"
                  style={{ color: accentColor }}
                >
                  {item.spine || item.label}
                </span>
              </span>
            )}
            {showLabels && (
              <span
                className="pointer-events-none absolute right-4 bottom-4 left-4 z-[2] flex items-center gap-3"
                aria-hidden="true"
              >
                <span
                  ref={(el: HTMLElement | null) => {
                    barRefs.current[i] = el
                  }}
                  className="h-5 w-0.5 flex-none opacity-0"
                  style={{ background: accentColor }}
                />
                <span
                  ref={(el: HTMLElement | null) => {
                    textRefs.current[i] = el
                  }}
                  className="overflow-hidden text-ellipsis whitespace-nowrap font-display text-[clamp(0.95rem,1.5vw,1.25rem)] tracking-tight opacity-0"
                  style={{ color: textColor }}
                >
                  {item.label}
                </span>
              </span>
            )}
          </Tag>
        )
      })}
    </div>
  )
}
