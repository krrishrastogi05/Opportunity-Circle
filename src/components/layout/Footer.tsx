import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-border mt-24 py-8">
      <div className="max-w-3xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
        <p>© {new Date().getFullYear()} Krrish Rastogi. Built with Next.js.</p>
        <div className="flex items-center gap-4">
          <Link href="/blogs" className="hover:text-foreground transition-colors">
            Blogs
          </Link>
          <Link href="/reach" className="hover:text-foreground transition-colors">
            Contact
          </Link>
          <Link href="/admin" className="hover:text-foreground transition-colors">
            Admin
          </Link>
        </div>
      </div>
    </footer>
  );
}
