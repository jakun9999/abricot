"use client";

import AbrButton from "@/components/ui/buttons/abr-button";
import NewProjectModal from "@/components/ui/modals/new-project-modal";
import { useState } from "react";

export default function NewProjectButton() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <AbrButton
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
