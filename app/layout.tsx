import { Poppins, Inter } from "next/font/google";
import "./globals.css";
import type { ReactNode } from "react";
import { ThemeProvider } from "@/components/theme-provider";
import ClientSessionProvider from "@/components/client-session-provider";

const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-poppins",
  display: "swap",
});

const inter = Inter({
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(appUrl),
  title: "AcadTrack — Manajemen Tugas & Proyek Kuliah",
  description:
    "Platform manajemen tugas dan proyek perkuliahan untuk mahasiswa, dosen, admin, dan staff TU Universitas Pamulang. Submit, review, rekap pengumpulan, semua dalam satu dashboard.",
  openGraph: {
    title: "AcadTrack — Manajemen Tugas & Proyek Kuliah",
    description:
      "Platform manajemen tugas dan proyek perkuliahan untuk mahasiswa dan dosen Universitas Pamulang.",
    siteName: "AcadTrack",
    locale: "id_ID",
    type: "website",
    images: [
      {
        url: "/Unpam-Victor.jpeg",
        width: 1200,
        height: 630,
        alt: "AcadTrack — Manajemen Tugas & Proyek Kuliah",
      },
    ],
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="id" suppressHydrationWarning className={`${poppins.variable} ${inter.variable}`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://api.fontshare.com" />
        <link rel="dns-prefetch" href="https://api.fontshare.com" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "AcadTrack",
              url: appUrl,
              description:
                "Sistem manajemen pembelajaran digital terintegrasi untuk mahasiswa dan dosen Universitas Pamulang.",
              publisher: {
                "@type": "Organization",
                name: "Universitas Pamulang",
                url: "https://www.unpam.ac.id",
                logo: { "@type": "ImageObject", url: `${appUrl}/Unpam-Victor.jpeg` },
              },
            }),
          }}
        />
      </head>
      <body className="min-h-screen antialiased" suppressHydrationWarning>
        <ClientSessionProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </ClientSessionProvider>
      </body>
    </html>
  );
}
