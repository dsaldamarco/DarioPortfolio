import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// Served at dariosaldamarco.com/tools/holo-card/ — the portfolio's root build
// outputs this app into dist/tools/holo-card (see the root package.json).
export default defineConfig({
  base: '/tools/holo-card/',
  plugins: [react(), tailwindcss()],
});
