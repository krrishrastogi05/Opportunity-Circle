import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";
import { ThemeProvider } from "@/components/layout/ThemeProvider";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Toaster } from "sonner";

const siteUrl = "https://krrishrastogi.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Krrish Rastogi — Backend Engineer & Competitive Programmer",
    template: "%s | Krrish Rastogi",
  },
  description:
    "B.Tech AI/ML student at BIT Mesra. Backend engineer, competitive programmer (LeetCode Knight, 1900+ rating), open-source contributor. SIH'25 National Winner, Amazon HackOn Top 75.",
  keywords: [
    "Krrish Rastogi", "backend engineer", "competitive programmer", "LeetCode Knight",
    "DSA", "data structures algorithms", "AI ML developer", "Node.js developer",
    "BIT Mesra", "TypeScript", "Next.js", "competitive programming blog",
    "Smart India Hackathon winner", "open source contributor",
  ],
  authors: [{ name: "Krrish Rastogi", url: siteUrl }],
  creator: "Krrish Rastogi",
  openGraph: {
    title: "Krrish Rastogi — Backend Engineer & Competitive Programmer",
    description: "B.Tech AI/ML student at BIT Mesra. LeetCode Knight (1900+), SIH'25 National Winner, backend & AI engineer.",
    type: "website",
    url: siteUrl,
    siteName: "Krrish Rastogi",
    images: [{ url: "/og-default.png", width: 1200, height: 630, alt: "Krrish Rastogi" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Krrish Rastogi — Backend Engineer & Competitive Programmer",
    description: "LeetCode Knight (1900+), SIH'25 National Winner, backend & AI engineer at BIT Mesra.",
    images: ["/og-default.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
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
