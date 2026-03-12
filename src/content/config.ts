import { z, defineCollection } from 'astro:content';

const timelineCollection = defineCollection({
    type: 'content',
    schema: ({ image }) => z.object({
        year: z.string(),
        date: z.date(),
        title_zh: z.string(),
        title_en: z.string(),
        description_zh: z.string(),
        description_en: z.string(),
        image: image().optional(),
    }),
});

const blogCollection = defineCollection({
    type: 'content',
    schema: ({ image }) => z.object({
        title_zh: z.string(),
        title_en: z.string(),
        description_zh: z.string(),
        description_en: z.string(),
        pubDate: z.date(),
        draft: z.boolean().optional(),
        image: image().optional(),
    }),
});

export const collections = {
    'timeline': timelineCollection,
    'blog': blogCollection,
};
