import { Task } from "@/schemas/task-schema";
import { fetchServer } from "@/lib/api-server";
import ProjectCalendar from "@/components/ui/dashboard/project-calendar";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
  searchParams: Promise<{
    search?: string;
    status?: string;
    view?: string;
    date?: string;
  }>;
}

export default async function CalendarPage({ params, searchParams }: PageProps) {
  const { id } = await params;
  const { search, status, view, date } = await searchParams;
  const searchQuery = search?.toLowerCase() ?? "";
  const statusQuery = status ?? "";

  const tasksResponse = await fetchServer(`/projects/${id}/tasks`);
  if (!tasksResponse.ok) {
    return (
      <div className="mt-10.25 text-center text-red-500">
        Une erreur est survenue lors du chargement des tâches du projet.
      </div>
    );
  }

  const tasksRes = await tasksResponse.json();
  const tasks: Task[] = tasksRes?.data?.tasks ?? [];

  const PRIORITY_ORDER: Record<Task["priority"], number> = {
    LOW: 3,
    MEDIUM: 2,
    HIGH: 1,
    URGENT: 0,
  };

  const sortedTasks = [...tasks].sort(
    (a, b) => PRIORITY_ORDER[a.priority] - PRIORITY_ORDER[b.priority],
  );

  const filteredTasks = sortedTasks.filter((task) => {
    const matchesStatus =
      !statusQuery || statusQuery === "ALL" || task.status === statusQuery;
    if (!matchesStatus) return false;

    if (!searchQuery) return true;
    return (
      task.title.toLowerCase().includes(searchQuery) ||
      task.description?.toLowerCase().includes(searchQuery) ||
      task.status.toLowerCase().includes(searchQuery)
    );
  });

  if (tasks.length === 0) {
    return (
      <p className="mt-10.25 text-abr-grey-600">Aucune tâche sur ce projet.</p>
    );
  }

  if (filteredTasks.length === 0) {
    return (
      <p className="mt-10.25 text-abr-grey-600">
        Aucune tâche ne correspond à votre recherche.
      </p>
    );
  }

  return (
    <ProjectCalendar
      projectId={id}
      tasks={filteredTasks}
      view={view}
      date={date}
      search={search}
      status={status}
    />
  );
}
