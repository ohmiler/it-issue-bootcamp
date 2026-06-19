import Link from "next/link";
import { ArrowRight, CheckCircle2, Code2, TerminalSquare } from "lucide-react";
import { CourseShell } from "@/components/course-shell";
import { courseDays, getLessonsByDay, lessonHref } from "@/lib/course";

export default function HomePage() {
  return (
    <CourseShell>
      <section className="home-hero">
        <div className="home-hero__meta">
          <span>
            <Code2 size={16} aria-hidden="true" />
            course.config.ts
          </span>
          <span>5 days / 20 hours</span>
        </div>
        <h1>IT Issue Reporting Web Application Bootcamp</h1>
        <p>
          A code-first course-book for HTML, CSS, TypeScript, Next.js, Tailwind,
          Supabase, deployment, authentication, roles, RLS, and LLM-safe coding.
        </p>
        <div className="home-hero__actions">
          <Link
            href="/lessons/day-1/hour-1"
            className="workbench-button workbench-button--primary"
          >
            Start Day 1
            <ArrowRight size={16} aria-hidden="true" />
          </Link>
          <Link
            href="/extensions"
            className="workbench-button"
          >
            Extension Map
          </Link>
        </div>
      </section>

      <section className="home-day-list" aria-label="Course days">
        {courseDays.map((day) => (
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
              {getLessonsByDay(day.day).map((lesson) => (
                <Link
                  key={lesson.slug}
                  href={lessonHref(lesson)}
                  className="home-lesson-link"
                >
                  <span>
                    <TerminalSquare size={14} aria-hidden="true" />
                    hour-{lesson.hour}.mdx
                  </span>
                  <strong>{lesson.title}</strong>
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
