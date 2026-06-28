import Link from "next/link";
import {
  ArrowRight,
  GitFork,
  BookOpen,
  Wrench,
  FolderKanban,
} from "lucide-react";

const SKILLS = [
  "TypeScript",
  "React",
  "Next.js",
  "Tailwind CSS",
  "Node.js",
  "Git",
  "HTML/CSS",
  "JavaScript",
];

const RECENT_POSTS = [
  {
    id: 1,
    title: "Next.js App Router에서 Server Component와 Client Component 구분하기",
    date: "2026-06-28",
    tag: "Next.js",
  },
  {
    id: 2,
    title: "TypeScript 제네릭을 실전에서 제대로 활용하는 법",
    date: "2026-06-20",
    tag: "TypeScript",
  },
  {
    id: 3,
    title: "Tailwind CSS v4의 변경점 — 마이그레이션 가이드",
    date: "2026-06-10",
    tag: "CSS",
  },
];

const QUICK_TOOLS = [
  {
    href: "/tools/text-counter",
    icon: "✏️",
    label: "글자수 세기",
    desc: "글자 수, 단어 수, 바이트 수 즉시 확인",
  },
  {
    href: "/tools/d-day",
    icon: "📅",
    label: "디데이 계산기",
    desc: "목표일까지 남은 날 계산",
  },
];

export default function Home() {
  return (
    <div className="mx-auto w-full max-w-5xl px-6 py-16 space-y-24">
      {/* Hero */}
      <section className="flex flex-col gap-6">
        <div className="space-y-2">
          <p className="text-sm font-medium text-muted-foreground tracking-widest uppercase">
            안녕하세요 👋
          </p>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            정성우입니다.
          </h1>
          <p className="text-xl text-muted-foreground max-w-xl leading-relaxed">
            프론트엔드에 관심 있는 개발자입니다. 직접 만든 도구와 학습 과정을
            이곳에 기록합니다.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 rounded-lg bg-foreground px-5 py-2.5 text-sm font-semibold text-background transition-opacity hover:opacity-80"
          >
            블로그 보기
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href="https://github.com/Burgerjoa"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg border border-border px-5 py-2.5 text-sm font-semibold text-foreground transition-colors hover:bg-muted"
          >
            <GitFork className="h-4 w-4" />
            GitHub
          </Link>
        </div>
      </section>

      {/* Skills */}
      <section className="space-y-5">
        <h2 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">
          기술 스택
        </h2>
        <div className="flex flex-wrap gap-2">
          {SKILLS.map((skill) => (
            <span
              key={skill}
              className="rounded-full border border-border bg-muted px-4 py-1.5 text-sm font-medium text-foreground"
            >
              {skill}
            </span>
          ))}
        </div>
      </section>

      {/* Recent Posts */}
      <section className="space-y-5">
        <div className="flex items-center justify-between">
          <h2 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-muted-foreground">
            <BookOpen className="h-4 w-4" />
            최근 글
          </h2>
          <Link
            href="/blog"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
          >
            전체 보기 <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
        <div className="divide-y divide-border rounded-xl border border-border overflow-hidden">
          {RECENT_POSTS.map((post) => (
            <Link
              key={post.id}
              href="/blog"
              className="flex items-center justify-between px-5 py-4 hover:bg-muted transition-colors group"
            >
              <div className="space-y-0.5 min-w-0 flex-1 pr-4">
                <p className="text-sm font-medium text-foreground group-hover:text-foreground truncate">
                  {post.title}
                </p>
                <p className="text-xs text-muted-foreground">{post.date}</p>
              </div>
              <span className="shrink-0 rounded-full bg-muted border border-border px-3 py-1 text-xs font-medium text-muted-foreground">
                {post.tag}
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Quick Tools */}
      <section className="space-y-5">
        <div className="flex items-center justify-between">
          <h2 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-muted-foreground">
            <Wrench className="h-4 w-4" />
            유틸리티 도구
          </h2>
          <Link
            href="/tools"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
          >
            전체 보기 <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {QUICK_TOOLS.map((tool) => (
            <Link
              key={tool.href}
              href={tool.href}
              className="group rounded-xl border border-border p-5 hover:bg-muted transition-colors flex items-start gap-4"
            >
              <span className="text-2xl">{tool.icon}</span>
              <div className="space-y-1">
                <p className="text-sm font-semibold text-foreground">
                  {tool.label}
                </p>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {tool.desc}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Projects teaser */}
      <section className="space-y-5">
        <div className="flex items-center justify-between">
          <h2 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-muted-foreground">
            <FolderKanban className="h-4 w-4" />
            프로젝트
          </h2>
          <Link
            href="/projects"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
          >
            전체 보기 <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
        <div className="rounded-xl border border-border border-dashed p-10 text-center text-sm text-muted-foreground">
          곧 추가될 예정입니다 🚧
        </div>
      </section>
    </div>
  );
}
