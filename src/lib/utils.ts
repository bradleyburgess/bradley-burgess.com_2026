import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const allImages = import.meta.glob<{ default: ImageMetadata }>(
  "/src/assets/img/**/*",
);
export const getAllImages = () => allImages;

export const isKebabCase = (val: string) =>
  /^[a-z0-9]+(-[a-z0-9]+)*$/.test(val);

export const formatDate = (date: Date | string) =>
  (date instanceof Date ? date : new Date(date)).toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

export const getAllTags = (items: { tags?: string[] }[]): string[] =>
  Array.from(
    new Set(
      items
        .map(({ tags }) => tags)
        .flat()
        .filter(Boolean) as string[],
    ),
  ).sort((a, b) => a.localeCompare(b));

export const titleCase = (str: string) =>
  str
    .toLowerCase()
    .split(/[\s-_]+/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

export const sortByComposerThenTitle = <
  T extends { composer: string; title: string },
>(
  a: T,
  b: T,
) => {
  const composerA = a.composer.toLowerCase();
  const composerB = b.composer.toLowerCase();
  const titleA = a.title.toLowerCase();
  const titleB = b.title.toLowerCase();

  if (composerA < composerB) return -1;
  if (composerA > composerB) return 1;

  if (titleA < titleB) return -1;
  if (titleA > titleB) return 1;

  return 0;
};

export const sortItemsByDateDesc = <
  T extends { id?: string; data: { publishDate: string } },
>(
  a: T,
  b: T,
) => {
  const dateA = new Date(a.data.publishDate);
  const dateB = new Date(b.data.publishDate);

  if (dateA < dateB) return 1;
  if (dateA > dateB) return -1;

  return 0;
};
