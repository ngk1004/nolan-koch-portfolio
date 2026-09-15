import { useEffect, useMemo, useState } from 'react'
import {
  imageSrc,
  isProjectLane,
  parseProjectId,
  PROJECT_LANES,
  projectsForLane,
  site,
  type Project,
  type ProjectFilter,
  type ProjectVisual,
} from '../data/site'
import { useReveal } from '../hooks/useReveal'
import AccordionGallery, {
  type AccordionGalleryItem,
} from './AccordionGallery'

const LANE_LABEL: Record<ProjectFilter, string> = {
  all: 'All',
  agents: 'Agents',
  data: 'Data',
  systems: 'Systems',
  ml: 'ML',
  security: 'Security',
  web: 'Web',
}

/** Stronger lane fills so thin accordion strips still read as color. */
const LANE_PANEL: Record<Project['lane'], string> = {
  agents:
    'linear-gradient(160deg, color-mix(in srgb, #5eb8ff 42%, #0b0a09) 0%, #0f1a24 48%, #0b0a09 100%)',
  data:
    'linear-gradient(160deg, color-mix(in srgb, #ffb84a 40%, #0b0a09) 0%, #24180c 48%, #0b0a09 100%)',
  systems:
    'linear-gradient(160deg, color-mix(in srgb, #d4ff58 44%, #0b0a09) 0%, #1a220e 48%, #0b0a09 100%)',
  ml:
    'linear-gradient(160deg, color-mix(in srgb, #5dff9a 40%, #0b0a09) 0%, #0e2218 48%, #0b0a09 100%)',
  security:
    'linear-gradient(160deg, color-mix(in srgb, #ff6b4a 38%, #0b0a09) 0%, #26140f 48%, #0b0a09 100%)',
  web:
    'linear-gradient(160deg, color-mix(in srgb, #d4ff58 36%, #0b0a09) 0%, #1a220e 48%, #0b0a09 100%)',
}

const LANE_ACCENT: Record<Project['lane'], string> = {
  agents: '#8fd4ff',
  data: '#ffc15a',
  systems: '#d4ff58',
  ml: '#7dffb2',
  security: '#ff8f74',
  web: '#d4ff58',
}

function AccordionMedia({
  visual,
  lane,
  title,
}: {
  visual: ProjectVisual
  lane: Project['lane']
  title: string
}) {
  const accent = LANE_ACCENT[lane]
  const value = visual.kind === 'metric' ? visual.value : title
  const caption = visual.kind === 'metric' ? visual.label : lane

  return (
    <div
      className="relative flex h-full w-full flex-col justify-between px-4 py-5 sm:px-5 sm:py-6"
      style={{ background: LANE_PANEL[lane] }}
    >
      <span
        className="pointer-events-none absolute inset-y-0 left-0 w-1"
        style={{ background: accent }}
        aria-hidden="true"
      />
      <p
        className="font-mono text-[10px] uppercase tracking-[0.18em]"
        style={{ color: accent }}
      >
        {LANE_LABEL[lane]}
      </p>
      <div className="pb-12">
        <p
          className="font-display text-[clamp(2.4rem,6vw,4rem)] leading-[0.9] tracking-tight"
          style={{ color: accent }}
        >
          {value}
        </p>
        <p className="mt-3 max-w-[18ch] font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--paper)]/70">
          {caption}
        </p>
      </div>
    </div>
  )
}

function toGalleryItem(project: Project): AccordionGalleryItem {
  return {
    id: project.id,
    label: project.title,
    spine: LANE_LABEL[project.lane],
    link: project.href,
    alt: project.title,
    media: (
      <AccordionMedia
        visual={project.visual}
        lane={project.lane}
        title={project.title}
      />
    ),
  }
}

export default function Work() {
  const { ref, visible } = useReveal()
  const [lane, setLane] = useState<ProjectFilter>('all')
  const [activeId, setActiveId] = useState<string | null>(null)
  const [highlight, setHighlight] = useState<string | null>(null)

  const visibleProjects = useMemo(
    () => projectsForLane(site.projects, lane),
    [lane],
  )

  const galleryItems = useMemo(
    () => visibleProjects.map(toGalleryItem),
    [visibleProjects],
  )

  const defaultIndex = useMemo(() => {
    if (!highlight) return 0
    const index = visibleProjects.findIndex((project) => project.id === highlight)
    return index >= 0 ? index : 0
  }, [highlight, visibleProjects])

  const activeProject =
    visibleProjects.find((project) => project.id === activeId) ??
    visibleProjects[0] ??
    null

  useEffect(() => {
    const id = parseProjectId(
      new URLSearchParams(window.location.search).get('project'),
    )
    if (!id) return
    setHighlight(id)
    const project = site.projects.find((item) => item.id === id)
    if (project && project.lane !== lane) setLane(project.lane)
    requestAnimationFrame(() => {
      document.getElementById('work')?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      })
    })
  }, [])

  return (
    <section
      id="work"
      ref={ref}
      className={`reveal-block mx-auto max-w-6xl px-5 py-20 sm:px-8 ${visible ? 'is-visible' : ''}`}
    >
      <div className="flex flex-wrap items-end justify-between gap-6">
        <h2 className="font-display text-[clamp(1.8rem,4vw,2.8rem)] tracking-tight text-[var(--paper)]">
          Selected systems
        </h2>
        <div className="flex flex-wrap gap-2">
          {(
            [
              'all',
              ...PROJECT_LANES.filter((item) =>
                site.projects.some((project) => project.lane === item),
              ),
            ] as const
          ).map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setLane(item)}
              className={`pressable font-mono text-[10px] uppercase tracking-[0.16em] ${
                lane === item
                  ? 'bg-[var(--lime)] px-3 py-1.5 text-[var(--ink)]'
                  : 'border border-[var(--line)] px-3 py-1.5 text-[var(--mute)]'
              }`}
            >
              {LANE_LABEL[item]}
            </button>
          ))}
        </div>
      </div>

      <div
        id={activeProject ? `project-${activeProject.id}` : undefined}
        className={`mt-10 border border-[var(--line)] bg-[var(--panel)] ${
          highlight && activeProject?.id === highlight
            ? 'border-[var(--lime)]'
            : ''
        }`}
      >
        <AccordionGallery
          key={`${lane}-${galleryItems.map((item) => item.id).join('-')}`}
          items={galleryItems}
          defaultIndex={defaultIndex}
          height={400}
          expandRatio={0.55}
          trigger="hover"
          grayscale={false}
          tilt={0}
          parallax={0}
          onActiveChange={(_index, item) => setActiveId(item.id)}
        />

        {activeProject && (
          <div className="border-t border-[var(--line)] p-5 sm:p-6">
            {activeProject.shot && (
              <div className="mb-6 overflow-hidden border border-[var(--line)]">
                <img
                  src={imageSrc(activeProject.shot.src)}
                  alt={activeProject.shot.alt}
                  className="max-h-64 w-full object-cover object-top sm:max-h-80"
                />
              </div>
            )}
            <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-[var(--mute)]">
              {isProjectLane(activeProject.lane)
                ? LANE_LABEL[activeProject.lane]
                : activeProject.lane}
            </p>
            <h3 className="mt-2 font-display text-xl text-[var(--paper)] sm:text-2xl">
              {activeProject.title}
            </h3>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[var(--mute)]">
              {activeProject.blurb}
            </p>
            <p className="mt-4 max-w-2xl text-sm text-[var(--paper)]">
              {activeProject.outcome}
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {activeProject.tags.map((tag) => (
                <span
                  key={tag}
                  className="font-mono text-[10px] uppercase tracking-[0.12em] text-[var(--mute)]"
                >
                  {tag}
                </span>
              ))}
            </div>
            <a
              href={activeProject.href}
              target="_blank"
              rel="noreferrer"
              className="pressable mt-5 inline-block font-mono text-[11px] uppercase tracking-[0.16em] text-[var(--lime)]"
            >
              GitHub
            </a>
          </div>
        )}
      </div>
    </section>
  )
}
