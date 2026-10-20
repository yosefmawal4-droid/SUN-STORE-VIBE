export default function AfterSales() {
  return (
    <section className="sp-after section">
      <div className="container sp-after__inner">
        <div className="sp-after__text animate-on-scroll">
          <h2 className="sp-after__h2">
            Our Work Does Not End<br />After Installation.
          </h2>
          <p className="sp-after__body">
            We believe that true engineering excellence is proven over time. Our
            dedicated after-sales support ensures your systems operate at peak
            efficiency for decades to come. We offer comprehensive maintenance
            contracts and rapid troubleshooting.
          </p>
        </div>
        <div className="sp-after__visual animate-on-scroll stagger-2">
          <span className="material-symbols-outlined sp-after__icon">handshake</span>
        </div>
      </div>

      <style>{`
        .sp-after { background: var(--surface-container-low); }

        .sp-after__inner {
          display: flex;
          flex-direction: column;
          gap: 48px;
          align-items: center;
        }
        @media (min-width: 768px) {
          .sp-after__inner { flex-direction: row; gap: 64px; }
        }

        .sp-after__text { flex: 1; }

        .sp-after__h2 {
          font-size: clamp(24px, 3.5vw, 40px);
          font-weight: 700; letter-spacing: -.01em;
          color: var(--on-surface); margin-bottom: 20px;
          line-height: 1.2;
        }

        .sp-after__body {
          font-size: 16px; line-height: 1.8;
          color: var(--on-surface-variant);
        }

        .sp-after__visual {
          flex: 1;
          max-width: 480px; width: 100%;
          aspect-ratio: 16/9;
          background: var(--surface-variant);
          border-radius: 12px;
          border: 1px solid rgba(142,113,100,.2);
          display: flex; align-items: center; justify-content: center;
          box-shadow: inset 0 2px 16px rgba(0,0,0,.06);
        }

        .sp-after__icon {
          font-size: 64px;
          color: var(--primary-container);
          font-variation-settings: 'FILL' 0, 'wght' 300, 'GRAD' 0, 'opsz' 48;
        }
      `}</style>
    </section>
  )
}
