import type { Metadata } from "next";
import { projects } from "@/data/projects";
import { ProjectCard } from "@/components/projects/ProjectCard";

export const metadata: Metadata = {
  title: "Projects",
  description: "Things I've built — web apps, d-apps, bots, and more.",
};

export default function ProjectsPage() {
  const featured = projects.filter((p) => p.featured);
  const rest = projects.filter((p) => !p.featured);

  return (
    <div className="max-w-3xl mx-auto px-4 pt-28 pb-16">
      <div className="mb-10">
        <h1 className="text-4xl font-bold tracking-tight mb-3">Projects</h1>
        <p className="text-muted-foreground text-[15px]">
          Things I&apos;ve built — from Web3 apps to Discord bots. Always shipping.
        </p>
      </div>

      {featured.length > 0 && (
        <>
          <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-4">
            Featured
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
            {featured.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </>
      )}

      {rest.length > 0 && (
        <>
          <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-4">
            Other Projects
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {rest.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
