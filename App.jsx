const { useState, useEffect } = React;

const SERVICE_PAGES = ['analiza-si-solutii', 'achizitii-publice', 'delegare-servicii', 'modele-excel', 'modele-word', 'modele-pdf'];
const POLICY_PAGES  = ['politica-confidentialitate', 'termeni-si-conditii'];

const PAGE_META = {
  'home':                       { title: 'INFORMS - Formulare inteligente. Documentații complete.', desc: 'Documentații complete, formulare și instrumente de lucru inteligente, într-un format intuitiv, standard și ușor de utilizat.' },
  'despre-noi':                 { title: 'Despre noi | INFORMS', desc: '15 ani de experiență în achiziții publice, consultanță și digitalizare pentru instituții publice și companii private.' },
  'contact':                    { title: 'Contact | INFORMS', desc: 'Contactează echipa INFORMS pentru consultanță în achiziții publice, documentații și instrumente de lucru specializate.' },
  'servicii':                   { title: 'Servicii | INFORMS', desc: 'Soluții complete pentru instituții publice, companii și liber-profesioniști: achiziții publice, delegare servicii, instrumente de lucru.' },
  'analiza-si-solutii':         { title: 'Analiză și soluții personalizate | INFORMS', desc: 'Analizăm situația prezentată și oferim soluții concrete, aplicate, care răspund tuturor cerințelor și obiectivelor stabilite.' },
  'achizitii-publice':          { title: 'Achiziții publice | INFORMS', desc: 'Documentații complete pentru proceduri de achiziție publică: atribuire contracte, evaluare oferte, contestații CNSC și curți de apel.' },
  'delegare-servicii':          { title: 'Delegare servicii de utilități publice | INFORMS', desc: 'Documentații complete pentru gestiunea serviciilor de utilități publice: salubrizare, transport, iluminat public.' },
  'modele-excel':               { title: 'Modele de lucru EXCEL | INFORMS', desc: 'Instrumente avansate în format Excel pentru eficientizarea activității instituțiilor publice și companiilor private.' },
  'modele-word':                { title: 'Modele de lucru WORD | INFORMS', desc: 'Documente tipizate și formulare personalizabile în format Word pentru administrație publică și achiziții.' },
  'modele-pdf':                 { title: 'Modele PDF inteligent | INFORMS', desc: 'Formulare electronice interactive în format PDF standardizat, compatibile Adobe Acrobat.' },
  'magazin':                    { title: 'Produse digitale | INFORMS', desc: 'Documente profesionale pentru achiziții publice și sectorul public: modele Word, Excel, PDF și pachete complete.' },
  'politica-confidentialitate': { title: 'Politica de confidențialitate | INFORMS', desc: 'Informații privind modul în care INFORMS colectează, utilizează și protejează datele cu caracter personal.' },
  'termeni-si-conditii':        { title: 'Termeni și condiții | INFORMS', desc: 'Termenii și condițiile care guvernează utilizarea serviciilor INFORMS, parte a MILBAC MANAGEMENT S.R.L.' },
};

function App() {
  const [page, setPage] = useState('home');
  const [displayPage, setDisplayPage] = useState('home');
  const [shopCategory, setShopCategory] = useState('all');

  useEffect(() => {
    const meta = PAGE_META[displayPage] || PAGE_META['home'];
    document.title = meta.title;
    document.querySelector('meta[name="description"]')?.setAttribute('content', meta.desc);
    document.querySelector('meta[property="og:title"]')?.setAttribute('content', meta.title);
    document.querySelector('meta[property="og:description"]')?.setAttribute('content', meta.desc);
  }, [displayPage]);

  const navigate = (newPage, opts = {}) => {
    if (opts.category) setShopCategory(opts.category);
    else if (newPage !== 'magazin') setShopCategory('all');
    setDisplayPage(newPage);
    setPage(newPage);
  };

  const renderPage = () => {
    if (SERVICE_PAGES.includes(displayPage)) {
      return <ServiceDetailPage onNav={navigate} service={displayPage} />;
    }
    if (POLICY_PAGES.includes(displayPage)) {
      return <PolicyPage onNav={navigate} type={displayPage} />;
    }
    switch (displayPage) {
      case 'home':      return <HomePage onNav={navigate} />;
      case 'despre-noi':return <AboutPage onNav={navigate} />;
      case 'contact':   return <ContactPage onNav={navigate} />;
      case 'servicii':  return <ServicesPage onNav={navigate} />;
      case 'magazin':   return <ShopPage onNav={navigate} initialCategory={shopCategory} />;
      default:          return <HomePage onNav={navigate} />;
    }
  };

  return (
    <div>
      <VideoPreloader />
      <Nav onNav={navigate} page={page} />
      <main style={{ minHeight: '60vh' }}>
        {renderPage()}
      </main>
      <Footer onNav={navigate} page={displayPage} />
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
