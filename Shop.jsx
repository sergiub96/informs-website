const { useState, useEffect } = React;

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
const SHOP_PRODUCTS = [
  {
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
    includes: [
      'Contract de înstrăinare-dobândire (PDF completabil)',
    ],
    stats: { files: 1, pages: 0 },
    file: 'assets/produse/gratuite/pdf/Contract%20de%20instrainare-dobandire%20mijloc%20de%20transport_v1.0.pdf',
  },
  {
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
    includes: [
      'Fișă consultații medicale (PDF completabil)',
    ],
    stats: { files: 1, pages: 0 },
    file: 'assets/produse/gratuite/pdf/Fisa%20consultatii%20medicale_permis%20conducere_v1.0.pdf',
  },
  {
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
    includes: [
      'Formular F.14 (PDF completabil)',
    ],
    stats: { files: 1, pages: 0 },
    file: 'assets/produse/gratuite/pdf/Formular%20F.14%20Comunicare%20privind%20inceperea%20executiei%20lucrarilor_v1.0.pdf',
  },
  {
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
    includes: [
      'Proces-verbal recepție terminare lucrări (PDF completabil)',
    ],
    stats: { files: 1, pages: 0 },
    file: 'assets/produse/gratuite/pdf/Proces-verbal_receptie%20terminare%20lucrari_v1.0.pdf',
  },
];

/* ─── Configurare categorii și formate ──────────── */
const SHOP_CATEGORIES = [
  { id: 'all',          label: 'Toate produsele' },
  { id: 'achizitii',   label: 'Achiziții publice' },
  { id: 'delegare',    label: 'Delegare servicii' },
  { id: 'management',  label: 'Management proiect' },
  { id: 'digitalizare',label: 'Digitalizare' },
  { id: 'gratuite',    label: 'Gratuite', green: true },
];

const SHOP_FORMATS = [
  { id: 'all',    label: 'Toate',   cls: 'fmt-all' },
  { id: 'word',   label: 'WORD',    cls: 'fmt-word' },
  { id: 'excel',  label: 'EXCEL',   cls: 'fmt-excel' },
  { id: 'pdf',    label: 'PDF',     cls: 'fmt-pdf' },
  { id: 'pachet', label: 'Pachete', cls: 'fmt-pachet' },
];

const FORMAT_META = {
  word:   { abbr: 'DOC',  label: 'WORD',   bg: 'linear-gradient(135deg,#0D2D6A 0%,#1358B0 100%)' },
  excel:  { abbr: 'XLS',  label: 'EXCEL',  bg: 'linear-gradient(135deg,#083020 0%,#177245 100%)' },
  pdf:    { abbr: 'PDF',  label: 'PDF',    bg: 'linear-gradient(135deg,#6B1208 0%,#C23B22 100%)' },
  pachet: { abbr: 'PKG',  label: 'PACHET', bg: 'linear-gradient(135deg,#061830 0%,#0D3870 100%)' },
};

/* ─── Icoane inline (folosite doar în Shop) ─────── */
function IcoSearch({ size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"
      style={{ display: 'inline-block', verticalAlign: 'middle', flexShrink: 0 }}>
      <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2"/>
      <path d="M21 21l-4.35-4.35" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  );
}

function IcoFile({ size = 13 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"
      style={{ display: 'inline-block', verticalAlign: 'middle', flexShrink: 0 }}>
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
      <polyline points="14,2 14,8 20,8" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
      <line x1="16" y1="13" x2="8" y2="13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="16" y1="17" x2="8" y2="17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  );
}

function IcoPages({ size = 13 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"
      style={{ display: 'inline-block', verticalAlign: 'middle', flexShrink: 0 }}>
      <rect x="3" y="3" width="14" height="18" rx="2" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M7 8h6M7 12h8M7 16h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M17 7h2a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  );
}

/* ─── Card produs ───────────────────────────────── */
function ProductCard({ product, onClick }) {
  const fmt = FORMAT_META[product.format];
  return (
    <div className="shop-product-card" onClick={() => onClick(product)}>
      <div className={`shop-card-vis model-card-vis ${product.cv}`}>
        <div className="mc-pat" />
        {product.price === 0 && <div className="shop-badge-free">Gratuit</div>}
        {product.isNew && product.price !== 0 && <div className="shop-badge-new">Nou</div>}
        <div className="mc-badge">{fmt.label}</div>
        <div className="mc-tag">{fmt.abbr}</div>
      </div>

      <div className="shop-card-body">
        <div className="shop-card-title">{product.title}</div>
        <div className="shop-card-desc">{product.shortDesc}</div>

        <div className="shop-card-tags">
          {product.tags.map(t => (
            <span key={t} className="shop-card-tag">{t}</span>
          ))}
        </div>

        <div className="shop-card-stats">
          {product.stats.files > 0 && (
            <span className="shop-stat-item">
              <IcoFile size={13} />
              &nbsp;{product.stats.files} {product.stats.files === 1 ? 'fișier' : 'fișiere'}
            </span>
          )}
          {product.stats.pages > 0 && (
            <span className="shop-stat-item">
              <IcoPages size={13} />
              &nbsp;{product.stats.pages} pag.
            </span>
          )}
        </div>

        <div className="shop-card-footer">
          {product.price === 0
            ? <div className="shop-card-price" style={{ color: '#16A34A' }}>Gratuit</div>
            : <div className="shop-card-price">{product.price} <span>RON</span></div>
          }
          <button
            className="btn btn-primary btn-sm"
            style={product.price === 0 ? { background: '#16A34A', borderColor: '#16A34A' } : {}}
            onClick={e => { e.stopPropagation(); onClick(product); }}
          >
            {product.price === 0 ? 'Descarcă →' : 'Detalii →'}
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─── Modal detalii produs ──────────────────────── */
function ProductModal({ product, onClose, onNav }) {
  const fmt = FORMAT_META[product.format];
  const isFree = product.price === 0;
  const hasFreeFile = isFree && product.file;

  const [email,       setEmail]       = useState('');
  const [gdpr,        setGdpr]        = useState(false);
  const [emailErr,    setEmailErr]    = useState('');
  const [downloading, setDownloading] = useState(false);
  const [downloaded,  setDownloaded]  = useState(false);

  useEffect(() => {
    const handleKey = e => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, []);

  const validEmail = v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());

  const handleDownload = async e => {
    e.preventDefault();
    if (!validEmail(email)) { setEmailErr('Introdu o adresă de email validă.'); return; }
    if (!gdpr) return;
    setEmailErr('');
    setDownloading(true);
    try {
      await fetch('/mail.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nume: 'Descărcare gratuită',
          email: email.trim(),
          subiect: 'Descărcare gratuită: ' + product.title,
          mesaj: 'Descărcare produs gratuit\nProdus: ' + product.title + '\nEmail: ' + email.trim(),
        }),
      });
    } catch (_) {}
    const a = document.createElement('a');
    a.href = product.file;
    a.download = '';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setDownloading(false);
    setDownloaded(true);
  };

  const handleBuy = () => {
    const subject = encodeURIComponent('Comandă: ' + product.title);
    const body = encodeURIComponent(
      'Bună ziua,\n\nDoresc să achiziționez:\n' + product.title +
      '\nPreț: ' + product.price + ' RON\n\n' +
      'Vă rog să-mi trimiteți detaliile de plată.\n\nCu stimă,'
    );
    window.open('mailto:office@informs.ro?subject=' + subject + '&body=' + body);
  };

  const canDownload = validEmail(email) && gdpr;

  return (
    <div className="shop-modal-overlay" onClick={e => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="shop-modal">

        {/* Header colorat */}
        <div className="shop-modal-hd" style={{ background: fmt.bg }}>
          <button className="shop-modal-close" onClick={onClose}>×</button>
          <div style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.14em', color: 'rgba(255,255,255,.5)', marginBottom: '10px' }}>
            {fmt.label}
          </div>
          <h3 style={{ color: '#fff', fontSize: '1.3rem', fontWeight: 800, lineHeight: 1.3, marginBottom: '14px', letterSpacing: '-.02em', paddingRight: '36px' }}>
            {product.title}
          </h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
            {product.tags.map(t => (
              <span key={t} style={{ fontSize: '12px', fontWeight: 600, background: 'rgba(255,255,255,.15)', color: 'rgba(255,255,255,.82)', padding: '3px 10px', borderRadius: '8px' }}>
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* Body */}
        <div className="shop-modal-bd">

          <div className="shop-modal-sec">
            <div className="shop-modal-lbl">Descriere</div>
            <p style={{ fontSize: '15px', color: 'var(--text-2)', lineHeight: '1.78' }}>{product.longDesc}</p>
          </div>

          <div className="shop-modal-sec">
            <div className="shop-modal-lbl">Ce include</div>
            <ul className="shop-modal-includes">
              {product.includes.map((item, i) => (
                <li key={i}>
                  <div className="shop-modal-check">✓</div>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {(product.stats.files > 0 || product.stats.pages > 0) && (
            <div className="shop-modal-sec">
              <div className="shop-modal-lbl">Detalii tehnice</div>
              <div style={{ display: 'flex', gap: '24px' }}>
                {product.stats.files > 0 && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '7px', fontSize: '14.5px', color: 'var(--text-2)' }}>
                    <IcoFile size={16} />
                    <span><strong style={{ color: 'var(--navy)' }}>{product.stats.files}</strong> {product.stats.files === 1 ? 'fișier' : 'fișiere'}</span>
                  </div>
                )}
                {product.stats.pages > 0 && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '7px', fontSize: '14.5px', color: 'var(--text-2)' }}>
                    <IcoPages size={16} />
                    <span><strong style={{ color: 'var(--navy)' }}>{product.stats.pages}</strong> pagini totale</span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ── Descărcare gratuită cu email + GDPR ── */}
          {hasFreeFile ? (
            downloaded ? (
              <div style={{ textAlign: 'center', padding: '28px 20px', background: '#F0FDF4', borderRadius: '12px', border: '1px solid #86EFAC' }}>
                <div style={{ fontSize: '2.2rem', marginBottom: '10px' }}>✓</div>
                <div style={{ fontWeight: 700, color: '#16A34A', fontSize: '1.05rem', marginBottom: '6px' }}>Descărcare pornită!</div>
                <div style={{ fontSize: '13.5px', color: 'var(--text-2)' }}>Verifică folderul de descărcări din browser.</div>
              </div>
            ) : (
              <form onSubmit={handleDownload} noValidate style={{ display: 'flex', flexDirection: 'column', gap: '14px', padding: '20px', background: '#F8FAFC', borderRadius: '12px', border: '1px solid var(--border)' }}>
                <div className="shop-modal-lbl" style={{ marginBottom: '2px' }}>Descarcă gratuit</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                  <label style={{ fontSize: '13.5px', fontWeight: 600, color: 'var(--text)' }}>Adresă de email *</label>
                  <input
                    type="email"
                    placeholder="exemplu@email.ro"
                    value={email}
                    onChange={e => { setEmail(e.target.value); setEmailErr(''); }}
                    style={{
                      padding: '10px 14px',
                      border: '1.5px solid ' + (emailErr ? '#DC2626' : 'var(--border)'),
                      borderRadius: '6px', fontSize: '15px', fontFamily: 'var(--font)',
                      color: 'var(--text)', background: '#fff', outline: 'none', width: '100%',
                    }}
                  />
                  {emailErr && <span style={{ fontSize: '12.5px', color: '#DC2626' }}>{emailErr}</span>}
                </div>
                <label style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    checked={gdpr}
                    onChange={e => setGdpr(e.target.checked)}
                    style={{ marginTop: '3px', flexShrink: 0, width: '15px', height: '15px', cursor: 'pointer', accentColor: '#1358B0' }}
                  />
                  <span style={{ fontSize: '12.5px', color: 'var(--text-2)', lineHeight: '1.65' }}>
                    Am citit și accept <strong style={{ color: 'var(--navy)' }}>Politica de confidențialitate</strong> și sunt de acord cu prelucrarea datelor cu caracter personal în scopul furnizării documentului solicitat, conform GDPR (Regulamentul UE 2016/679). *
                  </span>
                </label>
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={!canDownload || downloading}
                  style={{
                    background: canDownload ? '#16A34A' : '#D1D5DB',
                    borderColor: canDownload ? '#16A34A' : '#D1D5DB',
                    justifyContent: 'center',
                    cursor: canDownload ? 'pointer' : 'not-allowed',
                  }}
                >
                  {downloading ? 'Se pregătește...' : 'Descarcă gratuit'}
                </button>
              </form>
            )
          ) : (
            <>
              <div className="shop-modal-price-box" style={isFree ? { borderColor: '#86EFAC', background: '#F0FDF4' } : {}}>
                <div>
                  {isFree
                    ? <div className="shop-modal-price-note" style={{ fontSize: '15px', color: '#16A34A', fontWeight: 600 }}>
                        Fără costuri. Trimite-ne un email și îți livrăm documentul gratuit.
                      </div>
                    : <>
                        <div className="shop-modal-price">
                          {product.price} <span style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--text-2)' }}>RON</span>
                        </div>
                        <div className="shop-modal-price-note">Preț fără TVA · Livrare prin email în max. 24h</div>
                      </>
                  }
                </div>
              </div>
              <div className="shop-modal-actions">
                {isFree
                  ? <button className="btn btn-primary" style={{ background: '#16A34A', borderColor: '#16A34A', justifyContent: 'center' }} onClick={handleBuy}>
                      Solicită acces gratuit
                    </button>
                  : <button className="btn btn-primary" style={{ justifyContent: 'center' }} onClick={handleBuy}>
                      Comandă prin email
                    </button>
                }
              </div>
              <p style={{ fontSize: '12px', color: 'var(--text-2)', marginTop: '14px', textAlign: 'center', lineHeight: '1.6' }}>
                {isFree
                  ? 'Trimite-ne un email și îți livrăm documentul gratuit în cel mai scurt timp.'
                  : 'Documentele sunt livrate în format editabil la adresa de email furnizată. Plata se poate efectua prin transfer bancar sau online (Netopia Payments).'
                }
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

/* ─── Pagina principală Shop ────────────────────── */
function ShopPage({ onNav, initialCategory = 'all' }) {
  const [category, setCategory] = useState(initialCategory);
  const [format,   setFormat]   = useState('all');
  const [query,    setQuery]    = useState('');
  const [selected, setSelected] = useState(null);

  const filtered = SHOP_PRODUCTS.filter(p => {
    const matchCat = category === 'all' || p.category === category;
    const matchFmt = format   === 'all' || p.format   === format;
    const q = query.trim().toLowerCase();
    const matchQ = !q ||
      p.title.toLowerCase().includes(q) ||
      p.shortDesc.toLowerCase().includes(q) ||
      p.tags.some(t => t.toLowerCase().includes(q));
    return matchCat && matchFmt && matchQ;
  });

  const hasFilters = category !== 'all' || format !== 'all' || query.trim();

  const resetFilters = () => { setCategory('all'); setFormat('all'); setQuery(''); };

  return (
    <>
      {/* Hero */}
      <div className="pg-hero pg-hero-video" style={{ textAlign: 'center' }}>
        <video className="pg-hero-vid" autoPlay muted playsInline loop>
          <source src="assets/videos_library/portofoliu-produse-informs.mp4" type="video/mp4" />
        </video>
        <div className="pg-hero-overlay"></div>
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <div className="tag-label">Produse digitale</div>
          <h1 style={{ fontSize: 'clamp(1.6rem, 3vw, 2.4rem)' }}>Documente profesionale adaptate<br />pentru sectorul public și sectorul privat</h1>
          <div className="shop-search-wrap">
            <span className="shop-search-ico"><IcoSearch size={18} /></span>
            <input
              className="shop-search"
              type="text"
              placeholder="Caută (ex: licitație, caiet de sarcini, SEAP, salubrizare...)"
              value={query}
              onChange={e => setQuery(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* SEAP notice */}
      <div style={{ background: '#F0F6FF', borderBottom: '1px solid #C8DCEE' }}>
        <div className="container" style={{ padding: '14px 28px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
            <a href="https://www.e-licitatie.ro/pub" target="_blank" rel="noopener noreferrer" style={{ flexShrink: 0 }}>
              <img src="uploads/seap-sicap-logo.webp" alt="SEAP / SICAP" style={{ height: '28px', width: 'auto', display: 'block' }} />
            </a>
            <span style={{ fontSize: '14px', color: 'var(--text-2)', lineHeight: '1.5' }}>
              <strong style={{ color: 'var(--navy)' }}>Suntem și pe SEAP</strong> — produsele și serviciile INFORMS pot fi achiziționate prin sistemul electronic de achiziții publice.
            </span>
            <a href="https://www.e-licitatie.ro/pub" target="_blank" rel="noopener noreferrer"
              style={{ marginLeft: 'auto', fontSize: '13px', fontWeight: 600, color: 'var(--blue-a)', whiteSpace: 'nowrap', flexShrink: 0 }}>
              Vezi pe SEAP →
            </a>
          </div>
        </div>
      </div>

      {/* Filter bar */}
      <div className="shop-filter-bar" id="shop-filter-bar">
        <div className="container">
          <div className="shop-tabs">
            {SHOP_CATEGORIES.map(c => (
              <div
                key={c.id}
                className={`shop-tab${category === c.id ? ' active' : ''}`}
                style={c.green ? { color: category === c.id ? '#16A34A' : '#16A34A', borderBottomColor: category === c.id ? '#16A34A' : 'transparent' } : {}}
                onClick={() => setCategory(c.id)}
              >
                {c.label}
              </div>
            ))}
          </div>
          <div className="shop-formats">
            <span className="shop-fmt-label">Format:</span>
            {SHOP_FORMATS.map(f => (
              <div
                key={f.id}
                className={`shop-fmt ${f.cls}${format === f.id ? ' active' : ''}`}
                onClick={() => setFormat(f.id)}
              >
                {f.label}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Grid */}
      <section className="sec">
        <div className="container">

          {/* Result bar */}
          <div className="shop-result-bar">
            <div className="shop-result-count">
              <strong>{filtered.length}</strong>&nbsp;
              {filtered.length === 1 ? 'produs găsit' : 'produse găsite'}
              {hasFilters && (
                <button className="shop-reset-btn" onClick={resetFilters} style={{ marginLeft: '14px' }}>
                  ✕ Resetează filtrele
                </button>
              )}
            </div>
          </div>

          {filtered.length > 0 ? (
            <div className="shop-grid">
              {filtered.map((p, i) => (
                <FadeUp key={p.id} delay={Math.min(i, 5) * 70} style={{ display: 'flex', flexDirection: 'column' }}>
                  <ProductCard product={p} onClick={setSelected} />
                </FadeUp>
              ))}
            </div>
          ) : (
            <div className="shop-empty">
              <div className="shop-empty-icon">🔍</div>
              <h3 style={{ color: 'var(--navy)', marginBottom: '8px' }}>Niciun produs găsit</h3>
              <p style={{ marginBottom: '24px' }}>Încearcă să modifici criteriile de filtrare sau căutare.</p>
              <button className="btn btn-outline" onClick={resetFilters}>Resetează filtrele</button>
            </div>
          )}

          {/* CTA banner */}
          <div className="shop-cta-banner">
            <div style={{ fontSize: '13px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.14em', color: 'var(--blue-a)', marginBottom: '12px' }}>
              Ai nevoie de ceva personalizat?
            </div>
            <h3 style={{ color: '#fff', marginBottom: '12px', fontSize: '1.35rem' }}>Documentație la comandă</h3>
            <p style={{ color: 'rgba(255,255,255,.65)', fontSize: '15.5px', lineHeight: '1.75', maxWidth: '480px', margin: '0 auto 28px' }}>
              Nu ai găsit ce căutai? Elaborăm documentații personalizate, adaptate exact situației și nevoilor tale specifice.
            </p>
            <button
              className="btn btn-primary"
              onClick={() => { onNav('contact'); window.scrollTo({ top: 0, behavior: 'instant' }); }}
            >
              Contactează-ne
            </button>
          </div>

        </div>
      </section>

      {/* Modal */}
      {selected && (
        <ProductModal
          product={selected}
          onClose={() => setSelected(null)}
          onNav={onNav}
        />
      )}
    </>
  );
}

Object.assign(window, { ShopPage });
