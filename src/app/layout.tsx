import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "IT Issue Bootcamp",
  description:
    "Bootcamp 5 วันสำหรับสร้างระบบแจ้งปัญหา IT ด้วย HTML, CSS, TypeScript, Next.js และ Supabase",
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
