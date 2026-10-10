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

export async function compileCourseMdxSource(
  source: string,
  parseFrontmatter = false,
) {
  return compileMDX<MdxFrontmatter>({
    source,
    components: mdxComponents,
    options: {
      parseFrontmatter,
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

export async function compileCourseMdx(filePath: string) {
  const raw = await fs.readFile(filePath, "utf8");

  return compileCourseMdxSource(raw, true);
}

export async function readLessonMdxSource(slug: string) {
  const filePath = path.join(root, "content", "lessons", `${slug}.mdx`);
  return fs.readFile(filePath, "utf8");
}

const lessonHeadingPattern = /^(?:##\s+)?Day\s+\d+\s+-\s+ชั่วโมงที่\s+\d+:\s*(.+)$/;

// The page header already shows the lesson title, so the document skips the
// "# Title" and "Day N - ชั่วโมงที่ N: ..." lines that open every lesson file.
export function splitLessonHeading(source: string) {
  const lines = source.split(/\r?\n/);
  const frontmatterEnd =
    lines[0] === "---" ? lines.indexOf("---", 1) : -1;
  const introEnd = lines.findIndex(
    (line, index) => index > frontmatterEnd && /^#{2,3}\s+(?!Day\s)/.test(line),
  );
  const searchEnd = introEnd === -1 ? lines.length : introEnd;
  let heading: string | undefined;
  let removedTitle = false;

  const body = lines.filter((line, index) => {
    if (index <= frontmatterEnd || index >= searchEnd) {
      return true;
    }

    if (!removedTitle && /^#\s+/.test(line)) {
      removedTitle = true;
      return false;
    }

    const headingMatch = heading === undefined && line.match(lessonHeadingPattern);

    if (headingMatch) {
      heading = headingMatch[1].trim();
      return false;
    }

    return true;
  });

  return { heading, body: body.join("\n") };
}

export async function compileLessonMdx(slug: string) {
  const raw = await readLessonMdxSource(slug);
  const { heading, body } = splitLessonHeading(raw);
  const compiled = await compileCourseMdxSource(body, true);

  return { ...compiled, heading };
}

export async function compileSupportMdx(
  fileName: "glossary.mdx" | "extensions.mdx",
) {
  const filePath = path.join(root, "content", fileName);
  return compileCourseMdx(filePath);
}
