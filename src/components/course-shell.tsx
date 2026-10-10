import Link from "next/link";
import { BookOpen, Files, GitBranch, Search, TerminalSquare } from "lucide-react";
import { SidebarNav } from "@/components/sidebar-nav";
import type { SlideOutlineItem } from "@/lib/slides";

type CourseShellProps = {
  children: React.ReactNode;
  currentSlug?: string;
  outline?: SlideOutlineItem[];
};

export function CourseShell({
  children,
  currentSlug,
  outline,
}: CourseShellProps) {
  const activeFile = currentSlug
    ? `${currentSlug.replace("/", "-")}.mdx`
    : "overview.tsx";

  return (
    <div className="workbench-shell">
      <header className="workbench-titlebar" aria-label="Application title bar">
        <div className="workbench-titlebar__left">
          <span className="workbench-titlebar__mark" aria-hidden="true" />
          <span className="workbench-titlebar__menu">File</span>
          <span className="workbench-titlebar__menu">Edit</span>
          <span className="workbench-titlebar__menu">View</span>
          <span className="workbench-titlebar__menu">Terminal</span>
        </div>
        <div className="workbench-titlebar__center">
          IT Issue Bootcamp - Visual Studio Code
        </div>
        <div className="workbench-titlebar__right" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
      </header>

      <div className="workbench-body">
        <nav className="workbench-activitybar" aria-label="เมนูหลัก">
          <Link href="/" aria-label="หน้าแรก" className="is-active">
            <Files size={22} aria-hidden="true" />
          </Link>
          <Link href="/glossary" aria-label="คำศัพท์">
            <Search size={22} aria-hidden="true" />
          </Link>
          <Link href="/extensions" aria-label="แนวทางต่อยอด">
            <GitBranch size={22} aria-hidden="true" />
          </Link>
          <span className="workbench-activitybar__spacer" />
          <Link href="/lessons/day-1/hour-1" aria-label="บทเรียนแรก">
            <BookOpen size={22} aria-hidden="true" />
          </Link>
        </nav>

        <SidebarNav currentSlug={currentSlug} outline={outline} />

        <main className="workbench-editor-area">
          <div className="workbench-tabs" aria-label="ไฟล์ที่เปิดอยู่">
            <span className="workbench-tab workbench-tab--active">
              <TerminalSquare size={15} aria-hidden="true" />
              {activeFile}
            </span>
          </div>

          <div className="workbench-breadcrumbs">
            <Link href="/" className="hover:text-[color:var(--accent-strong)]">
              หน้าแรก
            </Link>
            <span>/</span>
            <Link
              href="/glossary"
              className="hover:text-[color:var(--accent-strong)]"
            >
              คำศัพท์
            </Link>
            <span>/</span>
            <Link
              href="/extensions"
              className="hover:text-[color:var(--accent-strong)]"
            >
              แนวทางต่อยอด
            </Link>
          </div>

          <div
            className="workbench-editor-panel"
            key={currentSlug ?? "overview"}
          >
            <div className="workbench-editor-content">{children}</div>
          </div>
        </main>
      </div>

      <footer className="workbench-statusbar" aria-label="Project status">
        <span>main</span>
        <span>TypeScript</span>
        <span>UTF-8</span>
        <span>VS Code Dark+</span>
      </footer>
    </div>
  );
}
