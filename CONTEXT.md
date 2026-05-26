# Context Glossary

## Course Success Level

The bootcamp is successful when learners can follow along to build and deploy a small CRUD web application. Database, authentication, role-based access, and row-level security are included as guided steps rather than expected as fully independent work from every learner.

## Guided Step

A guided step is a hands-on segment where learners follow the instructor closely with prepared code, clear file placement, and checkpoints. It is still practical work, but the goal is understanding the flow and completing the system safely within class time.

## Core Path

The core path is the minimum sequence that must work during the 20-hour bootcamp. Extra features are discussed as extensions only when the core path is stable.

## Main Project

The main project is an internal IT issue reporting and tracking system. Learners use this same project across all five days, starting from static HTML/CSS and ending with a deployed CRUD app with guided authentication, role, and RLS steps.

## Extension Case Study

The exam or event registration system is an extension case study, not the main build. It is used to show how the same CRUD, authentication, admin, and security concepts transfer to a university workflow with uploads, approval, or payment evidence.

## TypeScript Teaching Role

TypeScript is taught as data-model discipline. The course uses types to make the domain shape explicit, including issues, issue statuses, form data, validation results, database rows, and user roles. Advanced TypeScript topics are out of scope unless they directly support the project flow.

## Managed Backend

Supabase is the managed backend for the course. It provides Postgres, authentication, and row-level security so learners can experience database-backed CRUD and security within 20 hours. Supabase must still be explained as backend infrastructure, not as a replacement for understanding frontend, backend, database, request validation, and authorization boundaries.

## Core Authentication Method

The course uses prepared email/password accounts for core authentication exercises. This keeps the classroom flow stable while still teaching login, logout, session, protected pages, user roles, and RLS. Google OAuth is treated as an extension or instructor demo, not a required hands-on path.

## Teaching Materials Format

The course website is the main hands-on material. It should contain the hourly lessons, code placement, snippets, checkpoints, and troubleshooting notes. Slides remain as short framing material for opening concepts, diagrams, recaps, and discussion-heavy topics such as web workflow, auth flow, RLS, and OWASP.

## Course Website Layout

The course website uses a course-book layout as the primary reading experience. It should have persistent navigation by day and hour, sequential lesson pages, readable long-form content, and code-first hands-on sections. A timeline overview may be added as a supporting overview, but the main interaction is reading and following one lesson at a time.

## Hourly Lesson Rhythm

Each one-hour lesson should follow a repeated hands-on rhythm: goal and recap, short concept, guided implementation steps, checkpoint with debugging notes, and recap with the next step. The website uses this lesson template as the main material, while slide mode stays short and supports opening concepts, diagrams, and summaries.

## Learner Repository Workflow

Learners start from scratch for the early foundation work, especially Day 1 and Day 2. From Day 3 onward, the course provides checkpoint branches so learners who fall behind can rejoin the class quickly. Checkpoints should exist around major transitions such as the end of Day 2, end of Day 3, start/end of Day 4, and start of Day 5.

## Core Scope

Core hands-on topics are HTML, CSS, TypeScript data modeling, Git/GitHub, Next.js, Tailwind CSS, CRUD, Supabase database, deployment, prepared email/password authentication, protected pages, USER/ADMIN roles, guided RLS setup, and LLM-safe coding.

## Extension Scope

Extension topics are discussed or demonstrated only after the core path is stable. These include Google OAuth, image upload, push or LINE notification, Docker, password reset, audit logs, pagination, search, testing, and payment evidence workflows.

## Five-Day Teaching Sequence

The course sequence is Day 1 static prototype and Git, Day 2 Next.js with TypeScript models and components, Day 3 Tailwind with client-side mock CRUD and validation, Day 4 Supabase schema with read/create and a deployment checkpoint, and Day 5 update status through admin flow with authentication, protected pages, roles, guided RLS, security, and recap. Day 4 prioritizes reaching deployment reliably.

## Code Delivery Style

The course uses hybrid code delivery. Learners type concept-critical lines themselves, such as domain types, validation rules, server action guards, and role checks. Longer boilerplate, layout markup, and repetitive UI code may be provided as copyable blocks. Every code block should identify the file, purpose, placement, and expected checkpoint.

## Teaching Language

The primary explanation language is Thai. Technical terms keep stable English labels with Thai explanations, such as Authentication, Authorization, CRUD, Server Action, database row, RLS, and deploy. The website should include a glossary so learners can connect classroom language with documentation, errors, GitHub issues, and LLM prompts.
