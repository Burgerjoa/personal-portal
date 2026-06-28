# 🌐 Personal Portal — 정성우

> 이력서 · 기술 블로그 · 웹 유틸리티를 하나의 포털로 통합한 개인 브랜딩 사이트

[![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-38bdf8?logo=tailwindcss)](https://tailwindcss.com/)
[![shadcn/ui](https://img.shields.io/badge/shadcn%2Fui-latest-black)](https://ui.shadcn.com/)
[![Vercel](https://img.shields.io/badge/Deployed_on-Vercel-black?logo=vercel)](https://vercel.com/)

---

## 📌 프로젝트 개요

단순한 정적 블로그를 넘어, **실제로 유용한 서비스를 제공하는 포트폴리오 포털**을 지향합니다.

- 기존 순수 바닐라 JS 프로젝트(`own_site`)를 **React 기반으로 현대화**
- 주니어 프론트엔드 개발자로서의 **성장 과정을 공개적으로 아카이빙**
- 블로그 · 포트폴리오 · 유틸리티 도구를 **단일 도메인에서 운영**

---

## 🏗️ 기술 스택

| 구분 | 기술 | 선택 이유 |
|---|---|---|
| Framework | **Next.js (App Router)** | SSR/SSG 혼용으로 SEO 최적화, 실무 표준 |
| Language | **TypeScript** | 컴파일 타임 타입 검증, 유지보수성 향상 |
| Styling | **Tailwind CSS v4** | 빠른 UI 개발 속도, 일관된 디자인 토큰 |
| UI Components | **shadcn/ui** | 접근성 높은 Radix 기반 컴포넌트, 커스터마이징 자유도 |
| Content | **MDX** | 마크다운 안에 React 컴포넌트 삽입 가능 |
| Hosting | **Vercel** | Next.js 공식 호스팅, 무설정 CI/CD |

---

## 🗂️ 라우팅 구조

```
/                  → 메인 대시보드 (소개, 최근 글, 퀵링크)
/blog              → 기술 블로그 (MDX, 카테고리/태그 필터)
/tools             → 웹 유틸리티 허브
  /tools/text-counter  → 글자수 세기
  /tools/d-day         → 디데이 계산기
/projects          → 포트폴리오 / 토이 프로젝트 전시
```

---

## 🚀 로컬 실행

```bash
# 의존성 설치
npm install

# 개발 서버 시작 (http://localhost:3000)
npm run dev
```

---

## 📋 로드맵

| 상태 | 마일스톤 | 설명 |
|---|---|---|
| ✅ | **프로젝트 초기화** | Next.js + TypeScript + shadcn/ui 셋업 완료 |
| 🔨 | **사이트 퍼블리싱** | GNB · 푸터 · 메인 대시보드 레이아웃 완성 및 Vercel 프로덕션 배포 |
| ⬜ | **블로그 오픈** | MDX 기반 글쓰기 시스템 구축, 카테고리·태그 필터, 첫 포스팅 발행 |
| ⬜ | **유틸리티 허브 오픈** | 기존 `own_site` 도구(글자수 세기, 디데이 등) React 마이그레이션 및 `/tools` 페이지 개설 |
| ⬜ | **포트폴리오 개설** | 토이 프로젝트 카드 전시, `/projects` 페이지 오픈 |
| ⬜ | **SEO · 사이트맵 정비** | `sitemap.xml` · `robots.txt` 자동 생성, OG 태그 · 메타데이터 전면 적용 |
| ⬜ | **커스텀 도메인 연결** | 구매한 도메인 Vercel에 연결, HTTPS 자동 발급 |

---

## 📐 아키텍처 결정 기록 (ADR)

주요 기술 결정은 [`docs/ADR/`](./docs/ADR/) 에 문서화되어 있습니다.

| # | 제목 |
|---|---|
| [ADR-001](./docs/ADR/001-tech-stack-selection.md) | 초기 기술 스택 및 아키텍처 선정 |

---

## 📁 프로젝트 구조

```
personal-portal/
├── src/
│   ├── app/                # Next.js App Router 페이지
│   │   ├── blog/
│   │   ├── tools/
│   │   ├── projects/
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── components/         # 재사용 UI 컴포넌트
│   └── lib/                # 유틸리티 함수
├── docs/
│   └── ADR/                # Architecture Decision Records
├── public/                 # 정적 에셋
```

