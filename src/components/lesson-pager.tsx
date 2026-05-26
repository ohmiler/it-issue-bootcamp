import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import {
  getNextLesson,
  getPreviousLesson,
  lessonHref,
  type Lesson,
} from "@/lib/course";

type LessonPagerProps = {
  lesson: Lesson;
};

export function LessonPager({ lesson }: LessonPagerProps) {
  const previous = getPreviousLesson(lesson.slug);
  const next = getNextLesson(lesson.slug);

  return (
    <nav
      aria-label="Lesson navigation"
      className="mt-12 grid gap-3 border-t border-[color:var(--border)] pt-6 md:grid-cols-2"
    >
      {previous ? (
        <Link
          href={lessonHref(previous)}
          className="rounded-md border border-[color:var(--border)] bg-[color:var(--panel)] p-4 text-[color:var(--text)] transition hover:border-[color:var(--accent-strong)] hover:bg-[color:var(--panel-soft)]"
        >
          <span className="mb-2 flex items-center gap-2 text-xs uppercase tracking-normal text-[color:var(--muted)]">
            <ArrowLeft size={14} aria-hidden="true" />
            Previous
          </span>
          <span className="font-medium">{previous.title}</span>
        </Link>
      ) : (
        <div />
      )}

      {next ? (
        <Link
          href={lessonHref(next)}
          className="rounded-md border border-[color:var(--border)] bg-[color:var(--panel)] p-4 text-right text-[color:var(--text)] transition hover:border-[color:var(--accent-strong)] hover:bg-[color:var(--panel-soft)]"
        >
          <span className="mb-2 flex items-center justify-end gap-2 text-xs uppercase tracking-normal text-[color:var(--muted)]">
            Next
            <ArrowRight size={14} aria-hidden="true" />
          </span>
          <span className="font-medium">{next.title}</span>
        </Link>
      ) : (
        <div />
      )}
    </nav>
  );
}
