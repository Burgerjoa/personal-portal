import type { MDXComponents } from "mdx/types";

const components = {
  h2: ({ children }) => (
    <h2 className="mt-14 scroll-mt-24 text-3xl font-black tracking-normal">
      {children}
    </h2>
  ),
  h3: ({ children }) => (
    <h3 className="mt-10 scroll-mt-24 text-xl font-bold">{children}</h3>
  ),
  p: ({ children }) => (
    <p className="mt-5 text-base leading-8 text-foreground/80">{children}</p>
  ),
  ul: ({ children }) => (
    <ul className="mt-5 list-disc space-y-2 pl-6 leading-8 text-foreground/80">
      {children}
    </ul>
  ),
  ol: ({ children }) => (
    <ol className="mt-5 list-decimal space-y-2 pl-6 leading-8 text-foreground/80">
      {children}
    </ol>
  ),
  blockquote: ({ children }) => (
    <blockquote className="my-8 border-l-2 border-foreground bg-muted/40 px-5 py-1">
      {children}
    </blockquote>
  ),
  a: ({ href, children }) => (
    <a
      href={href}
      className="font-semibold underline decoration-muted-foreground underline-offset-4 hover:decoration-foreground"
    >
      {children}
    </a>
  ),
  code: ({ children }) => (
    <code className="border border-border bg-muted px-1.5 py-0.5 font-mono text-[0.9em]">
      {children}
    </code>
  ),
  pre: ({ children }) => (
    <pre className="my-7 overflow-x-auto border border-border bg-foreground p-5 text-sm leading-7 text-background [&_code]:border-0 [&_code]:bg-transparent [&_code]:p-0">
      {children}
    </pre>
  ),
  hr: () => <hr className="my-12 border-border" />,
} satisfies MDXComponents;

export function useMDXComponents(): MDXComponents {
  return components;
}
