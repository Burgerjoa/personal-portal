import Link from "next/link";
import {
  ArrowUpRight,
  GitFork,
  Hammer,
  Layers3,
  NotebookPen,
  TerminalSquare,
} from "lucide-react";
import { BurgerSpecial } from "@/components/burger/BurgerSpecial";

const tools = [
  "글자수 세기",
  "D-Day 계산",
  "Base64 변환",
  "비밀번호 생성",
  "JSON 포맷터",
  "단위 변환",
];

const focusAreas = [
  {
    title: "요즘 만드는 것",
    body: "예전에 만든 작은 웹 도구들을 하나씩 다시 손보고 있습니다.",
  },
  {
    title: "자주 들여다보는 것",
    body: "React, Next.js, 그리고 오래 써도 불편하지 않은 화면에 관심이 많습니다.",
  },
  {
    title: "틈틈이 남기는 것",
    body: "만들다가 알게 된 것과 막혔던 지점을 짧은 글로 기록합니다.",
  },
];

const focusTones = ["focus-note--mint", "focus-note--yellow", "focus-note--blue"];

const places = [
  ["01", "도구", "필요해서 만들었고, 종종 다시 쓰는 작은 기능들", "/tools"],
  ["02", "프로젝트", "완성한 것과 아직 다듬는 것을 함께 모아둔 곳", "/projects"],
  ["03", "기록", "개발하며 생긴 생각과 배운 내용을 잊기 전에 적는 곳", "/blog"],
];

function MiniBurger({ className = "" }: { className?: string }) {
  return (
    <span className={`mini-burger ${className}`} aria-hidden="true">
      <i className="mini-burger__bun" />
      <i className="mini-burger__lettuce" />
      <i className="mini-burger__cheese" />
      <i className="mini-burger__patty" />
      <i className="mini-burger__bottom" />
    </span>
  );
}

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-background text-foreground">
      <section className="portfolio-hero relative isolate min-h-[calc(100vh-3.5rem)] px-4 py-6 sm:min-h-[calc(100vh-4rem)] sm:px-12 sm:py-10">
        <div className="mx-auto grid min-h-[calc(100vh-7rem)] max-w-7xl grid-cols-1 gap-7 sm:min-h-[calc(100vh-9rem)] sm:gap-10 lg:grid-cols-[minmax(0,1fr)_390px]">
          <div className="flex flex-col justify-between gap-9 sm:gap-14">
            <div className="flex items-center justify-between gap-4 font-mono text-[0.68rem] uppercase tracking-[0.28em] text-muted-foreground">
              <span>Sungwoo&apos;s corner / Seoul</span>
              <span className="hidden sm:inline">Updated now and then</span>
            </div>

            <div className="max-w-5xl">
              <div className="hero-stickers" aria-hidden="true">
                <span>WEB STUFF</span>
                <span>BURGER BREAK</span>
                <span>SEOUL · 2026</span>
              </div>
              <div className="mb-4 inline-flex items-center gap-2 border border-border bg-background/70 px-2.5 py-1.5 font-mono text-[0.68rem] text-muted-foreground backdrop-blur sm:mb-6 sm:px-3 sm:py-2 sm:text-xs">
                <span className="h-2 w-2 bg-emerald-500" />
                천천히 고치는 중
              </div>
              <h1 className="max-w-5xl text-[3.25rem] font-black leading-[0.84] tracking-normal sm:text-[clamp(4rem,13vw,12rem)]">
                정성우
                <span className="block text-muted-foreground/35">
                  NOTES
                </span>
              </h1>
              <p className="mt-5 max-w-2xl text-[0.95rem] leading-6 text-muted-foreground sm:mt-8 sm:text-xl sm:leading-8">
                만들고 싶은 것을 만들고, 잊고 싶지 않은 것을 적습니다.
                가끔은 예전에 만든 것도 꺼내 고칩니다.
              </p>
            </div>

            <div className="grid gap-2 sm:grid-cols-3 sm:gap-3">
              {focusAreas.map((item, index) => (
                <article
                  key={item.title}
                  className={`focus-note ${focusTones[index]} border border-border p-4 backdrop-blur sm:p-5`}
                >
                  <h2 className="text-sm font-semibold">{item.title}</h2>
                  <p className="mt-2 text-[0.8rem] leading-5 text-muted-foreground sm:mt-3 sm:text-sm sm:leading-6">
                    {item.body}
                  </p>
                </article>
              ))}
            </div>
          </div>

          <aside className="flex flex-col justify-between gap-5 border-l border-border/70 py-2 pl-0 lg:pl-8">
            <div className="grid gap-3">
              <BurgerSpecial />
              <Link
                href="/tools"
                className="group border border-foreground bg-foreground p-4 text-background transition-transform hover:-translate-y-1 sm:p-5"
              >
                <div className="flex items-center justify-between gap-4">
                  <Hammer className="h-5 w-5" />
                  <ArrowUpRight className="h-5 w-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
                <p className="mt-6 font-mono text-[0.68rem] uppercase tracking-[0.22em] opacity-70 sm:mt-10 sm:text-xs">
                  little tools
                </p>
                <strong className="mt-2 block text-2xl font-black tracking-normal sm:text-3xl">
                  필요할 때 꺼내 쓰는 도구들
                </strong>
              </Link>

              <Link
                href="/projects"
                className="group border border-border bg-background/70 p-4 backdrop-blur transition-transform hover:-translate-y-1 sm:p-5"
              >
                <div className="flex items-center justify-between gap-4">
                  <Layers3 className="h-5 w-5 text-muted-foreground" />
                  <ArrowUpRight className="h-5 w-5 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
                <p className="mt-6 font-mono text-[0.68rem] uppercase tracking-[0.22em] text-muted-foreground sm:mt-8 sm:text-xs">
                  projects
                </p>
                <strong className="mt-2 block text-xl font-black sm:text-2xl">
                  만들었거나 만들고 있는 것
                </strong>
              </Link>
            </div>

            <div className="terminal-panel border border-border bg-card p-4 font-mono text-[0.68rem] text-muted-foreground sm:p-5 sm:text-xs">
              <div className="mb-5 flex items-center gap-2 text-foreground">
                <TerminalSquare className="h-4 w-4" />
                <span>today.log</span>
              </div>
              <p>
                <span className="text-emerald-500">doing</span> old tools,
                new home
              </p>
              <p className="mt-2">
                <span className="text-sky-500">reading</span> docs and other
                people&apos;s code
              </p>
              <p className="mt-2">
                <span className="text-amber-500">mood</span> make, use, write
              </p>
            </div>
          </aside>
        </div>
      </section>

      <section className="toolbox-section border-y border-border px-4 py-12 sm:px-12 sm:py-16">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[300px_1fr]">
          <div className="toolbox-menu-copy">
            <div className="toolbox-menu-copy__top">
              <MiniBurger className="mini-burger--title" />
              <span>BURGERJOA&apos;S</span>
            </div>
            <p className="font-mono text-[0.65rem] uppercase tracking-[0.24em]">
              Tiny tool menu
            </p>
            <h2 className="mt-3 text-2xl font-black tracking-normal sm:text-3xl">
              필요한 기능만<br />빠르게 포장해 드립니다.
            </h2>
            <div className="toolbox-menu-copy__stamp">OPEN 24/7*</div>
            <small>* 제가 깨어 있다면요</small>
          </div>
          <div className="tool-menu-grid grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {tools.map((tool, index) => (
              <Link
                key={tool}
                href="/tools"
                className={`tool-tile tool-tile--${(index % 3) + 1} group flex min-h-20 items-end justify-between border border-border p-4 transition-all hover:-translate-y-1 hover:border-foreground sm:min-h-28 sm:p-5`}
              >
                <span>
                  <small className="mb-2 block font-mono text-[0.6rem] text-muted-foreground">0{index + 1}</small>
                  <strong className="text-base font-bold sm:text-lg">{tool}</strong>
                </span>
                <span className="flex flex-col items-end gap-3">
                  <MiniBurger />
                  <ArrowUpRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="around-section px-4 py-14 sm:px-12 sm:py-20">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1fr_1.2fr]">
          <div className="around-copy">
            <p className="font-mono text-xs uppercase tracking-[0.24em] text-muted-foreground">
              Build your own
            </p>
            <h2 className="mt-3 text-3xl font-black tracking-normal sm:text-4xl">
              이 공간을<br />한 입씩 둘러보세요.
            </h2>
            <p className="mt-5 max-w-md leading-7 text-muted-foreground">
              도구는 양상추, 프로젝트는 패티, 기록은 치즈쯤 됩니다.
              순서는 마음대로 골라도 됩니다.
            </p>
            <div className="around-burger" aria-hidden="true">
              <span>SESAME</span><span>LETTUCE</span><span>CHEESE</span><span>PATTY</span><span>BUN</span>
            </div>
          </div>
          <div className="ingredient-links grid gap-3">
            {places.map(([num, title, body, href], index) => (
              <Link
                key={num}
                href={href}
                className={`ingredient-link ingredient-link--${index + 1} group grid grid-cols-[44px_1fr_auto] sm:grid-cols-[64px_1fr_auto]`}
              >
                <div className="flex items-center justify-center border-r border-border font-mono text-xs text-muted-foreground">
                  {num}
                </div>
                <div className="p-4 sm:p-5">
                  <h3 className="font-bold">{title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{body}</p>
                </div>
                <ArrowUpRight className="mr-4 mt-4 h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 sm:mr-5 sm:mt-5" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 pb-16 sm:px-12 sm:pb-24">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 border border-foreground bg-foreground p-5 text-background sm:flex-row sm:items-center sm:justify-between sm:p-6">
          <div>
            <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.22em] opacity-70">
              <NotebookPen className="h-4 w-4" />
              Elsewhere
            </div>
            <h2 className="mt-3 text-2xl font-black tracking-normal sm:text-3xl">
              조금 더 날것의 작업은 GitHub에 있습니다.
            </h2>
          </div>
          <Link
            href="https://github.com/Burgerjoa"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 border border-background px-4 py-3 text-sm font-bold transition-colors hover:bg-background hover:text-foreground"
          >
            <GitFork className="h-4 w-4" />
            GitHub 보기
          </Link>
        </div>
      </section>
    </div>
  );
}
