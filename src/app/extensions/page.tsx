import { CourseShell } from "@/components/course-shell";
import { compileSupportMdx } from "@/lib/mdx";

export const metadata = {
  title: "Extension Map | IT Issue Bootcamp",
};

export default async function ExtensionsPage() {
  const { content } = await compileSupportMdx("extensions.mdx");

  return (
    <CourseShell>
      <article className="lesson-prose">{content}</article>
    </CourseShell>
  );
}
