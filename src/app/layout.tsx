import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";
import { ThemeProvider } from "@/components/layout/ThemeProvider";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: {
    default: "Krrish Rastogi — Backend Engineer & AI/ML",
    template: "%s | Krrish Rastogi",
  },
  description:
    "B.Tech AI/ML student at BIT Mesra. Backend engineer, competitive programmer, open-source contributor. LeetCode Knight, SIH'25 National Winner.",
  keywords: ["Krrish Rastogi", "developer", "backend", "AI", "ML", "Node.js", "BIT Mesra", "competitive programming"],
  authors: [{ name: "Krrish Rastogi" }],
  openGraph: {
    title: "Krrish Rastogi — Backend Engineer & AI/ML",
    description: "B.Tech AI/ML student at BIT Mesra building backends, AI pipelines, and dev tools.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${GeistSans.variable} ${GeistMono.variable} font-sans antialiased overflow-x-hidden`}
      >
        <ThemeProvider>
          <Navbar />
          <main className="min-h-screen">{children}</main>
          <Footer />
          <Toaster richColors position="bottom-right" />
        </ThemeProvider>
      </body>
    </html>
  );
}
