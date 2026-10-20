export default function ProjectsScale() {
  return (
    <section className="sp-scale section" id="projects">
      <div className="container sp-scale__inner animate-on-scroll">
        <h2 className="sp-scale__h2">Built for Projects of Every Scale.</h2>
        <p className="sp-scale__sub">
          With experience executing over 300+ solar panel projects, our engineering
          teams are equipped to handle installations of any magnitude, from residential
          setups to massive commercial grids.
        </p>
        <div className="sp-scale__badge">
          <span className="sp-scale__num">300+</span>
          <span className="sp-scale__tag">Successful Installations</span>
        </div>
      </div>

      <style>{`
        .sp-scale {
          background: var(--inverse-surface);
          color: var(--inverse-on-surface);
          text-align: center;
          position: relative;
          overflow: hidden;
        }

        .sp-scale::before {
          content: '';
          position: absolute; inset: 0;
          background: radial-gradient(ellipse 70% 70% at 50% 0%, rgba(255,107,0,.08) 0%, transparent 65%);
          pointer-events: none;
        }

        .sp-scale__inner {
          position: relative; z-index: 1;
          max-width: 720px; margin-inline: auto;
        }

        .sp-scale__h2 {
          font-size: clamp(28px, 5vw, 52px);
          font-weight: 900; letter-spacing: -.025em;
          color: var(--on-primary);
          margin-bottom: 20px;
          line-height: 1.1;
        }

        .sp-scale__sub {
          font-size: 18px; line-height: 1.7;
          color: var(--tertiary-fixed);
          max-width: 600px; margin-inline: auto;
          margin-bottom: 48px;
        }

        .sp-scale__badge {
          display: inline-flex;
          align-items: center;
          gap: 16px;
          border: 1px solid rgba(142,113,100,.3);
          padding: 16px 32px;
          border-radius: 999px;
          background: rgba(251,249,248,.08);
          backdrop-filter: blur(8px);
        }

        .sp-scale__num {
          font-size: 40px; font-weight: 900;
          color: var(--primary-container);
          line-height: 1;
        }

        .sp-scale__tag {
          font-size: 11px; font-weight: 600;
          letter-spacing: .12em; text-transform: uppercase;
          color: var(--inverse-on-surface);
        }
      `}</style>
    </section>
  )
}
