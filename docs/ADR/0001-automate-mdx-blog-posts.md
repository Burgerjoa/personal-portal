# ADR: 블로그 글 등록 방식 자동화 (Filesystem 기반 MDX 동적 로딩)

## 상태 (Status)
Accepted

## 컨텍스트 (Context)
기존 블로그 시스템은 새로운 `.mdx` 글을 작성할 때마다 `src/lib/blog.ts` 파일에 접근하여 컴포넌트와 메타데이터를 직접 `import` 하고 `posts` 배열에 수동으로 추가해야 했습니다. 이는 글 작성 경험(DX)을 크게 저해하며, 휴먼 에러를 유발할 가능성이 높았습니다.

## 결정 (Decision)
`src/lib/blog.ts` 내의 포스트 관리 방식을 정적 배열(Static Array)에서 **파일 시스템(fs) 기반 동적 로딩**으로 변경했습니다. 

- `fs.readdirSync`를 사용해 `src/content/blog` 디렉터리 내의 모든 `.mdx` 파일을 읽어옵니다.
- Next.js의 동적 `import()` 구문을 활용하여 각 파일의 `metadata`와 React 컴포넌트를 빌드/런타임에 불러오도록(`await import`) 비동기 처리합니다.
- 이에 따라 `getAllPosts` 및 `getPost` 함수를 `async` 함수로 변경하고, 데이터를 소비하는 페이지들(`/blog/page.tsx`, `/blog/[slug]/page.tsx`)에서 `await`로 데이터를 패칭하도록 수정했습니다.

## 결과 (Consequences)
**장점:**
1. **극강의 편의성:** 앞으로는 `src/content/blog` 폴더에 `.mdx` 파일만 추가하면 블로그에 글이 자동 등록됩니다. 별도의 설정 파일 수정이 필요 없습니다.
2. **유지보수성 향상:** 포스트 목록 관리가 단일 책임(디렉터리 파일 기준)으로 위임되어 코드가 깔끔해집니다.

**단점:**
- 데이터를 비동기로 불러와야 하므로 내부적으로 비동기 컴포넌트 처리가 강제되지만, Next.js App Router의 Server Components 환경에서는 이것이 자연스러운 패턴이므로 실질적인 성능 저하 및 단점은 없습니다.
