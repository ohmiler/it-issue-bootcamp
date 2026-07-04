# Day 3 - ชั่วโมงที่ 2: Tailwind Components and Responsive UI

## เป้าหมายของชั่วโมงนี้

หลังจบชั่วโมงที่สองของ Day 3 ผู้เรียนควรสามารถ:

1. ใช้ Tailwind กับ component ที่แยกไว้จาก Day 2 ได้
2. ปรับ `StatusBadge` ให้ใช้ class ตามสถานะได้เป็นระบบ
3. ปรับ `IssueList` ให้เป็น table ที่อ่านง่ายและ responsive
4. ตรวจ layout เดิมของ `IssueForm` และปรับเฉพาะ field/helper text ที่จำเป็น
5. เข้าใจการใช้ component + props + Tailwind ร่วมกัน
6. แยกความรับผิดชอบระหว่าง data, component และ style ได้ชัดขึ้น

## ไฟล์ที่ใช้ในชั่วโมงนี้

แนะนำให้วาง component ใน:

```text
components/StatusBadge.tsx
components/IssueList.tsx
components/IssueForm.tsx
```

---

# โครงสร้างเวลา 60 นาที

| เวลา | หัวข้อ | รูปแบบ |
|---|---|---|
| 0-5 นาที | Recap Tailwind จากชั่วโมงแรก | ถามตอบ |
| 5-15 นาที | Component UI ที่ควรปรับในระบบเรา | Explain |
| 15-25 นาที | ปรับ `StatusBadge` ด้วย Tailwind | Live coding |
| 25-40 นาที | ปรับ `IssueList` และ responsive table | Live coding |
| 40-50 นาที | ปรับ field ใน `IssueForm` โดยไม่ทำให้ layout เดิมเพี้ยน | Live coding |
| 50-60 นาที | สรุปสิ่งที่ทำ | ทำทีละขั้นตอน |

---

# Slide 1: Recap จากชั่วโมงแรก

## ชั่วโมงที่แล้วเราเรียนอะไร

- Tailwind CSS คืออะไร
- ติดตั้ง Tailwind ใน Next.js project
- ใช้ utility class พื้นฐาน
- แปลง header, main, section และ button บางส่วน
- เข้าใจว่า Tailwind ไม่ได้ลบความรู้ CSS เดิม แต่ใช้ CSS concept ผ่าน class

ชั่วโมงนี้เราจะเอา Tailwind ไปใช้กับ component จริงของระบบ ได้แก่ `StatusBadge`, `IssueList` และ `IssueForm`

---

# Slide 2: Component จาก Day 2 ที่จะปรับ

## Components ที่จะปรับ

```text
StatusBadge
IssueList
IssueForm
```

## สิ่งที่จะเพิ่มในชั่วโมงนี้

- ใส่ Tailwind class ให้แต่ละ component
- ทำให้ layout อ่านง่ายทั้ง mobile และ desktop
- ใช้สี ระยะห่าง และ hierarchy ให้ช่วย scan ข้อมูลเร็วขึ้น
- ทำ pattern ที่ใช้ซ้ำได้ เช่น badge ตาม status และ form field ที่หน้าตาเหมือนกัน

---

# Slide 3: หลักคิดก่อนปรับ UI

## UI ของระบบภายในควรเป็นอย่างไร

- อ่านง่าย
- scan ข้อมูลได้เร็ว
- ปุ่มและ field ชัดเจน
- ไม่ตกแต่งจนรบกวนงาน
- responsive พอสำหรับผู้แจ้งปัญหาผ่านมือถือ
- admin table ใช้งานบนจอกว้างได้ดี

ระบบ operational tool ไม่ควรดูเหมือน landing page แต่ควรเป็น UI ที่ช่วยให้ทำงานซ้ำ ๆ ได้ดี

---

# Slide 4: `StatusBadge` ก่อนปรับ

```tsx
function getStatusClass(status: IssueStatus): string {
  if (status === "OPEN") {
  return "status-open";
  }

  if (status === "IN_PROGRESS") {
  return "status-progress";
  }

  return "status-done";
}

function StatusBadge({ status }: { status: IssueStatus }) {
  return (
  <span className={`status ${getStatusClass(status)}`}>
    {status}
  </span>
  );
}
```

## ปัญหา

ยังพึ่ง CSS class เดิมจาก `globals.css`

---

# Slide 5: `StatusBadge` ด้วย Tailwind

## File

```text
components/StatusBadge.tsx
```

## ตำแหน่งที่แก้

ใช้ code นี้แทน function `getStatusClass()` และ `StatusBadge()` เดิมทั้งคู่

```tsx
function getStatusClass(status: IssueStatus): string {
  if (status === "OPEN") {
  return "bg-red-50 text-red-700 ring-red-200";
  }

  if (status === "IN_PROGRESS") {
  return "bg-amber-50 text-amber-700 ring-amber-200";
  }

  return "bg-emerald-50 text-emerald-700 ring-emerald-200";
}

function StatusBadge({ status }: { status: IssueStatus }) {
  return (
  <span
    className={`inline-flex rounded-full px-2.5 py-1 text-xs font-bold ring-1 ${getStatusClass(
      status
    )}`}
  >
    {status}
  </span>
  );
}
```

เรายังใช้ logic เดิม แต่เปลี่ยน output จาก CSS class ที่เราสร้างเอง เป็น Tailwind class

---

# Slide 6: `IssueList` ก่อนปรับ

```tsx
import Link from "next/link";
import { StatusBadge } from "./StatusBadge";
import type { Issue } from "@/types/issue";

type IssueListProps = {
  issues: Issue[];
};

export function IssueList({ issues }: IssueListProps) {
  return (
    <section aria-labelledby="issue-list-title">
      <h2 id="issue-list-title">รายการปัญหาล่าสุด</h2>
      <p>ตัวอย่างรายการปัญหาที่ถูกแจ้งเข้ามาในระบบ</p>

      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>รหัส</th>
              <th>หัวข้อ</th>
              <th>ผู้แจ้ง</th>
              <th>สถานะ</th>
              <th>รายละเอียด</th>
            </tr>
          </thead>
          <tbody>
            {issues.map((issue) => (
              <tr key={issue.id}>
                <td>#{issue.id}</td>
                <td>{issue.title}</td>
                <td>{issue.reporterName}</td>
                <td>
                  <StatusBadge status={issue.status} />
                </td>
                <td>
                  <Link href={`/issues/${issue.id}`}>ดูรายละเอียด</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
```

## สิ่งที่จะปรับ

- section style
- table wrapper
- table header
- table row
- empty state เบื้องต้น
- Link ไป detail

---

# Slide 7: Section และ Header ของ IssueList

## File

```text
components/IssueList.tsx
```

## ตำแหน่งที่แก้

ปรับ `<section>`, `<h2>` และ `<p>` ด้านบนของ `IssueList`

```tsx
<section
  aria-labelledby="issue-list-title"
  className="rounded-lg border border-slate-200 bg-white p-6"
>
  <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
    <div>
      <h2 id="issue-list-title" className="text-xl font-bold text-slate-950">
        รายการปัญหาล่าสุด
      </h2>
      <p className="mt-1 text-sm text-slate-600">
        ตัวอย่างรายการปัญหาที่ถูกแจ้งเข้ามาในระบบ
      </p>
    </div>

    <p className="text-sm font-medium text-slate-600">
      ทั้งหมด {issues.length} รายการ
    </p>
  </div>
```

## อธิบาย

- `section` กลายเป็นกล่องหลักของรายการ
- `h2` และคำอธิบายยังอยู่เหมือนเดิม แต่เพิ่ม hierarchy ด้วย Tailwind
- จำนวนรายการอยู่ฝั่งขวาบนจอกว้าง และลงบรรทัดใหม่บนจอเล็ก

---

# Slide 8: Responsive Table Wrapper

## File

```text
components/IssueList.tsx
```

## ตำแหน่งที่แก้

ใช้ code นี้แทน wrapper เดิม:

```tsx
<div className="table-wrapper">
  <table>...</table>
</div>
```

เป็น:

```tsx
<div className="mt-4 overflow-x-auto">
  <table className="w-full min-w-[760px] border-collapse text-sm">
    ...
  </table>
</div>
```

## ทำไมต้อง `overflow-x-auto`

ตารางหลาย column อาจล้นจอมือถือ จึงให้ scroll แนวนอนแทนการบีบจนอ่านไม่ได้

## ทำไมต้อง `min-w-[760px]`

ช่วยให้ column ไม่บีบเกินไปบนจอเล็ก

---

# Slide 9: Table Header

## File

```text
components/IssueList.tsx
```

## ตำแหน่งที่แก้

แทนที่ `<thead>...</thead>` เดิมใน table ของ `IssueList` ด้วย code นี้

```tsx
<thead>
  <tr className="border-b border-slate-200 bg-slate-50 text-left text-xs uppercase text-slate-500">
    <th className="px-3 py-3 font-semibold">รหัส</th>
    <th className="px-3 py-3 font-semibold">หัวข้อ</th>
    <th className="px-3 py-3 font-semibold">ผู้แจ้ง</th>
    <th className="px-3 py-3 font-semibold">สถานะ</th>
    <th className="px-3 py-3 font-semibold">รายละเอียด</th>
  </tr>
</thead>
```

Header ของ table ควรทำให้แยกจาก data row ได้ชัดเจน

---

# Slide 10: Table Body และ Link

## File

```text
components/IssueList.tsx
```

## ตำแหน่งที่แก้

แทนที่ `<tbody>...</tbody>` เดิมใน table ของ `IssueList` ด้วย code นี้

```tsx
<tbody>
  {issues.map((issue) => (
    <tr key={issue.id} className="border-b border-slate-100 last:border-0">
      <td className="px-3 py-4 font-medium text-slate-700">#{issue.id}</td>
      <td className="px-3 py-4 text-slate-950">{issue.title}</td>
      <td className="px-3 py-4 text-slate-600">{issue.reporterName}</td>
      <td className="px-3 py-4">
        <StatusBadge status={issue.status} />
      </td>
      <td className="px-3 py-4">
        <Link
          href={`/issues/${issue.id}`}
          className="font-semibold text-teal-700 hover:text-teal-900"
        >
          ดูรายละเอียด
        </Link>
      </td>
    </tr>
  ))}
</tbody>
```

## อธิบาย

- ใช้ `StatusBadge` เดิมต่อ ไม่ต้องย้าย logic มาไว้ใน table
- ใช้ `Link` จาก `next/link` ให้ตรงกับโค้ดจริง
- เพิ่ม padding และสีให้แต่ละ cell อ่านง่ายขึ้น

---

# Slide 11: Empty State

## ทำไมต้องมี Empty State

ถ้ายังไม่มี issue ระบบไม่ควรแสดงตารางว่าง ๆ โดยไม่บอกอะไร

## File

```text
components/IssueList.tsx
```

## ตำแหน่งที่วาง

วาง `if (issues.length === 0) { ... }` ไว้เป็นบรรทัดแรกใน function `IssueList` ก่อน `return` หลัก

```tsx
if (issues.length === 0) {
  return (
    <section className="rounded-lg border border-dashed border-slate-300 bg-white p-8 text-center">
      <h2 className="text-lg font-bold text-slate-950">ยังไม่มีรายการปัญหา</h2>
      <p className="mt-2 text-sm text-slate-600">
        เมื่อมีการแจ้งปัญหา รายการจะแสดงที่นี่
      </p>
    </section>
  );
}
```

State ของ UI ไม่ได้มีแค่ success ต้องคิดถึง empty, loading และ error ด้วย

---

# Slide 12: `IssueForm` Layout

## ตรวจ Layout เดิมก่อนปรับ

## File

```text
components/IssueForm.tsx
```

## ตำแหน่งที่แก้

จากหน้าเว็บปัจจุบัน form มี layout ใช้งานได้อยู่แล้ว จึงไม่ต้องเพิ่ม class ที่ `<form>` หรือ `<fieldset>` ในชั่วโมงนี้

```tsx
<form>
  <fieldset>
    <legend>ข้อมูลปัญหา</legend>
    ...
  </fieldset>
</form>
```

## ทำไมไม่เพิ่ม class ที่ `<form>`

- หน้าเว็บปัจจุบันจัด layout ของฟอร์มได้ถูกแล้ว
- `<form>` มีลูกหลักแค่ `<fieldset>` ตัวเดียว การใส่ `grid gap-5` ที่ `<form>` จึงไม่ช่วยจัด field ข้างใน
- ถ้าจะเปลี่ยน layout จริง ควรเปลี่ยนที่ wrapper ของ field หรือ CSS เดิม ไม่ใช่ที่ `<form>`

ดังนั้นใน slide นี้ให้คงโครงสร้าง form เดิมไว้ แล้วอธิบายว่าเราจะปรับ Tailwind class ใน field แต่ละก้อนต่อใน slide ถัดไป

## ชื่อและอีเมลผู้แจ้ง

ส่วนชื่อและอีเมลผู้แจ้งยังใช้ wrapper เดิมไว้ก่อนได้

```tsx
<div className="form-row">
  ...
</div>
```

เพราะตอนนี้หน้าจริงแสดงผลสองช่องได้โอเคแล้ว ถ้าจะเปลี่ยน `.form-row` เป็น Tailwind ให้ทำตอนที่ตั้งใจย้าย CSS เดิมทั้งก้อน ไม่ใช่แทรก class เพิ่มเฉพาะจุดจน layout เพี้ยน

---

# Slide 13: Helper Text

## File

```text
components/IssueForm.tsx
```

## ตำแหน่งที่แก้

เพิ่ม helper text ใต้ `textarea` ของ field `description`

```diff
<div className="grid gap-2">
  <label htmlFor="description" className="text-sm font-semibold text-slate-800">
    รายละเอียดปัญหา
  </label>
  <textarea
    id="description"
    name="description"
    rows={5}
    required
    className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-teal-700 focus:outline-none focus:ring-4 focus:ring-teal-100"
  />
+  <p className="text-xs text-slate-500">
+    อธิบายอาการที่พบและขั้นตอนที่ทำก่อนเกิดปัญหา
+  </p>
</div>
```

บรรทัดที่ขึ้นต้นด้วย `+` คือโค้ดที่เพิ่มเข้ามาใหม่ Helper text ช่วยลดความไม่แน่ใจของผู้ใช้ โดยไม่ต้องใส่คำอธิบายยาว ๆ

---

# Slide 14: โค้ดสุดท้ายของ Component Layout ด้วย Tailwind

## ขั้นตอน

1. ปรับ `StatusBadge` ให้ใช้ Tailwind class
2. ปรับ `IssueList` section ให้มี border, background และ spacing
3. ปรับ table ให้มี responsive wrapper
4. เพิ่ม empty state ถ้า `issues.length === 0`
5. ปรับ `IssueForm` ให้ field อ่านง่ายขึ้น
6. คง layout เดิมของ `IssueForm` ไว้ ถ้าหน้าจริงแสดงผลถูกแล้ว

## ผลลัพธ์

หน้าเว็บยังทำงานเหมือนเดิม แต่ component แต่ละส่วนดูเป็นระบบและ responsive มากขึ้น

## ตัวอย่างภาพรวม `app/page.tsx`

```tsx
import Image from "next/image";

// Components
import { IssueForm } from "@/components/IssueForm";
import { IssueList } from "@/components/IssueList";
import { issues } from "@/data/issue";

export default function Home() {
  return (
    <>
      <header className="bg-teal-800 px-6 py-8 text-white">
        <div className="mx-auto max-w-5xl">
          <h1 className="text-3xl font-bold">ระบบแจ้งปัญหา IT</h1>
          <p className="mt-2 text-teal-100">
            แจ้งและติดตามปัญหาการใช้งานระบบภายใน
          </p>
        </div>
      </header>

      <main className="mx-auto grid grid-cols-1 max-w-5xl gap-6 px-6 py-8">
        <IssueForm />
        <IssueList issues={issues} />
      </main>

      <footer>
        <p>ฝ่ายเทคโนโลยีสารสนเทศ</p>
      </footer>
    </>
  );
}
```

---

# Slide 15: Common Mistakes

## ข้อผิดพลาดที่พบบ่อย

- ใส่ Tailwind class ยาวมากโดยไม่จัดบรรทัด
- ลืม responsive wrapper ของ table
- ทำสี badge ด้วยสีอย่างเดียว แต่ไม่มี text
- บังคับ field ใน form เป็นหลาย column ทั้งที่พื้นที่จริงไม่พอ
- ใส่ `overflow-x-auto` ที่ table แทน wrapper
- style ทุกอย่างในหน้าเดียวจน component อ่านยาก

## Speaker Notes

แนะนำให้จัด JSX หลายบรรทัดเมื่อ class ยาว เพื่อให้อ่านและแก้ง่าย

---

# Slide 16: Recap ชั่วโมงที่สองของ Day 3

## สิ่งที่ได้เรียน

- Tailwind ใช้กับ component ได้ดี เพราะ style อยู่ใกล้ UI
- `StatusBadge` สามารถ map status เป็น class ได้
- `IssueList` ควรมี responsive table และ empty state
- `IssueForm` ควรปรับเฉพาะจุดที่ช่วยให้อ่านง่าย โดยไม่ทำลาย layout เดิมที่ดีอยู่แล้ว
- Component + props + Tailwind ทำให้ UI ปรับง่ายขึ้น

## ต่อไป

เราจะเพิ่ม form state และ validation เพื่อให้ form ไม่ใช่แค่หน้าตา แต่เริ่มมีพฤติกรรมแบบ frontend application

---


---

# คำศัพท์สำคัญ

| คำศัพท์ | ความหมาย |
|---|---|
| Component styling | การกำหนดหน้าตาให้ component |
| Empty state | หน้าจอเมื่อยังไม่มีข้อมูล |
| Responsive table | ตารางที่ยังอ่านได้บนหน้าจอเล็ก |
| `Record<K, V>` | TypeScript utility type สำหรับ object mapping |
| Mobile-first | ออกแบบค่า default สำหรับมือถือก่อน แล้วค่อยขยายด้วย breakpoint |
