export type ProjectId = string
export type ProjectLane = 'agents' | 'data' | 'systems' | 'ml' | 'security' | 'web'

export const PROJECT_LANES = [
  'agents',
  'data',
  'systems',
  'ml',
  'security',
  'web',
] as const satisfies readonly ProjectLane[]

export type ProjectVisual =
  | { kind: 'image'; src: string; alt: string }
  | { kind: 'metric'; value: string; label: string }

export type Project = {
  id: ProjectId
  title: string
  blurb: string
  outcome: string
  lane: ProjectLane
  tags: string[]
  href: string
  visual: ProjectVisual
}

export type Research = {
  title: string
  venue: string
  blurb: string
  href?: string
}

export type Experience = {
  id: string
  org: string
  role: string
  dates: string
  location?: string
  highlights: readonly string[]
  href?: string
}

export type Education = {
  school: string
  degree: string
  dates: string
  detail?: string
}

export type SiteContent = {
  name: string
  role: string
  headline: string
  subtext: string
  location: string
  email: string
  github: string
  resume: string
  research: Research
  experience: readonly Experience[]
  education: Education
  leadership: readonly Experience[]
  projects: Project[]
  stack: { group: string; items: string[] }[]
}

export function imageSrc(file: string): string {
  return `${import.meta.env.BASE_URL}images/${file}`
}

export function resumeSrc(): string {
  return `${import.meta.env.BASE_URL}Nolan-Koch-Resume.pdf`
}

export const site = {
  name: 'Nolan Koch',
  role: 'Cybersecurity & software developer',
  headline: 'Research that ships.',
  subtext:
    'Pittsburgh-based cybersecurity student shipping full-stack products, GPU systems, and secure automation.',
  location: 'Pittsburgh, PA · Open to remote',
  email: 'kochnolan376@gmail.com',
  github: 'https://github.com/ngk1004',
  resume: 'Nolan-Koch-Resume.pdf',
  research: {
    title:
      'Truth-Maintained Memory Agent: Proactive Quality Control for Reliable Long-Context Dialogue',
    venue: 'NeurIPS 2025 · ResponsibleFM',
    blurb:
      'TMMA gates writes, scores complexity, and verifies claims across a four-tier memory so long-context LLMs keep less false memory.',
    href: 'https://openreview.net/forum?id=n2oOEU1rf9',
  },
  experience: [
    {
      id: 'qintel',
      org: 'Qintel',
      role: 'Full-Stack Software Engineering Intern',
      dates: 'May 2026 – Present',
      highlights: [
        'Built React + Node visualizations used by 100,000+ cyber intelligence users.',
        'Shipped a query scope guard that cancels oversized searches and asks users to refine.',
        'Owned full-stack features end to end across enterprise SDLC and UI polish.',
      ],
    },
    {
      id: 'broma',
      org: 'Broma',
      role: 'Full-Stack Engineer',
      dates: 'Oct 2025 – May 2026',
      highlights: [
        'Architected a multi-tenant React + Supabase B2B portal for vendor CRM and campaign analytics.',
        'Built Gemini + vector semantic search so diners find places in plain language.',
        'Hardened AI edge functions with Zod validation and rate limits against injection and DoS.',
        'Shipped the iOS diner app to the App Store.',
      ],
    },
    {
      id: 'westinghouse',
      org: 'Westinghouse Electric Company',
      role: 'Linux Systems Administrator Intern',
      dates: 'May 2025 – May 2026',
      highlights: [
        'Automated Python/Bash CVE patching across 50+ RHEL nodes and cut zero-day exposure ~30%.',
        'Audited configs against NIST 800-53 with security teams for audit readiness.',
        'Tuned SIEM log aggregation for incident response and threat hunting.',
      ],
    },
  ],
  education: {
    school: 'Slippery Rock University',
    degree: 'B.S. Cybersecurity (Secure Software Development)',
    dates: 'Expected Dec 2026',
    detail: 'Coursework in DSA, networking, software assurance, and software engineering.',
  },
  leadership: [
    {
      id: 'trusted-ci',
      org: 'Trusted CI Scholars Program',
      role: 'NSF Cybersecurity Scholar',
      dates: 'May 2026 – Nov 2026',
      highlights: [
        'Selected for a competitive NSF cybersecurity fellowship.',
        'Representing the cohort at the NSF Cybersecurity Summit in Irvine, CA.',
      ],
      href: 'https://www.trustedci.org/',
    },
    {
      id: 'sru-cyber',
      org: 'SRU Cybersecurity Club',
      role: 'Vice President',
      dates: 'Ongoing',
      highlights: [
        'Lead CTF teams across web exploitation, reverse engineering, and cryptography.',
        'Design and teach bi-weekly workshops on OWASP Top 10 and ethical hacking.',
      ],
    },
  ],
  projects: [
    {
      id: 'cuda',
      title: 'CUDA matrix multiply',
      blurb:
        'Shared-memory tiled CUDA kernels for matrix multiply, with CPU and GPU baselines plus Nsight Compute profiles.',
      outcome: '18× faster than NumPy on the tiled kernel',
      lane: 'systems',
      tags: ['CUDA', 'C++', 'GPU'],
      href: 'https://github.com/ngk1004/CUDA-Parallel-Matrix-Multiplication',
      visual: { kind: 'metric', value: '18×', label: 'vs NumPy tiled kernel' },
    },
    {
      id: 'support-agent',
      title: 'Autonomous support agent',
      blurb:
        'RAG agent with vector memory so replies stay tied to prior turns instead of a single prompt dump.',
      outcome: 'Persistent recall across multi-turn support threads',
      lane: 'agents',
      tags: ['RAG', 'LLM', 'vector memory'],
      href: 'https://github.com/ngk1004/Autonomous-support-agent-with-vector-memory',
      visual: { kind: 'metric', value: 'RAG', label: 'persistent multi-turn recall' },
    },
    {
      id: 'devsecops',
      title: 'DevSecOps auto triage',
      blurb:
        'CI pipeline that scans, triages, and blocks risky findings before they merge.',
      outcome: 'Security checks on every commit in the workflow',
      lane: 'security',
      tags: ['DevSecOps', 'CI', 'triage'],
      href: 'https://github.com/ngk1004/DevSec-Ops-Auto-Triage-Pipeline-',
      visual: {
        kind: 'image',
        src: 'waf-screenshot1.png',
        alt: 'DevSecOps WAF triage demo UI with blocked findings',
      },
    },
    {
      id: 'etl',
      title: 'Nightly ETL pipeline',
      blurb:
        'Scheduled sync from legacy MySQL or CRM into HubSpot with validation and error handling.',
      outcome: '50,000 customer records synced each night',
      lane: 'data',
      tags: ['ETL', 'MySQL', 'HubSpot'],
      href: 'https://github.com/ngk1004/ETL-Pipeline',
      visual: { kind: 'metric', value: '50k', label: 'records synced nightly' },
    },
    {
      id: 'temporal-router',
      title: 'Zero-Touch Temporal router',
      blurb:
        'Temporal workflows persist Stripe and Shopify orders, then retry warehouse calls when the API is down.',
      outcome: 'Orders queue and ship after warehouse outages',
      lane: 'systems',
      tags: ['Temporal', 'TypeScript', 'Postgres'],
      href: 'https://github.com/ngk1004/Zero-Touch-Employee-Provisioning',
      visual: { kind: 'metric', value: '0 loss', label: 'orders survive outages' },
    },
    {
      id: 'yolo-cv',
      title: 'YOLO car detection',
      blurb:
        'YOLOv8n pipeline for cars and common objects in stills and video, with a Flask upload UI.',
      outcome: 'Real-time detection on a lightweight nano model',
      lane: 'ml',
      tags: ['YOLOv8', 'OpenCV', 'Flask'],
      href: 'https://github.com/ngk1004/Computer-Vision-Object-Detection',
      visual: {
        kind: 'image',
        src: 'car-detection.png',
        alt: 'YOLO bounding boxes on cars in a street photo',
      },
    },
    {
      id: 'inventory',
      title: 'Inventory forecasting',
      blurb:
        'LSTM and Prophet demand models on retail sales history, trained for stock planning.',
      outcome: 'Forecasts from raw sales history to SKU-level demand',
      lane: 'ml',
      tags: ['LSTM', 'Prophet', 'Python'],
      href: 'https://github.com/ngk1004/Inventory-Demand-Forecasting',
      visual: { kind: 'metric', value: 'LSTM', label: 'Prophet + sales history' },
    },
  ],
  stack: [
    {
      group: 'Languages',
      items: ['TypeScript', 'Python', 'C++', 'Java', 'SQL', 'Bash'],
    },
    {
      group: 'AI / ML',
      items: ['PyTorch', 'LangChain', 'YOLOv8', 'RAG', 'CUDA'],
    },
    {
      group: 'Platform',
      items: ['React', 'Node.js', 'Supabase', 'Docker', 'Temporal', 'AWS/GCP'],
    },
    {
      group: 'Security',
      items: ['NIST 800-53', 'Burp Suite', 'SIEM', 'RBAC/IAM', 'CI/CD'],
    },
  ],
} as const satisfies SiteContent

export type ProjectFilter = 'all' | ProjectLane

export function parseProjectId(raw: string | null): ProjectId | null {
  if (raw === null || raw === '') return null
  return site.projects.some((project) => project.id === raw) ? raw : null
}

export function projectsForLane(
  projects: readonly Project[],
  lane: ProjectFilter,
): readonly Project[] {
  if (lane === 'all') return projects
  return projects.filter((project) => project.lane === lane)
}

export function isProjectLane(value: string): value is ProjectLane {
  return (PROJECT_LANES as readonly string[]).includes(value)
}
