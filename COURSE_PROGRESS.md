# Course Progress

ไฟล์นี้บันทึกสถานะล่าสุดของหลักสูตร เพื่อให้ผู้สอนและ AI เริ่มงานรอบถัดไปจากบริบทเดียวกัน

## ลำดับการทำงานปัจจุบัน

1. ตรวจ Day 1 ถึง Day 4 รอบถัดไปตามลำดับการเรียนจริง
2. ตรวจ dependency ย้อนจาก Day 5 ให้ทุกขั้นนำไปสู่ Project สุดท้าย
3. ตรวจความต่อเนื่องทั้งหลักสูตรตั้งแต่เริ่ม Project จนถึง Deploy และ Security

## สถานะเนื้อหา

| Day | สถานะ | หมายเหตุ |
|---|---|---|
| Day 1 | ปรับครบแล้ว รอตรวจร่วมกัน | Hour 1-4 ใช้ flow จากภาพรวมระบบ ไปสู่ HTML Form, CSS, Static Issue List และ Git/GitHub; ใช้ badge `ลงมือทำ` ขนาดเล็กเฉพาะ slide ที่ให้แก้ code หรือรันคำสั่ง พร้อมชี้ไฟล์และตำแหน่งให้ชัด; Hour 4 เหลือ 15 slides โดย Form/List ยังเป็น Static Prototype |
| Day 2 | ปรับครบแล้ว รอตรวจร่วมกัน | Hour 1-2 มี Hour ละ 15 slides, Hour 3 มี 16 slides และ Hour 4 มี 24 slides; สร้าง Next.js 16 แบบ root-level `app/`, ย้าย Static TSX และ Custom CSS, สร้าง `Issue` และ `.map()`, แล้วแยก `types`, `data`, Components, Routes และหน้า Not Found โดยยังไม่เปิด Tailwind |
| Day 3 | ปรับตามกฎ Slide Budget & Clarity แล้ว รอตรวจร่วมกัน | Hour 1-4 มี 17, 15, 20 และ 13 slides; ตัดทฤษฎีที่ติดกันแล้วย้ายคำอธิบาย Class ไปไว้ตอนที่ใช้จริง; ตรวจที่ 1366x768 แล้วไม่มีหน้าล้นจอ (กล่องโค้ดแสดงได้ราว 11 บรรทัด); เปลี่ยนชื่อ `createIssueFormInput` เป็น `createIssueFromInput` รวมถึงใน Day 4 |
| Day 4 | ปรับตามกฎ Slide Budget & Clarity แล้ว รอตรวจร่วมกัน | Hour 1-4 มี 14, 16, 16 และ 14 slides; ทุกขั้นลงมือทำมี badge และ `CodeChange`; แก้ `IssueForm`/`IssueList` เป็นขั้นย่อยแบบ diff แทนโค้ดเต็มไฟล์; ตัด `admin_comment` และ `updatedAt` ที่ไม่ได้ใช้ใน UI; ลบ `IssueBoard` และ `data/issue.ts` ท้าย Hour 2 หลังทุกหน้าอ่าน Supabase |
| Day 5 | ปรับตามกฎ Slide Budget & Clarity แล้ว รอตรวจร่วมกัน | Hour 1-4 มี 12, 13, 20 และ 9 slides; เปลี่ยน callout `review`/`concept`/`check` เป็นข้อความปกติ และใช้ badge `ลงมือทำ` แบบ inline; แบ่งโค้ด Setup (`server.ts`, Proxy) เป็นขั้นย่อย; ตัด `LoginForm` (หน้า `/login` ใส่ฟอร์มเอง); `AppNav` ใช้ Class เมนูของ Day 3 และข้อความไทย; Hour 4 เป็นการทบทวนล้วนตามที่ออกแบบไว้ |

## สถานะ Project เมื่อจบ Day 4

- ใช้ Next.js App Router และโครงสร้าง root-level เช่น `app/`, `components/`, `lib/`, `types/`
- `/` เป็นหน้า Home แบบง่าย มีลิงก์ไป `/issues`
- `/issues` อ่านรายการจริงจาก Supabase
- `/issues/[id]` อ่านรายละเอียดจริงจาก Supabase
- `/issues/new` สร้าง issue ผ่าน Server Action
- การเปลี่ยน status ใช้ Server Action และบันทึก `updated_at`
- ปิด issue ด้วย status `DONE` แทนการลบ row
- ไม่มี status filter ใน flow ปัจจุบัน
- ลบ `IssueBoard` และ `data/issue.ts` ท้าย Hour 2 หลังทุกหน้าอ่านข้อมูลจาก Supabase
- Table `issues` มี 8 Columns ไม่มี `admin_comment`; Type `Issue` ไม่มี `updatedAt` (`updated_at` ใช้ใน Database เท่านั้น) แต่ `adminComment?` จาก Day 2 ยังค้างอยู่ใน Type
- `IssueList` เป็น Server Component แสดงคอลัมน์จัดการเสมอ แล้ว Day 5 เพิ่ม `canManage`
- Environment Variables ใช้ `NEXT_PUBLIC_SUPABASE_URL` และ `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`
- Deploy ไป Vercel หลัง production build ผ่าน

## หลักในการตรวจรอบถัดไป

- ใช้กฎ Slide Budget & Clarity ใน `AGENTS.md` กับ Day 1-2 ต่อ; ที่ 1366x768 กล่องโค้ดใน slide mode แสดงได้ราว 14 บรรทัด (นับบรรทัดว่างด้วย; `.slide-prose pre` สูง `min(52svh, 25rem)` ตัวอักษรราว 18px) ถ้าเกินให้แยก slide; Day 1-2 ยังมี slide ที่ล้นจอหรือกล่องโค้ดต้องเลื่อน 13 หน้า (เช่น Day 1 Hour 4 Slide 8, Day 2 Hour 2 Slide 6) ส่วน Day 3-5 ไม่ล้น
- slide mode เปิดใน `npm run dev` ได้แล้ว; ห้ามรัน `npm run build` ระหว่างที่ dev server เปิดอยู่ เพราะใช้ `.next` ร่วมกันแล้ว CSS จะค้างเป็นเวอร์ชันเก่า ถ้าเกิดขึ้นให้หยุด dev server แล้วรัน `rm -rf .next && npm run dev`
- ทุก step ต้องนำไปสู่สถานะ project เมื่อจบ Day 4 และ Day 5
- ลบ feature หรือ abstraction ที่สร้างแล้วไม่ได้ใช้ใน flow สุดท้าย
- ห้ามให้ path สลับระหว่าง `src/` กับ root-level folders
- เมื่อเพิ่ม field ใน type ให้ตรวจ mock data, form และ component ที่สร้าง object นั้นทั้งหมด
- แยกให้ชัดว่าแต่ละ code block เป็น code ใหม่, code ที่แก้ หรือ code สำหรับแทนทั้งไฟล์
- ลด slide สรุป โค้ดซ้ำ และเนื้อหาที่ไม่ได้ช่วยให้นักศึกษาทำ project ต่อได้

## วิธีอัปเดตไฟล์นี้

อัปเดตเมื่อจบ Day, เปลี่ยน architecture, เพิ่มหรือลบ feature สำคัญ หรือเปลี่ยนลำดับงานรอบถัดไป ไม่ต้องบันทึกการแก้ข้อความเล็กน้อยในแต่ละ slide
