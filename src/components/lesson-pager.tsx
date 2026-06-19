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
      className="lesson-pager"
    >
      {previous ? (
        <Link
          href={lessonHref(previous)}
          className="lesson-pager__link"
        >
          <span>
            <ArrowLeft size={14} aria-hidden="true" />
            Previous
          </span>
          <strong>{previous.title}</strong>
        </Link>
      ) : (
        <div />
      )}

      {next ? (
        <Link
          href={lessonHref(next)}
          className="lesson-pager__link lesson-pager__link--next"
        >
          <span>
            Next
            <ArrowRight size={14} aria-hidden="true" />
          </span>
          <strong>{next.title}</strong>
        </Link>
      ) : (
        <div />
      )}
    </nav>
  );
}
