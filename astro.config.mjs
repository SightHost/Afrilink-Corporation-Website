// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  // Production domain; the GitHub Pages workflow overrides it via SITE_URL
  site: process.env.SITE_URL || 'https://afrilinkcorp.co.za',
  base: process.env.BASE_PATH || '/',
  integrations: [react()],
  // The Partner page was merged into Contact; keep old links working
  redirects: { '/partner': '/contact' },
  // During `npm run dev`, send /api calls to the local Worker (`npm run dev:api`)
  vite: {
    server: { proxy: { '/api': 'http://localhost:8787' } },
  },
});
