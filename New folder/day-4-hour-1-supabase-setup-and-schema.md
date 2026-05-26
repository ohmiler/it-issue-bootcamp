# Day 4 - ชั่วโมงที่ 1: Supabase Setup and Database Schema

## เป้าหมายของชั่วโมงนี้

หลังจบชั่วโมงแรกของ Day 4 ผู้เรียนควรสามารถ:

1. เข้าใจว่า Supabase คืออะไร และทำไมเหมาะกับ bootcamp นี้
2. สร้าง Supabase project ได้
3. เข้าใจ table, column, primary key, enum และ constraint ในระดับใช้งาน
4. สร้าง table `issues` ด้วย SQL Editor ได้
5. ตั้งค่า Row Level Security แบบ demo-only สำหรับ Day 4 ได้
6. เตรียม environment variables สำหรับ Next.js ได้
7. เข้าใจว่าข้อมูล mock จาก Day 3 จะถูกย้ายไปอยู่ใน database จริง

## ไฟล์ที่ใช้ในชั่วโมงนี้

ชั่วโมงนี้ทำงานใน Supabase Dashboard เป็นหลัก

ไฟล์ที่จะเตรียมใน Next.js project:

```text
.env.local
.env.example
src/types/issue.ts
```

SQL ให้รันใน Supabase SQL Editor

---

# โครงสร้างเวลา 60 นาที

| เวลา | หัวข้อ | รูปแบบ |
|---|---|---|
| 0-10 นาที | Recap Day 3 และข้อจำกัดของ mock state | Explain |
| 10-20 นาที | Supabase คืออะไร | Explain |
| 20-30 นาที | สร้าง Supabase project | Demo |
| 30-45 นาที | สร้าง schema `issues` ด้วย SQL | Live coding |
| 45-55 นาที | ตั้งค่า demo RLS policies และ seed data | Live coding |
| 55-60 นาที | เตรียม env vars และ recap | สรุป |

---

# Slide 1: Recap จาก Day 3

## Day 3 เราทำอะไรได้แล้ว

- ใช้ Tailwind ปรับ UI
- สร้าง `IssueBoard` ถือ mock state
- ใช้ `IssueForm` สร้าง issue
- validate input ฝั่ง frontend
- update status แบบ mock
- เห็นภาพ delete/close แบบ mock
- filter issue ตาม status

## ปัญหาของ mock state

```text
refresh page -> state reset -> ข้อมูลหาย
```

## Key Message

Day 4 เราจะเปลี่ยน source of truth จาก `useState` เป็น database จริง

---

# Slide 2: ทำไมเลือก Supabase

## Supabase เหมาะกับ bootcamp เพราะ

- มี Free plan
- ได้ Postgres database จริง
- มี dashboard และ SQL Editor
- ใช้กับ Next.js ได้ง่าย
- deploy คู่กับ Vercel ได้สะดวก
- มี Auth และ Storage ให้ต่อยอด Day 5 ได้

## ข้อควรระวัง

- Free project มี quota และอาจ pause หลังไม่มี activity
- ถ้าเปิด policy กว้างเกินไป ข้อมูลจะไม่ปลอดภัย
- production ต้องใช้ auth และ Row Level Security อย่างถูกต้อง

## Key Message

Supabase ง่ายพอสำหรับห้องเรียน แต่ยังเป็น database จริงที่ต้องสอนเรื่อง security ให้ถูก

---

# Slide 3: ภาพรวม Architecture Day 4

```text
Next.js Page
  |
  v
Server Component / Server Action
  |
  v
Supabase Client
  |
  v
Supabase Postgres
```

## จาก Day 3

```text
IssueForm -> useState -> IssueList
```

## เป็น Day 4

```text
IssueForm -> Server Action -> Supabase -> IssueList
```

## Key Message

หลังจากวันนี้ refresh หน้าแล้วข้อมูลจะยังอยู่ เพราะถูกบันทึกใน database

---

# Slide 4: สร้าง Supabase Project

## ทำใน Browser

1. เข้า Supabase Dashboard
2. สร้าง project ใหม่
3. ตั้งชื่อ เช่น `it-issue-report`
4. เลือก region ที่ใกล้ผู้ใช้
5. ตั้ง database password
6. รอ project พร้อมใช้งาน

## สิ่งที่ต้องจดไว้

- Project URL
- Publishable key หรือ anon key
- Database password เก็บไว้เฉพาะที่ปลอดภัย

## Warning

ห้าม commit password หรือ secret ลง GitHub

---

# Slide 5: Database Table ที่เราต้องการ

## Entity หลักวันนี้

```text
Issue
```

## Field ที่ต่อจาก Day 3

```text
id
reporterName
reporterEmail
title
description
status
adminComment
createdAt
updatedAt
```

## ใน database จะใช้ snake_case

```text
reporter_name
reporter_email
admin_comment
created_at
updated_at
```

## Key Message

TypeScript มักใช้ camelCase แต่ database มักใช้ snake_case ต้อง map ให้ชัด

---

# Slide 6: Enum สำหรับ Status

## Status

```text
OPEN
IN_PROGRESS
DONE
```

## SQL

```sql
create type issue_status as enum ('OPEN', 'IN_PROGRESS', 'DONE');
```

## Key Message

Enum ช่วยจำกัดค่าที่ database รับได้ เหมือน union type ใน TypeScript

---

# Slide 7: สร้าง Table `issues`

## File

```text
Supabase SQL Editor
```

## ตำแหน่งที่รัน

รัน SQL นี้ต่อจาก enum `issue_status` ที่สร้างไว้ก่อนหน้าใน Supabase SQL Editor

```sql
create table public.issues (
  id uuid primary key default gen_random_uuid(),
  reporter_name text not null,
  reporter_email text not null,
  title text not null check (char_length(title) >= 5),
  description text not null check (char_length(description) >= 10),
  status issue_status not null default 'OPEN',
  admin_comment text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
```

---

# Slide 8: Constraint คืออะไร

## ตัวอย่าง

```sql
title text not null check (char_length(title) >= 5)
```

## ความหมาย

- `not null`: ห้ามว่าง
- `check`: ต้องผ่านเงื่อนไข
- `char_length(title) >= 5`: title ต้องยาวอย่างน้อย 5 ตัวอักษร

## Key Message

Validation ควรมีหลายชั้น:

```text
frontend validation
server validation
database constraint
```

---

# Slide 9: Row Level Security แบบ Demo-only

## ทำไมต้องพูดเรื่องนี้

Supabase ใช้ Row Level Security หรือ RLS เพื่อควบคุมว่าใครอ่าน/เขียนข้อมูลได้

## สำหรับ Day 4

เรายังไม่มี login/auth จึงใช้ policy แบบ demo-only เพื่อให้เรียน CRUD ได้ก่อน

## Warning

Policy ต่อไปนี้เปิด public access สำหรับโปรเจกต์ฝึกเท่านั้น ห้ามใช้ production

---

# Slide 10: เปิด RLS และ Demo Policies

## File

```text
Supabase SQL Editor
```

## ตำแหน่งที่รัน

รันหลังจากสร้าง table `public.issues` สำเร็จแล้ว และก่อนเริ่มเรียกข้อมูลจาก Next.js

```sql
alter table public.issues enable row level security;

create policy "demo_select_issues"
on public.issues
for select
to anon
using (true);

create policy "demo_insert_issues"
on public.issues
for insert
to anon
with check (true);

create policy "demo_update_issues"
on public.issues
for update
to anon
using (true)
with check (true);
```

## Day 5 จะเปลี่ยนอะไร

Day 5 จะเปลี่ยน policy ให้ผูกกับ authenticated user และ admin role โดยเน้น select/insert/update เป็น core

---

# Slide 11: Seed Data

## File

```text
Supabase SQL Editor
```

## ตำแหน่งที่รัน

รันหลังจากสร้าง table และ demo policies แล้ว เพื่อให้ table มีข้อมูลตัวอย่างสำหรับทดสอบหน้า list

```sql
insert into public.issues
  (reporter_name, reporter_email, title, description, status, admin_comment)
values
  (
  'Anan',
  'anan@example.com',
  'Login เข้าระบบไม่ได้',
  'ไม่สามารถเข้าสู่ระบบด้วยบัญชีเดิมได้',
  'OPEN',
  null
  ),
  (
  'Mali',
  'mali@example.com',
  'ส่งแบบฟอร์มสมัครไม่ได้',
  'กดส่งข้อมูลแล้วระบบขึ้น error',
  'IN_PROGRESS',
  null
  ),
  (
  'Kanda',
  'kanda@example.com',
  'ขอสิทธิ์เข้าใช้งาน dashboard',
  'ต้องการสิทธิ์สำหรับตรวจสอบข้อมูลหลังบ้าน',
  'DONE',
  'อนุมัติสิทธิ์และแจ้งผู้ใช้เรียบร้อยแล้ว'
  );
```

---

# Slide 12: ตรวจข้อมูลใน Supabase

## วิธีตรวจ

1. ไปที่ Table Editor
2. เปิด table `issues`
3. ตรวจว่ามีข้อมูล 3 rows
4. ลองดู column `reporter_name`, `status`, `created_at`

## Query ตรวจด้วย SQL

รันใน Supabase SQL Editor หลัง seed data

```sql
select id, reporter_name, title, status, created_at
from public.issues
order by created_at desc;
```

---

# Slide 13: Environment Variables

## File

```text
.env.local
```

## ตำแหน่งที่วาง

สร้างไฟล์ `.env.local` ที่ project root ระดับเดียวกับ `package.json` ไม่ใช่ใน `src/`

## ตัวอย่าง

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your-publishable-key
```

## หมายเหตุ

บาง project อาจยังใช้ชื่อ anon key:

```env
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

ให้ใช้ key ที่ Supabase Dashboard หรือ Connect dialog แนะนำใน project ของผู้เรียน

---

# Slide 14: `.env.example`

## File

```text
.env.example
```

## ตำแหน่งที่วาง

สร้างไฟล์ `.env.example` ที่ project root ระดับเดียวกับ `.env.local` และ `package.json`

## ใส่เฉพาะชื่อ key ไม่ใส่ค่าจริง

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=
```

## ทำไมต้องมี

- บอกคนอื่นว่า project ต้องใช้ env อะไร
- ไม่เปิดเผย secret
- ช่วยตอน deploy ไป Vercel

## Warning

`.env.local` ต้องอยู่ใน `.gitignore`

---

# Slide 15: Update TypeScript Type

## File

```text
src/types/issue.ts
```

## ตำแหน่งที่แก้

ใช้ type ชุดนี้แทน type `IssueStatus` และ `Issue` เดิมในไฟล์ `src/types/issue.ts`

## Type

```ts
export type IssueStatus = "OPEN" | "IN_PROGRESS" | "DONE";

export type Issue = {
  id: string;
  reporterName: string;
  reporterEmail: string;
  title: string;
  description: string;
  status: IssueStatus;
  adminComment?: string;
  createdAt: string;
  updatedAt: string;
};
```

## Key Message

เพิ่ม `updatedAt` เพื่อให้ TypeScript ตรงกับ database มากขึ้น

---

# Slide 16: โค้ดสุดท้ายของ Supabase Setup

## ขั้นตอน

1. สร้าง Supabase project
2. เปิด SQL Editor
3. สร้าง enum และ table `issues`
4. เปิด RLS และสร้าง demo policies สำหรับ select/insert/update
5. seed data 3 rows
6. สร้าง `.env.local`
7. สร้าง `.env.example`
8. update `src/types/issue.ts`

## ผลลัพธ์

Supabase project มี table `issues` พร้อมข้อมูล และ Next.js project มี env vars พร้อมเชื่อมต่อ

## SQL ที่ต้องรันครบใน Supabase

```sql
create type issue_status as enum ('OPEN', 'IN_PROGRESS', 'DONE');

create table issues (
  id uuid primary key default gen_random_uuid(),
  reporter_name text not null,
  reporter_email text not null,
  title text not null check (char_length(title) >= 5),
  description text not null,
  status issue_status not null default 'OPEN',
  admin_comment text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table issues enable row level security;
```

## ไฟล์ใน Next.js ที่ต้องมีค่า env

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your-publishable-key
```

---

# Slide 17: Common Mistakes

## ข้อผิดพลาดที่พบบ่อย

- ลืมเลือก project ก่อนเปิด SQL Editor
- รัน SQL ซ้ำแล้ว enum/table ชนชื่อเดิม
- copy key ผิดตัว
- ใส่ค่า env ใน `.env.example`
- commit `.env.local`
- ลืม restart dev server หลังแก้ `.env.local`
- ไม่เข้าใจว่า demo policy เปิด public access

---

# Slide 18: Recap ชั่วโมงแรกของ Day 4

## สิ่งที่ได้เรียน

- Supabase คือ managed Postgres ที่เหมาะกับ bootcamp
- Database schema ต่อจาก TypeScript data model
- Enum ใน SQL คล้าย union type ใน TypeScript
- Constraint เป็น validation ชั้น database
- RLS สำคัญต่อ security
- Day 4 ใช้ demo policy ชั่วคราว
- Env vars ใช้เชื่อม Next.js กับ Supabase

## ต่อไป

เราจะติดตั้ง Supabase client ใน Next.js และอ่านข้อมูล `issues` จาก database มาแสดงในหน้า `/issues`

---


---

# คำศัพท์สำคัญ

| คำศัพท์ | ความหมาย |
|---|---|
| Supabase | platform ที่ให้ Postgres, Auth, Storage และ API |
| Postgres | relational database ที่ Supabase ใช้ |
| Table | ตารางข้อมูล |
| Column | field ใน table |
| Primary key | column ที่ใช้ระบุ row แบบ unique |
| Enum | ชนิดข้อมูลที่จำกัดค่าที่เป็นไปได้ |
| Constraint | เงื่อนไขที่ database ใช้ตรวจข้อมูล |
| RLS | Row Level Security สำหรับควบคุมสิทธิ์ระดับ row |
| Env vars | ตัวแปร config ที่ไม่ควร hard-code ใน source code |

---

# อ้างอิงสำหรับผู้สอน

- [Supabase Pricing](https://supabase.com/pricing)
- [Use Supabase with Next.js](https://supabase.com/docs/guides/getting-started/quickstarts/nextjs)













