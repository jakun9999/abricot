"use client";

import { useState } from "react";
import Label from "@/components/ui/labels/label";
import { Task } from "@/schemas/task-schema";
import { getUserInitials } from "@/lib/utils";
import UpdateTaskModal from "@/components/ui/modals/update-task-modal";

interface TaskCalendarProps {
  task: Task;
  projectId: string;
  compact?: boolean;
}

const STATUS_DOT: Record<Task["status"], string> = {
  TODO: "bg-abr-error-red",
  IN_PROGRESS: "bg-abr-warning-orange",
  DONE: "bg-abr-success-green",
  CANCELLED: "bg-abr-grey-400",
};

const STATUS_LABEL: Record<Task["status"], string> = {
  TODO: "À faire",
  IN_PROGRESS: "En cours",
  DONE: "Terminé",
  CANCELLED: "Annulé",
};

export default function TaskCalendar({
  task,
  projectId,
  compact = false,
}: TaskCalendarProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setIsModalOpen(true)}
        aria-label={`Ouvrir la tâche ${task.title}, statut : ${STATUS_LABEL[task.status]}`}
        className={`w-full min-w-0 text-left bg-white rounded-[10px] border border-abr-grey-200 hover:border-abr-dark-orange transition-colors duration-500 cursor-pointer ${
          compact ? "px-1.5 py-1 md:px-2 md:py-1.5" : "px-3 py-2.5"
        }`}
      >
        {compact ? (
          <div className="flex items-start gap-1.5">
            <span
              className={`mt-1 h-2 w-2 shrink-0 rounded-full ${STATUS_DOT[task.status]}`}
              aria-hidden="true"
            />
            <p className="text-body-xs text-abr-grey-800 font-semibold line-clamp-1 md:line-clamp-2">
              {task.title}
            </p>
          </div>
        ) : (
          <>
            <div className="flex items-start justify-between gap-2">
              <p className="text-body-s text-abr-grey-800 font-semibold line-clamp-2">
                {task.title}
              </p>
              <div className="shrink-0">
                {task.status === "TODO" && (
                  <Label color="red" text="À faire" />
                )}
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
            {task.description ? (
              <p className="mt-1 text-body-xs text-abr-grey-600 line-clamp-2">
                {task.description}
              </p>
            ) : null}
            {task.assignees && task.assignees.length > 0 ? (
              <div className="mt-1.5 flex items-center -space-x-1">
                {task.assignees.slice(0, 3).map((assignee) => (
                  <span
                    key={assignee.id ?? assignee.userId}
                    className="flex h-5 w-5 items-center justify-center rounded-full border border-white bg-abr-grey-200 text-[8px] text-abr-grey-800"
                  >
                    {getUserInitials(assignee.user.name)}
                  </span>
                ))}
              </div>
            ) : null}
          </>
        )}
      </button>
      {isModalOpen && (
        <UpdateTaskModal
          task={task}
          projectId={projectId}
          onClose={() => setIsModalOpen(false)}
          onUpdate={() => setIsModalOpen(false)}
        />
      )}
    </>
  );
}
