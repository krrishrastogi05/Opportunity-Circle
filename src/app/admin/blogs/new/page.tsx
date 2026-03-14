import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { BlogForm } from "@/components/admin/BlogForm";

export const metadata: Metadata = { title: "New Post" };

export default function NewBlogPage() {
  return (
    <div>
      <div className="mb-6">
        <Link
          href="/admin"
          className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-4"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Back to dashboard
        </Link>
        <h1 className="text-2xl font-bold">New Post</h1>
      </div>
      <BlogForm />
    </div>
  );
}
