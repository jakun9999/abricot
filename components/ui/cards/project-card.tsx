"use client";

import { GroupIcon } from "@/components/ui/icons";
import { Project } from "@/schemas/project-schema";
import { getUserInitials } from "@/lib/utils";

export interface ProjectCardProps {
  project: Project;
  /** Nombre de tâches prises en compte dans la jauge (terminées + actives). */
  totalTasks: number;
  finishedTasks: number;
}

/**
 * Carte projet (liste). Hauteur fixe Figma `h-87.75` : la description est
 * clampée à 2 lignes (`min-h-[2lh]`) pour aligner les cartes en grille.
 *
 * @example
 * ```tsx
 * <ProjectCard project={project} totalTasks={10} finishedTasks={3} />
 * ```
 */
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
    <div className="w-full max-w-95 h-87.75 flex flex-col bg-white rounded-[10px] border border-abr-grey-200 gap-14 px-8.5 py-7.5">
      <div className="shrink-0">
        <h5 className="line-clamp-1">{project.name}</h5>
        <p className="text-body-s text-abr-grey-600 line-clamp-2 min-h-[2lh]">
          {project.description}
        </p>
      </div>
      <div className="shrink-0">
        <div className="flex justify-between mb-4 items-center">
          <span className="text-abr-grey-600 text-body-xs">Progression</span>
          <span className="text-abr-grey-800 text-body-xs">{progression}%</span>
        </div>
        <div
          className="max-w-78 h-1.75 bg-abr-grey-200 rounded-[40px]"
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={progression}
          aria-label={`Progression du projet : ${progression} %`}
        >
          <div
            className="bg-abr-grey-400 h-1.75 rounded-[40px]"
            style={{ width: `${progression}%` }}
          ></div>
        </div>
        <p className="mt-2 text-abr-grey-600 text-body-2xs">
          {finishedTasks}/{totalTasks} tâches terminées
        </p>
      </div>
      <div className="flex shrink-0 flex-col gap-4">
        <div className="flex items-center gap-2 text-abr-grey-600">
          <GroupIcon className="w-[11.58px] h-2.75" aria-hidden="true" />
          <span className="text-body-2xs">
            Équipe ({project.members.length + 1})
          </span>
        </div>
        <div className="flex items-center gap-1">
          <span
            className="flex w-6.75 h-6.75 bg-abr-light-orange rounded-full border border-white text-[10px] font-normal items-center justify-center"
            aria-label={`Propriétaire : ${project.owner.name}`}
          >
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
                aria-label={member.user.name}
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
