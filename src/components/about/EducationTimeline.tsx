import Image from "next/image";
import { education } from "@/data/hackathons";

export function EducationTimeline() {
  return (
    <div className="space-y-4">
      {education.map((edu) => (
        <div
          key={edu.id}
          className="flex items-start gap-4 p-4 rounded-xl border border-border bg-card hover:border-foreground/20 transition-colors"
        >
          <div className="w-10 h-10 rounded-lg overflow-hidden border border-border bg-muted flex-shrink-0">
            <Image
              src={edu.logo}
              alt={edu.school}
              width={40}
              height={40}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <h3 className="font-semibold text-sm">{edu.school}</h3>
              {edu.period && (
                <span className="text-xs text-muted-foreground flex-shrink-0">
                  {edu.period}
                </span>
              )}
            </div>
            <p className="text-xs text-muted-foreground">{edu.location}</p>
            <p className="text-xs text-foreground/70 mt-0.5">{edu.degree}, {edu.gpa}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
