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

function AccordionMedia({ visual }: { visual: ProjectVisual }) {
  switch (visual.kind) {
    case 'image':
      return (
        <img
          src={imageSrc(visual.src)}
          alt={visual.alt}
          draggable={false}
          className="block h-full w-full select-none object-cover [-webkit-user-drag:none]"
        />
      )
    case 'metric':
      return (
        <div className="flex h-full w-full flex-col justify-end bg-[var(--ink)] px-5 py-6">
          <p className="font-display text-[clamp(2rem,5vw,3.2rem)] leading-none tracking-tight text-[var(--lime)]">
            {visual.value}
          </p>
          <p className="mt-3 max-w-[16ch] font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--mute)]">
            {visual.label}
          </p>
        </div>
      )
    default: {
      const _exhaustive: never = visual
      return _exhaustive
    }
  }
}

function toGalleryItem(project: Project): AccordionGalleryItem {
  return {
    id: project.id,
    label: project.title,
    link: project.href,
    alt: project.title,
    media: <AccordionMedia visual={project.visual} />,
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
          height={440}
          trigger="hover"
          grayscale
          onActiveChange={(_index, item) => setActiveId(item.id)}
        />

        {activeProject && (
          <div className="border-t border-[var(--line)] p-5 sm:p-6">
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
