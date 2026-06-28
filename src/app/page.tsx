import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const SECTIONS = [
  {
    num: "01",
    href: "/blog",
    label: "BLOG",
    sub: "기술 블로그 — 배우고 부딪히며 기록한 글",
  },
  {
    num: "02",
    href: "/tools",
    label: "TOOLS",
    sub: "웹 유틸리티 — 직접 만든 브라우저 도구",
  },
  {
    num: "03",
    href: "/projects",
    label: "PROJECTS",
    sub: "포트폴리오 — 토이 프로젝트 아카이브",
  },
];

export default function Home() {
  return (
    <div className="grain relative min-h-screen overflow-hidden">
      {/* glow orb */}
      <div
        className="glow-orb pointer-events-none"
        style={{ top: "-15%", left: "-10%" }}
      />

      <div className="relative z-10 mx-auto flex min-h-screen max-w-6xl flex-col px-6 sm:px-12">
        {/* ── HERO ─────────────────────────────────────── */}
        <section className="flex flex-1 flex-col justify-center pb-0 pt-10">
          <div className="flex flex-col gap-6">
            {/* 태그라인 */}
            <p className="font-mono text-xs tracking-[0.3em] uppercase text-muted-foreground">
              Frontend Developer — Seoul, KR
            </p>

            {/* 이름 */}
            <h1
              className="font-extrabold leading-[0.92] tracking-tighter text-foreground select-none"
              style={{ fontSize: "clamp(3.5rem, 11vw, 10rem)" }}
            >
              정성우
            </h1>

            {/* 영문 + 소개 */}
            <div className="flex flex-col gap-1 sm:flex-row sm:items-end sm:gap-10">
              <span
                className="font-extrabold leading-[0.92] tracking-tighter text-muted-foreground/40 select-none"
                style={{ fontSize: "clamp(2rem, 5.5vw, 5rem)" }}
              >
                Jeong Seongwoo
              </span>
              <p className="max-w-xs pb-1 text-sm text-muted-foreground leading-relaxed">
                배우고 만들면서 성장하는
                <br />
                주니어 프론트엔드 개발자입니다.
              </p>
            </div>
          </div>
        </section>

        {/* ── DIVIDER ──────────────────────────────────── */}
        <div className="my-10 h-px w-full bg-border" />

        {/* ── SECTION NAV ──────────────────────────────── */}
        <section className="pb-20">
          <nav className="flex flex-col">
            {SECTIONS.map(({ num, href, label, sub }, i) => (
              <Link
                key={href}
                href={href}
                className={`group flex items-center justify-between py-5 transition-colors duration-200 hover:text-foreground ${
                  i < SECTIONS.length - 1 ? "border-b border-border" : ""
                } text-muted-foreground`}
              >
                <div className="flex items-baseline gap-4 sm:gap-8">
                  <span className="font-mono text-xs tracking-widest opacity-40">
                    {num}
                  </span>
                  <span
                    className="nav-line font-extrabold tracking-tighter transition-colors"
                    style={{ fontSize: "clamp(2rem, 6vw, 5.5rem)" }}
                  >
                    {label}
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="hidden text-xs sm:block opacity-0 transition-opacity duration-200 group-hover:opacity-100 max-w-[200px] text-right leading-relaxed">
                    {sub}
                  </span>
                  <ArrowUpRight
                    className="h-5 w-5 opacity-0 transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 shrink-0"
                  />
                </div>
              </Link>
            ))}
          </nav>
        </section>

        {/* ── FOOTER STRIP ─────────────────────────────── */}
        <div className="mt-auto flex items-center justify-between border-t border-border py-5 text-xs text-muted-foreground font-mono">
          <span>© 2026 정성우</span>
          <Link
            href="https://github.com/Burgerjoa"
            target="_blank"
            rel="noopener noreferrer"
            className="nav-line hover:text-foreground transition-colors"
          >
            github.com/Burgerjoa
          </Link>
        </div>
      </div>
    </div>
  );
}
