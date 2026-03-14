"use client";

import { signOut } from "next-auth/react";
import { LogOut } from "lucide-react";

export function AdminHeader() {
  return (
    <div className="border-b border-border bg-card">
      <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
        <span className="font-semibold text-sm">Admin Dashboard</span>
        <div className="flex items-center gap-4">
          <a
            href="/"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            ← Back to site
          </a>
          <button
            onClick={() => signOut({ callbackUrl: "/admin/login" })}
            className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-destructive transition-colors"
          >
            <LogOut className="h-3.5 w-3.5" />
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
