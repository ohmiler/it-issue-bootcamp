import { CourseShell } from "@/components/course-shell";
import { compileSupportMdx } from "@/lib/mdx";

export const metadata = {
  title: "คำศัพท์ | IT Issue Bootcamp",
};

export default async function GlossaryPage() {
  const { content } = await compileSupportMdx("glossary.mdx");

  return (
    <CourseShell
      section="glossary"
      breadcrumbs={[{ label: "หน้าแรก", href: "/" }, { label: "คำศัพท์" }]}
    >
      <article className="lesson-prose">{content}</article>
    </CourseShell>
  );
}
