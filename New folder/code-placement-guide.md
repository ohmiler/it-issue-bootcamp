# Code Placement Guide: โค้ดแต่ละก้อนควรอยู่ไฟล์ไหน

เอกสารนี้ใช้เป็นคู่มือประกอบการทำ slide และ live coding เพื่อให้รู้ว่า code snippet แต่ละช่วงควรเอาไปใส่ไฟล์ไหน

## หลักการ

ทุกครั้งที่ขึ้น slide code ควรมี label แบบนี้ก่อน code block:

```text
File: src/app/page.tsx
Purpose: หน้าแรกของระบบ
```

และควรมีตำแหน่งวาง code ให้ชัดเจนเสมอ:

```text
ตำแหน่งที่วาง:
แทนที่ function HomePage เดิมทั้ง function
```

หรือ:

```text
ตำแหน่งที่วาง:
วางต่อจาก <h2>แจ้งปัญหาใหม่</h2> และก่อนปุ่ม submit
```

หรือถ้าเป็น terminal:

```text
Run in terminal at project root
```

ถ้า 1 ชั่วโมงมีการเพิ่ม code หลายช่วง ควรปิดท้ายด้วย slide โค้ดสุดท้ายเสมอ เพื่อให้เห็นว่าพอประกอบกันแล้วไฟล์หรือ section นั้นควรหน้าตาเป็นอย่างไร:

```text
Slide: โค้ดสุดท้ายของ src/app/page.tsx
File: src/app/page.tsx
ตำแหน่งที่ใช้:
โค้ดนี้คือภาพรวมหลังทำครบทุก step ของชั่วโมงนี้
```

## คำที่ใช้ให้ผู้เรียนไม่สับสน

- `สร้างไฟล์ใหม่`: ใช้เมื่อไฟล์ยังไม่มี เช่น `src/components/LoginForm.tsx`
- `แทนที่ทั้งไฟล์`: ใช้เมื่อต้องลบของเดิมในไฟล์นั้นแล้วใส่ code ใหม่ทั้งหมด
- `แทนที่ function เดิม`: ใช้เมื่อเปลี่ยนเฉพาะ function เช่น `HomePage`, `IssueList`
- `วางต่อจาก`: ใช้เมื่อต้องแทรก code หลังบรรทัดหรือ block เดิม
- `วางก่อน`: ใช้กับ helper/type/import ที่ต้องอยู่ก่อน component หรือ function หลัก
- `รันใน SQL Editor`: ใช้กับ Supabase SQL และควรบอกว่ารันหลัง SQL ชุดไหน

## Day 1: Static Prototype

### Day 1 Hour 1

ยังไม่มีไฟล์ code หลัก เป็นช่วงวาดภาพรวมระบบ

ไฟล์ที่จะเริ่มสร้างในชั่วโมงถัดไป:

```text
index.html
styles.css
README.md
```

### Day 1 Hour 2: HTML Foundation

โค้ด HTML หลักอยู่ใน:

```text
index.html
```

ใส่โค้ดส่วนเหล่านี้ใน `index.html`:

- document structure
- `header`
- `main`
- `section`
- issue report form
- `label`, `input`, `textarea`, `button`
- `footer`

### Day 1 Hour 3: CSS Foundation

โค้ด CSS หลักอยู่ใน:

```text
styles.css
```

ต้องเชื่อมใน `index.html`:

```html
<link rel="stylesheet" href="styles.css" />
```

ใส่ CSS เหล่านี้ใน `styles.css`:

- reset และ `box-sizing`
- `body`
- `header`
- `main`
- `section`
- `.form-group`
- `.form-row`
- input, textarea
- button
- media query

### Day 1 Hour 4: Issue List และ GitHub

โค้ด table และ status badge อยู่ใน:

```text
index.html
```

CSS ของ table และ badge อยู่ใน:

```text
styles.css
```

คำอธิบาย project อยู่ใน:

```text
README.md
```

Git commands ให้รันใน terminal ที่ project folder:

```bash
git status
git add .
git commit -m "Create day 1 static issue report page"
git push
```

## Day 2: Move Prototype into Next.js

### Day 2 Hour 1: Next.js Setup

คำสั่งสร้าง project รันใน terminal:

```bash
npx create-next-app@latest it-issue-report
cd it-issue-report
npm run dev
```

ไฟล์ที่เริ่มแตะ:

```text
src/app/page.tsx
src/app/layout.tsx
src/app/globals.css
package.json
```

หน้าแรกของระบบ:

```text
src/app/page.tsx
```

layout หลัก:

```text
src/app/layout.tsx
```

CSS กลาง:

```text
src/app/globals.css
```

### Day 2 Hour 2: Convert Static HTML/CSS to Next.js

HTML จาก Day 1 ย้ายไป:

```text
src/app/page.tsx
```

CSS จาก Day 1 ย้ายไป:

```text
src/app/globals.css
```

ตั้งค่า `<html lang="th">` ใน:

```text
src/app/layout.tsx
```

โค้ดที่มี `className`, `htmlFor`, JSX comment อยู่ใน:

```text
src/app/page.tsx
```

### Day 2 Hour 3: TypeScript Data Model

แบบง่ายสำหรับห้องเรียน ให้เริ่มวาง type และ mock data ด้านบนของ:

```text
src/app/page.tsx
```

ชั่วโมงนี้ให้ยังอยู่ใน `src/app/page.tsx` ก่อน เพื่อให้เห็น data-driven table ชัด ๆ

ชั่วโมงถัดไป (Day 2 Hour 4) จะค่อยแยกเป็นไฟล์จริง:

```text
src/types/issue.ts
src/data/issues.ts
```

ตัวอย่าง:

```text
src/types/issue.ts      -> type Issue, IssueStatus
src/data/issues.ts      -> const issues: Issue[]
src/app/page.tsx        -> import issues แล้ว render ด้วย .map()
```

### Day 2 Hour 4: แยกไฟล์ Component จริงใน Next.js

ชั่วโมงนี้สอนการแยกไฟล์ component เป็นแกนหลัก โดยแยก JSX จาก `src/app/page.tsx` ไปเป็นไฟล์จริงใน `src/components/`

```text
src/components/StatusBadge.tsx
src/components/IssueList.tsx
src/components/IssueForm.tsx
src/types/issue.ts
src/data/issues.ts
```

ไฟล์หลักที่ import component/data กลับมาใช้:

```text
src/app/page.tsx
```

ไฟล์ route:

```text
src/app/issues/page.tsx
src/app/issues/new/page.tsx
src/app/issues/[id]/page.tsx
```

navigation ที่ใช้ทุกหน้าอยู่ใน:

```text
src/app/layout.tsx
```

style สั้น ๆ ของ navigation ให้วางท้ายไฟล์:

```text
src/app/globals.css
```

## Day 3: Frontend CRUD Prototype

### Day 3 Hour 1: Tailwind Setup

ติดตั้ง package ที่ project root:

```bash
npm install tailwindcss @tailwindcss/postcss postcss
```

สร้างไฟล์:

```text
postcss.config.mjs
```

เพิ่ม import ใน:

```text
src/app/globals.css
```

```css
@import "tailwindcss";
```

Tailwind class ที่ใช้กับ layout หลักอยู่ใน:

```text
src/app/layout.tsx
src/app/page.tsx
src/components/*.tsx
```

navigation ที่เปลี่ยนจาก CSS เดิมเป็น Tailwind อยู่ใน:

```text
src/app/layout.tsx
```

### Day 3 Hour 2: Tailwind Components

Day 2 Hour 4 แยกไฟล์ component แล้ว ดังนั้น Tailwind class ของแต่ละส่วนควรวางในไฟล์ component ของตัวเอง:

```text
src/components/StatusBadge.tsx
src/components/IssueList.tsx
src/components/IssueForm.tsx
```

แนะนำสำหรับ slide:

```text
File: src/components/StatusBadge.tsx
```

```text
File: src/components/IssueList.tsx
```

```text
File: src/components/IssueForm.tsx
```

### Day 3 Hour 3: Form State and Validation

Client wrapper:

```text
src/components/IssueBoard.tsx
```

Form component:

```text
src/components/IssueForm.tsx
```

List component:

```text
src/components/IssueList.tsx
```

Types:

```text
src/types/issue.ts
```

Mock data:

```text
src/data/issues.ts
```

ถ้าแยก validation helper:

```text
src/lib/validation.ts
```

หน้าแรกเรียก `IssueBoard`:

```text
src/app/page.tsx
```

### Day 3 Hour 4: Mock Update, Close Issue, Filter, and Database Prep

Mock CRUD state และ handlers:

```text
src/components/IssueBoard.tsx
```

Update/close/filter UI:

```text
src/components/IssueList.tsx
```

Types:

```text
src/types/issue.ts
```

Database schema preview ยังเป็นเนื้อหาอธิบายก่อน Day 4

ใน Day 4 ค่อยสร้าง:

```text
prisma/schema.prisma
src/lib/prisma.ts
```

## Recommended Project Structure หลังจบ Day 3

```text
it-issue-report/
  postcss.config.mjs
  package.json
  src/
  app/
    globals.css
    layout.tsx
    page.tsx
    issues/
      page.tsx
      new/
        page.tsx
      [id]/
        page.tsx
  components/
    IssueBoard.tsx
    IssueForm.tsx
    IssueList.tsx
    StatusBadge.tsx
  data/
    issues.ts
  types/
    issue.ts
  lib/
    validation.ts
```

## Day 4: Supabase Database and Deploy

### Day 4 Hour 1: Supabase Setup

SQL schema และ seed data รันใน:

```text
Supabase Dashboard -> SQL Editor
```

Environment variables ใส่ใน:

```text
.env.local
.env.example
```

Type กลางของ issue:

```text
src/types/issue.ts
```

### Day 4 Hour 2: Read from Supabase

Supabase server client:

```text
src/lib/supabase/server.ts
```

Database query และ mapping:

```text
src/lib/issues.ts
```

หน้า list:

```text
src/app/issues/page.tsx
```

หน้า detail:

```text
src/app/issues/[id]/page.tsx
```

Component แสดง list:

```text
src/components/IssueList.tsx
```

### Day 4 Hour 3: Create with Server Actions

Server actions:

```text
src/app/actions.ts
```

Insert function:

```text
src/lib/issues.ts
```

Form:

```text
src/components/IssueForm.tsx
```

หน้า create:

```text
src/app/issues/new/page.tsx
```

### Day 4 Hour 4: Update Status, Delete Concept, and Deploy

Update status database function:

```text
src/lib/issues.ts
```

Update status server action:

```text
src/app/actions.ts
```

Update status UI:

```text
src/components/IssueList.tsx
```

Delete/soft delete concept:

```text
slide content only; not core implementation
```

Deploy config:

```text
Vercel Dashboard -> Project Settings -> Environment Variables
```

Deployment documentation:

```text
README.md
```

## Day 5: Auth, RLS, Security, Final Demo

### Day 5 Hour 1: Supabase SSR Auth Setup

Supabase browser client:

```text
src/lib/supabase/client.ts
```

Supabase server client:

```text
src/lib/supabase/server.ts
```

Session refresh helper:

```text
src/lib/supabase/proxy.ts
proxy.ts
```

### Day 5 Hour 2: Login/Logout/Protected Pages

Login page:

```text
src/app/login/page.tsx
```

Login UI:

```text
src/components/LoginForm.tsx
```

Navigation and logout UI:

```text
src/components/AppNav.tsx
src/app/layout.tsx
```

Auth helpers:

```text
src/lib/auth.ts
```

Server actions:

```text
src/app/actions.ts
```

Protected page:

```text
src/app/issues/new/page.tsx
```

### Day 5 Hour 3: Authorization and RLS

Database schema, `profiles` RLS, and `issues` RLS:

```text
Supabase Dashboard -> SQL Editor
```

Role helpers:

```text
src/lib/auth.ts
```

Issue database functions:

```text
src/lib/issues.ts
```

Server action role checks:

```text
src/app/actions.ts
```

Role-aware UI:

```text
src/components/IssueList.tsx
```

Admin page:

```text
src/app/admin/issues/page.tsx
```

### Day 5 Hour 4: Security and Final Demo

เอกสาร security:

```text
SECURITY_CHECKLIST.md
```

Final project documentation:

```text
README.md
```

Deployment settings:

```text
Vercel Dashboard
Supabase Dashboard
GitHub Repository
```

## Label ตัวอย่างสำหรับ Slide

```text
File: src/components/IssueForm.tsx
Purpose: form สำหรับสร้าง issue ใหม่
```

```tsx
export function IssueForm() {
  return <form>...</form>;
}
```

```text
File: src/types/issue.ts
Purpose: type กลางของระบบแจ้งปัญหา
```

```ts
export type IssueStatus = "OPEN" | "IN_PROGRESS" | "DONE";
```

```text
Run in terminal at project root
```

```bash
npm run dev
```













