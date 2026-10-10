import { notFound } from "next/navigation";
import { SlideDeck } from "@/components/slide-deck";
import {
  getLesson,
  getNextLesson,
  lessonHref,
  lessonLabel,
  lessonSlidesHref,
  lessons,
} from "@/lib/course";
import {
  compileCourseMdxSource,
  getLessonHeading,
  readLessonMdxSource,
  splitLessonHeading,
} from "@/lib/mdx";
import { splitLessonSlides } from "@/lib/slides";

type LessonSlidesPageProps = {
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

export async function generateMetadata({ params }: LessonSlidesPageProps) {
  const resolvedParams = await params;
  const lesson = getLesson(resolvedParams.day, resolvedParams.hour);

  return {
    title: lesson
      ? `${await getLessonHeading(lesson)} (สไลด์) | IT Issue Bootcamp`
      : "สไลด์ | IT Issue Bootcamp",
  };
}

export default async function LessonSlidesPage({
  params,
}: LessonSlidesPageProps) {
  const resolvedParams = await params;
  const lesson = getLesson(resolvedParams.day, resolvedParams.hour);

  if (!lesson) {
    notFound();
  }

  const raw = await readLessonMdxSource(lesson.slug);
  const slideSources = splitLessonSlides(raw);

  if (slideSources.length === 0) {
    notFound();
  }

  const slides = await Promise.all(
    slideSources.map(async (slide) => {
      const { content } = await compileCourseMdxSource(slide.markdown);
      return {
        ...slide,
        content,
      };
    }),
  );

  const next = getNextLesson(lesson.slug);
  const nextLesson = next
    ? {
        href: lessonSlidesHref(next),
        label: lessonLabel(next),
        title: await getLessonHeading(next),
      }
    : undefined;

  return (
    <SlideDeck
      documentHref={lessonHref(lesson)}
      lessonLabel={lessonLabel(lesson)}
      lessonTitle={splitLessonHeading(raw).heading ?? lesson.title}
      nextLesson={nextLesson}
      slideTitles={slides.map((slide) => slide.title)}
    >
      {slides.map((slide) => (
        <article
          key={slide.index}
          className="lesson-prose slide-prose"
          data-slide-index={slide.index}
        >
          {slide.content}
        </article>
      ))}
    </SlideDeck>
  );
}
