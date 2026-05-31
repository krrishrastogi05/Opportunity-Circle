"use client";

import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Bookmark, ExternalLink, Calendar, Trophy } from "lucide-react";
import { BookmarkButton } from "@/components/ui/BookmarkButton";

interface SavedOpportunity {
  _id: string;
  title: string;
  slug: string;
  category: string;
  organizer?: string;
  applicationUrl?: string;
  closesAt?: string;
  isPPIOffering: boolean;
  tags: string[];
  description: string;
}

export default function SavedPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [opportunities, setOpportunities] = useState<SavedOpportunity[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/signin");
    }
  }, [status, router]);

  useEffect(() => {
    if (session) {
      fetch("/api/user/saved")
        .then((r) => r.json())
        .then((data) => {
          if (Array.isArray(data)) setOpportunities(data);
          setLoading(false);
        })
        .catch(() => setLoading(false));
    }
  }, [session]);

  if (status === "loading" || loading) {
    return (
      <div className="max-w-3xl mx-auto px-4 pt-16 pb-24">
        <div className="h-8 w-48 bg-muted animate-pulse rounded mb-6" />
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-20 bg-muted animate-pulse rounded-xl"
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 pt-16 pb-24">
      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight mb-2">
          Saved Opportunities
        </h1>
        <p className="text-sm text-muted-foreground">
          Opportunities you&apos;ve bookmarked for later.
        </p>
      </div>

      {opportunities.length === 0 ? (
        <div className="text-center py-16">
          <Bookmark className="h-10 w-10 mx-auto text-muted-foreground/30 mb-4" />
          <p className="text-muted-foreground mb-2">No saved opportunities yet</p>
          <p className="text-sm text-muted-foreground/60 mb-6">
            Browse opportunities and click the bookmark icon to save them here.
          </p>
          <Link
            href="/opportunities"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-colors"
          >
            Browse Opportunities
          </Link>
        </div>
      ) : (
        <div className="space-y-3">
          {opportunities.map((opp) => (
            <div
              key={opp._id}
              className="flex items-center gap-3 p-4 rounded-xl border border-border bg-card hover:border-foreground/20 transition-colors"
            >
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <span className="text-sm font-semibold">{opp.title}</span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full border border-border text-muted-foreground">
                    {opp.category.replace("_", " ")}
                  </span>
                  {opp.isPPIOffering && (
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-foreground text-background font-semibold">
                      PPI
                    </span>
                  )}
                </div>
                <p className="text-xs text-muted-foreground line-clamp-1">
                  {opp.description}
                </p>
                <div className="flex items-center gap-3 mt-1.5">
                  {opp.organizer && (
                    <span className="text-[10px] text-muted-foreground">
                      <Trophy className="h-3 w-3 inline mr-0.5" />
                      {opp.organizer}
                    </span>
                  )}
                  {opp.closesAt && (
                    <span className="text-[10px] text-muted-foreground">
                      <Calendar className="h-3 w-3 inline mr-0.5" />
                      Closes{" "}
                      {new Date(opp.closesAt).toLocaleDateString("en-IN", {
                        month: "short",
                        day: "numeric",
                      })}
                    </span>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-1 shrink-0">
                {opp.applicationUrl && (
                  <a
                    href={opp.applicationUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <ExternalLink className="h-4 w-4" />
                  </a>
                )}
                <BookmarkButton
                  opportunityId={opp._id}
                  initialSaved={true}
                  size="md"
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
