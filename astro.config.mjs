// @ts-check
import { loadEnv } from "vite";
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import yaml from "@rollup/plugin-yaml";
import icon from "astro-icon";
import preact from "@astrojs/preact";
import netlify from "@astrojs/netlify";
import node from "@astrojs/node";

import vue from "@astrojs/vue";

import sitemap from "@astrojs/sitemap";

const {
  NODE_ENV,
  SSR_ADAPTER = "netlify",
  TELEGRAM_BOT_TOKEN,
  TELEGRAM_CHAT_ID,
  BASE_URL,
} = loadEnv(process.env.NODE_ENV ?? "", process.cwd(), "");

if (!NODE_ENV) throw new Error("`NODE_ENV` is not defined");
if (NODE_ENV === "production" && !TELEGRAM_BOT_TOKEN)
  throw new Error("`TELEGRAM_BOT_TOKEN` is not defined");
if (NODE_ENV === "production" && !TELEGRAM_CHAT_ID)
  throw new Error("`TELEGRAM_CHAT_ID` is not defined");
if (NODE_ENV === "production" && !BASE_URL)
  throw new Error("`BASE_URL` is not defined");

// https://astro.build/config
export default defineConfig({
  site: BASE_URL ?? "http://localhost:4321",
  output: "static",
  adapter: SSR_ADAPTER === "netlify" ? netlify() : node({ mode: "standalone" }),
  image: {
    domains: ["images.unsplash.com"],
    layout: "constrained",
  },
  integrations: [icon(), preact(), vue(), sitemap()],
  vite: {
    plugins: [yaml(), tailwindcss()],
  },
});
