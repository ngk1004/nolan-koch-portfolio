import { useCallback, useState } from 'react'
import SiteNav from './components/SiteNav'
import Hero from './components/Hero'
import Research from './components/Research'
import Experience from './components/Experience'
import Work from './components/Work'
import StackSection from './components/Stack'
import Contact from './components/Contact'
import ResumeSheet from './components/ResumeSheet'

export default function App() {
  const [resumeOpen, setResumeOpen] = useState(false)
  const openResume = useCallback(() => setResumeOpen(true), [])
  const closeResume = useCallback(() => setResumeOpen(false), [])

  return (
    <div className="min-h-screen bg-[var(--ink)] text-[var(--paper)]">
      <SiteNav />
      <main>
        <Hero onOpenResume={openResume} />
        <Research />
        <Experience onOpenResume={openResume} />
        <Work />
        <StackSection />
        <Contact onOpenResume={openResume} />
      </main>
      <ResumeSheet open={resumeOpen} onClose={closeResume} />
    </div>
  )
}
