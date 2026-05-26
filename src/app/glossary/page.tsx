import { CourseShell } from "@/components/course-shell";
import { compileSupportMdx } from "@/lib/mdx";

export const metadata = {
  title: "Glossary | IT Issue Bootcamp",
};

export default async function GlossaryPage() {
  const { content } = await compileSupportMdx("glossary.mdx");

  return (
    <CourseShell>
      <article className="lesson-prose">{content}</article>
    </CourseShell>
  );
}
