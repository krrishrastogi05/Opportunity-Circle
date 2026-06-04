"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Info, X, ArrowRight } from "lucide-react";

/**
 * Small, reusable notice box. Shows once per browser (per `storageKey`)
 * and can be dismissed. Reuse for any short announcement.
 */
export function DismissibleNotice({
  storageKey,
  title,
  body,
  href,
  linkText = "View details",
  enabled = true,
}: {
  storageKey: string;
  title: string;
  body: string;
  href?: string;
  linkText?: string;
  enabled?: boolean;
}) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (!enabled) return;
    if (localStorage.getItem(storageKey) === "1") return;
    setShow(true);
  }, [enabled, storageKey]);

  function dismiss() {
    localStorage.setItem(storageKey, "1");
    setShow(false);
  }

  if (!show) return null;

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 mt-6">
      <div className="relative rounded-2xl border border-primary/30 bg-gradient-to-br from-primary/[0.07] to-transparent p-4 sm:p-5">
        <button
          onClick={dismiss}
          aria-label="Dismiss"
          className="absolute top-3 right-3 p-1 rounded-md text-muted-foreground hover:text-foreground transition-colors"
        >
          <X className="h-4 w-4" />
        </button>
        <div className="flex items-start gap-3 pr-6">
          <div className="w-8 h-8 rounded-lg bg-primary/15 flex items-center justify-center shrink-0">
            <Info className="h-4 w-4 text-primary" />
          </div>
          <div className="min-w-0">
            <p className="text-sm font-semibold text-foreground">{title}</p>
            <p className="text-xs text-muted-foreground leading-relaxed mt-0.5">
              {body}
            </p>
            {href && (
              <Link
                href={href}
                className="inline-flex items-center gap-1 mt-2 text-xs font-medium text-primary hover:underline"
              >
                {linkText}
                <ArrowRight className="h-3 w-3" />
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
