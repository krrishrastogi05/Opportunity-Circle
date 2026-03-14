import Image from "next/image";
import Link from "next/link";
import { Github, ExternalLink } from "lucide-react";
import { type Project } from "@/data/projects";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <div className="rounded-2xl border border-border bg-card overflow-hidden hover:border-foreground/20 transition-all group">
      {/* Project image */}
      <div className="relative w-full h-48 bg-muted overflow-hidden">
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="font-semibold text-base mb-2">{project.title}</h3>
        <p className="text-sm text-muted-foreground leading-relaxed mb-3">
          {project.description}
        </p>

        {/* Tech stack */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.tech.map((t) => (
            <Badge key={t} variant="secondary" className="text-xs px-2 py-0.5">
              {t}
            </Badge>
          ))}
        </div>

        {/* Links */}
        <div className="flex gap-2">
          {project.github && (
            <Link href={project.github} target="_blank" rel="noopener noreferrer">
              <Button variant="outline" size="sm" className="gap-1.5 text-xs rounded-full">
                <Github className="h-3.5 w-3.5" />
                Code
              </Button>
            </Link>
          )}
          {project.demo && (
            <Link href={project.demo} target="_blank" rel="noopener noreferrer">
              <Button variant="outline" size="sm" className="gap-1.5 text-xs rounded-full">
                <ExternalLink className="h-3.5 w-3.5" />
                Demo
              </Button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
