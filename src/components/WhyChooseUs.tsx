const CARDS = [
  { icon: 'architecture',   title: 'Engineering Experience',   body: 'Deep technical expertise backed by Inter World for Engineering Contracting.' },
  { icon: 'design_services',title: 'Accurate System Design',   body: 'Meticulous planning for optimal performance and long-term reliability.' },
  { icon: 'verified',       title: 'Premium Equipment',        body: 'Sourcing only the highest tier-1 solar tech available in the market.' },
  { icon: 'engineering',    title: 'Professional Installation', body: 'Every system executed by certified and experienced engineering teams.' },
  { icon: 'support_agent',  title: 'Unwavering Support',       body: 'Long-term maintenance, monitoring, and rapid troubleshooting.' },
  { icon: 'payments',       title: 'Long-Term Value',          body: 'Maximizing ROI through durability, efficiency, and smart design.' },
]

export default function WhyChooseUs() {
  return (
    <section className="sp-why section">
      <div className="container">
        <div className="sp-why__header animate-on-scroll">
          <h2 className="sp-why__h2">Why Choose SUN POWER</h2>
          <p className="sp-why__quote">
            "We do not compete on price by cutting corners; we compete on the
            quality and longevity of our engineering solutions."
          </p>
        </div>

        <div className="sp-why__grid">
          {CARDS.map((card, i) => (
            <div key={card.title} className={`sp-why__card animate-on-scroll stagger-${(i % 4) + 1}`}>
              <span className="material-symbols-outlined sp-why__icon">{card.icon}</span>
              <h3>{card.title}</h3>
              <p>{card.body}</p>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .sp-why { background: var(--surface-container-low); }

        .sp-why__header { text-align: center; margin-bottom: 56px; }

        .sp-why__h2 {
          font-size: clamp(28px, 4vw, 40px);
          font-weight: 700; letter-spacing: -.01em;
          color: var(--on-surface); margin-bottom: 16px;
        }

        .sp-why__quote {
          font-size: 20px; font-weight: 600;
          color: var(--primary-container);
          font-style: italic;
          max-width: 700px; margin-inline: auto;
          line-height: 1.5;
        }

        .sp-why__grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
          gap: 20px;
        }

        .sp-why__card {
          background: var(--surface);
          border: 1px solid var(--outline-variant);
          border-radius: 12px;
          padding: 32px;
          box-shadow: 0 1px 4px rgba(0,0,0,.05);
          transition: transform .25s ease, box-shadow .25s ease;
        }
        .sp-why__card:hover {
          transform: translateY(-4px);
          box-shadow: 0 8px 32px rgba(0,0,0,.10);
        }

        .sp-why__icon {
          font-size: 36px;
          color: var(--primary-container);
          margin-bottom: 16px;
          display: block;
        }

        .sp-why__card h3 {
          font-size: 18px; font-weight: 600;
          color: var(--on-surface);
          margin-bottom: 8px;
        }

        .sp-why__card p {
          font-size: 14px;
          color: var(--on-surface-variant);
          line-height: 1.7;
        }
      `}</style>
    </section>
  )
}
