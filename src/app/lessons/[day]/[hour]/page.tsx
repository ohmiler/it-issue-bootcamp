import { notFound } from "next/navigation";
import Link from "next/link";
import { Clock, Goal, Presentation } from "lucide-react";
import { CourseShell } from "@/components/course-shell";
import { LessonPager } from "@/components/lesson-pager";
import { getLesson, lessonSlidesHref, lessons } from "@/lib/course";
import { compileLessonMdx } from "@/lib/mdx";

type LessonPageProps = {
  params: Promise<{
    day: string;
    hour: string;
  }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return lessons.map((lesson) => ({
    day: `day-${lesson.day}`,
    hour: `hour-${lesson.hour}`,
  }));
}

export async function generateMetadata({ params }: LessonPageProps) {
  const resolvedParams = await params;
  const lesson = getLesson(resolvedParams.day, resolvedParams.hour);

  return {
    title: lesson
      ? `${lesson.title} | IT Issue Bootcamp`
      : "Lesson | IT Issue Bootcamp",
  };
}

export default async function LessonPage({ params }: LessonPageProps) {
  const resolvedParams = await params;
  const lesson = getLesson(resolvedParams.day, resolvedParams.hour);

  if (!lesson) {
    notFound();
  }

  const { content, frontmatter } = await compileLessonMdx(lesson.slug);

  return (
    <CourseShell currentSlug={lesson.slug}>
      <header className="lesson-header">
        <p className="lesson-header__eyebrow">
          Day {lesson.day} / Hour {lesson.hour}
        </p>
        <h1>{lesson.title}</h1>
        <p>{lesson.summary}</p>
        <div className="lesson-header__actions">
          <Link
            href={lessonSlidesHref(lesson)}
            className="workbench-button workbench-button--primary"
          >
            <Presentation size={16} aria-hidden="true" />
            Slide mode
          </Link>
        </div>
        <div className="lesson-header__meta">
          <div>
            <Clock
              size={16}
              aria-hidden="true"
            />
            <span>{frontmatter.duration ?? 60} minutes</span>
          </div>
          <div>
            <Goal
              size={16}
              aria-hidden="true"
            />
            <span>{lesson.checkpoint}</span>
          </div>
        </div>
      </header>

      <article className="lesson-prose">{content}</article>
      <LessonPager lesson={lesson} />
    </CourseShell>
  );
}
