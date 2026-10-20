export default function QualityValue() {
  return (
    <section className="sp-quality section">
      <div className="container sp-quality__inner animate-on-scroll">
        <h2 className="sp-quality__h2">Quality and Long-Term Value</h2>
        <div className="sp-quality__card">
          <p className="sp-quality__quote">
            "We save our clients money through accurate engineering and optimized
            design, not by reducing equipment quality or cutting corners."
          </p>
        </div>
      </div>

      <style>{`
        .sp-quality { background: var(--surface); }

        .sp-quality__inner { text-align: center; }

        .sp-quality__h2 {
          font-size: clamp(24px, 3.5vw, 40px);
          font-weight: 700; letter-spacing: -.01em;
          color: var(--on-surface);
          margin-bottom: 32px;
        }

        .sp-quality__card {
          max-width: 720px; margin-inline: auto;
          background: var(--surface-container);
          border-left: 4px solid var(--primary-container);
          border-radius: 12px;
          padding: 32px 36px;
        }

        .sp-quality__quote {
          font-size: 20px; font-weight: 600;
          color: var(--on-surface-variant);
          font-style: italic;
          line-height: 1.6;
        }
      `}</style>
    </section>
  )
}
