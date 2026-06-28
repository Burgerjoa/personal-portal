import Link from "next/link";
import { ArrowRight, GitFork } from "lucide-react";

const PORTAL_CARDS = [
  {
    href: "/blog",
    emoji: "✍️",
    label: "Blog",
    sublabel: "기술 블로그",
    desc: "Next.js, TypeScript, CSS — 배우고 부딪히며 기록한 글들",
    accent: "from-violet-500/10 to-purple-500/5",
    border: "hover:border-violet-500/40",
    tag: "준비 중",
  },
  {
    href: "/tools",
    emoji: "🔧",
    label: "Tools",
    sublabel: "웹 유틸리티",
    desc: "글자수 세기, 디데이 계산기 등 직접 만든 브라우저 도구",
    accent: "from-sky-500/10 to-cyan-500/5",
    border: "hover:border-sky-500/40",
    tag: "마이그레이션 중",
  },
  {
    href: "/projects",
    emoji: "🚀",
    label: "Projects",
    sublabel: "포트폴리오",
    desc: "학습하면서 만든 토이 프로젝트와 결과물 아카이브",
    accent: "from-emerald-500/10 to-teal-500/5",
    border: "hover:border-emerald-500/40",
    tag: "준비 중",
  },
];

const SKILLS = [
  "TypeScript",
  "React",
  "Next.js",
  "Tailwind CSS",
  "Node.js",
  "Git",
];

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero — full viewport */}
      <section className="relative flex min-h-[calc(100vh-4rem)] flex-col items-start justify-center px-6">
        <div className="mx-auto w-full max-w-5xl space-y-8">
          <div className="space-y-4">
            <p className="text-sm font-medium tracking-[0.2em] uppercase text-muted-foreground">
              Hello, World 👋
            </p>
            <h1 className="text-5xl font-extrabold tracking-tight sm:text-7xl leading-[1.05]">
              정성우
            </h1>
            <p className="text-xl text-muted-foreground max-w-lg leading-relaxed">
              프론트엔드에 관심 있는 개발자입니다.
              <br />
              직접 만든 도구와 학습 과정을 이곳에 기록합니다.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {SKILLS.map((s) => (
              <span
                key={s}
                className="rounded-full border border-border bg-muted px-3.5 py-1 text-xs font-medium text-muted-foreground"
              >
                {s}
              </span>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-4">
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

          {/* 아래로 스크롤 힌트 */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground animate-bounce">
            <p className="text-xs tracking-widest uppercase">Scroll</p>
            <ArrowRight className="h-4 w-4 rotate-90" />
          </div>
        </div>
      </section>

      {/* Portal Cards — 섹션 진입 타일 */}
      <section className="px-6 pb-32">
        <div className="mx-auto w-full max-w-5xl">
          <p className="mb-8 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            둘러보기
          </p>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {PORTAL_CARDS.map(
              ({ href, emoji, label, sublabel, desc, accent, border, tag }) => (
                <Link
                  key={href}
                  href={href}
                  className={`group relative overflow-hidden rounded-2xl border border-border bg-gradient-to-br ${accent} ${border} p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg`}
                >
                  <div className="mb-6 flex items-start justify-between">
                    <span className="text-4xl">{emoji}</span>
                    <span className="rounded-full border border-border bg-background/60 px-2.5 py-1 text-[10px] font-medium text-muted-foreground">
                      {tag}
                    </span>
                  </div>

                  <div className="space-y-1 mb-3">
                    <p className="text-xl font-bold text-foreground">{label}</p>
                    <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
                      {sublabel}
                    </p>
                  </div>

                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {desc}
                  </p>

                  <div className="mt-6 flex items-center gap-1 text-xs font-semibold text-foreground opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                    열어보기
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                  </div>
                </Link>
              )
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
