import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
    heroImage: z.string().optional(),
    lang: z.enum(['en', 'es']).default('en'),
    /** De día (enterprise AI, Microsoft, teaching) or de noche (Seiryū, agents, homelab). Sets the post's default mode. */
    turn: z.enum(['day', 'night']).default('night'),
    series: z.string().optional(),
  }),
});

export const collections = { blog };
