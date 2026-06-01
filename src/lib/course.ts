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

export function getLessonsByDay(day: number): Lesson[] {
  return lessons.filter((lesson) => lesson.day === day);
}

export function getLesson(day: string, hour: string): Lesson | undefined {
  const dayNumber = Number(day.replace("day-", ""));
  const hourNumber = Number(hour.replace("hour-", ""));

  if (!Number.isInteger(dayNumber) || !Number.isInteger(hourNumber)) {
    return undefined;
  }

  return lessons.find((lesson) => lesson.day === dayNumber && lesson.hour === hourNumber);
}

export function getLessonBySlug(slug: string): Lesson | undefined {
  return lessons.find((lesson) => lesson.slug === slug);
}

export function getLessonIndex(slug: string): number {
  return lessons.findIndex((lesson) => lesson.slug === slug);
}

export function getPreviousLesson(slug: string): Lesson | undefined {
  const index = getLessonIndex(slug);
  return index > 0 ? lessons[index - 1] : undefined;
}

export function getNextLesson(slug: string): Lesson | undefined {
  const index = getLessonIndex(slug);
  return index >= 0 && index < lessons.length - 1 ? lessons[index + 1] : undefined;
}

export function lessonHref(lesson: Lesson): string {
  return `/lessons/day-${lesson.day}/hour-${lesson.hour}`;
}

export function lessonSlidesHref(lesson: Lesson): string {
  return `${lessonHref(lesson)}/slides`;
}
