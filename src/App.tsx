import { useState, useEffect } from 'react';
import './styles/globals.css';
import { Navbar } from './components/layout/Navbar';
import { Hero } from './components/hero/Hero';
import { ProjectGrid } from './components/showcase/ProjectGrid';
import { Experience } from './components/experience/Experience';
import { Education } from './components/education/Education';
import { Skills } from './components/skills/Skills';
import { Footer } from './components/layout/Footer';
import { CaseStudyModal } from './components/casestudy/CaseStudyModal';
import { Toast } from './components/ui/Toast';
import { type Project, PROFILE } from './data/projects';
import { LanguageProvider, useLanguage } from './i18n/LanguageContext';
import { YCOSupport } from './pages/YCOSupport';
import { YCOPrivacy } from './pages/YCOPrivacy';
import { OrbyCaseStudy } from './pages/OrbyCaseStudy';

function PortfolioAppContent() {
  const { t } = useLanguage();
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PROFILE.links.email);
    showToast(t.contact.emailCopied);
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  const handleExploreClick = () => {
    const el = document.getElementById('projects');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleContactClick = () => {
    const el = document.getElementById('contact');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  // Route matching
  const normalizedPath = currentPath.toLowerCase().replace(/\/$/, '');

  if (normalizedPath === '/you-can-only/support') {
    return <YCOSupport />;
  }

  if (normalizedPath === '/you-can-only/privacy') {
    return <YCOPrivacy />;
  }

  if (normalizedPath === '/projects/orbys-adventure' || normalizedPath === '/case-study/orbys-adventure') {
    return <OrbyCaseStudy />;
  }

  return (
    <div className="app-shell">
      {/* Ambient Background Mesh */}
      <div className="ambient-bg">
        <div className="ambient-glow-1"></div>
        <div className="ambient-glow-2"></div>
      </div>

      {/* Floating Header Dock */}
      <Navbar 
        theme={theme} 
        toggleTheme={toggleTheme} 
        onContactClick={handleContactClick} 
      />

      {/* Main Content */}
      <main className="main-content">
        <Hero 
          onExploreClick={handleExploreClick} 
          onContactClick={handleContactClick} 
        />

        <ProjectGrid 
          onSelectProject={(project) => setSelectedProject(project)} 
        />

        <Experience />

        <Education />

        <Skills />
      </main>

      {/* Contact & Footer */}
      <Footer onCopyEmail={handleCopyEmail} />

      {/* Case Study Modal */}
      <CaseStudyModal 
        project={selectedProject} 
        onClose={() => setSelectedProject(null)} 
      />

      {/* Feedback Toast */}
      <Toast message={toastMessage} />
    </div>
  );
}

export function App() {
  return (
    <LanguageProvider>
      <PortfolioAppContent />
    </LanguageProvider>
  );
}

export default App;
