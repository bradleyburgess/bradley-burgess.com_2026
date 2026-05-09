import { z } from "astro/zod";
import { type ImageFunction } from "astro:content";

export const imageMetadataSchema = (image: ImageFunction) => z.object({
  src: image(),
  alt: z.string(),
  width: z.number().optional(),
  height: z.number().optional(),
  credit: z.string().optional(),
});
export type ImageMetadataSchema = z.infer<typeof imageMetadataSchema>;
