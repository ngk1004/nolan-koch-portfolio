import SiteNav from './components/SiteNav'
import Hero from './components/Hero'
import Research from './components/Research'
import Work from './components/Work'
import StackSection from './components/Stack'
import Contact from './components/Contact'

export default function App() {
  return (
    <div className="min-h-screen bg-[var(--ink)] text-[var(--paper)]">
      <SiteNav />
      <main>
        <Hero />
        <Research />
        <Work />
        <StackSection />
        <Contact />
      </main>
    </div>
  )
}
