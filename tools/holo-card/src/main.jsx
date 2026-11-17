import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { installNoiseTextures } from './lib/noise';
import './index.css';

installNoiseTextures();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
