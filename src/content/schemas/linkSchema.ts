import { z } from "astro/zod";

export const linkSchema = z.object({
  to: z.string(),
  label: z.string(),
  icon: z.string().optional(),
  variant: z
    .enum([
      "default",
      "outline",
      "secondary",
      "ghost",
      "destructive",
      "link",
      "spotify",
      "applemusic",
      "youtube",
      "tidal",
    ])
    .optional(),
});
export type LinkSchema = z.infer<typeof linkSchema>;
