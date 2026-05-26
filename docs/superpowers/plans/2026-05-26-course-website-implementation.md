# Course Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the dark course-book website for the 5-day bootcamp using Next.js, Tailwind CSS, MDX lesson content, and Shiki-powered code highlighting.

**Architecture:** The site is a Next.js App Router app in the workspace root. Course structure lives in a typed manifest, MDX lesson files live under `content/lessons`, and route pages render those lessons through reusable course-book components. Existing draft markdown from `New folder` is migrated into MDX rather than edited in place.

**Tech Stack:** Next.js, React, TypeScript, Tailwind CSS v4, `next-mdx-remote`, `gray-matter`, `rehype-pretty-code`, Shiki, Lucide React.

---

## File Structure

Create or modify these files:

- Create `package.json`: scripts and dependencies.
- Create `tsconfig.json`: TypeScript and `@/*` path alias.
- Create `next.config.mjs`: Next.js config.
- Create `postcss.config.mjs`: Tailwind v4 PostCSS plugin.
- Create `next-env.d.ts`: Next.js TypeScript declarations.
- Create `src/app/globals.css`: dark theme, prose styles, Shiki styles.
- Create `src/app/layout.tsx`: root app layout.
- Create `src/app/page.tsx`: 5-day overview page.
- Create `src/app/lessons/[day]/[hour]/page.tsx`: lesson route.
- Create `src/app/glossary/page.tsx`: glossary route.
- Create `src/app/extensions/page.tsx`: extension case-study route.
- Create `src/components/course-shell.tsx`: shared course-book layout.
- Create `src/components/sidebar-nav.tsx`: day/hour navigation.
- Create `src/components/lesson-pager.tsx`: previous/next lesson links.
- Create `src/components/mdx-components.tsx`: MDX component mapping.
- Create `src/lib/course.ts`: typed course manifest and helpers.
- Create `src/lib/mdx.ts`: MDX loading and compilation.
- Create `scripts/migrate-lessons.mjs`: converts existing lesson markdown into MDX.
- Create `scripts/verify-content.mjs`: verifies lesson content exists and has required frontmatter.
- Create `content/glossary.mdx`: stable glossary page content.
- Create `content/extensions.mdx`: extension case-study content.

Do not delete `New folder`. It remains the source archive for the first migration.

---

### Task 1: Add Project Configuration

**Files:**
- Create: `package.json`
- Create: `tsconfig.json`
- Create: `next.config.mjs`
- Create: `postcss.config.mjs`
- Create: `next-env.d.ts`

- [ ] **Step 1: Create `package.json`**

```json
{
  "name": "advance-bootcamp-5-days",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "migrate:lessons": "node scripts/migrate-lessons.mjs",
    "verify:content": "node scripts/verify-content.mjs",
    "check": "npm run verify:content && npm run build"
  },
  "dependencies": {
    "gray-matter": "latest",
    "lucide-react": "latest",
    "next": "latest",
    "next-mdx-remote": "latest",
    "react": "latest",
    "react-dom": "latest",
    "rehype-pretty-code": "latest",
    "shiki": "latest"
  },
  "devDependencies": {
    "@types/mdx": "latest",
    "@tailwindcss/postcss": "latest",
    "@types/node": "latest",
    "@types/react": "latest",
    "@types/react-dom": "latest",
    "postcss": "latest",
    "tailwindcss": "latest",
    "typescript": "latest"
  }
}
```

- [ ] **Step 2: Create `tsconfig.json`**

```json
{
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": false,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

- [ ] **Step 3: Create `next.config.mjs`**

```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true
};

export default nextConfig;
```

- [ ] **Step 4: Create `postcss.config.mjs`**

```js
const config = {
  plugins: {
    "@tailwindcss/postcss": {}
  }
};

export default config;
```

- [ ] **Step 5: Create `next-env.d.ts`**

```ts
/// <reference types="next" />
/// <reference types="next/image-types/global" />

// This file is generated once for the course website and should stay committed.
```

- [ ] **Step 6: Install dependencies**

Run:

```bash
npm install
```

Expected: `node_modules` and `package-lock.json` are created.

- [ ] **Step 7: Verify scripts are registered**

Run:

```bash
npm run verify:content
```

Expected: this fails with `Cannot find module` or missing script target because verification has not been implemented yet. This confirms the script name is wired and ready for later tasks.

- [ ] **Step 8: Commit**

If the workspace has been initialized as a git repository, run:

```bash
git add package.json package-lock.json tsconfig.json next.config.mjs postcss.config.mjs next-env.d.ts
git commit -m "chore: add course website project config"
```

If there is no `.git` directory, record this in the final implementation notes instead of committing.

---

### Task 2: Add Typed Course Manifest

**Files:**
- Create: `src/lib/course.ts`

- [ ] **Step 1: Create `src/lib/course.ts`**

```ts
export type Lesson = {
  slug: string;
  day: number;
  hour: number;
  title: string;
  summary: string;
  sourceFile: string;
  checkpoint: string;
};

export type CourseDay = {
  day: number;
  title: string;
  goal: string;
};

export const courseDays: CourseDay[] = [
  {
    day: 1,
    title: "Static Prototype and Git",
    goal: "Understand web workflow and create a static issue reporting prototype."
  },
  {
    day: 2,
    title: "Next.js and TypeScript Models",
    goal: "Move from static pages to a Next.js app and make the data model explicit."
  },
  {
    day: 3,
    title: "Tailwind and Mock CRUD",
    goal: "Improve UI and practice CRUD flow before the real database."
  },
  {
    day: 4,
    title: "Supabase Read/Create and Deploy",
    goal: "Connect the app to a real database and reach a deployment checkpoint."
  },
  {
    day: 5,
    title: "Admin Update, Auth, RLS, and Security",
    goal: "Add real-world access control and security thinking around the CRUD system."
  }
];

export const lessons: Lesson[] = [
  {
    slug: "day-1/hour-1",
    day: 1,
    hour: 1,
    title: "Basic Website Workflow",
    summary: "Frontend, backend, database, request/response, CRUD, and project framing.",
    sourceFile: "day-1-hour-1-web-workflow.md",
    checkpoint: "Learners can explain the issue reporting flow."
  },
  {
    slug: "day-1/hour-2",
    day: 1,
    hour: 2,
    title: "HTML Foundation",
    summary: "Semantic HTML, form fields, labels, inputs, textarea, and button structure.",
    sourceFile: "day-1-hour-2-html-foundation.md",
    checkpoint: "Learners have an issue report form in index.html."
  },
  {
    slug: "day-1/hour-3",
    day: 1,
    hour: 3,
    title: "CSS Foundation",
    summary: "Selectors, box model, form styling, layout, and responsive basics.",
    sourceFile: "day-1-hour-3-css-foundation.md",
    checkpoint: "Learners have a readable static form styled with styles.css."
  },
  {
    slug: "day-1/hour-4",
    day: 1,
    hour: 4,
    title: "Issue List and Git",
    summary: "Static issue list, status badges, README, and GitHub push.",
    sourceFile: "day-1-hour-4-issue-list-and-git.md",
    checkpoint: "Learners push the Day 1 static prototype to GitHub."
  },
  {
    slug: "day-2/hour-1",
    day: 2,
    hour: 1,
    title: "Next.js Setup",
    summary: "Project setup, App Router, page, layout, global styles, and dev server.",
    sourceFile: "day-2-hour-1-nextjs-setup.md",
    checkpoint: "Learners can open the Next.js app locally."
  },
  {
    slug: "day-2/hour-2",
    day: 2,
    hour: 2,
    title: "Convert Static to Next.js",
    summary: "Move HTML/CSS prototype into TSX and Next.js app structure.",
    sourceFile: "day-2-hour-2-convert-static-to-nextjs.md",
    checkpoint: "The static prototype renders inside Next.js."
  },
  {
    slug: "day-2/hour-3",
    day: 2,
    hour: 3,
    title: "TypeScript Data Model",
    summary: "Issue, IssueStatus, mock data, mapping arrays, and data-driven rendering.",
    sourceFile: "day-2-hour-3-typescript-data-model.md",
    checkpoint: "The issue list renders from typed mock data."
  },
  {
    slug: "day-2/hour-4",
    day: 2,
    hour: 4,
    title: "Components and Routing",
    summary: "Component extraction, shared types, mock data files, and basic routes.",
    sourceFile: "day-2-hour-4-components-and-routing.md",
    checkpoint: "The app uses reusable components and routes."
  },
  {
    slug: "day-3/hour-1",
    day: 3,
    hour: 1,
    title: "Tailwind Setup and Utilities",
    summary: "Tailwind setup, spacing, typography, colors, layout, and state utilities.",
    sourceFile: "day-3-hour-1-tailwind-setup-and-utilities.md",
    checkpoint: "Learners start converting the UI to Tailwind."
  },
  {
    slug: "day-3/hour-2",
    day: 3,
    hour: 2,
    title: "Tailwind Components and Responsive UI",
    summary: "Status badges, issue list, form layout, responsive behavior, and empty states.",
    sourceFile: "day-3-hour-2-tailwind-components-and-responsive-ui.md",
    checkpoint: "The main UI is readable and responsive."
  },
  {
    slug: "day-3/hour-3",
    day: 3,
    hour: 3,
    title: "Form State and Validation",
    summary: "Client state, FormData, validation results, error state, and mock create.",
    sourceFile: "day-3-hour-3-form-state-and-validation.md",
    checkpoint: "Submitting the form adds a mock issue after validation."
  },
  {
    slug: "day-3/hour-4",
    day: 3,
    hour: 4,
    title: "Mock CRUD and Database Prep",
    summary: "Mock update, close concept, filters, database transition, and Server Actions preview.",
    sourceFile: "day-3-hour-4-mock-crud-and-database-prep.md",
    checkpoint: "Learners understand the CRUD flow before Supabase."
  },
  {
    slug: "day-4/hour-1",
    day: 4,
    hour: 1,
    title: "Supabase Setup and Schema",
    summary: "Supabase project, issues table, status enum, seed data, and environment variables.",
    sourceFile: "day-4-hour-1-supabase-setup-and-schema.md",
    checkpoint: "Supabase has an issues table and seed data."
  },
  {
    slug: "day-4/hour-2",
    day: 4,
    hour: 2,
    title: "Read from Supabase",
    summary: "Server client, database row mapping, getIssues, list page, and detail page.",
    sourceFile: "day-4-hour-2-read-from-supabase.md",
    checkpoint: "The app reads issues from Supabase."
  },
  {
    slug: "day-4/hour-3",
    day: 4,
    hour: 3,
    title: "Create with Server Actions",
    summary: "Server Actions, server-side validation, createIssue, and form integration.",
    sourceFile: "day-4-hour-3-create-with-server-actions.md",
    checkpoint: "The app creates issues in Supabase."
  },
  {
    slug: "day-4/hour-4",
    day: 4,
    hour: 4,
    title: "Deploy Checkpoint",
    summary: "Production environment variables, Vercel deployment, and deploy verification.",
    sourceFile: "day-4-hour-4-update-delete-and-deploy.md",
    checkpoint: "Learners have a deployed app that can read and create issues."
  },
  {
    slug: "day-5/hour-1",
    day: 5,
    hour: 1,
    title: "Auth Flow and Supabase SSR",
    summary: "Authentication, authorization, session, cookies, Supabase SSR, and server client setup.",
    sourceFile: "day-5-hour-1-auth-flow-and-supabase-ssr.md",
    checkpoint: "The app can read session state on the server."
  },
  {
    slug: "day-5/hour-2",
    day: 5,
    hour: 2,
    title: "Login, Logout, and Protected Pages",
    summary: "Prepared accounts, login form, logout action, requireUser, and protected routes.",
    sourceFile: "day-5-hour-2-login-logout-and-protected-pages.md",
    checkpoint: "Learners can log in and access a protected page."
  },
  {
    slug: "day-5/hour-3",
    day: 5,
    hour: 3,
    title: "Authorization, RLS, and Admin",
    summary: "USER/ADMIN roles, profiles, created_by, RLS policies, admin page, and update status.",
    sourceFile: "day-5-hour-3-authorization-rls-and-admin.md",
    checkpoint: "Admin can update status and users see only allowed data."
  },
  {
    slug: "day-5/hour-4",
    day: 5,
    hour: 4,
    title: "Security, LLM-Safe Coding, and Final Demo",
    summary: "OWASP mapping, deployment checks, LLM-safe workflow, security checklist, and final demo.",
    sourceFile: "day-5-hour-4-security-llm-safe-and-final-demo.md",
    checkpoint: "Learners can explain CRUD, auth, role, RLS, deploy, and security risks."
  }
];

export function getLessonsByDay(day: number) {
  return lessons.filter((lesson) => lesson.day === day);
}

export function getLesson(day: string, hour: string) {
  const dayNumber = Number(day.replace("day-", ""));
  const hourNumber = Number(hour.replace("hour-", ""));

  if (!Number.isInteger(dayNumber) || !Number.isInteger(hourNumber)) {
    return undefined;
  }

  return lessons.find((lesson) => lesson.day === dayNumber && lesson.hour === hourNumber);
}

export function getLessonBySlug(slug: string) {
  return lessons.find((lesson) => lesson.slug === slug);
}

export function getLessonIndex(slug: string) {
  return lessons.findIndex((lesson) => lesson.slug === slug);
}

export function getPreviousLesson(slug: string) {
  const index = getLessonIndex(slug);
  return index > 0 ? lessons[index - 1] : undefined;
}

export function getNextLesson(slug: string) {
  const index = getLessonIndex(slug);
  return index >= 0 && index < lessons.length - 1 ? lessons[index + 1] : undefined;
}

export function lessonHref(lesson: Lesson) {
  return `/lessons/day-${lesson.day}/hour-${lesson.hour}`;
}
```

- [ ] **Step 2: Verify TypeScript parses the file**

Run:

```bash
npx tsc --noEmit
```

Expected: this may fail because the app files do not exist yet, but it must not report syntax errors in `src/lib/course.ts`.

- [ ] **Step 3: Commit**

If git is available:

```bash
git add src/lib/course.ts
git commit -m "feat: add course manifest"
```

---

### Task 3: Add Content Migration and Verification Scripts

**Files:**
- Create: `scripts/migrate-lessons.mjs`
- Create: `scripts/verify-content.mjs`

- [ ] **Step 1: Create `scripts/migrate-lessons.mjs`**

```js
import fs from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const sourceDir = path.join(root, "New folder");
const targetDir = path.join(root, "content", "lessons");

const lessons = [
  ["day-1/hour-1", 1, 1, "Basic Website Workflow", "day-1-hour-1-web-workflow.md"],
  ["day-1/hour-2", 1, 2, "HTML Foundation", "day-1-hour-2-html-foundation.md"],
  ["day-1/hour-3", 1, 3, "CSS Foundation", "day-1-hour-3-css-foundation.md"],
  ["day-1/hour-4", 1, 4, "Issue List and Git", "day-1-hour-4-issue-list-and-git.md"],
  ["day-2/hour-1", 2, 1, "Next.js Setup", "day-2-hour-1-nextjs-setup.md"],
  ["day-2/hour-2", 2, 2, "Convert Static to Next.js", "day-2-hour-2-convert-static-to-nextjs.md"],
  ["day-2/hour-3", 2, 3, "TypeScript Data Model", "day-2-hour-3-typescript-data-model.md"],
  ["day-2/hour-4", 2, 4, "Components and Routing", "day-2-hour-4-components-and-routing.md"],
  ["day-3/hour-1", 3, 1, "Tailwind Setup and Utilities", "day-3-hour-1-tailwind-setup-and-utilities.md"],
  ["day-3/hour-2", 3, 2, "Tailwind Components and Responsive UI", "day-3-hour-2-tailwind-components-and-responsive-ui.md"],
  ["day-3/hour-3", 3, 3, "Form State and Validation", "day-3-hour-3-form-state-and-validation.md"],
  ["day-3/hour-4", 3, 4, "Mock CRUD and Database Prep", "day-3-hour-4-mock-crud-and-database-prep.md"],
  ["day-4/hour-1", 4, 1, "Supabase Setup and Schema", "day-4-hour-1-supabase-setup-and-schema.md"],
  ["day-4/hour-2", 4, 2, "Read from Supabase", "day-4-hour-2-read-from-supabase.md"],
  ["day-4/hour-3", 4, 3, "Create with Server Actions", "day-4-hour-3-create-with-server-actions.md"],
  ["day-4/hour-4", 4, 4, "Deploy Checkpoint", "day-4-hour-4-update-delete-and-deploy.md"],
  ["day-5/hour-1", 5, 1, "Auth Flow and Supabase SSR", "day-5-hour-1-auth-flow-and-supabase-ssr.md"],
  ["day-5/hour-2", 5, 2, "Login, Logout, and Protected Pages", "day-5-hour-2-login-logout-and-protected-pages.md"],
  ["day-5/hour-3", 5, 3, "Authorization, RLS, and Admin", "day-5-hour-3-authorization-rls-and-admin.md"],
  ["day-5/hour-4", 5, 4, "Security, LLM-Safe Coding, and Final Demo", "day-5-hour-4-security-llm-safe-and-final-demo.md"]
];

function normalizeMarkdown(markdown, title) {
  const withoutBom = markdown.replace(/^\uFEFF/, "");
  const demotedSlides = withoutBom.replace(/^# Slide /gm, "## Slide ");
  const demotedTopLevel = demotedSlides.replace(/^# /gm, "## ");
  return `# ${title}\n\n${demotedTopLevel.trim()}\n`;
}

for (const [slug, day, hour, title, sourceFile] of lessons) {
  const sourcePath = path.join(sourceDir, sourceFile);
  const targetPath = path.join(targetDir, `day-${day}`, `hour-${hour}.mdx`);
  const raw = await fs.readFile(sourcePath, "utf8");
  const body = normalizeMarkdown(raw, title);
  const frontmatter = [
    "---",
    `title: "${title.replaceAll('"', '\\"')}"`,
    `day: ${day}`,
    `hour: ${hour}`,
    "duration: 60",
    `source: "${sourceFile}"`,
    "---",
    ""
  ].join("\n");

  await fs.mkdir(path.dirname(targetPath), { recursive: true });
  await fs.writeFile(targetPath, `${frontmatter}${body}`, "utf8");
  console.log(`Wrote ${path.relative(root, targetPath)}`);
}
```

- [ ] **Step 2: Create `scripts/verify-content.mjs`**

```js
import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";

const root = process.cwd();
const requiredLessons = Array.from({ length: 5 }, (_, dayIndex) => {
  const day = dayIndex + 1;
  return Array.from({ length: 4 }, (_, hourIndex) => ({
    day,
    hour: hourIndex + 1,
    file: path.join(root, "content", "lessons", `day-${day}`, `hour-${hourIndex + 1}.mdx`)
  }));
}).flat();

const errors = [];

for (const lesson of requiredLessons) {
  try {
    const raw = await fs.readFile(lesson.file, "utf8");
    const parsed = matter(raw);
    for (const key of ["title", "day", "hour", "duration", "source"]) {
      if (parsed.data[key] === undefined) {
        errors.push(`${path.relative(root, lesson.file)} missing frontmatter key ${key}`);
      }
    }
    if (parsed.data.day !== lesson.day) {
      errors.push(`${path.relative(root, lesson.file)} has day ${parsed.data.day}, expected ${lesson.day}`);
    }
    if (parsed.data.hour !== lesson.hour) {
      errors.push(`${path.relative(root, lesson.file)} has hour ${parsed.data.hour}, expected ${lesson.hour}`);
    }
    if (!parsed.content.includes("# ")) {
      errors.push(`${path.relative(root, lesson.file)} does not include a lesson heading`);
    }
  } catch (error) {
    errors.push(`${path.relative(root, lesson.file)} cannot be read: ${error.message}`);
  }
}

for (const file of ["content/glossary.mdx", "content/extensions.mdx"]) {
  try {
    await fs.readFile(path.join(root, file), "utf8");
  } catch (error) {
    errors.push(`${file} cannot be read: ${error.message}`);
  }
}

if (errors.length > 0) {
  console.error(errors.join("\n"));
  process.exit(1);
}

console.log(`Verified ${requiredLessons.length} lesson files and 2 support content files.`);
```

- [ ] **Step 3: Run migration**

Run:

```bash
npm run migrate:lessons
```

Expected: output includes 20 `Wrote content\lessons\...` lines.

- [ ] **Step 4: Run verification and confirm support pages are still missing**

Run:

```bash
npm run verify:content
```

Expected: fails with messages for `content/glossary.mdx` and `content/extensions.mdx`. Lesson file errors must not appear.

- [ ] **Step 5: Commit**

If git is available:

```bash
git add scripts/migrate-lessons.mjs scripts/verify-content.mjs content/lessons
git commit -m "feat: migrate lesson drafts to mdx"
```

---

### Task 4: Add Glossary and Extension Content

**Files:**
- Create: `content/glossary.mdx`
- Create: `content/extensions.mdx`

- [ ] **Step 1: Create `content/glossary.mdx`**

```mdx
---
title: "Glossary"
---

# Glossary

## Authentication

Authentication means checking who the user is. In this course, learners use prepared email/password accounts so the classroom can focus on session flow and protected pages.

## Authorization

Authorization means checking what the authenticated user is allowed to do. In the project, this appears as USER and ADMIN role checks.

## CRUD

CRUD means Create, Read, Update, and Delete. The course project uses Create for new issues, Read for issue lists and details, Update for admin status changes, and Delete as a close or soft-delete discussion.

## Server Action

A Server Action is server-side code called from a form or UI interaction in a Next.js app. In this course, Server Actions validate input and call Supabase.

## RLS

RLS means Row Level Security. It is a database-level rule that limits which rows a user can read or change.

## Managed Backend

A managed backend is backend infrastructure provided by a platform. Supabase provides Postgres, Auth, and RLS for this course, but learners still need to understand backend responsibilities.

## Checkpoint Branch

A checkpoint branch is a known-working project state. Learners who fall behind can use it to rejoin the class without blocking the room.

## LLM-Safe Coding

LLM-safe coding means using an AI tool with review discipline. Learners ask for explanations, edge cases, and security review instead of pasting secrets or trusting generated auth code blindly.
```

- [ ] **Step 2: Create `content/extensions.mdx`**

```mdx
---
title: "Extension Map"
---

# Extension Map

The course builds an internal IT issue reporting system as the main project. The same model can be extended to university workflows after the core path is stable.

## Exam or Event Registration

Map the core issue system to a registration workflow:

- Create: applicant submits a registration form.
- Read: applicant checks their registration status.
- Update: admin approves payment evidence or updates application status.
- Delete: admin cancels or archives an invalid application.

## Image Upload

Image upload maps to Supabase Storage. It should be added after learners understand database rows because uploaded files need metadata, ownership, and permission rules.

## Google OAuth

Google OAuth can replace prepared email/password accounts after learners understand authentication flow. It adds provider setup, redirect URLs, and production domain configuration.

## Notification

Notification can be added after status updates work. A status change can trigger email, LINE, or push notification, but notification should not be part of the core 20-hour path.

## Docker

Docker is useful for deployment and infrastructure consistency, but this bootcamp uses managed services and Vercel deployment to keep the classroom focused on web application flow.
```

- [ ] **Step 3: Verify support content now exists**

Run:

```bash
npm run verify:content
```

Expected: `Verified 20 lesson files and 2 support content files.`

- [ ] **Step 4: Commit**

If git is available:

```bash
git add content/glossary.mdx content/extensions.mdx
git commit -m "docs: add glossary and extension map"
```

---

### Task 5: Add Global Styles and Root Layout

**Files:**
- Create: `src/app/globals.css`
- Create: `src/app/layout.tsx`

- [ ] **Step 1: Create `src/app/globals.css`**

```css
@import "tailwindcss";

:root {
  color-scheme: dark;
  --background: #05070d;
  --panel: #0b1020;
  --panel-soft: #111827;
  --border: #243044;
  --text: #e5e7eb;
  --muted: #9ca3af;
  --accent: #38bdf8;
  --accent-soft: rgba(56, 189, 248, 0.12);
  --success: #22c55e;
  --warning: #f97316;
}

* {
  box-sizing: border-box;
}

html {
  background: var(--background);
  color: var(--text);
}

body {
  margin: 0;
  min-height: 100vh;
  background:
    linear-gradient(180deg, rgba(56, 189, 248, 0.08), transparent 360px),
    var(--background);
  color: var(--text);
  font-family: Arial, Helvetica, sans-serif;
}

a {
  color: inherit;
  text-decoration: none;
}

code {
  font-family: "SFMono-Regular", Consolas, "Liberation Mono", monospace;
}

.lesson-prose {
  color: var(--text);
  line-height: 1.75;
}

.lesson-prose h1 {
  margin: 0 0 1rem;
  font-size: clamp(2rem, 4vw, 3.5rem);
  line-height: 1.05;
  letter-spacing: 0;
}

.lesson-prose h2 {
  margin: 2.25rem 0 0.75rem;
  font-size: 1.45rem;
  line-height: 1.25;
  letter-spacing: 0;
}

.lesson-prose h3 {
  margin: 1.75rem 0 0.5rem;
  font-size: 1.15rem;
  line-height: 1.3;
  letter-spacing: 0;
}

.lesson-prose p,
.lesson-prose li {
  color: #cbd5e1;
}

.lesson-prose ul,
.lesson-prose ol {
  padding-left: 1.25rem;
}

.lesson-prose table {
  width: 100%;
  border-collapse: collapse;
  overflow: hidden;
  border: 1px solid var(--border);
  border-radius: 8px;
}

.lesson-prose th,
.lesson-prose td {
  border-bottom: 1px solid var(--border);
  padding: 0.75rem;
  text-align: left;
}

.lesson-prose th {
  background: var(--panel-soft);
  color: #f8fafc;
}

.lesson-prose pre {
  overflow-x: auto;
  border: 1px solid var(--border);
  border-radius: 8px;
  padding: 1rem;
}

.lesson-prose :not(pre) > code {
  border: 1px solid var(--border);
  border-radius: 6px;
  background: #0f172a;
  padding: 0.1rem 0.35rem;
  color: #f8fafc;
}

.lesson-prose blockquote {
  margin: 1rem 0;
  border-left: 3px solid var(--accent);
  padding: 0.4rem 0 0.4rem 1rem;
  color: #dbeafe;
  background: var(--accent-soft);
}
```

- [ ] **Step 2: Create `src/app/layout.tsx`**

```tsx
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "IT Issue Bootcamp",
  description: "Five-day hands-on web application bootcamp for HTML, CSS, TypeScript, Next.js, and Supabase."
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="th">
      <body>{children}</body>
    </html>
  );
}
```

- [ ] **Step 3: Run TypeScript check**

Run:

```bash
npx tsc --noEmit
```

Expected: no errors from `src/app/layout.tsx` or `src/app/globals.css`.

- [ ] **Step 4: Commit**

If git is available:

```bash
git add src/app/globals.css src/app/layout.tsx
git commit -m "feat: add dark root layout"
```

---

### Task 6: Add MDX Loading

**Files:**
- Create: `src/components/mdx-components.tsx`
- Create: `src/lib/mdx.ts`

- [ ] **Step 1: Create `src/components/mdx-components.tsx`**

```tsx
import type { MDXComponents } from "mdx/types";

export const mdxComponents: MDXComponents = {
  h1: (props) => <h1 {...props} />,
  h2: (props) => <h2 {...props} />,
  h3: (props) => <h3 {...props} />,
  p: (props) => <p {...props} />,
  ul: (props) => <ul {...props} />,
  ol: (props) => <ol {...props} />,
  li: (props) => <li {...props} />,
  table: (props) => <table {...props} />,
  th: (props) => <th {...props} />,
  td: (props) => <td {...props} />,
  blockquote: (props) => <blockquote {...props} />
};
```

- [ ] **Step 2: Create `src/lib/mdx.ts`**

```ts
import fs from "node:fs/promises";
import path from "node:path";
import { compileMDX } from "next-mdx-remote/rsc";
import rehypePrettyCode from "rehype-pretty-code";
import { mdxComponents } from "@/components/mdx-components";

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
        rehypePlugins: [
          [
            rehypePrettyCode,
            {
              theme: "github-dark",
              keepBackground: false
            }
          ]
        ]
      }
    }
  });
}

export async function compileLessonMdx(slug: string) {
  const filePath = path.join(root, "content", "lessons", `${slug}.mdx`);
  return compileCourseMdx(filePath);
}

export async function compileSupportMdx(fileName: "glossary.mdx" | "extensions.mdx") {
  const filePath = path.join(root, "content", fileName);
  return compileCourseMdx(filePath);
}
```

- [ ] **Step 3: Run TypeScript check**

Run:

```bash
npx tsc --noEmit
```

Expected: no type errors in `src/components/mdx-components.tsx` or `src/lib/mdx.ts`.

- [ ] **Step 4: Commit**

If git is available:

```bash
git add src/components/mdx-components.tsx src/lib/mdx.ts
git commit -m "feat: add mdx renderer"
```

---

### Task 7: Add Course Shell Components

**Files:**
- Create: `src/components/sidebar-nav.tsx`
- Create: `src/components/lesson-pager.tsx`
- Create: `src/components/course-shell.tsx`

- [ ] **Step 1: Create `src/components/sidebar-nav.tsx`**

```tsx
import Link from "next/link";
import { BookOpen, ChevronRight } from "lucide-react";
import { courseDays, getLessonsByDay, lessonHref } from "@/lib/course";

type SidebarNavProps = {
  currentSlug?: string;
};

export function SidebarNav({ currentSlug }: SidebarNavProps) {
  return (
    <aside className="border-r border-[color:var(--border)] bg-[color:var(--panel)] px-4 py-5 lg:sticky lg:top-0 lg:h-screen lg:overflow-y-auto">
      <Link href="/" className="mb-6 flex items-center gap-2 text-sm font-semibold text-white">
        <BookOpen size={18} aria-hidden="true" />
        IT Issue Bootcamp
      </Link>

      <nav aria-label="Course lessons" className="space-y-6">
        {courseDays.map((day) => (
          <section key={day.day}>
            <h2 className="mb-2 text-xs font-semibold uppercase tracking-normal text-slate-400">
              Day {day.day}
            </h2>
            <div className="space-y-1">
              {getLessonsByDay(day.day).map((lesson) => {
                const active = lesson.slug === currentSlug;
                return (
                  <Link
                    key={lesson.slug}
                    href={lessonHref(lesson)}
                    className={[
                      "flex items-start gap-2 rounded-md px-3 py-2 text-sm transition",
                      active
                        ? "bg-sky-400/15 text-sky-100"
                        : "text-slate-300 hover:bg-white/5 hover:text-white"
                    ].join(" ")}
                  >
                    <ChevronRight size={14} className="mt-1 shrink-0" aria-hidden="true" />
                    <span>
                      <span className="block text-xs text-slate-500">Hour {lesson.hour}</span>
                      <span className="block leading-snug">{lesson.title}</span>
                    </span>
                  </Link>
                );
              })}
            </div>
          </section>
        ))}
      </nav>
    </aside>
  );
}
```

- [ ] **Step 2: Create `src/components/lesson-pager.tsx`**

```tsx
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { getNextLesson, getPreviousLesson, lessonHref, type Lesson } from "@/lib/course";

type LessonPagerProps = {
  lesson: Lesson;
};

export function LessonPager({ lesson }: LessonPagerProps) {
  const previous = getPreviousLesson(lesson.slug);
  const next = getNextLesson(lesson.slug);

  return (
    <nav aria-label="Lesson navigation" className="mt-12 grid gap-3 border-t border-[color:var(--border)] pt-6 md:grid-cols-2">
      {previous ? (
        <Link
          href={lessonHref(previous)}
          className="rounded-md border border-[color:var(--border)] bg-[color:var(--panel)] p-4 text-slate-200 hover:border-sky-400/60"
        >
          <span className="mb-2 flex items-center gap-2 text-xs uppercase tracking-normal text-slate-500">
            <ArrowLeft size={14} aria-hidden="true" />
            Previous
          </span>
          <span className="font-medium">{previous.title}</span>
        </Link>
      ) : (
        <div />
      )}

      {next ? (
        <Link
          href={lessonHref(next)}
          className="rounded-md border border-[color:var(--border)] bg-[color:var(--panel)] p-4 text-right text-slate-200 hover:border-sky-400/60"
        >
          <span className="mb-2 flex items-center justify-end gap-2 text-xs uppercase tracking-normal text-slate-500">
            Next
            <ArrowRight size={14} aria-hidden="true" />
          </span>
          <span className="font-medium">{next.title}</span>
        </Link>
      ) : (
        <div />
      )}
    </nav>
  );
}
```

- [ ] **Step 3: Create `src/components/course-shell.tsx`**

```tsx
import Link from "next/link";
import { SidebarNav } from "@/components/sidebar-nav";

type CourseShellProps = {
  children: React.ReactNode;
  currentSlug?: string;
};

export function CourseShell({ children, currentSlug }: CourseShellProps) {
  return (
    <div className="min-h-screen lg:grid lg:grid-cols-[320px_1fr]">
      <SidebarNav currentSlug={currentSlug} />
      <main className="min-w-0">
        <div className="mx-auto w-full max-w-5xl px-5 py-8 md:px-8 lg:px-10">
          <div className="mb-8 flex flex-wrap items-center gap-3 text-sm text-slate-400">
            <Link href="/" className="hover:text-white">Overview</Link>
            <span>/</span>
            <Link href="/glossary" className="hover:text-white">Glossary</Link>
            <span>/</span>
            <Link href="/extensions" className="hover:text-white">Extensions</Link>
          </div>
          {children}
        </div>
      </main>
    </div>
  );
}
```

- [ ] **Step 4: Run TypeScript check**

Run:

```bash
npx tsc --noEmit
```

Expected: no type errors in the three component files.

- [ ] **Step 5: Commit**

If git is available:

```bash
git add src/components/sidebar-nav.tsx src/components/lesson-pager.tsx src/components/course-shell.tsx
git commit -m "feat: add course shell navigation"
```

---

### Task 8: Add App Routes

**Files:**
- Create: `src/app/page.tsx`
- Create: `src/app/lessons/[day]/[hour]/page.tsx`
- Create: `src/app/glossary/page.tsx`
- Create: `src/app/extensions/page.tsx`

- [ ] **Step 1: Create `src/app/page.tsx`**

```tsx
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { CourseShell } from "@/components/course-shell";
import { courseDays, getLessonsByDay, lessonHref } from "@/lib/course";

export default function HomePage() {
  return (
    <CourseShell>
      <section className="mb-10">
        <p className="mb-3 text-sm font-semibold text-sky-300">5 days / 20 hours</p>
        <h1 className="max-w-3xl text-4xl font-bold leading-tight tracking-normal text-white md:text-6xl">
          IT Issue Reporting Web Application Bootcamp
        </h1>
        <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-300">
          A hands-on course-book for HTML, CSS, TypeScript, Next.js, Tailwind, Supabase, deployment, authentication, roles, RLS, and LLM-safe coding.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href="/lessons/day-1/hour-1"
            className="inline-flex items-center gap-2 rounded-md bg-sky-400 px-4 py-2 text-sm font-semibold text-slate-950"
          >
            Start Day 1
            <ArrowRight size={16} aria-hidden="true" />
          </Link>
          <Link
            href="/extensions"
            className="inline-flex items-center gap-2 rounded-md border border-[color:var(--border)] px-4 py-2 text-sm font-semibold text-slate-100"
          >
            Extension Map
          </Link>
        </div>
      </section>

      <section className="grid gap-4">
        {courseDays.map((day) => (
          <article key={day.day} className="rounded-md border border-[color:var(--border)] bg-[color:var(--panel)] p-5">
            <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="text-sm font-semibold text-sky-300">Day {day.day}</p>
                <h2 className="mt-1 text-2xl font-semibold tracking-normal text-white">{day.title}</h2>
                <p className="mt-2 text-slate-400">{day.goal}</p>
              </div>
              <CheckCircle2 className="text-slate-600" size={22} aria-hidden="true" />
            </div>
            <div className="grid gap-2 md:grid-cols-2">
              {getLessonsByDay(day.day).map((lesson) => (
                <Link
                  key={lesson.slug}
                  href={lessonHref(lesson)}
                  className="rounded-md border border-slate-800 bg-slate-950/40 p-3 hover:border-sky-400/60"
                >
                  <span className="text-xs text-slate-500">Hour {lesson.hour}</span>
                  <span className="mt-1 block font-medium text-slate-100">{lesson.title}</span>
                  <span className="mt-1 block text-sm text-slate-400">{lesson.summary}</span>
                </Link>
              ))}
            </div>
          </article>
        ))}
      </section>
    </CourseShell>
  );
}
```

- [ ] **Step 2: Create `src/app/lessons/[day]/[hour]/page.tsx`**

```tsx
import { notFound } from "next/navigation";
import { Clock, Goal } from "lucide-react";
import { CourseShell } from "@/components/course-shell";
import { LessonPager } from "@/components/lesson-pager";
import { compileLessonMdx } from "@/lib/mdx";
import { getLesson, lessons } from "@/lib/course";

type LessonPageProps = {
  params: Promise<{
    day: string;
    hour: string;
  }>;
};

export function generateStaticParams() {
  return lessons.map((lesson) => ({
    day: `day-${lesson.day}`,
    hour: `hour-${lesson.hour}`
  }));
}

export async function generateMetadata({ params }: LessonPageProps) {
  const resolvedParams = await params;
  const lesson = getLesson(resolvedParams.day, resolvedParams.hour);

  return {
    title: lesson ? `${lesson.title} | IT Issue Bootcamp` : "Lesson | IT Issue Bootcamp"
  };
}

export default async function LessonPage({ params }: LessonPageProps) {
  const resolvedParams = await params;
  const lesson = getLesson(resolvedParams.day, resolvedParams.hour);

  if (!lesson) {
    notFound();
  }

  const { content, frontmatter } = await compileLessonMdx(lesson.slug);

  return (
    <CourseShell currentSlug={lesson.slug}>
      <header className="mb-8 rounded-md border border-[color:var(--border)] bg-[color:var(--panel)] p-5">
        <p className="text-sm font-semibold text-sky-300">
          Day {lesson.day} / Hour {lesson.hour}
        </p>
        <h1 className="mt-2 text-3xl font-bold tracking-normal text-white md:text-5xl">{lesson.title}</h1>
        <p className="mt-4 max-w-3xl text-slate-300">{lesson.summary}</p>
        <div className="mt-5 grid gap-3 text-sm text-slate-300 md:grid-cols-2">
          <div className="flex gap-2 rounded-md border border-slate-800 bg-slate-950/40 p-3">
            <Clock size={16} className="mt-0.5 text-sky-300" aria-hidden="true" />
            <span>{frontmatter.duration ?? 60} minutes</span>
          </div>
          <div className="flex gap-2 rounded-md border border-slate-800 bg-slate-950/40 p-3">
            <Goal size={16} className="mt-0.5 text-emerald-300" aria-hidden="true" />
            <span>{lesson.checkpoint}</span>
          </div>
        </div>
      </header>

      <article className="lesson-prose">{content}</article>
      <LessonPager lesson={lesson} />
    </CourseShell>
  );
}
```

- [ ] **Step 3: Create `src/app/glossary/page.tsx`**

```tsx
import { CourseShell } from "@/components/course-shell";
import { compileSupportMdx } from "@/lib/mdx";

export const metadata = {
  title: "Glossary | IT Issue Bootcamp"
};

export default async function GlossaryPage() {
  const { content } = await compileSupportMdx("glossary.mdx");

  return (
    <CourseShell>
      <article className="lesson-prose">{content}</article>
    </CourseShell>
  );
}
```

- [ ] **Step 4: Create `src/app/extensions/page.tsx`**

```tsx
import { CourseShell } from "@/components/course-shell";
import { compileSupportMdx } from "@/lib/mdx";

export const metadata = {
  title: "Extension Map | IT Issue Bootcamp"
};

export default async function ExtensionsPage() {
  const { content } = await compileSupportMdx("extensions.mdx");

  return (
    <CourseShell>
      <article className="lesson-prose">{content}</article>
    </CourseShell>
  );
}
```

- [ ] **Step 5: Run content verification**

Run:

```bash
npm run verify:content
```

Expected: `Verified 20 lesson files and 2 support content files.`

- [ ] **Step 6: Run build**

Run:

```bash
npm run build
```

Expected: build succeeds and lists `/`, `/glossary`, `/extensions`, and 20 lesson routes.

- [ ] **Step 7: Commit**

If git is available:

```bash
git add src/app/page.tsx src/app/lessons src/app/glossary src/app/extensions
git commit -m "feat: add course website routes"
```

---

### Task 9: Run Local Visual Verification

**Files:**
- No source edits unless verification reveals a concrete defect.

- [ ] **Step 1: Start the dev server**

Run:

```bash
npm run dev
```

Expected: Next.js starts on `http://localhost:3000` or another available port.

- [ ] **Step 2: Verify key pages in browser**

Open these URLs:

```text
http://localhost:3000/
http://localhost:3000/lessons/day-1/hour-1
http://localhost:3000/lessons/day-4/hour-4
http://localhost:3000/lessons/day-5/hour-4
http://localhost:3000/glossary
http://localhost:3000/extensions
```

Expected:

- Sidebar renders Day 1 through Day 5.
- Each day has four lesson links.
- Lesson pages show day/hour metadata.
- Code blocks have dark Shiki styling.
- Tables are readable.
- Previous/next navigation works.
- Glossary and extension pages render.

- [ ] **Step 3: Verify mobile layout**

Use browser responsive mode around 390px width.

Expected:

- Sidebar stacks above content.
- Lesson title fits without horizontal scrolling.
- Code blocks scroll horizontally inside their block.
- Navigation links do not overlap.

- [ ] **Step 4: Run final check**

Run:

```bash
npm run check
```

Expected:

```text
Verified 20 lesson files and 2 support content files.
```

Then `next build` completes successfully.

- [ ] **Step 5: Commit visual verification fixes**

If git is available and fixes were needed:

```bash
git add src/app src/components src/lib content scripts
git commit -m "fix: polish course website verification issues"
```

---

### Task 10: Document Remaining Work for the Learner Project

**Files:**
- Create: `docs/learner-project-checkpoints.md`

- [ ] **Step 1: Create `docs/learner-project-checkpoints.md`**

```md
# Learner Project Checkpoints

The course website is the teaching material. The learner project repository still needs its own checkpoint plan.

## Required Checkpoint Branches

- `day-2-end`: Next.js app with typed mock issue data and components.
- `day-3-end`: Tailwind UI with client-side mock CRUD and validation.
- `day-4-start`: Clean project state before Supabase setup.
- `day-4-end`: Deployed read/create Supabase app.
- `day-5-start`: Deployed Day 4 state ready for auth and role work.

## Checkpoint Recovery Rule

Each Day 3, Day 4, and Day 5 lesson should include a recovery note:

```text
If your local project is too far behind, checkout <branch-name> and continue from this lesson.
```

## Next Planning Step

Create a separate implementation plan for the learner project repository after the course website structure is implemented and the lesson pages have stable URLs.
```

- [ ] **Step 2: Commit**

If git is available:

```bash
git add docs/learner-project-checkpoints.md
git commit -m "docs: outline learner project checkpoints"
```

---

## Final Verification

Run:

```bash
npm run check
```

Expected:

- `npm run verify:content` prints `Verified 20 lesson files and 2 support content files.`
- `npm run build` succeeds.
- The app can be opened locally with `npm run dev`.

If the workspace is not a git repository, include this in the implementation summary:

```text
No commits were created because the workspace is not a git repository.
```
