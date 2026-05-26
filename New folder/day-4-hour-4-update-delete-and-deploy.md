# Day 4 - ชั่วโมงที่ 4: Update Status, Delete Concept, and Deploy to Vercel

## เป้าหมายของชั่วโมงนี้

หลังจบชั่วโมงที่สี่ของ Day 4 ผู้เรียนควรสามารถ:

1. update status ของ issue ใน Supabase ได้
2. ใช้ Server Action สำหรับ update ได้
3. เข้าใจว่า Delete ในระบบจริงไม่ควรรีบ hard delete
4. อธิบาย soft delete/close issue ได้
5. เตรียม deploy Next.js + Supabase ไป Vercel ได้
6. ตั้งค่า environment variables บน Vercel ได้
7. ทดสอบ production deployment เบื้องต้นได้

## ไฟล์ที่ใช้ในชั่วโมงนี้

สร้างหรือแก้ไฟล์:

```text
src/lib/issues.ts
src/app/actions.ts
src/components/IssueList.tsx
.env.example
README.md
```

Deploy ทำผ่าน:

```text
GitHub
Vercel Dashboard
Supabase Dashboard
```

---

# โครงสร้างเวลา 60 นาที

| เวลา | หัวข้อ | รูปแบบ |
|---|---|---|
| 0-5 นาที | Recap create issue | ถามตอบ |
| 5-25 นาที | Update status ด้วย Server Action | Live coding |
| 25-35 นาที | Delete vs Close vs Soft Delete | Explain |
| 35-45 นาที | เตรียม deploy และ push GitHub | ทำทีละขั้นตอน |
| 45-55 นาที | Deploy ไป Vercel และตั้งค่า env vars | Demo |
| 55-60 นาที | Day 4 recap และ preview Day 5 | สรุป |

---

# Slide 1: Recap ชั่วโมงที่ 3

## ตอนนี้ระบบทำอะไรได้แล้ว

- อ่าน issue จาก Supabase
- ดู issue detail
- สร้าง issue ใหม่ด้วย Server Action
- validate ก่อน insert
- redirect กลับไป `/issues`

## เหลืออะไรใน CRUD core

- Update status
- Delete พูดเป็น concept ก่อน

## Key Message

Day 4 ไม่จำเป็นต้องทำ hard delete เป็น core เพราะระบบแจ้งปัญหาจริงมักใช้การปิดงานหรือ soft delete มากกว่า

---

# Slide 2: เพิ่ม `updateIssueStatus()`

## File

```text
src/lib/issues.ts
```

## ตำแหน่งที่วาง

วาง import `IssueStatus` บนสุดของไฟล์ แล้ววาง function `updateIssueStatus` ต่อจาก `createIssue` หรือ query functions ที่มีอยู่ใน `src/lib/issues.ts`

## Code

```ts
import type { IssueStatus } from "@/types/issue";

export async function updateIssueStatus(id: string, status: IssueStatus) {
  const supabase = createSupabaseServerClient();

  const { error } = await supabase
  .from("issues")
  .update({
    status,
    updated_at: new Date().toISOString(),
  })
  .eq("id", id);

  if (error) {
  throw new Error(`Failed to update issue: ${error.message}`);
  }
}
```

---

# Slide 3: Server Action สำหรับ Update

## File

```text
src/app/actions.ts
```

## ตำแหน่งที่วาง

เพิ่ม import ที่ด้านบนของ `src/app/actions.ts` และวาง `allowedStatuses` กับ `updateIssueStatusAction` ต่อจาก `createIssueAction`

## Code

```ts
import type { IssueStatus } from "@/types/issue";
import { updateIssueStatus } from "@/lib/issues";

const allowedStatuses: IssueStatus[] = ["OPEN", "IN_PROGRESS", "DONE"];

export async function updateIssueStatusAction(formData: FormData) {
  const id = String(formData.get("id") ?? "");
  const status = String(formData.get("status") ?? "");

  if (!id || !allowedStatuses.includes(status as IssueStatus)) {
  throw new Error("Invalid update request");
  }

  await updateIssueStatus(id, status as IssueStatus);
  revalidatePath("/issues");
}
```

## Key Message

อย่าเชื่อค่าจากปุ่มใน UI ต้อง validate ฝั่ง server อีกครั้ง

---

# Slide 4: UI สำหรับ Update Status

## File

```text
src/components/IssueList.tsx
```

## ตำแหน่งที่วาง

วาง import `updateIssueStatusAction` บนสุดของไฟล์ แล้ววาง `statuses` เหนือ component `IssueList` จากนั้นวาง button group นี้ใน `<td>` column `จัดการ` ของ row ที่อยู่ใน `issues.map(...)`

## Code

```tsx
import { updateIssueStatusAction } from "@/app/actions";

const statuses: IssueStatus[] = ["OPEN", "IN_PROGRESS", "DONE"];

<div className="flex flex-wrap gap-2">
  {statuses.map((status) => (
  <form key={status} action={updateIssueStatusAction}>
    <input type="hidden" name="id" value={issue.id} />
    <input type="hidden" name="status" value={status} />
    <button
      type="submit"
      disabled={issue.status === status}
      className="rounded-md border border-slate-300 px-2 py-1 text-xs font-semibold disabled:bg-slate-100 disabled:text-slate-400"
    >
      {status}
    </button>
  </form>
  ))}
</div>
```

---

# Slide 5: เรื่องสิทธิ์ของ Update

## ตอนนี้

ทุกคนที่เข้าหน้าเว็บสามารถ update status ได้ เพราะเป็น demo policy

## ระบบจริงควรเป็น

- user สร้าง issue ได้
- user ดู issue ของตัวเองได้
- admin เปลี่ยน status ได้
- server action ต้องตรวจ role
- RLS ต้องป้องกันซ้ำ

## Key Message

Day 4 ทำให้เข้าใจ CRUD ก่อน Day 5 จะทำให้ปลอดภัยขึ้นด้วย auth/authorization

---

# Slide 6: Delete ไม่เป็น Core ในคอร์สนี้

## ทำไมไม่ทำ hard delete เป็นงานหลัก

ในระบบแจ้งปัญหาจริง การลบ record ทิ้งทันทีมักไม่เหมาะ เพราะ:

- ต้องตรวจย้อนหลังได้
- admin อาจต้องดูประวัติการแก้ไข
- user อาจกดผิด
- ข้อมูลอาจเกี่ยวกับงานบริการหรือหลักฐาน

## ทางเลือกที่เหมาะกว่า

```text
Delete concept -> Close issue หรือ Soft delete
```

## Key Message

เราสอน Delete ในระดับ concept เพื่อให้เข้าใจ CRUD ครบ แต่ core implementation จะใช้ Update status เป็น `DONE` แทนการลบจริง

---

# Slide 7: Close Issue ด้วย Status

## วิธีที่ใช้ในคอร์สนี้

ใช้ field `status` เดิม:

```text
OPEN -> IN_PROGRESS -> DONE
```

## Mapping กับ CRUD

| CRUD | ในโปรเจกต์นี้ |
|---|---|
| Create | user สร้าง issue |
| Read | user/admin ดู issue |
| Update | admin เปลี่ยน status |
| Delete | concept: close/soft delete |

## Key Message

สำหรับ bootcamp นี้ การเปลี่ยน status เป็น `DONE` เพียงพอแล้วที่จะอธิบายแนวคิด “ปิดงาน” โดยไม่เพิ่มระบบให้ใหญ่เกินไป

---

# Slide 8: แนวคิด Soft Delete

## ถ้าต้องการต่อยอด

เพิ่ม column:

```sql
alter table public.issues
add column deleted_at timestamptz;
```

เวลา delete:

```text
update deleted_at = now()
```

เวลา query:

```text
where deleted_at is null
```

## หมายเหตุสำหรับผู้สอน

หัวข้อนี้เป็นแนวคิดต่อยอดหลังจากเข้าใจ update status แล้ว ไม่ต้องให้ทุกคน implement ในห้องเรียน

---

# Slide 9: Test Core CRUD Flow

## จุดที่ต้องตรวจ

- เปิด `/issues`
- เห็น data จาก Supabase
- กดดู detail
- สร้าง issue ใหม่จาก `/issues/new`
- เปลี่ยน status แล้ว refresh ยังอยู่
- เปลี่ยน status เป็น `DONE` เพื่อจำลองการปิดงาน
- ตรวจใน Supabase Table Editor

## ถ้าไม่ทำงาน

ตรวจ:

- terminal error
- RLS policy
- server action
- field `name`
- env vars

---

# Slide 10: เตรียม Deploy

## ก่อน deploy

ตรวจ:

```bash
npm run build
```

## ถ้า build ผ่าน

commit และ push:

```bash
git status
git add .
git commit -m "Connect issues CRUD to Supabase"
git push
```

## Key Message

อย่า deploy ก่อน build ผ่านในเครื่อง

---

# Slide 11: Environment Variables บน Vercel

## ต้องใส่ใน Vercel Project Settings

```text
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY
```

หรือถ้า project ใช้ anon key:

```text
NEXT_PUBLIC_SUPABASE_ANON_KEY
```

## สำคัญ

หลังแก้ env vars บน Vercel ต้อง redeploy เพื่อให้ค่าใหม่ถูกใช้

---

# Slide 12: Deploy ไป Vercel

## วิธีทำ

1. เข้า Vercel Dashboard
2. Import GitHub repository
3. เลือก Next.js project
4. เพิ่ม environment variables
5. กด Deploy
6. รอ build สำเร็จ
7. เปิด production URL

## ถ้า build fail

ดู build logs ใน Vercel ก่อนเดาแก้

---

# Slide 13: Test Production URL

## ตรวจหลัง deploy

- เปิด `/issues`
- เห็นข้อมูลจาก Supabase
- สร้าง issue ใหม่
- update status
- เปิด Supabase Table Editor ดูข้อมูลเปลี่ยนจริง

## ถ้า local ใช้ได้ แต่ production ไม่ได้

มักเกี่ยวกับ:

- env vars บน Vercel
- RLS policy
- build error
- redirect path
- import path

---

# Slide 14: README สำหรับ Deploy

## File

```text
README.md
```

## ตำแหน่งที่วาง

เพิ่มหัวข้อเหล่านี้ต่อท้าย `README.md` หรือวางหลังหัวข้อวิธีรัน project ถ้ามีอยู่แล้ว

## เพิ่มหัวข้อ

```md
## Environment Variables

Required:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`

## Deploy

1. Push project to GitHub
2. Import repository into Vercel
3. Add environment variables
4. Deploy
```

---

# Slide 15: Day 4 Review

## วันนี้เราเรียนอะไร

- สร้าง Supabase project
- สร้าง table `issues`
- ตั้ง demo RLS policies
- อ่านข้อมูลจาก Supabase
- แสดง issue list และ detail
- create issue ด้วย Server Action
- update status ด้วย Server Action
- เข้าใจ Delete/Soft delete ในระดับ concept
- deploy Next.js + Supabase ไป Vercel

## Key Message

Day 4 คือวันที่ prototype ของเราเริ่มเป็น web application ที่มี database และ URL จริง โดยทำ core CRUD เป็น Create, Read และ Update ก่อน

---

# Slide 16: Preview Day 5

## Day 5 จะทำอะไร

- Login/logout แบบ email/password
- Protected page
- Role USER/ADMIN
- หน้า admin แบบง่าย
- ปรับ RLS จาก demo-only เป็น policy ที่ปลอดภัยขึ้น
- OWASP และ LLM-safe coding
- จุดตรวจ deployment/security
- final demo

## Key Message

Day 4 ทำให้ระบบทำงานได้ Day 5 จะทำให้ระบบปลอดภัยและพร้อมคิดแบบ production มากขึ้น

---

# Slide 17: Update + Deploy

## ขั้นตอน

1. เพิ่ม update status
2. ทดสอบ Create/Read/Update ใน local
3. อธิบายว่า Delete ของระบบนี้ใช้ close/soft delete concept
4. run `npm run build`
5. push ขึ้น GitHub
6. deploy ไป Vercel
7. เพิ่ม env vars บน Vercel
8. เปิด production URL

## ผลลัพธ์

ผู้เรียนมี production URL ที่เปิดแล้ว Create/Read/Update กับ Supabase ได้จริง

---

# Slide 18: โค้ดสุดท้ายของ Update Status

## `src/lib/issues.ts`

```ts
export async function updateIssueStatus(id: string, status: IssueStatus) {
  const supabase = createSupabaseServerClient();

  const { error } = await supabase
  .from("issues")
  .update({
    status,
    updated_at: new Date().toISOString(),
  })
  .eq("id", id);

  if (error) {
  throw new Error(`Failed to update issue: ${error.message}`);
  }
}
```

## `src/app/actions.ts`

```ts
const allowedStatuses: IssueStatus[] = ["OPEN", "IN_PROGRESS", "DONE"];

export async function updateIssueStatusAction(formData: FormData) {
  const id = String(formData.get("id") ?? "");
  const status = String(formData.get("status") ?? "");

  if (!id || !allowedStatuses.includes(status as IssueStatus)) {
  throw new Error("Invalid update request");
  }

  await updateIssueStatus(id, status as IssueStatus);
  revalidatePath("/issues");
}
```

## ภาพรวมหลัง deploy

```text
Local Next.js
-> GitHub
-> Vercel
-> Environment Variables
-> Supabase Database
```

---

# Slide 19: Common Mistakes

## ข้อผิดพลาดที่พบบ่อย

- ลืม validate status ใน server action
- RLS policy ไม่อนุญาต update
- env vars บน Vercel ไม่ครบ
- build ผ่าน local แต่ลืม redeploy หลังแก้ env
- เข้าใจผิดว่า hard delete จำเป็นเสมอ

---


---

# Glossary

| คำ | ความหมาย |
|---|---|
| Update | การแก้ไขข้อมูล |
| Close issue | การปิดงานด้วย status เช่น `DONE` |
| Hard delete | ลบ record จริงจาก database |
| Soft delete | mark ว่าลบแล้ว แต่ยังเก็บ record |
| Build | การ compile project ก่อน deploy |
| Environment variables | ค่าตั้งค่าที่ไม่ควร hardcode ใน source code |













