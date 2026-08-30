import { useState, useEffect } from 'react';
import Lenis from 'lenis';
import './styles/globals.css';
import { Navbar } from './components/layout/Navbar';
import { Hero } from './components/hero/Hero';
import { ProjectGrid } from './components/showcase/ProjectGrid';
import { TimelineLedger } from './components/timeline/TimelineLedger';
import { Skills } from './components/skills/Skills';
import { RhythmGame } from './components/game/RhythmGame';
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
  const [mousePos, setMousePos] = useState({ x: -100, y: -100 });
  const [cursorType, setCursorType] = useState<'default' | 'pointer' | 'project'>('default');

  // Initialize Lenis smooth scroll
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // easeOutExpo
      smoothWheel: true,
    });

    (window as any).lenis = lenis;

    const raf = (time: number) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
      (window as any).lenis = null;
    };
  }, []);

  // Stop/Start Lenis scroll when modal is opened/closed
  useEffect(() => {
    const lenis = (window as any).lenis;
    if (lenis) {
      if (selectedProject) {
        lenis.stop();
      } else {
        lenis.start();
      }
    }
  }, [selectedProject]);

  // Custom Cursor Mouse Tracker
  useEffect(() => {
    const updateMouse = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;

      if (
        target.closest('.project-card-v2') || 
        target.closest('.screenshot-card') || 
        target.closest('.preview-media-frame')
      ) {
        setCursorType('project');
      } else if (
        target.closest('a') || 
        target.closest('button') || 
        target.classList.contains('lang-btn') ||
        target.closest('.icon-button') ||
        target.closest('.ledger-row')
      ) {
        setCursorType('pointer');
      } else {
        setCursorType('default');
      }
    };

    window.addEventListener('mousemove', updateMouse);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', updateMouse);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

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
      {/* Custom Cursor */}
      <div 
        className={`custom-cursor ${cursorType}`}
        style={{
          left: `${mousePos.x}px`,
          top: `${mousePos.y}px`
        }}
      >
        {cursorType === 'project' && <span className="cursor-label">VIEW</span>}
      </div>

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

        <TimelineLedger />

        <Skills />

        <RhythmGame />
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
