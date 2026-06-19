import Link from "next/link";
import { BookOpen, ChevronDown, FileText, FolderOpen } from "lucide-react";
import { courseDays, getLessonsByDay, lessonHref } from "@/lib/course";

type SidebarNavProps = {
  currentSlug?: string;
};

export function SidebarNav({ currentSlug }: SidebarNavProps) {
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
                  <Link
                    key={lesson.slug}
                    href={lessonHref(lesson)}
                    className={active ? "is-active" : undefined}
                  >
                    <FileText size={15} aria-hidden="true" />
                    <span>
                      hour-{lesson.hour}.mdx
                      <small>{lesson.title}</small>
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
