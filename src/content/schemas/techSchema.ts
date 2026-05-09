import { z } from "astro/zod";

export const techSchema = z.object({
  id: z.string(),
  name: z.string(),
  icon: z.string(),
});
export type TechSchema = z.infer<typeof techSchema>;
