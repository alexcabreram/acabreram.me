import { getCollection } from 'astro:content';
import { OGImageRoute } from 'astro-og-canvas';
import { turnLabel } from '../../lib/blog';

const blogEntries = await getCollection('blog', ({ data }) => !data.draft);

const pages = Object.fromEntries(blogEntries.map((entry) => [entry.id, entry.data]));

// OG / post cover template (DESIGN.md v2.1 §11): night background, pearl emblem,
// DM Serif title, turn + series in mono cerulean. No left accent rail.
export const { getStaticPaths, GET } = await OGImageRoute({
  param: 'route',
  pages,
  getImageOptions: (_path, page) => ({
    title: page.title,
    description: [turnLabel(page.turn, page.lang), page.series ?? page.tags[0]]
      .filter(Boolean)
      .join('  ·  ')
      .toUpperCase(),
    // Night background with the emblem watermark and the full lockup (pearl emblem + name).
    bgImage: { path: './src/assets/brand/og-background.png', fit: 'cover' },
    bgGradient: [[4, 8, 15]],
    padding: 72,
    font: {
      title: {
        color: [230, 237, 242],
        size: 64,
        lineHeight: 1.08,
        weight: 'Normal',
        families: ['DM Serif Display'],
      },
      description: {
        color: [79, 209, 236],
        size: 22,
        lineHeight: 1.6,
        families: ['JetBrains Mono'],
      },
    },
    fonts: [
      'https://cdn.jsdelivr.net/fontsource/fonts/dm-serif-display@5.2.5/latin-400-normal.ttf',
      'https://cdn.jsdelivr.net/fontsource/fonts/jetbrains-mono@5.2.5/latin-400-normal.ttf',
    ],
  }),
});
