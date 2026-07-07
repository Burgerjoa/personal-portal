import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, BookOpen, Clock3 } from "lucide-react";
import { formatPostDate, getAllPosts } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Notes",
  description: "만들며 알게 된 것과 오래 기억하고 싶은 결정을 남기는 기록.",
};

export default async function BlogPage() {
  const posts = await getAllPosts();
  const [featured, ...rest] = posts;

  return (
    <div className="px-6 py-14 sm:px-12 sm:py-20">
      <div className="mx-auto max-w-7xl">
        <header className="grid gap-8 border-b border-border pb-12 lg:grid-cols-[1fr_380px] lg:items-end">
          <div>
            <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.22em] text-muted-foreground">
              <BookOpen className="h-4 w-4" />
              Notes and logs
            </div>
            <h1 className="mt-5 text-6xl font-black tracking-normal sm:text-8xl">
              Blog
            </h1>
          </div>
          <p className="max-w-md text-base leading-8 text-muted-foreground">
            만들며 알게 된 것, 다음에도 기억하고 싶은 결정, 잘 풀리지 않았던
            지점을 적습니다.
          </p>
        </header>

        {featured && (
          <Link
            href={`/blog/${featured.slug}`}
            className="group grid border-b border-border py-10 transition-colors hover:bg-muted/30 sm:px-6 lg:grid-cols-[170px_1fr_auto] lg:items-center"
          >
            <div className="font-mono text-xs text-muted-foreground">
              <p>{formatPostDate(featured.date)}</p>
              <p className="mt-2 flex items-center gap-1.5">
                <Clock3 className="h-3.5 w-3.5" />
                {featured.readingTime}
              </p>
            </div>
            <div className="mt-6 lg:mt-0">
              <p className="font-mono text-[0.65rem] uppercase tracking-[0.22em] text-muted-foreground">
                Latest note
              </p>
              <h2 className="mt-3 max-w-3xl text-3xl font-black tracking-normal sm:text-5xl">
                {featured.title}
              </h2>
              <p className="mt-4 max-w-2xl leading-7 text-muted-foreground">
                {featured.description}
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                {featured.tags.map((tag) => (
                  <span key={tag} className="border border-border px-2 py-1 text-xs">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <ArrowUpRight className="mt-6 h-6 w-6 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:-translate-y-1 lg:mt-0" />
          </Link>
        )}

        <section className="mt-14">
          <div className="mb-6 flex items-end justify-between gap-4">
            <h2 className="text-2xl font-black">All notes</h2>
            <span className="font-mono text-xs text-muted-foreground">
              {posts.length.toString().padStart(2, "0")} entries
            </span>
          </div>
          <div className="grid gap-px border border-border bg-border md:grid-cols-2">
            {rest.map((post, index) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group flex min-h-72 flex-col justify-between bg-background p-6 transition-colors hover:bg-muted/40"
              >
                <div className="flex items-start justify-between gap-4 font-mono text-xs text-muted-foreground">
                  <span>{String(index + 2).padStart(2, "0")}</span>
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                </div>
                <div>
                  <h3 className="text-2xl font-black tracking-normal">{post.title}</h3>
                  <p className="mt-3 leading-7 text-muted-foreground">
                    {post.description}
                  </p>
                  <p className="mt-6 font-mono text-xs text-muted-foreground">
                    {formatPostDate(post.date)} · {post.readingTime}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
