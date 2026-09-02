"use client";

import { GroupIcon } from "@/components/ui/icons";
import { Project } from "@/schemas/project-schema";
import { getUserInitials } from "@/lib/utils";

interface ProjectCardProps {
  project: Project;
  totalTasks: number;
  finishedTasks: number;
}

export default function ProjectCard({
  project,
  totalTasks,
  finishedTasks,
}: ProjectCardProps) {
  const progression =
    totalTasks > 0 ? Math.round((finishedTasks / totalTasks) * 100) : 0;

  const nonOwnerMembers = project.members.filter(
    (member) => member.user.name !== project.owner.name,
  );

  return (
    <div className="max-w-95 h-87.75 flex flex-col bg-white rounded-[10px] border border-abr-grey-200 gap-14 px-8.5 py-7.5">
      {/* Project info */}
      <div className="gap-2">
        <h5>{project.name}</h5>
        <p className="text-body-s text-abr-grey-600 line-clamp-2">
          {project.description}
        </p>
      </div>
      {/* Progression */}
      <div>
        <div className="flex justify-between mb-4 items-center">
          <span className="text-abr-grey-600 text-body-xs">Progression</span>
          <span className="text-abr-grey-800 text-body-xs">{progression}%</span>
        </div>
        {/* Progress bar */}
        <div className="max-w-78 h-1.75 bg-abr-grey-200 rounded-[40px]">
          <div
            className="bg-abr-grey-400 h-1.75 rounded-[40px]"
            style={{ width: `${progression}%` }}
          ></div>
        </div>
        <p className="mt-2 text-abr-grey-600 text-body-2xs">
          {finishedTasks}/{totalTasks} tâches terminées
        </p>
      </div>
      {/* Team info */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-2 text-abr-grey-600">
          <GroupIcon className="w-[11.58px] h-2.75" />
          <span className="text-body-2xs">
            Équipe ({project.members.length + 1})
          </span>
        </div>
        <div className="flex items-center gap-1">
          <span className="flex w-6.75 h-6.75 bg-abr-light-orange rounded-full border border-white text-[10px] font-normal items-center justify-center">
            {getUserInitials(project.owner.name)}
          </span>
          <span className="flex w-27.25 h-6.75 bg-abr-light-orange rounded-full border border-white text-body-s text-abr-dark-orange items-center justify-center">
            Propriétaire
          </span>
          <div className="flex -space-x-2 overflow-hidden">
            {nonOwnerMembers.map((member, index) => (
              <span
                key={index}
                className="flex h-6.75 w-6.75 shrink-0 items-center justify-center rounded-full border border-white bg-abr-grey-200 text-[10px] font-normal"
              >
                {getUserInitials(member.user.name)}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
