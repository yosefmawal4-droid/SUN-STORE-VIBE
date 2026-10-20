const STEPS = [
  { num: '01', label: 'Study'      },
  { num: '02', label: 'Design'     },
  { num: '03', label: 'Execution'  },
  { num: '04', label: 'Monitoring' },
  { num: '05', label: 'Maintenance'},
  { num: '06', label: 'Support'    },
]

export default function EngineeringProcess() {
  return (
    <section className="sp-process section" id="process">
      <div className="container">
        <h2 className="sp-process__h2 animate-on-scroll">Our Engineering Process</h2>

        <div className="sp-process__track">
          {/* connector line */}
          <div className="sp-process__line" aria-hidden="true" />

          {STEPS.map((step, i) => (
            <div key={step.num} className={`sp-process__step animate-on-scroll stagger-${(i % 4) + 1}`}>
              <div className="sp-process__circle">{step.num}</div>
              <span className="sp-process__label">{step.label}</span>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .sp-process { background: var(--surface); }

        .sp-process__h2 {
          font-size: clamp(28px, 4vw, 40px);
          font-weight: 700; letter-spacing: -.01em;
          color: var(--on-surface);
          text-align: center;
          margin-bottom: 64px;
        }

        .sp-process__track {
          position: relative;
          display: flex;
          flex-direction: column;
          gap: 32px;
          align-items: flex-start;
        }
        @media (min-width: 768px) {
          .sp-process__track {
            flex-direction: row;
            justify-content: space-between;
            align-items: flex-start;
          }
        }

        /* horizontal connector */
        .sp-process__line {
          display: none;
        }
        @media (min-width: 768px) {
          .sp-process__line {
            display: block;
            position: absolute;
            top: 32px; left: 0; right: 0;
            height: 2px;
            background: var(--surface-container-high);
            z-index: 0;
          }
        }

        .sp-process__step {
          position: relative; z-index: 1;
          display: flex; flex-direction: row; align-items: center; gap: 16px;
          flex: 1;
        }
        @media (min-width: 768px) {
          .sp-process__step {
            flex-direction: column;
            align-items: center;
            text-align: center;
            gap: 0;
          }
        }

        .sp-process__circle {
          width: 64px; height: 64px;
          border-radius: 50%;
          background: var(--primary-container);
          color: var(--on-primary-container);
          display: flex; align-items: center; justify-content: center;
          font-size: 18px; font-weight: 700;
          flex-shrink: 0;
          box-shadow: 0 4px 16px rgba(255,107,0,.35);
          outline: 4px solid var(--surface);
          margin-bottom: 0;
        }
        @media (min-width: 768px) {
          .sp-process__circle { margin-bottom: 20px; }
        }

        .sp-process__label {
          font-size: 16px; font-weight: 600;
          color: var(--on-surface);
        }
      `}</style>
    </section>
  )
}
