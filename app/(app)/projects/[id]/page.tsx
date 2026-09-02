import { Project } from "@/schemas/project-schema";
import { Task } from "@/schemas/task-schema";
import IconButton from "@/components/ui/buttons/icon-button";
import AiSquareButton from "@/components/ui/buttons/ai-square-button";
import NewTaskButton from "@/components/ui/buttons/new-task-button";
import { getUserInitials } from "@/lib/utils";
import Link from "next/link";
import TaskDetailed from "@/components/ui/cards/task-detailed";
import ProjectMenu from "@/components/ui/dashboard/project-menu";
import SearchInput from "@/components/ui/inputs/search-input";
import SelectorInput from "@/components/ui/inputs/selector-input";
import { fetchServer } from "@/lib/api-server";
import UpdateProjectButton from "@/components/ui/buttons/update-project-button";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function Page({ params }: PageProps) {
  const { id } = await params;

  const projectResponse = await fetchServer(`/projects/${id}`);
  if (!projectResponse.ok) {
    return (
      <div className="p-10 text-center text-red-500">
        Une erreur est survenue lors du chargement du projet.
      </div>
    );
  }

  const projectRes = await projectResponse.json();
  const project: Project = projectRes.data.project;

  const tasksResponse = await fetchServer(`/projects/${id}/tasks`);
  if (!tasksResponse.ok) {
    return (
      <div className="p-10 text-center text-red-500">
        Une erreur est survenue lors du chargement des tâches du projet.
      </div>
    );
  }

  const tasksRes = await tasksResponse.json();
  const tasks: Task[] = tasksRes?.data?.tasks ?? [];

  const nonOwnerMembers = project.members.filter(
    (member) => member.user.name !== project.owner.name,
  );

  return (
    <div className="mt-19.5 flex flex-col items-center w-full">
      <div className="flex flex-col md:flex-row gap-5 md:gap-0 md:justify-between md:items-end w-full pl-4 pr-4 lg:pl-11 lg:pr-28.25 box-border">
        {/* Project header (back button, name, description and buttons) */}
        <div className="flex items-start gap-4">
          <Link href="/projects" className="mt-1.5 hover:cursor-pointer">
            <IconButton label="back" />
          </Link>
          <div className="flex flex-col gap-3.5">
            <h1 aria-label={`Projet ${project.name}`} className="sr-only"></h1>
            <div className="flex items-center gap-3.5">
              <h4>{project.name}</h4>
              <UpdateProjectButton project={project} />
            </div>
            <p className="text-body-l">{project.description}</p>
          </div>
        </div>
        {/* Buttons (create task and AI) */}
        <div className="flex gap-3">
          <NewTaskButton projectId={id} />
          <AiSquareButton className="w-23.5 shrink-0" color="dark" label="IA" />
        </div>
      </div>
      {/* Project members div */}
      <div className="mt-12.25 flex w-full pl-4 pr-4 lg:pl-28 lg:pr-28.25 box-border">
        <div className="flex flex-col lg:flex-row lg:items-center w-full gap-2 md:gap-0 h-auto md:h-40 lg:h-16.75 bg-abr-grey-100 px-12.5 py-5 rounded-[10px] justify-evenly lg:justify-between">
          <div className="flex flex-col md:flex-row md:items-center gap-2">
            <h5 className="text-abr-grey-800">Contributeurs</h5>
            <p className="mt-px text-abr-grey-600 text-body-m">{`${project.members.length} ${project.members.length > 1 ? "personnes" : "personne"}`}</p>
          </div>
          {/* Display members */}
          <div className="flex flex-col md:flex-row md:items-center gap-2">
            {/* Project Owner */}
            <div className="flex gap-1">
              <span className="flex w-6.75 h-6.75 bg-abr-light-orange shrink-0 rounded-full border border-abr-light-orange text-[10px] font-normal items-center justify-center">
                {getUserInitials(project.owner.name)}
              </span>
              <span className="flex w-27.25 h-6.75 bg-abr-light-orange rounded-full border border-abr-light-orange text-body-s text-abr-dark-orange items-center justify-center">
                Propriétaire
              </span>
            </div>
            {/* Project members */}
            <div className="flex flex-col lg:flex-row gap-2">
              {nonOwnerMembers.map((member, index) => (
                <div key={index} className="flex items-center gap-2">
                  <span className="flex h-6.75 w-6.75 shrink-0 items-center justify-center rounded-full border border-white bg-abr-grey-200 text-[10px] font-normal">
                    {getUserInitials(member.user.name)}
                  </span>
                  <span className="flex h-6.75 bg-abr-grey-200 rounded-full border border-abr-grey-200 text-body-s text-abr-grey-600 items-center justify-center px-4">
                    {member.user.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* Project tasks area */}
      <div className="w-full mt-8.5 pl-4 pr-4 lg:pl-28 lg:pr-28.25 box-border mb-[97.85px]">
        <div className="flex flex-col w-full min-h-screen bg-abr-white border border-abr-grey-200 rounded-[10px] px-4 lg:px-14.75 py-10">
          {/* Task toolbar */}
          <div className="flex flex-col lg:flex-row w-full gap-4">
            <div className="w-full flex flex-col md:flex-row gap-4 lg:gap-0 justify-between lg:items-center">
              {/* Toolbar title and description */}
              <div className="flex flex-col gap-2">
                <h5 className="text-abr-grey-800">Tâches</h5>
                <p className="text-abr-grey-600 text-body-m">
                  Par ordre de priorité
                </p>
              </div>
              {/* Toolbar buttons */}
              <div className="flex">
                <ProjectMenu />
              </div>
            </div>

            {/* Toolbar filters */}
            <div className="flex flex-col md:flex-row lg:items-center gap-4">
              <SelectorInput
                id="task-selector"
                width={171.75}
                placeHolder="Statut"
                options={[
                  { value: "TODO", text: "À faire" },
                  { value: "IN_PROGRESS", text: "En cours" },
                  { value: "DONE", text: "Terminé" },
                  { value: "CANCELLED", text: "Annulé" },
                ]}
              />
              <SearchInput
                width="w-65.75 min-w-50"
                placeHolder="Rechercher un tâche"
              />
            </div>
          </div>
          {/* Tasks list */}
          <div className="flex flex-col mt-10.25 gap-4.25 lg:px-10">
            {tasks.map((task) => (
              <TaskDetailed key={task.id} task={task} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
