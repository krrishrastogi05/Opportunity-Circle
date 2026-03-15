"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import dynamic from "next/dynamic";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Save, Globe, Lock, Link2, Copy, Check } from "lucide-react";
import { slugify, cn } from "@/lib/utils";

const BlogEditor = dynamic(
  () => import("./BlogEditor").then((m) => m.BlogEditor),
  { ssr: false, loading: () => <div className="h-96 animate-pulse bg-muted rounded-xl" /> }
);

type Visibility = "PUBLIC" | "PRIVATE" | "UNLISTED";
type Category   = "TECHNICAL" | "GENERAL";

interface BlogFormProps {
  initialData?: {
    id: string;
    title: string;
    slug: string;
    excerpt: string | null;
    coverImage: string | null;
    content: object;
    published: boolean;
    visibility?: string;
    category?: string;
    pin?: string | null;
    tags: string[];
  };
}

const VISIBILITY_OPTIONS: { value: Visibility; label: string; desc: string; icon: typeof Globe }[] = [
  { value: "PUBLIC",   label: "Public",   desc: "Visible to everyone",            icon: Globe },
  { value: "UNLISTED", label: "Unlisted", desc: "Only accessible via link + PIN", icon: Link2 },
  { value: "PRIVATE",  label: "Private",  desc: "Draft — only you can see it",    icon: Lock  },
];

export function BlogForm({ initialData }: BlogFormProps) {
  const router  = useRouter();
  const isEdit  = !!initialData;

  const [loading, setLoading]       = useState(false);
  const [copied, setCopied]         = useState(false);
  const [title, setTitle]           = useState(initialData?.title ?? "");
  const [slug, setSlug]             = useState(initialData?.slug ?? "");
  const [excerpt, setExcerpt]       = useState(initialData?.excerpt ?? "");
  const [coverImage, setCoverImage] = useState(initialData?.coverImage ?? "");
  const [tags, setTags]             = useState(initialData?.tags?.join(", ") ?? "");
  const [visibility, setVisibility] = useState<Visibility>(
    (initialData?.visibility as Visibility) ??
    (initialData?.published ? "PUBLIC" : "PRIVATE")
  );
  const [category, setCategory] = useState<Category>(
    (initialData?.category as Category) ?? "TECHNICAL"
  );
  const [pin] = useState<string | null>(initialData?.pin ?? null);
  const [content, setContent] = useState<object>(
    initialData?.content ?? { type: "doc", content: [{ type: "paragraph" }] }
  );

  function handleTitleChange(val: string) {
    setTitle(val);
    if (!isEdit) setSlug(slugify(val));
  }

  function copyPin() {
    if (pin) {
      navigator.clipboard.writeText(pin);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }

  async function handleSave() {
    if (!title.trim()) { toast.error("Title is required"); return; }
    setLoading(true);
    try {
      const body = {
        title: title.trim(),
        slug: slug.trim() || slugify(title),
        excerpt: excerpt.trim() || null,
        coverImage: coverImage.trim() || null,
        tags: tags.split(",").map((t) => t.trim()).filter(Boolean),
        visibility,
        category,
        content,
      };

      const url    = isEdit ? `/api/blogs/${initialData.id}` : "/api/blogs";
      const method = isEdit ? "PUT" : "POST";
      const res    = await fetch(url, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.message ?? "Failed to save");
      }

      const saved = await res.json();
      if (visibility === "UNLISTED" && saved.pin) {
        toast.success(`Saved! Access PIN: ${saved.pin}`, { duration: 10000 });
      } else {
        toast.success(isEdit ? "Post updated!" : "Post created!");
      }

      window.location.href = "/admin";
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-6">
      {/* Title */}
      <div>
        <Label htmlFor="title">Title</Label>
        <Input id="title" value={title} onChange={(e) => handleTitleChange(e.target.value)}
          placeholder="Your blog post title..." className="mt-1.5 text-lg font-medium" />
      </div>

      {/* Slug */}
      <div>
        <Label htmlFor="slug">Slug</Label>
        <Input id="slug" value={slug} onChange={(e) => setSlug(e.target.value)}
          placeholder="auto-generated-from-title" className="mt-1.5 font-mono text-sm" />
        <p className="text-xs text-muted-foreground mt-1">URL: /blogs/{slug || "your-slug-here"}</p>
      </div>

      {/* Category + Visibility */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {/* Category */}
        <div>
          <Label className="mb-2 block">Category</Label>
          <div className="flex gap-2">
            {(["TECHNICAL", "GENERAL"] as Category[]).map((cat) => (
              <button key={cat} type="button" onClick={() => setCategory(cat)}
                className={cn(
                  "flex-1 py-2.5 rounded-lg border text-sm font-medium transition-colors",
                  category === cat
                    ? "border-foreground bg-foreground text-background"
                    : "border-border bg-card text-muted-foreground hover:border-foreground/40"
                )}>
                {cat === "TECHNICAL" ? "⚙️ Technical" : "✍️ General"}
              </button>
            ))}
          </div>
        </div>

        {/* Visibility */}
        <div>
          <Label className="mb-2 block">Visibility</Label>
          <div className="flex gap-2">
            {VISIBILITY_OPTIONS.map(({ value, label, icon: Icon }) => (
              <button key={value} type="button" onClick={() => setVisibility(value)}
                className={cn(
                  "flex-1 py-2 px-1 rounded-lg border text-xs font-medium transition-colors flex flex-col items-center gap-1",
                  visibility === value
                    ? value === "PUBLIC"   ? "border-green-500  bg-green-500/10  text-green-400"
                    : value === "UNLISTED" ? "border-yellow-500 bg-yellow-500/10 text-yellow-400"
                    :                       "border-border      bg-muted         text-foreground"
                    : "border-border bg-card text-muted-foreground hover:border-foreground/30"
                )}>
                <Icon className="h-3.5 w-3.5" />
                {label}
              </button>
            ))}
          </div>
          <p className="text-xs text-muted-foreground mt-1.5">
            {VISIBILITY_OPTIONS.find(o => o.value === visibility)?.desc}
          </p>
        </div>
      </div>

      {/* PIN display — existing UNLISTED post */}
      {isEdit && visibility === "UNLISTED" && pin && (
        <div className="flex items-center justify-between p-4 rounded-xl border border-yellow-500/30 bg-yellow-500/5">
          <div>
            <p className="text-sm font-medium text-yellow-400">Access PIN</p>
            <p className="text-xs text-muted-foreground mt-0.5">Share this 4-digit PIN with readers</p>
          </div>
          <div className="flex items-center gap-3">
            <span className="font-mono text-2xl font-bold tracking-widest text-yellow-400">{pin}</span>
            <button type="button" onClick={copyPin}
              className="h-8 w-8 rounded-lg border border-border flex items-center justify-center hover:bg-accent transition-colors">
              {copied ? <Check className="h-3.5 w-3.5 text-green-400" /> : <Copy className="h-3.5 w-3.5" />}
            </button>
          </div>
        </div>
      )}

      {/* New UNLISTED info */}
      {!isEdit && visibility === "UNLISTED" && (
        <div className="p-4 rounded-xl border border-yellow-500/30 bg-yellow-500/5">
          <p className="text-sm text-yellow-400 font-medium">🔑 A 4-digit PIN will be auto-generated on save</p>
          <p className="text-xs text-muted-foreground mt-0.5">Share the link + PIN with anyone you want to read this.</p>
        </div>
      )}

      {/* Excerpt */}
      <div>
        <Label htmlFor="excerpt">Excerpt</Label>
        <Textarea id="excerpt" value={excerpt} onChange={(e) => setExcerpt(e.target.value)}
          placeholder="A brief description shown in the blog listing..." className="mt-1.5 resize-none" rows={2} />
      </div>

      {/* Cover image */}
      <div>
        <Label htmlFor="cover">Cover Image URL</Label>
        <Input id="cover" value={coverImage} onChange={(e) => setCoverImage(e.target.value)}
          placeholder="https://... or leave empty" className="mt-1.5" />
      </div>

      {/* Tags */}
      <div>
        <Label htmlFor="tags">Tags</Label>
        <Input id="tags" value={tags} onChange={(e) => setTags(e.target.value)}
          placeholder="Node.js, TypeScript, AI (comma separated)" className="mt-1.5" />
      </div>

      {/* Editor */}
      <div>
        <Label className="mb-1.5 block">Content</Label>
        <BlogEditor initialContent={content} onChange={setContent} />
      </div>

      {/* Save */}
      <div className="flex justify-end">
        <Button onClick={handleSave} disabled={loading} size="lg">
          {loading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Save className="h-4 w-4 mr-2" />}
          {isEdit ? "Update Post" : "Save Post"}
        </Button>
      </div>
    </div>
  );
}
