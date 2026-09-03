"use client";

import { FormEvent, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import AiButton from "@/components/ui/buttons/ai-button";
import AbrButton from "@/components/ui/buttons/abr-button";
import AiTaskDraftCard from "@/components/ui/cards/ai-task-draft-card";
import FormInput from "@/components/ui/inputs/form-input";
import DateSelectorInput from "@/components/ui/inputs/date-selector-input";
import SelectorInput from "@/components/ui/inputs/selector-input";
import StarIcon from "@/components/ui/icons/star-icon";
import {
  AiGeneratedTask,
  normalizeDueDate,
} from "@/schemas/ai-generated-task-schema";
import { Task } from "@/schemas/task-schema";

type DraftTask = AiGeneratedTask & { localId: string };

export default function AiTaskModal({
  projectId,
  onClose,
}: {
  projectId: string;
  onClose: () => void;
}) {
  const router = useRouter();
  const [prompt, setPrompt] = useState("");
  const [drafts, setDrafts] = useState<DraftTask[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [editingDraft, setEditingDraft] = useState<DraftTask | null>(null);

  const hasDrafts = drafts.length > 0;

  const handleGenerate = async (event?: FormEvent) => {
    event?.preventDefault();
    if (isGenerating || isCreating || !prompt.trim()) return;

    setIsGenerating(true);
    setError(null);

    try {
      const response = await fetch(`/api/projects/${projectId}/tasks/ai`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: prompt.trim(),
          existingTasks: drafts.map((draft) => ({
            title: draft.title,
            description: draft.description,
            priority: draft.priority,
            dueDate: draft.dueDate,
          })),
        }),
      });

      const payload = await response.json().catch(() => null);

      if (!response.ok) {
        throw new Error(
          payload?.message ??
            "Impossible de générer les tâches. Veuillez réessayer.",
        );
      }

      const nextTasks = (payload?.tasks ?? []) as AiGeneratedTask[];
      if (nextTasks.length === 0) {
        throw new Error("Aucune tâche n'a été générée. Affinez votre demande.");
      }

      setDrafts(
        nextTasks.map((task) => ({
          ...task,
          localId: crypto.randomUUID(),
        })),
      );
      setPrompt("");
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleAccept = async () => {
    if (isCreating || isGenerating || drafts.length === 0) return;

    setIsCreating(true);
    setError(null);

    try {
      const results = await Promise.allSettled(
        drafts.map((task) =>
          fetch("/api/tasks", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              projectId,
              title: task.title,
              description: task.description,
              priority: task.priority,
              dueDate: task.dueDate,
              assigneeIds: [],
            }),
          }).then(async (response) => {
            const payload = await response.json().catch(() => null);
            if (!response.ok) {
              throw new Error(
                payload?.message ?? "Impossible de créer une tâche.",
              );
            }
            return payload;
          }),
        ),
      );

      const failures = results.filter((result) => result.status === "rejected");
      if (failures.length === results.length) {
        throw new Error("Impossible de créer les tâches. Veuillez réessayer.");
      }

      if (failures.length > 0) {
        throw new Error(
          `${failures.length} tâche${failures.length > 1 ? "s" : ""} n'ont pas pu être créées.`,
        );
      }

      onClose();
      router.refresh();
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setIsCreating(false);
    }
  };

  const handleCancel = () => {
    if (isGenerating || isCreating) return;
    onClose();
  };

  const handleSaveDraft = (updated: DraftTask) => {
    if (!updated.title.trim()) {
      setError("Le titre de la tâche est requis.");
      return;
    }

    setDrafts((current) =>
      current.map((draft) =>
        draft.localId === updated.localId
          ? {
              ...updated,
              title: updated.title.trim(),
              description: updated.description.trim(),
              dueDate: normalizeDueDate(updated.dueDate),
            }
          : draft,
      ),
    );
    setEditingDraft(null);
    setError(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div
        className="flex flex-col bg-white rounded-[10px] w-[min(100%-2rem,598px)] h-[min(90vh,760px)] pt-9.25 pb-8 px-[38.67px]"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="ai-task-modal-title"
      >
        <div className="flex flex-col items-end w-full">
          <Image
            src="/close.svg"
            alt="Fermer"
            className="self-end cursor-pointer text-abr-grey-600"
            width={14.33}
            height={14.33}
            onClick={handleCancel}
          />
        </div>

        <div className="flex items-center gap-2.5 mt-4 px-5">
          <StarIcon className="size-5 text-abr-dark-orange" />
          <h4 id="ai-task-modal-title" className="text-abr-grey-800">
            {hasDrafts ? "Vos tâches..." : "Créer une tâche"}
          </h4>
        </div>

        <div
          className={`flex flex-1 flex-col min-h-0 mt-6 px-5 ${hasDrafts ? "overflow-y-auto" : ""}`}
          aria-busy={isGenerating}
        >
          {hasDrafts ? (
            <div
              className={`flex flex-col gap-4 ${isGenerating ? "opacity-60" : ""}`}
            >
              {drafts.map((draft) => (
                <AiTaskDraftCard
                  key={draft.localId}
                  task={draft}
                  onDelete={() =>
                    setDrafts((current) =>
                      current.filter((item) => item.localId !== draft.localId),
                    )
                  }
                  onEdit={() => setEditingDraft(draft)}
                />
              ))}
              <div className="flex justify-center py-4">
                <AbrButton
                  type="button"
                  color="black"
                  className="w-61"
                  label={isCreating ? "Ajout..." : "+ Ajouter les tâches"}
                  onClick={handleAccept}
                  disabled={isCreating || isGenerating || drafts.length === 0}
                />
              </div>
            </div>
          ) : (
            <div className="flex flex-1 items-center justify-center">
              {isGenerating && (
                <p className="text-body-m text-abr-grey-600">
                  Génération en cours...
                </p>
              )}
            </div>
          )}
        </div>

        {error && <p className="px-5 mt-3 text-red-500 text-sm">{error}</p>}

        <form
          className="mt-4 mx-5 flex items-center gap-2 rounded-full bg-abr-grey-100 pl-5 pr-1.5 py-1.5"
          onSubmit={handleGenerate}
        >
          <input
            className="flex-1 min-w-0 bg-transparent text-body-s text-abr-grey-800 placeholder:text-abr-grey-400 outline-none"
            placeholder="Décrivez les tâches que vous souhaitez ajouter..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            disabled={isGenerating || isCreating}
            aria-label="Prompt de génération de tâches"
          />
          <AiButton
            type="submit"
            color="dark"
            aria-label="Générer les tâches"
            disabled={isGenerating || isCreating || !prompt.trim()}
            className={
              isGenerating || isCreating || !prompt.trim()
                ? "opacity-50 cursor-not-allowed"
                : ""
            }
          />
        </form>
      </div>

      {editingDraft && (
        <DraftEditModal
          draft={editingDraft}
          onClose={() => setEditingDraft(null)}
          onSave={handleSaveDraft}
        />
      )}
    </div>
  );
}

function DraftEditModal({
  draft,
  onClose,
  onSave,
}: {
  draft: DraftTask;
  onClose: () => void;
  onSave: (draft: DraftTask) => void;
}) {
  const [title, setTitle] = useState(draft.title);
  const [description, setDescription] = useState(draft.description);
  const [priority, setPriority] = useState<Task["priority"]>(draft.priority);
  const [dueDate, setDueDate] = useState(draft.dueDate);

  return (
    <div className="fixed inset-0 z-60 flex items-center justify-center bg-black/50">
      <div
        className="flex flex-col bg-white rounded-[10px] lg:w-149.5 pt-9.25 pb-10 px-[38.67px]"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        <div className="flex flex-col items-end w-full">
          <Image
            src="/close.svg"
            alt="Fermer"
            className="self-end cursor-pointer text-abr-grey-600"
            width={14.33}
            height={14.33}
            onClick={onClose}
          />
        </div>
        <div className="flex flex-col py-[27.67px] px-5">
          <h4 className="text-abr-grey-800">Modifier</h4>
          <form className="flex flex-col gap-6 mt-10">
            <FormInput
              inputId="ai-draft-title"
              width="max-[452px]"
              className="w-full"
              placeHolder="Titre de la tâche"
              label="Titre"
              inputType="text"
              mandatory={true}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <FormInput
              inputId="ai-draft-description"
              width="max-[452px]"
              className="w-full"
              placeHolder="Description de la tâche"
              label="Description"
              inputType="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <DateSelectorInput
              width="max-[452px]"
              placeHolder="Sélectionner une date"
              label="Échéance"
              value={dueDate}
              onChange={(e) => setDueDate(normalizeDueDate(e.target.value))}
            />
            <SelectorInput
              id="ai-draft-priority"
              width="max-[452px]"
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
            <AbrButton
              type="button"
              className="w-61 mt-8"
              color="black"
              label="Enregistrer"
              onClick={() =>
                onSave({
                  ...draft,
                  title,
                  description,
                  priority,
                  dueDate,
                })
              }
              disabled={!title.trim()}
            />
          </form>
        </div>
      </div>
    </div>
  );
}
