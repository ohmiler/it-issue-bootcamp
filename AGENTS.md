<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## Course Content Editor

โปรเจกต์นี้เป็นงานเรียบเรียงเนื้อหาสำหรับใช้สอนนักศึกษาระดับเริ่มต้น

### Workflow

- ก่อนแก้บทเรียน ให้อ่าน `COURSE_PROGRESS.md` เพื่อดูสถานะล่าสุดของหลักสูตรและ project
- แก้ slide และเนื้อหาบทเรียนโดยตรง
- ห้ามใช้ brainstorming, Superpowers, design spec หรือ implementation plan
- ไม่ต้องสร้างเอกสารประกอบก่อนแก้เนื้อหา
- ถ้าคำขอชัดเจน ให้ลงมือแก้ทันทีโดยไม่ถามยืนยันซ้ำ
- เมื่อผู้ใช้ส่งโค้ดปัจจุบันมา ให้ถือว่าโค้ดนั้นเป็น source of truth
- หลังแก้เนื้อหาชุดใหญ่หรือเปลี่ยน flow ของ project ให้อัปเดต `COURSE_PROGRESS.md` เฉพาะข้อมูลที่จำเป็นสำหรับงานรอบถัดไป
- ไม่ต้องบันทึกรายละเอียดทุกการแก้ slide ลง `COURSE_PROGRESS.md`; ใช้ Git history สำหรับรายละเอียดที่เสร็จแล้ว

### Content Consistency

ก่อนแก้ slide ให้ตรวจ slide ก่อนหน้าและถัดไป รวมถึงบทเรียนที่สร้างโค้ดส่วนนั้นครั้งแรก

- เนื้อหาต้องต่อเนื่องตามสถานะ project ของนักศึกษาในเวลานั้น
- ห้ามใช้ function, type, file หรือ concept ก่อนที่บทเรียนจะสอนให้สร้าง
- path, import และชื่อไฟล์ต้องตรงกับโครงสร้าง project ที่นักศึกษาใช้อยู่
- ระบุให้ชัดว่าโค้ดเป็น code ใหม่, code ที่แก้บางส่วน หรือ code สำหรับแทนทั้งไฟล์
- ถ้าเปลี่ยน props หรือ function signature ให้ตรวจ component ที่เรียกใช้งานทั้งหมด
- หลีกเลี่ยง slide ที่อธิบายซ้ำกับ slide ก่อนหน้า
- ใช้ภาษาไทยที่อ่านง่าย พร้อมอธิบายคำสั่งใหม่อย่างสั้นและตรงประเด็น

### Slide Quality

- เขียนข้อความให้นักศึกษาอ่านและลงมือทำได้โดยตรง ห้ามใส่คำแนะนำผู้สอนหรือเวลาพูดบนสไลด์
- หนึ่ง slide ควรมีหนึ่ง concept หรือหนึ่ง primary action; ถ้าเนื้อหาไม่พอดีจอให้แบ่ง slide แทนการลดขนาดตัวอักษร
- ไม่ต้องใส่ป้าย `ทำความเข้าใจ`, `ตรวจผล` หรือ `ทบทวน`; ให้หัวข้อและเนื้อหาของ slide สื่อหน้าที่เหล่านี้โดยตรง
- ใช้ `<LessonCallout type="action">` เฉพาะ slide ที่ผู้เรียนต้องลงมือกับ Project เช่น สร้างหรือแก้ไฟล์ รันคำสั่ง หรือตั้งค่าบริการ
- แสดง `ลงมือทำ` เป็น badge ขนาดเล็กแบบ inline หน้าประโยคคำสั่งหนึ่งประโยค ห้ามใช้กล่อง Callout ขนาดใหญ่ และห้ามเขียนคำสั่งเดิมซ้ำอีกครั้งใต้ badge
- ทุก code step ต้องบอกชื่อไฟล์ จุดที่วาง และเป็นการสร้างใหม่ แก้บางส่วน หรือนำไปแทนทั้งไฟล์
- ถ้าแก้ code เดิม ให้ highlight เฉพาะบรรทัดสำคัญที่เพิ่มหรือแก้ด้วย `CodeChange addedLines`; ถ้ามีบรรทัดที่ลบให้ใช้ `removedLines` หรือรายการ `ลบออก`
- ห้ามรวมรายการแก้ code, code เต็มไฟล์, troubleshooting และ summary จำนวนมากไว้ใน slide เดียว
- Slide recap ให้ทบทวนเฉพาะสถานะ project ที่จำเป็นต่อชั่วโมงใหม่ และไม่เล่าซ้ำ summary ก่อนหน้าทั้งหมด
- Diagram ต้องช่วยอธิบายความสัมพันธ์หรือ flow จริง ใช้ข้อความธรรมดาเมื่อลำดับสั้น และหลีกเลี่ยง diagram ที่มี node มากจนต้องย่อข้อความ
- Technical diagram ให้ใช้ component หรือ Mermaid ที่แก้ไขได้และ responsive; ใช้ภาพ raster เฉพาะภาพประกอบหรือ screenshot ที่จำเป็น

### Verification

- ตรวจลำดับเลข slide หลังเพิ่มหรือลบ slide
- ตรวจ slide mode ที่ viewport 1366x768 หลังแก้เนื้อหาชุดใหญ่ โดยหัวข้อ สิ่งที่ต้องทำ และ code สำคัญต้องอ่านได้ชัดเจน
- ตรวจว่าเมื่อเปลี่ยน slide ตำแหน่ง scroll เริ่มจากด้านบน
- รัน content verification และ build ตามความเหมาะสม
- ห้าม commit หรือ push จนกว่าผู้ใช้จะสั่ง
