import Link from "next/link";
import { ArrowRight, CheckCircle2, Code2, TerminalSquare } from "lucide-react";
import { CourseShell } from "@/components/course-shell";
import { courseDays, getLessonsByDay, lessonHref } from "@/lib/course";
import { getLessonHeading } from "@/lib/mdx";

export default async function HomePage() {
  const days = await Promise.all(
    courseDays.map(async (day) => ({
      ...day,
      lessons: await Promise.all(
        getLessonsByDay(day.day).map(async (lesson) => ({
          ...lesson,
          heading: await getLessonHeading(lesson),
        })),
      ),
    })),
  );

  return (
    <CourseShell>
      <section className="home-hero">
        <div className="home-hero__meta">
          <span>
            <Code2 size={16} aria-hidden="true" />
            course.config.ts
          </span>
          <span>5 วัน / 20 ชั่วโมง</span>
        </div>
        <h1>Bootcamp สร้างระบบแจ้งปัญหา IT</h1>
        <p>
          สร้าง Web Application หนึ่งระบบตั้งแต่ HTML, CSS, TypeScript, Next.js
          และ Tailwind ไปจนถึงเชื่อม Supabase, Deploy, Login, กำหนดสิทธิ์ด้วย
          Role และ RLS และใช้ AI เขียนโค้ดอย่างปลอดภัย
        </p>
        <div className="home-hero__actions">
          <Link
            href="/lessons/day-1/hour-1"
            className="workbench-button workbench-button--primary"
          >
            เริ่ม Day 1
            <ArrowRight size={16} aria-hidden="true" />
          </Link>
          <Link
            href="/extensions"
            className="workbench-button"
          >
            แนวทางต่อยอด
          </Link>
        </div>
      </section>

      <section className="home-day-list" aria-label="บทเรียนแยกตามวัน">
        {days.map((day) => (
          <article key={day.day} className="home-day-panel">
            <div className="home-day-panel__header">
              <div>
                <p>src/day-{day.day}/index.ts</p>
                <h2>
                  {day.title}
                </h2>
                <span>{day.goal}</span>
              </div>
              <CheckCircle2 size={21} aria-hidden="true" />
            </div>
            <div className="home-lesson-grid">
              {day.lessons.map((lesson) => (
                <Link
                  key={lesson.slug}
                  href={lessonHref(lesson)}
                  className="home-lesson-link"
                >
                  <span>
                    <TerminalSquare size={14} aria-hidden="true" />
                    hour-{lesson.hour}.mdx
                  </span>
                  <strong>{lesson.heading}</strong>
                  <small>{lesson.summary}</small>
                </Link>
              ))}
            </div>
          </article>
        ))}
      </section>
    </CourseShell>
  );
}
