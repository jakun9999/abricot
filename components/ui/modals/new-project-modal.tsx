"use client";

import { useState } from "react";
import { Project } from "@/schemas/project-schema";
import FormInput from "@/components/ui/inputs/form-input";
import UserSearchSelectorInput from "@/components/ui/inputs/user-search-selector-input";
import AbrButton from "@/components/ui/buttons/abr-button";
import ModalOverlay, {
  modalPanelClassName,
} from "@/components/ui/modals/modal-overlay";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function NewProjectModal({
  onClose,
}: {
  onClose: () => void;
  onUpdate: (updatedProject: Project) => void;
}) {
  const router = useRouter();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [contributors, setContributors] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const hasChanges =
    name !== "" && description !== "" && contributors.length > 0;

  const handleNewProject = async () => {
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch(`/api/projects/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          description,
          contributors,
        }),
      });

      const payload = await response.json().catch(() => null);

      if (!response.ok) {
        throw new Error(
          payload?.message ??
            "Impossible de créer le projet. Veuillez réessayer.",
        );
      }

      onClose();
      router.refresh();
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    if (isSubmitting) return;
    onClose();
  };

  return (
    <ModalOverlay onClose={handleCancel}>
      <div
        className={modalPanelClassName}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        <div className="flex flex-col items-end w-full ">
          <Image
            src="/close.svg"
            alt="Fermer"
            className="self-end cursor-pointer text-abr-grey-600 "
            width={14.33}
            height={14.33}
            onClick={handleCancel}
          />
        </div>
        <div className="flex flex-col py-[27.67px] px-0 lg:px-5">
          <h4 className="text-abr-grey-800">Créer un projet</h4>
          <form className="flex flex-col gap-6 mt-10">
            <FormInput
              inputId="name"
              inputWidth="max-w-[280px]"
              className="w-full"
              placeHolder="Titre du projet"
              label="Titre"
              inputType="text"
              mandatory={true}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <FormInput
              inputId="description"
              inputWidth="maxw-[280px]"
              className="w-full"
              placeHolder="Description de la tâche"
              label="Description"
              inputType="text"
              mandatory={true}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <UserSearchSelectorInput
              label="Contributeurs"
              width="w-full"
              placeholder="Choisir un ou plusieurs contributeurs"
              value={contributors}
              onChange={setContributors}
            />
            <AbrButton
              type="button"
              className="w-45.25 mt-8 max-w-full"
              color="black"
              label={isSubmitting ? "Enregistrement..." : "Ajouter un projet"}
              onClick={handleNewProject}
              disabled={isSubmitting || !hasChanges}
            />
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
          </form>
        </div>
      </div>
    </ModalOverlay>
  );
}
