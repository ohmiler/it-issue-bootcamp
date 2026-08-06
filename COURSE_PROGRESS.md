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
| Day 2 | ปรับครบแล้ว รอตรวจร่วมกัน | Hour 1-3 เหลือ Hour ละ 15 slides และ Hour 4 เหลือ 18 slides; สร้าง Next.js 16 แบบ root-level `app/`, ย้าย Static TSX และ Custom CSS, สร้าง `Issue` และ `.map()`, แล้วแยก `types`, `data`, Components และ Routes โดยยังไม่เปิด Tailwind |
| Day 3 | ปรับครบแล้ว รอตรวจร่วมกัน | Hour 1-4 เรียงจาก Tailwind และ Responsive UI ไปสู่ Client Component, FormData, Validation, Mock Create และ Immutable Status Update; Hour 4 ลดเหลือ 13 slides และใช้ Optional Props เพื่อให้ `IssueList` ทำงานได้ทั้งหน้า Home และ `/issues` |
| Day 4 | ปรับครบแล้ว รอตรวจร่วมกัน | Hour 1-4 เรียงจาก Supabase Setup ไปสู่ Read, Create, Update และ Deploy; เหลือ 15, 13, 12 และ 11 slides ตามลำดับ พร้อมตัด Mock Flow ที่ไม่ใช้และระบุข้อจำกัดของ Demo RLS ก่อนเข้าสู่ Auth ใน Day 5 |
| Day 5 | ปรับครบแล้ว รอตรวจร่วมกัน | Hour 1 เหลือ 12 slides สำหรับ Auth และ Supabase SSR Setup; Hour 2 เหลือ 13 slides สำหรับ Login, Protected Page/Action และ Logout; Hour 3 มี 20 slides สำหรับเจ้าของ Issue, Profile Role, RLS และหน้า Admin; Hour 4 ลดเหลือ 9 slides แบบทบทวน Theory, Security Layers, Secret, AI Code Review และแนวทาง Debug โดยไม่เพิ่ม Feature ใหม่ |

## สถานะ Project เมื่อจบ Day 4

- ใช้ Next.js App Router และโครงสร้าง root-level เช่น `app/`, `components/`, `lib/`, `types/`
- `/` เป็นหน้า Home แบบง่าย มีลิงก์ไป `/issues`
- `/issues` อ่านรายการจริงจาก Supabase
- `/issues/[id]` อ่านรายละเอียดจริงจาก Supabase
- `/issues/new` สร้าง issue ผ่าน Server Action
- การเปลี่ยน status ใช้ Server Action และบันทึก `updated_at`
- ปิด issue ด้วย status `DONE` แทนการลบ row
- ไม่มี status filter ใน flow ปัจจุบัน
- ลบ `IssueBoard` และ `data/issue.ts` หลังย้าย Create Flow ไปใช้ Server Action แล้ว
- Environment Variables ใช้ `NEXT_PUBLIC_SUPABASE_URL` และ `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`
- Deploy ไป Vercel หลัง production build ผ่าน

## หลักในการตรวจ Day 1 ถึง Day 3 รอบถัดไป

- ทุก step ต้องนำไปสู่สถานะ project เมื่อจบ Day 4 และ Day 5
- ลบ feature หรือ abstraction ที่สร้างแล้วไม่ได้ใช้ใน flow สุดท้าย
- ห้ามให้ path สลับระหว่าง `src/` กับ root-level folders
- เมื่อเพิ่ม field ใน type ให้ตรวจ mock data, form และ component ที่สร้าง object นั้นทั้งหมด
- แยกให้ชัดว่าแต่ละ code block เป็น code ใหม่, code ที่แก้ หรือ code สำหรับแทนทั้งไฟล์
- ลด slide สรุป โค้ดซ้ำ และเนื้อหาที่ไม่ได้ช่วยให้นักศึกษาทำ project ต่อได้

## วิธีอัปเดตไฟล์นี้

อัปเดตเมื่อจบ Day, เปลี่ยน architecture, เพิ่มหรือลบ feature สำคัญ หรือเปลี่ยนลำดับงานรอบถัดไป ไม่ต้องบันทึกการแก้ข้อความเล็กน้อยในแต่ละ slide
