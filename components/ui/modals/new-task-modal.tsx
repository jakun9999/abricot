"use client";

import { useState } from "react";
import { Task } from "@/schemas/task-schema";
import FormInput from "@/components/ui/inputs/form-input";
import DateSelectorInput from "@/components/ui/inputs/date-selector-input";
import AssigneeSelectorInput from "@/components/ui/inputs/assignee-selector-input";
import SelectorInput from "@/components/ui/inputs/selector-input";
import AbrButton from "@/components/ui/buttons/abr-button";
import ModalOverlay, {
  modalPanelClassName,
} from "@/components/ui/modals/modal-overlay";
import ModalCloseButton from "@/components/ui/modals/modal-close-button";
import { useRouter } from "next/navigation";

/** Modale de création de tâche (POST `/api/tasks`). */
export default function NewTaskModal({
  projectId,
  onClose,
}: {
  projectId: string;
  onClose: () => void;
  onUpdate?: (createdTask: Task) => void;
}) {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState<Task["priority"] | "">("");
  const [dueDate, setDueDate] = useState("");
  const [assigneeIds, setAssigneeIds] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const hasChanges = title !== "" && description !== "";

  const toIsoDate = (value: string) => {
    if (!value) return "";

    if (/^\d{4}-\d{2}-\d{2}$/.test(value)) {
      const [year, month, day] = value.split("-").map(Number);
      return new Date(Date.UTC(year, month - 1, day, 12, 0, 0)).toISOString();
    }

    const parsed = new Date(value);
    return Number.isFinite(parsed.getTime()) ? parsed.toISOString() : "";
  };

  const handleNewTask = async () => {
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch(`/api/tasks`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          projectId,
          title,
          description,
          priority,
          dueDate,
          assigneeIds,
        }),
      });

      const payload = await response.json().catch(() => null);

      if (!response.ok) {
        throw new Error(
          payload?.message ??
            "Impossible de créer la tâche. Veuillez réessayer.",
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
        aria-labelledby="new-task-modal-title"
      >
        <div className="flex flex-col items-end w-full ">
          <ModalCloseButton onClick={handleCancel} />
        </div>
        <div className="flex flex-col py-[27.67px] px-0 lg:px-5">
          <h4 id="new-task-modal-title" className="text-abr-grey-800">
            Créer une tâche
          </h4>
          <form className="flex flex-col gap-6 mt-10">
            <FormInput
              inputId="new-task-title"
              inputWidth="max-w-[280px]"
              className="w-full"
              placeHolder="Titre de la tâche"
              label="Titre"
              inputType="text"
              mandatory={true}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <FormInput
              inputId="new-task-description"
              inputWidth="max-w-[280px]"
              className="w-full"
              placeHolder="Description de la tâche"
              label="Description"
              inputType="text"
              mandatory={true}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <DateSelectorInput
              inputId="new-task-due-date"
              width="max-w-[280px]"
              placeHolder="Sélectionner une date"
              label="Échéance"
              value={dueDate}
              onChange={(e) => setDueDate(toIsoDate(e.target.value))}
            />
            <AssigneeSelectorInput
              projectId={projectId}
              label="Assigné à"
              width="w-full"
              value={assigneeIds}
              onChange={setAssigneeIds}
              placeholder="Aucun collaborateur"
            />
            <SelectorInput
              id="new-task-priority"
              width={280}
              height="h-13.25"
              label="Priorité"
              value={priority || undefined}
              placeHolder="Sélectionner une priorité"
              onChange={(value) => setPriority(value as Task["priority"])}
              options={[
                { value: "LOW", text: "Basse" },
                { value: "MEDIUM", text: "Moyenne" },
                { value: "HIGH", text: "Haute" },
                { value: "URGENT", text: "Urgente" },
              ]}
            />
            <AbrButton
              type="button"
              className="w-45.25 mt-8 max-w-full"
              color="black"
              label={isSubmitting ? "Enregistrement..." : "Ajouter une tâche"}
              onClick={handleNewTask}
              disabled={isSubmitting || !hasChanges}
            />
            {error && (
              <p className="text-red-500 text-sm mt-2" role="alert">
                {error}
              </p>
            )}
          </form>
        </div>
      </div>
    </ModalOverlay>
  );
}
