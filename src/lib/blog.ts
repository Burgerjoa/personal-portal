import type { ComponentType } from "react";
import MovingOldTools, {
  metadata as movingOldToolsMetadata,
} from "@/content/blog/moving-old-tools.mdx";
import LessPortfolioMoreHome, {
  metadata as lessPortfolioMoreHomeMetadata,
} from "@/content/blog/less-portfolio-more-home.mdx";
import WhyLocalMdx, {
  metadata as whyLocalMdxMetadata,
} from "@/content/blog/why-local-mdx.mdx";

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

const posts: Post[] = [
  {
    slug: "moving-old-tools",
    ...movingOldToolsMetadata,
    Content: MovingOldTools,
  },
  {
    slug: "less-portfolio-more-home",
    ...lessPortfolioMoreHomeMetadata,
    Content: LessPortfolioMoreHome,
  },
  {
    slug: "why-local-mdx",
    ...whyLocalMdxMetadata,
    Content: WhyLocalMdx,
  },
].sort((a, b) => b.date.localeCompare(a.date));

export function getAllPosts() {
  return posts;
}

export function getPost(slug: string) {
  return posts.find((post) => post.slug === slug);
}

export function formatPostDate(value: string) {
  return new Intl.DateTimeFormat("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(`${value}T00:00:00`));
}
