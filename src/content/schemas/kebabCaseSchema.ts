import { z } from "astro/zod";
import { isKebabCase } from "../../lib/utils";

export const kebabCaseSchema = z.string().refine(isKebabCase);
export type KebabCaseSchema = z.infer<typeof kebabCaseSchema>;
