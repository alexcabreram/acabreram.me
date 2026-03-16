import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET(context) {
  const enPosts = await getCollection('blog', ({ data }) => !data.draft && data.lang === 'en');
  const esPosts = await getCollection('blog', ({ data }) => !data.draft && data.lang === 'es');

  const items = [
    ...enPosts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.date,
      description: post.data.description,
      link: `/blog/${post.id}/`,
      categories: post.data.tags,
    })),
    ...esPosts.map((post) => ({
      title: `[ES] ${post.data.title}`,
      pubDate: post.data.date,
      description: post.data.description,
      link: `/es/blog/${post.id.replace('es/', '')}/`,
      categories: post.data.tags,
    })),
  ].sort((a, b) => b.pubDate.valueOf() - a.pubDate.valueOf());

  return rss({
    title: 'Alex Cabrera — Blog',
    description: 'Infrastructure, AI agents, cloud architecture, and homelab experiments.',
    site: context.site,
    items,
    customData: '<language>en</language>',
  });
}
