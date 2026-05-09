import { defineCollection, type ImageFunction } from "astro:content";
import { glob, file } from "astro/loaders";
import { z } from "astro/zod";
import {
  baseSchema,
  blogSchema,
  configSchema,
  faqSchema,
  heroSchema,
  highlightSchema,
  imageMetadataSchema,
  linkSchema,
  pageSchema,
  projectSchema,
  trackSchema,
} from "./content/schemas";
import { techSchema } from "./content/schemas/techSchema";

const config = defineCollection({
  loader: glob({ pattern: "site-config.yml", base: "./src/config" }),
  schema: ({ image }) => configSchema(image),
});

const audioTracks = defineCollection({
  loader: glob({ pattern: "*.yml", base: "./src/content/audio-tracks" }),
  schema: trackSchema,
});
const videoTracks = defineCollection({
  loader: glob({ pattern: "*.yml", base: "./src/content/video-tracks" }),
  schema: trackSchema,
});

const indexPage = defineCollection({
  loader: glob({ pattern: "index.yml", base: "./src/content/pages" }),
  schema: ({ image }) =>
    pageSchema(image).extend({
      hero: heroSchema(image),
      about: z.object({
        title: z.string(),
        description: z.string(),
      }),
      carouselImages: z.array(imageMetadataSchema(image)),
      highlights: z.array(highlightSchema),
    }),
});

const aboutPage = defineCollection({
  loader: glob({ pattern: "about.yml", base: "./src/content/pages" }),
  schema: ({ image }) =>
    pageSchema(image).extend({
      featuredImage: imageMetadataSchema(image),
      faq: z.object({
        title: z.string(),
        subtitle: z.string(),
        sections: z.array(faqSchema),
      }),
      content: z.string(),
      chess: baseSchema.extend({
        content: z.string().optional(),
      }),
    }),
});

const contactPage = defineCollection({
  loader: glob({ pattern: "contact.yml", base: "./src/content/pages" }),
  schema: ({ image }) =>
    pageSchema(image).extend({
      content: z.string(),
      socials: z.array(z.string()),
      image: imageMetadataSchema(image),
    }),
});

const blog = defineCollection({
  loader: glob({ pattern: "*.md", base: "./src/content/blog" }),
  schema: ({ image }) => blogSchema(image),
});

const technologies = defineCollection({
  loader: file("./src/content/technologies.yml"),
  schema: techSchema,
});

const blogCategories = defineCollection({
  loader: file("./src/content/blog/categories.yml"),
  schema: z.object({ id: z.string(), icon: z.string() }),
});

const projects = defineCollection({
  loader: glob({ pattern: "*.md", base: "./src/content/projects" }),
  schema: ({ image }) => projectSchema(image),
});

const projectsPage = defineCollection({
  loader: glob({ pattern: "projects.yml", base: "./src/content/pages" }),
  schema: ({ image }) => pageSchema(image).extend({
    content: z.string(),
    links: z.array(linkSchema).optional(),
  }),
});

const blogPage = defineCollection({
  loader: glob({ pattern: "blog.yml", base: "./src/content/pages" }),
  schema: ({ image }) => pageSchema(image),
});

const sectionSchema = (image: ImageFunction) =>
  z.object({
    title: z.string(),
    content: z.string(),
    image: imageMetadataSchema(image).optional(),
    links: z.array(linkSchema).optional(),
  });

const musicPage = defineCollection({
  loader: glob({ pattern: "music.yml", base: "./src/content/pages" }),
  schema: ({ image }) =>
    pageSchema(image).extend({
      bio: sectionSchema(image),
      album: sectionSchema(image),
      // media: sectionSchema(image),
    }),
});

export const collections = {
  aboutPage,
  audioTracks,
  blog,
  blogCategories,
  blogPage,
  config,
  contactPage,
  indexPage,
  musicPage,
  projects,
  projectsPage,
  technologies,
  videoTracks,
};
