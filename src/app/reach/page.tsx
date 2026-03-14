import type { Metadata } from "next";
import Link from "next/link";
import { Github, Twitter, Linkedin, Mail, ExternalLink } from "lucide-react";

export const metadata: Metadata = {
  title: "Reach",
  description: "Get in touch with Krrish Rastogi — AI/ML student & backend engineer.",
};

const socials = [
  {
    name: "GitHub",
    handle: "@krrishrastogi05",
    href: "https://github.com/krrishrastogi05",
    icon: Github,
    description: "Code & projects",
    color: "hover:border-foreground/30",
  },
  {
    name: "LinkedIn",
    handle: "Krrish Rastogi",
    href: "https://linkedin.com/in/krrishrastogi",
    icon: Linkedin,
    description: "Professional stuff",
    color: "hover:border-[#0077B5]/40",
  },
  {
    name: "Twitter / X",
    handle: "@krrishrastogi",
    href: "https://twitter.com/krrishrastogi",
    icon: Twitter,
    description: "Thoughts & updates",
    color: "hover:border-[#1DA1F2]/40",
  },
  {
    name: "Email",
    handle: "krrishrastogi00@gmail.com",
    href: "mailto:krrishrastogi00@gmail.com",
    icon: Mail,
    description: "For collaborations",
    color: "hover:border-foreground/30",
  },
];

export default function ReachPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 pt-28 pb-16">
      <div className="mb-12">
        <h1 className="text-4xl font-bold tracking-tight mb-3">Reach</h1>
        <p className="text-muted-foreground text-[15px] max-w-md">
          Drop me a line, follow along, or just say hi. I&apos;m usually around.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {socials.map((social) => {
          const Icon = social.icon;
          return (
            <Link
              key={social.name}
              href={social.href}
              target={social.href.startsWith("mailto") ? undefined : "_blank"}
              rel="noopener noreferrer"
              className={`flex items-center gap-4 p-5 rounded-2xl border border-border bg-card transition-all group ${social.color}`}
            >
              <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center flex-shrink-0">
                <Icon className="h-5 w-5" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <span className="font-semibold text-sm">{social.name}</span>
                  <ExternalLink className="h-3.5 w-3.5 text-muted-foreground group-hover:text-foreground transition-colors flex-shrink-0" />
                </div>
                <p className="text-xs text-muted-foreground">{social.handle}</p>
                <p className="text-xs text-muted-foreground/60 mt-0.5">{social.description}</p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
