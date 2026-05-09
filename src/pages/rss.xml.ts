import type { APIRoute } from "astro";
import { sortItemsByDateDesc } from "@/lib/utils";
import rss from "@astrojs/rss";
import { getCollection, getEntry } from "astro:content";

export const GET: APIRoute = async (context) => {
  const posts = (await getCollection("blog")).sort(sortItemsByDateDesc);
  const config = await getEntry("config", "site-config");
  if (!config) throw new Error("Site config not found");
  return rss({
    title: config.data.title,
    description: config.data.description,
    site: context.site!,
    items: posts.map((item) => ({
      title: item.data.title,
      description: item.data.description,
      link: `/blog/${item.id}/`,
      pubDate: new Date(item.data.publishDate),
    })),
  });
};
