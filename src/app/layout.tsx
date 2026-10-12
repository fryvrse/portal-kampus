import type { Metadata } from "next";
import "./globals.css";
import Providers from "./providers";

export const metadata: Metadata = {
  title: "Portal Kampus Fiktif - LMS & Academic Portal",
  description: "Sistem Manajemen Pembelajaran dan Portal Akademik Terpadu Universitas Nusantara Digital (100% Data Sintetis)",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-slate-50 text-slate-900">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
