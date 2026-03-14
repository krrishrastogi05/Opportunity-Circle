import Link from "next/link";
import Image from "next/image";
import { Clock } from "lucide-react";
import { formatDateShort } from "@/lib/utils";
import { TagBadge } from "./TagBadge";

interface BlogCardProps {
  blog: {
    id: string;
    title: string;
    slug: string;
    excerpt: string | null;
    coverImage: string | null;
    tags: string[];
    readTime: number | null;
    publishedAt: Date | null;
  };
}

export function BlogCard({ blog }: BlogCardProps) {
  return (
    <Link
      href={`/blogs/${blog.slug}`}
      className="flex items-start gap-4 py-5 border-b border-border group hover:bg-accent/20 transition-colors rounded-lg px-2 -mx-2"
    >
      {/* Cover image thumbnail */}
      {blog.coverImage && (
        <div className="w-16 h-16 rounded-lg overflow-hidden border border-border bg-muted flex-shrink-0">
          <Image
            src={blog.coverImage}
            alt={blog.title}
            width={64}
            height={64}
            className="w-full h-full object-cover"
          />
        </div>
      )}
      {!blog.coverImage && (
        <div className="w-16 h-16 rounded-lg border border-border bg-muted flex-shrink-0 flex items-center justify-center">
          <span className="text-2xl">📝</span>
        </div>
      )}

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-semibold text-sm group-hover:text-foreground transition-colors line-clamp-2">
            {blog.title}
          </h3>
          {blog.readTime && (
            <span className="text-xs text-muted-foreground flex items-center gap-1 flex-shrink-0">
              <Clock className="h-3 w-3" />
              {blog.readTime} min
            </span>
          )}
        </div>

        {blog.publishedAt && (
          <p className="text-xs text-muted-foreground mt-0.5">
            {formatDateShort(blog.publishedAt)}
          </p>
        )}

        {blog.excerpt && (
          <p className="text-xs text-muted-foreground/80 mt-1 line-clamp-2 leading-relaxed">
            {blog.excerpt}
          </p>
        )}

        {blog.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-2">
            {blog.tags.slice(0, 3).map((tag) => (
              <TagBadge key={tag} tag={tag} />
            ))}
          </div>
        )}
      </div>
    </Link>
  );
}
