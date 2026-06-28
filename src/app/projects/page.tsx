import type { Metadata } from "next";
import { FolderKanban } from "lucide-react";

export const metadata: Metadata = {
  title: "Projects",
  description: "프론트엔드 학습 과정에서 만든 토이 프로젝트 및 결과물 포트폴리오.",
};

export default function ProjectsPage() {
  return (
    <div className="mx-auto w-full max-w-5xl px-6 py-16">
      <div className="mb-10 space-y-2">
        <h1 className="flex items-center gap-3 text-3xl font-bold tracking-tight">
          <FolderKanban className="h-7 w-7 text-muted-foreground" />
          Projects
        </h1>
        <p className="text-muted-foreground">
          학습하면서 만든 토이 프로젝트와 주요 구현 결과물을 정리합니다.
        </p>
      </div>

      <div className="rounded-xl border border-dashed border-border p-20 text-center space-y-3">
        <p className="text-4xl">🚀</p>
        <p className="text-sm font-medium text-foreground">준비 중입니다</p>
        <p className="text-xs text-muted-foreground">
          프로젝트 카드를 채우는 중입니다. 곧 만나볼 수 있습니다.
        </p>
      </div>
    </div>
  );
}
