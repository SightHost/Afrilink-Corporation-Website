// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  // Set by the GitHub Pages workflow; locally the site is served from the root
  site: process.env.SITE_URL,
  base: process.env.BASE_PATH || '/',
  integrations: [react()],
});
