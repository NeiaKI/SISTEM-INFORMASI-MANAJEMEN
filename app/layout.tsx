import "./globals.css";
import type { ReactNode } from "react";
import { ThemeProvider } from "@/components/theme-provider";

export const metadata = {
  title: "SIM Tugas | Sistem Manajemen Tugas & Proyek Kuliah",
  description:
    "Frontend prototype Sistem Manajemen Tugas & Proyek Kuliah berbasis PRD — Next.js, Tailwind CSS, dark premium UI.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="id" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen antialiased" suppressHydrationWarning>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
