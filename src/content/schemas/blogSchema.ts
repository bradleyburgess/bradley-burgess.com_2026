import fs from "node:fs";
import path from "node:path";
import yaml from "js-yaml";
import { z } from "astro/zod";
import { baseSchema } from "./baseSchema";
import { imageMetadataSchema } from "./imageSchema";
import { kebabCaseSchema } from "./kebabCaseSchema";
import type { ImageFunction } from "astro:content";

const _blogCategories = yaml.load(
  fs.readFileSync(path.resolve("./src/content/blog/categories.yml"), "utf8"),
) as { id: string }[];

export const blogSchema = (image: ImageFunction) =>
  baseSchema.extend({
    publishDate: z.iso.date(),
    isFeatured: z.boolean().optional(),
    tags: z.array(kebabCaseSchema).optional(),
    image: imageMetadataSchema(image),
    category: z.enum(_blogCategories.map((c) => c.id)).optional(),
  });
