import { useEffect } from 'react';
import './styles/globals.css';
import { Navbar } from './components/layout/Navbar';
import { Home } from './components/home/Home';
import { LanguageProvider, useLanguage } from './i18n/LanguageContext';
import { usePath } from './lib/router';
import { YCOSupport } from './pages/YCOSupport';
import { YCOPrivacy } from './pages/YCOPrivacy';
import { CaseStudyPage } from './pages/CaseStudyPage';

const LEGACY_CASE_ROUTES: Record<string, string> = {
  '/case-study/orbys-adventure': 'orbys-adventure',
};

function Site() {
  const { t, language } = useLanguage();
  const path = usePath().toLowerCase().replace(/\/$/, '') || '/';

  useEffect(() => {
    if (path === '/') {
      document.title = 'Dario Saldamarco — UX/UI designer';
    }
  }, [path, language]);

  if (path === '/you-can-only/support') return <YCOSupport />;
  if (path === '/you-can-only/privacy') return <YCOPrivacy />;

  const caseId = LEGACY_CASE_ROUTES[path] ?? path.match(/^\/projects\/([a-z0-9-]+)$/)?.[1];

  return (
    <>
      <a className="skip-link" href="#main">{t.skip}</a>
      <Navbar onHome={!caseId} />
      {caseId ? <CaseStudyPage id={caseId} /> : <Home />}
    </>
  );
}

export function App() {
  return (
    <LanguageProvider>
      <Site />
    </LanguageProvider>
  );
}

export default App;
