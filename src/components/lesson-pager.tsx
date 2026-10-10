import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import {
  getNextLesson,
  getPreviousLesson,
  lessonHref,
  type Lesson,
} from "@/lib/course";
import { getLessonHeading } from "@/lib/mdx";

type LessonPagerProps = {
  lesson: Lesson;
};

export async function LessonPager({ lesson }: LessonPagerProps) {
  const previous = getPreviousLesson(lesson.slug);
  const next = getNextLesson(lesson.slug);
  const previousHeading = previous ? await getLessonHeading(previous) : "";
  const nextHeading = next ? await getLessonHeading(next) : "";

  return (
    <nav
      aria-label="ไปชั่วโมงก่อนหน้าหรือถัดไป"
      className="lesson-pager"
    >
      {previous ? (
        <Link
          href={lessonHref(previous)}
          className="lesson-pager__link"
        >
          <span>
            <ArrowLeft size={14} aria-hidden="true" />
            ชั่วโมงก่อนหน้า
          </span>
          <strong>{previousHeading}</strong>
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
            ชั่วโมงถัดไป
            <ArrowRight size={14} aria-hidden="true" />
          </span>
          <strong>{nextHeading}</strong>
        </Link>
      ) : (
        <div />
      )}
    </nav>
  );
}
