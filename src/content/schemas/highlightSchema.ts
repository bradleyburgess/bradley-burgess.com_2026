import { z } from "astro/zod";
import { baseSchema } from "./baseSchema";
import { linkSchema } from "./linkSchema";

export const highlightSchema = baseSchema.extend({
  icon: z.string(),
  links: z.array(linkSchema).optional(),
});
export type HighlightSchema = z.infer<typeof highlightSchema>;
