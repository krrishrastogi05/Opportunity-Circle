"use client";

import { useState } from "react";
import { BlogCard } from "./BlogCard";
import { cn } from "@/lib/utils";

type Blog = {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  coverImage: string | null;
  tags: string[];
  category: string;
  readTime: number | null;
  publishedAt: Date | null;
};

export function BlogTabs({
  technical,
  general,
}: {
  technical: Blog[];
  general: Blog[];
}) {
  const [tab, setTab] = useState<"technical" | "general">("technical");
  const blogs = tab === "technical" ? technical : general;

  return (
    <div>
      {/* Tabs */}
      <div className="flex gap-1 mb-8 border-b border-border">
        {(["technical", "general"] as const).map((t) => {
          const count = t === "technical" ? technical.length : general.length;
          return (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={cn(
                "px-4 py-2.5 text-sm font-medium -mb-px border-b-2 transition-colors capitalize flex items-center gap-1.5",
                tab === t
                  ? "border-foreground text-foreground"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              )}
            >
              {t === "technical" ? "⚙️" : "✍️"} {t.charAt(0).toUpperCase() + t.slice(1)}
              <span className={cn(
                "text-[10px] px-1.5 py-0.5 rounded-full",
                tab === t ? "bg-foreground text-background" : "bg-muted text-muted-foreground"
              )}>
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Posts */}
      {blogs.length === 0 ? (
        <div className="text-center py-16 text-muted-foreground">
          <p className="text-4xl mb-3">{tab === "technical" ? "⚙️" : "✍️"}</p>
          <p className="font-medium">No {tab} posts yet.</p>
          <p className="text-sm mt-1">Check back soon — drops incoming.</p>
        </div>
      ) : (
        <div>
          {blogs.map((blog) => (
            <BlogCard key={blog.id} blog={blog} />
          ))}
        </div>
      )}
    </div>
  );
}
