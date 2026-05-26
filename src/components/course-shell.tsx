import Link from "next/link";
import { SidebarNav } from "@/components/sidebar-nav";

type CourseShellProps = {
  children: React.ReactNode;
  currentSlug?: string;
};

export function CourseShell({ children, currentSlug }: CourseShellProps) {
  return (
    <div className="min-h-screen lg:grid lg:grid-cols-[320px_1fr]">
      <SidebarNav currentSlug={currentSlug} />
      <main className="min-w-0">
        <div className="mx-auto w-full max-w-5xl px-5 py-8 md:px-8 lg:px-10">
          <div className="mb-8 flex flex-wrap items-center gap-3 text-sm text-slate-400">
            <Link href="/" className="hover:text-white">
              Overview
            </Link>
            <span>/</span>
            <Link href="/glossary" className="hover:text-white">
              Glossary
            </Link>
            <span>/</span>
            <Link href="/extensions" className="hover:text-white">
              Extensions
            </Link>
          </div>
          {children}
        </div>
      </main>
    </div>
  );
}
