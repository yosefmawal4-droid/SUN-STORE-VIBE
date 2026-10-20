import type { MouseEvent } from 'react'

const scrollTo = (href: string) => (e: MouseEvent) => {
  e.preventDefault()
  document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
}

export default function Hero() {
  return (
    <header className="sp-hero" id="home">
      {/* Dark overlay + solar bg */}
      <div className="sp-hero__bg" aria-hidden="true" />

      <div className="container sp-hero__body">
        <div className="sp-hero__content">
          {/* Eyebrow */}
          <div className="sp-hero__badge">
            <span className="material-symbols-outlined" style={{ fontSize: 14, color: 'var(--primary-container)' }}>
              precision_manufacturing
            </span>
            <span>Founded 2021 &nbsp;|&nbsp; Al-Suwayda &amp; Damascus</span>
          </div>

          {/* Headline */}
          <h1 className="sp-hero__h1">
            Engineering <span className="sp-hero__accent">Smarter</span>
            <br />Energy Solutions.
          </h1>

          {/* Sub */}
          <p className="sp-hero__sub">
            From meticulous study and precision design to expert installation,
            diligent maintenance, and unwavering long-term support. Operating
            under the rigorous standards of Inter World for Engineering Contracting.
          </p>

          {/* CTAs */}
          <div className="sp-hero__actions">
            <a href="#services" className="btn btn-primary" onClick={scrollTo('#services')}>
              Explore Our Services
            </a>
            <a href="#contact" className="btn btn-outline" onClick={scrollTo('#contact')}>
              Start Your Project
              <span className="material-symbols-outlined" style={{ fontSize: 18 }}>arrow_forward</span>
            </a>
          </div>
        </div>
      </div>

      <style>{`
        .sp-hero {
          position: relative;
          min-height: 100vh;
          display: flex;
          align-items: center;
          padding-top: var(--nav-h);
          overflow: hidden;
        }

        .sp-hero__bg {
          position: absolute; inset: 0; z-index: 0;
          background-color: var(--inverse-surface);
          background-image: url('https://lh3.googleusercontent.com/aida/AEtjO1X9xNcLUBH2K_NkGKRTHlEvyAVCNpOnJjhAV_SIiOdiSIeuOJ4aGKFVNrqNjCx4qS8Be51HwqqbF9VpruwGiQuRd3ig8RY1W-z8MSzxJqE1F9-Z5iSzQSgu81oue1v-3Hk62p-rik_fUOUKXmao-orUXT36nYv1c4TzpPJKfQcLWe4SV91q3BCCMQLuzdTKNvyL3bMFAOn5ToknsKxs8k5xswxNCb_SiGn2DuaPbFJw7hu8v75vySkARZU');
          background-size: cover;
          background-position: center;
          opacity: .42;
        }

        .sp-hero__body {
          position: relative; z-index: 1;
          display: grid;
          grid-template-columns: 1fr;
          padding-block: 80px 60px;
        }
        @media (min-width: 768px) {
          .sp-hero__body { grid-template-columns: 8fr 4fr; }
        }

        .sp-hero__content { color: #fff; }

        /* Badge */
        .sp-hero__badge {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 8px 16px;
          border: 1px solid rgba(142,113,100,.3);
          background: rgba(251,249,248,.08);
          backdrop-filter: blur(8px);
          border-radius: 999px;
          font-size: 11px; font-weight: 600; letter-spacing: .12em; text-transform: uppercase;
          color: var(--primary-fixed);
          margin-bottom: 28px;
        }

        /* Headline */
        .sp-hero__h1 {
          font-size: clamp(40px, 7vw, 72px);
          font-weight: 900;
          line-height: 1.08;
          letter-spacing: -.025em;
          color: var(--on-primary);
          margin-bottom: 28px;
        }
        .sp-hero__accent { color: var(--primary-container); }

        /* Sub */
        .sp-hero__sub {
          font-size: 18px;
          line-height: 1.7;
          color: var(--tertiary-fixed);
          max-width: 580px;
          margin-bottom: 40px;
          border-left: 2px solid var(--primary-container);
          padding-left: 24px;
        }

        /* Actions */
        .sp-hero__actions {
          display: flex; flex-wrap: wrap; gap: 16px;
        }

        @media (max-width: 480px) {
          .sp-hero__actions { flex-direction: column; }
          .sp-hero__actions .btn { width: 100%; justify-content: center; }
        }
      `}</style>
    </header>
  )
}
