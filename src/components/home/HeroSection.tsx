"use client";

import Image from "next/image";
import Link from "next/link";
import { MapPin, Clock, FileText, Github, Twitter, Linkedin } from "lucide-react";
import { useLocalTime } from "@/hooks/use-local-time";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export function HeroSection() {
  const time = useLocalTime();

  return (
    <section className="pt-28 pb-12 px-4 max-w-3xl mx-auto">
      <div className="flex items-start justify-between gap-6">
        {/* Text content */}
        <div className="flex-1 min-w-0">
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-3">
            Hi, I&apos;m Krrish
          </h1>
          <p className="text-xl text-muted-foreground mb-5">
            I build things that matter.
          </p>

          {/* Badges */}
          <div className="flex flex-wrap items-center gap-2 mb-6">
            <Badge variant="secondary" className="gap-1.5 px-3 py-1.5 text-sm font-normal">
              <MapPin className="h-3.5 w-3.5" />
              Ranchi, India
            </Badge>
            {time && (
              <Badge variant="secondary" className="gap-1.5 px-3 py-1.5 text-sm font-normal">
                <Clock className="h-3.5 w-3.5" />
                {time}
              </Badge>
            )}
            <Link href="/resume.pdf" target="_blank">
              <Badge
                variant="secondary"
                className="gap-1.5 px-3 py-1.5 text-sm font-normal cursor-pointer hover:bg-accent transition-colors"
              >
                <FileText className="h-3.5 w-3.5" />
                Resume
              </Badge>
            </Link>
          </div>

          {/* Social links */}
          <div className="flex items-center gap-2">
            <Link
              href="https://github.com/krrishrastogi05"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="ghost" size="sm" className="rounded-full gap-2 text-muted-foreground hover:text-foreground">
                <Github className="h-4 w-4" />
                GitHub
              </Button>
            </Link>
            <Link href="https://linkedin.com/in/krrishrastogi" target="_blank" rel="noopener noreferrer">
              <Button variant="ghost" size="sm" className="rounded-full gap-2 text-muted-foreground hover:text-foreground">
                <Linkedin className="h-4 w-4" />
                LinkedIn
              </Button>
            </Link>
            <Link href="https://twitter.com/krrishrastogi" target="_blank" rel="noopener noreferrer">
              <Button variant="ghost" size="sm" className="rounded-full gap-2 text-muted-foreground hover:text-foreground">
                <Twitter className="h-4 w-4" />
                Twitter
              </Button>
            </Link>
          </div>
        </div>

        {/* Profile image */}
        <div className="flex-shrink-0">
          <div className="w-28 h-28 md:w-32 md:h-32 rounded-2xl overflow-hidden border border-border bg-muted">
            {/* TODO: replace with actual profile photo */}
            <Image
              src="/placeholder/avatar.png"
              alt="Krrish Rastogi"
              width={128}
              height={128}
              className="w-full h-full object-cover"
              priority
            />
          </div>
        </div>
      </div>

      {/* About snippet */}
      <div className="mt-8 space-y-3 text-[15px] leading-relaxed text-muted-foreground">
        <p>
          B.Tech student at{" "}
          <Link href="https://bitmesra.ac.in" target="_blank" className="text-foreground underline underline-offset-4">
            BIT Mesra
          </Link>{" "}
          specialising in AI &amp; ML — building backends, breaking things, and shipping stuff that works.
          I care about clean systems, fast APIs, and writing code that doesn&apos;t make future-me cry.
        </p>
        <p>
          LeetCode Knight (1900+), SIH&apos;25 National Winner, Amazon HackOn&apos;25 top 75.
          When I&apos;m not grinding problems or shipping side projects, I&apos;m reading, exploring open source,
          or procrastinating in the{" "}
          <span className="text-foreground font-medium">hostel</span> with a cup of chai.
        </p>
      </div>
    </section>
  );
}
