"use client";

import AbrButton from "@/components/ui/buttons/abr-button";
import NewTaskModal from "@/components/ui/modals/new-task-modal";
import { useState } from "react";

/**
 * Ouvre {@link NewTaskModal} pour le projet courant.
 *
 * @param projectId - Identifiant du projet cible.
 */
export default function NewTaskButton({ projectId }: { projectId: string }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <AbrButton
        type="button"
        onClick={() => setIsModalOpen(true)}
        color="black"
        label="Créer un tâche"
        className="w-35.25 h-12.5 shrink-0"
      />

      {isModalOpen && (
        <NewTaskModal
          projectId={projectId}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </>
  );
}
