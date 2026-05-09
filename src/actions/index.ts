import { defineAction } from "astro:actions";
import { contactFormActionSchema, contactFormHandler } from "./telegram";

export const server = {
  contactForm: defineAction({
    input: contactFormActionSchema,
    handler: contactFormHandler,
  }),
};
