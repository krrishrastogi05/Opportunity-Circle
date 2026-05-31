"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { LogIn, User as UserIcon, Bookmark, LogOut, ChevronDown, AlertCircle } from "lucide-react";

export function SignInButton() {
  const { data: session, status } = useSession();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  if (status === "loading") {
    return <div className="h-8 w-8 rounded-full bg-muted animate-pulse" />;
  }

  if (!session?.user) {
    return (
      <button
        onClick={() => signIn("google")}
        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium border border-border/60 text-muted-foreground hover:text-foreground hover:border-border transition-colors"
      >
        <LogIn className="h-3.5 w-3.5" />
        Sign in
      </button>
    );
  }

  const user = session.user as {
    name?: string | null;
    email?: string | null;
    image?: string | null;
    branch?: string;
    graduationYear?: number;
    profileCompleted?: boolean;
  };

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((p) => !p)}
        className="flex items-center gap-1.5 rounded-full hover:ring-2 hover:ring-border transition-all"
      >
        {user.image ? (
          <Image
            src={user.image}
            alt={user.name ?? "User"}
            width={32}
            height={32}
            className="rounded-full"
          />
        ) : (
          <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-sm font-semibold text-primary">
            {user.name?.[0] ?? "?"}
          </div>
        )}
        <ChevronDown className="h-3 w-3 text-muted-foreground" />
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-64 rounded-xl border border-border bg-card shadow-lg z-50 overflow-hidden">
          {/* User info */}
          <div className="px-4 py-3 border-b border-border">
            <p className="text-sm font-semibold truncate">
              {user.name ?? "User"}
            </p>
            <p className="text-xs text-muted-foreground truncate">
              {user.email}
            </p>
            {(user.branch || user.graduationYear) && (
              <p className="text-xs text-muted-foreground mt-1">
                {user.branch}
                {user.branch && user.graduationYear && " · "}
                {user.graduationYear && `Class of ${user.graduationYear}`}
              </p>
            )}
          </div>

          {/* Onboarding nudge */}
          {!user.profileCompleted && (
            <Link
              href="/onboarding"
              onClick={() => setOpen(false)}
              className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-amber-600 dark:text-amber-400 bg-amber-500/5 hover:bg-amber-500/10 transition-colors"
            >
              <AlertCircle className="h-4 w-4" />
              Complete your profile
            </Link>
          )}

          {/* Menu items */}
          <div className="py-1">
            <Link
              href="/profile"
              onClick={() => setOpen(false)}
              className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-muted-foreground hover:text-foreground hover:bg-accent/50 transition-colors"
            >
              <UserIcon className="h-4 w-4" />
              Profile & Settings
            </Link>
            <Link
              href="/saved"
              onClick={() => setOpen(false)}
              className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-muted-foreground hover:text-foreground hover:bg-accent/50 transition-colors"
            >
              <Bookmark className="h-4 w-4" />
              Saved Opportunities
            </Link>
            <button
              onClick={() => {
                setOpen(false);
                signOut();
              }}
              className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-muted-foreground hover:text-destructive hover:bg-accent/50 transition-colors"
            >
              <LogOut className="h-4 w-4" />
              Sign out
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
