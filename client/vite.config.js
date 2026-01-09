import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { writeFileSync } from 'fs';
import { join } from 'path';

export default defineConfig({
  plugins: [
    react(),
    {
      name: 'add-nojekyll',
      closeBundle() {
        const distPath = join(__dirname, 'dist');
        writeFileSync(join(distPath, '.nojekyll'), '');
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
