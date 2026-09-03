"use client";

import { FolderIcon, CalendarIcon, MessageIcon } from "@/components/ui/icons";
import Label from "@/components/ui/labels/label";
import AbrButton from "@/components/ui/buttons/abr-button";
import { Task } from "@/schemas/task-schema";
import { formatDateShort } from "@/lib/utils";
import UpdateTaskModal from "@/components/ui/modals/update-task-modal";
import { useState } from "react";

export interface TaskShortProps {
  task: Task;
  projectName: string;
  className?: string;
}

/**
 * Carte tâche empilée (mobile / colonnes kanban étroites). Le parent bascule
 * vers {@link components/ui/cards/task-long} à partir de `md` ou `lg` selon la page.
 */
export default function TaskShort({
  task,
  projectName,
  className = "",
}: TaskShortProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div
        className={`${className} w-full flex flex-col justify-between py-6.25 px-6 lg:px-10 bg-white rounded-[10px] border border-abr-grey-200`}
      >
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-1.75">
            <div className="flex justify-between items-start gap-2 min-w-0">
              <h5 className="font-semibold min-w-0 wrap-break-word">
                {task.title}
              </h5>
              <div className="text-body-s shrink-0">
                {task.status === "TODO" && <Label color="red" text="À faire" />}
                {task.status === "IN_PROGRESS" && (
                  <Label color="warningOrangeLight" text="En cours" />
                )}
                {task.status === "DONE" && (
                  <Label color="green" text="Terminé" />
                )}
                {task.status === "CANCELLED" && (
                  <Label color="grey" text="Annulé" />
                )}
              </div>
            </div>
            <p className="text-body-s text-abr-grey-600">{task.description}</p>
          </div>

          <div className="flex flex-wrap items-center gap-3.75 text-abr-grey-600 text-body-xs -mr-7">
            <p className="flex items-center gap-2">
              <span className="text-abr-grey-400!" aria-hidden="true">
                <FolderIcon className="w-4.5 h-3.5" />
              </span>
              <span className="w-20.25 truncate">
                {projectName}
              </span>
            </p>
            <p className="p-0 box-border">|</p>
            <p className="flex items-center gap-2">
              <CalendarIcon className="w-3.75 h-[16.54px]" aria-hidden="true" />
              <span className="w-9.75 truncate">
                {formatDateShort(task.dueDate)}
              </span>
            </p>
            <p>|</p>
            <p className="flex items-center gap-2">
              <MessageIcon className="w-3.75 h-3.75" aria-hidden="true" />
              {task.comments?.length}
            </p>
          </div>
          <AbrButton
            type="button"
            label="Voir"
            color="black"
            className="w-30.25 h-12.5"
            onClick={() => setIsModalOpen(true)}
          />
        </div>
      </div>
      {isModalOpen && (
        <UpdateTaskModal
          task={task}
          projectId={task.projectId}
          onClose={() => setIsModalOpen(false)}
          onUpdate={() => setIsModalOpen(false)}
        />
      )}
    </>
  );
}
