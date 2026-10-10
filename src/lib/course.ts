export type Lesson = {
  slug: string;
  day: number;
  hour: number;
  title: string;
  summary: string;
  sourceFile: string;
  checkpoint: string;
};

export type CourseDay = {
  day: number;
  title: string;
  goal: string;
};

export const courseDays: CourseDay[] = [
  {
    day: 1,
    title: "Static Prototype และ Git",
    goal: "เข้าใจการทำงานของระบบเว็บ แล้วสร้างหน้าแจ้งปัญหาแบบ Static"
  },
  {
    day: 2,
    title: "Next.js และ TypeScript",
    goal: "ย้ายหน้า Static เข้า Next.js แล้วกำหนดรูปแบบข้อมูล Issue ด้วย TypeScript"
  },
  {
    day: 3,
    title: "Tailwind และ CRUD ในหน้าเว็บ",
    goal: "ปรับหน้าตาด้วย Tailwind แล้วฝึกเพิ่มและเปลี่ยนสถานะรายการใน State ก่อนใช้ฐานข้อมูลจริง"
  },
  {
    day: 4,
    title: "Supabase และ Deploy",
    goal: "เชื่อมฐานข้อมูลจริงให้อ่าน เพิ่ม และเปลี่ยนสถานะ Issue ได้ แล้ว Deploy ขึ้น Vercel"
  },
  {
    day: 5,
    title: "Login, สิทธิ์ และความปลอดภัย",
    goal: "ป้องกันระบบเดิมด้วย Login, Role, RLS และหน้าสำหรับ ADMIN แล้วทบทวนความเสี่ยงด้านความปลอดภัย"
  }
];

export const lessons: Lesson[] = [
  {
    slug: "day-1/hour-1",
    day: 1,
    hour: 1,
    title: "Basic Website Workflow",
    summary: "ภาพรวม Frontend, Backend, Database, Request/Response และ CRUD ผ่านโจทย์ระบบแจ้งปัญหา IT",
    sourceFile: "day-1-hour-1-web-workflow.md",
    checkpoint: "นักศึกษาอธิบายได้ว่าการแจ้งปัญหาหนึ่งครั้งผ่านส่วนใดของระบบบ้าง"
  },
  {
    slug: "day-1/hour-2",
    day: 1,
    hour: 2,
    title: "HTML Foundation",
    summary: "โครงสร้าง HTML, Semantic HTML และ Form แจ้งปัญหาที่ใช้ label, input, textarea และ button",
    sourceFile: "day-1-hour-2-html-foundation.md",
    checkpoint: "มี Form แจ้งปัญหาใน index.html"
  },
  {
    slug: "day-1/hour-3",
    day: 1,
    hour: 3,
    title: "CSS Foundation",
    summary: "Selector, Box Model, Flexbox และ Grid, ตกแต่ง Form และ Responsive Layout",
    sourceFile: "day-1-hour-3-css-foundation.md",
    checkpoint: "Form อ่านง่ายและใช้ได้ทั้งมือถือและจอกว้างด้วย style.css"
  },
  {
    slug: "day-1/hour-4",
    day: 1,
    hour: 4,
    title: "Issue List and Git",
    summary: "ตารางรายการปัญหาแบบ Static, Status Badge แล้ว Commit และ Push ขึ้น GitHub",
    sourceFile: "day-1-hour-4-issue-list-and-git.md",
    checkpoint: "งาน Day 1 อยู่บน GitHub แล้ว"
  },
  {
    slug: "day-2/hour-1",
    day: 2,
    hour: 1,
    title: "Next.js Setup",
    summary: "เหตุผลที่ย้ายไป Next.js, สร้าง Project แบบ App Router และเปิด Development Server",
    sourceFile: "day-2-hour-1-nextjs-setup.md",
    checkpoint: "เปิด Next.js Project บนเครื่องได้"
  },
  {
    slug: "day-2/hour-2",
    day: 2,
    hour: 2,
    title: "Convert Static to Next.js",
    summary: "แปลง HTML เป็น TSX และย้าย CSS เดิมเข้า app/globals.css",
    sourceFile: "day-2-hour-2-convert-static-to-nextjs.md",
    checkpoint: "หน้าจาก Day 1 แสดงใน Next.js เหมือนเดิม"
  },
  {
    slug: "day-2/hour-3",
    day: 2,
    hour: 3,
    title: "TypeScript Data Model",
    summary: "Type ของ Issue, Union Type ของ Status, Mock Data และสร้างแถวด้วย .map()",
    sourceFile: "day-2-hour-3-typescript-data-model.md",
    checkpoint: "ตารางสร้างแถวจาก Mock Data ที่กำหนด Type แล้ว"
  },
  {
    slug: "day-2/hour-4",
    day: 2,
    hour: 4,
    title: "Components and Routing",
    summary: "แยก Component, ส่งข้อมูลผ่าน Props, ย้าย Type และ Mock Data ไปไฟล์กลาง และสร้าง Route ใหม่",
    sourceFile: "day-2-hour-4-components-and-routing.md",
    checkpoint: "มี Component ที่ใช้ซ้ำได้และหน้า /issues, /issues/new และ /issues/[id]"
  },
  {
    slug: "day-3/hour-1",
    day: 3,
    hour: 1,
    title: "Tailwind Setup and Utilities",
    summary: "เปิดใช้ Tailwind, อ่าน Class พื้นฐาน และแปลงเมนู หน้า Home และ Form",
    sourceFile: "day-3-hour-1-tailwind-setup-and-utilities.md",
    checkpoint: "เมนู หน้า Home และ Form ใช้ Tailwind แล้ว"
  },
  {
    slug: "day-3/hour-2",
    day: 3,
    hour: 2,
    title: "Tailwind Components and Responsive UI",
    summary: "ป้ายสถานะที่เปลี่ยนสีตามสถานะ, ตารางที่เลื่อนได้บนจอเล็ก และข้อความเมื่อไม่มีรายการ",
    sourceFile: "day-3-hour-2-tailwind-components-and-responsive-ui.md",
    checkpoint: "ป้ายสถานะและตารางใช้ Tailwind และอ่านง่ายทุกขนาดจอ"
  },
  {
    slug: "day-3/hour-3",
    day: 3,
    hour: 3,
    title: "Form State and Validation",
    summary: "Client Component, useState, FormData, การตรวจข้อมูล และการเพิ่มรายการใน State",
    sourceFile: "day-3-hour-3-form-state-and-validation.md",
    checkpoint: "ส่งฟอร์มแล้วได้รายการใหม่หลังผ่านการตรวจข้อมูล"
  },
  {
    slug: "day-3/hour-4",
    day: 3,
    hour: 4,
    title: "Mock CRUD and Database Prep",
    summary: "CRUD ใน Project, เปลี่ยนสถานะด้วยข้อมูลชุดใหม่ และข้อจำกัดของข้อมูลชั่วคราว",
    sourceFile: "day-3-hour-4-mock-crud-and-database-prep.md",
    checkpoint: "เปลี่ยนสถานะรายการในหน้า Home ได้"
  },
  {
    slug: "day-4/hour-1",
    day: 4,
    hour: 1,
    title: "Supabase Setup and Schema",
    summary: "สร้าง Supabase Project, Table issues ด้วย SQL, เปิด RLS และตั้งค่า Environment Variables",
    sourceFile: "day-4-hour-1-supabase-setup-and-schema.md",
    checkpoint: "Supabase มี Table issues พร้อมข้อมูลตัวอย่าง"
  },
  {
    slug: "day-4/hour-2",
    day: 4,
    hour: 2,
    title: "Read from Supabase",
    summary: "เชื่อม Supabase บน Server, แปลงชื่อ Column และแสดงหน้ารายการกับหน้ารายละเอียด",
    sourceFile: "day-4-hour-2-read-from-supabase.md",
    checkpoint: "หน้าเว็บอ่านข้อมูลจาก Supabase"
  },
  {
    slug: "day-4/hour-3",
    day: 4,
    hour: 3,
    title: "Create with Server Actions",
    summary: "Server Action, การตรวจข้อมูลบน Server และการเพิ่ม Issue ลง Supabase",
    sourceFile: "day-4-hour-3-create-with-server-actions.md",
    checkpoint: "ฟอร์มบันทึก Issue ใหม่ลง Supabase"
  },
  {
    slug: "day-4/hour-4",
    day: 4,
    hour: 4,
    title: "Deploy Checkpoint",
    summary: "เปลี่ยนสถานะผ่าน Server Action, ปิดงานด้วย DONE และ Deploy ขึ้น Vercel",
    sourceFile: "day-4-hour-4-update-delete-and-deploy.md",
    checkpoint: "ระบบบน Vercel อ่าน เพิ่ม และเปลี่ยนสถานะ Issue ได้"
  },
  {
    slug: "day-5/hour-1",
    day: 5,
    hour: 1,
    title: "Auth Flow and Supabase SSR",
    summary: "Authentication กับ Authorization, Session และ Cookie, Supabase Client ฝั่ง Server และ Proxy",
    sourceFile: "day-5-hour-1-auth-flow-and-supabase-ssr.md",
    checkpoint: "Server อ่าน Session ของผู้ใช้จาก Cookie ได้"
  },
  {
    slug: "day-5/hour-2",
    day: 5,
    hour: 2,
    title: "Login, Logout, and Protected Pages",
    summary: "Login และ Logout ด้วย Server Action, บังคับ Login ก่อนใช้งาน และเมนูตามสถานะ Login",
    sourceFile: "day-5-hour-2-login-logout-and-protected-pages.md",
    checkpoint: "Login แล้วเปิดหน้าที่ต้องมีผู้ใช้ได้"
  },
  {
    slug: "day-5/hour-3",
    day: 5,
    hour: 3,
    title: "Authorization, RLS, and Admin",
    summary: "เจ้าของ Issue, Role ใน Table profiles, RLS Policy และหน้าสำหรับ ADMIN",
    sourceFile: "day-5-hour-3-authorization-rls-and-admin.md",
    checkpoint: "ADMIN เปลี่ยนสถานะได้ ส่วน USER เห็นเฉพาะ Issue ของตัวเอง"
  },
  {
    slug: "day-5/hour-4",
    day: 5,
    hour: 4,
    title: "Security, LLM-Safe Coding, and Final Demo",
    summary: "เส้นทางของ Request, ชั้นการตรวจสิทธิ์, ความเสี่ยงพื้นฐาน และการใช้ AI อย่างปลอดภัย",
    sourceFile: "day-5-hour-4-security-llm-safe-and-final-demo.md",
    checkpoint: "นักศึกษาอธิบายหน้าที่ของ Authentication, Role, RLS และความเสี่ยงพื้นฐานได้"
  }
];

export function getLessonsByDay(day: number): Lesson[] {
  return lessons.filter((lesson) => lesson.day === day);
}

export function getLesson(day: string, hour: string): Lesson | undefined {
  const dayNumber = Number(day.replace("day-", ""));
  const hourNumber = Number(hour.replace("hour-", ""));

  if (!Number.isInteger(dayNumber) || !Number.isInteger(hourNumber)) {
    return undefined;
  }

  return lessons.find((lesson) => lesson.day === dayNumber && lesson.hour === hourNumber);
}

export function getLessonBySlug(slug: string): Lesson | undefined {
  return lessons.find((lesson) => lesson.slug === slug);
}

export function getLessonIndex(slug: string): number {
  return lessons.findIndex((lesson) => lesson.slug === slug);
}

export function getPreviousLesson(slug: string): Lesson | undefined {
  const index = getLessonIndex(slug);
  return index > 0 ? lessons[index - 1] : undefined;
}

export function getNextLesson(slug: string): Lesson | undefined {
  const index = getLessonIndex(slug);
  return index >= 0 && index < lessons.length - 1 ? lessons[index + 1] : undefined;
}

export function lessonHref(lesson: Lesson): string {
  return `/lessons/day-${lesson.day}/hour-${lesson.hour}`;
}

export function lessonLabel(lesson: Lesson): string {
  return `Day ${lesson.day} / ชั่วโมงที่ ${lesson.hour}`;
}

export function lessonSlidesHref(lesson: Lesson): string {
  return `${lessonHref(lesson)}/slides`;
}
