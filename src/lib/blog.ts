import type { CollectionEntry } from "astro:content";

export type Lang = "en" | "es";
export type Turn = "day" | "night";
export type Post = CollectionEntry<"blog">;

export const turnLabel = (turn: Turn, lang: Lang) =>
  lang === "es" ? (turn === "day" ? "De día" : "De noche") : turn === "day" ? "By day" : "By night";

/** Slug without the language folder, e.g. "es/foo" → "foo". */
export const postSlug = (post: Post) => post.id.replace(/^es\//, "");

export const postHref = (post: Post) =>
  post.data.lang === "es" ? `/es/blog/${postSlug(post)}/` : `/blog/${postSlug(post)}/`;

export const readingTime = (post: Post) => Math.max(1, Math.ceil((post.body?.split(/\s+/).length ?? 0) / 230));

export const formatDate = (date: Date, lang: Lang, style: "long" | "short" = "long") =>
  date.toLocaleDateString(lang === "es" ? "es-ES" : "en-GB", {
    year: "numeric",
    month: style === "long" ? "long" : "short",
    day: "numeric",
  });
