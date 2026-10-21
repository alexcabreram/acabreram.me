// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { rename, rmdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

// https://astro.build/config
export default defineConfig({
  site: 'https://acabreram.com',
  // Astro 7 defaults to 'jsx' whitespace handling; keep the Astro 6 behaviour so inline text keeps its spaces.
  compressHTML: true,
  vite: {
    plugins: [tailwindcss()]
  },
  integrations: [
    mdx(),
    sitemap({ filter: (page) => !/\/404\/?$/.test(page) }),
    {
      // Cloudflare Pages serves the nearest 404.html up the tree, so /es/* needs dist/es/404.html (Astro emits es/404/index.html).
      name: 'es-404',
      hooks: {
        'astro:build:done': async ({ dir }) => {
          const out = fileURLToPath(dir);
          await rename(`${out}es/404/index.html`, `${out}es/404.html`);
          await rmdir(`${out}es/404`);
        },
      },
    },
  ]
});