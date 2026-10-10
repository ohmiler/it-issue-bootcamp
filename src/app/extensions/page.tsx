import { CourseShell } from "@/components/course-shell";
import { compileSupportMdx } from "@/lib/mdx";

export const metadata = {
  title: "แนวทางต่อยอด | IT Issue Bootcamp",
};

export default async function ExtensionsPage() {
  const { content } = await compileSupportMdx("extensions.mdx");

  return (
    <CourseShell
      section="extensions"
      breadcrumbs={[{ label: "หน้าแรก", href: "/" }, { label: "แนวทางต่อยอด" }]}
    >
      <article className="lesson-prose">{content}</article>
    </CourseShell>
  );
}
