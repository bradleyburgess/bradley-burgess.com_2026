import type { ImageFunction } from "astro:content";
import { imageMetadataSchema } from "./imageSchema";
import { z } from "astro/zod";

export const pageSchema = (image: ImageFunction) =>
  z.object({
    title: z.string().optional(),
    description: z.string().optional(),
    ogImage: imageMetadataSchema(image).optional(),
  });
