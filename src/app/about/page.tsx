import type { Metadata } from "next";
import Image from "next/image";
import { EducationTimeline } from "@/components/about/EducationTimeline";
import { HackathonTimeline } from "@/components/about/HackathonTimeline";
import { ExperienceTimeline } from "@/components/about/ExperienceTimeline";
import { achievements } from "@/data/hackathons";
import { Trophy } from "lucide-react";

export const metadata: Metadata = {
  title: "About",
  description: "Learn more about Krrish Rastogi — AI/ML student & backend engineer from BIT Mesra.",
};

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 pt-28 pb-16">
      {/* Hero */}
      <div className="mb-12">
        <h1 className="text-4xl font-bold tracking-tight mb-4">About</h1>
        <div className="space-y-3 text-[15px] leading-relaxed text-muted-foreground">
          <p>
            I&apos;m Krrish Rastogi — a B.Tech student at{" "}
            <span className="text-foreground font-medium">BIT Mesra</span> specialising
            in Artificial Intelligence &amp; Machine Learning. I build backends, ship open-source
            contributions, and take on competitive programming as a sport.
          </p>
          <p>
            My work spans real-time systems (WebSockets, event queues), AI/GenAI pipelines, and
            full-stack web apps. I&apos;ve interned as a Software Engineer, contributed to a{" "}
            <span className="text-foreground font-medium">United Nations</span> open-source project,
            and placed nationally in some of India&apos;s toughest hackathons.
          </p>
          <p>
            Outside engineering, I&apos;m a{" "}
            <span className="text-foreground font-medium">Student Alumni Relations Coordinator</span>{" "}
            at BIT Mesra — connecting students with 75+ industry professionals and building mentorship pipelines.
            When I&apos;m not doing any of that, I&apos;m probably solving problems on LeetCode or drinking chai.
          </p>
        </div>
      </div>

      {/* Profile image placeholder */}
      <div className="mb-12">
        <div className="w-full h-48 rounded-2xl bg-muted border border-border flex items-center justify-center overflow-hidden">
          {/* TODO: Replace with actual about/cover image */}
          <span className="text-muted-foreground text-sm">[ Cover image placeholder ]</span>
        </div>
      </div>

      {/* Experience */}
      <div className="mb-12">
        <h2 className="text-xl font-bold mb-4">Experience 💼</h2>
        <ExperienceTimeline />
      </div>

      {/* Education */}
      <div className="mb-12">
        <h2 className="text-xl font-bold mb-4">Education 🎓</h2>
        <EducationTimeline />
      </div>

      {/* Achievements */}
      <div className="mb-12">
        <h2 className="text-xl font-bold mb-4">Achievements 🏅</h2>
        <div className="space-y-3">
          {achievements.map((a) => (
            <div
              key={a.id}
              className="flex items-start gap-3 p-4 rounded-xl border border-border bg-card hover:border-foreground/20 transition-colors"
            >
              <Trophy className="h-4 w-4 text-yellow-500 mt-0.5 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <span className="font-semibold text-sm">{a.title}</span>
                  {a.year && (
                    <span className="text-xs text-muted-foreground flex-shrink-0">{a.year}</span>
                  )}
                </div>
                <p className="text-xs text-muted-foreground mt-0.5">{a.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Hackathons */}
      <div>
        <h2 className="text-xl font-bold mb-4">Hackathons 🏆</h2>
        <HackathonTimeline />
      </div>
    </div>
  );
}
