"use client";

import UpdateProjectModal from "@/components/ui/modals/update-project-modal";
import { Project } from "@/schemas/project-schema";
import { useAuth } from "@/context/auth-context";
import { useState } from "react";

/**
 * Le backend distingue propriétaire (`ownerId`) et rôles membres ; les deux
 * sources sont testées car les payloads ne sont pas toujours homogènes.
 */
function canUpdateProject(project: Project, userId?: string) {
  if (!userId) return false;

  if (project.ownerId === userId || project.owner?.id === userId) {
    return true;
  }

  return (project.members ?? []).some(
    (member) =>
      member.user?.id === userId &&
      (member.role === "OWNER" || member.role === "ADMIN"),
  );
}

/**
 * Lien « Modifier » visible seulement pour owner / admin. `null` sinon
 * (pas de bouton désactivé : la maquette ne le montre pas).
 */
export default function UpdateProjectButton({ project }: { project: Project }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user } = useAuth();

  if (!canUpdateProject(project, user?.id)) {
    return null;
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setIsModalOpen(true)}
        className="text-abr-dark-orange text-body-s underline mb-1 cursor-pointer"
        aria-label={`Modifier le projet ${project.name}`}
      >
        Modifier
      </button>
      {isModalOpen && (
        <UpdateProjectModal
          project={project}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </>
  );
}
