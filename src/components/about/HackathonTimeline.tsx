import Image from "next/image";
import { hackathons } from "@/data/hackathons";
import { Badge } from "@/components/ui/badge";
import { Trophy } from "lucide-react";

export function HackathonTimeline() {
  return (
    <div className="space-y-4">
      {hackathons.map((hack) => (
        <div
          key={hack.id}
          className="flex items-start gap-4 p-4 rounded-xl border border-border bg-card hover:border-foreground/20 transition-colors"
        >
          <div className="w-10 h-10 rounded-lg overflow-hidden border border-border bg-muted flex-shrink-0">
            <Image
              src={hack.logo}
              alt={hack.name}
              width={40}
              height={40}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2 flex-wrap">
              <h3 className="font-semibold text-sm">{hack.name}</h3>
              <span className="text-xs text-muted-foreground flex-shrink-0">{hack.date}</span>
            </div>
            <p className="text-xs text-muted-foreground">{hack.location}</p>
            <p className="text-xs text-foreground/70 mt-1 leading-relaxed">{hack.description}</p>
            {(hack.rank || hack.prize) && (
              <div className="flex flex-wrap gap-1.5 mt-2">
                {hack.rank && (
                  <Badge variant="secondary" className="text-xs gap-1">
                    <Trophy className="h-3 w-3" />
                    {hack.rank}
                  </Badge>
                )}
                {hack.prize && (
                  <Badge variant="outline" className="text-xs">
                    {hack.prize}
                  </Badge>
                )}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
