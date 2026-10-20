import { useCallback, useRef, useState } from 'react'
import { useInView } from '../hooks/useScrollAnimation'
import SectionHeader from './SectionHeader'

interface StatProps {
  target: number
  suffix?: string
  label: string
}

function AnimatedStat({ target, suffix = '', label }: StatProps) {
  const [value, setValue] = useState(0)
  const animated = useRef(false)

  const animate = useCallback(() => {
    if (animated.current) return
    animated.current = true
    const duration = target > 1000 ? 1800 : 900
    const start = performance.now()
    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setValue(Math.round(eased * target))
      if (progress < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, [target])

  const ref = useInView(animate)

  return (
    <div className="stat" ref={ref}>
      <div className="stat__num">
        <span>{value.toLocaleString()}</span>
        {suffix && <span className="stat__suffix">{suffix}</span>}
      </div>
      <p className="stat__label">{label}</p>
    </div>
  )
}

export default function CompanyBackground() {
  return (
    <section className="bg-section section" aria-labelledby="bg-heading">
      <div className="container bg-inner">

        <div className="bg-text animate-on-scroll">
          <SectionHeader
            eyebrow="Company Background"
            headingId="bg-heading"
            heading="Over 20 Years of Industry Experience"
            align="left"
            noRule
          />
          <p>
            Established in 2020 as part of{' '}
            <strong>Across the World Contracting Company</strong>, Sun Power
            draws on engineering experience dating back to 2004. This deep
            foundation gives us the knowledge and confidence to deliver
            renewable energy projects of any scale.
          </p>
          <a
            href="#contact"
            className="btn btn-primary bg-cta"
            onClick={(e) => {
              e.preventDefault()
              document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })
            }}
          >
            Work With Us
          </a>
        </div>

        <div className="bg-stats animate-on-scroll stagger-2">
          <AnimatedStat target={20}   suffix="+" label="Years of Experience" />
          <AnimatedStat target={2020}       label="Founded"                  />
          <AnimatedStat target={4}    suffix="+" label="Core Services"       />
        </div>
      </div>

      <style>{`
        .bg-section {
          background:
            radial-gradient(ellipse 55% 60% at 95% 50%, rgba(245,158,11,.06) 0%, transparent 65%),
            var(--navy-50);
          position: relative;
        }
        .bg-section::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 4px;
          background: linear-gradient(90deg, var(--amber-500), var(--amber-300), transparent);
        }

        .bg-inner {
          display: grid;
          grid-template-columns: 1.1fr .9fr;
          gap: 5rem;
          align-items: center;
        }

        .bg-text p {
          color: var(--clr-text-muted);
          font-size: 1rem;
          line-height: 1.85;
          max-width: 480px;
          margin-bottom: 0;
        }
        .bg-text strong { color: var(--navy-700); }

        .bg-cta { margin-top: 2rem; }

        /* Stats grid */
        .bg-stats {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.1rem;
        }

        .stat {
          text-align: center;
          background: var(--clr-white);
          border: 1px solid var(--clr-border);
          border-radius: var(--r-lg);
          padding: 2rem 1rem 1.75rem;
          box-shadow: var(--sh-sm);
          position: relative;
          overflow: hidden;
          transition: transform .28s ease, box-shadow .28s ease, border-color .28s ease;
        }
        .stat::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 3px;
          background: linear-gradient(90deg, var(--amber-500), var(--amber-300));
        }
        .stat:hover {
          transform: translateY(-4px);
          box-shadow: var(--sh-md), var(--sh-amber-sm);
          border-color: rgba(245,158,11,.2);
        }

        .stat__num {
          font-family: var(--font-head);
          font-size: 2.75rem;
          font-weight: 800;
          color: var(--amber-500);
          line-height: 1;
          letter-spacing: -.03em;
          margin-bottom: .5rem;
        }
        .stat__suffix {
          font-size: 1.75rem;
          font-weight: 800;
          color: var(--amber-500);
        }
        .stat__label {
          font-size: .75rem;
          color: var(--clr-text-muted);
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: .1em;
        }

        /* Responsive */
        @media (max-width: 900px) {
          .bg-inner { grid-template-columns: 1fr; gap: 3rem; }
          .bg-text p { max-width: 100%; }
        }
        @media (max-width: 480px) {
          .bg-stats { grid-template-columns: 1fr 1fr; }
          .bg-stats .stat:last-child { grid-column: 1 / -1; }
        }
      `}</style>
    </section>
  )
}
