import { Fragment } from "react";
import Link from "next/link";
import { BookOpen, ChevronDown, FileText, FolderOpen } from "lucide-react";
import { LessonOutlineNav } from "@/components/lesson-outline-nav";
import { courseDays, getLessonsByDay, lessonHref } from "@/lib/course";
import type { SlideOutlineItem } from "@/lib/slides";

type SidebarNavProps = {
  currentSlug?: string;
  outline?: SlideOutlineItem[];
};

export function SidebarNav({ currentSlug, outline }: SidebarNavProps) {
  return (
    <aside className="workbench-sidebar">
      <div className="workbench-sidebar__title">Explorer</div>

      <Link href="/" className="workbench-root">
        <BookOpen size={17} aria-hidden="true" />
        <span>IT-ISSUE-BOOTCAMP</span>
      </Link>

      <nav aria-label="Course lessons" className="workbench-tree">
        {courseDays.map((day) => (
          <section key={day.day} className="workbench-folder">
            <h2>
              <ChevronDown size={15} aria-hidden="true" />
              <FolderOpen size={15} aria-hidden="true" />
              <span>day-{day.day}</span>
            </h2>
            <div className="workbench-folder__items">
              {getLessonsByDay(day.day).map((lesson) => {
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
                        hour-{lesson.hour}.mdx
                        <small>{lesson.title}</small>
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
