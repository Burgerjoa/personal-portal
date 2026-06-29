declare module "*.mdx" {
  import type { ComponentType } from "react";
  import type { PostMetadata } from "@/lib/blog";

  export const metadata: PostMetadata;
  const MDXContent: ComponentType;
  export default MDXContent;
}
