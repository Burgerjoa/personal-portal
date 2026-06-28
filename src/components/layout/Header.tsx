"use client";

import Link from "next/link";
import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";
import { useState, useEffect } from "react";

export function Header() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 mix-blend-normal">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6 sm:px-12">
        <Link
          href="/"
          className="font-mono text-xs tracking-[0.25em] uppercase text-muted-foreground hover:text-foreground transition-colors"
        >
          burgerjoa.dev
        </Link>

        <button
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="flex h-8 w-8 items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
          aria-label="테마 전환"
        >
          {mounted ? (
            theme === "dark" ? (
              <Sun className="h-3.5 w-3.5" />
            ) : (
              <Moon className="h-3.5 w-3.5" />
            )
          ) : (
            <span className="h-3.5 w-3.5" />
          )}
        </button>
      </div>
    </header>
  );
}
