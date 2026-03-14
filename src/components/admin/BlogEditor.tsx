"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import type { Editor } from "@tiptap/react";
import type { JSONContent } from "@tiptap/core";
import StarterKit from "@tiptap/starter-kit";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import Highlight from "@tiptap/extension-highlight";
import ImageExt from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import { TextStyle } from "@tiptap/extension-text-style";
import { Color } from "@tiptap/extension-color";
import FontFamily from "@tiptap/extension-font-family";
import Placeholder from "@tiptap/extension-placeholder";
import { common, createLowlight } from "lowlight";
import { useRef, useCallback } from "react";
import { cn } from "@/lib/utils";
import {
  Bold, Italic, Underline as UnderlineIcon, Strikethrough,
  Code, AlignLeft, AlignCenter, AlignRight,
  List, ListOrdered, Quote, Minus, Image as ImageIcon,
  Link as LinkIcon, Heading1, Heading2, Heading3,
  Highlighter, Undo, Redo, Type,
} from "lucide-react";

const lowlight = createLowlight(common);

// Fonts available in the toolbar
const FONTS = [
  { label: "Default",   value: "" },
  { label: "Inter",     value: "Inter, sans-serif" },
  { label: "Georgia",   value: "Georgia, serif" },
  { label: "Mono",      value: "ui-monospace, monospace" },
  { label: "Playfair",  value: "'Playfair Display', serif" },
  { label: "Space Gro", value: "'Space Grotesk', sans-serif" },
];

// ── Toolbar button helper ─────────────────────────────────────────────────────
function ToolBtn({
  onClick, active, disabled, title, children,
}: {
  onClick: () => void;
  active?: boolean;
  disabled?: boolean;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onMouseDown={(e) => { e.preventDefault(); onClick(); }}
      disabled={disabled}
      title={title}
      className={cn(
        "h-7 w-7 flex items-center justify-center rounded text-sm transition-colors",
        active
          ? "bg-foreground text-background"
          : "text-muted-foreground hover:bg-accent hover:text-foreground",
        disabled && "opacity-30 pointer-events-none"
      )}
    >
      {children}
    </button>
  );
}

function Divider() {
  return <div className="w-px h-5 bg-border mx-0.5 shrink-0" />;
}

// ── Toolbar ───────────────────────────────────────────────────────────────────
function Toolbar({ editor, onImageUpload }: { editor: Editor; onImageUpload: () => void }) {
  const currentFont = editor.getAttributes("textStyle").fontFamily ?? "";

  function setLink() {
    const url = window.prompt("Enter URL", editor.getAttributes("link").href ?? "https://");
    if (url === null) return;
    if (url === "") { editor.chain().focus().unsetLink().run(); return; }
    editor.chain().focus().setLink({ href: url }).run();
  }

  function insertImage() {
    const url = window.prompt("Image URL (or click Upload button instead)");
    if (url) editor.chain().focus().setImage({ src: url }).run();
  }

  return (
    <div className="flex flex-wrap items-center gap-0.5 px-3 py-2 border-b border-border bg-muted/30">
      {/* Undo / Redo */}
      <ToolBtn onClick={() => editor.chain().focus().undo().run()} title="Undo" disabled={!editor.can().undo()}>
        <Undo className="h-3.5 w-3.5" />
      </ToolBtn>
      <ToolBtn onClick={() => editor.chain().focus().redo().run()} title="Redo" disabled={!editor.can().redo()}>
        <Redo className="h-3.5 w-3.5" />
      </ToolBtn>

      <Divider />

      {/* Font family */}
      <select
        value={currentFont}
        onChange={(e) => {
          const val = e.target.value;
          if (val === "") editor.chain().focus().unsetFontFamily().run();
          else editor.chain().focus().setFontFamily(val).run();
        }}
        className="h-7 text-xs bg-transparent border border-border rounded px-1.5 text-muted-foreground hover:text-foreground focus:outline-none"
        title="Font family"
      >
        {FONTS.map((f) => (
          <option key={f.value} value={f.value} style={{ fontFamily: f.value || undefined }}>
            {f.label}
          </option>
        ))}
      </select>

      <Divider />

      {/* Headings */}
      <ToolBtn onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        active={editor.isActive("heading", { level: 1 })} title="Heading 1">
        <Heading1 className="h-3.5 w-3.5" />
      </ToolBtn>
      <ToolBtn onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        active={editor.isActive("heading", { level: 2 })} title="Heading 2">
        <Heading2 className="h-3.5 w-3.5" />
      </ToolBtn>
      <ToolBtn onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        active={editor.isActive("heading", { level: 3 })} title="Heading 3">
        <Heading3 className="h-3.5 w-3.5" />
      </ToolBtn>
      <ToolBtn onClick={() => editor.chain().focus().setParagraph().run()}
        active={editor.isActive("paragraph")} title="Paragraph">
        <Type className="h-3.5 w-3.5" />
      </ToolBtn>

      <Divider />

      {/* Inline formatting */}
      <ToolBtn onClick={() => editor.chain().focus().toggleBold().run()}
        active={editor.isActive("bold")} title="Bold">
        <Bold className="h-3.5 w-3.5" />
      </ToolBtn>
      <ToolBtn onClick={() => editor.chain().focus().toggleItalic().run()}
        active={editor.isActive("italic")} title="Italic">
        <Italic className="h-3.5 w-3.5" />
      </ToolBtn>
      <ToolBtn onClick={() => editor.chain().focus().toggleUnderline().run()}
        active={editor.isActive("underline")} title="Underline">
        <UnderlineIcon className="h-3.5 w-3.5" />
      </ToolBtn>
      <ToolBtn onClick={() => editor.chain().focus().toggleStrike().run()}
        active={editor.isActive("strike")} title="Strikethrough">
        <Strikethrough className="h-3.5 w-3.5" />
      </ToolBtn>
      <ToolBtn onClick={() => editor.chain().focus().toggleCode().run()}
        active={editor.isActive("code")} title="Inline code">
        <Code className="h-3.5 w-3.5" />
      </ToolBtn>
      <ToolBtn onClick={() => editor.chain().focus().toggleHighlight().run()}
        active={editor.isActive("highlight")} title="Highlight">
        <Highlighter className="h-3.5 w-3.5" />
      </ToolBtn>

      <Divider />

      {/* Text colour */}
      <label title="Text colour" className="h-7 w-7 flex items-center justify-center rounded hover:bg-accent cursor-pointer">
        <input
          type="color"
          defaultValue="#ffffff"
          onChange={(e) => editor.chain().focus().setColor(e.target.value).run()}
          className="sr-only"
        />
        <span className="text-xs font-bold" style={{ color: editor.getAttributes("textStyle").color ?? "currentColor" }}>A</span>
      </label>

      <Divider />

      {/* Alignment */}
      <ToolBtn onClick={() => editor.chain().focus().setTextAlign("left").run()}
        active={editor.isActive({ textAlign: "left" })} title="Align left">
        <AlignLeft className="h-3.5 w-3.5" />
      </ToolBtn>
      <ToolBtn onClick={() => editor.chain().focus().setTextAlign("center").run()}
        active={editor.isActive({ textAlign: "center" })} title="Align center">
        <AlignCenter className="h-3.5 w-3.5" />
      </ToolBtn>
      <ToolBtn onClick={() => editor.chain().focus().setTextAlign("right").run()}
        active={editor.isActive({ textAlign: "right" })} title="Align right">
        <AlignRight className="h-3.5 w-3.5" />
      </ToolBtn>

      <Divider />

      {/* Lists */}
      <ToolBtn onClick={() => editor.chain().focus().toggleBulletList().run()}
        active={editor.isActive("bulletList")} title="Bullet list">
        <List className="h-3.5 w-3.5" />
      </ToolBtn>
      <ToolBtn onClick={() => editor.chain().focus().toggleOrderedList().run()}
        active={editor.isActive("orderedList")} title="Numbered list">
        <ListOrdered className="h-3.5 w-3.5" />
      </ToolBtn>
      <ToolBtn onClick={() => editor.chain().focus().toggleBlockquote().run()}
        active={editor.isActive("blockquote")} title="Blockquote">
        <Quote className="h-3.5 w-3.5" />
      </ToolBtn>
      <ToolBtn onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        active={editor.isActive("codeBlock")} title="Code block">
        <Code className="h-3.5 w-3.5" />
      </ToolBtn>
      <ToolBtn onClick={() => editor.chain().focus().setHorizontalRule().run()} title="Divider">
        <Minus className="h-3.5 w-3.5" />
      </ToolBtn>

      <Divider />

      {/* Link */}
      <ToolBtn onClick={setLink} active={editor.isActive("link")} title="Link">
        <LinkIcon className="h-3.5 w-3.5" />
      </ToolBtn>

      {/* Image URL */}
      <ToolBtn onClick={insertImage} title="Insert image by URL">
        <ImageIcon className="h-3.5 w-3.5" />
      </ToolBtn>

      {/* Image file upload */}
      <label
        title="Upload image file"
        className="h-7 px-2 flex items-center gap-1 rounded text-xs text-muted-foreground hover:bg-accent hover:text-foreground cursor-pointer transition-colors"
      >
        <input
          type="file"
          accept="image/*"
          className="sr-only"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (!file) return;
            const form = new FormData();
            form.append("file", file);
            fetch("/api/upload-image", { method: "POST", body: form })
              .then((r) => r.json())
              .then((d) => {
                if (d.url) editor.chain().focus().setImage({ src: d.url }).run();
              })
              .catch(() => {
                // Fallback: embed as base64
                const reader = new FileReader();
                reader.onload = (ev) => {
                  const src = ev.target?.result as string;
                  if (src) editor.chain().focus().setImage({ src }).run();
                };
                reader.readAsDataURL(file);
              });
            e.target.value = "";
          }}
        />
        Upload
      </label>
    </div>
  );
}

// ── BlogEditor ────────────────────────────────────────────────────────────────
interface BlogEditorProps {
  initialContent?: JSONContent;
  onChange: (content: JSONContent) => void;
}

export function BlogEditor({ initialContent, onChange }: BlogEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({ codeBlock: false }),
      CodeBlockLowlight.configure({ lowlight }),
      Highlight.configure({ multicolor: true }),
      ImageExt.configure({ allowBase64: true }),
      Link.configure({ openOnClick: false }),
      Underline,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      TextStyle,
      Color,
      FontFamily,
      Placeholder.configure({ placeholder: "Start writing your post here…" }),
    ],
    content: initialContent ?? { type: "doc", content: [{ type: "paragraph" }] },
    immediatelyRender: false,
    onUpdate: ({ editor }) => onChange(editor.getJSON() as JSONContent),
  });

  const uploadRef = useRef<() => void>(() => {});
  const handleUpload = useCallback(() => uploadRef.current?.(), []);

  if (!editor) return <div className="h-96 animate-pulse bg-muted rounded-xl" />;

  return (
    <div className="border border-border rounded-xl overflow-hidden bg-background">
      <Toolbar editor={editor} onImageUpload={handleUpload} />
      <EditorContent
        editor={editor}
        className="min-h-[520px]"
        style={{ fontFamily: "inherit" }}
      />
      <style>{`
        .tiptap { padding: 1.5rem; min-height: 520px; outline: none; }
        .tiptap p.is-editor-empty:first-child::before {
          content: attr(data-placeholder);
          float: left; height: 0;
          color: hsl(var(--muted-foreground));
          pointer-events: none;
        }
        .tiptap h1 { font-size: 2rem; font-weight: 700; margin: 1.5rem 0 0.5rem; line-height: 1.2; }
        .tiptap h2 { font-size: 1.5rem; font-weight: 700; margin: 1.25rem 0 0.5rem; }
        .tiptap h3 { font-size: 1.25rem; font-weight: 600; margin: 1rem 0 0.4rem; }
        .tiptap p  { margin: 0.5rem 0; line-height: 1.75; color: hsl(var(--foreground)/0.85); }
        .tiptap ul, .tiptap ol { padding-left: 1.5rem; margin: 0.75rem 0; }
        .tiptap li { margin: 0.25rem 0; line-height: 1.7; }
        .tiptap blockquote { border-left: 3px solid hsl(var(--border)); padding-left: 1rem; margin: 1rem 0; color: hsl(var(--muted-foreground)); }
        .tiptap code { font-family: ui-monospace, monospace; font-size: 0.875em; background: hsl(var(--muted)); padding: 0.2em 0.4em; border-radius: 4px; }
        .tiptap pre { background: hsl(240 3.7% 10%); border: 1px solid hsl(var(--border)); border-radius: 0.75rem; padding: 1rem; overflow-x: auto; margin: 1rem 0; }
        .tiptap pre code { background: transparent; padding: 0; font-size: 0.875rem; }
        .tiptap img { max-width: 100%; border-radius: 0.75rem; border: 1px solid hsl(var(--border)); margin: 1rem 0; }
        .tiptap hr { border: none; border-top: 1px solid hsl(var(--border)); margin: 2rem 0; }
        .tiptap a { color: hsl(var(--foreground)); text-decoration: underline; text-underline-offset: 3px; }
        .tiptap mark { background: hsl(47 96% 53% / 0.3); border-radius: 2px; padding: 0.1em 0.2em; }
      `}</style>
    </div>
  );
}
