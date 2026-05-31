"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { Bookmark } from "lucide-react";
import { toast } from "sonner";

export function BookmarkButton({
  opportunityId,
  initialSaved = false,
  size = "sm",
}: {
  opportunityId: string;
  initialSaved?: boolean;
  size?: "sm" | "md";
}) {
  const { data: session } = useSession();
  const [saved, setSaved] = useState(initialSaved);
  const [loading, setLoading] = useState(false);

  if (!session) return null;

  async function toggle(e: React.MouseEvent) {
    e.stopPropagation();
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/user/saved", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ opportunityId }),
      });
      if (res.ok) {
        const data = await res.json();
        setSaved(data.saved);
        toast.success(data.saved ? "Saved" : "Removed");
      }
    } catch {
      toast.error("Failed to save");
    } finally {
      setLoading(false);
    }
  }

  const iconSize = size === "sm" ? "h-3.5 w-3.5" : "h-4 w-4";
  const padding = size === "sm" ? "p-1.5" : "p-2";

  return (
    <button
      onClick={toggle}
      disabled={loading}
      className={`${padding} rounded-lg transition-colors shrink-0 ${
        saved
          ? "text-primary"
          : "text-muted-foreground/40 hover:text-muted-foreground"
      }`}
      title={saved ? "Remove from saved" : "Save opportunity"}
    >
      <Bookmark
        className={`${iconSize} transition-all ${saved ? "fill-current" : ""}`}
      />
    </button>
  );
}
