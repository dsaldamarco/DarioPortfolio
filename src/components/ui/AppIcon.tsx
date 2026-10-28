import React from 'react';

interface AppIconProps {
  src: string;
  size: number | string;
  inset?: boolean;
  eager?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

export const AppIcon: React.FC<AppIconProps> = ({ src, size, inset, eager, className = '', style }) => (
  <span
    className={`app-icon ${inset ? 'app-icon--inset' : ''} ${className}`}
    style={{ width: size, ...style }}
  >
    <img src={src} alt="" width="256" height="256" loading={eager ? 'eager' : 'lazy'} decoding="async" />
  </span>
);
