# Day 2 - ชั่วโมงที่ 2: Convert Day 1 Static Prototype to Next.js

## เป้าหมายของชั่วโมงนี้

หลังจบชั่วโมงที่สองของ Day 2 ผู้เรียนควรสามารถ:

1. ย้ายโครงสร้าง HTML จาก Day 1 เข้า `src/app/page.tsx` ได้
2. เข้าใจความต่างสำคัญระหว่าง HTML และ TSX เช่น `className`, `htmlFor` และ self-closing tag
3. ย้าย CSS จาก `styles.css` เข้า `src/app/globals.css` ได้
4. แสดงหน้า form แจ้งปัญหาและ issue list ใน Next.js ได้เหมือน static prototype เดิม
5. เข้าใจว่าในชั่วโมงถัดไป ข้อมูล static ใน table จะถูกย้ายไปเป็น TypeScript data model

## ไฟล์ที่ใช้ในชั่วโมงนี้

HTML/TSX ของหน้าแรกอยู่ใน:

```text
src/app/page.tsx
```

CSS จาก Day 1 ย้ายเข้า:

```text
src/app/globals.css
```

ตั้งค่า `<html lang="th">` ใน:

```text
src/app/layout.tsx
```

---

# โครงสร้างเวลา 60 นาที

| เวลา | หัวข้อ | รูปแบบ |
|---|---|---|
| 0-5 นาที | Recap Hour 1: Next.js project structure | ถามตอบ |
| 5-15 นาที | วางแผนการย้ายจาก HTML/CSS เข้า Next.js | Explain |
| 15-30 นาที | Convert HTML เป็น TSX ใน `page.tsx` | Live coding |
| 30-40 นาที | ย้าย CSS เข้า `globals.css` | Live coding |
| 40-50 นาที | ตรวจ form, table และ status badge ใน browser | Debug walkthrough |
| 50-60 นาที | สรุปสิ่งที่ทำ | ทำทีละขั้นตอน |

---

# Slide 1: Recap จากชั่วโมงที่ 1

## ชั่วโมงที่แล้วเราทำอะไร

- สร้าง Next.js project
- รัน development server ด้วย `npm run dev`
- เข้าใจไฟล์พื้นฐาน:
  - `src/app/page.tsx`
  - `src/app/layout.tsx`
  - `src/app/globals.css`
  - `package.json`
- แก้หน้าแรกเล็กน้อย

## คำถามทบทวน

1. `page.tsx` คืออะไร
2. `layout.tsx` ใช้ทำอะไร
3. `globals.css` อยู่ตรงไหน
4. TSX ต่างจาก HTML ตรงไหนบ้าง

## Key Message

ชั่วโมงนี้เราจะเอางาน Day 1 ที่เป็น static HTML/CSS มาอยู่ใน Next.js project จริง

---

# Slide 2: เป้าหมายของการ Convert

## จาก Day 1

```text
index.html
styles.css
```

## ไปเป็น Day 2

```text
src/
  app/
  page.tsx
  globals.css
```

## สิ่งที่จะย้าย

- Header
- คำอธิบายระบบ
- Form แจ้งปัญหา
- Issue list table
- Status badge
- Footer
- CSS layout และ form styling

## Key Message

เรายังไม่ได้ทำให้ข้อมูล dynamic ในชั่วโมงนี้ เป้าหมายคือย้าย static prototype ให้รันอยู่ใน Next.js ก่อน

---

# Slide 3: ทำไมต้องย้ายทีละขั้น

## ถ้าย้ายทั้งหมดพร้อมกัน

ผู้เรียนจะเจอหลายเรื่องพร้อมกัน:

- Next.js
- React/TSX
- TypeScript
- Component
- Data model
- Tailwind
- Routing

## วิธีที่ใช้ในคอร์สนี้

```text
Hour 1: สร้าง Next.js project
Hour 2: ย้าย static HTML/CSS เข้า Next.js
Hour 3: เปลี่ยน static data เป็น TypeScript data model
Hour 4: แยก component และเริ่ม routing
```

## Key Message

เราแยกขั้นตอนเพื่อให้เห็นว่าแต่ละเทคโนโลยีเข้ามาช่วยตรงไหน

---

# Slide 4: HTML กับ TSX ต่างกันตรงไหน

## 1. `class` เปลี่ยนเป็น `className`

HTML:

```html
<section class="panel">
```

TSX:

```tsx
<section className="panel">
```

## 2. `for` ใน label เปลี่ยนเป็น `htmlFor`

HTML:

```html
<label for="title">หัวข้อปัญหา</label>
```

TSX:

```tsx
<label htmlFor="title">หัวข้อปัญหา</label>
```

## 3. Tag ที่ไม่มี closing tag ต้องปิดด้วย `/`

HTML:

```html
<input id="title" name="title" type="text">
```

TSX:

```tsx
<input id="title" name="title" type="text" />
```

---

# Slide 5: Comment ใน HTML กับ TSX

## HTML comment

```html
<!-- form will be here -->
```

## TSX comment

```tsx
{/* form will be here */}
```

## ตัวอย่าง

```tsx
export default function HomePage() {
  return (
  <main>
    {/* Issue form */}
    <section>
      <h2>แจ้งปัญหาใหม่</h2>
    </section>
  </main>
  );
}
```

## Speaker Notes

นี่เป็น error ที่ผู้เรียนเจอบ่อยมากเวลา copy HTML เข้า TSX โดยตรง

---

# Slide 6: เริ่มจากโครงหน้าใน `page.tsx`

## เปิดไฟล์

```text
src/app/page.tsx
```

## ตำแหน่งที่วาง

แทนที่ code เดิมทั้งหมดใน `src/app/page.tsx` ด้วยโครงนี้ก่อน เพื่อให้ทุกคนเริ่มจากไฟล์เดียวกัน

## โครงเริ่มต้น

```tsx
export default function HomePage() {
  return (
  <>
    <header>
      <h1>ระบบแจ้งปัญหา IT</h1>
      <p>แจ้งและติดตามปัญหาการใช้งานระบบภายใน</p>
    </header>

    <main>
      <section>
        <h2>แจ้งปัญหาใหม่</h2>
      </section>
    </main>

    <footer>
      <p>ฝ่ายเทคโนโลยีสารสนเทศ</p>
    </footer>
  </>
  );
}
```

## อธิบาย

`<>...</>` เรียกว่า Fragment ใช้ครอบหลาย element โดยไม่สร้าง tag เพิ่มใน DOM

---

# Slide 7: ย้าย Issue Form เข้า TSX

## File

```text
src/app/page.tsx
```

## ตำแหน่งที่วาง

วาง code นี้ไว้ใน `<section>` ที่มีหัวข้อ `แจ้งปัญหาใหม่` โดยวางต่อจากบรรทัด:

```tsx
<h2>แจ้งปัญหาใหม่</h2>
```

ดังนั้นโครงใน `section` จะเป็น:

```tsx
<section>
  <h2>แจ้งปัญหาใหม่</h2>
  <form>...</form>
</section>
```

## TSX Form

```tsx
<form>
  <fieldset>
  <legend>ข้อมูลปัญหา</legend>

  <div className="form-row">
    <div className="form-group">
      <label htmlFor="reporterName">ชื่อผู้แจ้ง</label>
      <input id="reporterName" name="reporterName" type="text" required />
    </div>

    <div className="form-group">
      <label htmlFor="reporterEmail">อีเมลผู้แจ้ง</label>
      <input id="reporterEmail" name="reporterEmail" type="email" required />
    </div>
  </div>

  <div className="form-group">
    <label htmlFor="title">หัวข้อปัญหา</label>
    <input id="title" name="title" type="text" required />
  </div>

  <div className="form-group">
    <label htmlFor="description">รายละเอียดปัญหา</label>
    <textarea id="description" name="description" rows={5} required />
  </div>

  <button type="submit">ส่งข้อมูล</button>
  </fieldset>
</form>
```

## จุดที่เปลี่ยนจาก HTML

- `class` เป็น `className`
- `for` เป็น `htmlFor`
- `rows="5"` เป็น `rows={5}`
- `input` และ `textarea` ปิดด้วย `/`

## Key Message

Slide นี้ย้าย form จาก Day 1 เข้ามาเป็น TSX โดยใช้ field ชุดเดียวกัน: `reporterName`, `reporterEmail`, `title`, `description`

---

# Slide 8: ตรวจ Form หลังย้าย Field ครบ

## File

```text
src/app/page.tsx
```

## สิ่งที่ควรมีใน `<form>`

หลัง Slide 7 form ควรมี field หลักเท่านี้:

```text
reporterName
reporterEmail
title
description
```

## Key Message

ชั่วโมงนี้ form ยังไม่ submit ไป backend แต่เราเตรียม `name` ของ field หลักให้ตรงกับ Day 1 และพร้อมใช้ต่อในวัน CRUD

---

# Slide 9: ย้าย Issue List Table เข้า TSX

## File

```text
src/app/page.tsx
```

## ตำแหน่งที่วาง

วาง `<section aria-labelledby="issue-list-title">...</section>` เป็น section ใหม่ใน `<main>` โดยวางต่อจาก section ของ form:

```tsx
<main>
  <section>
  <h2>แจ้งปัญหาใหม่</h2>
  <form>...</form>
  </section>

  <section aria-labelledby="issue-list-title">
  ...
  </section>
</main>
```

```tsx
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
      </tr>
    </thead>
    <tbody>{/* static rows */}</tbody>
  </table>
  </div>
</section>
```

## จุดสำคัญ

ตอนนี้ table ยังใช้ static rows ก่อน ชั่วโมงถัดไปเราจะใช้ `issues.map()`

---

# Slide 10: Status Badge ใน TSX Table

## File

```text
src/app/page.tsx
```

## วางใน `<td>` ของ column สถานะ

แทนที่ comment นี้ใน `<tbody>` จาก Slide 10:

```tsx
<tbody>{/* static rows */}</tbody>
```

ด้วย `<tbody>` ที่มี `<tr>` อย่างน้อย 1 แถว ตัวอย่าง badge ต้องอยู่ใน `<td>` ของ column `สถานะ`

```tsx
<tr>
  <td>#001</td>
  <td>Login เข้าระบบไม่ได้</td>
  <td>Anan</td>
  <td>
  <span className="status status-open">OPEN</span>
  </td>
</tr>
```

## ตัวอย่างหลายสถานะ

```tsx
<span className="status status-open">OPEN</span>
<span className="status status-progress">IN_PROGRESS</span>
<span className="status status-done">DONE</span>
```

## Key Message

ใน TSX ใช้ `className` เหมือน element อื่น ๆ และยังวาง badge ใน `<td>` เหมือน HTML table เดิม

---

# Slide 11: ย้าย CSS เข้า `globals.css`

## จาก Day 1

```text
styles.css
```

## ใน Next.js

```text
src/app/globals.css
```

## ตำแหน่งที่วาง

เปิด `src/app/globals.css` แล้ววาง CSS จาก Day 1 ต่อจาก Tailwind import หรือ CSS reset ที่มีอยู่เดิม เช่น:

```css
@import "tailwindcss";

/* วาง CSS เดิมจาก Day 1 ต่อจากบรรทัดนี้ */
```

## สิ่งที่ทำ

นำ CSS เดิมที่ใช้กับ:

- `body`
- `header`
- `main`
- `section`
- `.form-group`
- `.form-row`
- `input`, `textarea`
- `button`
- `.table-wrapper`
- `table`
- `.status`

ไปวางใน `globals.css`

---

# Slide 12: CSS สำหรับ Section Spacing

## File

```text
src/app/globals.css
```

## ตำแหน่งที่วาง

วางต่อท้ายไฟล์ `globals.css` หลัง CSS ของ form และ table เพื่อเพิ่มระยะห่างระหว่าง form section กับ issue list section

```css
section + section {
  margin-top: 24px;
}
```

## Speaker Notes

ใช้ `section + section` เพื่อเพิ่มระยะห่างระหว่าง section ที่อยู่ติดกัน เช่น form section กับ issue list section

---

# Slide 13: ตรวจ `layout.tsx`

## File

```text
src/app/layout.tsx
```

## ตำแหน่งที่แก้

แก้เฉพาะ attribute ของ `<html>` จากค่าเดิม เช่น `lang="en"` ให้เป็น `lang="th"` ไม่ต้องย้าย code ส่วนอื่น

## ตั้งภาษาเป็นไทย

```tsx
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
  <html lang="th">
    <body>{children}</body>
  </html>
  );
}
```

## ทำไมสำคัญ

- ช่วย browser เข้าใจภาษาหลักของหน้า
- ช่วย accessibility tool
- ทำให้ต่อยอดเรื่อง SEO/metadata ได้ถูกขึ้น

---

# Slide 14: ตรวจใน Browser

## หลังแก้ไฟล์แล้วให้ตรวจ

- หน้าเว็บเปิดได้หรือไม่
- header แสดงถูกต้องหรือไม่
- form ครบทุก field หรือไม่
- label focus input ได้หรือไม่
- table แสดงรายการปัญหาหรือไม่
- status badge มีสีหรือไม่
- responsive layout ยังใช้ได้หรือไม่

## ถ้าเห็น error

ให้ดู:

- browser error overlay
- terminal ที่รัน `npm run dev`
- บรรทัดที่ Next.js แจ้ง

---

# Slide 15: Common Errors ตอน Convert HTML เป็น TSX

## ข้อผิดพลาดที่พบบ่อย

- ใช้ `class` แทน `className`
- ใช้ `for` แทน `htmlFor`
- ลืมปิด `<input />`
- ใช้ HTML comment `<!-- -->` ใน TSX
- return หลาย element โดยไม่ครอบด้วย fragment หรือ parent element
- copy CSS ไปผิดไฟล์
- class ใน TSX กับ CSS สะกดไม่ตรงกัน

## Key Message

ส่วนใหญ่ไม่ใช่ปัญหาใหญ่ อ่าน error แล้วแก้ทีละจุดได้

---

# Slide 16: Convert หน้า Day 1 เข้า Next.js

## ขั้นตอน

ใน Next.js project:

1. เปิด `src/app/page.tsx`
2. ย้าย header จาก Day 1 เข้า TSX
3. ย้าย form แจ้งปัญหาเข้า TSX
4. ย้าย issue list table เข้า TSX
5. เปลี่ยน `class` เป็น `className`
6. เปลี่ยน `for` เป็น `htmlFor`
7. ย้าย CSS เข้า `src/app/globals.css`
8. เปิด browser เพื่อตรวจผล

## ผลลัพธ์

Next.js app แสดงหน้าใกล้เคียงกับ static prototype จาก Day 1

---

# Slide 17: โค้ดสุดท้ายของ `src/app/page.tsx` หลัง Convert

## File

```text
src/app/page.tsx
```

## ตำแหน่งที่ใช้

ใช้โค้ดนี้เป็นภาพรวมหลังย้าย header, form และ issue list จาก Day 1 เข้า Next.js ครบแล้ว

```tsx
export default function HomePage() {
  return (
  <>
    <header>
      <h1>ระบบแจ้งปัญหา IT</h1>
      <p>แจ้งและติดตามปัญหาการใช้งานระบบภายใน</p>
    </header>

    <main>
      <section>
        <h2>แจ้งปัญหาใหม่</h2>

        <form>
          <fieldset>
            <legend>ข้อมูลปัญหา</legend>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="reporterName">ชื่อผู้แจ้ง</label>
                <input id="reporterName" name="reporterName" type="text" required />
              </div>

              <div className="form-group">
                <label htmlFor="reporterEmail">อีเมลผู้แจ้ง</label>
                <input id="reporterEmail" name="reporterEmail" type="email" required />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="title">หัวข้อปัญหา</label>
              <input id="title" name="title" type="text" required />
            </div>

            <div className="form-group">
              <label htmlFor="description">รายละเอียดปัญหา</label>
              <textarea id="description" name="description" rows={5} required />
            </div>

            <button type="submit">ส่งข้อมูล</button>
          </fieldset>
        </form>
      </section>

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
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>#001</td>
                <td>Login เข้าระบบไม่ได้</td>
                <td>Anan</td>
                <td><span className="status status-open">OPEN</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </main>

    <footer>
      <p>ฝ่ายเทคโนโลยีสารสนเทศ</p>
    </footer>
  </>
  );
}
```

---

# Slide 18: ตรวจผลลัพธ์ก่อนจบชั่วโมง

## หน้า Next.js ควรมี

- Header
- Form แจ้งปัญหา
- Reporter name field
- Reporter email field
- Issue list table
- Status badge
- Footer
- CSS layout จาก Day 1

## สิ่งที่ยังไม่ทำ

- ยังไม่ submit form
- ยังไม่มี state
- ยังไม่มี TypeScript issue model
- ยังไม่มี database

## Key Message

นี่คือ static prototype ที่ย้ายมาอยู่ใน Next.js แล้ว พร้อมเปลี่ยนเป็น data-driven UI ในชั่วโมงถัดไป

---

# Slide 19: Preview ชั่วโมงถัดไป

## ชั่วโมงที่ 3 เราจะทำอะไร

เราจะเปลี่ยน table จาก static rows:

```tsx
<tr>
  <td>#001</td>
  <td>Login เข้าระบบไม่ได้</td>
  <td>Anan</td>
  <td><span className="status status-open">OPEN</span></td>
</tr>
```

ให้เป็นข้อมูลแบบ TypeScript:

```ts
const issues: Issue[] = [
  {
  id: "001",
  reporterName: "Anan",
  reporterEmail: "anan@example.com",
  title: "Login เข้าระบบไม่ได้",
  status: "OPEN",
  },
];
```

แล้ว render ด้วย:

```tsx
issues.map((issue) => ...)
```

---

# Slide 20: Recap ชั่วโมงที่สองของ Day 2

## สิ่งที่ได้เรียน

- Static HTML จาก Day 1 สามารถย้ายเป็น TSX ได้
- ใน TSX ใช้ `className` แทน `class`
- ใน TSX ใช้ `htmlFor` แทน `for`
- Tag เช่น `input` ต้องปิดด้วย `/`
- CSS จาก `styles.css` ย้ายเข้า `globals.css`
- ตอนนี้ prototype ของเราอยู่ใน Next.js แล้ว

## ต่อไป

เราจะเริ่มใช้ TypeScript data model เพื่อทำให้ issue list ไม่ใช่ static table อีกต่อไป

---


---

# คำศัพท์สำคัญ

| คำศัพท์ | ความหมาย |
|---|---|
| Convert | การแปลงจากรูปแบบหนึ่งไปอีกรูปแบบหนึ่ง |
| TSX | JSX ที่ใช้ร่วมกับ TypeScript |
| `className` | attribute ใน TSX ที่ใช้แทน `class` |
| `htmlFor` | attribute ใน TSX ที่ใช้แทน `for` ของ label |
| Fragment | ตัวครอบ JSX หลาย element โดยไม่สร้าง tag เพิ่ม |
| `globals.css` | ไฟล์ CSS กลางของ Next.js app |
| Static row | แถวข้อมูลที่เขียนค้างไว้ใน UI โดยตรง |
| Data-driven UI | UI ที่สร้างจากข้อมูล เช่น array หรือ database |














