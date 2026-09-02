"use client";

import AbrButton from "@/components/ui/buttons/abr-button";
import NewTaskModal from "@/components/ui/modals/new-task-modal";
import { useState } from "react";

export default function NewTaskButton({ projectId }: { projectId: string }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <AbrButton
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
