export default function VisionMission() {
  return (
    <section className="sp-vm section">
      <div className="container sp-vm__grid">

        <div className="sp-vm__card animate-on-scroll">
          <div className="sp-vm__card-head">
            <span className="material-symbols-outlined sp-vm__ico">visibility</span>
            <h3>Our Vision</h3>
          </div>
          <p>
            To be the leading engineering force in renewable energy and smart
            infrastructure in the region, setting the benchmark for quality,
            reliability, and technological advancement.
          </p>
        </div>

        <div className="sp-vm__card animate-on-scroll stagger-2">
          <div className="sp-vm__card-head">
            <span className="material-symbols-outlined sp-vm__ico">flag</span>
            <h3>Our Mission</h3>
          </div>
          <p>
            To engineer and deliver superior energy solutions that provide
            exceptional long-term value, operating strictly under the highest
            technical standards while ensuring unwavering client support.
          </p>
        </div>

      </div>

      <style>{`
        .sp-vm {
          background: var(--surface-container-lowest);
          border-top: 1px solid var(--outline-variant);
          border-bottom: 1px solid var(--outline-variant);
        }

        .sp-vm__grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 40px;
        }
        @media (min-width: 768px) {
          .sp-vm__grid { grid-template-columns: 1fr 1fr; }
        }

        .sp-vm__card-head {
          display: flex; align-items: center; gap: 12px;
          margin-bottom: 16px;
        }

        .sp-vm__ico {
          font-size: 28px;
          color: var(--primary-container);
        }

        .sp-vm__card h3 {
          font-size: 22px; font-weight: 700;
          color: var(--on-surface);
        }

        .sp-vm__card p {
          font-size: 15px; line-height: 1.75;
          color: var(--on-surface-variant);
        }
      `}</style>
    </section>
  )
}
