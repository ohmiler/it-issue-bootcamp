import { access, readFile, readdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import matter from "gray-matter";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, "..");
const courseFile = path.join(rootDir, "src", "lib", "course.ts");
const lessonsDir = path.join(rootDir, "content", "lessons");
const supportPages = [
  path.join(rootDir, "content", "glossary.mdx"),
  path.join(rootDir, "content", "extensions.mdx")
];

const requiredKeys = ["title", "day", "hour", "duration", "source"];

function parseLessons(courseSource) {
  const lessonsMatch = courseSource.match(
    /export const lessons: Lesson\[\] = \[([\s\S]*?)\];/
  );

  if (!lessonsMatch) {
    throw new Error("Could not find lessons array in src/lib/course.ts");
  }

  const objectMatches = lessonsMatch[1].matchAll(/\{([\s\S]*?)\}/g);
  const lessons = [];

  for (const match of objectMatches) {
    const block = match[1];
    const day = Number(block.match(/\bday:\s*(\d+)/)?.[1]);
    const hour = Number(block.match(/\bhour:\s*(\d+)/)?.[1]);
    const title = block.match(/\btitle:\s*"([^"]+)"/)?.[1];
    const sourceFile = block.match(/\bsourceFile:\s*"([^"]+)"/)?.[1];

    if (Number.isInteger(day) && Number.isInteger(hour) && title && sourceFile) {
      lessons.push({ day, hour, title, sourceFile });
    }
  }

  return lessons;
}

function stripFencedCode(markdown) {
  const lines = markdown.split(/\r?\n/);
  let inFence = false;
  let fenceMarker = "";
  let fenceLength = 0;

  return lines
    .map((line) => {
      const fenceMatch = line.match(/^(\s*)(`{3,}|~{3,})/);

      if (fenceMatch) {
        const fence = fenceMatch[2];
        const marker = fence[0];

        if (!inFence) {
          inFence = true;
          fenceMarker = marker;
          fenceLength = fence.length;
        } else if (marker === fenceMarker && fence.length >= fenceLength) {
          inFence = false;
          fenceMarker = "";
          fenceLength = 0;
        }
      }

      return inFence ? "" : line;
    })
    .join("\n");
}

async function listMdxFiles(dir) {
  let entries;

  try {
    entries = await readdir(dir, { withFileTypes: true });
  } catch {
    return [];
  }

  const files = [];

  for (const entry of entries) {
    const entryPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      files.push(...(await listMdxFiles(entryPath)));
    } else if (entry.isFile() && entry.name.endsWith(".mdx")) {
      files.push(path.relative(rootDir, entryPath));
    }
  }

  return files;
}

async function verifyLessonInventory(lessons) {
  const errors = [];
  const expectedFiles = lessons.map((lesson) =>
    path.join("content", "lessons", `day-${lesson.day}`, `hour-${lesson.hour}.mdx`)
  );
  const expectedSet = new Set(expectedFiles);
  const actualFiles = await listMdxFiles(lessonsDir);

  if (actualFiles.length !== expectedFiles.length) {
    errors.push(
      `Expected content/lessons to contain exactly ${expectedFiles.length} lesson .mdx files, found ${actualFiles.length}`
    );
  }

  for (const actualFile of actualFiles.sort()) {
    if (!expectedSet.has(actualFile)) {
      errors.push(`Unexpected lesson file: ${actualFile}`);
    }
  }

  return errors;
}

async function isReadable(filePath) {
  try {
    await access(filePath);
    return true;
  } catch {
    return false;
  }
}

async function verifyLesson(lesson) {
  const errors = [];
  const lessonPath = path.join(
    lessonsDir,
    `day-${lesson.day}`,
    `hour-${lesson.hour}.mdx`
  );
  const relativePath = path.relative(rootDir, lessonPath);

  let raw;
  try {
    raw = await readFile(lessonPath, "utf8");
  } catch {
    return [`Missing or unreadable lesson file: ${relativePath}`];
  }

  const parsed = matter(raw);

  for (const key of requiredKeys) {
    if (!(key in parsed.data)) {
      errors.push(`${relativePath}: missing frontmatter key "${key}"`);
    }
  }

  if (parsed.data.title !== lesson.title) {
    errors.push(
      `${relativePath}: title frontmatter is ${parsed.data.title}, expected ${lesson.title}`
    );
  }

  if (parsed.data.day !== lesson.day) {
    errors.push(`${relativePath}: day frontmatter is ${parsed.data.day}, expected ${lesson.day}`);
  }

  if (parsed.data.hour !== lesson.hour) {
    errors.push(`${relativePath}: hour frontmatter is ${parsed.data.hour}, expected ${lesson.hour}`);
  }

  if (parsed.data.duration !== 60) {
    errors.push(`${relativePath}: duration frontmatter is ${parsed.data.duration}, expected 60`);
  }

  if (parsed.data.source !== lesson.sourceFile) {
    errors.push(
      `${relativePath}: source frontmatter is ${parsed.data.source}, expected ${lesson.sourceFile}`
    );
  }

  const contentWithoutCode = stripFencedCode(parsed.content);
  const topLevelHeadings = contentWithoutCode.match(/^#\s+.+$/gm) ?? [];

  if (!topLevelHeadings.some((heading) => heading.trim() === `# ${lesson.title}`)) {
    errors.push(`${relativePath}: missing lesson heading "# ${lesson.title}"`);
  }

  if (topLevelHeadings.length !== 1) {
    errors.push(`${relativePath}: expected exactly 1 top-level heading, found ${topLevelHeadings.length}`);
  }

  const mdxEsmLines = contentWithoutCode.match(/^(import|export)\b.+$/gm) ?? [];
  if (mdxEsmLines.length > 0) {
    errors.push(
      `${relativePath}: prose line starts with MDX ESM keyword: ${mdxEsmLines[0]}`
    );
  }

  return errors;
}

async function main() {
  const courseSource = await readFile(courseFile, "utf8");
  const lessons = parseLessons(courseSource);
  const errors = [];

  if (lessons.length !== 20) {
    errors.push(`Expected 20 lessons in src/lib/course.ts, found ${lessons.length}`);
  }

  errors.push(...(await verifyLessonInventory(lessons)));

  for (const lesson of lessons) {
    errors.push(...(await verifyLesson(lesson)));
  }

  for (const supportPage of supportPages) {
    if (!(await isReadable(supportPage))) {
      errors.push(`Missing or unreadable support page: ${path.relative(rootDir, supportPage)}`);
    }
  }

  if (errors.length > 0) {
    console.error("Content verification failed:");
    for (const error of errors) {
      console.error(`- ${error}`);
    }
    process.exitCode = 1;
    return;
  }

  console.log("Content verification passed.");
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
});
