# Day 3 - ชั่วโมงที่ 3: Form State and Frontend Validation

## เป้าหมายของชั่วโมงนี้

หลังจบชั่วโมงที่สามของ Day 3 ผู้เรียนควรสามารถ:

1. เข้าใจความต่างระหว่าง Server Component และ Client Component ใน Next.js เบื้องต้น
2. เข้าใจว่าเมื่อใดต้องใช้ `"use client"`
3. ใช้ `useState` เพื่อเก็บข้อมูล mock issues ในฝั่ง client ได้
4. อ่านข้อมูลจาก form ด้วย `FormData` ได้
5. สร้าง validation function เบื้องต้นสำหรับ issue form ได้
6. แสดง error message จาก validation ได้
7. เพิ่ม issue ใหม่เข้า mock list ได้โดยยังไม่ใช้ database
8. เข้าใจว่า frontend validation ไม่แทนที่ server validation

## ไฟล์ที่ใช้ในชั่วโมงนี้

Client wrapper:

```text
src/components/IssueBoard.tsx
```

Form และ list:

```text
src/components/IssueForm.tsx
src/components/IssueList.tsx
```

Types และ mock data:

```text
src/types/issue.ts
src/data/issues.ts
```

ถ้าแยก validation helper:

```text
src/lib/validation.ts
```

---

# โครงสร้างเวลา 60 นาที

| เวลา | หัวข้อ | รูปแบบ |
|---|---|---|
| 0-5 นาที | Recap component UI | ถามตอบ |
| 5-15 นาที | Server Component vs Client Component | Explain |
| 15-25 นาที | สร้าง client wrapper `IssueBoard` | Live coding |
| 25-35 นาที | อ่าน form ด้วย `FormData` | Live coding |
| 35-45 นาที | Frontend validation | Live coding |
| 45-55 นาที | Add issue to mock state | ทำทีละขั้นตอน |
| 55-60 นาที | Recap และ security note | สรุป |

---

# Slide 1: Recap จากชั่วโมงที่ 2

## ตอนนี้เรามีอะไรแล้ว

- UI ใช้ Tailwind
- `IssueForm` ดูเป็น form จริงมากขึ้น
- `IssueList` แสดงข้อมูลจาก `issues`
- `StatusBadge` แสดงสีตาม status
- หน้าเว็บ responsive ดีขึ้น

## สิ่งที่ยังขาด

- กด submit แล้วยังไม่เกิดอะไร
- form ยังไม่ validate แบบ custom
- issue ใหม่ยังไม่เพิ่มเข้า list
- ยังไม่มี loading/error state จริง

## Key Message

ชั่วโมงนี้เราจะทำให้ form เริ่มมี behavior แบบ frontend application

---

# Slide 2: Server Component vs Client Component

## ใน Next.js App Router

โดย default component ใน `app` เป็น Server Component

Server Component เหมาะกับ:

- render UI จากข้อมูล
- query database ในอนาคต
- ลด JavaScript ที่ส่งไป browser

Client Component เหมาะกับ:

- `useState`
- `useEffect`
- event handler เช่น `onClick`, `onSubmit`
- interaction ที่เกิดใน browser

## Key Message

ถ้าต้องใช้ state หรือ event handler ใน component ต้องทำเป็น Client Component ด้วย `"use client"`

---

# Slide 3: `"use client"` คืออะไร

## ตัวอย่าง

```tsx
"use client";

import { useState } from "react";

export function IssueBoard() {
  const [count, setCount] = useState(0);

  return <button onClick={() => setCount(count + 1)}>Count {count}</button>;
}
```

## จุดสำคัญ

- ต้องอยู่บรรทัดบนสุดของไฟล์
- ทำให้ไฟล์นี้และ component ข้างในทำงานเป็น Client Component
- ใช้เมื่อจำเป็น ไม่ต้องใส่ทุกไฟล์

---

# Slide 4: ทำไมต้องมี `IssueBoard`

## ปัญหา

เราต้องให้ `IssueForm` เพิ่มข้อมูลเข้า `IssueList`

```text
IssueForm submit -> เพิ่ม issue ใหม่ -> IssueList อัปเดต
```

## วิธีทำใน frontend mock

สร้าง component กลางที่ถือ state:

```text
IssueBoard
  ├─ IssueForm
  └─ IssueList
```

`IssueBoard` จะเก็บ:

```tsx
const [items, setItems] = useState(initialIssues);
```

## Key Message

ถ้าหลาย component ต้องใช้ state ร่วมกัน ให้ยก state ไปไว้ที่ parent component

---

# Slide 5: สร้าง `IssueBoard`

## ไฟล์ตัวอย่าง

```text
src/components/IssueBoard.tsx
```

## ตำแหน่งที่วาง

สร้างไฟล์ใหม่ `src/components/IssueBoard.tsx` แล้วใส่ code นี้เป็นเนื้อหาทั้งไฟล์ ถ้ายังไม่ได้แยก component เป็นไฟล์กลาง ให้ใช้เป็น demo concept ใน `page.tsx` ก่อน

## Code

```tsx
"use client";

import { useState } from "react";

type IssueBoardProps = {
  initialIssues: Issue[];
};

export function IssueBoard({ initialIssues }: IssueBoardProps) {
  const [items, setItems] = useState<Issue[]>(initialIssues);

  return (
  <main className="mx-auto grid max-w-5xl gap-6 px-6 py-8">
    <IssueForm />
    <IssueList issues={items} />
  </main>
  );
}
```

## หมายเหตุ

ตัวอย่างนี้สมมติว่า `Issue`, `IssueForm` และ `IssueList` ถูก import จากไฟล์กลางแล้ว ถ้ายังอยู่ใน `page.tsx` ให้ใช้เป็น demo concept ก่อน

---

# Slide 6: ส่ง Function จาก Parent ไป Child

## เป้าหมาย

ให้ `IssueForm` แจ้ง parent เมื่อมี issue ใหม่

## File

```text
src/components/IssueForm.tsx และ src/components/IssueBoard.tsx
```

## ตำแหน่งที่แก้

เพิ่ม `IssueFormProps` เหนือ function `IssueForm` และเพิ่ม `handleCreateIssue` ใน `IssueBoard` ใต้บรรทัด `useState`

```tsx
type IssueFormProps = {
  onCreateIssue: (issue: Issue) => void;
};
```

## ใน `IssueBoard`

```tsx
function handleCreateIssue(issue: Issue) {
  setItems((currentItems) => [issue, ...currentItems]);
}

return (
  <main className="mx-auto grid max-w-5xl gap-6 px-6 py-8">
  <IssueForm onCreateIssue={handleCreateIssue} />
  <IssueList issues={items} />
  </main>
);
```

## Key Message

Parent ถือ state ส่วน child เรียก function ผ่าน props เพื่อขอเปลี่ยน state

---

# Slide 7: Form Submit ใน Client Component

## `onSubmit`

## File

```text
src/components/IssueForm.tsx
```

## ตำแหน่งที่แก้

แก้ function `IssueForm` เดิมให้รับ `{ onCreateIssue }` เป็น props แล้วเพิ่ม `handleSubmit` ไว้เป็น function ด้านใน ก่อน `return`

```tsx
function IssueForm({ onCreateIssue }: IssueFormProps) {
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
  event.preventDefault();
  }

  return <form onSubmit={handleSubmit}>...</form>;
}
```

## อธิบาย

- `event.preventDefault()` ป้องกัน browser reload หน้า
- `React.FormEvent<HTMLFormElement>` คือ type ของ submit event
- ชั่วโมงนี้เราจัดการ submit ฝั่ง client ก่อน

---

# Slide 8: อ่านข้อมูลจาก FormData

## File

```text
src/components/IssueForm.tsx
```

## ตำแหน่งที่วาง

วาง code อ่าน `FormData` ไว้ใน `handleSubmit` ต่อจาก `event.preventDefault()`

```tsx
function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
  event.preventDefault();

  const formData = new FormData(event.currentTarget);

  const reporterName = String(formData.get("reporterName") ?? "");
  const reporterEmail = String(formData.get("reporterEmail") ?? "");
  const title = String(formData.get("title") ?? "");
  const description = String(formData.get("description") ?? "");
}
```

## Key Message

ชื่อที่ใช้ใน `formData.get(...)` ต้องตรงกับ `name` ของ input จาก Day 1

---

# Slide 9: สร้าง Type สำหรับ Input

## แยกข้อมูลจาก form ก่อนกลายเป็น Issue

## File

```text
src/components/IssueForm.tsx หรือ src/types/issue.ts
```

## ตำแหน่งที่วาง

ถ้ายังทำแบบง่ายในไฟล์เดียว ให้วาง `NewIssueInput` เหนือ function `IssueForm`; ถ้าแยก type แล้ว ให้วางใน `src/types/issue.ts` และ export ออกมาใช้

```ts
type NewIssueInput = {
  reporterName: string;
  reporterEmail: string;
  title: string;
  description: string;
};
```

## ทำไมไม่ใช้ `Issue` เลย

เพราะ issue ที่สร้างใหม่ยังไม่มี:

- `id`
- `status`
- `createdAt`

ระบบจะเติมให้หลังจาก validate แล้ว

---

# Slide 10: Extract Input จาก Form

## File

```text
src/components/IssueForm.tsx
```

## ตำแหน่งที่วาง

วาง function `getIssueInput` ไว้นอก `IssueForm` โดยวางเหนือ function `IssueForm` เพื่อไม่ให้สร้าง function ใหม่ทุกครั้งที่ component render

```tsx
function getIssueInput(form: HTMLFormElement): NewIssueInput {
  const formData = new FormData(form);

  return {
  reporterName: String(formData.get("reporterName") ?? "").trim(),
  reporterEmail: String(formData.get("reporterEmail") ?? "").trim(),
  title: String(formData.get("title") ?? "").trim(),
  description: String(formData.get("description") ?? "").trim(),
  };
}
```

## Speaker Notes

ดึงเฉพาะ field หลักของ issue เพื่อให้ validation และ state ในชั่วโมงนี้ไม่บวมเกินไป

---

# Slide 11: Validation Function

## File

```text
src/components/IssueForm.tsx
```

## ตำแหน่งที่วาง

วาง function `validateIssueInput` ต่อจาก `getIssueInput` และก่อน `IssueForm`

```ts
function validateIssueInput(input: NewIssueInput): string[] {
  const errors: string[] = [];

  if (input.reporterName.length < 2) {
  errors.push("กรุณากรอกชื่อผู้แจ้ง");
  }

  if (!input.reporterEmail.includes("@")) {
  errors.push("กรุณากรอกอีเมลผู้แจ้งให้ถูกต้อง");
  }

  if (input.title.length < 5) {
  errors.push("หัวข้อปัญหาต้องมีอย่างน้อย 5 ตัวอักษร");
  }

  if (input.description.length < 10) {
  errors.push("รายละเอียดปัญหาต้องมีอย่างน้อย 10 ตัวอักษร");
  }

  return errors;
}
```

## Key Message

แยก validation เป็น function จะช่วยให้ test และย้ายไป server validation ในอนาคตง่ายขึ้น

---

# Slide 12: เก็บ Error State

## File

```text
src/components/IssueForm.tsx
```

## ตำแหน่งที่แก้

เพิ่ม `useState` สำหรับ `errors` เป็นบรรทัดแรกภายใน function `IssueForm` และแทนที่ `handleSubmit` เดิมด้วย version นี้

```tsx
function IssueForm({ onCreateIssue }: IssueFormProps) {
  const [errors, setErrors] = useState<string[]>([]);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
  event.preventDefault();

  const input = getIssueInput(event.currentTarget);
  const validationErrors = validateIssueInput(input);

  if (validationErrors.length > 0) {
    setErrors(validationErrors);
    return;
  }

  setErrors([]);
  }

  return <form onSubmit={handleSubmit}>...</form>;
}
```

---

# Slide 13: แสดง Error Message

## File

```text
src/components/IssueForm.tsx
```

## ตำแหน่งที่วาง

วาง block นี้ภายใน `<form>` เหนือ field แรก เพื่อให้ผู้เรียนเห็น error ก่อนเริ่มแก้ข้อมูล

```tsx
{errors.length > 0 && (
  <div className="rounded-md border border-red-200 bg-red-50 p-4 text-sm text-red-700">
  <p className="font-bold">กรุณาตรวจสอบข้อมูล</p>
  <ul className="mt-2 list-disc space-y-1 pl-5">
    {errors.map((error) => (
      <li key={error}>{error}</li>
    ))}
  </ul>
  </div>
)}
```

## Key Message

Error state ควรบอกผู้ใช้ว่าต้องแก้ตรงไหน ไม่ใช่แค่แสดงคำว่า error

---

# Slide 14: สร้าง Issue ใหม่จาก Input

## File

```text
src/components/IssueForm.tsx
```

## ตำแหน่งที่วาง

วาง function `createIssueFromInput` ต่อจาก `validateIssueInput` และก่อน `IssueForm`

```tsx
function createIssueFromInput(input: NewIssueInput): Issue {
  return {
  id: crypto.randomUUID().slice(0, 8),
  reporterName: input.reporterName,
  reporterEmail: input.reporterEmail,
  title: input.title,
  description: input.description,
  status: "OPEN",
  createdAt: new Date().toISOString().slice(0, 10),
  };
}
```

## หมายเหตุ

ใช้ `crypto.randomUUID()` เพื่อ mock id ชั่วคราว ในระบบจริง database จะเป็นคนสร้าง id

---

# Slide 15: Submit แล้วเพิ่มเข้า List

## File

```text
src/components/IssueForm.tsx
```

## ตำแหน่งที่แก้

ใช้ code นี้แทน function `handleSubmit` ภายใน `IssueForm`

```tsx
function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
  event.preventDefault();

  const input = getIssueInput(event.currentTarget);
  const validationErrors = validateIssueInput(input);

  if (validationErrors.length > 0) {
  setErrors(validationErrors);
  return;
  }

  const newIssue = createIssueFromInput(input);
  onCreateIssue(newIssue);
  setErrors([]);
  event.currentTarget.reset();
}
```

## Key Message

ตอนนี้ form เริ่มทำงานแบบ frontend CRUD prototype: Create issue จาก form และแสดงใน list ทันที

---

# Slide 16: Frontend Validation ไม่พอ

## ต้องย้ำกับผู้เรียน

Validation ฝั่ง browser ช่วย UX แต่ไม่ใช่ security boundary

## ทำไม

- ผู้ใช้สามารถปิด JavaScript ได้
- request สามารถถูกยิงตรงเข้า server ได้
- HTML required สามารถถูก bypass ได้
- client-side code แก้ไขได้ใน browser

## Key Message

Day 3 เราทำ frontend validation เพื่อให้ผู้ใช้กรอกง่ายขึ้น แต่ Day 4/Day 5 ต้อง validate ซ้ำฝั่ง server เสมอ

---

# Slide 17: Add Issue ด้วย Mock State

## ขั้นตอน

1. สร้าง `IssueBoard` เป็น Client Component
2. เก็บ `items` ด้วย `useState`
3. ส่ง `onCreateIssue` เข้า `IssueForm`
4. อ่านข้อมูล form ด้วย `FormData`
5. validate input
6. แสดง error ถ้าข้อมูลไม่ครบ
7. ถ้าผ่าน validation ให้เพิ่ม issue เข้า list

## ผลลัพธ์

ผู้เรียนกรอก form แล้วเห็น issue ใหม่เพิ่มใน table ได้ โดยยังไม่ใช้ database

---

# Slide 18: โค้ดสุดท้ายของ Form State หลังชั่วโมงนี้

## `src/components/IssueBoard.tsx`

หลังประกอบครบแล้ว `IssueBoard` ควรถือ state กลางและส่ง handler ให้ form:

```tsx
"use client";

import { useState } from "react";
import { IssueForm } from "@/components/IssueForm";
import { IssueList } from "@/components/IssueList";
import type { Issue } from "@/types/issue";

type IssueBoardProps = {
  initialIssues: Issue[];
};

export function IssueBoard({ initialIssues }: IssueBoardProps) {
  const [items, setItems] = useState<Issue[]>(initialIssues);

  function handleCreateIssue(issue: Issue) {
  setItems((currentItems) => [issue, ...currentItems]);
  }

  return (
  <main className="mx-auto grid max-w-5xl gap-6 px-6 py-8">
    <IssueForm onCreateIssue={handleCreateIssue} />
    <IssueList issues={items} />
  </main>
  );
}
```

## ส่วนสำคัญใน `src/components/IssueForm.tsx`

`IssueForm` ต้องอ่าน form, validate, สร้าง issue ใหม่ แล้วส่งกลับไปที่ `IssueBoard`:

```tsx
function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
  event.preventDefault();

  const input = getIssueInput(event.currentTarget);
  const validationErrors = validateIssueInput(input);

  if (validationErrors.length > 0) {
  setErrors(validationErrors);
  return;
  }

  const newIssue = createIssueFromInput(input);
  onCreateIssue(newIssue);
  setErrors([]);
  event.currentTarget.reset();
}
```

## ภาพรวม

```text
IssueForm submit
-> getIssueInput()
-> validateIssueInput()
-> createIssueFromInput()
-> onCreateIssue(newIssue)
-> IssueBoard setItems()
-> IssueList แสดงรายการใหม่
```

---

# Slide 19: Common Mistakes

## ข้อผิดพลาดที่พบบ่อย

- ลืม `"use client"`
- ใช้ `useState` ใน Server Component
- ลืม `event.preventDefault()`
- `formData.get(...)` ใช้ชื่อไม่ตรงกับ `name`
- ลืม `.trim()`
- ใช้ `Issue` กับข้อมูล form ที่ยังไม่มี `id` และ `status`
- ไม่ reset form หลัง submit สำเร็จ
- คิดว่า frontend validation แปลว่าปลอดภัยแล้ว

---

# Slide 20: Recap ชั่วโมงที่สามของ Day 3

## สิ่งที่ได้เรียน

- Client Component ใช้เมื่อมี state หรือ event handler
- `IssueBoard` ถือ state กลางให้ `IssueForm` และ `IssueList`
- `FormData` อ่านค่าจาก form โดยอิงจาก `name`
- `NewIssueInput` แยกข้อมูล form ออกจาก `Issue`
- validation function ช่วยจัด logic ให้เป็นระบบ
- submit form สามารถเพิ่ม issue เข้า mock list ได้
- frontend validation ต้องมี server validation ซ้ำเสมอ

## ต่อไป

เราจะเพิ่ม mock Update/Close issue และวางภาพว่า flow นี้จะเปลี่ยนไปอย่างไรเมื่อเชื่อม database ด้วย Server Actions ใน Day 4

---


---

# คำศัพท์สำคัญ

| คำศัพท์ | ความหมาย |
|---|---|
| Client Component | component ที่รันใน browser และใช้ state/event ได้ |
| Server Component | component ที่ render ฝั่ง server โดย default ใน App Router |
| `"use client"` | directive สำหรับระบุว่าไฟล์นี้เป็น Client Component |
| `useState` | React hook สำหรับเก็บ state |
| `FormData` | API สำหรับอ่านข้อมูลจาก form |
| Frontend validation | validation เพื่อ UX ฝั่ง browser |
| Server validation | validation ฝั่ง server ที่จำเป็นต่อความปลอดภัย |

---

# อ้างอิงสำหรับผู้สอน

- [Next.js Forms Guide](https://nextjs.org/docs/app/guides/forms)













