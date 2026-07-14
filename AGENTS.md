<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## Course Content Editor

โปรเจกต์นี้เป็นงานเรียบเรียงเนื้อหาสำหรับใช้สอนนักศึกษาระดับเริ่มต้น

### Workflow

- แก้ slide และเนื้อหาบทเรียนโดยตรง
- ห้ามใช้ brainstorming, Superpowers, design spec หรือ implementation plan
- ไม่ต้องสร้างเอกสารประกอบก่อนแก้เนื้อหา
- ถ้าคำขอชัดเจน ให้ลงมือแก้ทันทีโดยไม่ถามยืนยันซ้ำ
- เมื่อผู้ใช้ส่งโค้ดปัจจุบันมา ให้ถือว่าโค้ดนั้นเป็น source of truth

### Content Consistency

ก่อนแก้ slide ให้ตรวจ slide ก่อนหน้าและถัดไป รวมถึงบทเรียนที่สร้างโค้ดส่วนนั้นครั้งแรก

- เนื้อหาต้องต่อเนื่องตามสถานะ project ของนักศึกษาในเวลานั้น
- ห้ามใช้ function, type, file หรือ concept ก่อนที่บทเรียนจะสอนให้สร้าง
- path, import และชื่อไฟล์ต้องตรงกับโครงสร้าง project ที่นักศึกษาใช้อยู่
- ระบุให้ชัดว่าโค้ดเป็น code ใหม่, code ที่แก้บางส่วน หรือ code สำหรับแทนทั้งไฟล์
- ถ้าเปลี่ยน props หรือ function signature ให้ตรวจ component ที่เรียกใช้งานทั้งหมด
- หลีกเลี่ยง slide ที่อธิบายซ้ำกับ slide ก่อนหน้า
- ใช้ภาษาไทยที่อ่านง่าย พร้อมอธิบายคำสั่งใหม่อย่างสั้นและตรงประเด็น

### Verification

- ตรวจลำดับเลข slide หลังเพิ่มหรือลบ slide
- รัน content verification และ build ตามความเหมาะสม
- ห้าม commit หรือ push จนกว่าผู้ใช้จะสั่ง
