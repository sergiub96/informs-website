(function(){
const {
  useState,
  useEffect
} = React;

/* ══════════════════════════════════════════════════
   SHOP - Marketplace produse digitale INFORMS
   ──────────────────────────────────────────────────
   Adaugă sau editează produse în array-ul SHOP_PRODUCTS
   de mai jos. Fiecare produs are câmpuri auto-explicative.
══════════════════════════════════════════════════ */

/* ─── Date produse ───────────────────────────────
   format: 'word' | 'excel' | 'pdf' | 'pachet'
   category: 'achizitii' | 'delegare' | 'management' | 'digitalizare' | 'gratuite'
   cv: clasa CSS pentru culoarea header-ului cardului
       cv-word (albastru) | cv-excel (verde) | cv-pdf (roșu) | cv-atr (navy)
   file: calea relativă către fișier (opțional)
         ex: 'assets/produse/gratuite/pdf/ghid-termeni.pdf'
         - produse gratuite cu 'file' setat → buton descărcare directă
         - produse cu preț cu 'file' setat  → livrat după plată (mailto)
         - fără 'file'                      → flux mailto în ambele cazuri
─────────────────────────────────────────────────── */
const SHOP_PRODUCTS = [{
  id: 'contract-instrainare-mijloc-transport',
  title: 'Contract de înstrăinare-dobândire mijloc de transport',
  shortDesc: 'Model de contract pentru transferul dreptului de proprietate asupra unui mijloc de transport.',
  longDesc: 'Formular PDF completabil pentru înstrăinarea și dobândirea unui mijloc de transport. Conține toate clauzele obligatorii și câmpurile necesare pentru o tranzacție legală conformă.',
  category: 'gratuite',
  format: 'pdf',
  cv: 'cv-pdf',
  price: 0,
  featured: false,
  isNew: false,
  tags: ['Contract', 'Mijloc de transport', 'Înstrăinare'],
  includes: ['Contract de înstrăinare-dobândire (PDF completabil)'],
  stats: {
    files: 1,
    pages: 0
  },
  file: 'assets/produse/gratuite/pdf/Contract%20de%20instrainare-dobandire%20mijloc%20de%20transport_v1.0.pdf'
}, {
  id: 'fisa-consultatii-medicale-permis',
  title: 'Fișă consultații medicale - permis conducere',
  shortDesc: 'Formular pentru înregistrarea consultațiilor medicale în vederea obținerii sau reînnoirii permisului de conducere.',
  longDesc: 'Fișă medicală standardizată pentru consultațiile necesare obținerii sau reînnoirii permisului de conducere. Formular PDF completabil, conform cerințelor autorităților competente.',
  category: 'gratuite',
  format: 'pdf',
  cv: 'cv-pdf',
  price: 0,
  featured: false,
  isNew: false,
  tags: ['Fișă medicală', 'Permis conducere', 'Formulare'],
  includes: ['Fișă consultații medicale (PDF completabil)'],
  stats: {
    files: 1,
    pages: 0
  },
  file: 'assets/produse/gratuite/pdf/Fisa%20consultatii%20medicale_permis%20conducere_v1.0.pdf'
}, {
  id: 'formular-f14-incepere-lucrari',
  title: 'Formular F.14 - Comunicare începere execuție lucrări',
  shortDesc: 'Formular oficial pentru comunicarea datei de începere a execuției lucrărilor de construcții către autoritățile competente.',
  longDesc: 'Formularul F.14 este documentul oficial prin care se comunică data de începere a execuției lucrărilor de construcții. PDF completabil, conform legislației în vigoare privind autorizarea executării lucrărilor de construcții.',
  category: 'gratuite',
  format: 'pdf',
  cv: 'cv-pdf',
  price: 0,
  featured: false,
  isNew: false,
  tags: ['F.14', 'Execuție lucrări', 'Construcții'],
  includes: ['Formular F.14 (PDF completabil)'],
  stats: {
    files: 1,
    pages: 0
  },
  file: 'assets/produse/gratuite/pdf/Formular%20F.14%20Comunicare%20privind%20inceperea%20executiei%20lucrarilor_v1.0.pdf'
}, {
  id: 'proces-verbal-receptie-lucrari',
  title: 'Proces-verbal recepție la terminarea lucrărilor',
  shortDesc: 'Model de proces-verbal pentru recepția la terminarea lucrărilor de construcții, conform normelor legale în vigoare.',
  longDesc: 'Formular PDF pentru procesul-verbal de recepție la terminarea lucrărilor de construcții. Include toate rubricile obligatorii conform HG 343/2017 privind recepția lucrărilor de construcții.',
  category: 'gratuite',
  format: 'pdf',
  cv: 'cv-pdf',
  price: 0,
  featured: false,
  isNew: false,
  tags: ['Recepție lucrări', 'Proces-verbal', 'Construcții'],
  includes: ['Proces-verbal recepție terminare lucrări (PDF completabil)'],
  stats: {
    files: 1,
    pages: 0
  },
  file: 'assets/produse/gratuite/pdf/Proces-verbal_receptie%20terminare%20lucrari_v1.0.pdf'
}];

/* ─── Configurare categorii și formate ──────────── */
const SHOP_CATEGORIES = [{
  id: 'all',
  label: 'Toate produsele'
}, {
  id: 'achizitii',
  label: 'Achiziții publice'
}, {
  id: 'delegare',
  label: 'Delegare servicii'
}, {
  id: 'management',
  label: 'Management proiect'
}, {
  id: 'digitalizare',
  label: 'Digitalizare'
}, {
  id: 'gratuite',
  label: 'Gratuite',
  green: true
}];
const SHOP_FORMATS = [{
  id: 'all',
  label: 'Toate',
  cls: 'fmt-all'
}, {
  id: 'word',
  label: 'WORD',
  cls: 'fmt-word'
}, {
  id: 'excel',
  label: 'EXCEL',
  cls: 'fmt-excel'
}, {
  id: 'pdf',
  label: 'PDF',
  cls: 'fmt-pdf'
}, {
  id: 'pachet',
  label: 'Pachete',
  cls: 'fmt-pachet'
}];
const FORMAT_META = {
  word: {
    abbr: 'DOC',
    label: 'WORD',
    bg: 'linear-gradient(135deg,#0D2D6A 0%,#1358B0 100%)'
  },
  excel: {
    abbr: 'XLS',
    label: 'EXCEL',
    bg: 'linear-gradient(135deg,#083020 0%,#177245 100%)'
  },
  pdf: {
    abbr: 'PDF',
    label: 'PDF',
    bg: 'linear-gradient(135deg,#6B1208 0%,#C23B22 100%)'
  },
  pachet: {
    abbr: 'PKG',
    label: 'PACHET',
    bg: 'linear-gradient(135deg,#061830 0%,#0D3870 100%)'
  }
};

/* ─── Icoane inline (folosite doar în Shop) ─────── */
function IcoSearch({
  size = 20
}) {
  return /*#__PURE__*/React.createElement("svg", {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    style: {
      display: 'inline-block',
      verticalAlign: 'middle',
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "11",
    cy: "11",
    r: "8",
    stroke: "currentColor",
    strokeWidth: "2"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M21 21l-4.35-4.35",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round"
  }));
}
function IcoFile({
  size = 13
}) {
  return /*#__PURE__*/React.createElement("svg", {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    style: {
      display: 'inline-block',
      verticalAlign: 'middle',
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z",
    stroke: "currentColor",
    strokeWidth: "1.5",
    strokeLinejoin: "round"
  }), /*#__PURE__*/React.createElement("polyline", {
    points: "14,2 14,8 20,8",
    stroke: "currentColor",
    strokeWidth: "1.5",
    strokeLinejoin: "round"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "16",
    y1: "13",
    x2: "8",
    y2: "13",
    stroke: "currentColor",
    strokeWidth: "1.5",
    strokeLinecap: "round"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "16",
    y1: "17",
    x2: "8",
    y2: "17",
    stroke: "currentColor",
    strokeWidth: "1.5",
    strokeLinecap: "round"
  }));
}
function IcoPages({
  size = 13
}) {
  return /*#__PURE__*/React.createElement("svg", {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    style: {
      display: 'inline-block',
      verticalAlign: 'middle',
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement("rect", {
    x: "3",
    y: "3",
    width: "14",
    height: "18",
    rx: "2",
    stroke: "currentColor",
    strokeWidth: "1.5"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M7 8h6M7 12h8M7 16h4",
    stroke: "currentColor",
    strokeWidth: "1.5",
    strokeLinecap: "round"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M17 7h2a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H9",
    stroke: "currentColor",
    strokeWidth: "1.5",
    strokeLinecap: "round"
  }));
}

/* ─── Card produs ───────────────────────────────── */
function ProductCard({
  product,
  onClick
}) {
  const fmt = FORMAT_META[product.format];
  return /*#__PURE__*/React.createElement("div", {
    className: "shop-product-card",
    onClick: () => onClick(product)
  }, /*#__PURE__*/React.createElement("div", {
    className: `shop-card-vis model-card-vis ${product.cv}`
  }, /*#__PURE__*/React.createElement("div", {
    className: "mc-pat"
  }), product.price === 0 && /*#__PURE__*/React.createElement("div", {
    className: "shop-badge-free"
  }, "Gratuit"), product.isNew && product.price !== 0 && /*#__PURE__*/React.createElement("div", {
    className: "shop-badge-new"
  }, "Nou"), /*#__PURE__*/React.createElement("div", {
    className: "mc-badge"
  }, fmt.label), /*#__PURE__*/React.createElement("div", {
    className: "mc-tag"
  }, fmt.abbr)), /*#__PURE__*/React.createElement("div", {
    className: "shop-card-body"
  }, /*#__PURE__*/React.createElement("div", {
    className: "shop-card-title"
  }, product.title), /*#__PURE__*/React.createElement("div", {
    className: "shop-card-desc"
  }, product.shortDesc), /*#__PURE__*/React.createElement("div", {
    className: "shop-card-tags"
  }, product.tags.map(t => /*#__PURE__*/React.createElement("span", {
    key: t,
    className: "shop-card-tag"
  }, t))), /*#__PURE__*/React.createElement("div", {
    className: "shop-card-stats"
  }, product.stats.files > 0 && /*#__PURE__*/React.createElement("span", {
    className: "shop-stat-item"
  }, /*#__PURE__*/React.createElement(IcoFile, {
    size: 13
  }), "\xA0", product.stats.files, " ", product.stats.files === 1 ? 'fișier' : 'fișiere'), product.stats.pages > 0 && /*#__PURE__*/React.createElement("span", {
    className: "shop-stat-item"
  }, /*#__PURE__*/React.createElement(IcoPages, {
    size: 13
  }), "\xA0", product.stats.pages, " pag.")), /*#__PURE__*/React.createElement("div", {
    className: "shop-card-footer"
  }, product.price === 0 ? /*#__PURE__*/React.createElement("div", {
    className: "shop-card-price",
    style: {
      color: '#16A34A'
    }
  }, "Gratuit") : /*#__PURE__*/React.createElement("div", {
    className: "shop-card-price"
  }, product.price, " ", /*#__PURE__*/React.createElement("span", null, "RON")), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-primary btn-sm",
    style: product.price === 0 ? {
      background: '#16A34A',
      borderColor: '#16A34A'
    } : {},
    onClick: e => {
      e.stopPropagation();
      onClick(product);
    }
  }, product.price === 0 ? 'Descarcă →' : 'Detalii →'))));
}

/* ─── Modal detalii produs ──────────────────────── */
function ProductModal({
  product,
  onClose,
  onNav
}) {
  const fmt = FORMAT_META[product.format];
  useEffect(() => {
    const handleKey = e => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, []);
  const handleBuy = () => {
    const subject = encodeURIComponent('Comandă: ' + product.title);
    const body = encodeURIComponent('Bună ziua,\n\nDoresc să achiziționez:\n' + product.title + '\nPreț: ' + product.price + ' RON\n\n' + 'Vă rog să-mi trimiteți detaliile de plată.\n\nCu stimă,');
    window.open('mailto:office@informs.ro?subject=' + subject + '&body=' + body);
  };
  const handleContact = () => {
    onClose();
    onNav('contact');
    window.scrollTo({
      top: 0,
      behavior: 'instant'
    });
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "shop-modal-overlay",
    onClick: e => {
      if (e.target === e.currentTarget) onClose();
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "shop-modal"
  }, /*#__PURE__*/React.createElement("div", {
    className: "shop-modal-hd",
    style: {
      background: fmt.bg
    }
  }, /*#__PURE__*/React.createElement("button", {
    className: "shop-modal-close",
    onClick: onClose
  }, "\xD7"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: '11px',
      fontWeight: 700,
      textTransform: 'uppercase',
      letterSpacing: '.14em',
      color: 'rgba(255,255,255,.5)',
      marginBottom: '10px'
    }
  }, fmt.label), /*#__PURE__*/React.createElement("h3", {
    style: {
      color: '#fff',
      fontSize: '1.3rem',
      fontWeight: 800,
      lineHeight: 1.3,
      marginBottom: '14px',
      letterSpacing: '-.02em',
      paddingRight: '36px'
    }
  }, product.title), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '6px'
    }
  }, product.tags.map(t => /*#__PURE__*/React.createElement("span", {
    key: t,
    style: {
      fontSize: '12px',
      fontWeight: 600,
      background: 'rgba(255,255,255,.15)',
      color: 'rgba(255,255,255,.82)',
      padding: '3px 10px',
      borderRadius: '8px'
    }
  }, t)))), /*#__PURE__*/React.createElement("div", {
    className: "shop-modal-bd"
  }, /*#__PURE__*/React.createElement("div", {
    className: "shop-modal-sec"
  }, /*#__PURE__*/React.createElement("div", {
    className: "shop-modal-lbl"
  }, "Descriere"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: '15px',
      color: 'var(--text-2)',
      lineHeight: '1.78'
    }
  }, product.longDesc)), /*#__PURE__*/React.createElement("div", {
    className: "shop-modal-sec"
  }, /*#__PURE__*/React.createElement("div", {
    className: "shop-modal-lbl"
  }, "Ce include"), /*#__PURE__*/React.createElement("ul", {
    className: "shop-modal-includes"
  }, product.includes.map((item, i) => /*#__PURE__*/React.createElement("li", {
    key: i
  }, /*#__PURE__*/React.createElement("div", {
    className: "shop-modal-check"
  }, "\u2713"), /*#__PURE__*/React.createElement("span", null, item))))), (product.stats.files > 0 || product.stats.pages > 0) && /*#__PURE__*/React.createElement("div", {
    className: "shop-modal-sec"
  }, /*#__PURE__*/React.createElement("div", {
    className: "shop-modal-lbl"
  }, "Detalii tehnice"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: '24px'
    }
  }, product.stats.files > 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: '7px',
      fontSize: '14.5px',
      color: 'var(--text-2)'
    }
  }, /*#__PURE__*/React.createElement(IcoFile, {
    size: 16
  }), /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("strong", {
    style: {
      color: 'var(--navy)'
    }
  }, product.stats.files), " ", product.stats.files === 1 ? 'fișier' : 'fișiere')), product.stats.pages > 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: '7px',
      fontSize: '14.5px',
      color: 'var(--text-2)'
    }
  }, /*#__PURE__*/React.createElement(IcoPages, {
    size: 16
  }), /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("strong", {
    style: {
      color: 'var(--navy)'
    }
  }, product.stats.pages), " pagini totale")))), /*#__PURE__*/React.createElement("div", {
    className: "shop-modal-price-box",
    style: product.price === 0 ? {
      borderColor: '#86EFAC',
      background: '#F0FDF4'
    } : {}
  }, /*#__PURE__*/React.createElement("div", null, product.price === 0 ? /*#__PURE__*/React.createElement("div", {
    className: "shop-modal-price-note",
    style: {
      fontSize: '15px',
      color: '#16A34A',
      fontWeight: 600
    }
  }, "F\u0103r\u0103 costuri. Disponibil imediat prin ap\u0103sarea butonului de mai jos.") : /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "shop-modal-price"
  }, product.price, " ", /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: '1rem',
      fontWeight: 600,
      color: 'var(--text-2)'
    }
  }, "RON")), /*#__PURE__*/React.createElement("div", {
    className: "shop-modal-price-note"
  }, "Pre\u021B f\u0103r\u0103 TVA \xB7 Livrare prin email \xEEn max. 24h")))), /*#__PURE__*/React.createElement("div", {
    className: "shop-modal-actions"
  }, product.price === 0 ? product.file ? /*#__PURE__*/React.createElement("a", {
    className: "btn btn-primary",
    href: product.file,
    download: true,
    style: {
      background: '#16A34A',
      borderColor: '#16A34A',
      justifyContent: 'center'
    }
  }, "Descarc\u0103 gratuit") : /*#__PURE__*/React.createElement("button", {
    className: "btn btn-primary",
    style: {
      background: '#16A34A',
      borderColor: '#16A34A',
      justifyContent: 'center'
    },
    onClick: handleBuy
  }, "Solicit\u0103 acces gratuit") : /*#__PURE__*/React.createElement("button", {
    className: "btn btn-primary",
    style: {
      justifyContent: 'center'
    },
    onClick: handleBuy
  }, "Comand\u0103 prin email")), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: '12px',
      color: 'var(--text-2)',
      marginTop: '14px',
      textAlign: 'center',
      lineHeight: '1.6'
    }
  }, product.price === 0 ? 'Trimite-ne un email și îți livrăm documentul gratuit în cel mai scurt timp.' : 'Documentele sunt livrate în format editabil la adresa de email furnizată. Plata se poate efectua prin transfer bancar sau online (Netopia Payments).'))));
}

/* ─── Pagina principală Shop ────────────────────── */
function ShopPage({
  onNav,
  initialCategory = 'all'
}) {
  const [category, setCategory] = useState(initialCategory);
  const [format, setFormat] = useState('all');
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState(null);
  const filtered = SHOP_PRODUCTS.filter(p => {
    const matchCat = category === 'all' || p.category === category;
    const matchFmt = format === 'all' || p.format === format;
    const q = query.trim().toLowerCase();
    const matchQ = !q || p.title.toLowerCase().includes(q) || p.shortDesc.toLowerCase().includes(q) || p.tags.some(t => t.toLowerCase().includes(q));
    return matchCat && matchFmt && matchQ;
  });
  const hasFilters = category !== 'all' || format !== 'all' || query.trim();
  const resetFilters = () => {
    setCategory('all');
    setFormat('all');
    setQuery('');
  };
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "pg-hero pg-hero-video",
    style: {
      textAlign: 'center'
    }
  }, /*#__PURE__*/React.createElement("video", {
    className: "pg-hero-vid",
    autoPlay: true,
    muted: true,
    playsInline: true,
    loop: true
  }, /*#__PURE__*/React.createElement("source", {
    src: "assets/videos_library/portofoliu-produse-informs.mp4",
    type: "video/mp4"
  })), /*#__PURE__*/React.createElement("div", {
    className: "pg-hero-overlay"
  }), /*#__PURE__*/React.createElement("div", {
    className: "container",
    style: {
      position: 'relative',
      zIndex: 2
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "tag-label"
  }, "Produse digitale"), /*#__PURE__*/React.createElement("h1", {
    style: {
      fontSize: 'clamp(1.6rem, 3vw, 2.4rem)'
    }
  }, "Documente profesionale adaptate", /*#__PURE__*/React.createElement("br", null), "pentru sectorul public \u0219i sectorul privat"), /*#__PURE__*/React.createElement("div", {
    className: "shop-search-wrap"
  }, /*#__PURE__*/React.createElement("span", {
    className: "shop-search-ico"
  }, /*#__PURE__*/React.createElement(IcoSearch, {
    size: 18
  })), /*#__PURE__*/React.createElement("input", {
    className: "shop-search",
    type: "text",
    placeholder: "Caut\u0103 (ex: licita\u021Bie, caiet de sarcini, SEAP, salubrizare...)",
    value: query,
    onChange: e => setQuery(e.target.value)
  })))), /*#__PURE__*/React.createElement("div", {
    className: "shop-filter-bar",
    id: "shop-filter-bar"
  }, /*#__PURE__*/React.createElement("div", {
    className: "container"
  }, /*#__PURE__*/React.createElement("div", {
    className: "shop-tabs"
  }, SHOP_CATEGORIES.map(c => /*#__PURE__*/React.createElement("div", {
    key: c.id,
    className: `shop-tab${category === c.id ? ' active' : ''}`,
    style: c.green ? {
      color: category === c.id ? '#16A34A' : '#16A34A',
      borderBottomColor: category === c.id ? '#16A34A' : 'transparent'
    } : {},
    onClick: () => setCategory(c.id)
  }, c.label))), /*#__PURE__*/React.createElement("div", {
    className: "shop-formats"
  }, /*#__PURE__*/React.createElement("span", {
    className: "shop-fmt-label"
  }, "Format:"), SHOP_FORMATS.map(f => /*#__PURE__*/React.createElement("div", {
    key: f.id,
    className: `shop-fmt ${f.cls}${format === f.id ? ' active' : ''}`,
    onClick: () => setFormat(f.id)
  }, f.label))))), /*#__PURE__*/React.createElement("section", {
    className: "sec"
  }, /*#__PURE__*/React.createElement("div", {
    className: "container"
  }, /*#__PURE__*/React.createElement("div", {
    className: "shop-result-bar"
  }, /*#__PURE__*/React.createElement("div", {
    className: "shop-result-count"
  }, /*#__PURE__*/React.createElement("strong", null, filtered.length), "\xA0", filtered.length === 1 ? 'produs găsit' : 'produse găsite', hasFilters && /*#__PURE__*/React.createElement("button", {
    className: "shop-reset-btn",
    onClick: resetFilters,
    style: {
      marginLeft: '14px'
    }
  }, "\u2715 Reseteaz\u0103 filtrele"))), filtered.length > 0 ? /*#__PURE__*/React.createElement("div", {
    className: "shop-grid"
  }, filtered.map((p, i) => /*#__PURE__*/React.createElement("div", {
    key: p.id,
    "data-aos": "fade-up",
    "data-aos-delay": Math.min(i, 5) * 70,
    "data-aos-once": "true",
    style: {
      display: 'flex',
      flexDirection: 'column'
    }
  }, /*#__PURE__*/React.createElement(ProductCard, {
    product: p,
    onClick: setSelected
  })))) : /*#__PURE__*/React.createElement("div", {
    className: "shop-empty"
  }, /*#__PURE__*/React.createElement("div", {
    className: "shop-empty-icon"
  }, "\uD83D\uDD0D"), /*#__PURE__*/React.createElement("h3", {
    style: {
      color: 'var(--navy)',
      marginBottom: '8px'
    }
  }, "Niciun produs g\u0103sit"), /*#__PURE__*/React.createElement("p", {
    style: {
      marginBottom: '24px'
    }
  }, "\xCEncearc\u0103 s\u0103 modifici criteriile de filtrare sau c\u0103utare."), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-outline",
    onClick: resetFilters
  }, "Reseteaz\u0103 filtrele")), /*#__PURE__*/React.createElement("div", {
    className: "shop-cta-banner"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: '13px',
      fontWeight: 700,
      textTransform: 'uppercase',
      letterSpacing: '.14em',
      color: 'var(--blue-a)',
      marginBottom: '12px'
    }
  }, "Ai nevoie de ceva personalizat?"), /*#__PURE__*/React.createElement("h3", {
    style: {
      color: '#fff',
      marginBottom: '12px',
      fontSize: '1.35rem'
    }
  }, "Documenta\u021Bie la comand\u0103"), /*#__PURE__*/React.createElement("p", {
    style: {
      color: 'rgba(255,255,255,.65)',
      fontSize: '15.5px',
      lineHeight: '1.75',
      maxWidth: '480px',
      margin: '0 auto 28px'
    }
  }, "Nu ai g\u0103sit ce c\u0103utai? Elabor\u0103m documenta\u021Bii personalizate, adaptate exact situa\u021Biei \u0219i nevoilor tale specifice."), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-primary",
    onClick: () => {
      onNav('contact');
      window.scrollTo({
        top: 0,
        behavior: 'instant'
      });
    }
  }, "Contacteaz\u0103-ne")))), selected && /*#__PURE__*/React.createElement(ProductModal, {
    product: selected,
    onClose: () => setSelected(null),
    onNav: onNav
  }));
}
Object.assign(window, {
  ShopPage
});

})();