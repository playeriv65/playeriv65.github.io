import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const timeline = defineCollection({
    loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/timeline" }),
    schema: z.object({
        year: z.string(),
        date: z.coerce.date(),
        title_zh: z.string(),
        title_en: z.string(),
        description_zh: z.string(),
        description_en: z.string(),
        image: z.string().optional(),
    }),
});

const blog = defineCollection({
    loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/blog" }),
    schema: z.object({
        title_zh: z.string(),
        title_en: z.string(),
        description_zh: z.string(),
        description_en: z.string(),
        pubDate: z.coerce.date(),
        draft: z.boolean().optional(),
        image: z.string().optional(),
    }),
});

export const collections = { timeline, blog };
