import type { Metadata } from "next";
import { ToolStudio } from "@/components/tools/ToolStudio";

export const metadata: Metadata = {
  title: "Tools",
  description:
    "글자수 세기, D-Day 계산, Base64 변환, 비밀번호 생성 등 기존 own_site 도구를 통합한 웹 유틸리티 허브.",
};

export default function ToolsPage() {
  return (
    <div className="px-6 py-16 sm:px-12">
      <div className="mx-auto max-w-7xl">
        <header className="mb-10 grid gap-5 lg:grid-cols-[1fr_420px] lg:items-end">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.24em] text-muted-foreground">
              own_site migration
            </p>
            <h1 className="mt-3 text-5xl font-black tracking-normal sm:text-7xl">
              Tools
            </h1>
          </div>
          <p className="text-base leading-7 text-muted-foreground">
            예전에 만든 온라인 도구 모음을 Next.js 포털 안으로 옮겼습니다.
            서버로 보내지 않아도 되는 계산은 브라우저에서 즉시 처리합니다.
          </p>
        </header>

        <ToolStudio />
      </div>
    </div>
  );
}
