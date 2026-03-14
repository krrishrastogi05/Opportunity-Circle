export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background">
      <div className="border-b border-border bg-card">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
          <span className="font-semibold text-sm">Admin Dashboard</span>
          <a href="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            ← Back to site
          </a>
        </div>
      </div>
      <main className="max-w-5xl mx-auto px-4 py-8">{children}</main>
    </div>
  );
}
