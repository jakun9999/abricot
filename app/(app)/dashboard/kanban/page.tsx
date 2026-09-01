import { Metadata } from "next";
import Label from "@/components/ui/labels/label";
import TaskShort from "@/components/ui/cards/task-short";
import TaskLong from "@/components/ui/cards/task-long";
import { Task } from "@/schemas/task-schema";
import { Project } from "@/schemas/project-schema";
import { fetchServer } from "@/lib/api-server";

export const metadata: Metadata = {
  title: "Tableau de bord",
  description: "Tableau de bord Kanban Abricot - Suivi des tâches",
};

export default async function Kanban() {
  const [tasksResponse, projectsResponse] = await Promise.all([
    fetchServer("/dashboard/assigned-tasks"),
    fetchServer("/projects"),
  ]);

  if (!tasksResponse.ok || !projectsResponse.ok) {
    return (
      <div className="p-10 text-center text-red-500">
        Une erreur est survenue lors du chargement des tâches.
      </div>
    );
  }

  const projectRes = await projectsResponse.json();
  const projects: Project[] = projectRes.data.projects;

  // Create a map of project IDs to project names for easy lookup
  // This will help us display the project name for each task
  const projectMap = new Map<string, string>(
    projects
      .filter((project): project is Project & { id: string } =>
        Boolean(project.id),
      )
      .map((project) => [project.id, project.name] as const),
  );
  const taskRes = await tasksResponse.json();
  const tasks: Task[] = taskRes.data.tasks;

  // Tasks need to be sorted by priority, with the highest priority first.
  // We can define a mapping of priority levels to numbers for sorting purposes.
  const PRIORITY_ORDER: Record<Task["priority"], number> = {
    LOW: 3,
    MEDIUM: 2,
    HIGH: 1,
    URGENT: 0,
  };

  // Sort tasks by priority using the defined order
  const sortedTasks = [...tasks].sort(
    (a, b) => PRIORITY_ORDER[a.priority] - PRIORITY_ORDER[b.priority],
  );

  const statusCounts = sortedTasks.reduce(
    (acc, task) => {
      acc[task.status] = (acc[task.status] || 0) + 1;
      return acc;
    },
    {} as Record<Task["status"], number>,
  );

  return (
    <div className="min-h-screen mt-12.75 mb-12">
      <div className="grid grid-cols-1 xl:grid-cols-3 items-start gap-2.5 md:gap-5.5 px-2.5 lg:px-10 xl:px-17.5">
        <div className="rounded-[10px] border border-abr-grey-200 bg-abr-white px-6 py-10 w-full xl:max-w-104.75 ">
          <div className="flex items-center gap-2 h-6.75">
            <h5>À faire</h5>
            <Label color="grey" text={statusCounts.TODO?.toString() || "0"} />
          </div>
          <div className="flex flex-col gap-4 mt-10.25">
            {sortedTasks
              .filter((task) => task.status === "TODO")
              .map((task) => (
                <div key={task.id}>
                  <TaskShort
                    task={task}
                    className="flex lg:hidden xl:flex"
                    projectName={
                      projectMap.get(task.projectId) ?? "Projet inconnu"
                    }
                  />
                  <TaskLong
                    task={task}
                    className="hidden lg:flex xl:hidden"
                    projectName={
                      projectMap.get(task.projectId) ?? "Projet inconnu"
                    }
                  />
                </div>
              ))}
          </div>
        </div>
        <div className="rounded-[10px] border border-abr-grey-200 bg-abr-white px-6 py-10 w-full xl:max-w-104.75 ">
          <div className="flex items-center gap-2 h-6.75">
            <h5>En cours</h5>
            <Label
              color="grey"
              text={statusCounts.IN_PROGRESS?.toString() || "0"}
            />
          </div>
          <div className="flex flex-col gap-4 mt-10.25">
            {sortedTasks
              .filter((task) => task.status === "IN_PROGRESS")
              .map((task) => (
                <div key={task.id}>
                  <TaskShort
                    task={task}
                    className="flex lg:hidden xl:flex"
                    projectName={
                      projectMap.get(task.projectId) ?? "Projet inconnu"
                    }
                  />
                  <TaskLong
                    task={task}
                    className="hidden lg:flex xl:hidden"
                    projectName={
                      projectMap.get(task.projectId) ?? "Projet inconnu"
                    }
                  />
                </div>
              ))}
          </div>
        </div>
        <div className="rounded-[10px] border border-abr-grey-200 bg-abr-white px-6 py-10 w-full xl:max-w-104.75 ">
          <div className="flex items-center gap-2 h-6.75">
            <h5>Terminées</h5>
            <Label color="grey" text={statusCounts.DONE?.toString() || "0"} />
          </div>
          <div className="flex flex-col gap-4 mt-10.25">
            {sortedTasks
              .filter((task) => task.status === "DONE")
              .map((task) => (
                <div key={task.id}>
                  <TaskShort
                    task={task}
                    className="flex lg:hidden xl:flex"
                    projectName={
                      projectMap.get(task.projectId) ?? "Projet inconnu"
                    }
                  />
                  <TaskLong
                    task={task}
                    className="hidden lg:flex xl:hidden"
                    projectName={
                      projectMap.get(task.projectId) ?? "Projet inconnu"
                    }
                  />
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
