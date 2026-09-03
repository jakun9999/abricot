"use client";

import AbrButton from "@/components/ui/buttons/abr-button";
import NewProjectModal from "@/components/ui/modals/new-project-modal";
import { useState } from "react";

/** Ouvre {@link NewProjectModal}. */
export default function NewProjectButton() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <AbrButton
        type="button"
        onClick={() => setIsModalOpen(true)}
        color="black"
        label="+ Créer un projet"
        className="w-45.25 h-12.5 shrink-0"
      />

      {isModalOpen && (
        <NewProjectModal
          onClose={() => setIsModalOpen(false)}
          onUpdate={() => setIsModalOpen(false)}
        />
      )}
    </>
  );
}
