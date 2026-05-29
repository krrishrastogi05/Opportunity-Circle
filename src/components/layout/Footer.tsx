import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-border/50 mt-20">
      <div className="max-w-5xl mx-auto px-5 py-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">

        {/* Brand */}
        <div>
          <Link href="/" className="text-sm font-semibold">
            Opportunity<span className="text-primary">Circle</span>
          </Link>
          <p className="mt-1.5 text-xs text-muted-foreground max-w-xs leading-relaxed">
            Built by a student, for students. A career intelligence map — not a job board.
          </p>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 mt-2 text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            <svg viewBox="0 0 16 16" width="13" height="13" fill="currentColor">
              <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z"/>
            </svg>
            Star on GitHub
          </a>
        </div>

        {/* Links */}
        <nav className="flex flex-wrap gap-x-6 gap-y-2">
          {[
            { href: "/companies",     label: "Companies" },
            { href: "/opportunities", label: "Opportunities" },
            { href: "/open-source",   label: "Open Source" },
            { href: "/about",         label: "About" },
          ].map((l) => (
            <Link key={l.href} href={l.href}
              className="text-xs text-muted-foreground hover:text-foreground transition-colors">
              {l.label}
            </Link>
          ))}
        </nav>
      </div>

      <div className="max-w-5xl mx-auto px-5 pb-6 text-[11px] text-muted-foreground/40 flex items-center justify-between">
        <span>© {new Date().getFullYear()} OpportunityCircle</span>
        <span>Not affiliated with any company listed.</span>
      </div>
    </footer>
  );
}
