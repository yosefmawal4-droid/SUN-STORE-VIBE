import SectionHeader from './SectionHeader'

const GOALS = [
  { icon: '⚡', text: 'Provide reliable and efficient energy solutions' },
  { icon: '💵', text: 'Reduce energy costs for our clients' },
  { icon: '🔥', text: 'Improve energy efficiency across all projects' },
  { icon: '🤝', text: 'Build long-term relationships with our clients' },
  { icon: '💻', text: 'Use modern technology to continuously improve our services' },
]

export default function Goals() {
  return (
    <section className="goals section" id="goals" aria-labelledby="goals-heading">
      <div className="container">
        <SectionHeader
          eyebrow="Our Goals"
          headingId="goals-heading"
          heading="What We Strive For"
        />

        <ul className="goals-list" role="list">
          {GOALS.map((goal, i) => (
            <li
              key={i}
              className={`goals-item animate-on-scroll stagger-${(i % 4) + 1}`}
            >
              <span className="goals-item__icon" aria-hidden="true">
                {goal.icon}
              </span>
              <span>{goal.text}</span>
            </li>
          ))}
        </ul>
      </div>

      <style>{`
        .goals { background: var(--clr-white); }

        .goals-list {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(290px, 1fr));
          gap: 1rem;
        }

        .goals-item {
          display: flex;
          align-items: center;
          gap: 1.1rem;
          background: var(--clr-white);
          border: 1px solid var(--clr-border);
          border-radius: var(--r-md);
          padding: 1.3rem 1.6rem;
          font-size: .97rem;
          font-weight: 500;
          color: var(--clr-text);
          box-shadow: var(--sh-xs);
          transition: transform .28s ease, box-shadow .28s ease,
                      border-color .28s ease, background .28s ease;
        }

        .goals-item:hover {
          transform: translateX(6px);
          box-shadow: var(--sh-md);
          border-color: rgba(245,158,11,.3);
          background: var(--amber-50);
        }

        .goals-item__icon {
          font-size: 1.4rem;
          width: 2.25rem; height: 2.25rem;
          min-width: 2.25rem;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, var(--amber-50), var(--amber-100));
          border: 1px solid rgba(245,158,11,.2);
          border-radius: var(--r-sm);
          flex-shrink: 0;
          transition: box-shadow .28s ease, transform .28s ease;
        }

        .goals-item:hover .goals-item__icon {
          box-shadow: var(--sh-amber-sm);
          transform: scale(1.08);
        }
      `}</style>
    </section>
  )
}
