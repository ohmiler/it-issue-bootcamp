import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { CourseShell } from "@/components/course-shell";
import { courseDays, getLessonsByDay, lessonHref } from "@/lib/course";

export default function HomePage() {
  return (
    <CourseShell>
      <section className="mb-10">
        <p className="mb-3 text-sm font-semibold text-[color:var(--accent-strong)]">
          5 days / 20 hours
        </p>
        <h1 className="max-w-3xl text-4xl font-bold leading-tight tracking-normal text-[color:var(--text-strong)] md:text-6xl">
          IT Issue Reporting Web Application Bootcamp
        </h1>
        <p className="mt-5 max-w-3xl text-lg leading-8 text-[color:var(--text)]">
          A hands-on course-book for HTML, CSS, TypeScript, Next.js, Tailwind,
          Supabase, deployment, authentication, roles, RLS, and LLM-safe coding.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href="/lessons/day-1/hour-1"
            className="inline-flex items-center gap-2 rounded-md bg-[color:var(--accent)] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[color:var(--accent-strong)]"
          >
            Start Day 1
            <ArrowRight size={16} aria-hidden="true" />
          </Link>
          <Link
            href="/extensions"
            className="inline-flex items-center gap-2 rounded-md border border-[color:var(--border)] px-4 py-2 text-sm font-semibold text-[color:var(--text-strong)] transition hover:border-[color:var(--accent-strong)] hover:bg-[color:var(--panel-soft)]"
          >
            Extension Map
          </Link>
        </div>
      </section>

      <section className="grid gap-4">
        {courseDays.map((day) => (
          <article
            key={day.day}
            className="rounded-md border border-[color:var(--border)] bg-[color:var(--panel)] p-5"
          >
            <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="text-sm font-semibold text-[color:var(--accent-strong)]">
                  Day {day.day}
                </p>
                <h2 className="mt-1 text-2xl font-semibold tracking-normal text-[color:var(--text-strong)]">
                  {day.title}
                </h2>
                <p className="mt-2 text-[color:var(--muted-strong)]">
                  {day.goal}
                </p>
              </div>
              <CheckCircle2
                className="text-[color:var(--success)]"
                size={22}
                aria-hidden="true"
              />
            </div>
            <div className="grid gap-2 md:grid-cols-2">
              {getLessonsByDay(day.day).map((lesson) => (
                <Link
                  key={lesson.slug}
                  href={lessonHref(lesson)}
                  className="rounded-md border border-[color:var(--border-subtle)] bg-[color:var(--panel-raised)] p-3 transition hover:border-[color:var(--accent-strong)] hover:bg-[color:var(--panel-soft)]"
                >
                  <span className="text-xs text-[color:var(--muted)]">
                    Hour {lesson.hour}
                  </span>
                  <span className="mt-1 block font-medium text-[color:var(--text-strong)]">
                    {lesson.title}
                  </span>
                  <span className="mt-1 block text-sm text-[color:var(--muted-strong)]">
                    {lesson.summary}
                  </span>
                </Link>
              ))}
            </div>
          </article>
        ))}
      </section>
    </CourseShell>
  );
}
