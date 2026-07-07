import fs from "fs";
import path from "path";
import type { ComponentType } from "react";

export type PostMetadata = {
  title: string;
  description: string;
  date: string;
  tags: string[];
  readingTime: string;
};

export type Post = PostMetadata & {
  slug: string;
  Content: ComponentType;
};

export async function getAllPosts(): Promise<Post[]> {
  const blogDir = path.join(process.cwd(), "src/content/blog");
  const files = fs.readdirSync(blogDir);

  const posts = await Promise.all(
    files
      .filter((file) => file.endsWith(".mdx"))
      .map(async (file) => {
        const slug = file.replace(/\.mdx$/, "");
        const { metadata, default: Content } = await import(`@/content/blog/${file}`);
        return {
          slug,
          ...metadata,
          Content,
        };
      })
  );

  return posts.sort((a, b) => b.date.localeCompare(a.date));
}

export async function getPost(slug: string): Promise<Post | undefined> {
  const posts = await getAllPosts();
  return posts.find((post) => post.slug === slug);
}

export function formatPostDate(value: string) {
  return new Intl.DateTimeFormat("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(`${value}T00:00:00`));
}
