const { useState, useEffect } = React;

const SERVICE_PAGES = ['analiza-si-solutii', 'achizitii-publice', 'delegare-servicii', 'modele-excel', 'modele-word', 'modele-pdf'];
const POLICY_PAGES  = ['politica-confidentialitate', 'termeni-si-conditii'];

function App() {
  const [page, setPage] = useState('home');
  const [fading, setFading] = useState(false);
  const [displayPage, setDisplayPage] = useState('home');

  const navigate = (newPage) => {
    if (newPage === displayPage) return;
    setFading(true);
    setTimeout(() => {
      setDisplayPage(newPage);
      setPage(newPage);
      setFading(false);
    }, 220);
  };

  const renderPage = () => {
    if (SERVICE_PAGES.includes(displayPage)) {
      return <ServiceDetailPage onNav={navigate} service={displayPage} />;
    }
    if (POLICY_PAGES.includes(displayPage)) {
      return <PolicyPage onNav={navigate} type={displayPage} />;
    }
    switch (displayPage) {
      case 'home':               return <HomePage onNav={navigate} />;
      case 'despre-noi':         return <AboutPage onNav={navigate} />;
      case 'contact':            return <ContactPage onNav={navigate} />;
      case 'servicii':           return <ServicesPage onNav={navigate} />;
      case 'materiale-gratuite': return <MaterialeGratuitePage onNav={navigate} />;
      default:                   return <HomePage onNav={navigate} />;
    }
  };

  return (
    <div>
      <Nav onNav={navigate} page={page} />
      <main style={{ opacity: fading ? 0 : 1, transition: 'opacity 0.22s ease', minHeight: '60vh' }}>
        {renderPage()}
      </main>
      <Footer onNav={navigate} />
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
