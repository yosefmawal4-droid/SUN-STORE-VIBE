import type { MouseEvent } from 'react'

const scrollTo = (href: string) => (e: MouseEvent) => {
  e.preventDefault()
  document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
}

export default function CTA() {
  return (
    <section className="sp-cta section" id="contact">
      <div className="sp-cta__inner animate-on-scroll">
        <h2 className="sp-cta__h2">
          Your Energy.<br />
          Engineered Right.
        </h2>
        <a href="#contact" className="btn btn-white sp-cta__btn" onClick={scrollTo('#contact')}>
          Start Your Project
          <span className="material-symbols-outlined" style={{ fontSize: 18 }}>arrow_forward</span>
        </a>
      </div>

      <style>{`
        .sp-cta {
          background: var(--primary-container);
          color: var(--on-primary-container);
          text-align: center;
          position: relative;
          overflow: hidden;
        }

        /* decorative rings */
        .sp-cta::before, .sp-cta::after {
          content: '';
          position: absolute;
          border-radius: 50%;
          border: 1px solid rgba(87,32,0,.15);
          pointer-events: none;
        }
        .sp-cta::before {
          width: 600px; height: 600px;
          top: 50%; left: 50%;
          transform: translate(-50%, -50%);
        }
        .sp-cta::after {
          width: 900px; height: 900px;
          top: 50%; left: 50%;
          transform: translate(-50%, -50%);
        }

        .sp-cta__inner {
          position: relative; z-index: 1;
          max-width: 680px; margin-inline: auto;
          padding-inline: 20px;
        }

        .sp-cta__h2 {
          font-size: clamp(36px, 6vw, 64px);
          font-weight: 900; letter-spacing: -.025em;
          color: var(--on-primary);
          margin-bottom: 40px;
          line-height: 1.05;
        }

        .sp-cta__btn {
          padding: 18px 40px;
          font-size: 13px;
          box-shadow: 0 4px 24px rgba(0,0,0,.15);
        }
      `}</style>
    </section>
  )
}
