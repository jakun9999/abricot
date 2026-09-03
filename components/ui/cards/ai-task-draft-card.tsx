"use client";

import { BinIcon, ModifyIcon } from "@/components/ui/icons";
import type { AiGeneratedTask } from "@/schemas/ai-generated-task-schema";

/**
 * Brouillon de tâche généré par l’IA, avant acceptation / édition.
 */
export default function AiTaskDraftCard({
  task,
  onDelete,
  onEdit,
}: {
  task: AiGeneratedTask;
  onDelete: () => void;
  onEdit: () => void;
}) {
  return (
    <div className="w-full flex flex-col justify-between gap-8 py-6.25 pl-6 pr-4 lg:pl-10 lg:pr-6 bg-white rounded-[10px] border border-abr-grey-200">
      <div className="flex flex-col gap-1.75">
        <h5 className="font-semibold">{task.title}</h5>
        <p className="text-body-s text-abr-grey-600 line-clamp-2">
          {task.description || "Aucune description"}
        </p>
      </div>
      <div className="flex items-center gap-3.75 text-abr-grey-600 text-body-xs">
        <button
          type="button"
          onClick={onDelete}
          className="flex items-center gap-2 hover:cursor-pointer hover:text-abr-grey-800"
        >
          <span className="text-abr-grey-400" aria-hidden="true">
            <BinIcon className="w-4.5 h-3.5" />
          </span>
          Supprimer
        </button>
        <p className="text-abr-grey-600">|</p>
        <button
          type="button"
          onClick={onEdit}
          className="flex items-center gap-2 hover:cursor-pointer hover:text-abr-grey-800"
        >
          <ModifyIcon className="w-3.75 h-3.5" aria-hidden="true" />
          Modifier
        </button>
      </div>
    </div>
  );
}
