import { Metadata } from "next";
import SearchInput from "@/components/ui/inputs/search-input";
import TaskLong from "@/components/ui/cards/task-long";
import TaskShort from "@/components/ui/cards/task-short";
import { Task } from "@/schemas/task-schema";
import { Project } from "@/schemas/project-schema";
import { fetchServer } from "@/lib/api-server";

export const metadata: Metadata = {
  title: "Tableau de bord",
  description: "Tableau de bord Abricot - Suivi des tâches",
};

export default async function Page() {
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
    LOW: 0,
    MEDIUM: 1,
    HIGH: 2,
    URGENT: 3,
  };

  // Sort tasks by priority using the defined order
  const sortedTasks = [...tasks].sort(
    (a, b) => PRIORITY_ORDER[a.priority] - PRIORITY_ORDER[b.priority],
  );

  return (
    <div className="pl-2.5 lg:pl-25 pr-2.5 lg:pr-31.25">
      <div className="w-full min-h-screen mt-7.5 rounded-[10px] border border-abr-grey-200 bg-abr-white px-2.5 md:px-14.75 py-10 mb-12">
        <div className="flex flex-col md:flex-row justify-between items-start gap-1.5 md:gap-0">
          <div className="flex flex-col ml-4 lg:ml-0">
            <h5 className="text-abr-grey-800">Mes tâches assignées</h5>
            <p className="text-abr-grey-600 text-body-m">
              Par ordre de priorité
            </p>
          </div>
          <SearchInput
            width="w-full md:w-[357px]"
            placeHolder="Rechercher une tâche"
          />
        </div>
        <div className="flex flex-col mt-10.25 gap-4.25">
          {tasks.length === 0 ? (
            <p className="text-abr-grey-600">Aucune tâche assignée.</p>
          ) : (
            sortedTasks.map((task) => {
              const projectName =
                projectMap.get(task.projectId) ?? "Projet incoonu";
              return (
                <div key={task.id}>
                  <TaskLong
                    task={task}
                    projectName={projectName}
                    className="hidden md:flex"
                  />
                  <TaskShort
                    task={task}
                    projectName={projectName}
                    className="flex md:hidden"
                  />
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
