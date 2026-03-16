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
      path: './public/dragon-nav.png',
      size: [60],
    },
    bgGradient: [[8, 12, 16]],
    border: {
      color: [0, 180, 216],
      width: 20,
      side: 'inline-start',
    },
    padding: 60,
    font: {
      title: {
        color: [240, 240, 245],
        size: 64,
        lineHeight: 1.2,
        weight: 'Bold',
        families: ['Inter'],
      },
      description: {
        color: [140, 150, 165],
        size: 32,
        lineHeight: 1.4,
        families: ['Inter'],
      },
    },
    fonts: [
      'https://cdn.jsdelivr.net/fontsource/fonts/inter@latest/latin-400-normal.ttf',
      'https://cdn.jsdelivr.net/fontsource/fonts/inter@latest/latin-700-normal.ttf',
    ],
  }),
});
