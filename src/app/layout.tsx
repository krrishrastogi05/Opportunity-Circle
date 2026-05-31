import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/layout/ThemeProvider";
import { AuthProvider } from "@/components/auth/AuthProvider";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { Footer } from "@/components/layout/Footer";
import { Toaster } from "sonner";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
});

const siteUrl = "https://opportunitysignal.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "OpportunitySignal — Tech Career Discovery",
    template: "%s | OpportunitySignal",
  },
  description:
    "The tech career map every confused student needs. Explore company profiles, opportunity types, and skill guides — structured, calm, and beginner-friendly.",
  keywords: [
    "tech career guide", "internship guide", "DSA preparation",
    "company expectations", "open source", "campus placement",
  ],
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${GeistSans.variable} ${GeistMono.variable} ${cormorant.variable} font-sans antialiased overflow-x-hidden`}
      >
        <AuthProvider>
          <ThemeProvider>
            <SiteHeader />
            <main className="min-h-screen animate-page-in">{children}</main>
            <Footer />
            <Toaster richColors position="bottom-right" />
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
