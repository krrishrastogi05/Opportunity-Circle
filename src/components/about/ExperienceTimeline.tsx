import Image from "next/image";
import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { experience } from "@/data/hackathons";

export function ExperienceTimeline() {
  return (
    <div className="space-y-4">
      {experience.map((exp) => (
        <div
          key={exp.id}
          className="flex items-start gap-4 p-4 rounded-xl border border-border bg-card hover:border-foreground/20 transition-colors"
        >
          {/* Logo */}
          <div className="w-10 h-10 rounded-lg overflow-hidden border border-border bg-muted flex-shrink-0">
            <Image
              src={exp.logo}
              alt={exp.company}
              width={40}
              height={40}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="flex-1 min-w-0">
            {/* Header */}
            <div className="flex items-start justify-between gap-2 mb-0.5">
              <div>
                <h3 className="font-semibold text-sm">{exp.role}</h3>
                <div className="flex items-center gap-1.5">
                  <span className="text-xs text-muted-foreground">{exp.company}</span>
                  <span className="text-xs text-muted-foreground/50">·</span>
                  <span className="text-xs text-muted-foreground/70">{exp.type}</span>
                  {exp.link && (
                    <Link
                      href={exp.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <ExternalLink className="h-3 w-3" />
                    </Link>
                  )}
                </div>
              </div>
              <span className="text-xs text-muted-foreground flex-shrink-0">{exp.period}</span>
            </div>

            {/* Bullets */}
            <ul className="mt-2 space-y-1">
              {exp.bullets.map((b, i) => (
                <li key={i} className="text-xs text-muted-foreground flex gap-2">
                  <span className="mt-1.5 h-1 w-1 rounded-full bg-muted-foreground/50 flex-shrink-0" />
                  {b}
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
}
