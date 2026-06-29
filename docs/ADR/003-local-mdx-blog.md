# ADR-003: Local MDX Blog

## Status

Accepted

## Context

The portal needs a blog that can publish technical notes alongside tools and projects. It currently has one author, a small number of posts, and no requirement for browser-based editing or editorial roles.

## Decision

Store posts as local MDX files under `src/content/blog`. Each post exports typed metadata and a default MDX component. A static registry in `src/lib/blog.ts` exposes sorted post data to the index and dynamic detail route.

Use `generateStaticParams` with `dynamicParams = false` so every known post is rendered and validated at build time. Generate page metadata from the same post record used by the page.

## Consequences

- Posts are versioned with the application and require no database or authentication layer.
- MDX allows React components to be introduced later without replacing the content format.
- Adding a post currently requires adding its import to the registry.
- A CMS or generated content index can replace the registry later if authorship or post volume grows.

## References

- [Next.js: How to use Markdown and MDX](https://nextjs.org/docs/app/guides/mdx) - used for the official `@next/mdx` setup, `mdx-components.tsx`, and the dynamic MDX route pattern.
- [Next.js: generateStaticParams](https://nextjs.org/docs/app/api-reference/functions/generate-static-params) - used for build-time generation of known post routes.
- [Vercel Portfolio Starter Kit](https://vercel.com/templates/next.js/portfolio-starter-kit) - reviewed as a reference for the typical scope of a file-based portfolio blog and possible later additions such as RSS, sitemap, and OG images. Its implementation was not copied.

The typed metadata contract, explicit post registry, visual design, and newer/older navigation are project-specific decisions.
