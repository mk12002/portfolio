import { projects } from "@/lib/projects";
import ProjectCard from "@/components/ProjectCard";

export default function ProjectsPage() {
  return (
    <div className="container py-12">
      <h1 className="text-3xl font-semibold">Projects</h1>
      <p className="text-gray-400 mt-2">A gallery of ML systems combining perception, reasoning, and deployment.</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {projects.map((p) => (
          <ProjectCard key={p.id} p={p} />
        ))}
      </div>
    </div>
  );
}
