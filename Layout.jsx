const { useState, useEffect, useRef } = React;

function FadeUp({ children, delay = 0, style = {}, className = '' }) {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVis(true); },
      { threshold: 0.07, rootMargin: '0px 0px -28px 0px' }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref} className={`fade-up${vis ? ' in' : ''} ${className}`} style={{ transitionDelay: `${delay}ms`, ...style }}>
      {children}
    </div>
  );
}

function Nav({ onNav, page }) {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const [ddOpen, setDdOpen] = useState(false);
  const ddTimer = useRef(null);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const h = () => {
      const y = window.scrollY;
      setScrolled(y > 10);
      if (y > 80) {
        setHidden(y > lastScrollY.current);
      } else {
        setHidden(false);
      }
      lastScrollY.current = y;
    };
    window.addEventListener('scroll', h, { passive: true });
    return () => window.removeEventListener('scroll', h);
  }, []);

  const go = (p) => { onNav(p); setOpen(false); window.scrollTo({ top: 0, behavior: 'instant' }); };

  const openDd  = () => { clearTimeout(ddTimer.current); setDdOpen(true); };
  const closeDd = () => { ddTimer.current = setTimeout(() => setDdOpen(false), 220); };

  const svcs = [
    ['analiza-si-solutii', 'Analiză și soluții personalizate'],
    ['achizitii-publice', 'Achiziții publice'],
    ['delegare-servicii', 'Delegare servicii de utilități publice'],
    ['modele-excel', 'Modele de lucru EXCEL'],
    ['modele-word', 'Modele de lucru WORD'],
    ['modele-pdf', 'Modele de lucru PDF'],
  ];
  const svcPages = svcs.map(s => s[0]);

  return (
    <>
      <nav className={`main-nav${scrolled ? ' scrolled' : ''}${hidden ? ' nav-hidden' : ''}`}>
        <div className="nav-island">
          <div className="nav-inner">
            <div className="nav-logo" onClick={() => go('home')}>
              <img
                src="logo/png/logo-no-background.png"
                alt="INFORMS"
                style={{ height: '28px', width: 'auto', display: 'block' }}
              />
            </div>

            <div className="nav-links">
              <span className={`nav-link${page === 'home' ? ' active' : ''}`} onClick={() => go('home')}>Acasă</span>
              <span className={`nav-link${page === 'despre-noi' ? ' active' : ''}`} onClick={() => go('despre-noi')}>Despre noi</span>

              <div
                className={`nav-dd${ddOpen ? ' dd-open' : ''}`}
                onMouseEnter={openDd}
                onMouseLeave={closeDd}
              >
                <span className={`nav-link nav-dd-toggle${svcPages.includes(page) || page === 'servicii' ? ' active' : ''}`}>
                  Servicii
                </span>
                <div className="nav-dd-menu" onMouseEnter={openDd} onMouseLeave={closeDd}>
                  {svcs.map(([p, l]) => (
                    <span key={p} className="nav-dd-item" onClick={() => go(p)}>{l}</span>
                  ))}
                </div>
              </div>

              <span className={`nav-link${page === 'materiale-gratuite' ? ' active' : ''}`} onClick={() => go('materiale-gratuite')}>
                Materiale gratuite
              </span>
            </div>

            <div className="nav-end">
              <span className={`nav-link nav-cta${page === 'contact' ? ' active' : ''}`} onClick={() => go('contact')}>
                Contact
              </span>
              <button className={`hamburger${open ? ' open' : ''}`} onClick={() => setOpen(!open)} aria-label="Meniu">
                <span></span><span></span><span></span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className={`mobile-menu${open ? ' open' : ''}`}>
        <span className="m-link" onClick={() => go('home')}>Acasă</span>
        <span className="m-link" onClick={() => go('despre-noi')}>Despre noi</span>
        <div className="m-section-title">Servicii</div>
        {svcs.map(([p, l]) => (
          <span key={p} className="m-link" style={{ paddingLeft: '26px', fontSize: '14px' }} onClick={() => go(p)}>{l}</span>
        ))}
        <span className="m-link" onClick={() => go('materiale-gratuite')}>Materiale gratuite</span>
        <div style={{ marginTop: '12px', padding: '0 2px' }}>
          <button className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }} onClick={() => go('contact')}>
            Contact
          </button>
        </div>
      </div>
    </>
  );
}

function Footer({ onNav }) {
  const go = (p) => { onNav(p); window.scrollTo({ top: 0, behavior: 'instant' }); };

  return (
    <footer>
      <div className="footer-gradient-line"></div>
      <div className="container">
        <div className="footer-grid">
          <div>
            <div className="f-logo">
              <img
                src="logo/png/logo-no-background.png"
                alt="INFORMS"
                style={{ height: '28px', width: 'auto', display: 'block', marginBottom: '14px', filter: 'brightness(0) invert(1)' }}
              />
            </div>
            <p className="f-desc">
              Documentații complete, formulare și instrumente de lucru inteligente,
              într-un format intuitiv, standard și ușor de utilizat.
            </p>
            <div style={{ marginBottom: '20px' }}>
              <p style={{ fontSize: '12px', color: 'rgba(255,255,255,.38)', marginBottom: '6px', lineHeight: '1.5' }}>
                Digitalizează achizițiile publice cu aplicația
              </p>
              <a href="https://agathaplus.ro/" target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: 'rgba(255,255,255,.75)', fontSize: '14.5px', fontWeight: 600 }}>
                Agatha Plus ↗
              </a>
            </div>
            <div className="f-partners">
              <a href="https://www.e-licitatie.ro/pub" target="_blank" rel="noopener noreferrer">
                <img src="uploads/seap-sicap-logo.webp" alt="SEAP / SICAP" />
              </a>
              <a href="https://netopia-payments.com/" target="_blank" rel="noopener noreferrer">
                <img src="uploads/netopia-payments.webp" alt="Netopia Payments" />
              </a>
              <a href="https://anpc.ro/ce-este-sal/" target="_blank" rel="noopener noreferrer">
                <img src="uploads/anpc-sal.png" alt="ANPC SAL" />
              </a>
              <a href="https://ec.europa.eu/consumers/odr" target="_blank" rel="noopener noreferrer">
                <img src="uploads/anpc-sol.png" alt="ANPC SOL" />
              </a>
            </div>
          </div>

          <div>
            <h5>Link-uri rapide</h5>
            <a onClick={() => go('home')}>Pagina principală</a>
            <a onClick={() => go('despre-noi')}>Despre noi</a>
            <a onClick={() => go('materiale-gratuite')}>Materiale gratuite</a>
            <a onClick={() => go('contact')}>Contact</a>
          </div>

          <div>
            <h5>Servicii</h5>
            <a onClick={() => go('analiza-si-solutii')}>Analiză și soluții</a>
            <a onClick={() => go('achizitii-publice')}>Achiziții publice</a>
            <a onClick={() => go('delegare-servicii')}>Delegare servicii</a>
            <a onClick={() => go('modele-excel')}>Modele EXCEL</a>
            <a onClick={() => go('modele-word')}>Modele WORD</a>
            <a onClick={() => go('modele-pdf')}>Modele PDF</a>
          </div>

          <div>
            <h5>Politici</h5>
            <a onClick={() => go('politica-confidentialitate')}>Politica de confidențialitate</a>
            <a onClick={() => go('termeni-si-conditii')}>Termeni și condiții</a>
          </div>
        </div>

        <div className="footer-bottom">
          <span>© 2025 INFORMS - Toate drepturile rezervate. Parte a companiei MILBAC MANAGEMENT S.R.L.</span>
          <span style={{ fontStyle: 'italic', opacity: .7 }}>
            „Există un singur tip de succes - acela de a-ți putea petrece timpul așa cum îți dorești." - Chr. Morley
          </span>
        </div>
      </div>
    </footer>
  );
}

function fmtTitle(text) {
  const map = { 'EXCEL': '#177245', 'Excel': '#177245', 'WORD': '#1358B0', 'Word': '#1358B0', 'PDF': '#C23B22' };
  const parts = text.split(/\b(EXCEL|Excel|WORD|Word|PDF)\b/);
  return parts.map((p, i) => map[p]
    ? React.createElement('span', { key: i, style: { color: map[p] } }, p)
    : p
  );
}

Object.assign(window, { FadeUp, Nav, Footer, fmtTitle });
