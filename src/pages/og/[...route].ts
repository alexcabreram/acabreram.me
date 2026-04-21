import { getCollection } from 'astro:content';
import { OGImageRoute } from 'astro-og-canvas';

const blogEntries = await getCollection('blog', ({ data }) => !data.draft);

const pages = Object.fromEntries(
  blogEntries.map((entry) => [entry.id, entry.data])
);

export const { getStaticPaths, GET } = await OGImageRoute({
  param: 'route',
  pages,
  getImageOptions: (_path, page) => ({
    title: page.title,
    description: page.description,
    logo: {
      path: './public/seiryu-mark-cerulean.svg',
      size: [60],
    },
    bgGradient: [[4, 8, 15]],
    border: {
      color: [0, 180, 215],
      width: 20,
      side: 'inline-start',
    },
    padding: 60,
    font: {
      title: {
        color: [240, 240, 235],
        size: 56,
        lineHeight: 1.2,
        weight: 'Normal',
        families: ['DM Serif Display'],
      },
      description: {
        color: [140, 150, 165],
        size: 28,
        lineHeight: 1.4,
        families: ['JetBrains Mono'],
      },
    },
    fonts: [
      'https://cdn.jsdelivr.net/fontsource/fonts/dm-serif-display@latest/latin-400-normal.ttf',
      'https://cdn.jsdelivr.net/fontsource/fonts/jetbrains-mono@latest/latin-400-normal.ttf',
    ],
  }),
});
