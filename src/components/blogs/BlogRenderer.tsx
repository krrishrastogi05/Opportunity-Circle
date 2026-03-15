"use client";

import { generateHTML } from "@tiptap/core";
import StarterKit from "@tiptap/starter-kit";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import { common, createLowlight } from "lowlight";
import Highlight from "@tiptap/extension-highlight";
import ImageExt from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import FontFamily from "@tiptap/extension-font-family";
import { Color } from "@tiptap/extension-color";
import { TextStyle } from "@tiptap/extension-text-style";
import { useMemo } from "react";

const lowlight = createLowlight(common);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const extensions: any[] = [
  StarterKit.configure({ codeBlock: false }),
  CodeBlockLowlight.configure({ lowlight }),
  Highlight.configure({ multicolor: true }),
  ImageExt.configure({ allowBase64: true }),
  Link.configure({ openOnClick: true }),
  Underline,
  TextAlign.configure({ types: ["heading", "paragraph"] }),
  TextStyle,
  Color,
  FontFamily,
];

interface BlogRendererProps {
  content: object;
}

export function BlogRenderer({ content }: BlogRendererProps) {
  const html = useMemo(() => {
    if (!content || Object.keys(content).length === 0) return "";
    try {
      return generateHTML(content as Parameters<typeof generateHTML>[0], extensions);
    } catch {
      return "";
    }
  }, [content]);

  if (!html) {
    return (
      <p className="text-muted-foreground italic text-sm">
        No content yet — edit this post to add content.
      </p>
    );
  }

  return (
    <div
      className="prose dark:prose-invert max-w-none
                 prose-headings:font-bold prose-headings:tracking-tight
                 prose-p:leading-relaxed prose-p:text-foreground/80
                 prose-a:text-foreground prose-a:underline prose-a:underline-offset-4
                 prose-code:font-mono prose-code:text-sm prose-code:bg-muted prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded
                 prose-pre:bg-[hsl(240,3.7%,10%)] prose-pre:border prose-pre:border-border prose-pre:rounded-xl
                 prose-blockquote:border-l-4 prose-blockquote:border-border prose-blockquote:text-muted-foreground
                 prose-img:rounded-xl prose-img:border prose-img:border-border
                 prose-hr:border-border"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
