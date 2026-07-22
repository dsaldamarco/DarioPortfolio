import React from 'react';
import { Check } from 'lucide-react';

interface ToastProps {
  message: string | null;
  onClose?: () => void;
}

export const Toast: React.FC<ToastProps> = ({ message }) => {
  if (!message) return null;

  return (
    <div className="toast-wrapper glass-dock">
      <div className="toast-icon">
        <Check size={14} />
      </div>
      <span className="toast-message">{message}</span>

      <style>{`
        .toast-wrapper {
          position: fixed;
          bottom: 2rem;
          left: 50%;
          transform: translateX(-50%);
          z-index: 300;
          display: flex;
          align-items: center;
          gap: 0.65rem;
          padding: 0.65rem 1.25rem;
          border-radius: var(--radius-full);
          box-shadow: var(--shadow-lg);
          border: 1px solid var(--border-medium);
          background: var(--bg-glass-heavy);
          color: var(--text-primary);
          font-size: 0.875rem;
          font-weight: 500;
          animation: slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translate(-50%, 20px);
          }
          to {
            opacity: 1;
            transform: translate(-50%, 0);
          }
        }

        .toast-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: #10b981;
          color: #ffffff;
        }
      `}</style>
    </div>
  );
};
