import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Clock3 } from "lucide-react";
import { formatPostDate, getAllPosts, getPost } from "@/lib/blog";

type Props = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

export async function generateStaticParams() {
  return (await getAllPosts()).map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await getPost((await params).slug);

  if (!post) return {};

  return {
    title: post.title,
    description: post.description,
    keywords: post.tags,
    openGraph: {
      type: "article",
      title: post.title,
      description: post.description,
      publishedTime: post.date,
      tags: post.tags,
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const posts = await getAllPosts();
  const postIndex = posts.findIndex((item) => item.slug === slug);
  const post = posts[postIndex];

  if (!post) notFound();

  const newerPost = posts[postIndex - 1];
  const olderPost = posts[postIndex + 1];
  const { Content } = post;

  return (
    <article className="px-6 py-12 sm:px-12 sm:py-20">
      <div className="mx-auto max-w-4xl">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          All notes
        </Link>

        <header className="mt-10 border-b border-border pb-10">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-xs text-muted-foreground">
            <time dateTime={post.date}>{formatPostDate(post.date)}</time>
            <span className="flex items-center gap-1.5">
              <Clock3 className="h-3.5 w-3.5" />
              {post.readingTime}
            </span>
          </div>
          <h1 className="mt-6 text-4xl font-black leading-tight tracking-normal sm:text-6xl">
            {post.title}
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-muted-foreground">
            {post.description}
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span key={tag} className="border border-border px-2 py-1 text-xs">
                {tag}
              </span>
            ))}
          </div>
        </header>

        <div className="py-4">
          <Content />
        </div>

        <nav className="mt-16 grid gap-px border border-border bg-border sm:grid-cols-2">
          {newerPost ? (
            <PostLink post={newerPost} direction="newer" />
          ) : (
            <div className="hidden bg-background sm:block" />
          )}
          {olderPost ? (
            <PostLink post={olderPost} direction="older" />
          ) : (
            <div className="hidden bg-background sm:block" />
          )}
        </nav>
      </div>
    </article>
  );
}

function PostLink({
  post,
  direction,
}: {
  post: Awaited<ReturnType<typeof getAllPosts>>[number];
  direction: "newer" | "older";
}) {
  const isNewer = direction === "newer";

  return (
    <Link
      href={`/blog/${post.slug}`}
      className={`group flex min-h-36 flex-col justify-between bg-background p-5 hover:bg-muted/40 ${
        isNewer ? "items-start text-left" : "items-end text-right"
      }`}
    >
      <span className="font-mono text-[0.65rem] uppercase tracking-[0.18em] text-muted-foreground">
        {isNewer ? "Newer note" : "Older note"}
      </span>
      <span className="flex items-center gap-2 font-bold">
        {isNewer && <ArrowLeft className="h-4 w-4" />}
        {post.title}
        {!isNewer && <ArrowRight className="h-4 w-4" />}
      </span>
    </Link>
  );
}
