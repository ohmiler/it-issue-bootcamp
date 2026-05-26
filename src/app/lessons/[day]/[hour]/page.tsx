import { notFound } from "next/navigation";
import { Clock, Goal } from "lucide-react";
import { CourseShell } from "@/components/course-shell";
import { LessonPager } from "@/components/lesson-pager";
import { getLesson, lessons } from "@/lib/course";
import { compileLessonMdx } from "@/lib/mdx";

type LessonPageProps = {
  params: Promise<{
    day: string;
    hour: string;
  }>;
};

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
      <header className="mb-8 rounded-md border border-[color:var(--border)] bg-[color:var(--panel)] p-5">
        <p className="text-sm font-semibold text-[color:var(--accent-strong)]">
          Day {lesson.day} / Hour {lesson.hour}
        </p>
        <h1 className="mt-2 text-3xl font-bold tracking-normal text-[color:var(--text-strong)] md:text-5xl">
          {lesson.title}
        </h1>
        <p className="mt-4 max-w-3xl text-[color:var(--text)]">
          {lesson.summary}
        </p>
        <div className="mt-5 grid gap-3 text-sm text-[color:var(--text)] md:grid-cols-2">
          <div className="flex gap-2 rounded-md border border-[color:var(--border-subtle)] bg-[color:var(--panel-raised)] p-3">
            <Clock
              size={16}
              className="mt-0.5 text-[color:var(--accent-strong)]"
              aria-hidden="true"
            />
            <span>{frontmatter.duration ?? 60} minutes</span>
          </div>
          <div className="flex gap-2 rounded-md border border-[color:var(--border-subtle)] bg-[color:var(--panel-raised)] p-3">
            <Goal
              size={16}
              className="mt-0.5 text-[color:var(--success)]"
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
