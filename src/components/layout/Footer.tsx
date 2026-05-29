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
            A career awareness map. Not a job board.
            All information is for general awareness only.
          </p>
        </div>

        {/* Links */}
        <nav className="flex flex-wrap gap-x-6 gap-y-2">
          {[
            { href: "/companies",     label: "Companies" },
            { href: "/opportunities", label: "Opportunities" },
            { href: "/skills",        label: "Skills" },
            { href: "/guides",        label: "Guides" },
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
