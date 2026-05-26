# Bootcamp Course Website and Teaching Plan Design

## Purpose

Design a 5-day, 20-hour hands-on bootcamp for 10 medical faculty IT students with mixed programming backgrounds. The university requires HTML, CSS, and TypeScript. The course must also prepare learners to understand and maintain real web service workflows used by the IT unit.

The main teaching artifact will be a dark-themed course-book website inspired by hands-on programming documentation. Short slides remain as supporting material for diagrams, framing, recap, and discussion-heavy topics.

## Success Level

The course uses success level B:

- Learners follow along to build and deploy a small CRUD web application.
- Database, authentication, roles, and RLS are included as guided classroom steps.
- Learners are not expected to independently build the full auth/RLS flow from memory by the end of the course.
- The course stays complete enough to show real web application flow, but avoids feature pressure that would make students fall behind.

## Learners

- Around 10 learners.
- All learners have GitHub and Visual Studio Code.
- Most have joined a previous club bootcamp.
- Skill levels vary from basic familiarity with programming languages to prior practical experience.
- The material must support learners who move at different speeds without stopping the class.

## Main Project

The main project is an internal IT issue reporting and tracking system.

Core flow:

1. User opens an issue report form.
2. User creates an issue.
3. User sees their own issues.
4. Admin sees all issues.
5. Admin updates issue status.
6. The app is deployed and can be opened from a production URL.

The exam or event registration workflow is an extension case study. It is used to show how the same CRUD, authentication, admin, and security concepts apply to university systems with uploads, payment evidence, or approval flows.

## Scope

### Core Hands-On Scope

- HTML
- CSS
- TypeScript as data-model discipline
- Git and GitHub
- Next.js
- Tailwind CSS
- CRUD workflow
- Supabase database
- Deployment
- Prepared email/password authentication
- Protected pages
- USER/ADMIN roles
- Guided RLS setup
- LLM-safe coding and review habits

### Extension Scope

These topics are extension, demo, or discussion only:

- Google OAuth
- Image upload
- Push or LINE notification
- Docker
- Password reset
- Audit logs
- Pagination
- Search
- Testing
- Payment evidence workflow

## Technical Stack

The course website stack:

- Next.js
- Tailwind CSS
- MDX for lesson content
- Shiki for code highlighting
- Dark theme as the primary visual direction

The learner project stack:

- Next.js
- TypeScript
- Tailwind CSS
- Supabase Postgres
- Supabase Auth
- Supabase RLS
- Vercel deployment

Supabase is taught as managed backend infrastructure, not as a way to skip understanding backend boundaries. Lessons must still explain frontend, backend, database, request validation, authorization, and security responsibilities.

## TypeScript Teaching Model

TypeScript is taught as data-model discipline, not as an isolated syntax chapter.

The recurring TypeScript concepts are:

- `Issue`
- `IssueStatus`
- form input shape
- validation result
- database row shape
- mapped UI model
- user role
- action input
- action result

Advanced TypeScript topics are out of scope unless they directly support the project.

## Authentication Model

Core authentication uses prepared email/password accounts:

- `user@example.com`
- `admin@example.com`

The course teaches:

- login
- logout
- session
- protected page
- role check
- admin-only action
- RLS as database-level defense

Google OAuth is an extension or instructor demo. It should not be required for the hands-on path.

## Five-Day Sequence

### Day 1: Static Prototype and Git

Goal: learners understand web workflow and create a static issue reporting prototype.

Hours:

1. Web workflow, frontend/backend/database, request/response, CRUD
2. HTML foundation and issue form
3. CSS foundation and responsive form layout
4. Static issue list, status badge, Git/GitHub push

End-of-day result: a static HTML/CSS issue report prototype pushed to GitHub.

### Day 2: Next.js and TypeScript Models

Goal: move from static pages to a Next.js app and make the data model explicit.

Hours:

1. Next.js setup and App Router basics
2. Convert static HTML/CSS to TSX and app structure
3. TypeScript issue model and mock issue data
4. Component extraction and basic routes

End-of-day result: a Next.js app rendering issues from typed mock data.

### Day 3: Tailwind and Mock CRUD

Goal: improve UI and let learners practice CRUD flow before the real database.

Hours:

1. Tailwind setup and utility-first styling
2. Component styling and responsive UI
3. Form state and validation
4. Mock create/update/filter flow and database preparation

End-of-day result: a styled frontend CRUD prototype with validation and mock state.

### Day 4: Supabase Read/Create and Deploy

Goal: connect the app to a real database and reach a deployment checkpoint.

Hours:

1. Supabase project, schema, seed data, environment variables
2. Read issues from Supabase
3. Create issue with server-side validation and Server Actions
4. Deploy checkpoint with Vercel and production environment variables

End-of-day result: a deployed app that can read/create issues from Supabase.

Day 4 prioritizes reliable deployment. Full update status can move to Day 5 so deployment is not squeezed out.

### Day 5: Admin Update, Auth, RLS, and Security

Goal: add real-world access control and security thinking around the CRUD system.

Hours:

1. Auth flow, session, Supabase SSR setup
2. Login/logout and protected pages
3. USER/ADMIN role, admin issue list, update status, guided RLS
4. Security recap, OWASP concepts, LLM-safe coding, final demo

End-of-day result: learners can explain CRUD, database, deploy, auth, role, RLS, and major security risks in the project.

## Course Website Design

The website uses a course-book layout:

- Persistent navigation grouped by day and hour
- Sequential lesson pages
- Main reading column optimized for long-form Thai explanations
- Code blocks with Shiki highlighting
- Clear file labels and placement instructions
- Checkpoint and troubleshooting sections
- Optional timeline overview page for the full 5-day map

The course website is the main hands-on material. Slides are short supporting artifacts for:

- opening concepts
- diagrams
- recaps
- discussions
- security and workflow framing

## Hourly Lesson Template

Each one-hour lesson uses this rhythm:

1. Goal and recap
2. Short concept
3. Guided implementation steps
4. Checkpoint
5. Debugging notes
6. Recap and next step

Suggested timing:

- 5 minutes: goal and recap
- 10 minutes: concept
- 30 minutes: hands-on steps
- 10 minutes: checkpoint and debugging
- 5 minutes: recap and next hour

This template should reduce cognitive load. Learners should always know whether they are learning a concept, editing code, checking output, or preparing for the next step.

## Code Delivery

Use hybrid code delivery.

Learners type concept-critical lines themselves:

- domain types
- status unions
- validation rules
- server action guards
- auth checks
- role checks
- RLS-related examples

Learners may copy longer boilerplate:

- layout markup
- repetitive Tailwind UI
- large component structure
- setup snippets
- provider/client setup when not concept-critical

Every code block must include:

- file path
- purpose
- placement instruction
- expected checkpoint

Example:

```text
File: src/types/issue.ts
Purpose: type กลางของ issue ในระบบ
Placement: สร้างไฟล์ใหม่
Checkpoint: npm run build ต้องไม่ error เรื่อง IssueStatus
```

## Repository Workflow

Learners start from scratch on Day 1 and Day 2.

From Day 3 onward, provide checkpoint branches so learners who fall behind can rejoin:

- `day-2-end`
- `day-3-end`
- `day-4-start`
- `day-4-end`
- `day-5-start`

Each lesson page should tell learners which checkpoint to use if they are behind.

## Language

The primary explanation language is Thai. Technical terms keep stable English labels with Thai explanations.

Examples:

- Authentication: การตรวจสอบตัวตน
- Authorization: การตรวจสอบสิทธิ์
- CRUD: Create, Read, Update, Delete
- Server Action: function ฝั่ง server ที่ถูกเรียกจาก form หรือ UI
- RLS: Row Level Security, policy ระดับฐานข้อมูล

The website should include a glossary so learners can connect classroom language with documentation, errors, GitHub issues, and LLM prompts.

## Error Handling and Classroom Recovery

Each hands-on lesson needs a recovery path:

- common error messages
- where to look first
- expected terminal output
- expected browser result
- checkpoint branch if the local project is too far behind

Day 4 and Day 5 need stronger recovery notes because Supabase, environment variables, auth, and deploy are high-friction areas.

## Security Teaching Focus

Security is taught through project-specific risks:

- Broken access control
- Injection
- authentication failures
- security misconfiguration
- leaked environment variables
- overly broad RLS policies
- trusting UI checks without server/database checks

The key message is that a working app is not automatically a safe app.

## Deliverables

Course planning deliverables:

- revised 5-day course outline
- 20 hourly lesson pages
- course glossary
- extension map for university workflows
- checkpoint branch plan

Website deliverables:

- dark course-book website
- day/hour navigation
- MDX lesson pages
- Shiki code blocks
- slide-mode or slide-summary sections

Learner project deliverables:

- starter/checkpoint repository
- Supabase setup SQL
- environment variable guide
- deployment guide
- security checklist

## Open Decisions

No blocking decisions remain for the teaching design. Implementation planning still needs to decide:

- exact content folder structure for MDX
- whether slides are rendered inside the same Next.js app or exported separately
- how checkpoint branches are generated and maintained
- exact visual design tokens for the dark theme
