"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { Clock } from "lucide-react";
import { PinGate } from "./PinGate";
import { TagBadge } from "./TagBadge";
import { formatDate } from "@/lib/utils";

const BlogRenderer = dynamic(
  () => import("./BlogRenderer").then((m) => m.BlogRenderer),
  { ssr: false, loading: () => <div className="h-64 animate-pulse bg-muted rounded-xl" /> }
);

interface UnlistedBlogViewProps {
  slug: string;
}

export function UnlistedBlogView({ slug }: UnlistedBlogViewProps) {
  const [blog, setBlog] = useState<Record<string, unknown> | null>(null);

  if (!blog) {
    return <PinGate slug={slug} onUnlock={(data) => setBlog(data as Record<string, unknown>)} />;
  }

  return (
    <article className="max-w-3xl mx-auto px-4 pt-28 pb-16">
      <header className="mb-10">
        <div className="flex flex-wrap gap-1.5 mb-4">
          {(blog.tags as string[]).map((tag) => <TagBadge key={tag} tag={tag} />)}
        </div>
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight leading-snug mb-4">
          {blog.title as string}
        </h1>
        {blog.excerpt && (
          <p className="text-lg text-muted-foreground leading-relaxed mb-4">
            {blog.excerpt as string}
          </p>
        )}
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          {blog.publishedAt && <span>{formatDate(new Date(blog.publishedAt as string))}</span>}
          {blog.readTime && (
            <span className="flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" />
              {blog.readTime as number} min read
            </span>
          )}
        </div>
      </header>

      {blog.coverImage && (
        <div className="relative w-full h-64 md:h-80 rounded-2xl overflow-hidden border border-border mb-10 bg-muted">
          <Image src={blog.coverImage as string} alt={blog.title as string} fill className="object-cover" priority />
        </div>
      )}

      <BlogRenderer content={blog.content as object} />
    </article>
  );
}
