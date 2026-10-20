import type { MouseEvent } from 'react'

const scrollTo = (href: string) => (e: MouseEvent) => {
  e.preventDefault()
  document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
}

const FOOTER_LINKS = [
  { label: 'Privacy Policy',        href: '#' },
  { label: 'Terms of Service',      href: '#' },
  { label: 'Engineering Standards', href: '#' },
  { label: 'Contact',               href: '#contact' },
]

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="sp-footer">
      <div className="container sp-footer__inner">
        <div className="sp-footer__brand">
          <a href="#home" className="sp-footer__logo" onClick={scrollTo('#home')}>
            <span className="material-symbols-outlined icon-fill" style={{ fontSize: 28, color: 'var(--primary-container)', filter: 'drop-shadow(0 0 6px rgba(255,107,0,.5))' }}>wb_sunny</span>
            <span>SUN <strong>POWER</strong></span>
          </a>
          <p className="sp-footer__copy">
            © {year} SUN POWER Solar Engineering.
            In partnership with Inter World for Engineering Contracting.
          </p>
        </div>

        <div className="sp-footer__links">
          {FOOTER_LINKS.map(l => (
            <a key={l.label} href={l.href} onClick={l.href !== '#' ? scrollTo(l.href) : undefined}>
              {l.label}
            </a>
          ))}
        </div>
      </div>

      <style>{`
        .sp-footer {
          background: var(--inverse-surface);
          border-top: 1px solid rgba(255,255,255,.06);
          padding-block: 64px;
        }

        .sp-footer__inner {
          display: grid;
          grid-template-columns: 1fr;
          gap: 32px;
          align-items: center;
        }
        @media (min-width: 768px) {
          .sp-footer__inner {
            grid-template-columns: 1fr 1fr;
          }
        }

        .sp-footer__logo {
          display: inline-flex; align-items: center; gap: 10px;
          font-size: 16px; font-weight: 700; letter-spacing: -.01em;
          color: #fff;
          margin-bottom: 12px;
        }
        .sp-footer__logo strong { color: var(--primary-container); }

        .sp-footer__copy {
          font-size: 12px; font-weight: 600;
          letter-spacing: .04em;
          color: var(--tertiary-fixed-dim);
          line-height: 1.6;
        }

        .sp-footer__links {
          display: flex; flex-wrap: wrap; gap: 20px;
        }
        @media (min-width: 768px) {
          .sp-footer__links { justify-content: flex-end; }
        }

        .sp-footer__links a {
          font-size: 12px; font-weight: 600;
          letter-spacing: .04em; text-transform: uppercase;
          color: var(--tertiary-fixed-dim);
          transition: color .2s;
        }
        .sp-footer__links a:hover { color: #fff; }
      `}</style>
    </footer>
  )
}
