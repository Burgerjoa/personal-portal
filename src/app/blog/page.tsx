import type { Metadata } from "next";
import { BookOpen } from "lucide-react";

export const metadata: Metadata = {
  title: "Blog",
  description: "프론트엔드 학습 과정과 에러 해결기를 기록하는 기술 블로그입니다.",
};

export default function BlogPage() {
  return (
    <div className="mx-auto w-full max-w-5xl px-6 py-16">
      <div className="mb-10 space-y-2">
        <h1 className="flex items-center gap-3 text-3xl font-bold tracking-tight">
          <BookOpen className="h-7 w-7 text-muted-foreground" />
          Blog
        </h1>
        <p className="text-muted-foreground">
          프론트엔드 기초부터 심화까지, 학습 과정과 에러 해결기를 기록합니다.
        </p>
      </div>

      <div className="rounded-xl border border-dashed border-border p-20 text-center space-y-3">
        <p className="text-4xl">✍️</p>
        <p className="text-sm font-medium text-foreground">준비 중입니다</p>
        <p className="text-xs text-muted-foreground">
          MDX 기반 블로그 시스템을 구축하고 있습니다. 곧 첫 포스팅이 올라올
          예정입니다.
        </p>
      </div>
    </div>
  );
}
