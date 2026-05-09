import { z } from "astro/zod";

export const baseSchema = z.object({
  title: z.string(),
  description: z.string(),
});
