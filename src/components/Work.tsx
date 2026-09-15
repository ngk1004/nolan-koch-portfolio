import { useEffect, useMemo, useState } from 'react'
import {
  imageSrc,
  isProjectLane,
  parseProjectId,
  PROJECT_LANES,
  projectsForLane,
  site,
  type ProjectFilter,
} from '../data/site'
import { useReveal } from '../hooks/useReveal'

const LANE_LABEL: Record<ProjectFilter, string> = {
  all: 'All',
  agents: 'Agents',
  data: 'Data',
  systems: 'Systems',
  ml: 'ML',
  security: 'Security',
  web: 'Web',
}

export default function Work() {
  const { ref, visible } = useReveal()
  const [lane, setLane] = useState<ProjectFilter>('all')
  const [highlight, setHighlight] = useState<string | null>(null)

  const visibleProjects = useMemo(
    () => projectsForLane(site.projects, lane),
    [lane],
  )

  useEffect(() => {
    const id = parseProjectId(
      new URLSearchParams(window.location.search).get('project'),
    )
    if (!id) return
    setHighlight(id)
    const project = site.projects.find((item) => item.id === id)
    if (project && project.lane !== lane) setLane(project.lane)
    const node = document.getElementById(`project-${id}`)
    node?.scrollIntoView({ behavior: 'smooth', block: 'center' })
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
              className={`font-mono text-[10px] uppercase tracking-[0.16em] ${
                lane === item
                  ? 'bg-[var(--lime)] px-3 py-1.5 text-[var(--ink)]'
                  : 'border border-[var(--line)] px-3 py-1.5 text-[var(--mute)] hover:text-[var(--paper)]'
              }`}
            >
              {LANE_LABEL[item]}
            </button>
          ))}
        </div>
      </div>

      <ul className="mt-12 grid gap-10 md:grid-cols-2">
        {visibleProjects.map((project) => (
          <li
            key={project.id}
            id={`project-${project.id}`}
            className={`group border border-[var(--line)] bg-[var(--panel)] transition-colors ${
              highlight === project.id ? 'border-[var(--lime)]' : ''
            }`}
          >
            {project.image ? (
              <div className="aspect-[16/10] overflow-hidden border-b border-[var(--line)]">
                <img
                  src={imageSrc(project.image)}
                  alt=""
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
                />
              </div>
            ) : null}
            <div className="p-5 sm:p-6">
              <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-[var(--mute)]">
                {isProjectLane(project.lane) ? LANE_LABEL[project.lane] : project.lane}
              </p>
              <h3 className="mt-2 font-display text-xl text-[var(--paper)]">
                {project.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-[var(--mute)]">
                {project.blurb}
              </p>
              <p className="mt-4 text-sm text-[var(--paper)]">{project.outcome}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="font-mono text-[10px] uppercase tracking-[0.12em] text-[var(--mute)]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <a
                href={project.href}
                target="_blank"
                rel="noreferrer"
                className="mt-5 inline-block font-mono text-[11px] uppercase tracking-[0.16em] text-[var(--lime)]"
              >
                GitHub
              </a>
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}
