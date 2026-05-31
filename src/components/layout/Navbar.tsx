"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { Sun, Moon, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { SearchTrigger } from "./GlobalSearch";
import { SignInButton } from "@/components/auth/SignInButton";

const links = [
  { href: "/companies",                      label: "Companies" },
  { href: "/opportunities",                  label: "Opportunities" },
  { href: "/opportunities/open-source",      label: "Open Source" },
];

export function Navbar({ offset = false }: { offset?: boolean }) {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const [open, setOpen]       = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);
  useEffect(() => { setOpen(false); }, [pathname]);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 z-40 transition-all duration-300",
          offset ? "top-9" : "top-0",
          scrolled
            ? "border-b border-border/60 bg-background/80 backdrop-blur-xl"
            : "bg-transparent"
        )}
      >
        <div className="max-w-6xl mx-auto px-5 h-14 flex items-center justify-between gap-6">

          {/* Wordmark */}
          <Link href="/" className="shrink-0 text-sm font-semibold tracking-tight">
            Opportunity<span className="text-primary">Signal</span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-0.5">
            {links.map((l) => (
              <Link key={l.href} href={l.href}
                className={cn(
                  "px-3.5 py-1.5 rounded-md text-sm transition-colors",
                  pathname.startsWith(l.href)
                    ? "text-foreground font-medium"
                    : "text-muted-foreground hover:text-foreground"
                )}>
                {l.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-1">
            {/* Theme toggle */}
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="p-2 rounded-md text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Toggle theme"
            >
              <Sun className="h-4 w-4 dark:hidden" />
              <Moon className="h-4 w-4 hidden dark:block" />
            </button>

            {/* Search — icon on mobile, full button on desktop */}
            <SearchTrigger />

            {/* Sign in */}
            <div className="hidden md:block">
              <SignInButton />
            </div>

            {/* Hamburger — mobile only */}
            <button
              onClick={() => setOpen(p => !p)}
              className="md:hidden p-2 rounded-md text-muted-foreground hover:text-foreground"
              aria-label="Menu"
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <div className={cn(
          "md:hidden overflow-hidden transition-all duration-300",
          open ? "max-h-72" : "max-h-0"
        )}>
          <nav className="border-t border-border/60 bg-background/95 backdrop-blur-xl px-5 py-4 flex flex-col gap-1">
            {links.map((l) => (
              <Link key={l.href} href={l.href}
                className={cn(
                  "px-3 py-2.5 rounded-md text-sm transition-colors",
                  pathname.startsWith(l.href)
                    ? "text-foreground font-medium bg-accent/50"
                    : "text-muted-foreground hover:text-foreground"
                )}>
                {l.label}
              </Link>
            ))}
            <div className="mt-3 pt-3 border-t border-border/40 flex items-center gap-2">
              <SignInButton />
            </div>
          </nav>
        </div>
      </header>
      {/* Spacer: banner (36px) + navbar (56px) or just navbar */}
      <div className={offset ? "h-[92px]" : "h-14"} />
    </>
  );
}
