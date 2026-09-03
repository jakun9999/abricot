"use client";

import { useState } from "react";
import AiSquareButton from "@/components/ui/buttons/ai-square-button";
import AiTaskModal from "@/components/ui/modals/ai-task-modal";

/**
 * Ouvre {@link AiTaskModal} pour générer des tâches via Mistral.
 *
 * @param projectId - Projet dans lequel les tâches seront créées.
 */
export default function AiTaskButton({ projectId }: { projectId: string }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <AiSquareButton
        className="w-23.5 shrink-0"
        color="dark"
        label="IA"
        onClick={() => setIsModalOpen(true)}
      />

      {isModalOpen && (
        <AiTaskModal
          projectId={projectId}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </>
  );
}
