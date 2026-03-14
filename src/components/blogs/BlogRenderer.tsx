"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import { common, createLowlight } from "lowlight";
import Highlight from "@tiptap/extension-highlight";
import ImageExt from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import { Color } from "@tiptap/extension-color";
import { TextStyle } from "@tiptap/extension-text-style";

const lowlight = createLowlight(common);

interface BlogRendererProps {
  content: object;
}

export function BlogRenderer({ content }: BlogRendererProps) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({ codeBlock: false }),
      CodeBlockLowlight.configure({ lowlight }),
      Highlight.configure({ multicolor: true }),
      ImageExt.configure({ allowBase64: true }),
      Link.configure({ openOnClick: true }),
      TextStyle,
      Color,
    ],
    content,
    editable: false,
    immediatelyRender: false,
  });

  return (
    <EditorContent
      editor={editor}
      className="prose dark:prose-invert max-w-none
                 prose-headings:font-bold prose-headings:tracking-tight
                 prose-p:leading-relaxed prose-p:text-foreground/80
                 prose-a:text-foreground prose-a:underline prose-a:underline-offset-4
                 prose-code:font-mono prose-code:text-sm prose-code:bg-muted prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded
                 prose-pre:bg-[hsl(240,3.7%,10%)] prose-pre:border prose-pre:border-border prose-pre:rounded-xl
                 prose-blockquote:border-l-4 prose-blockquote:border-border prose-blockquote:text-muted-foreground
                 prose-img:rounded-xl prose-img:border prose-img:border-border
                 prose-hr:border-border"
    />
  );
}
