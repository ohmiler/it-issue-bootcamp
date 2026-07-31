# Course Progress

ไฟล์นี้บันทึกสถานะล่าสุดของหลักสูตร เพื่อให้ผู้สอนและ AI เริ่มงานรอบถัดไปจากบริบทเดียวกัน

## ลำดับการทำงานปัจจุบัน

1. ปรับและตรวจ Day 5 ให้จบก่อน
2. ย้อนตรวจ Day 1 ถึง Day 3 หลังจาก flow สุดท้ายของ Day 5 ชัดเจน
3. ตรวจความต่อเนื่องทั้งหลักสูตรตั้งแต่เริ่ม project จนถึง deploy และ security

## สถานะเนื้อหา

| Day | สถานะ | หมายเหตุ |
|---|---|---|
| Day 1 | ปรับครบแล้ว รอตรวจร่วมกัน | Hour 1-4 ใช้ flow จากภาพรวมระบบ ไปสู่ HTML Form, CSS, Static Issue List และ Git/GitHub; Hour 4 ลดเหลือ 17 slides และแก้คำอธิบายให้ชัดว่า Form/List ยังเป็น Static Prototype |
| Day 2 | ปรับครบแล้ว รอตรวจร่วมกัน | Hour 1-3 เหลือ Hour ละ 15 slides และ Hour 4 เหลือ 18 slides; สร้าง Next.js 16 แบบ root-level `app/`, ย้าย Static TSX และ Custom CSS, สร้าง `Issue` และ `.map()`, แล้วแยก `types`, `data`, Components และ Routes โดยยังไม่เปิด Tailwind |
| Day 3 | กำลังปรับใหม่ | Hour 1 เหลือ 21 slides ครอบคลุม Tailwind, Page Shell และ IssueForm; Hour 2 เหลือ 14 slides ต่อด้วย StatusBadge, IssueList, Responsive Table, Empty State และ CSS cleanup; Hour 3 เหลือ 17 slides ต่อด้วย Client Component, State, FormData, Validation และ Mock Create; Hour 4 รอตรวจต่อ |
| Day 4 | ปรับและตรวจแล้ว | Supabase, Read, Create, Update และ Deploy ใช้ flow ปัจจุบัน |
| Day 5 | ปรับครบแล้ว รอตรวจภาพรวม | Hour 1-4 ใช้ Auth แบบ SSR, USER/ADMIN, Page guard, Server Action และ RLS; Hour 4 ปิดหลักสูตรด้วย OWASP 2025, AI code review, production verification และ final demo |

## สถานะ Project เมื่อจบ Day 4

- ใช้ Next.js App Router และโครงสร้าง root-level เช่น `app/`, `components/`, `lib/`, `types/`
- `/` เป็นหน้า Home แบบง่าย มีลิงก์ไป `/issues`
- `/issues` อ่านรายการจริงจาก Supabase
- `/issues/[id]` อ่านรายละเอียดจริงจาก Supabase
- `/issues/new` สร้าง issue ผ่าน Server Action
- การเปลี่ยน status ใช้ Server Action และบันทึก `updated_at`
- ปิด issue ด้วย status `DONE` แทนการลบ row
- ไม่มี status filter ใน flow ปัจจุบัน
- `IssueBoard` และ `data/issue.ts` เป็นโค้ดจากช่วง mock และไม่แสดงบนหน้า Home แล้ว
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
