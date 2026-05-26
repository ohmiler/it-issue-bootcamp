# แผนการสอน Bootcamp 5 วัน: TypeScript, HTML, CSS และ Web Application Workflow

## ภาพรวมหลักสูตร

หลักสูตรนี้ออกแบบสำหรับนิสิตแพทย์ฝ่ายเทคโนโลยีสารสนเทศ จำนวนประมาณ 10 คน ระยะเวลา 5 วัน วันละ 4 ชั่วโมง รวม 20 ชั่วโมง ผู้เรียนมีพื้นฐานต่างกัน แต่ทุกคนมี GitHub และ Visual Studio Code แล้ว

เนื้อหาหลักที่ต้องครอบคลุม:

- HTML
- CSS
- TypeScript

และเชื่อมไปสู่การทำเว็บแอปพลิเคชันจริงด้วย Next.js, Supabase, Git/GitHub และ deployment เบื้องต้น

## Project หลักของคอร์ส

ใช้ project เดียวต่อเนื่องทั้ง 5 วัน:

```text
ระบบแจ้งปัญหาและติดตามงานภายในฝ่าย IT
```

## Scope ที่ตั้งใจให้พอดีกับเวลา

ทำระบบเล็ก แต่ flow ชัด:

```text
HTML/CSS/TypeScript
-> Next.js
-> mock CRUD
-> Supabase database
-> login/protected page
-> USER/ADMIN
-> deploy/security recap
```

## Core Features

ฟีเจอร์ที่เป็นแกนหลักของคอร์ส:

- User login ด้วย email/password
- User สร้าง issue
- User ดู issue ของตัวเอง
- Admin ดู issue ทั้งหมด
- Admin update status
- ปิดงานด้วย status `DONE`
- Deploy ขึ้น Vercel

## ไม่ทำเป็น Core

หัวข้อต่อไปนี้ไม่บังคับทำในห้องเรียน เพราะจะทำให้เนื้อหาบีบเกินไป:

- Register flow เต็มรูปแบบ
- Google OAuth
- Password reset
- Image upload / Supabase Storage
- Notification
- Admin comment
- Hard delete
- Docker demo

ให้วางเป็นหัวข้อพูดคุยท้ายบทหรือต่อยอดหลังคอร์สแทน

## CRUD Scope

ในคอร์สนี้สอน CRUD แบบพอดีกับระบบแจ้งปัญหา:

| CRUD | สิ่งที่ทำในคอร์ส |
|---|---|
| Create | User สร้าง issue |
| Read | User/Admin ดู issue |
| Update | Admin เปลี่ยน status |
| Delete | สอนเป็น concept: close/soft delete |

เหตุผล: ระบบแจ้งปัญหาจริงมักไม่ควร hard delete ทันที เพราะต้องตรวจย้อนหลังได้ จึงใช้การปิดงานหรือ soft delete มากกว่า

## เป้าหมายของหลักสูตร

เมื่อจบหลักสูตร ผู้เรียนควรสามารถ:

1. อธิบาย workflow พื้นฐานของเว็บไซต์ได้ เช่น frontend, backend, database, request/response และ CRUD
2. สร้างหน้าเว็บด้วย HTML และ CSS ได้อย่างถูกโครงสร้าง
3. ใช้ TypeScript เพื่อกำหนดชนิดข้อมูลและลดข้อผิดพลาด
4. ใช้ Git และ GitHub ในการจัดการ source code เบื้องต้น
5. พัฒนาเว็บแอปด้วย Next.js และ Tailwind CSS ในระดับพื้นฐานได้
6. เชื่อมต่อ Supabase และทำ Create/Read/Update ได้
7. เข้าใจ Delete/soft delete ในระดับ concept
8. เข้าใจ authentication flow เช่น login, session และ protected page
9. แยกสิทธิ์ USER/ADMIN ได้ในระดับพื้นฐาน
10. เข้าใจหลักความปลอดภัยที่เกี่ยวข้อง เช่น input validation, broken access control, environment variables, RLS และ OWASP เบื้องต้น
11. ใช้ Large Language Model ช่วยเขียนโปรแกรมได้อย่างปลอดภัยและมีวิจารณญาณ

## โครงสร้างหลักสูตร 5 วัน

| วัน | หัวข้อหลัก | ผลลัพธ์ท้ายวัน |
|---|---|---|
| Day 1 | Web workflow, HTML, CSS, Git | สร้าง static prototype และ push ขึ้น GitHub ได้ |
| Day 2 | Next.js, TypeScript data model, routes/components | สร้าง Next.js app ที่มี mock issues, route และ component ได้ |
| Day 3 | Tailwind, form state, validation, mock CRUD | ทำ frontend CRUD prototype ด้วย mock state ได้ |
| Day 4 | Supabase database, Server Actions, deploy | ทำ Create/Read/Update กับ Supabase และ deploy ได้ |
| Day 5 | Login, protected page, USER/ADMIN, RLS, security | ระบบมี login, admin page แบบเล็ก, RLS และ final demo |

## รูปแบบเวลาในแต่ละวัน

เวลาเรียนวันละ 4 ชั่วโมง แนะนำให้แบ่งเป็น 4 ช่วง ช่วงละ 1 ชั่วโมง:

```text
Hour 1: concept + setup
Hour 2: live coding core flow
Hour 3: live coding feature flow
Hour 4: recap, debugging, check result, next step
```

ควรหลีกเลี่ยงการ lecture ยาวเกิน 30-40 นาที โดยเฉพาะหัวข้อ database และ authentication เพราะผู้เรียนจะเข้าใจได้ดีขึ้นเมื่อเห็น flow และได้ลงมือทำจริง

---

# Day 1: Web Workflow, HTML, CSS และ Git

## เป้าหมายของวัน

ให้ผู้เรียนเข้าใจภาพรวมของเว็บไซต์หนึ่งระบบก่อนเริ่มเขียนโปรแกรมจริง และสามารถสร้างหน้า static ด้วย HTML/CSS พร้อมจัดการ source code ผ่าน GitHub ได้

## ชั่วโมงที่ 1: Web Workflow

หัวข้อ:

- เว็บไซต์ทำงานอย่างไร
- Frontend, backend, database
- Request/response
- CRUD คืออะไร
- Project ที่จะทำทั้งคอร์ส

ผลลัพธ์:

- ผู้เรียนอธิบาย flow ของระบบแจ้งปัญหาได้

## ชั่วโมงที่ 2: HTML Foundation

หัวข้อ:

- HTML document structure
- semantic HTML
- form, label, input, textarea, button
- field name ที่จะใช้ต่อใน TypeScript/database

ผลลัพธ์:

- ได้ `index.html` ที่มี form แจ้งปัญหา

## ชั่วโมงที่ 3: CSS Foundation

หัวข้อ:

- CSS selector
- box model
- layout
- form styling
- responsive เบื้องต้น

ผลลัพธ์:

- ได้ `styles.css` และหน้า static ที่อ่านง่ายขึ้น

## ชั่วโมงที่ 4: Static Issue List และ Git/GitHub

หัวข้อ:

- table สำหรับ issue list
- status badge
- static CRUD view
- Git workflow
- GitHub push

ผลลัพธ์:

- หน้า static มี form + issue list
- push project ขึ้น GitHub ได้

---

# Day 2: Next.js และ TypeScript Foundation

## เป้าหมายของวัน

ย้ายจาก static HTML/CSS ไปเป็น Next.js app และเริ่มใช้ TypeScript เพื่อกำหนด data model ของระบบ

## ชั่วโมงที่ 1: Next.js Setup

หัวข้อ:

- สร้าง Next.js project
- App Router
- `page.tsx`, `layout.tsx`, `globals.css`
- run dev server

ผลลัพธ์:

- เปิด Next.js app ได้

## ชั่วโมงที่ 2: Convert Static HTML/CSS to Next.js

หัวข้อ:

- HTML -> TSX
- `class` -> `className`
- `for` -> `htmlFor`
- ย้าย form และ table เข้า `page.tsx`
- ย้าย CSS เข้า `globals.css`

ผลลัพธ์:

- หน้า static จาก Day 1 อยู่ใน Next.js

## ชั่วโมงที่ 3: TypeScript Data Model and Mock Issues

หัวข้อ:

- `IssueStatus`
- `Issue`
- mock data
- `.map()`
- status badge จาก data

ผลลัพธ์:

- issue list render จาก array ไม่ใช่ static row

หมายเหตุสำหรับผู้สอน:

```text
ตอนนี้ยังไม่มี login และ database จริง
Day 4 จะเปลี่ยน mock data เป็น Supabase
Day 5 จะเพิ่ม login และผูก issue กับ user จริง
```

## ชั่วโมงที่ 4: แยกไฟล์ Component จริงใน Next.js

หัวข้อ:

- แยก JSX จาก `src/app/page.tsx` ออกเป็น component file
- สร้าง `src/components/StatusBadge.tsx`
- สร้าง `src/components/IssueList.tsx`
- สร้าง `src/components/IssueForm.tsx`
- แยก `types` และ `data` เป็นไฟล์กลางให้ component import ใช้
- import component กลับมาใช้ใน `src/app/page.tsx`
- ใช้ component เดิมซ้ำใน route `/issues`, `/issues/new`, `/issues/[id]`

ผลลัพธ์:

- app มี component file จริงที่พร้อมต่อยอดไป Day 3 และ route ต่าง ๆ ใช้ component ซ้ำได้

---

# Day 3: Tailwind, Form State และ Mock CRUD

## เป้าหมายของวัน

ทำให้ Next.js app ดูเป็นระบบขึ้นด้วย Tailwind และทดลอง CRUD ฝั่ง frontend ด้วย mock state ก่อนเชื่อม database จริง

## ชั่วโมงที่ 1: Tailwind Setup and Utilities

หัวข้อ:

- Tailwind concept
- spacing, typography, color, layout utilities
- responsive/state prefixes

ผลลัพธ์:

- เริ่มแปลง UI เป็น Tailwind

## ชั่วโมงที่ 2: Components and Responsive UI

หัวข้อ:

- ปรับ `StatusBadge`
- ปรับ `IssueList`
- responsive table
- empty state
- ปรับ `IssueForm`

ผลลัพธ์:

- UI อ่านง่ายและ responsive ขึ้น

## ชั่วโมงที่ 3: Form State and Validation

หัวข้อ:

- Client Component
- `useState`
- `FormData`
- validation function
- error state
- create issue แบบ mock

ผลลัพธ์:

- submit form แล้ว issue ใหม่เพิ่มใน list ได้

## ชั่วโมงที่ 4: Mock CRUD and Database Prep

หัวข้อ:

- update status แบบ mock
- close/delete concept แบบ mock
- filter by status
- จาก mock state ไป database
- Server Actions concept

ผลลัพธ์:

- ผู้เรียนเห็น CRUD flow ครบในระดับ frontend prototype

---

# Day 4: Supabase Database, Server Actions และ Deploy

## เป้าหมายของวัน

เปลี่ยน source of truth จาก mock state เป็น Supabase database และ deploy app ให้เปิดจาก URL จริงได้

## ชั่วโมงที่ 1: Supabase Setup and Schema

หัวข้อ:

- ทำไมเลือก Supabase
- สร้าง project
- table `issues`
- enum status
- demo RLS policies สำหรับ select/insert/update
- seed data
- env vars

ผลลัพธ์:

- Supabase project มี table และ data พร้อมเชื่อมต่อ

## ชั่วโมงที่ 2: Read from Supabase

หัวข้อ:

- Supabase server client
- `DbIssue` vs `Issue`
- `getIssues()`
- `getIssueById()`
- หน้า `/issues`
- หน้า `/issues/[id]`

ผลลัพธ์:

- app อ่านข้อมูลจาก Supabase ได้

## ชั่วโมงที่ 3: Create with Server Actions

หัวข้อ:

- Server Actions
- server-side validation
- `createIssue()`
- `createIssueAction()`
- ปรับ `IssueForm`

ผลลัพธ์:

- สร้าง issue ลง Supabase ได้

## ชั่วโมงที่ 4: Update Status, Delete Concept, and Deploy

หัวข้อ:

- `updateIssueStatus()`
- `updateIssueStatusAction()`
- update status UI
- Delete vs Close vs Soft delete
- `npm run build`
- deploy ไป Vercel

ผลลัพธ์:

- Create/Read/Update ทำงานกับ Supabase
- ผู้เรียนเข้าใจ Delete เป็น concept
- มี production URL

---

# Day 5: Login, USER/ADMIN, RLS และ Security

## เป้าหมายของวัน

เพิ่ม authentication และ authorization แบบเล็กแต่ชัด เพื่อให้ผู้เรียนเห็นว่า web app จริงต้องมี login, protected page, role และ database policy

## ชั่วโมงที่ 1: Auth Flow and Supabase SSR Setup

หัวข้อ:

- Authentication vs Authorization
- session/cookie/JWT concept
- `@supabase/ssr`
- server client
- proxy/session refresh
- ปรับ Supabase client จาก Day 4

ผลลัพธ์:

- app พร้อมอ่าน session ฝั่ง server

## ชั่วโมงที่ 2: Email/Password Login and Protected Pages

หัวข้อ:

- prepared accounts
- login page
- email/password login
- logout
- `getCurrentUser()`
- `requireUser()`
- protect `/issues/new`

ผลลัพธ์:

- login/logout ได้
- `/issues/new` ต้อง login ก่อน

## ชั่วโมงที่ 3: USER/ADMIN Roles, Admin Page, and RLS

หัวข้อ:

- role `USER` / `ADMIN`
- `profiles`
- `created_by`
- RLS policies
- `requireAdmin()`
- `/admin/issues`
- admin update status

ผลลัพธ์:

- user เห็น issue ของตัวเอง
- admin เห็น issue ทั้งหมด
- admin update status ได้

## ชั่วโมงที่ 4: Security, LLM-safe Coding, จุดตรวจ Deploy, Final Demo

หัวข้อ:

- OWASP Top 10 ที่เกี่ยวข้อง
- Broken access control
- Injection
- Auth failures
- Security misconfiguration
- LLM-safe coding
- จุดตรวจ deploy/security
- final demo

ผลลัพธ์:

- ผู้เรียนอธิบาย project, CRUD, auth, role, RLS และ deploy flow ได้

---

# Account และ Service ที่ควรเตรียม

- GitHub account
- Supabase account/project
- Vercel account
- Account ตัวอย่างใน Supabase Auth:

```text
user@example.com
admin@example.com
```

ไม่จำเป็นต้องเตรียม Google Cloud project เพราะ Google OAuth ไม่ใช่ core ของคอร์สนี้

---

# ผลลัพธ์ที่คาดหวังหลังจบหลักสูตร

หลังจบ bootcamp ผู้เรียนควรสามารถกลับไปช่วยงานฝ่ายเทคโนโลยีสารสนเทศได้ในระดับ:

- เข้าใจระบบ web service ที่ฝ่ายดูแล
- อ่าน code web application เบื้องต้นได้
- แก้ไข UI หรือ form ได้
- เพิ่ม field ในระบบได้
- เข้าใจ CRUD workflow
- ใช้ GitHub เพื่อทำงานร่วมกันได้
- เข้าใจว่าการ login ต้องมี flow และ security check
- เข้าใจ user/admin role เบื้องต้น
- รู้ว่าทำไม RLS สำคัญ
- ใช้ LLM ช่วยเขียน code โดยไม่พึ่งพาแบบไม่เข้าใจ
- รู้ว่าควรถามหรือเช็กอะไรเมื่อต้องแก้ระบบจริง













