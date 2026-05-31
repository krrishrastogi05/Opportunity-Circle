"use client";

import { useState } from "react";
import Link from "next/link";
import { toast } from "sonner";
import { Plus, Pencil, Trash2, Eye, EyeOff, Send } from "lucide-react";

interface Opportunity {
  _id: string;
  title: string;
  slug: string;
  category: string;
  published: boolean;
  featured: boolean;
  closesAt?: string;
  createdAt: string;
}

export function OpportunityList({
  initialOpportunities,
}: {
  initialOpportunities: Opportunity[];
}) {
  const [opportunities, setOpportunities] = useState(initialOpportunities);

  async function togglePublish(id: string, published: boolean) {
    const res = await fetch(`/api/opportunities/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ published: !published }),
    });
    if (res.ok) {
      setOpportunities((prev) =>
        prev.map((o) =>
          o._id === id ? { ...o, published: !published } : o
        )
      );
      toast.success(published ? "Unpublished" : "Published");
    } else {
      toast.error("Failed to update");
    }
  }

  async function handleSendAlert(id: string, title: string) {
    if (!confirm(`Send alert email for "${title}" to all subscribers?`)) return;
    const res = await fetch("/api/email/send-alert", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ opportunityId: id }),
    });
    if (res.ok) {
      const data = await res.json();
      toast.success(`Alert sent to ${data.sent} subscribers`);
    } else {
      toast.error("Failed to send alert");
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Are you sure you want to delete this opportunity?")) return;
    const res = await fetch(`/api/opportunities/${id}`, { method: "DELETE" });
    if (res.ok) {
      setOpportunities((prev) => prev.filter((o) => o._id !== id));
      toast.success("Deleted");
    } else {
      toast.error("Failed to delete");
    }
  }

  const categoryColors: Record<string, string> = {
    hackathon: "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300",
    open_source: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
    internship: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
    competition: "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300",
    fellowship: "bg-pink-100 text-pink-800 dark:bg-pink-900/30 dark:text-pink-300",
    other: "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300",
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Opportunities</h1>
        <Link
          href="/admin/opportunities/new"
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-md text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
        >
          <Plus className="h-4 w-4" />
          New Opportunity
        </Link>
      </div>

      {opportunities.length === 0 ? (
        <p className="text-muted-foreground text-center py-12">
          No opportunities yet. Create your first one!
        </p>
      ) : (
        <div className="space-y-3">
          {opportunities.map((opp) => (
            <div
              key={opp._id}
              className="flex items-center justify-between p-4 rounded-lg border border-border bg-card"
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-medium truncate">{opp.title}</h3>
                  <span
                    className={`text-xs px-2 py-0.5 rounded-full ${
                      categoryColors[opp.category] || categoryColors.other
                    }`}
                  >
                    {opp.category.replace("_", " ")}
                  </span>
                  {!opp.published && (
                    <span className="text-xs px-2 py-0.5 rounded-full bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300">
                      draft
                    </span>
                  )}
                </div>
                <p className="text-xs text-muted-foreground">
                  {opp.closesAt
                    ? `Closes: ${new Date(opp.closesAt).toLocaleDateString()}`
                    : "No deadline set"}
                </p>
              </div>

              <div className="flex items-center gap-1">
                {opp.published && (
                  <button
                    onClick={() => handleSendAlert(opp._id, opp.title)}
                    className="p-2 rounded-md text-muted-foreground hover:text-primary transition-colors"
                    title="Send alert to subscribers"
                  >
                    <Send className="h-4 w-4" />
                  </button>
                )}
                <button
                  onClick={() => togglePublish(opp._id, opp.published)}
                  className="p-2 rounded-md text-muted-foreground hover:text-foreground transition-colors"
                  title={opp.published ? "Unpublish" : "Publish"}
                >
                  {opp.published ? (
                    <Eye className="h-4 w-4" />
                  ) : (
                    <EyeOff className="h-4 w-4" />
                  )}
                </button>
                <Link
                  href={`/admin/opportunities/${opp._id}`}
                  className="p-2 rounded-md text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Pencil className="h-4 w-4" />
                </Link>
                <button
                  onClick={() => handleDelete(opp._id)}
                  className="p-2 rounded-md text-muted-foreground hover:text-destructive transition-colors"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
