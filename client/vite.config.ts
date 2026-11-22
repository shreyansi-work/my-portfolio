import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// In development the Vite dev server proxies /api to the Express server (port 5000),
// so the browser only talks to one origin and no CORS setup is needed.
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    port: 5173,
    proxy: { '/api': 'http://localhost:5000' },
  },
  build: { outDir: 'dist', sourcemap: false },
});
