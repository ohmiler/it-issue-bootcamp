  Day 1 - ชั่วโมงที่ 3: CSS Foundation and Responsive Form Layout

## เป้าหมายของชั่วโมงนี้

หลังจบชั่วโมงที่สาม ผู้เรียนควรสามารถ:

1. เข้าใจว่า CSS ทำหน้าที่อะไรในหน้าเว็บ
2. ใช้ selector พื้นฐานเพื่อเลือก element ที่ต้องการตกแต่งได้
3. เข้าใจ box model ได้แก่ content, padding, border และ margin
4. จัด layout หน้าเว็บด้วย Flexbox หรือ Grid ในระดับพื้นฐานได้
5. ตกแต่ง form ให้ใช้งานง่ายและอ่านง่ายขึ้น
6. ทำ responsive layout เบื้องต้นสำหรับ mobile และ desktop ได้
7. เข้าใจ state สำคัญของ UI เช่น hover, focus และ disabled

## ไฟล์ที่ใช้ในชั่วโมงนี้

CSS ทั้งหมดใส่ใน:

```text
style.css
```

HTML ที่ต้องเพิ่ม class เช่น `form-group` หรือ `form-row` อยู่ใน:

```text
index.html
```

ถ้า slide เป็น CSS ให้ระบุ:

```text
File: style.css
```

---

  โครงสร้างเวลา 60 นาที

| เวลา | หัวข้อ | รูปแบบ |
|---|---|---|
| 0-5 นาที | Recap HTML จากชั่วโมงที่สอง | ถามตอบ |
| 5-15 นาที | CSS คืออะไร และเชื่อมกับ HTML อย่างไร | Explain + demo |
| 15-25 นาที | Selector และ cascade | Live coding |
| 25-35 นาที | Box model และ spacing | Visual explanation |
| 35-45 นาที | Form styling และ UI states | Live coding |
| 45-55 นาที | Responsive layout | Live coding |
| 55-60 นาที | สรุปสิ่งที่ทำ | ทำทีละขั้นตอน |

---

# Slide 1: Recap จากชั่วโมงที่สอง

## คำถามทบทวน

1. HTML ทำหน้าที่อะไร
2. Semantic HTML คืออะไร
3. ทำไม input ควรมี label
4. `id` กับ `name` ต่างกันอย่างไร
5. Form เกี่ยวข้องกับ web application อย่างไร

## Key Message

ชั่วโมงที่แล้วเราได้โครงสร้างของหน้าแจ้งปัญหาแล้ว ชั่วโมงนี้เราจะทำให้หน้าเว็บอ่านง่าย ใช้งานง่าย และรองรับหลายขนาดหน้าจอ

---

# Slide 2: CSS คืออะไร

## CSS ย่อมาจาก

**Cascading Style Sheets**

## CSS ทำหน้าที่อะไร

CSS ใช้กำหนดหน้าตาและการจัดวางของ HTML เช่น:

- สี
- ขนาดตัวอักษร
- ระยะห่าง
- เส้นขอบ
- layout
- responsive design
- hover และ focus state

## Key Message

HTML บอกว่าแต่ละส่วนคืออะไร ส่วน CSS บอกว่าแต่ละส่วนควรแสดงผลอย่างไร

---

# Slide 3: HTML, CSS, TypeScript แบ่งหน้าที่กันอีกครั้ง

```text
HTML       -> โครงสร้าง
CSS        -> หน้าตาและ layout
TypeScript -> logic และข้อมูล
```

## ตัวอย่างระบบแจ้งปัญหา IT

- HTML สร้าง form
- CSS ทำให้ form เป็นระเบียบและใช้งานง่าย
- TypeScript ในวันถัดไปจะช่วยจัดการชนิดข้อมูลและ logic

## Speaker Notes

เน้นว่าหน้าเว็บที่มี HTML ถูกต้องแต่ไม่มี CSS อาจใช้งานได้ แต่ประสบการณ์ผู้ใช้อาจไม่ดี โดยเฉพาะระบบที่ต้องให้เจ้าหน้าที่ใช้งานซ้ำทุกวัน

---

# Slide 4: วิธีเชื่อม CSS กับ HTML

## วิธีที่แนะนำสำหรับวันนี้

สร้างไฟล์ `style.css` แล้วเชื่อมใน `<head>`

## File

```text
index.html
```

## ตำแหน่งที่วาง

วาง `<link>` นี้ใน `<head>` ต่อจาก `<title>` หรือก่อน `</head>`

```html
<link rel="stylesheet" href="style.css" />
```

## ตัวอย่างโครงไฟล์

```text
project/
  index.html
  style.css
```

## ตัวอย่าง CSS แรก

## File

```text
style.css
```

## ตำแหน่งที่วาง

สร้างไฟล์ `style.css` ไว้ระดับเดียวกับ `index.html` แล้วเริ่มวาง CSS จากบรรทัดแรกของไฟล์

```css
body {
  font-family: Arial, sans-serif;
  background: #f6f7fb;
  color: #1f2937;
}
```

## Speaker Notes

บอกผู้เรียนว่ามี inline style และ internal style เช่นกัน แต่ในการทำงานจริงควรแยก CSS เป็นไฟล์เพื่อดูแลได้ง่ายกว่า

---

# Slide 5: CSS Rule ประกอบด้วยอะไร

```css
selector {
  property: value;
}
```

## ตัวอย่าง

```css
h1 {
  color: #0f172a;
  font-size: 32px;
}
```

## อธิบาย

- `h1` คือ selector
- `color` คือ property
- `#0f172a` คือ value
- `{}` คือ block ของ style

## Key Message

CSS คือการเลือก element แล้วกำหนดว่าอยากให้ element นั้นแสดงผลอย่างไร

---

# Slide 6: Selector พื้นฐาน

| Selector | ความหมาย | ตัวอย่าง |
|---|---|---|
| `h1` | เลือก tag | `h1 {}` |
| `.card` | เลือก class | `.card {}` |
| `#title` | เลือก id | `#title {}` |
| `input[type="text"]` | เลือก attribute | `input[type="text"] {}` |
| `form button` | เลือกลูกหลาน | `form button {}` |

## ตัวอย่าง

```css
.form-group {
  margin-bottom: 16px;
}

#title {
  border-color: #2563eb;
}
```

## Speaker Notes

แนะนำว่าในการทำงานจริงควรใช้ class เป็นหลัก เพราะยืดหยุ่นและ reuse ได้ดีกว่า id

---

# Slide 7: Class ใช้จัดกลุ่ม Style

## HTML

```html
<div class="form-group">
  <label for="title">หัวข้อปัญหา</label>
  <input id="title" name="title" type="text" required />
</div>
```

## CSS

```css
.form-group {
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-bottom: 16px;
}
```

## Key Message

Class ช่วยให้เราตั้งชื่อส่วนของ UI และนำ style กลับมาใช้ซ้ำได้

---

# Slide 8: ตั้ง Class ให้พร้อมย้ายไป Next.js

## ทำไมต้องตั้งชื่อ class ให้ดี

ใน Day 2 เราจะย้าย HTML/CSS จาก prototype เข้า Next.js ตาม flow นี้:

<TeachingFlowDiagram variant="class-migration-flow" />

ถ้าชื่อ class วันนี้ชัดเจน พรุ่งนี้จะย้ายง่ายขึ้น เพราะชื่อเดิมจะกลายเป็นขอบเขตของ component และ state

## Key Message

CSS class วันนี้ไม่ใช่แค่ทำให้เว็บสวย แต่เป็นชื่อชิ้นส่วน UI ที่จะถูกย้ายไปเป็น component ใน Day 2

---

# Slide 9: Cascade และ Specificity แบบเข้าใจง่าย

## Cascade คืออะไร

ถ้ามี CSS หลายกฎที่กระทบ element เดียวกัน browser จะตัดสินว่ากฎไหนชนะ

## ตัวอย่าง

```css
button {
  background: gray;
}

.primary-button {
  background: blue;
}
```

ถ้า button มี class `primary-button` สีพื้นจะเป็น blue

## หลักจำง่าย

- style ที่เจาะจงกว่ามักชนะ
- style ที่อยู่หลังอาจชนะถ้าความเจาะจงเท่ากัน
- อย่าใช้ selector ซับซ้อนเกินจำเป็น
- หลีกเลี่ยง `!important` ในช่วงเริ่มต้น

---

# Slide 10: Box Model

ทุก element ในหน้าเว็บมีลักษณะเหมือนกล่อง

<BoxModelDiagram />

## ความหมาย

- Content คือเนื้อหาจริง เช่น text หรือ input
- Padding คือระยะห่างด้านในกล่อง
- Border คือเส้นขอบ
- Margin คือระยะห่างด้านนอกกล่อง

## ตัวอย่าง

```css
.panel {
  padding: 24px;
  border: 1px solid #d1d5db;
  margin: 24px 0;
}
```

---

# Slide 11: ใช้ `box-sizing: border-box`

## ปัญหาที่พบบ่อย

ถ้ากำหนด width แล้วเพิ่ม padding หรือ border ขนาดจริงของ element อาจใหญ่กว่าที่คิด

## วิธีตั้งค่าพื้นฐาน

```css
* {
  box-sizing: border-box;
}
```

## Key Message

ตั้ง `box-sizing: border-box` ไว้ตั้งแต่ต้น ช่วยให้คำนวณขนาด layout ง่ายขึ้นมาก

---

# Slide 12: เริ่มจัด Layout หน้าแจ้งปัญหา

## เป้าหมายของ layout

- เนื้อหาไม่กว้างจนอ่านยาก
- form อยู่กลางหน้า
- มีระยะห่างพอดี
- สีพื้นช่วยแยกพื้นที่
- ใช้งานได้บน mobile

## CSS ตั้งต้น

## File

```text
style.css
```

## ตำแหน่งที่วาง

วาง CSS ชุดนี้ไว้ด้านบนของ `style.css` เพราะเป็น global/base layout ของทั้งหน้า

```css
* {
  box-sizing: border-box;
}

body {
  margin: 0;
  font-family: Arial, sans-serif;
  background: #f6f7fb;
  color: #111827;
  line-height: 1.5;
}

main {
  max-width: 760px;
  margin: 0 auto;
  padding: 24px;
}
```

---

# Slide 13: Styling Header และ Section

## File

```text
style.css
```

## ตำแหน่งที่วาง

วาง CSS ชุดนี้ต่อจาก base layout ใน Slide 12

```css
header {
  background: #0f766e;
  color: white;
  padding: 32px 24px;
}

header h1 {
  margin: 0 0 8px;
  font-size: 32px;
}

header p {
  margin: 0;
  color: #ccfbf1;
}

section {
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 24px;
}
```

## Speaker Notes

ใช้สีไม่เยอะ เน้น contrast และความอ่านง่าย เพราะโจทย์เป็นระบบภายใน ไม่ใช่ landing page

---

# Slide 14: Styling Form

## HTML ที่ควรปรับให้มี class

## File

```text
index.html
```

## ตำแหน่งที่แก้

ใช้โครง `<div class="form-group">...</div>` นี้กับแต่ละ field ใน form จาก Day 1 Hour 2

```html
<div class="form-group">
  <label for="title">หัวข้อปัญหา</label>
  <input id="title" name="title" type="text" required />
</div>
```

## CSS

## File

```text
style.css
```

## ตำแหน่งที่วาง

วาง CSS ชุดนี้ต่อจาก style ของ `section`

```css
.form-group {
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-bottom: 16px;
}

label {
  font-weight: 600;
}
```

## Key Message

Form ที่ดีควรอ่าน flow การกรอกได้ง่ายจากบนลงล่าง

---

# Slide 15: Styling Input และ Textarea

## File

```text
style.css
```

## ตำแหน่งที่วาง

วางต่อจาก CSS ของ `.form-group` และ `label`

```css
input,
textarea {
  width: 100%;
  border: 1px solid #cbd5e1;
  border-radius: 6px;
  padding: 10px 12px;
  font: inherit;
  background: white;
}

textarea {
  resize: vertical;
}
```

## จุดสำคัญ

- `width: 100%` ทำให้ field กว้างเต็ม container
- `font: inherit` ทำให้ form ใช้ font เดียวกับหน้าเว็บ
- `resize: vertical` ให้ textarea ยืดเฉพาะแนวตั้ง

---

# Slide 16: Focus State สำคัญมาก

## ทำไมต้องมี focus state

ผู้ใช้ต้องรู้ว่ากำลังกรอก field ไหนอยู่ โดยเฉพาะเวลาใช้ keyboard

## File

```text
style.css
```

## ตำแหน่งที่วาง

วางต่อจาก CSS ของ `input` และ `textarea` เพื่อให้ state ของ field อยู่ใกล้กับ style หลัก

```css
input:focus,
textarea:focus {
  outline: 3px solid #99f6e4;
  border-color: #0f766e;
}
```

## Key Message

Focus state เป็นทั้งเรื่อง usability และ accessibility

---

# Slide 17: Styling Button

## File

```text
style.css
```

## ตำแหน่งที่วาง

วางต่อจาก focus state ของ form field

```css
button {
  border: 0;
  border-radius: 6px;
  padding: 12px 16px;
  font: inherit;
  font-weight: 700;
  background: #0f766e;
  color: white;
  cursor: pointer;
}

button:hover {
  background: #115e59;
}

button:disabled {
  background: #94a3b8;
  cursor: not-allowed;
}
```

## Speaker Notes

อธิบายว่า state ต่าง ๆ ช่วยให้ผู้ใช้เข้าใจว่าปุ่มกดได้ไหม กำลัง hover อยู่ไหม หรือระบบกำลังรออะไรบางอย่างอยู่

---

# Slide 18: Responsive Design คืออะไร

## Responsive Design

การออกแบบหน้าเว็บให้ใช้งานได้ดีบนหลายขนาดหน้าจอ เช่น:

- มือถือ
- tablet
- notebook
- desktop monitor

## วิธีคิดเบื้องต้น

- เริ่มจาก mobile ก่อน
- จำกัดความกว้างของเนื้อหา
- ใช้ `%`, `max-width`, `gap`
- ใช้ media query เมื่อจำเป็น

## Key Message

ระบบภายในก็ต้อง responsive เพราะผู้ใช้อาจเปิดจากมือถือเพื่อแจ้งปัญหาอย่างเร่งด่วน

---

# Slide 19: Media Query

## ตัวอย่าง

## File

```text
style.css
```

## ตำแหน่งที่วาง

วาง media query นี้ไว้ท้ายไฟล์ `style.css` เพื่อให้ override layout หลัง style พื้นฐานโหลดแล้ว

```css
@media (min-width: 720px) {
  .form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  }
}
```

## HTML

โค้ดนี้คือ field `reporterName` และ `reporterEmail` เดิมจาก Hour 2 เพียงแค่จัดให้อยู่ในกลุ่ม `form-row` เพื่อให้ CSS วางเป็น 2 คอลัมน์บน desktop

## File

```text
index.html
```

## ตำแหน่งที่แก้

ใน form เดิม ให้ครอบ field `reporterName` และ `reporterEmail` ด้วย `<div class="form-row">...</div>` โดยวางไว้เป็น field ชุดแรกใน `<fieldset>`

```html
<div class="form-row">
  <div class="form-group">
  <label for="reporterName">ชื่อผู้แจ้ง</label>
  <input id="reporterName" name="reporterName" type="text" required />
  </div>

  <div class="form-group">
  <label for="reporterEmail">อีเมลผู้แจ้ง</label>
  <input id="reporterEmail" name="reporterEmail" type="email" required />
  </div>
</div>
```

## อธิบาย

บนจอเล็ก field จะเรียงแนวตั้ง บนจอกว้างตั้งแต่ 720px ขึ้นไป field จะเรียงเป็น 2 คอลัมน์

---

# Slide 20: โค้ดสุดท้ายของ `style.css` หลังชั่วโมงนี้

## File

```text
style.css
```

## ตำแหน่งที่ใช้

ถ้าต้องการให้เริ่มเร็ว ใช้ CSS ชุดนี้แทนเนื้อหาใน `style.css` ทั้งไฟล์ได้

```css
* {
  box-sizing: border-box;
}

body {
  margin: 0;
  font-family: Arial, sans-serif;
  background: #f6f7fb;
  color: #111827;
  line-height: 1.5;
}

header {
  background: #0f766e;
  color: white;
  padding: 32px 24px;
}

main {
  max-width: 760px;
  margin: 0 auto;
  padding: 24px;
}

section {
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 24px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-bottom: 16px;
}

input,
textarea {
  width: 100%;
  border: 1px solid #cbd5e1;
  border-radius: 6px;
  padding: 10px 12px;
  font: inherit;
}

input:focus,
textarea:focus {
  outline: 3px solid #99f6e4;
  border-color: #0f766e;
}

button {
  border: 0;
  border-radius: 6px;
  padding: 12px 16px;
  font: inherit;
  font-weight: 700;
  background: #0f766e;
  color: white;
  cursor: pointer;
}

button:hover {
  background: #115e59;
}

footer {
  color: #64748b;
  font-size: 14px;
  padding: 24px;
  text-align: center;
}

footer p {
  margin: 4px 0;
}

@media (min-width: 720px) {
  .form-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;
  }
}
```

---

# Slide 21: Common Mistakes ของ CSS

## ข้อผิดพลาดที่พบบ่อย

- ลืมเชื่อมไฟล์ CSS ใน HTML
- พิมพ์ชื่อ class ใน HTML และ CSS ไม่ตรงกัน
- ตั้งชื่อ class ไม่สื่อหน้าที่ ทำให้ย้ายไป component ใน Day 2 ยาก
- ใช้ margin/padding แบบเดาสุ่มจน layout เพี้ยน
- ไม่ตั้ง `box-sizing: border-box`
- ใช้สี contrast ต่ำจนอ่านยาก
- ลืม focus state
- กำหนด width ตายตัวจนจอมือถือแตก
- ใช้ `!important` เพื่อแก้ปัญหาโดยไม่เข้าใจสาเหตุ

## Speaker Notes

แนะนำให้ debug ทีละชั้น เริ่มจากดูว่า CSS โหลดไหม จากนั้นดู selector ตรงไหม แล้วค่อยดู property

---

# Slide 22: Recap ชั่วโมงที่สาม

## สิ่งที่ได้เรียน

- CSS ใช้กำหนดหน้าตาและ layout ของ HTML
- Selector ใช้เลือก element ที่ต้องการ style
- Box model ช่วยให้เข้าใจระยะห่างและขนาดของ element
- Form styling ทำให้ระบบใช้งานง่ายขึ้น
- Hover, focus และ disabled เป็น UI state ที่สำคัญ
- Responsive design ทำให้หน้าเว็บใช้งานได้หลายขนาดหน้าจอ
- ชื่อ class ที่ดีจะช่วยให้ย้ายไป Next.js และแยก component ได้ง่ายขึ้น

## ต่อไปในชั่วโมงที่ 4

เราจะเติมส่วนแสดงรายการปัญหา ใช้ class ชุดเดียวกันกับ status badge และใช้ Git/GitHub เพื่อบันทึกงาน Day 1 ขึ้น repository



















