import Link from "next/link";
import { GitFork } from "lucide-react";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border mt-auto">
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-4 px-6 py-8 sm:flex-row">
        <div>
          <p className="text-sm text-muted-foreground">
            © {year} 정성우. 직접 만든 공간입니다.
          </p>
          <p className="mt-1 font-mono text-[0.65rem] uppercase tracking-[0.2em] text-muted-foreground/60">
            order no. burgerjoa-{year}
          </p>
        </div>
        <div className="flex items-center gap-4">
          <Link
            href="https://github.com/Burgerjoa"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <GitFork className="h-4 w-4" />
            GitHub
          </Link>
        </div>
      </div>
    </footer>
  );
}
