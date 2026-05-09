import { z } from "astro/zod";
import { kebabCaseSchema } from "./kebabCaseSchema";

export const trackSchema = z.object({
  title: z.string(),
  composer: z.string(),
  date: z.string(),
  url: z.string(),
  catalog: z.string().optional(),
  location: z.string().optional(),
  tags: z.array(kebabCaseSchema).optional(),
  description: z.string(),
  type: z.enum(["youtube", "audio"]),
  live: z.boolean().optional(),
});
export type TrackSchema = z.infer<typeof trackSchema>;
