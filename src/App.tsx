import { useEffect } from 'react'

import Navbar             from './components/Navbar'
import Hero               from './components/Hero'
import About              from './components/About'
import WhyChooseUs        from './components/WhyChooseUs'
import EngineeringProcess from './components/EngineeringProcess'
import Services           from './components/Services'
import ProjectsScale      from './components/ProjectsScale'
import QualityValue       from './components/QualityValue'
import AfterSales         from './components/AfterSales'
import SmartSolutions     from './components/SmartSolutions'
import VisionMission      from './components/VisionMission'
import CTA                from './components/CTA'
import Footer             from './components/Footer'

export default function App() {
  /* Scroll entrance animations */
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>('.animate-on-scroll')

    if (!('IntersectionObserver' in window)) {
      els.forEach(el => el.classList.add('visible'))
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' },
    )

    els.forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <WhyChooseUs />
        <EngineeringProcess />
        <Services />
        <ProjectsScale />
        <QualityValue />
        <AfterSales />
        <SmartSolutions />
        <VisionMission />
        <CTA />
      </main>
      <Footer />
    </>
  )
}
