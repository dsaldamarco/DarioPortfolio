import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Award } from 'lucide-react';
import { useLanguage } from '../../i18n/LanguageContext';

interface LedgerItem {
  year: string;
  title: string;
  subtitle: string;
  desc: string;
  type: 'work' | 'education';
}

export const TimelineLedger: React.FC = () => {
  const { t, language } = useLanguage();
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const isIt = language === 'it';

  // Parse and merge Experience & Education items
  const ledgerItems: LedgerItem[] = [
    // Experience
    {
      year: '2025 — 2026',
      title: t.experience.items[0].role,
      subtitle: t.experience.items[0].company,
      desc: t.experience.items[0].desc,
      type: 'work',
    },
    {
      year: '2023 — ' + (isIt ? 'In corso' : 'Ongoing'),
      title: t.experience.items[1].role,
      subtitle: t.experience.items[1].company,
      desc: t.experience.items[1].desc,
      type: 'work',
    },
    {
      year: '2025',
      title: t.experience.items[2].role,
      subtitle: t.experience.items[2].company,
      desc: t.experience.items[2].desc,
      type: 'work',
    },
    {
      year: '2023 — 2024',
      title: t.experience.items[3].role,
      subtitle: t.experience.items[3].company,
      desc: t.experience.items[3].desc,
      type: 'work',
    },
    {
      year: '2022 — 2023',
      title: t.experience.items[4].role,
      subtitle: t.experience.items[4].company,
      desc: t.experience.items[4].desc,
      type: 'work',
    },
    // Education
    {
      year: '2026',
      title: t.education.items[0].role,
      subtitle: t.education.items[0].institution,
      desc: t.education.items[0].desc,
      type: 'education',
    },
    {
      year: '2025',
      title: t.education.items[1].role,
      subtitle: t.education.items[1].institution,
      desc: t.education.items[1].desc,
      type: 'education',
    },
    {
      year: '2023',
      title: t.education.items[2].role,
      subtitle: t.education.items[2].institution,
      desc: t.education.items[2].desc,
      type: 'education',
    },
    {
      year: '2022',
      title: t.education.items[3].role,
      subtitle: t.education.items[3].institution,
      desc: t.education.items[3].desc,
      type: 'education',
    },
    {
      year: '2017 — 2021',
      title: t.education.items[4].role,
      subtitle: t.education.items[4].institution,
      desc: t.education.items[4].desc,
      type: 'education',
    },
  ];

  // Helper sorting: sort primarily by end year descending
  const getSortYear = (yearStr: string): number => {
    if (yearStr.includes('In corso') || yearStr.includes('Ongoing')) return 2027;
    const parts = yearStr.split('—').map(p => p.trim());
    const end = parts[parts.length - 1];
    const parsed = parseInt(end, 10);
    return isNaN(parsed) ? 2020 : parsed;
  };

  const sortedLedger = [...ledgerItems].sort((a, b) => getSortYear(b.year) - getSortYear(a.year));

  const toggleRow = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <section id="chronology" className="ledger-section">
      <div className="container">
        {/* Editorial Section Header */}
        <motion.div 
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as const }}
          className="ledger-header"
        >
          <div className="badge-editorial ledger-badge">
            <Award size={13} />
            <span>{isIt ? 'Cronologia' : 'Chronology'}</span>
          </div>
          <h2 className="ledger-main-title">
            {isIt ? 'Il mio percorso in sintesi' : 'My journey at a glance'}
          </h2>
          <p className="ledger-desc">
            {isIt 
              ? 'Un registro unificato delle mie esperienze professionali e del mio percorso accademico nel product design.'
              : 'A unified ledger of my professional landmarks and academic milestones in digital product design.'}
          </p>
        </motion.div>

        {/* Unified Chronology Grid Table */}
        <div className="ledger-table">
          <div className="ledger-table-header">
            <span className="col-year">{isIt ? 'PERIODO' : 'PERIOD'}</span>
            <span className="col-role">{isIt ? 'RUOLO / FOCUS' : 'ROLE / FOCUS'}</span>
            <span className="col-source">{isIt ? 'ISTITUZIONE / AZIENDA' : 'ORGANIZATION'}</span>
            <span className="col-type">{isIt ? 'TIPO' : 'TYPE'}</span>
            <span className="col-action"></span>
          </div>

          <div className="ledger-rows">
            {sortedLedger.map((item, idx) => {
              const isExpanded = expandedIndex === idx;
              return (
                <div 
                  key={idx} 
                  className={`ledger-row ${isExpanded ? 'active' : ''}`}
                  onClick={() => toggleRow(idx)}
                >
                  {/* Row Summary */}
                  <div className="ledger-row-summary">
                    <span className="col-year monospace">{item.year}</span>
                    
                    <span className="col-role serif-text">{item.title}</span>
                    
                    <span className="col-source">{item.subtitle}</span>
                    
                    <span className="col-type">
                      <span className={`type-badge ${item.type}`}>
                        {item.type.toUpperCase()}
                      </span>
                    </span>

                    <span className="col-action">
                      <motion.div
                        animate={{ rotate: isExpanded ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <ChevronDown size={16} />
                      </motion.div>
                    </span>
                  </div>

                  {/* Expanded Row Detail */}
                  <AnimatePresence initial={false}>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] as const }}
                        className="ledger-row-details-wrapper"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <div className="ledger-row-details">
                          <div className="details-accent-bar" style={{ background: item.type === 'work' ? '#8b5cf6' : '#14b8a6' }}></div>
                          <div className="details-content">
                            {item.desc.split('\n\n').map((para, pIdx) => (
                              <p key={pIdx} className="details-paragraph">{para}</p>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <style>{`
        .ledger-section {
          padding: 8rem 2rem;
          width: 100%;
          box-sizing: border-box;
          background: var(--bg-primary);
          position: relative;
          z-index: 2;
        }

        .ledger-header {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          text-align: left;
          margin-bottom: 4.5rem;
          max-width: 800px;
          width: 100%;
        }

        .ledger-badge {
          background: var(--bg-card);
          border: 1px solid var(--border-subtle) !important;
          color: var(--text-primary);
          padding: 0.45rem 1rem;
        }

        .ledger-main-title {
          font-family: 'Fraunces', Georgia, serif;
          font-size: clamp(2rem, 4vw, 3rem);
          font-weight: 500;
          color: var(--text-primary);
          margin-top: 1.25rem;
          margin-bottom: 1rem;
          letter-spacing: -0.02em;
        }

        .ledger-desc {
          font-size: 1.1rem;
          color: var(--text-secondary);
          line-height: 1.6;
        }

        /* Table styles */
        .ledger-table {
          width: 100%;
          border-top: 1px solid var(--border-medium);
          display: flex;
          flex-direction: column;
        }

        .ledger-table-header {
          display: flex;
          align-items: center;
          padding: 1.25rem 1.5rem;
          border-bottom: 1px solid var(--border-medium);
          font-family: monospace, Courier, monospace;
          font-size: 0.75rem;
          letter-spacing: 0.1em;
          color: var(--text-tertiary);
          font-weight: 600;
        }

        .ledger-rows {
          display: flex;
          flex-direction: column;
        }

        .ledger-row {
          border-bottom: 1px solid var(--border-subtle);
          transition: background 0.3s ease, border-color 0.3s ease;
          cursor: pointer;
        }

        .ledger-row:hover {
          background: var(--bg-card-hover);
          border-color: var(--border-medium);
        }

        .ledger-row.active {
          background: var(--bg-card-hover);
          border-color: var(--border-bold);
        }

        .ledger-row-summary {
          display: flex;
          align-items: center;
          padding: 2rem 1.5rem;
          gap: 1.5rem;
        }

        /* Column widths */
        .col-year {
          width: 18%;
          flex-shrink: 0;
          color: var(--text-secondary);
          font-size: 0.9375rem;
        }

        .col-role {
          width: 38%;
          font-size: 1.25rem;
          font-weight: 500;
          color: var(--text-primary);
          letter-spacing: -0.01em;
        }

        .col-source {
          width: 28%;
          color: var(--text-secondary);
          font-size: 0.95rem;
        }

        .col-type {
          width: 10%;
          flex-shrink: 0;
        }

        .col-action {
          width: 6%;
          display: flex;
          justify-content: flex-end;
          color: var(--text-tertiary);
        }

        .serif-text {
          font-family: 'Fraunces', Georgia, serif;
          font-style: italic;
        }

        .monospace {
          font-family: monospace, Courier, monospace;
          letter-spacing: -0.02em;
        }

        /* Badges */
        .type-badge {
          font-family: monospace, Courier, monospace;
          font-size: 0.7rem;
          font-weight: 700;
          letter-spacing: 0.05em;
          padding: 0.2rem 0.5rem;
          border-radius: 4px;
        }

        .type-badge.work {
          background: rgba(139, 92, 246, 0.08);
          border: 1px solid rgba(139, 92, 246, 0.2);
          color: #a78bfa;
        }

        .type-badge.education {
          background: rgba(20, 184, 166, 0.08);
          border: 1px solid rgba(20, 184, 166, 0.2);
          color: #2dd4bf;
        }

        /* Expandable section details */
        .ledger-row-details-wrapper {
          overflow: hidden;
        }

        .ledger-row-details {
          display: flex;
          padding: 0 1.5rem 2.25rem 1.5rem;
          gap: 1.25rem;
        }

        .details-accent-bar {
          width: 2px;
          border-radius: 9999px;
          flex-shrink: 0;
        }

        .details-content {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          max-width: 800px;
          text-align: left;
        }

        .details-paragraph {
          font-size: 0.95rem;
          line-height: 1.6;
          color: var(--text-secondary);
        }

        @media (max-width: 900px) {
          .ledger-table-header {
            display: none;
          }
          
          .ledger-row-summary {
            flex-direction: column;
            align-items: flex-start;
            gap: 0.75rem;
            padding: 1.5rem 1rem;
          }

          .col-year, .col-role, .col-source, .col-type {
            width: 100%;
          }

          .col-year {
            font-size: 0.8rem;
          }

          .col-role {
            font-size: 1.15rem;
          }

          .col-source {
            font-size: 0.9rem;
          }

          .col-action {
            position: absolute;
            right: 1.5rem;
            top: 2.5rem;
          }

          .ledger-row-details {
            padding: 0 1rem 1.5rem 1rem;
          }
        }
      `}</style>
    </section>
  );
};
