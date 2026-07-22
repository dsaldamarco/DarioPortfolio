import React, { useState } from 'react';

interface DeviceFrameProps {
  projectId: string;
  accentColor: string;
  folderPath: string;
  images?: string[];
  title: string;
}

export const DeviceFrame: React.FC<DeviceFrameProps> = ({ accentColor, folderPath, images, title }) => {
  const [imgError, setImgError] = useState(false);

  // Preferred main image path
  const mainImageSrc = images && images.length > 0 ? images[0] : `${folderPath}1.png`;

  return (
    <div className="device-frame-container">
      {!imgError ? (
        <div className="media-image-wrapper">
          <img 
            src={mainImageSrc} 
            alt={`${title} showcase preview`} 
            className="media-uncropped-img"
            onError={() => setImgError(true)}
          />
        </div>
      ) : (
        <div className="media-art-canvas" style={{ background: `linear-gradient(135deg, rgba(20,20,26,0.9) 0%, ${accentColor}18 100%)` }}>
          <div className="art-dot" style={{ background: accentColor }}></div>
        </div>
      )}

      <style>{`
        .device-frame-container {
          width: 100%;
          border-radius: var(--radius-md);
          overflow: hidden;
          background: rgba(12, 12, 16, 0.4);
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0.5rem;
          border: none;
        }

        .media-image-wrapper {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: var(--radius-sm);
          overflow: hidden;
        }

        .media-uncropped-img {
          width: 100%;
          max-height: 480px;
          object-fit: contain;
          border-radius: var(--radius-sm);
          display: block;
          transition: transform var(--transition-slow);
          border: none;
        }

        .device-frame-container:hover .media-uncropped-img {
          transform: scale(1.02);
        }

        .media-art-canvas {
          width: 100%;
          height: 240px;
          border-radius: var(--radius-sm);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .art-dot {
          width: 16px;
          height: 16px;
          border-radius: 50%;
        }
      `}</style>
    </div>
  );
};
