export default function About() {
  return (
    <section className="sp-about section bg-grid" id="about">
      <div className="container sp-about__inner">

        <div className="sp-about__text animate-on-scroll">
          <h2 className="sp-about__h2">
            Engineering Experience.<br />
            Energy Solutions.<br />
            Long-Term Support.
          </h2>
          <p className="sp-about__highlight">
            One of the first companies working in solar energy solutions in Al-Suwayda.
          </p>
          <p className="sp-about__body">
            SUN POWER focuses on engineering precision and long-term sustainability.
            We do not just install solar panels; we engineer comprehensive energy
            solutions tailored to our clients' exact needs. Our affiliation with
            Inter World for Engineering Contracting ensures that our projects meet
            the highest international engineering standards.
          </p>
        </div>

        <div className="sp-about__visual animate-on-scroll stagger-2">
          <span className="material-symbols-outlined sp-about__icon icon-fill">solar_power</span>
        </div>
      </div>

      <style>{`
        .sp-about { background: var(--surface); }

        .sp-about__inner {
          display: grid;
          grid-template-columns: 1fr;
          gap: 48px;
          align-items: center;
        }
        @media (min-width: 768px) {
          .sp-about__inner { grid-template-columns: 1fr 1fr; }
        }

        .sp-about__h2 {
          font-size: clamp(28px, 4vw, 40px);
          font-weight: 700;
          line-height: 1.2;
          letter-spacing: -.01em;
          color: var(--on-surface);
          margin-bottom: 20px;
        }

        .sp-about__highlight {
          font-size: 18px;
          font-weight: 700;
          line-height: 1.5;
          color: var(--primary-container);
          border-left: 4px solid var(--primary-container);
          padding-left: 16px;
          margin-bottom: 20px;
        }

        .sp-about__body {
          font-size: 16px;
          line-height: 1.75;
          color: var(--on-surface-variant);
        }

        .sp-about__visual {
          height: 380px;
          border-radius: 12px;
          overflow: hidden;
          background: var(--surface-variant);
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1px solid var(--outline-variant);
          box-shadow: 0 4px 24px rgba(0,0,0,.06);
        }

        .sp-about__icon {
          font-size: 120px;
          color: rgba(160,65,0,.15);
        }
      `}</style>
    </section>
  )
}
