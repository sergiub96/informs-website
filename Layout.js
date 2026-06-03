(function(){
const {
  useState,
  useEffect,
  useRef
} = React;
function FadeUp({
  children,
  delay = 0,
  style = {},
  className = ''
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: `anim-fade-up ${className}`,
    style: {
      animationDelay: `${delay}ms`,
      ...style
    }
  }, children);
}
function Nav({
  onNav,
  page
}) {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const [ddOpen, setDdOpen] = useState(false);
  const ddTimer = useRef(null);
  const [ddProdOpen, setDdProdOpen] = useState(false);
  const ddProdTimer = useRef(null);
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
    window.addEventListener('scroll', h, {
      passive: true
    });
    return () => window.removeEventListener('scroll', h);
  }, []);
  const go = p => {
    onNav(p);
    setOpen(false);
    window.scrollTo({
      top: 0,
      behavior: 'instant'
    });
  };
  const openDd = () => {
    clearTimeout(ddTimer.current);
    setDdOpen(true);
  };
  const closeDd = () => {
    ddTimer.current = setTimeout(() => setDdOpen(false), 220);
  };
  const openDdProd = () => {
    clearTimeout(ddProdTimer.current);
    setDdProdOpen(true);
  };
  const closeDdProd = () => {
    ddProdTimer.current = setTimeout(() => setDdProdOpen(false), 220);
  };
  const svcs = [['analiza-si-solutii', 'Analiză și soluții personalizate'], ['achizitii-publice', 'Achiziții publice'], ['delegare-servicii', 'Delegare servicii de utilități publice'], ['modele-excel', 'Modele de lucru EXCEL'], ['modele-word', 'Modele de lucru WORD'], ['modele-pdf', 'Modele de lucru PDF']];
  const svcPages = svcs.map(s => s[0]);
  const prodCats = [{
    cat: 'all',
    label: 'Toate produsele'
  }, {
    cat: 'achizitii',
    label: 'Achiziții publice'
  }, {
    cat: 'delegare',
    label: 'Delegare servicii'
  }, {
    cat: 'management',
    label: 'Management proiect'
  }, {
    cat: 'digitalizare',
    label: 'Digitalizare'
  }, {
    cat: 'gratuite',
    label: 'Gratuite',
    green: true
  }];
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("nav", {
    className: `main-nav${scrolled ? ' scrolled' : ''}${hidden ? ' nav-hidden' : ''}`
  }, /*#__PURE__*/React.createElement("div", {
    className: "nav-island"
  }, /*#__PURE__*/React.createElement("div", {
    className: "nav-inner"
  }, /*#__PURE__*/React.createElement("div", {
    className: "nav-logo",
    onClick: () => go('home')
  }, /*#__PURE__*/React.createElement("img", {
    src: "logo/png/logo-no-background.png",
    alt: "INFORMS",
    style: {
      height: '28px',
      width: 'auto',
      display: 'block'
    }
  })), /*#__PURE__*/React.createElement("div", {
    className: "nav-links"
  }, /*#__PURE__*/React.createElement("span", {
    className: `nav-link${page === 'home' ? ' active' : ''}`,
    onClick: () => go('home')
  }, "Acas\u0103"), /*#__PURE__*/React.createElement("span", {
    className: `nav-link${page === 'despre-noi' ? ' active' : ''}`,
    onClick: () => go('despre-noi')
  }, "Despre noi"), /*#__PURE__*/React.createElement("div", {
    className: `nav-dd${ddOpen ? ' dd-open' : ''}`,
    onMouseEnter: openDd,
    onMouseLeave: closeDd
  }, /*#__PURE__*/React.createElement("span", {
    className: `nav-link nav-dd-toggle${svcPages.includes(page) || page === 'servicii' ? ' active' : ''}`
  }, "Servicii"), /*#__PURE__*/React.createElement("div", {
    className: "nav-dd-menu",
    onMouseEnter: openDd,
    onMouseLeave: closeDd
  }, svcs.map(([p, l]) => /*#__PURE__*/React.createElement("span", {
    key: p,
    className: "nav-dd-item",
    onClick: () => go(p)
  }, l)))), /*#__PURE__*/React.createElement("div", {
    className: `nav-dd${ddProdOpen ? ' dd-open' : ''}`,
    onMouseEnter: openDdProd,
    onMouseLeave: closeDdProd
  }, /*#__PURE__*/React.createElement("span", {
    className: `nav-link nav-dd-toggle${page === 'magazin' ? ' active' : ''}`
  }, "Produse"), /*#__PURE__*/React.createElement("div", {
    className: "nav-dd-menu",
    onMouseEnter: openDdProd,
    onMouseLeave: closeDdProd
  }, prodCats.map(({
    cat,
    label,
    green
  }) => /*#__PURE__*/React.createElement("span", {
    key: cat,
    className: "nav-dd-item",
    style: green ? {
      color: '#16A34A'
    } : {},
    onClick: () => {
      onNav('magazin', {
        category: cat
      });
      window.scrollTo({
        top: 0,
        behavior: 'instant'
      });
      setDdProdOpen(false);
    }
  }, label))))), /*#__PURE__*/React.createElement("div", {
    className: "nav-end"
  }, /*#__PURE__*/React.createElement("span", {
    className: `nav-link nav-cta${page === 'contact' ? ' active' : ''}`,
    onClick: () => go('contact')
  }, "Contact"), /*#__PURE__*/React.createElement("button", {
    className: `hamburger${open ? ' open' : ''}`,
    onClick: () => setOpen(!open),
    "aria-label": "Meniu"
  }, /*#__PURE__*/React.createElement("span", null), /*#__PURE__*/React.createElement("span", null), /*#__PURE__*/React.createElement("span", null)))))), /*#__PURE__*/React.createElement("div", {
    className: `mobile-menu${open ? ' open' : ''}`
  }, /*#__PURE__*/React.createElement("span", {
    className: "m-link",
    onClick: () => go('home')
  }, "Acas\u0103"), /*#__PURE__*/React.createElement("span", {
    className: "m-link",
    onClick: () => go('despre-noi')
  }, "Despre noi"), /*#__PURE__*/React.createElement("div", {
    className: "m-section-title"
  }, "Servicii"), svcs.map(([p, l]) => /*#__PURE__*/React.createElement("span", {
    key: p,
    className: "m-link",
    style: {
      paddingLeft: '26px',
      fontSize: '14px'
    },
    onClick: () => go(p)
  }, l)), /*#__PURE__*/React.createElement("div", {
    className: "m-section-title"
  }, "Produse"), prodCats.map(({
    cat,
    label,
    green
  }) => /*#__PURE__*/React.createElement("span", {
    key: cat,
    className: "m-link",
    style: {
      paddingLeft: cat === 'all' ? '14px' : '26px',
      fontSize: cat === 'all' ? '15px' : '14px',
      ...(green ? {
        color: '#16A34A'
      } : {})
    },
    onClick: () => {
      onNav('magazin', {
        category: cat
      });
      window.scrollTo({
        top: 0,
        behavior: 'instant'
      });
      setOpen(false);
    }
  }, label)), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: '12px',
      padding: '0 2px'
    }
  }, /*#__PURE__*/React.createElement("button", {
    className: "btn btn-primary",
    style: {
      width: '100%',
      justifyContent: 'center'
    },
    onClick: () => go('contact')
  }, "Contact"))));
}
function Footer({
  onNav,
  page
}) {
  const go = p => {
    onNav(p);
    window.scrollTo({
      top: 0,
      behavior: 'instant'
    });
  };
  const videoRef = useRef(null);
  const isHome = page === 'home' || page === undefined;
  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;
    if (!isHome) {
      el.pause();
      return;
    }
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) el.play().catch(() => {});
    }, {
      threshold: 0.05
    });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return /*#__PURE__*/React.createElement("footer", null, /*#__PURE__*/React.createElement("video", {
    ref: videoRef,
    className: "footer-vid",
    muted: true,
    playsInline: true,
    preload: "none",
    style: {
      display: isHome ? '' : 'none'
    }
  }, /*#__PURE__*/React.createElement("source", {
    src: "assets/videos_library/footer.mp4",
    type: "video/mp4"
  })), /*#__PURE__*/React.createElement("div", {
    className: "footer-content"
  }, /*#__PURE__*/React.createElement("div", {
    className: "footer-gradient-line"
  }), /*#__PURE__*/React.createElement("div", {
    className: "container"
  }, /*#__PURE__*/React.createElement("div", {
    className: "footer-grid"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "f-logo"
  }, /*#__PURE__*/React.createElement("img", {
    src: "logo/png/logo-no-background.png",
    alt: "INFORMS",
    style: {
      height: '28px',
      width: 'auto',
      display: 'block',
      marginBottom: '14px',
      filter: 'brightness(0) invert(1)'
    }
  })), /*#__PURE__*/React.createElement("p", {
    className: "f-desc"
  }, "Documenta\u021Bii complete, formulare \u0219i instrumente de lucru inteligente, \xEEntr-un format intuitiv, standard \u0219i u\u0219or de utilizat."), /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: '20px'
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: '12px',
      color: 'rgba(255,255,255,.38)',
      marginBottom: '6px',
      lineHeight: '1.5'
    }
  }, "Digitalizeaz\u0103 achizi\u021Biile publice cu aplica\u021Bia"), /*#__PURE__*/React.createElement("a", {
    href: "https://agathaplus.ro/",
    target: "_blank",
    rel: "noopener noreferrer",
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '6px',
      color: 'rgba(255,255,255,.75)',
      fontSize: '14.5px',
      fontWeight: 600
    }
  }, "Agatha Plus \u2197")), /*#__PURE__*/React.createElement("div", {
    className: "f-partners"
  }, /*#__PURE__*/React.createElement("a", {
    href: "https://www.e-licitatie.ro/pub",
    target: "_blank",
    rel: "noopener noreferrer"
  }, /*#__PURE__*/React.createElement("img", {
    src: "uploads/seap-sicap-logo.webp",
    alt: "SEAP / SICAP"
  })), /*#__PURE__*/React.createElement("a", {
    href: "https://netopia-payments.com/",
    target: "_blank",
    rel: "noopener noreferrer"
  }, /*#__PURE__*/React.createElement("img", {
    src: "uploads/netopia-payments.webp",
    alt: "Netopia Payments"
  })), /*#__PURE__*/React.createElement("a", {
    href: "https://anpc.ro/ce-este-sal/",
    target: "_blank",
    rel: "noopener noreferrer"
  }, /*#__PURE__*/React.createElement("img", {
    src: "uploads/anpc-sal.png",
    alt: "ANPC SAL"
  })), /*#__PURE__*/React.createElement("a", {
    href: "https://ec.europa.eu/consumers/odr",
    target: "_blank",
    rel: "noopener noreferrer"
  }, /*#__PURE__*/React.createElement("img", {
    src: "uploads/anpc-sol.png",
    alt: "ANPC SOL"
  })))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h5", null, "Link-uri rapide"), /*#__PURE__*/React.createElement("a", {
    onClick: () => go('home')
  }, "Pagina principal\u0103"), /*#__PURE__*/React.createElement("a", {
    onClick: () => go('despre-noi')
  }, "Despre noi"), /*#__PURE__*/React.createElement("a", {
    onClick: () => go('magazin')
  }, "Produse"), /*#__PURE__*/React.createElement("a", {
    onClick: () => go('contact')
  }, "Contact")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h5", null, "Servicii"), /*#__PURE__*/React.createElement("a", {
    onClick: () => go('analiza-si-solutii')
  }, "Analiz\u0103 \u0219i solu\u021Bii"), /*#__PURE__*/React.createElement("a", {
    onClick: () => go('achizitii-publice')
  }, "Achizi\u021Bii publice"), /*#__PURE__*/React.createElement("a", {
    onClick: () => go('delegare-servicii')
  }, "Delegare servicii"), /*#__PURE__*/React.createElement("a", {
    onClick: () => go('modele-excel')
  }, "Modele EXCEL"), /*#__PURE__*/React.createElement("a", {
    onClick: () => go('modele-word')
  }, "Modele WORD"), /*#__PURE__*/React.createElement("a", {
    onClick: () => go('modele-pdf')
  }, "Modele PDF")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h5", null, "Politici"), /*#__PURE__*/React.createElement("a", {
    onClick: () => go('politica-confidentialitate')
  }, "Politica de confiden\u021Bialitate"), /*#__PURE__*/React.createElement("a", {
    onClick: () => go('termeni-si-conditii')
  }, "Termeni \u0219i condi\u021Bii"))), /*#__PURE__*/React.createElement("div", {
    className: "footer-bottom"
  }, /*#__PURE__*/React.createElement("span", null, "\xA9 2025 INFORMS - Toate drepturile rezervate. Parte a companiei MILBAC MANAGEMENT S.R.L."), /*#__PURE__*/React.createElement("span", {
    style: {
      fontStyle: 'italic',
      opacity: .7
    }
  }, "\u201EExist\u0103 un singur tip de succes - acela de a-\u021Bi putea petrece timpul a\u0219a cum \xEE\u021Bi dore\u0219ti.\" - Chr. Morley")))));
}
function fmtTitle(text) {
  const map = {
    'EXCEL': '#177245',
    'Excel': '#177245',
    'WORD': '#1358B0',
    'Word': '#1358B0',
    'PDF': '#C23B22'
  };
  const parts = text.split(/\b(EXCEL|Excel|WORD|Word|PDF)\b/);
  return parts.map((p, i) => map[p] ? React.createElement('span', {
    key: i,
    style: {
      color: map[p]
    }
  }, p) : p);
}
Object.assign(window, {
  FadeUp,
  Nav,
  Footer,
  fmtTitle
});

})();