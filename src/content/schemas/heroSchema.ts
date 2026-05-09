import { z } from "astro/zod";
import { baseSchema } from "./baseSchema";
import { linkSchema } from "./linkSchema";
import { imageMetadataSchema } from "./imageSchema";
import type { ImageFunction } from "astro:content";

export const heroSchema = (image: ImageFunction) => baseSchema.extend({
  image: imageMetadataSchema(image),
  cta: z.array(linkSchema).optional(),
});
