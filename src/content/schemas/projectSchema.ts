import fs from "node:fs";
import path from "node:path";
import yaml from "js-yaml";
import { z } from "astro/zod";
import { baseSchema } from "./baseSchema";
import { imageMetadataSchema } from "./imageSchema";
import type { ImageFunction } from "astro:content";

const technologies = yaml.load(
  fs.readFileSync(path.resolve("./src/content/technologies.yml"), "utf8"),
) as { id: string }[];

export const projectSchema = (image: ImageFunction) =>
  baseSchema.extend({
    isFeatured: z.boolean().optional(),
    publishDate: z.iso.date(),
    technologies: z.array(z.enum(technologies.map((t) => t.id))),
    links: z.object({
      github: z.string().optional(),
      demo: z.string().optional(),
      other: z
        .object({
          href: z.string(),
          text: z.string(),
        })
        .optional(),
    }),
    image: imageMetadataSchema(image),
  });
