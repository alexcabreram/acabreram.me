// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://acabreram.com',
  // Astro 7 defaults to 'jsx' whitespace handling; keep the Astro 6 behaviour so inline text keeps its spaces.
  compressHTML: true,
  vite: {
    plugins: [tailwindcss()]
  },
  integrations: [mdx(), sitemap()]
});