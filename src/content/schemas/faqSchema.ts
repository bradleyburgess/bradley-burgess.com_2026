import { z } from "astro/zod";
import { baseSchema } from "./baseSchema";



export const faqSchema = z.object({
  section: z.string(),
  items: z.array(baseSchema),
});
export type FaqSchema = z.infer<typeof faqSchema>;
