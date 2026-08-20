"use client";

import { useEffect } from "react";
import { GroupIcon } from "@/components/ui/icons";
import { Project } from "@/types/project";
import { getUserInitials } from "@/lib/utils";

interface ProjectProps {
  projectId: string | number;
}

// Jeu de données de test (mock)
const MOCK_PROJECT: Project = {
  id: "1",
  name: "Frontend Abricot",
  description: "Création d'un frontend nextjs pour Abricat",
  ownerId: "Matthieu DUPONT",
  owner: { name: "Matthieu DUPONT", email: "matthieulucas457@outlook.fr" },
  members: [
    {
      role: "ADMIN",
      user: { name: "Matthieu DUPONT", email: "matthieulucas457@outlook.fr" },
      joinedAt: "2026-01-01T08:00:00Z",
    },
  ],
  createdAt: "2026-03-14T10:00:00Z",
};

export default function Comments({ projectId }: ProjectProps) {
  // Initialisation directe avec les faux commentaires
  const project = MOCK_PROJECT;

  useEffect(() => {
    /*
    // --- CODE D'APPEL API EN ATTENTE ---
    async function fetchComments() {
      try {
        setLoading(true);
        const response = await fetch(`/api/tasks/${taskId}/comments`);
        if (!response.ok) throw new Error('Erreur lors de la récupération');
        
        const data: CommentData[] = await response.json();
        setComments(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    if (taskId) {
      fetchComments();
    }
    */
  }, [projectId]);

  const totalTasks = 4;
  const finishedTasks = 2;
  const progression =
    totalTasks > 0 ? Math.round((finishedTasks / totalTasks) * 100) : 0;

  const nonOwnerMembers = project.members.filter(
    (member) => member.user.name !== project.owner.name,
  );

  return (
    <div className="w-95 h-87.75 flex flex-col bg-white rounded-[10px] gap-14 px-8.5 py-7.5">
      {/* Project info */}
      <div className="gap-2">
        <h5>{project.name}</h5>
        <p className="text-body-s text-abr-grey-600">{project.description}</p>
      </div>
      {/* Progression */}
      <div>
        <div className="flex justify-between mb-4 items-center">
          <span className="text-abr-grey-600 text-body-xs">Progression</span>
          <span className="text-abr-grey-800 text-body-xs">{progression}%</span>
        </div>
        {/* Progress bar */}
        <div className="w-78 h-1.75 bg-abr-grey-200 rounded-[40px]">
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
            Équipe ({project.members.length})
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
