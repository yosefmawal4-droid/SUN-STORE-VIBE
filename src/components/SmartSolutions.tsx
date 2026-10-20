const TAGS = [
  'Smart Home Integration',
  'Intelligent Energy Management',
  'Automated Monitoring',
  'High-Efficiency Inverters',
]

export default function SmartSolutions() {
  return (
    <section className="sp-smart section bg-grid">
      <div className="container sp-smart__inner animate-on-scroll">
        <h2 className="sp-smart__h2">Smart and Advanced Solutions</h2>
        <div className="sp-smart__tags">
          {TAGS.map(tag => (
            <span key={tag} className="sp-smart__tag">{tag}</span>
          ))}
        </div>
      </div>

      <style>{`
        .sp-smart { background: var(--surface); }
        .sp-smart__inner { text-align: center; }

        .sp-smart__h2 {
          font-size: clamp(24px, 3.5vw, 40px);
          font-weight: 700; letter-spacing: -.01em;
          color: var(--on-surface);
          margin-bottom: 40px;
        }

        .sp-smart__tags {
          display: flex; flex-wrap: wrap;
          justify-content: center; gap: 12px;
        }

        .sp-smart__tag {
          padding: 10px 24px;
          background: var(--surface-container-high);
          border: 1px solid var(--outline-variant);
          border-radius: 999px;
          font-size: 11px; font-weight: 600;
          letter-spacing: .08em; text-transform: uppercase;
          color: var(--on-surface);
          box-shadow: 0 1px 3px rgba(0,0,0,.06);
          transition: background .2s, border-color .2s, transform .2s;
        }
        .sp-smart__tag:hover {
          background: rgba(255,107,0,.08);
          border-color: var(--primary-container);
          transform: translateY(-2px);
        }
      `}</style>
    </section>
  )
}
