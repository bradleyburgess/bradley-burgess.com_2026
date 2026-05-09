import { z } from "astro/zod";
import { imageMetadataSchema } from "./imageSchema";
import { linkSchema } from "./linkSchema";
import type { ImageFunction } from "astro:content";

export const configSchema = (image: ImageFunction) =>
  z.object({
    img: imageMetadataSchema(image),
    title: z.string(),
    shortTitle: z.string(),
    description: z.string(),
    navLinks: z.array(linkSchema),
    socialLinks: z.array(linkSchema).optional(),
    defaultOgImage: imageMetadataSchema(image),
    footerLinks: z.array(linkSchema).optional(),
  });
