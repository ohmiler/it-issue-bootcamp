import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "IT Issue Bootcamp",
  description:
    "Five-day hands-on web application bootcamp for HTML, CSS, TypeScript, Next.js, and Supabase.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th">
      <body>{children}</body>
    </html>
  );
}
