const { useState, useEffect, useRef } = React;


/* ── Animated headline: cuvinte dezvăluite secvențial ── */
function AnimatedHeadline({ lines, startDelay = 0.28 }) {
  let wi = 0;
  return (
    <h1 style={{ color: '#fff', marginBottom: '20px' }}>
      {lines.map((line, li) => (
        <span key={li} style={{ display: 'block' }}>
          {line.split(' ').map((word, idx) => {
            const delay = startDelay + wi++ * 0.085;
            return (
              <span key={idx} className="h-word" style={{ animationDelay: `${delay}s` }}>
                {word}{idx < line.split(' ').length - 1 ? '\u00A0' : ''}
              </span>
            );
          })}
        </span>
      ))}
    </h1>
  );
}

/* ── Count-up number ── */
function CountUp({ to, suffix = '', duration = 1700 }) {
  const [val, setVal] = useState(0);
  const [active, setActive] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setActive(true); obs.disconnect(); }
    });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  useEffect(() => {
    if (!active) return;
    let start = null;
    const step = (ts) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / duration, 1);
      const ease = 1 - Math.pow(1 - p, 3);
      setVal(Math.round(ease * to));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [active, to, duration]);
  return <span ref={ref}>{val}{suffix}</span>;
}

/* ── Icons ── */
const Ico = ({ d, size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
    {d}
  </svg>
);
const IcoChart   = () => <Ico d={<><polyline points="22 12 18 12 15 21 9 3 6 12 2 12" /></>} />;
const IcoFile    = () => <Ico d={<><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></>} />;
const IcoShield  = () => <Ico d={<><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></>} />;
const IcoGrid    = () => <Ico d={<><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></>} />;
const IcoCode    = () => <Ico d={<><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></>} />;
const IcoUsers   = () => <Ico d={<><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></>} />;
const IcoArrow   = () => <Ico d={<><path d="M5 12h14"/><path d="M12 5l7 7-7 7"/></>} size={14} />;
const IcoBuilding = () => <Ico d={<><rect x="2" y="7" width="9" height="14"/><path d="M16 3H7v4"/><rect x="11" y="11" width="11" height="10"/><line x1="2" y1="21" x2="22" y2="21"/></>} />;
const IcoBolt    = () => <Ico d={<><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></>} />;

function HomePage({ onNav }) {
  const go = (p) => { onNav(p); window.scrollTo({ top: 0, behavior: 'instant' }); };
  const [activeSvc, setActiveSvc] = useState(0);

  const features = [
    { icon: <IcoBolt />,    title: 'OPTIMIZEAZĂ',             desc: 'Organizează fluxul de lucru eficient și performant' },
    { icon: <IcoFile />,    title: 'APLICĂ DIRECT',           desc: 'Modele cu aplicare directă, conform legislației în vigoare' },
    { icon: <IcoShield />,  title: 'DOCUMENTAȚII COMPLETE',   desc: 'Documentații complete și asistență tehnico-economică' },
  ];

  const domains = [
    { icon: <IcoFile />,     num: '01', label: 'Achiziții publice',                  desc: 'Documentații complete pentru proceduri de atribuire — servicii, produse și lucrări. Conformitate legislativă garantată.' },
    { icon: <IcoBuilding />, num: '02', label: 'Delegare servicii utilități publice', desc: 'Studii de oportunitate și documentații complete pentru gestiunea serviciilor de salubrizare, transport și iluminat.' },
    { icon: <IcoGrid />,     num: '03', label: 'Management de proiect',               desc: 'Instrumente pentru planificarea, monitorizarea și raportarea proiectelor finanțate din fonduri publice sau europene.' },
    { icon: <IcoCode />,     num: '04', label: 'Digitalizare',                        desc: 'Automatizarea fluxurilor documentare prin modele Excel, Word și PDF inteligent, adaptate activității tale specifice.' },
  ];

  const models = [
    { title: 'Modele EXCEL',              desc: 'Instrumente avansate de calcul. Complexitatea nu trebuie să fie un impediment.',
      img: 'uploads/Caiet-de-sarcini-servicii.webp',        page: 'modele-excel' },
    { title: 'Modele PDF inteligent',     desc: 'Formulare electronice interactive. Standardizare completă a documentelor.',
      img: 'uploads/Formulare-servicii.webp',               page: 'modele-pdf' },
    { title: 'Modele WORD',               desc: 'Formulare tipizate digitale. Cererile scanate sunt de domeniul trecutului.',
      img: 'uploads/Clauze-contractuale-servicii.webp',     page: 'modele-word' },
    { title: 'Procese verbale & Rapoarte', desc: 'Modele adaptate pentru situații complexe din domeniul achizițiilor.',
      img: 'uploads/Ofertare-licitatii-servicii.webp',      page: 'contact' },
    { title: 'Documentații de atribuire', desc: 'Documentații complete pentru proceduri de atribuire a contractelor publice.',
      img: 'uploads/Strategie-de-contractare-servicii.webp', page: 'achizitii-publice' },
  ];

  const objectives = [
    { num: '01', title: 'Reducerea timpului de lucru',     desc: 'Reducerea considerabilă a timpului de lucru și eliminarea în proporție de cel puțin 90% a erorilor umane prin standardizarea documentelor.' },
    { num: '02', title: 'Simplificare și eficientizare',  desc: 'Modalități de lucru care simplifică interpretarea informațiilor complexe. Ecosisteme eficiente cu rezultate ce au impact real.' },
    { num: '03', title: 'Digitalizare și standardizare',  desc: 'Digitalizarea activităților administrative prin instrumente personalizate. Performanța apare când toți respectă un mod de lucru comun.' },
  ];

  const services = [
    { title: 'Analiză și soluții aplicabile',
      desc: 'Pe baza datelor de intrare solicitate, analizăm situația și oferim soluții concrete, aplicate, care răspund cerințelor și obiectivelor.',
      img: 'uploads/Caiet-de-sarcini-produse.webp', page: 'analiza-si-solutii' },
    { title: 'Achiziții publice',
      desc: 'Documentații complete pentru atribuirea contractelor de servicii, produse și lucrări. Asistență deplină în derularea procedurilor.',
      img: 'uploads/Ofertare-licitatii-lucrari.webp', page: 'achizitii-publice' },
    { title: 'Delegare servicii de utilități publice',
      desc: 'Documentații complete pentru gestiunea serviciilor: salubrizare, transport public, iluminat public.',
      img: 'uploads/delegare-serviciu-salubrizare.webp', page: 'delegare-servicii' },
    { title: 'Modele de lucru EXCEL',
      desc: 'Instrumente cu aplicabilitate generală și specifică pe domeniu, în format editabil Excel, actualizate conform legislației.',
      img: 'uploads/Caiet-de-sarcini-lucrari.webp', page: 'modele-excel' },
    { title: 'Modele de lucru WORD',
      desc: 'Instrumente cu aplicabilitate generală și specifică pe domeniu, în format editabil Word, pentru o digitalizare completă.',
      img: 'uploads/Clauze-contractuale-lucrari.webp', page: 'modele-word' },
    { title: 'Modele de lucru PDF inteligent',
      desc: 'Instrumente cu aplicabilitate generală și specifică pe domeniu, în format PDF inteligent, interactive și ușor de completat.',
      img: 'uploads/Formulare-lucrari.webp', page: 'modele-pdf' },
  ];

  return (
    <>
      {/* ── HERO ── */}
      <section className="hero hero-video-section">
        <video className="hero-video" autoPlay muted loop playsInline>
          <source src="assets/img_informs/animated-digital-data-network-with-cloud-and-file.mp4" type="video/mp4" />
        </video>
        <div className="hero-video-overlay"></div>
        <div className="container hero-center-content">
          <p className="h-label">
            Achiziții publice &nbsp;·&nbsp; Delegare servicii de utilități publice &nbsp;·&nbsp; Digitalizare
          </p>
          <AnimatedHeadline
            lines={['Formulare inteligente.', 'Documentații complete.']}
            startDelay={0.28}
          />
          <p className="hero-sub h-sub" style={{ animationDelay: '0.72s' }}>
            Soluții adaptate pentru sectorul public și privat — modele de lucru conforme legislației,
            asistență tehnică de specialitate și documentații complete.
          </p>
          <div className="hero-actions h-actions" style={{ animationDelay: '0.92s', justifyContent: 'center' }}>
            <button className="btn btn-primary" onClick={() => go('servicii')}>
              Descoperă serviciile
            </button>
            <button className="btn btn-ghost" onClick={() => go('contact')}>
              Solicită ofertă
            </button>
          </div>
        </div>
      </section>

      {/* ── STATS STRIP ── */}
      <div className="stats-strip">
        <div className="container" style={{ padding: 0 }}>
          <div className="stats-strip-inner">
            {[
              { to: 15,  suffix: '+', lbl: 'Ani în achiziții publice',  det: 'experiență acumulată' },
              { to: 500, suffix: '+', lbl: 'Ore consultanță/an',        det: 'unu la unu' },
              { to: 90,  suffix: '%', lbl: 'Reducere erori umane',      det: 'prin standardizare' },
              { to: 3,   suffix: '',  lbl: 'Formate de lucru',          det: 'Excel · Word · PDF' },
            ].map((s, i) => (
              <div key={i} className="stat-col">
                <div className="s-num">
                  <CountUp to={s.to} suffix={s.suffix} />
                </div>
                <div className="s-lbl">{s.lbl}</div>
                <div className="s-det">{s.det}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── TRUST STRIP ── */}
      <div className="trust-strip">
        <div className="container">
          <div className="trust-inner">
            {[
              'Conform legislației în vigoare',
              'Actualizat constant',
              'Aplicabilitate directă',
              'Asistență tehnică inclusă',
              'Excel · Word · PDF inteligent',
            ].map((t, i) => (
              <div key={i} className="trust-item">
                <span className="trust-dot"></span>
                <span>{t}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── PAIN / SOLUTION ── */}
      {/* ── CHALLENGES & SOLUTIONS ── */}
      <section className="sec sec-white">
        <div className="container">
          <FadeUp>
            <div style={{ textAlign: 'center', marginBottom: '48px' }}>
              <div className="badge" style={{ marginBottom: '14px' }}>Context operațional</div>
              <h2>Provocări frecvente în domeniu</h2>
              <p style={{ maxWidth: '560px', margin: '12px auto 0', fontSize: '15px' }}>
                Mediul administrativ și de achiziții publice generează, în mod obiectiv, o serie de dificultăți recurente ce pot afecta eficiența instituțională.
              </p>
            </div>
          </FadeUp>
          <div className="challenges-grid">
            {[
              {
                num: '01',
                problem: 'Documentații cu lacune procedurale',
                problemDesc: 'Absența unor elemente obligatorii în documentații generează vulnerabilități juridice și riscuri de contestație.',
                solution: 'Modele integral verificate juridic',
                solutionDesc: 'Fiecare instrument respectă cerințele legale în vigoare, reducând expunerea instituțională la erori procedurale.',
              },
              {
                num: '02',
                problem: 'Inconsistențe generate de procesarea manuală',
                problemDesc: 'Redactarea manuală a documentelor standardizate este susceptibilă la erori repetitive și neuniformitate în aplicare.',
                solution: 'Standardizare și automatizare',
                solutionDesc: 'Modelele structurate elimină variabilitatea umană, asigurând uniformitate și o rată de eroare redusă cu până la 90%.',
              },
              {
                num: '03',
                problem: 'Cadru legislativ în continuă evoluție',
                problemDesc: 'Modificările frecvente ale legislației impun actualizarea constantă a documentelor și procedurilor aplicabile.',
                solution: 'Actualizare permanentă',
                solutionDesc: 'Instrumentele INFORMS sunt revizuite și actualizate în concordanță cu orice modificare legislativă relevantă.',
              },
              {
                num: '04',
                problem: 'Resurse temporale alocate documentației',
                problemDesc: 'Elaborarea documentelor de rutină consumă resurse semnificative ce ar putea fi direcționate spre activități cu valoare adăugată superioară.',
                solution: 'Eficiență operațională imediată',
                solutionDesc: 'Aplicabilitatea directă a instrumentelor reduce substanțial timpul alocat documentației administrative.',
              },
            ].map((item, i) => (
              <FadeUp key={i} delay={i * 80}>
                <div className="challenge-card">
                  <div className="challenge-num">{item.num}</div>
                  <div className="challenge-body">
                    <div className="challenge-problem">
                      <div className="challenge-tag challenge-tag-problem">Provocare</div>
                      <h4>{item.problem}</h4>
                      <p>{item.problemDesc}</p>
                    </div>
                    <div className="challenge-arrow">→</div>
                    <div className="challenge-solution">
                      <div className="challenge-tag challenge-tag-solution">Abordare INFORMS</div>
                      <h4>{item.solution}</h4>
                      <p>{item.solutionDesc}</p>
                    </div>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
          <FadeUp delay={320}>
            <div style={{ textAlign: 'center', marginTop: '40px' }}>
              <button className="btn btn-primary" onClick={() => go('contact')}>
                Solicită o consultare
              </button>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ── FEATURE STRIP ── */}
      <div className="feat-strip">
        <div className="container" style={{ padding: 0 }}>
          <div className="feat-grid">
            {features.map((f, i) => (
              <div key={i} className="feat-item">
                <div className="feat-icon">{f.icon}</div>
                <div>
                  <h4>{f.title}</h4>
                  <p>{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* u2500u2500 DOMAINS u2500u2500 */}
      <section className="sec dom-section">
        <div className="container">
          <FadeUp>
            <div style={{ textAlign: 'center', marginBottom: '56px' }}>
              <div className="badge badge-white" style={{ marginBottom: '16px' }}>Domenii de activitate</div>
              <h2 style={{ color: '#fff' }}>Expertiză în domenii-cheie</h2>
              <p style={{ color: 'rgba(255,255,255,.58)', maxWidth: '520px', margin: '14px auto 0', fontSize: '15px', lineHeight: 1.75 }}>
                Peste 15 ani de experiență concentrată în domeniile cu cel mai mare impact pentru administrația publică.
              </p>
            </div>
          </FadeUp>
          <div className="dom-grid">
            {domains.map((d, i) => (
              <FadeUp key={i} delay={i * 80}>
                <div className="dom-card">
                  <div className="dom-card-top">
                    <div className="dom-icon">{d.icon}</div>
                    <span className="dom-num">{d.num}</span>
                  </div>
                  <h3 className="dom-title">{d.label}</h3>
                  <p className="dom-desc">{d.desc}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section className="sec sec-pale">
        <div className="container">
          <FadeUp>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '40px', flexWrap: 'wrap', gap: '16px' }}>
              <div>
                <div className="badge" style={{ marginBottom: '14px' }}>Ce oferim</div>
                <h2>Serviciile noastre</h2>
              </div>
              <button className="btn btn-outline btn-sm" onClick={() => go('servicii')}>
                Toate serviciile <IcoArrow />
              </button>
            </div>
          </FadeUp>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
            {[
              { icon: <IcoChart />,    title: 'Documentații complete',          desc: 'Achiziții publice, administrație, delegare servicii, management documente.',           items: ['Instituții publice', 'Companii', 'Liber-profesioniști'] },
              { icon: <IcoFile />,     title: 'Instrumente de lucru specifice',  desc: 'Instrumente avansate pentru eficientizarea și standardizarea oricărei activități.', items: ['Analiză cost-beneficiu', 'Studiu de oportunitate', 'Documentații de atribuire'] },
              { icon: <IcoUsers />,    title: 'Asistență tehnică de specialitate', desc: 'Digitalizarea instituțiilor publice și companiilor private. Excel, Word, PDF.',   items: ['Instruire personal', 'Implementare asistată', 'Actualizări legislative'] },
            ].map((s, i) => (
              <FadeUp key={i} delay={i * 90}>
                <div className="card" style={{ padding: '28px', height: '100%', display: 'flex', flexDirection: 'column' }}>
                  <div style={{ width: 44, height: 44, borderRadius: '10px', background: 'var(--blue-lt)', color: 'var(--blue-a)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '18px' }}>
                    {s.icon}
                  </div>
                  <h3 style={{ marginBottom: '10px' }}>{s.title}</h3>
                  <p style={{ fontSize: '13.5px', color: 'var(--text-2)', lineHeight: '1.72', marginBottom: '18px', flex: 1 }}>{s.desc}</p>
                  <ul className="bullet-list">
                    {s.items.map((item, j) => <li key={j}><span className="bullet-dot"></span>{item}</li>)}
                  </ul>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── WORK MODELS ── */}
      <section className="sec sec-white">
        <div className="container">
          <FadeUp>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '40px', flexWrap: 'wrap', gap: '16px' }}>
              <div>
                <div className="badge" style={{ marginBottom: '14px' }}>Instrumente de lucru</div>
                <h2>Asigură o imagine clară activității tale</h2>
                <p style={{ fontSize: '1rem', color: 'var(--text-2)', marginTop: '10px' }}>Eficientizarea a devenit regula de bază, iar timpul — un bun personal.</p>
              </div>
            </div>
          </FadeUp>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '18px' }}>
            {models.map((m, i) => (
              <FadeUp key={i} delay={i * 65}>
                <div className="model-card" onClick={() => go(m.page)}>
                  <div className="model-card-img">
                    <img src={m.img} alt={m.title} loading="lazy" onError={(e) => { e.target.style.display = 'none'; }} />
                  </div>
                  <div className="model-card-body">
                    <h3>{m.title}</h3>
                    <p>{m.desc}</p>
                    <span className="card-link">Detalii <IcoArrow /></span>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── OBJECTIVES ── */}
      <section className="sec obj-section">
        <video className="obj-section-vid" autoPlay muted loop playsInline>
          <source src="assets/videos_library/digitalizare-SEAP-contract.mp4" type="video/mp4" />
        </video>
        <div className="container">
          <FadeUp>
            <div style={{ textAlign: 'center', marginBottom: '0' }}>
              <div className="badge" style={{ marginBottom: '14px' }}>Obiective</div>
              <h2 style={{ color: '#fff' }}>Obiectivele urmărite</h2>
            </div>
          </FadeUp>
          <div className="obj-grid">
            {objectives.map((o, i) => (
              <FadeUp key={i} delay={i * 110}>
                <div className="obj-item obj-item-dark">
                  <div className="obj-num">{o.num}</div>
                  <h3 style={{ color: '#fff' }}>{o.title}</h3>
                  <p style={{ color: 'rgba(255,255,255,.72)' }}>{o.desc}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── CE FACEM ── */}
      <section className="sec sec-white">
        <div className="container">
          <FadeUp>
            <div style={{ marginBottom: '44px' }}>
              <div className="badge" style={{ marginBottom: '14px' }}>Portofoliu servicii</div>
              <h2>Ce facem la INFORMS</h2>
            </div>
          </FadeUp>
          <div className="ce-facem-wrap">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              {services.map((s, i) => (
                <div key={i} className={`svc-item${activeSvc === i ? ' active' : ''}`} onClick={() => setActiveSvc(i)}>
                  <span className="svc-num">0{i + 1}</span>
                  <div style={{ flex: 1 }}>
                    <div className="svc-title">{s.title}</div>
                    <div className="svc-desc">{s.desc}</div>
                    {activeSvc === i && (
                      <span className="svc-cta-link" onClick={(e) => { e.stopPropagation(); go(s.page); }}>
                        Detalii complete <IcoArrow />
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <div className="svc-img-panel">
              <img src={services[activeSvc].img} alt={services[activeSvc].title} onError={(e) => { e.target.style.display = 'none'; }} />
            </div>
          </div>
        </div>
      </section>

      {/* ── PROCESS ── */}
      <section className="sec proc-section">
        <div className="container">
          <FadeUp>
            <div style={{ textAlign: 'center' }}>
              <p className="badge" style={{ marginBottom: '14px' }}>Cum lucrăm</p>
              <h2>Un proces simplu, rezultate clare</h2>
              <p className="lead" style={{ maxWidth: 520, margin: '12px auto 0' }}>
                De la prima discuție până la implementarea completă — fiecare pas este structurat și transparent.
              </p>
            </div>
          </FadeUp>
          <div className="process-grid">
            {[
              { num: '01', title: 'Analizăm',     desc: 'Înțelegem situația, obiectivele și cerințele specifice ale activității tale' },
              { num: '02', title: 'Elaborăm',     desc: 'Creăm sau adaptăm documentațiile conform nevoilor și legislației în vigoare' },
              { num: '03', title: 'Implementăm',  desc: 'Te însoțim pas cu pas în aplicarea corectă a instrumentelor de lucru' },
              { num: '04', title: 'Actualizăm',   desc: 'Documentele rămân permanent conforme cu modificările legislative' },
            ].map((s, i) => (
              <FadeUp key={i} delay={i * 90}>
                <div className="proc-step">
                  <div className="proc-num">{s.num}</div>
                  <h4>{s.title}</h4>
                  <p>{s.desc}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── QUOTE / CTA ── */}
      <section className="sec sec-pale">
        <div className="container">
          <FadeUp>
            <div className="quote-card">
              <blockquote className="quote-text">
                Există un singur tip de succes – acela de a-ți putea petrece timpul așa cum îți dorești.
              </blockquote>
              <p className="quote-author">Christopher Morley</p>
              <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
                <button className="btn btn-primary" style={{ fontSize: '15px', padding: '13px 36px' }} onClick={() => go('contact')}>
                  Contactează-ne
                </button>
                <button className="btn btn-ghost" style={{ fontSize: '15px', padding: '13px 36px' }} onClick={() => go('servicii')}>
                  Descoperă serviciile
                </button>
              </div>
            </div>
          </FadeUp>
        </div>
      </section>
    </>
  );
}

Object.assign(window, { HomePage });
