import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, "..");
const sourceDir = path.join(rootDir, "New folder");
const outputDir = path.join(rootDir, "content", "lessons");
const courseFile = path.join(rootDir, "src", "lib", "course.ts");

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

  if (lessons.length !== 20) {
    throw new Error(`Expected 20 lessons in src/lib/course.ts, found ${lessons.length}`);
  }

  return lessons;
}

function yamlString(value) {
  return JSON.stringify(value);
}

function escapeMdxEsmLine(line) {
  const esmMatch = line.match(/^(import|export)\b(.*)$/);
  return esmMatch ? `{'${esmMatch[1]}'}${esmMatch[2]}` : line;
}

function demoteHeadingsOutsideFences(markdown) {
  const lines = markdown.replace(/^\uFEFF/, "").split(/\r?\n/);
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

        return line;
      }

      if (!inFence && /^#{1,5}(?=\s)/.test(line)) {
        return `#${line}`;
      }

      return inFence ? line : escapeMdxEsmLine(line);
    })
    .join("\n")
    .trim();
}

function buildMdx({ lesson, source }) {
  const body = demoteHeadingsOutsideFences(source);
  const frontmatter = [
    "---",
    `title: ${yamlString(lesson.title)}`,
    `day: ${lesson.day}`,
    `hour: ${lesson.hour}`,
    "duration: 60",
    `source: ${yamlString(lesson.sourceFile)}`,
    "---"
  ].join("\n");

  return `${frontmatter}\n\n# ${lesson.title}\n\n${body}\n`;
}

async function main() {
  const courseSource = await readFile(courseFile, "utf8");
  const lessons = parseLessons(courseSource);

  for (const lesson of lessons) {
    const sourcePath = path.join(sourceDir, lesson.sourceFile);
    const outputPath = path.join(
      outputDir,
      `day-${lesson.day}`,
      `hour-${lesson.hour}.mdx`
    );
    const source = await readFile(sourcePath, "utf8");
    const mdx = buildMdx({ lesson, source });

    await mkdir(path.dirname(outputPath), { recursive: true });
    await writeFile(outputPath, mdx, "utf8");
    console.log(
      `Migrated ${path.relative(rootDir, sourcePath)} -> ${path.relative(rootDir, outputPath)}`
    );
  }
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
});
