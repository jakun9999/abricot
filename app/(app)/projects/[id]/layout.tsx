import React from "react";
import { Project } from "@/schemas/project-schema";
import NewTaskButton from "@/components/ui/buttons/new-task-button";
import AiTaskButton from "@/components/ui/buttons/ai-task-button";
import { getUserInitials } from "@/lib/utils";
import Link from "next/link";
import { BackarrowIcon } from "@/components/ui/icons";
import ProjectMenu from "@/components/ui/dashboard/project-menu";
import SearchInput from "@/components/ui/inputs/search-input";
import StatusFilterInput from "@/components/ui/inputs/status-filter-input";
import { fetchServer } from "@/lib/api-server";
import UpdateProjectButton from "@/components/ui/buttons/update-project-button";

interface LayoutProps {
  children: React.ReactNode;
  params: Promise<{
    id: string;
  }>;
}

export default async function ProjectLayout({ children, params }: LayoutProps) {
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

  const nonOwnerMembers = project.members.filter(
    (member) => member.user.name !== project.owner.name,
  );

  return (
    <div className="mt-19.5 flex flex-col items-center w-full">
      <div className="flex flex-col md:flex-row gap-5 md:gap-0 md:justify-between md:items-end w-full pl-4 pr-4 lg:pl-11 lg:pr-28.25 box-border">
        <div className="flex items-start gap-4 min-w-0">
          <Link
            href="/projects"
            className="mt-1.5 shrink-0 flex items-center justify-center h-14.25 w-14.25 text-caption-l rounded-[10px] border bg-white text-black border-gray-200 hover:border-abr-dark-orange hover:text-abr-dark-orange transition-colors duration-500"
            aria-label="Retour à la liste des projets"
          >
            <BackarrowIcon aria-hidden="true" />
          </Link>
          <div className="flex flex-col gap-3.5 min-w-0">
            <h1 className="sr-only">{`Projet ${project.name}`}</h1>
            <div className="flex flex-wrap items-center gap-3.5 min-w-0">
              <h4 className="min-w-0 wrap-break-word" aria-hidden="true">{project.name}</h4>
              <UpdateProjectButton project={project} />
            </div>
            <p className="text-body-l wrap-break-word">{project.description}</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-3">
          <NewTaskButton projectId={id} />
          <AiTaskButton projectId={id} />
        </div>
      </div>
      <div className="mt-12.25 flex w-full pl-4 pr-4 lg:pl-28 lg:pr-28.25 box-border">
        <div className="flex flex-col lg:flex-row lg:items-center w-full gap-2 md:gap-0 h-auto lg:h-16.75 bg-abr-grey-100 px-4 md:px-8 lg:px-12.5 py-5 rounded-[10px] justify-evenly lg:justify-between">
          <div className="flex flex-col md:flex-row md:items-center gap-2">
            <h5 className="text-abr-grey-800">Contributeurs</h5>
            <p className="mt-px text-abr-grey-600 text-body-m">{`${project.members.length} ${project.members.length > 1 ? "personnes" : "personne"}`}</p>
          </div>
          <div className="flex flex-col md:flex-row md:items-center gap-2">
            <div className="flex gap-1">
              <span
                className="flex w-6.75 h-6.75 bg-abr-light-orange shrink-0 rounded-full border border-abr-light-orange text-[10px] font-normal items-center justify-center"
                aria-label={`Propriétaire : ${project.owner.name}`}
              >
                {getUserInitials(project.owner.name)}
              </span>
              <span className="flex w-27.25 h-6.75 bg-abr-light-orange rounded-full border border-abr-light-orange text-body-s text-abr-dark-orange items-center justify-center">
                Propriétaire
              </span>
            </div>
            <div className="flex flex-col lg:flex-row gap-2 flex-wrap min-w-0">
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
      <div className="w-full mt-8.5 pl-4 pr-4 lg:pl-28 lg:pr-28.25 box-border mb-[97.85px]">
        <div className="flex flex-col w-full min-h-screen bg-abr-white border border-abr-grey-200 rounded-[10px] px-4 lg:px-14.75 py-10">
          <div className="flex flex-col lg:flex-row w-full gap-4">
            <div className="w-full flex flex-col md:flex-row gap-4 lg:gap-0 justify-between lg:items-center">
              <div className="flex flex-col gap-2">
                <h5 className="text-abr-grey-800">Tâches</h5>
                <p className="text-abr-grey-600 text-body-m">
                  Par ordre de priorité
                </p>
              </div>
              <div className="flex">
                <ProjectMenu projectId={id} />
              </div>
            </div>
            <div className="flex flex-col md:flex-row lg:items-center gap-4 min-w-0 w-full lg:w-auto">
              <StatusFilterInput width={171.75} />
              <SearchInput
                width="w-full min-w-0 lg:w-65.75 lg:min-w-50"
                placeHolder="Rechercher un tâche"
              />
            </div>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}
