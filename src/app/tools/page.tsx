import type { Metadata } from "next";
import { Wrench } from "lucide-react";

export const metadata: Metadata = {
  title: "Tools",
  description: "글자수 세기, 디데이 계산기 등 간단하고 빠른 웹 유틸리티 도구 모음.",
};

export default function ToolsPage() {
  return (
    <div className="mx-auto w-full max-w-5xl px-6 py-16">
      <div className="mb-10 space-y-2">
        <h1 className="flex items-center gap-3 text-3xl font-bold tracking-tight">
          <Wrench className="h-7 w-7 text-muted-foreground" />
          Tools
        </h1>
        <p className="text-muted-foreground">
          일상에서 자주 쓰는 간단한 웹 유틸리티 도구 모음입니다.
        </p>
      </div>

      <div className="rounded-xl border border-dashed border-border p-20 text-center space-y-3">
        <p className="text-4xl">🔧</p>
        <p className="text-sm font-medium text-foreground">준비 중입니다</p>
        <p className="text-xs text-muted-foreground">
          기존 도구들을 React 컴포넌트로 마이그레이션하고 있습니다.
        </p>
      </div>
    </div>
  );
}
