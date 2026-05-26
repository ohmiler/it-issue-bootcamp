import Link from "next/link";
import { BookOpen, ChevronRight } from "lucide-react";
import { courseDays, getLessonsByDay, lessonHref } from "@/lib/course";

type SidebarNavProps = {
  currentSlug?: string;
};

export function SidebarNav({ currentSlug }: SidebarNavProps) {
  return (
    <aside className="border-r border-[color:var(--border)] bg-[color:var(--panel)] px-4 py-5 lg:sticky lg:top-0 lg:h-screen lg:overflow-y-auto">
      <Link
        href="/"
        className="mb-6 flex items-center gap-2 text-sm font-semibold text-[color:var(--text-strong)]"
      >
        <BookOpen
          size={18}
          className="text-[color:var(--accent-strong)]"
          aria-hidden="true"
        />
        IT Issue Bootcamp
      </Link>

      <nav aria-label="Course lessons" className="space-y-6">
        {courseDays.map((day) => (
          <section key={day.day}>
            <h2 className="mb-2 text-xs font-semibold uppercase tracking-normal text-[color:var(--muted)]">
              Day {day.day}
            </h2>
            <div className="space-y-1">
              {getLessonsByDay(day.day).map((lesson) => {
                const active = lesson.slug === currentSlug;
                return (
                  <Link
                    key={lesson.slug}
                    href={lessonHref(lesson)}
                    className={[
                      "flex items-start gap-2 rounded-md border border-transparent px-3 py-2 text-sm transition",
                      active
                        ? "border-[color:var(--accent)] bg-[color:var(--accent-soft)] text-[color:var(--text-strong)]"
                        : "text-[color:var(--text)] hover:bg-[color:var(--panel-soft)] hover:text-[color:var(--text-strong)]",
                    ].join(" ")}
                  >
                    <ChevronRight
                      size={14}
                      className="mt-1 shrink-0"
                      aria-hidden="true"
                    />
                    <span>
                      <span className="block text-xs text-[color:var(--muted)]">
                        Hour {lesson.hour}
                      </span>
                      <span className="block leading-snug">{lesson.title}</span>
                    </span>
                  </Link>
                );
              })}
            </div>
          </section>
        ))}
      </nav>
    </aside>
  );
}
