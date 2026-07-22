import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const rootDir = path.resolve(__dirname, '..');
const distDir = path.join(rootDir, 'dist');
const indexPath = path.join(distDir, 'index.html');

if (!fs.existsSync(indexPath)) {
  console.error("Error: dist/index.html not found! Run build first.");
  process.exit(1);
}

// Routes to duplicate for static hosting fallback
const routes = [
  'you-can-only/support',
  'you-can-only/privacy',
  'projects/orbys-adventure',
  'case-study/orbys-adventure'
];

routes.forEach((route) => {
  const routeDir = path.join(distDir, route);
  fs.mkdirSync(routeDir, { recursive: true });
  fs.copyFileSync(indexPath, path.join(routeDir, 'index.html'));
  console.log(`Copied index.html to fallback route: ${route}`);
});

console.log("Postbuild static routing fallbacks created successfully!");
