"use client";

import Link from "next/link";
import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";
import { BurgerEasterEgg } from "@/components/burger/BurgerEasterEgg";

export function Header() {
  const { theme, setTheme } = useTheme();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 mix-blend-normal">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:h-16 sm:px-12">
        <div className="flex items-center gap-2.5 sm:gap-3">
          <BurgerEasterEgg />
          <Link
            href="/"
            className="font-mono text-xs tracking-[0.25em] uppercase text-muted-foreground hover:text-foreground transition-colors"
          >
            burgerjoa.dev
          </Link>
        </div>

        <button
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="flex h-8 w-8 items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
          aria-label="테마 전환"
          suppressHydrationWarning
        >
          {theme === "dark" ? (
            <Sun className="h-3.5 w-3.5" />
          ) : (
            <Moon className="h-3.5 w-3.5" />
          )}
        </button>
      </div>
    </header>
  );
}
