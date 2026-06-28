"use client";

import Link from "next/link";
import { useTheme } from "next-themes";
import { Sun, Moon, Code2, LayoutGrid, X } from "lucide-react";
import { useState, useEffect, useRef } from "react";

const SITE_MAP = [
  {
    label: "Blog",
    href: "/blog",
    desc: "기술 블로그",
    emoji: "✍️",
  },
  {
    label: "Tools",
    href: "/tools",
    desc: "웹 유틸리티",
    emoji: "🔧",
  },
  {
    label: "Projects",
    href: "/projects",
    desc: "포트폴리오",
    emoji: "🚀",
  },
];

export function Header() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    if (menuOpen) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [menuOpen]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-border bg-background/80 backdrop-blur-md"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-6">
        <Link
          href="/"
          className="flex items-center gap-2 font-bold text-lg tracking-tight hover:opacity-70 transition-opacity"
        >
          <Code2 className="h-5 w-5" />
          <span>burgerjoa</span>
        </Link>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="flex h-9 w-9 items-center justify-center rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
            aria-label="테마 전환"
          >
            {mounted ? (
              theme === "dark" ? (
                <Sun className="h-4 w-4" />
              ) : (
                <Moon className="h-4 w-4" />
              )
            ) : (
              <span className="h-4 w-4" />
            )}
          </button>

          <div className="relative" ref={menuRef}>
            <button
              onClick={() => setMenuOpen((v) => !v)}
              className="flex items-center gap-1.5 h-9 px-3 rounded-md text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
              aria-label="사이트맵"
            >
              {menuOpen ? (
                <X className="h-4 w-4" />
              ) : (
                <LayoutGrid className="h-4 w-4" />
              )}
              <span className="hidden sm:inline">Menu</span>
            </button>

            {menuOpen && (
              <div className="absolute right-0 top-full mt-2 w-52 rounded-xl border border-border bg-background/95 backdrop-blur-md shadow-xl overflow-hidden">
                <div className="px-3 py-2 border-b border-border">
                  <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                    사이트맵
                  </p>
                </div>
                <div className="p-2 flex flex-col gap-1">
                  {SITE_MAP.map(({ label, href, desc, emoji }) => (
                    <Link
                      key={href}
                      href={href}
                      onClick={() => setMenuOpen(false)}
                      className="flex items-center gap-3 rounded-lg px-3 py-2.5 hover:bg-muted transition-colors group"
                    >
                      <span className="text-lg">{emoji}</span>
                      <div>
                        <p className="text-sm font-medium text-foreground leading-none">
                          {label}
                        </p>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          {desc}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
