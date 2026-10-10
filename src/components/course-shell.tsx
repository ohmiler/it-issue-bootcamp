import { Fragment } from "react";
import Link from "next/link";
import { BookA, BookOpen, House, Lightbulb } from "lucide-react";
import { SidebarNav } from "@/components/sidebar-nav";
import type { SlideOutlineItem } from "@/lib/slides";

export type CourseSection = "home" | "glossary" | "extensions" | "lesson";

export type Breadcrumb = {
  label: string;
  href?: string;
};

type CourseShellProps = {
  breadcrumbs: Breadcrumb[];
  children: React.ReactNode;
  currentSlug?: string;
  outline?: SlideOutlineItem[];
  section: CourseSection;
};

const sectionLinks: {
  href: string;
  icon: typeof House;
  label: string;
  section: CourseSection;
}[] = [
  { href: "/", icon: House, label: "หน้าแรก", section: "home" },
  { href: "/glossary", icon: BookA, label: "คำศัพท์", section: "glossary" },
  {
    href: "/extensions",
    icon: Lightbulb,
    label: "แนวทางต่อยอด",
    section: "extensions",
  },
];

export function CourseShell({
  breadcrumbs,
  children,
  currentSlug,
  outline,
  section,
}: CourseShellProps) {
  return (
    <div className="workbench-shell">
      <header className="workbench-titlebar">
        <Link href="/" className="workbench-titlebar__brand">
          <span className="workbench-titlebar__mark" aria-hidden="true" />
          IT Issue Bootcamp
        </Link>
      </header>

      <div className="workbench-body">
        <nav className="workbench-activitybar" aria-label="เมนูหลัก">
          {sectionLinks.map(({ href, icon: Icon, label, section: target }) => (
            <Link
              key={href}
              href={href}
              aria-label={label}
              title={label}
              aria-current={section === target ? "page" : undefined}
              className={section === target ? "is-active" : undefined}
            >
              <Icon size={22} aria-hidden="true" />
            </Link>
          ))}
          <span className="workbench-activitybar__spacer" />
          <Link
            href="/lessons/day-1/hour-1"
            aria-label="เริ่มบทเรียนแรก"
            title="เริ่มบทเรียนแรก"
          >
            <BookOpen size={22} aria-hidden="true" />
          </Link>
        </nav>

        <SidebarNav currentSlug={currentSlug} outline={outline} />

        <main className="workbench-editor-area">
          <nav className="workbench-breadcrumbs" aria-label="ตำแหน่งปัจจุบัน">
            {breadcrumbs.map((crumb, index) => (
              <Fragment key={`${index}-${crumb.label}`}>
                {index > 0 ? <span aria-hidden="true">/</span> : null}
                {crumb.href ? (
                  <Link href={crumb.href}>{crumb.label}</Link>
                ) : (
                  <span
                    aria-current={
                      index === breadcrumbs.length - 1 ? "page" : undefined
                    }
                  >
                    {crumb.label}
                  </span>
                )}
              </Fragment>
            ))}
          </nav>

          <div
            className="workbench-editor-panel"
            key={currentSlug ?? section}
          >
            <div className="workbench-editor-content">{children}</div>
          </div>
        </main>
      </div>
    </div>
  );
}
