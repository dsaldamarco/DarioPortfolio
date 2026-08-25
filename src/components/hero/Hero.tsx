import React, { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLanguage } from '../../i18n/LanguageContext';
import { HeroCanvas3D } from './HeroCanvas3D';

interface HeroProps {
  onExploreClick: () => void;
  onContactClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreClick, onContactClick }) => {
  const { t, language } = useLanguage();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isIt = language === 'it';

  // Animation configurations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.95,
        ease: [0.16, 1, 0.3, 1] as const, // easeOutExpo
      },
    },
  };

  return (
    <section id="about" className="hero-section">
      {/* 3D WebGL Plexus Background Canvas */}
      <HeroCanvas3D />

      {/* Shadow Vignette for readability */}
      <div className="hero-vignette"></div>

      <div className="container hero-container">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="hero-content-stack"
        >
          {/* Identity Header */}
          <motion.div variants={itemVariants} className="hero-profile-header">
            <div className={`hero-avatar-frame ${scrolled ? 'hidden' : ''}`}>
              <img src="/favicon.png" alt="Dario Saldamarco" className="hero-avatar-img" />
              <span className="hero-avatar-status"></span>
            </div>
          </motion.div>

          {/* Typography Manifesto Title */}
          <h1 className="hero-title-v2">
            <span className="word-reveal-wrapper">
              <motion.span 
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.8, delay: 0.25, ease: [0.16, 1, 0.3, 1] as const }}
                className="word-reveal sans-bold"
              >
                DARIO
              </motion.span>
            </span>{" "}
            <span className="word-reveal-wrapper">
              <motion.span 
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] as const }}
                className="word-reveal sans-bold"
              >
                SALDAMARCO
              </motion.span>
            </span>
            <br />
            <span className="word-reveal-wrapper">
              <motion.span 
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.8, delay: 0.55, ease: [0.16, 1, 0.3, 1] as const }}
                className="word-reveal serif-ital"
              >
                UX/UI Designer
              </motion.span>
            </span>
          </h1>

          {/* Editorial Subtitle Bio */}
          <motion.p variants={itemVariants} className="hero-subtitle-v2">
            {isIt 
              ? 'UX/UI Designer e sviluppatore creativo, diplomato all’Apple Developer Academy. Unisco ricerca utente, design system e prototipazione interattiva per realizzare prodotti digitali che bilanciano estetica, usabilità e logica tecnologica.'
              : 'UX/UI Designer & Creative Developer, Apple Developer Academy alumni. Fusing user research, modular design systems, and interactive prototyping to build digital products at the intersection of aesthetic refinement and technical logic.'}
          </motion.p>

          {/* CTAs */}
          <motion.div variants={itemVariants} className="hero-cta-group-v2">
            <button onClick={onExploreClick} className="btn-v2-primary">
              <span>{t.hero.ctaWork}</span>
              <ArrowRight size={15} />
            </button>
            <button onClick={onContactClick} className="btn-v2-text">
              <span>{t.hero.ctaContact}</span>
            </button>
          </motion.div>
        </motion.div>
      </div>

      <style>{`
        .hero-section {
          min-height: 100vh;
          padding-top: 10rem;
          padding-bottom: 6rem;
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: left;
          width: 100%;
          box-sizing: border-box;
          position: relative;
          overflow: hidden;
          background: var(--bg-primary);
          z-index: 1;
        }

        .hero-vignette {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: radial-gradient(circle at 50% 50%, rgba(120, 120, 120, 0.05) 0%, var(--bg-primary) 90%);
          z-index: 1;
          pointer-events: none;
        }

        .hero-container {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          max-width: var(--max-width);
          width: 100%;
          z-index: 2;
        }

        .hero-content-stack {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          max-width: 960px;
          width: 100%;
        }

        /* Profile details */
        .hero-profile-header {
          display: flex;
          align-items: center;
          gap: 1.25rem;
          margin-bottom: 2.5rem;
          transition: gap 0.45s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .hero-profile-header:has(.hero-avatar-frame.hidden) {
          gap: 0px;
        }

        .hero-avatar-frame {
          position: relative;
          width: 88px;
          height: 88px;
          border-radius: 50%;
          padding: 2.5px;
          background: linear-gradient(135deg, var(--accent-primary) 0%, #8b5cf6 100%);
          box-shadow: 0 10px 25px rgba(124, 58, 237, 0.2);
          display: flex;
          align-items: center;
          justify-content: center;
          transition: width 0.45s cubic-bezier(0.16, 1, 0.3, 1),
                      height 0.45s cubic-bezier(0.16, 1, 0.3, 1),
                      opacity 0.45s ease,
                      transform 0.45s cubic-bezier(0.16, 1, 0.3, 1),
                      margin-right 0.45s cubic-bezier(0.16, 1, 0.3, 1),
                      padding 0.45s cubic-bezier(0.16, 1, 0.3, 1);
          flex-shrink: 0;
          opacity: 1;
          transform: scale(1);
        }

        .hero-avatar-frame.hidden {
          opacity: 0;
          transform: scale(0.3) translateY(-30px);
          width: 0px;
          height: 0px;
          margin-right: 0px;
          padding: 0px;
          pointer-events: none;
        }

        .hero-avatar-img {
          width: 100%;
          height: 100%;
          border-radius: 50%;
          object-fit: cover;
          background: #050507;
          border: 3px solid #050507;
        }

        .hero-avatar-status {
          position: absolute;
          bottom: 4px;
          right: 4px;
          width: 12px;
          height: 12px;
          background: #10b981;
          border: 3px solid #050507;
          border-radius: 50%;
          box-shadow: 0 0 8px #10b981;
        }

        .badge-editorial-v2 {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.4rem 1rem;
          border-radius: var(--radius-full);
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.06);
          font-family: monospace, Courier, monospace;
          font-size: 0.75rem;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--text-primary);
        }

        .badge-icon {
          color: var(--accent-primary);
        }

        /* Editorial Title */
        .hero-title-v2 {
          margin-bottom: 2rem;
          font-family: 'Fraunces', Georgia, serif;
          font-size: clamp(2.4rem, 6.2vw, 5.25rem);
          line-height: 1.05;
          letter-spacing: -0.03em;
          color: var(--text-primary);
          max-width: 940px;
          font-weight: 400;
        }

        .serif-ital {
          font-family: 'Fraunces', Georgia, serif;
          font-style: italic;
          font-weight: 300;
          color: #a78bfa;
        }

        .word-reveal-wrapper {
          display: inline-block;
          overflow: hidden;
          vertical-align: bottom;
          line-height: 1.1;
        }

        .word-reveal {
          display: inline-block;
          will-change: transform;
        }

        .sans-bold {
          font-family: var(--font-primary);
          font-weight: 700;
          color: var(--text-primary);
        }

        .hero-subtitle-v2 {
          max-width: 740px;
          margin-bottom: 3.5rem;
          font-size: clamp(1.05rem, 1.2vw + 0.35rem, 1.25rem);
          color: var(--text-secondary);
          line-height: 1.65;
          font-weight: 400;
        }

        /* CTAs */
        .hero-cta-group-v2 {
          display: flex;
          align-items: center;
          gap: 2rem;
        }

        .btn-v2-primary {
          display: inline-flex;
          align-items: center;
          gap: 0.65rem;
          padding: 1.1rem 2.5rem;
          border-radius: 4px;
          font-size: 0.9375rem;
          font-weight: 600;
          background: var(--text-primary);
          color: var(--text-inverse);
          border: none;
          box-shadow: var(--shadow-sm);
          transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s ease;
        }

        .btn-v2-primary:hover {
          transform: translateY(-2px);
          box-shadow: var(--shadow-md);
        }

        .btn-v2-text {
          font-family: monospace, Courier, monospace;
          font-size: 0.875rem;
          font-weight: 600;
          letter-spacing: 0.05em;
          color: var(--text-secondary);
          position: relative;
          padding: 0.5rem 0;
          transition: color 0.3s ease;
        }

        .btn-v2-text::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 0;
          height: 1px;
          background: var(--accent-primary);
          transition: width 0.3s ease;
        }

        .btn-v2-text:hover {
          color: var(--text-primary);
        }

        .btn-v2-text:hover::after {
          width: 100%;
        }

        @media (max-width: 768px) {
          .hero-section {
            padding-top: 8rem;
            padding-bottom: 4rem;
          }
          .hero-container {
            align-items: center;
            text-align: center;
          }
          .hero-content-stack {
            align-items: center;
            text-align: center;
          }
          .hero-profile-header {
            flex-direction: column;
            gap: 1rem;
            align-items: center;
            margin-bottom: 1.5rem;
          }
          .hero-profile-header:has(.hero-avatar-frame.hidden) {
            gap: 0px;
          }
          .hero-title-v2 {
            text-align: center;
            font-size: clamp(2.2rem, 8vw, 3.4rem);
          }
          .hero-subtitle-v2 {
            text-align: center;
            font-size: 1.05rem;
            margin-bottom: 2.75rem;
          }
          .hero-cta-group-v2 {
            flex-direction: column;
            width: 100%;
            gap: 1rem;
          }
          .btn-v2-primary, .btn-v2-text {
            width: 100%;
            justify-content: center;
          }
        }
      `}</style>
    </section>
  );
};
