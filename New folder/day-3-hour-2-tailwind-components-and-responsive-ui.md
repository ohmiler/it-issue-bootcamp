# Day 3 - ชั่วโมงที่ 2: Tailwind Components and Responsive UI

## เป้าหมายของชั่วโมงนี้

หลังจบชั่วโมงที่สองของ Day 3 ผู้เรียนควรสามารถ:

1. ใช้ Tailwind กับ component ที่แยกไว้จาก Day 2 ได้
2. ปรับ `StatusBadge` ให้ใช้ class ตามสถานะได้เป็นระบบ
3. ปรับ `IssueList` ให้เป็น table ที่อ่านง่ายและ responsive
4. ปรับ `IssueForm` ให้มี layout ที่เหมาะกับ mobile และ desktop
5. เข้าใจการใช้ component + props + Tailwind ร่วมกัน
6. แยกความรับผิดชอบระหว่าง data, component และ style ได้ชัดขึ้น

## ไฟล์ที่ใช้ในชั่วโมงนี้

แนะนำให้วาง component ใน:

```text
src/components/StatusBadge.tsx
src/components/IssueList.tsx
src/components/IssueForm.tsx
```

---

# โครงสร้างเวลา 60 นาที

| เวลา | หัวข้อ | รูปแบบ |
|---|---|---|
| 0-5 นาที | Recap Tailwind จากชั่วโมงแรก | ถามตอบ |
| 5-15 นาที | Component UI ที่ควรปรับในระบบเรา | Explain |
| 15-25 นาที | ปรับ `StatusBadge` ด้วย Tailwind | Live coding |
| 25-40 นาที | ปรับ `IssueList` และ responsive table | Live coding |
| 40-50 นาที | ปรับ `IssueForm` ด้วย responsive layout | Live coding |
| 50-60 นาที | สรุปสิ่งที่ทำ | ทำทีละขั้นตอน |

---

# Slide 1: Recap จากชั่วโมงแรก

## ชั่วโมงที่แล้วเราเรียนอะไร

- Tailwind CSS คืออะไร
- ติดตั้ง Tailwind ใน Next.js project
- ใช้ utility class พื้นฐาน
- แปลง header, main, section และ button บางส่วน
- เข้าใจว่า Tailwind ไม่ได้ลบความรู้ CSS เดิม แต่ใช้ CSS concept ผ่าน class

## Key Message

ชั่วโมงนี้เราจะเอา Tailwind ไปใช้กับ component จริงของระบบ ได้แก่ `StatusBadge`, `IssueList` และ `IssueForm`

---

# Slide 2: Component จาก Day 2 ที่จะปรับ

## Component หลัก

```text
StatusBadge -> แสดงสถานะ
IssueList   -> แสดงรายการปัญหา
IssueForm   -> form แจ้งปัญหา
```

## ตอนนี้แต่ละ component มีหน้าที่ชัดแล้ว

- `StatusBadge` รับ `status`
- `IssueList` รับ `issues`
- `IssueForm` แสดง field สำหรับสร้าง issue

## สิ่งที่จะเพิ่มในชั่วโมงนี้

- Tailwind class
- responsive behavior
- visual hierarchy
- reusable style pattern

---

# Slide 3: หลักคิดก่อนปรับ UI

## UI ของระบบภายในควรเป็นอย่างไร

- อ่านง่าย
- scan ข้อมูลได้เร็ว
- ปุ่มและ field ชัดเจน
- ไม่ตกแต่งจนรบกวนงาน
- responsive พอสำหรับผู้แจ้งปัญหาผ่านมือถือ
- admin table ใช้งานบนจอกว้างได้ดี

## Key Message

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
app/page.tsx หรือ src/components/StatusBadge.tsx
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

## Key Message

เรายังใช้ logic เดิม แต่เปลี่ยน output จาก CSS class ที่เราสร้างเอง เป็น Tailwind class

---

# Slide 6: ใช้ Object Map แทน `if`

## อีกวิธีที่อ่านง่ายขึ้น

## File

```text
app/page.tsx หรือ src/components/StatusBadge.tsx
```

## ตำแหน่งที่แก้

ถ้าเลือกใช้วิธีนี้ ให้ใช้ code ชุดนี้แทน `getStatusClass()` และ `StatusBadge()` จาก Slide 5 ไม่ต้องมีทั้งสองวิธีในไฟล์เดียวกัน

```tsx
const statusClassMap: Record<IssueStatus, string> = {
  OPEN: "bg-red-50 text-red-700 ring-red-200",
  IN_PROGRESS: "bg-amber-50 text-amber-700 ring-amber-200",
  DONE: "bg-emerald-50 text-emerald-700 ring-emerald-200",
};

function StatusBadge({ status }: { status: IssueStatus }) {
  return (
  <span
    className={`inline-flex rounded-full px-2.5 py-1 text-xs font-bold ring-1 ${statusClassMap[status]}`}
  >
    {status}
  </span>
  );
}
```

## อธิบาย

`Record<IssueStatus, string>` บอก TypeScript ว่าทุก status ต้องมี class mapping

---

# Slide 7: `IssueList` ก่อนปรับ

```tsx
function IssueList({ issues }: { issues: Issue[] }) {
  return (
  <section aria-labelledby="issue-list-title">
    <h2 id="issue-list-title">รายการปัญหาล่าสุด</h2>

    <div className="table-wrapper">
      <table>
        ...
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
- link ไป detail

---

# Slide 8: `IssueList` Props

## ตั้งชื่อ Props Type

## File

```text
app/page.tsx หรือ src/components/IssueList.tsx
```

## ตำแหน่งที่วาง

วาง `type IssueListProps` ไว้เหนือ function `IssueList` แล้วแก้ parameter ของ `IssueList` ให้ใช้ type นี้

```tsx
type IssueListProps = {
  issues: Issue[];
};
```

## Component

```tsx
function IssueList({ issues }: IssueListProps) {
  return (
  <section className="rounded-lg border border-slate-200 bg-white p-6">
    ...
  </section>
  );
}
```

## Key Message

เมื่อ component เริ่มจริงจังขึ้น การแยก props type จะช่วยให้อ่านง่าย

---

# Slide 9: Header ของ IssueList

## File

```text
app/page.tsx หรือ src/components/IssueList.tsx
```

## ตำแหน่งที่วาง

วาง `<div className="flex ...">...</div>` นี้ไว้เป็น element แรกภายใน `<section>` ของ `IssueList` ก่อน table wrapper

```tsx
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

- mobile เรียงแนวตั้ง
- desktop ใช้ `sm:flex-row` เพื่อจัดหัวข้อและจำนวนรายการคนละฝั่ง

---

# Slide 10: Responsive Table Wrapper

## File

```text
app/page.tsx หรือ src/components/IssueList.tsx
```

## ตำแหน่งที่แก้

ใช้ code นี้แทน wrapper เดิม:

```tsx
<div className="table-wrapper">
  <table>...</table>
</div>
```

```tsx
<div className="mt-4 overflow-x-auto">
  <table className="min-w-[760px] w-full border-collapse text-sm">
  ...
  </table>
</div>
```

## ทำไมต้อง `overflow-x-auto`

ตารางหลาย column อาจล้นจอมือถือ จึงให้ scroll แนวนอนแทนการบีบจนอ่านไม่ได้

## ทำไมต้อง `min-w-[760px]`

ช่วยให้ column ไม่บีบเกินไปบนจอเล็ก

---

# Slide 11: Table Header

## File

```text
app/page.tsx หรือ src/components/IssueList.tsx
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
  <th className="px-3 py-3 font-semibold">จัดการ</th>
  </tr>
</thead>
```

## Key Message

Header ของ table ควรทำให้แยกจาก data row ได้ชัดเจน

---

# Slide 12: Table Body

## File

```text
app/page.tsx หรือ src/components/IssueList.tsx
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
      <a className="font-semibold text-teal-700 hover:text-teal-900" href={`/issues/${issue.id}`}>
        ดูรายละเอียด
      </a>
    </td>
  </tr>
  ))}
</tbody>
```

## หมายเหตุ

ถ้าอยู่ใน Next.js app จริง แนะนำใช้ `Link` จาก `next/link` แทน `<a>` สำหรับ internal navigation

---

# Slide 13: Empty State

## ทำไมต้องมี Empty State

ถ้ายังไม่มี issue ระบบไม่ควรแสดงตารางว่าง ๆ โดยไม่บอกอะไร

## File

```text
app/page.tsx หรือ src/components/IssueList.tsx
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

## Key Message

State ของ UI ไม่ได้มีแค่ success ต้องคิดถึง empty, loading และ error ด้วย

---

# Slide 14: `IssueForm` Layout

## ใช้ Grid สำหรับ Form

## File

```text
app/page.tsx หรือ src/components/IssueForm.tsx
```

## ตำแหน่งที่แก้

เพิ่ม `className="mt-6 grid gap-5"` ที่ `<form>` เดิมของ `IssueForm`

```tsx
<form className="mt-6 grid gap-5">
  ...
</form>
```

## ชื่อและอีเมลผู้แจ้ง

ใช้ wrapper นี้ครอบ field `reporterName` และ `reporterEmail` เดิม โดยวางไว้ใน form ตรงส่วนบนสุดก่อน field `title`

```tsx
<div className="grid gap-5 md:grid-cols-2">
  {/* reporterName field */}
  {/* reporterEmail field */}
</div>
```

## Key Message

mobile-first: ค่า default คือเรียงแนวตั้ง แล้วค่อยใช้ `md:grid-cols-2` เมื่อหน้าจอกว้างขึ้น

---

# Slide 15: Reusable Field Pattern

## Pattern สำหรับ field

## File

```text
app/page.tsx หรือ src/components/IssueForm.tsx
```

## ตำแหน่งที่แก้

ใช้ pattern นี้แทน field `title` เดิมก่อน แล้วค่อยทำซ้ำกับ field อื่นที่เป็น input หรือ textarea

```tsx
<div className="grid gap-2">
  <label htmlFor="title" className="text-sm font-semibold text-slate-800">
  หัวข้อปัญหา
  </label>
  <input
  id="title"
  name="title"
  type="text"
  required
  className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-teal-700 focus:outline-none focus:ring-4 focus:ring-teal-100"
  />
</div>
```

## จุดที่ควรคงที่

- label ชัดเจน
- input กว้างเต็มพื้นที่
- focus state ชัด
- spacing ระหว่าง label/input พอดี

---

# Slide 16: Helper Text

## File

```text
app/page.tsx หรือ src/components/IssueForm.tsx
```

## ตำแหน่งที่แก้

ใช้ code นี้แทน field `description` เดิมทั้งก้อน

```tsx
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
  <p className="text-xs text-slate-500">อธิบายอาการที่พบและขั้นตอนที่ทำก่อนเกิดปัญหา</p>
</div>
```

## Key Message

Helper text ช่วยลดความไม่แน่ใจของผู้ใช้ โดยไม่ต้องใส่คำอธิบายยาว ๆ

---

# Slide 17: Page Layout หลังปรับ Component

## File

```text
app/page.tsx
```

## ตำแหน่งที่แก้

ใช้ตัวอย่างนี้เป็นแนวทางแก้เฉพาะ function `HomePage` หลังจากมี `IssueForm` และ `IssueList` แล้ว

```tsx
export default function HomePage() {
  return (
  <>
    <header className="bg-teal-800 px-6 py-8 text-white">
      ...
    </header>

    <main className="mx-auto grid max-w-5xl gap-6 px-6 py-8">
      <IssueForm />
      <IssueList issues={issues} />
    </main>
  </>
  );
}
```

## อธิบาย

ใช้ `grid gap-6` ที่ main เพื่อให้แต่ละ section มีระยะห่างสม่ำเสมอ

---

# Slide 18: โค้ดสุดท้ายของ Component Layout ด้วย Tailwind

## ขั้นตอน

1. ปรับ `StatusBadge` ให้ใช้ Tailwind class
2. ปรับ `IssueList` section ให้มี border, background และ spacing
3. ปรับ table ให้มี responsive wrapper
4. เพิ่ม empty state ถ้า `issues.length === 0`
5. ปรับ `IssueForm` ให้ field อ่านง่ายขึ้น
6. ใช้ `md:grid-cols-2` กับชื่อและอีเมลผู้แจ้ง

## ผลลัพธ์

หน้าเว็บยังทำงานเหมือนเดิม แต่ component แต่ละส่วนดูเป็นระบบและ responsive มากขึ้น

## ตัวอย่างภาพรวม `HomePage`

```tsx
export default function HomePage() {
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

      <main className="mx-auto grid max-w-5xl gap-6 px-6 py-8">
        <IssueForm />
        <IssueList issues={issues} />
      </main>
    </>
  );
}
```

## Component ที่ควรปรับครบ

```text
StatusBadge -> สีและขนาด badge
IssueList   -> section, table, empty state
IssueForm   -> field spacing, helper text, responsive grid
```

---

# Slide 19: Common Mistakes

## ข้อผิดพลาดที่พบบ่อย

- ใส่ Tailwind class ยาวมากโดยไม่จัดบรรทัด
- ลืม responsive wrapper ของ table
- ทำสี badge ด้วยสีอย่างเดียว แต่ไม่มี text
- ใช้ `md:grid-cols-2` แต่ลืม `grid`
- ใส่ `overflow-x-auto` ที่ table แทน wrapper
- style ทุกอย่างในหน้าเดียวจน component อ่านยาก

## Speaker Notes

แนะนำให้จัด JSX หลายบรรทัดเมื่อ class ยาว เพื่อให้อ่านและแก้ง่าย

---

# Slide 20: Recap ชั่วโมงที่สองของ Day 3

## สิ่งที่ได้เรียน

- Tailwind ใช้กับ component ได้ดี เพราะ style อยู่ใกล้ UI
- `StatusBadge` สามารถ map status เป็น class ได้
- `IssueList` ควรมี responsive table และ empty state
- `IssueForm` ควรใช้ mobile-first layout
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












