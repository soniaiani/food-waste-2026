import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { writeFileSync, readFileSync, existsSync } from 'fs';
import { join } from 'path';

export default defineConfig({
  plugins: [
    react(),
    {
      name: 'add-nojekyll',
      closeBundle() {
        const distPath = join(__dirname, 'dist');
        writeFileSync(join(distPath, '.nojekyll'), '');
        // Also create a 404.html for SPA routing
        const indexPath = join(distPath, 'index.html');
        if (existsSync(indexPath)) {
          const indexContent = readFileSync(indexPath, 'utf-8');
          writeFileSync(join(distPath, '404.html'), indexContent);
        }
      },
    },
  ],
  base: '/food-waste-2026/',
  server: {
    proxy: {
      '/api': 'http://localhost:3000',
    },
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
  },
});
