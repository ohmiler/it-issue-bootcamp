  Day 2 - ชั่วโมงที่ 1: From Static HTML to Next.js Project

## เป้าหมายของชั่วโมงนี้

หลังจบชั่วโมงแรกของ Day 2 ผู้เรียนควรสามารถ:

1. เข้าใจว่า Next.js คืออะไร และทำไมจึงใช้ต่อจาก HTML/CSS static prototype
2. เห็นภาพว่า `index.html` จาก Day 1 จะถูกย้ายไปเป็น `app/page.tsx`
3. สร้าง Next.js project ด้วย TypeScript ได้
4. เข้าใจโครงสร้างไฟล์พื้นฐานของ Next.js App Router
5. เปิด development server และดูหน้าเว็บใน browser ได้
6. แก้ไขหน้าแรกของ Next.js ได้เล็กน้อย
7. เข้าใจว่า HTML, CSS และ TypeScript จะเข้าไปอยู่ตรงไหนใน Next.js project

## ไฟล์ที่ใช้ในชั่วโมงนี้

คำสั่งสร้าง project ให้รันใน terminal

ไฟล์หลักที่แตะในชั่วโมงนี้:

```text
app/page.tsx
app/layout.tsx
app/globals.css
package.json
```

ถ้า slide เป็นหน้าแรก ให้ระบุ:

```text
File: app/page.tsx
```

---

  โครงสร้างเวลา 60 นาที

| เวลา | หัวข้อ | รูปแบบ |
|---|---|---|
| 0-10 นาที | Recap Day 1 และเชื่อมเข้า Next.js | Explain |
| 10-20 นาที | Next.js คืออะไร | Explain + diagram |
| 20-35 นาที | สร้าง Next.js project | Live coding |
| 35-45 นาที | อธิบาย project structure | Code walkthrough |
| 45-55 นาที | แก้หน้าแรกและรัน dev server | ทำทีละขั้นตอน |
| 55-60 นาที | Recap และเตรียมย้าย static prototype | สรุป |

---

# Slide 1: Recap จาก Day 1

## Day 1 เราสร้างอะไร

- Static HTML page
- Form สำหรับแจ้งปัญหา IT
- Static issue list
- Status badge
- CSS layout และ responsive เบื้องต้น
- GitHub repository

## สิ่งที่ Day 1 ยังไม่มี

- ข้อมูลยังเขียนอยู่ใน HTML โดยตรง
- ยังไม่มี component
- ยังไม่มี routing แบบ web application
- ยังไม่มี TypeScript data model
- ยังไม่มี backend
- ยังไม่มี database

## Key Message

Day 1 คือ static prototype ส่วน Day 2 เราจะเริ่มย้าย prototype นี้เข้า framework ที่ใช้สร้าง web application จริง

---

# Slide 2: ทำไมไม่หยุดที่ HTML/CSS

## HTML/CSS เพียงพอสำหรับ

- หน้าแนะนำหน่วยงาน
- หน้าเอกสารประกาศ
- หน้า contact
- หน้า static content

## แต่ระบบของฝ่าย IT ต้องการมากกว่านั้น

- มีหลายหน้า
- มีข้อมูลหลายรายการ
- มี form ที่ต้องบันทึกข้อมูล
- มี role user/admin
- มี login
- มี database
- มี logic เช่น filter, validate, update status

## Key Message

เมื่อเว็บเริ่มมีข้อมูลและ workflow เราควรย้ายจาก static page ไปเป็น web application

---

# Slide 3: Next.js คืออะไร

## Next.js คือ Framework สำหรับสร้าง Web Application

Next.js สร้างอยู่บน React และช่วยให้เราทำสิ่งเหล่านี้ได้ง่ายขึ้น:

- Routing
- Page layout
- Component
- Server-side rendering
- API หรือ server actions
- เชื่อมต่อ database
- Authentication
- Deployment

## ภาพจำง่าย ๆ

```text
HTML/CSS static page
  |
  v
React component
  |
  v
Next.js application
```

## Key Message

Next.js ไม่ได้มาแทน HTML/CSS แต่เอา HTML/CSS/TypeScript มาใช้ในรูปแบบที่เหมาะกับ application มากขึ้น

---

# Slide 4: จาก `index.html` ไปเป็น `page.tsx`

## Day 1

```text
index.html
style.css
```

## Day 2

```text {5}
app/
  favicon.ico
  globals.css
  layout.tsx
  page.tsx
```

## แนวคิด

```text
HTML structure เดิม -> JSX ใน app/page.tsx
CSS เดิม            -> app/globals.css ก่อน แล้วค่อยไป Tailwind ใน Day 3
ข้อมูล static       -> TypeScript array
ส่วนที่ซ้ำ          -> Component
```

## Speaker Notes

ผู้เรียนไม่จำเป็นต้องเข้าใจ React ลึกทันที แต่ต้องเห็นว่า syntax หน้าตาคล้าย HTML มาก เพียงแต่ตอนนี้เราเขียนอยู่ในไฟล์ `.tsx`

---

# Slide 5: JSX และ TSX คืออะไร

## JSX

Syntax ที่ให้เราเขียน UI คล้าย HTML ใน JavaScript

## TSX

JSX ที่ใช้ร่วมกับ TypeScript

ตัวอย่าง:

```tsx
export default function Home() {
  return (
  <main>
    <h1>ระบบแจ้งปัญหา IT</h1>
    <p>แจ้งและติดตามปัญหาการใช้งานระบบภายใน</p>
  </main>
  );
}
```

## จุดที่ต่างจาก HTML

- ใช้ `className` แทน `class`
- tag ส่วนใหญ่ยังคล้าย HTML
- ต้อง return UI จาก function
- ใช้ `{}` เพื่อแทรก JavaScript/TypeScript expression

---

# Slide 6: เตรียมสร้าง Next.js Project

## Software ที่ควรมี

- Node.js LTS
- npm
- VS Code
- Git
- Browser

## ตรวจ version

```bash
node -v
npm -v
git --version
```

---

# Slide 7: สร้าง Next.js Project

## ตำแหน่งที่รันคำสั่ง

รันใน folder ว่างที่ต้องการใช้เป็น Next.js project เช่น `it-issue-nextjs` ไม่ต้องรันใน project เดิมของ Day 1

```bash
npx create-next-app@latest
```

## Prompt ปัจจุบัน

```text {2-4}
? Would you like to use the recommended Next.js defaults?
> Yes, use recommended defaults
  TypeScript, ESLint, No React Compiler, Tailwind CSS,
  No src/ directory, App Router, AGENTS.md
  No, reuse previous settings
  No, customize settings
```

## คำแนะนำสำหรับคอร์สนี้

สำหรับ flow นี้ แนะนำเลือก:

```text
Yes, use recommended defaults
```

เพราะจะได้ TypeScript, ESLint, App Router และโครงสร้างแบบ `app/` ที่ไม่มี `src/` ตรงกับ slide ก่อนหน้า แม้ project จะมี Tailwind CSS ติดมา แต่ Day 2 ยังโฟกัส `app/page.tsx` และ `app/globals.css` ก่อน

---

# Slide 8: เข้า Project และเปิด Dev Server

## ตำแหน่งที่รันคำสั่ง

รันต่อจาก Slide 7 หลังสร้าง project เสร็จ โดยเข้าไปใน folder project ก่อน

```bash
cd it-issue-nextjs
npm run dev
```

จากนั้นเปิด browser:

```text
http://localhost:3000
```

## สิ่งที่ควรเห็น

- หน้าเริ่มต้นของ Next.js
- terminal แสดงว่า dev server ทำงานอยู่
- เมื่อแก้ code หน้าเว็บ refresh ได้

## Speaker Notes

ถ้า port 3000 ถูกใช้แล้ว Next.js อาจเสนอ port อื่น เช่น 3001 ให้ผู้เรียนดู output ใน terminal เสมอ

---

# Slide 9: โครงสร้างไฟล์หลังสร้าง Project

ตัวอย่าง:

```text
it-issue-nextjs/
  app/
    favicon.ico
    globals.css
    layout.tsx
    page.tsx
  public/
  package.json
  tsconfig.json
  next.config.ts
```

## ไฟล์ที่ควรรู้วันนี้

- `app/page.tsx`
- `app/layout.tsx`
- `app/globals.css`
- `package.json`
- `tsconfig.json`

---

# Slide 10: `page.tsx` คืออะไร

## `page.tsx`

คือไฟล์ที่สร้างหน้าเว็บของ route หนึ่ง ๆ

```text
app/page.tsx -> /
```

## ตัวอย่าง

## File

```text
app/page.tsx
```

## ตำแหน่งที่แก้

ตัวอย่างนี้คือเนื้อหาของ function หน้าแรก ไม่ใช่ code ที่ต้องเพิ่มต่อท้ายไฟล์

```tsx
export default function Home() {
  return (
  <main>
    <h1>ระบบแจ้งปัญหา IT</h1>
    <p>หน้าแรกของระบบแจ้งปัญหา</p>
  </main>
  );
}
```

## Key Message

ใน App Router ของ Next.js ไฟล์ชื่อ `page.tsx` คือหน้าที่ผู้ใช้เปิดดูได้

---

# Slide 11: `layout.tsx` คืออะไร

## `layout.tsx`

คือไฟล์ที่เป็นกรอบร่วมของหน้าเว็บ

คิดภาพง่าย ๆ:

- `page.tsx` คือเนื้อหาของหน้า
- `layout.tsx` คือกรอบที่ครอบเนื้อหานั้น
- `children` คือจุดที่ Next.js เอาเนื้อหาจาก `page.tsx` มาใส่

## File

```text
app/layout.tsx
```

## ส่วนที่ควรสังเกต

ใน `app/layout.tsx` ให้ดู function `RootLayout` เป็นหลัก โค้ดนี้คือโครงเดิมที่ Next.js สร้างมาให้ ใช้เพื่อดูว่า layout ครอบ page อย่างไร

```tsx
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
```

## ใช้ทำอะไร

- `<html>` ตั้งค่าพื้นฐานของทั้ง application
- `<body>` เป็นพื้นที่หลักของหน้าเว็บ
- `{children}` คือเนื้อหาจาก `page.tsx` ที่ถูกนำมาแสดง
- ส่วนที่ใช้ร่วมกันทุกหน้า เช่น font, layout หรือ navigation มักวางที่นี่

## Speaker Notes

อธิบายด้วยภาพ mental model: `layout.tsx` เหมือนกรอบบ้าน ส่วน `page.tsx` คือของที่อยู่ข้างในบ้าน ยังไม่ต้องลงรายละเอียด TypeScript ลึก บอกแค่ว่า `React.ReactNode` คือชนิดข้อมูลของสิ่งที่ React render ได้

---

# Slide 12: `globals.css` คืออะไร

## `globals.css`

คือไฟล์ CSS กลางของทั้ง application

## File

```text
app/globals.css
```

## ภาพรวม

เมื่อสร้าง project แบบ recommended defaults ไฟล์นี้จะถูกสร้างมาให้แล้ว และถูก import จาก `app/layout.tsx`

## ตัวอย่างจาก create-next-app ปัจจุบัน

```css
@import "tailwindcss";

:root {
  --background: #ffffff;
  --foreground: #171717;
}

@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --font-sans: var(--font-geist-sans);
  --font-mono: var(--font-geist-mono);
}

@media (prefers-color-scheme: dark) {
  :root {
    --background: #0a0a0a;
    --foreground: #ededed;
  }
}

body {
  background: var(--background);
  color: var(--foreground);
  font-family: Arial, Helvetica, sans-serif;
}
```

## อ่านไฟล์นี้อย่างไร

- `@import "tailwindcss";` เปิดให้ใช้ Tailwind class ได้
- `:root` เก็บค่าสีกลางของเว็บ เช่น background และ foreground
- `@theme inline` เชื่อมค่า CSS variables ให้ Tailwind ใช้ต่อได้
- `@media (prefers-color-scheme: dark)` เปลี่ยนค่าสีเมื่อเครื่องผู้ใช้เปิด dark mode
- `body` คือ style พื้นฐานที่ครอบทุกหน้า

## Key Message

ชั่วโมงนี้ให้เข้าใจก่อนว่า `globals.css` คือที่เก็บ style ระดับทั้งแอป ส่วนรายละเอียด Tailwind และ theme จะค่อยต่อยอดใน Day 3

---

# Slide 13: `package.json` คืออะไร

## `package.json`

ไฟล์ที่บอกว่า project นี้ชื่ออะไร ใช้คำสั่งอะไร และต้องติดตั้ง package อะไรบ้าง

## ตัวอย่างจาก create-next-app ปัจจุบัน

```json
{
  "name": "it-issue-nextjs",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "eslint"
  },
  "dependencies": {
    "next": "16.2.9",
    "react": "19.2.4",
    "react-dom": "19.2.4"
  },
  "devDependencies": {
    "@tailwindcss/postcss": "^4",
    "@types/node": "^20",
    "@types/react": "^19",
    "@types/react-dom": "^19",
    "eslint": "^9",
    "eslint-config-next": "16.2.9",
    "tailwindcss": "^4",
    "typescript": "^5"
  }
}
```

## อ่านไฟล์นี้อย่างไร

- `name` คือชื่อ project
- `scripts` คือคำสั่งที่เราเรียกผ่าน `npm run ...`
- `dependencies` คือ package ที่ app ต้องใช้ตอนทำงาน
- `devDependencies` คือ package ที่ช่วยตอนพัฒนา เช่น TypeScript, ESLint, Tailwind

## Key Message

เวลาเห็นคำสั่ง `npm run dev` หรือ `npm run build` ให้กลับมาดูที่ `scripts` ใน `package.json`

---

# Slide 14: แก้หน้าแรกของ Next.js

## เปิดไฟล์

```text
app/page.tsx
```

## แทนที่เนื้อหาเดิมด้วย

ใช้ code นี้แทนเนื้อหาทั้งไฟล์ `app/page.tsx` ในขั้นตอนแรก

```tsx
export default function Home() {
  return (
  <main>
    <h1>ระบบแจ้งปัญหา IT</h1>
    <p>แจ้งและติดตามปัญหาการใช้งานระบบภายใน</p>
  </main>
  );
}
```

## ตรวจใน browser

หลังบันทึกไฟล์ หน้าเว็บควรเปลี่ยนทันที

---

# Slide 15: จุดต่างสำคัญระหว่าง HTML กับ TSX

## `class` ต้องเปลี่ยนเป็น `className`

HTML:

```html
<section class="panel">
```

TSX:

```tsx
<section className="panel">
```

## Inline style เป็น object

HTML:

```html
<main style="padding: 24px;">
```

TSX:

```tsx
<main style={{ padding: "24px" }}>
```

## ต้องปิด tag ให้ครบ

```tsx
<input name="title" />
```

---

# Slide 16: โค้ดสุดท้ายของ `app/page.tsx` หลังชั่วโมงนี้

## ขั้นตอน

1. สร้าง Next.js project
2. รัน `npm run dev`
3. เปิด `http://localhost:3000`
4. แก้ `app/page.tsx`
5. เปลี่ยนหน้าแรกให้มี:
## - ชื่อระบบ
## - คำอธิบายสั้น ๆ
## - หัวข้อ “แจ้งปัญหาใหม่”
## - ข้อความ placeholder ว่าจะย้าย form จาก Day 1 มาที่นี่

## ตัวอย่าง

## File

```text
app/page.tsx
```

## ตำแหน่งที่แก้

ใช้ตัวอย่างนี้แทน function `Home` จาก Slide 14 เพื่อเพิ่ม section placeholder สำหรับ form

```tsx
export default function Home() {
  return (
  <main>
    <h1>ระบบแจ้งปัญหา IT</h1>
    <p>แจ้งและติดตามปัญหาการใช้งานระบบภายใน</p>

    <section>
      <h2>แจ้งปัญหาใหม่</h2>
      <p>เราจะย้าย form จาก Day 1 มายังส่วนนี้</p>
    </section>
  </main>
  );
}
```

---

# Slide 17: ถ้าเจอ Error ต้องดูตรงไหน

## จุดที่ควรตรวจ

- terminal ที่รัน `npm run dev`
- browser error overlay
- ชื่อไฟล์และตำแหน่งบรรทัด
- tag ปิดครบไหม
- ใช้ `class` แทน `className` หรือไม่
- return JSX ครอบด้วย element เดียวหรือไม่

## ตัวอย่างปัญหาที่พบบ่อย

```tsx
export default function Home() {
  return (
  <h1>ระบบแจ้งปัญหา IT</h1>
  <p>แจ้งปัญหา</p>
  );
}
```

ต้องครอบด้วย element เดียว:

```tsx
export default function Home() {
  return (
  <main>
    <h1>ระบบแจ้งปัญหา IT</h1>
    <p>แจ้งปัญหา</p>
  </main>
  );
}
```

---

# Slide 18: HTML/CSS/TypeScript อยู่ตรงไหนใน Next.js

```text
HTML structure -> JSX/TSX ใน page.tsx หรือ component
CSS            -> globals.css หรือ Tailwind class
TypeScript     -> type, props, function, data model
Routing        -> folder และ page.tsx
Backend logic  -> server action หรือ route handler
Database       -> Prisma หรือ database client
```

## Key Message

Next.js คือพื้นที่ที่ทุกอย่างจะมาเชื่อมกัน ไม่ใช่สิ่งที่แยกออกจาก HTML/CSS/TypeScript

---

# Slide 19: สิ่งที่จะทำในชั่วโมงถัดไป

## ชั่วโมงที่ 2

เราจะย้าย static prototype จาก Day 1 เข้า Next.js:

- Header
- Form แจ้งปัญหา
- Issue list
- Status badge
- CSS จาก `style.css` ไป `globals.css`

## เป้าหมาย

หน้า Next.js ควรมีหน้าตาใกล้เคียงกับ static page เดิม

---

# Slide 20: Recap ชั่วโมงแรกของ Day 2

## สิ่งที่ได้เรียน

- Next.js คือ framework สำหรับสร้าง web application
- Static HTML สามารถย้ายเป็น TSX ได้
- `page.tsx` คือหน้าเว็บของ route
- `layout.tsx` คือ layout หลัก
- `globals.css` คือ global style
- `package.json` เก็บ scripts ของ project
- `npm run dev` ใช้เปิด development server

## ต่อไป

เราจะ convert งาน Day 1 จาก HTML/CSS static prototype เข้า Next.js project ที่เพิ่งสร้าง

---


---

  คำศัพท์สำคัญ

| คำศัพท์ | ความหมาย |
|---|---|
| Next.js | Framework สำหรับสร้าง React web application |
| React | Library สำหรับสร้าง UI ด้วย component |
| JSX | Syntax สำหรับเขียน UI คล้าย HTML ใน JavaScript |
| TSX | JSX ที่ใช้ร่วมกับ TypeScript |
| App Router | ระบบ routing แบบ folder-based ของ Next.js |
| `page.tsx` | ไฟล์ที่สร้างหน้าเว็บของ route |
| `layout.tsx` | ไฟล์ layout ที่ครอบ page |
| `globals.css` | CSS ที่ใช้กับทั้ง application |
| Dev server | server สำหรับรัน project ระหว่างพัฒนา |


















