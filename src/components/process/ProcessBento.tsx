import React from 'react';
import { Compass } from 'lucide-react';

export const ProcessBento: React.FC = () => {
  return (
    <section id="process" className="process-section">
      <div className="container">
        {/* Header */}
        <div className="section-header">
          <div className="badge badge-apple">
            <Compass size={14} />
            <span>Methodology</span>
          </div>
          <h2 className="section-title">Product Design & Engineering Loop</h2>
          <p className="section-desc">
            Bridging human-centered UX design with production-ready code. Every product is crafted through continuous iteration, spatial thinking, and Apple design standards.
          </p>
        </div>

        {/* Bento Box */}
        <div className="bento-container">
          <div className="bento-item glass-panel bento-large">
            <div className="bento-badge">01. DISCOVER & DEFINE</div>
            <h3>Human-Centered Research</h3>
            <p>
              Uncovering user friction, cognitive roadblocks, and market gaps through qualitative field interviews, persona mapping, and task analysis.
            </p>
            <div className="bento-tags">
              <span>User Journeys</span>
              <span>Wireframing</span>
              <span>Information Architecture</span>
            </div>
          </div>

          <div className="bento-item glass-panel">
            <div className="bento-badge">02. PROTOTYPE</div>
            <h3>Spatial & Interaction Design</h3>
            <p>
              Designing intuitive touch interfaces, dynamic motion curves, and glanceable micro-interactions in Figma.
            </p>
            <div className="bento-tags">
              <span>Figma</span>
              <span>Apple HIG</span>
              <span>Micro-Interactions</span>
            </div>
          </div>

          <div className="bento-item glass-panel">
            <div className="bento-badge">03. ENGINEER</div>
            <h3>Swift & Web Development</h3>
            <p>
              Translating design systems into performant code using Swift, SwiftUI, SpriteKit, and modern React TypeScript.
            </p>
            <div className="bento-tags">
              <span>SwiftUI</span>
              <span>SpriteKit</span>
              <span>React 19</span>
            </div>
          </div>

          <div className="bento-item glass-panel bento-large">
            <div className="bento-badge">04. ITERATE & REFINE</div>
            <h3>Accessibility & Ecosystem Handoff</h3>
            <p>
              Ensuring high contrast standards (WCAG AAA), haptic feedback loops, and smooth multi-device ecosystem integration across iPhone, Mac, and Apple Watch.
            </p>
            <div className="bento-tags">
              <span>WatchOS Synergy</span>
              <span>Haptics</span>
              <span>Accessibility</span>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .process-section {
          padding: var(--section-padding);
          background: rgba(255, 255, 255, 0.01);
        }

        .bento-container {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.5rem;
        }

        .bento-item {
          padding: 2rem;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          gap: 1rem;
        }

        .bento-large {
          grid-column: span 2;
        }

        .bento-badge {
          font-size: 0.75rem;
          font-weight: 700;
          letter-spacing: 0.05em;
          color: var(--accent-apple);
        }

        .bento-item h3 {
          font-size: 1.35rem;
          margin-bottom: 0.25rem;
        }

        .bento-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
          margin-top: 0.5rem;
        }

        .bento-tags span {
          font-size: 0.75rem;
          font-weight: 500;
          padding: 0.25rem 0.65rem;
          border-radius: var(--radius-full);
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid var(--border-subtle);
          color: var(--text-secondary);
        }

        @media (max-width: 900px) {
          .bento-container {
            grid-template-columns: 1fr;
          }
          .bento-large {
            grid-column: span 1;
          }
        }
      `}</style>
    </section>
  );
};
