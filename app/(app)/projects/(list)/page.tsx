import { Metadata } from "next";
import ProjectCard from "@/components/ui/cards/project-card";
import { Project } from "@/schemas/project-schema";
import { Task } from "@/schemas/task-schema";
import { fetchServer } from "@/lib/api-server";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Projets",
  description: "Page projets Abricot",
};

export default async function Page() {
  const projectsResponse = await fetchServer("/projects");
  console.log("projectsResponse", projectsResponse);

  if (!projectsResponse.ok) {
    return (
      <div className="p-10 text-center text-red-500">
        Une erreur est survenue lors du chargement des projets.
      </div>
    );
  }

  const projectRes = await projectsResponse.json();
  console.log("projectRes", projectRes);
  const projects: Project[] = projectRes.data.projects;

  const projectsWithStats = await Promise.all(
    projects.map(async (project) => {
      const tasksResponse = await fetchServer(`/projects/${project.id}/tasks`);

      if (!tasksResponse.ok) {
        return {
          ...project,
          totalTasks: 0,
          finishedTasks: 0,
          activeTasks: 0,
        };
      }

      const tasksRes = await tasksResponse.json();
      const tasks: Task[] = tasksRes?.data?.tasks ?? [];

      const finishedTasks = tasks.filter(
        (task) => task.status === "DONE",
      ).length;
      const activeTasks = tasks.filter(
        (task) => task.status === "TODO" || task.status === "IN_PROGRESS",
      ).length;

      const totalTasks = finishedTasks + activeTasks;

      return {
        ...project,
        totalTasks,
        finishedTasks,
      };
    }),
  );
  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 px-4 lg:px-34.25 gap-x-3.5 gap-y-4.5">
      {projectsWithStats.map((project) => (
        <Link
          key={project.id}
          href={`/projects/${project.id}`}
          aria-label={`Ouvrir le projet ${project.name}`}
        >
          <ProjectCard
            project={project}
            totalTasks={project.totalTasks}
            finishedTasks={project.finishedTasks}
          />
        </Link>
      ))}
    </div>
  );
}
