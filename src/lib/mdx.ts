import fs from "node:fs/promises";
import path from "node:path";
import { compileMDX } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypePrettyCode from "rehype-pretty-code";
import { mdxComponents } from "@/components/mdx-components";
import { remarkDiagrams } from "@/lib/remark-diagrams";

export type MdxFrontmatter = {
  title?: string;
  day?: number;
  hour?: number;
  duration?: number;
  source?: string;
};

const root = process.cwd();

export async function compileCourseMdx(filePath: string) {
  const raw = await fs.readFile(filePath, "utf8");

  return compileMDX<MdxFrontmatter>({
    source: raw,
    components: mdxComponents,
    options: {
      parseFrontmatter: true,
      mdxOptions: {
        remarkPlugins: [remarkGfm, remarkDiagrams],
        rehypePlugins: [
          [
            rehypePrettyCode,
            {
              theme: "dark-plus",
              keepBackground: false,
            },
          ],
        ],
      },
    },
  });
}

export async function compileLessonMdx(slug: string) {
  const filePath = path.join(root, "content", "lessons", `${slug}.mdx`);
  return compileCourseMdx(filePath);
}

export async function compileSupportMdx(
  fileName: "glossary.mdx" | "extensions.mdx",
) {
  const filePath = path.join(root, "content", fileName);
  return compileCourseMdx(filePath);
}
