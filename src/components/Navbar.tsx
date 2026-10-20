import { useState, useEffect, useCallback } from 'react'

const NAV_LINKS = [
  { label: 'About',    href: '#about'    },
  { label: 'Process',  href: '#process'  },
  { label: 'Services', href: '#services' },
  { label: 'Projects', href: '#projects' },
]

const SIDEBAR_LINKS = [
  { icon: 'solar_power',      label: 'Solar Energy Systems',   active: true },
  { icon: 'home',             label: 'Residential Solutions',  active: false },
  { icon: 'business_center',  label: 'Commercial Solutions',   active: false },
  { icon: 'factory',          label: 'Industrial Power',       active: false },
  { icon: 'water_drop',       label: 'Agricultural Pumping',   active: false },
]

export default function Navbar() {
  const [scrolled,     setScrolled]     = useState(false)
  const [sidebarOpen,  setSidebarOpen]  = useState(false)
  const [mobileOpen,   setMobileOpen]   = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const closeSidebar = useCallback(() => setSidebarOpen(false), [])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') { closeSidebar(); setMobileOpen(false) } }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [closeSidebar])

  useEffect(() => {
    document.body.style.overflow = (sidebarOpen || mobileOpen) ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [sidebarOpen, mobileOpen])

  const scrollTo = (href: string) => (e: React.MouseEvent) => {
    e.preventDefault()
    closeSidebar()
    setMobileOpen(false)
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      {/* ── Top Nav ── */}
      <nav className={`sp-nav${scrolled ? ' sp-nav--scrolled' : ''}`} id="main-nav">
        <div className="container sp-nav__inner">

          {/* Left: hamburger + logo */}
          <div className="sp-nav__left">
            <button
              className="sp-nav__ham"
              aria-label="Toggle sidebar"
              aria-expanded={sidebarOpen}
              onClick={() => setSidebarOpen(o => !o)}
            >
              <span className="material-symbols-outlined">menu</span>
            </button>
            <a href="#home" className="sp-logo" onClick={scrollTo('#home')} aria-label="Sun Power Home">
              <span className="sp-logo__sun material-symbols-outlined icon-fill">wb_sunny</span>
              <span className="sp-logo__text">SUN <strong>POWER</strong></span>
            </a>
          </div>

          {/* Center: desktop links */}
          <ul className="sp-nav__links" role="list">
            {NAV_LINKS.map(l => (
              <li key={l.href}>
                <a href={l.href} onClick={scrollTo(l.href)}>{l.label}</a>
              </li>
            ))}
          </ul>

          {/* Right: CTA + mobile ham */}
          <div className="sp-nav__right">
            <a href="#contact" className="btn btn-primary sp-nav__cta" onClick={scrollTo('#contact')}>
              Start Your Project
              <span className="material-symbols-outlined" style={{ fontSize: 16 }}>arrow_forward</span>
            </a>
            <button
              className="sp-nav__mobile-ham"
              aria-label="Toggle mobile menu"
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen(o => !o)}
            >
              <span className="material-symbols-outlined">{mobileOpen ? 'close' : 'menu'}</span>
            </button>
          </div>
        </div>
      </nav>

      {/* ── Sidebar ── */}
      {sidebarOpen && <div className="sp-overlay" onClick={closeSidebar} aria-hidden="true" />}
      <aside className={`sp-sidebar${sidebarOpen ? ' sp-sidebar--open' : ''}`} aria-hidden={!sidebarOpen}>
        <div className="sp-sidebar__head">
          <h3>Services</h3>
          <p>Technical Solutions</p>
        </div>
        <nav className="sp-sidebar__nav">
          {SIDEBAR_LINKS.map(l => (
            <a key={l.label} href="#services" onClick={scrollTo('#services')}
              className={`sp-sidebar__link${l.active ? ' sp-sidebar__link--active' : ''}`}>
              <span className="material-symbols-outlined">{l.icon}</span>
              <span>{l.label}</span>
            </a>
          ))}
        </nav>
        <div className="sp-sidebar__footer">
          <button className="btn btn-primary btn-full" onClick={() => { closeSidebar(); document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }) }}>
            Consultation
          </button>
        </div>
      </aside>

      {/* ── Mobile drawer ── */}
      {mobileOpen && <div className="sp-overlay" onClick={() => setMobileOpen(false)} aria-hidden="true" />}
      <div className={`sp-mobile-menu${mobileOpen ? ' sp-mobile-menu--open' : ''}`} aria-hidden={!mobileOpen}>
        <ul role="list">
          {NAV_LINKS.map(l => (
            <li key={l.href}>
              <a href={l.href} onClick={scrollTo(l.href)}>{l.label}</a>
            </li>
          ))}
          <li>
            <a href="#contact" className="btn btn-primary btn-full" onClick={scrollTo('#contact')}>
              Start Your Project
            </a>
          </li>
        </ul>
      </div>

      <style>{`
        /* ── Nav ── */
        .sp-nav {
          position: fixed; top: 0; left: 0; right: 0; z-index: 1000;
          height: var(--nav-h);
          background: rgba(251,249,248,.92);
          backdrop-filter: blur(12px);
          border-bottom: 1px solid var(--outline-variant);
          box-shadow: 0 1px 4px rgba(0,0,0,.06);
          transition: background .25s, box-shadow .25s;
        }
        .sp-nav--scrolled {
          background: rgba(251,249,248,.98);
          box-shadow: 0 2px 16px rgba(0,0,0,.10);
        }
        .sp-nav__inner {
          display: flex; align-items: center; justify-content: space-between;
          height: 100%; gap: 16px;
        }
        .sp-nav__left  { display: flex; align-items: center; gap: 16px; flex-shrink: 0; }
        .sp-nav__right { display: flex; align-items: center; gap: 12px; flex-shrink: 0; }

        /* hamburger */
        .sp-nav__ham {
          color: var(--on-surface); padding: 4px;
          transition: color .2s;
        }
        .sp-nav__ham:hover { color: var(--primary-container); }
        .sp-nav__ham .material-symbols-outlined { font-size: 28px; }

        /* logo */
        .sp-logo {
          display: flex; align-items: center; gap: 8px;
          font-size: 16px; font-weight: 700; letter-spacing: -.01em;
          color: var(--on-surface);
        }
        .sp-logo__sun { font-size: 28px; color: var(--primary-container); }
        .sp-logo__text strong { color: var(--primary-container); }

        /* desktop links */
        .sp-nav__links {
          display: flex; gap: 32px; align-items: center;
        }
        .sp-nav__links a {
          font-size: 13px; font-weight: 700; text-transform: uppercase;
          letter-spacing: .08em; color: var(--secondary);
          transition: color .2s; position: relative; padding-bottom: 2px;
        }
        .sp-nav__links a::after {
          content: ''; position: absolute; bottom: -2px; left: 0;
          width: 0; height: 2px; background: var(--primary-container);
          transition: width .25s; border-radius: 2px;
        }
        .sp-nav__links a:hover { color: var(--primary); }
        .sp-nav__links a:hover::after { width: 100%; }

        .sp-nav__cta { padding: 10px 20px; font-size: 11px; }

        /* mobile hamburger — hidden on desktop */
        .sp-nav__mobile-ham { display: none; color: var(--on-surface); }
        .sp-nav__mobile-ham .material-symbols-outlined { font-size: 28px; }

        /* ── Sidebar ── */
        .sp-sidebar {
          position: fixed; top: var(--nav-h); left: 0; z-index: 900;
          width: 256px; height: calc(100vh - var(--nav-h));
          background: var(--surface);
          border-right: 1px solid var(--outline-variant);
          display: flex; flex-direction: column; justify-content: space-between;
          transform: translateX(-100%);
          transition: transform .3s cubic-bezier(.16,1,.3,1);
          box-shadow: 4px 0 24px rgba(0,0,0,.08);
        }
        .sp-sidebar--open { transform: translateX(0); }

        .sp-sidebar__head { padding: 24px 24px 0; }
        .sp-sidebar__head h3 {
          font-size: 18px; font-weight: 700; color: var(--primary-container); margin-bottom: 4px;
        }
        .sp-sidebar__head p { font-size: 13px; color: var(--on-surface-variant); }

        .sp-sidebar__nav { padding: 16px 12px; display: flex; flex-direction: column; gap: 4px; flex: 1; overflow-y: auto; }

        .sp-sidebar__link {
          display: flex; align-items: center; gap: 12px;
          padding: 10px 16px; border-radius: 8px;
          font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: .05em;
          color: var(--on-surface-variant);
          transition: background .2s, color .2s;
        }
        .sp-sidebar__link:hover {
          background: rgba(255,107,0,.08); color: var(--primary-container);
        }
        .sp-sidebar__link--active {
          background: var(--secondary-container); color: var(--on-secondary-container);
        }
        .sp-sidebar__link .material-symbols-outlined { font-size: 20px; }

        .sp-sidebar__footer {
          padding: 16px;
          border-top: 1px solid var(--outline-variant);
          background: var(--surface-container-low);
        }

        /* ── Overlay ── */
        .sp-overlay {
          position: fixed; inset: 0; z-index: 800;
          background: rgba(0,0,0,.4);
        }

        /* ── Mobile menu ── */
        .sp-mobile-menu {
          position: fixed; top: var(--nav-h); right: 0; z-index: 900;
          width: min(320px, 88vw); height: calc(100vh - var(--nav-h));
          background: var(--inverse-surface);
          border-left: 1px solid rgba(255,255,255,.08);
          padding: 32px 24px;
          transform: translateX(100%);
          transition: transform .3s cubic-bezier(.16,1,.3,1);
        }
        .sp-mobile-menu--open { transform: translateX(0); }
        .sp-mobile-menu ul { display: flex; flex-direction: column; gap: 24px; }
        .sp-mobile-menu a {
          font-size: 15px; font-weight: 700; text-transform: uppercase;
          letter-spacing: .08em; color: rgba(255,255,255,.8);
          transition: color .2s;
        }
        .sp-mobile-menu a:hover { color: #fff; }

        /* ── Responsive ── */
        @media (max-width: 767px) {
          .sp-nav__links    { display: none; }
          .sp-nav__cta      { display: none; }
          .sp-nav__mobile-ham { display: block; }
          .sp-nav__ham      { display: none; }
        }
      `}</style>
    </>
  )
}
