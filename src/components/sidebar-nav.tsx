import { Fragment } from "react";
import Link from "next/link";
import { FileText, FolderOpen } from "lucide-react";
import { LessonOutlineNav } from "@/components/lesson-outline-nav";
import { courseDays, getLessonsByDay, lessonHref } from "@/lib/course";
import { getLessonHeading } from "@/lib/mdx";
import type { SlideOutlineItem } from "@/lib/slides";

type SidebarNavProps = {
  currentSlug?: string;
  outline?: SlideOutlineItem[];
};

export async function SidebarNav({ currentSlug, outline }: SidebarNavProps) {
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
    <aside className="workbench-sidebar">
      <div className="workbench-sidebar__title">บทเรียน</div>

      <nav aria-label="บทเรียนทั้งหมด" className="workbench-tree">
        {days.map((day) => (
          <section key={day.day} className="workbench-folder">
            <h2>
              <FolderOpen size={15} aria-hidden="true" />
              <span>
                Day {day.day}
                <small>{day.title}</small>
              </span>
            </h2>
            <div className="workbench-folder__items">
              {day.lessons.map((lesson) => {
                const active = lesson.slug === currentSlug;
                return (
                  <Fragment key={lesson.slug}>
                    <Link
                      href={lessonHref(lesson)}
                      className={active ? "is-active" : undefined}
                      aria-current={active ? "page" : undefined}
                    >
                      <FileText size={15} aria-hidden="true" />
                      <span>
                        <small>ชั่วโมงที่ {lesson.hour}</small>
                        {lesson.heading}
                      </span>
                    </Link>
                    {active && outline && outline.length > 0 ? (
                      <LessonOutlineNav items={outline} />
                    ) : null}
                  </Fragment>
                );
              })}
            </div>
          </section>
        ))}
      </nav>
    </aside>
  );
}
