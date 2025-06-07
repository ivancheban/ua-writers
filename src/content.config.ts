// src/content/config.ts
import { defineCollection, z } from 'astro:content';

const blogCollection = defineCollection({ // Renamed 'blog' to 'blogCollection' for clarity, though 'blog' is fine
  type: 'content', // Specify the collection type
  schema: z.object({
    title: z.string(),
    date: z.date(),
    image: z.string().optional(),      // Path to image, e.g., /uploads/image.png. Made optional.
    thumbnail: z.string().optional(),  // Path to image, e.g., /uploads/image.png. Made optional.
    author: z.string(),
    summary: z.string(),
    // Note: 'body' is handled by Astro and is not part of the frontmatter schema
  }),
});

export const collections = {
  'blog': blogCollection, // Using the collection name 'blog' as the key
};