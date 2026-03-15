"use client";

import { useState } from "react";
import Link from "next/link";
import { toast } from "sonner";
import { formatDateShort } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Pencil, Trash2, Plus, Eye, EyeOff } from "lucide-react";

interface Blog {
  id: string;
  title: string;
  slug: string;
  published: boolean;
  visibility: string;
  category: string;
  tags: string[];
  readTime: number | null;
  createdAt: Date;
  publishedAt: Date | null;
}

export function BlogList({ initialBlogs }: { initialBlogs: Blog[] }) {
  const [blogs, setBlogs] = useState(initialBlogs);
  const [loadingId, setLoadingId] = useState<string | null>(null);

  async function togglePublished(blog: Blog) {
    setLoadingId(blog.id);
    try {
      const res = await fetch(`/api/blogs/${blog.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ visibility: blog.visibility === "PUBLIC" ? "PRIVATE" : "PUBLIC" }),
      });
      if (!res.ok) throw new Error("Failed");
      const updated = await res.json();
      setBlogs((prev) => prev.map((b) => (b.id === blog.id ? { ...b, published: updated.published } : b)));
      toast.success(updated.published ? "Post published!" : "Post unpublished");
    } catch {
      toast.error("Failed to update");
    } finally {
      setLoadingId(null);
    }
  }

  async function deleteBlog(id: string) {
    if (!confirm("Delete this post? This cannot be undone.")) return;
    setLoadingId(id);
    try {
      const res = await fetch(`/api/blogs/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed");
      setBlogs((prev) => prev.filter((b) => b.id !== id));
      toast.success("Post deleted");
    } catch {
      toast.error("Failed to delete");
    } finally {
      setLoadingId(null);
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Blog Posts</h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            {blogs.length} post{blogs.length !== 1 ? "s" : ""} total
          </p>
        </div>
        <Link href="/admin/blogs/new">
          <Button size="sm" className="gap-2">
            <Plus className="h-4 w-4" />
            New Post
          </Button>
        </Link>
      </div>

      {blogs.length === 0 ? (
        <div className="text-center py-16 border border-dashed border-border rounded-2xl">
          <p className="text-muted-foreground text-sm mb-3">No posts yet</p>
          <Link href="/admin/blogs/new">
            <Button variant="outline" size="sm" className="gap-2">
              <Plus className="h-4 w-4" />
              Write your first post
            </Button>
          </Link>
        </div>
      ) : (
        <div className="space-y-2">
          {blogs.map((blog) => (
            <div
              key={blog.id}
              className="flex items-center gap-4 p-4 rounded-xl border border-border bg-card hover:border-foreground/20 transition-colors"
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="font-medium text-sm line-clamp-1">{blog.title}</h3>
                  <Badge
                    variant={blog.published ? "default" : "secondary"}
                    className="text-xs flex-shrink-0"
                  >
                    {blog.published ? (
                      <><Eye className="h-2.5 w-2.5 mr-1" /> Published</>
                    ) : (
                      <><EyeOff className="h-2.5 w-2.5 mr-1" /> Draft</>
                    )}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground mt-0.5">
                  /blogs/{blog.slug} · {formatDateShort(blog.createdAt)}
                </p>
              </div>

              <div className="flex items-center gap-2 flex-shrink-0">
                {/* Publish toggle */}
                <Switch
                  checked={blog.published}
                  onCheckedChange={() => togglePublished(blog)}
                  disabled={loadingId === blog.id}
                  className="scale-75"
                />

                {/* Edit */}
                <Link href={`/admin/blogs/${blog.id}/edit`}>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <Pencil className="h-3.5 w-3.5" />
                  </Button>
                </Link>

                {/* Delete */}
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                  onClick={() => deleteBlog(blog.id)}
                  disabled={loadingId === blog.id}
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
