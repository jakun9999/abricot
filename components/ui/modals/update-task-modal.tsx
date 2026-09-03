"use client";

import { useState } from "react";
import { Task } from "@/schemas/task-schema";
import FormInput from "@/components/ui/inputs/form-input";
import DateSelectorInput from "@/components/ui/inputs/date-selector-input";
import AssigneeSelectorInput from "@/components/ui/inputs/assignee-selector-input";
import SelectorInput from "@/components/ui/inputs/selector-input";
import TaskStatusSelectorInput from "@/components/ui/inputs/task-status-selector-input";
import AbrButton from "@/components/ui/buttons/abr-button";
import ModalOverlay, {
  modalPanelClassName,
} from "@/components/ui/modals/modal-overlay";
import ModalCloseButton from "@/components/ui/modals/modal-close-button";
import { useRouter } from "next/navigation";

/** Modale d’édition de tâche (PUT `/api/projects/:id/tasks/:taskId`). */
export default function UpdateTaskModal({
  task,
  projectId,
  onClose,
  onUpdate,
}: {
  task: Task;
  projectId: string;
  onClose: () => void;
  onUpdate: (updatedTask: Task) => void;
}) {
  const router = useRouter();
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description || "");
  const [priority, setPriority] = useState<Task["priority"]>(task.priority);
  const [dueDate, setDueDate] = useState(task.dueDate || "");
  const [assigneeIds, setAssigneeIds] = useState<string[]>(
    (task.assignees ?? [])
      .map((assignee) => assignee.userId ?? assignee.user?.id ?? "")
      .filter(Boolean),
  );
  const [status, setStatus] = useState<Task["status"]>(task.status);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const initialAssigneeIds = (task.assignees ?? [])
    .map((assignee) => assignee.userId ?? assignee.user?.id ?? "")
    .filter(Boolean);

  const hasChanges =
    title !== task.title ||
    description !== (task.description ?? "") ||
    priority !== task.priority ||
    dueDate !== (task.dueDate ?? "") ||
    status !== task.status ||
    JSON.stringify([...assigneeIds].sort()) !==
      JSON.stringify([...initialAssigneeIds].sort());

  const toIsoDate = (value: string) => {
    if (!value) return "";

    if (/^\d{4}-\d{2}-\d{2}$/.test(value)) {
      const [year, month, day] = value.split("-").map(Number);
      return new Date(Date.UTC(year, month - 1, day, 12, 0, 0)).toISOString();
    }

    const parsed = new Date(value);
    return Number.isFinite(parsed.getTime()) ? parsed.toISOString() : "";
  };

  const handleUpdate = async () => {
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch(
        `/api/projects/${projectId}/tasks/${task.id}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            title,
            description,
            status,
            priority,
            dueDate,
            assigneeIds: assigneeIds,
          }),
        },
      );

      const payload = await response.json().catch(() => null);

      if (!response.ok) {
        throw new Error(
          payload?.message ??
            "Impossible de mettre à jour la tâche. Veuillez réessayer.",
        );
      }

      const updatedTask: Task = (payload?.data?.task ??
        payload?.task ??
        payload) as Task;
      onUpdate(updatedTask);
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
        aria-labelledby="update-task-modal-title"
      >
        <div className="flex flex-col items-end w-full ">
          <ModalCloseButton onClick={handleCancel} />
        </div>
        <div className="flex flex-col py-[27.67px] px-0 lg:px-5">
          <h4 id="update-task-modal-title" className="text-abr-grey-800">
            Modifier
          </h4>
          <form className="flex flex-col gap-6 mt-10">
            <FormInput
              inputId="update-task-title"
              inputWidth="max-w-[280px]"
              className="w-full"
              placeHolder="Titre de la tâche"
              label="Titre"
              inputType="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <FormInput
              inputId="update-task-description"
              inputWidth="max-w-[280px]"
              className="w-full"
              placeHolder="Description de la tâche"
              label="Description"
              inputType="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <DateSelectorInput
              inputId="update-task-due-date"
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
              id="update-task-priority"
              width={280}
              height="h-13.25"
              label="Priorité"
              value={priority}
              placeHolder="Sélectionner une priorité"
              onChange={(value) => setPriority(value as Task["priority"])}
              options={[
                { value: "LOW", text: "Basse" },
                { value: "MEDIUM", text: "Moyenne" },
                { value: "HIGH", text: "Haute" },
                { value: "URGENT", text: "Urgente" },
              ]}
            />
            <TaskStatusSelectorInput
              label="Statut :"
              value={status}
              onChange={setStatus}
            />
            <AbrButton
              type="button"
              className="w-61 mt-8 max-w-full"
              color="black"
              label={isSubmitting ? "Mise à jour..." : "Enregistrer"}
              onClick={handleUpdate}
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
