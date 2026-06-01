import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const lessonPath = path.join(root, "content", "lessons", "day-1", "hour-1.mdx");
const componentPath = path.join(root, "src", "components", "teaching-flow-diagram.tsx");
const mdxComponentsPath = path.join(root, "src", "components", "mdx-components.tsx");
const cssPath = path.join(root, "src", "app", "globals.css");

const lesson = fs.readFileSync(lessonPath, "utf8");
const css = fs.readFileSync(cssPath, "utf8");
const mdxComponents = fs.readFileSync(mdxComponentsPath, "utf8");
const component = fs.existsSync(componentPath)
  ? fs.readFileSync(componentPath, "utf8")
  : "";

const requiredVariants = [
  "bootcamp-map",
  "system-overview",
  "issue-submit-flow",
  "runtime-flow",
  "development-flow",
];

const failures = [];

if (!fs.existsSync(componentPath)) {
  failures.push("Missing reusable TeachingFlowDiagram component.");
}

for (const variant of requiredVariants) {
  if (!lesson.includes(`<TeachingFlowDiagram variant="${variant}"`)) {
    failures.push(`Missing TeachingFlowDiagram variant: ${variant}`);
  }
}

if (!mdxComponents.includes("TeachingFlowDiagram")) {
  failures.push("TeachingFlowDiagram is not registered as an MDX component.");
}

if (/```mermaid\s+flowchart\s+LR\s+user\(\["User<br\/>ผู้ใช้งาน"\]\)/.test(lesson)) {
  failures.push("System/runtime user flow is still rendered as a wide Mermaid LR flowchart.");
}

if (/```mermaid\s+flowchart\s+LR\s+open\["เปิดหน้าแจ้งปัญหา"\]/.test(lesson)) {
  failures.push("Issue submit flow is still rendered as a wide Mermaid LR flowchart.");
}

if (/```mermaid\s+flowchart\s+LR\s+vscode\["VS Code<br\/>เขียน HTML \/ CSS \/ TypeScript"\]/.test(lesson)) {
  failures.push("Development workflow is still rendered as a wide Mermaid LR flowchart.");
}

if (/[ÃÂ�]|à[¸¹]/.test(`${lesson}\n${component}`)) {
  failures.push("Lesson or diagram copy appears to contain mojibake or broken Unicode text.");
}

if (!css.includes(".slide-prose .teaching-flow__steps {\n  flex-wrap: nowrap;\n  gap: 0;\n}")) {
  failures.push("Large slide Teaching Flow should stay in one horizontal row.");
}

if (!css.includes(".slide-prose .teaching-flow__item {\n  flex: 1 1 0;\n}")) {
  failures.push("Large slide Teaching Flow items should share one row instead of forcing the final node to wrap.");
}

if (!css.includes(".slide-prose .teaching-flow__connector {\n  min-width: 2rem;\n  flex: 0 0 clamp(2rem, 2.8vw, 3.2rem);\n  padding: 0;\n}")) {
  failures.push("Slide Teaching Flow connectors should be compact to preserve node reading space.");
}

if (!css.includes(".slide-prose .teaching-flow__connector-label {\n  display: none;\n}")) {
  failures.push("Slide Teaching Flow connector labels should be hidden to avoid cramped projected slides.");
}

if (!css.includes("  .slide-prose .teaching-flow__item {\n    flex: 0 0 auto;\n  }")) {
  failures.push("Mobile slide Teaching Flow items should reset their desktop basis so nodes do not become too tall.");
}

if (!css.includes(".slide-prose h2 {\n  margin: 0 0 1.3rem;\n  padding-top: 0.12em;\n  font-size: clamp(2.45rem, 4.2vw, 4.25rem);\n  line-height: 1.28;\n  overflow: visible;\n}")) {
  failures.push("Slide h2 headings need Thai-safe top padding and line-height so vowels and tone marks are not clipped.");
}

if (!css.includes(".slide-prose h3 {\n  margin: 1.25rem 0 0.6rem;\n  padding-top: 0.08em;\n  font-size: clamp(1.35rem, 2vw, 2rem);\n  line-height: 1.42;\n}")) {
  failures.push("Slide h3 headings need Thai-safe line-height.");
}

if (!css.includes(".slide-prose p,\n.slide-prose li {\n  font-size: clamp(1.1rem, 1.45vw, 1.45rem);\n  line-height: 1.68;\n}")) {
  failures.push("Slide body and list text need Thai-safe line-height.");
}

if (!css.includes(".slide-prose .teaching-flow__node-text strong {\n  font-size: clamp(1rem, 1.25vw, 1.22rem);\n  line-height: 1.35;\n}")) {
  failures.push("Slide Teaching Flow node titles need Thai-safe line-height.");
}

if (failures.length > 0) {
  console.error("Diagram verification failed:");
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exit(1);
}

console.log("Diagram verification passed.");
