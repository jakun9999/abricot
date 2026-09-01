"use client";

import { FolderIcon, CalendarIcon, MessageIcon } from "@/components/ui/icons";
import Label from "@/components/ui/labels/label";
import AbrButton from "@/components/ui/buttons/abr-button";
import { Task } from "@/schemas/task-schema";
import { formatDateShort } from "@/lib/utils";
import TaskUpdateModal from "@/components/ui/modals/task-update-modal";
import { useState } from "react";

interface TaskLongProps {
  task: Task;
  projectName: string;
  className?: string;
}

export default function TaskLong({
  task,
  projectName,
  className = "",
}: TaskLongProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div
        className={`${className} w-full h-40.5 flex justify-between bg-white rounded-[10px] border border-abr-grey-200`}
      >
        {/* Left area */}
        <div className="flex flex-col gap-8 ml-7.5 my-[32.23px]">
          {/* Task info */}
          <div className="flex flex-col gap-1.75">
            <h5>{task.title}</h5>
            <p className="text-body-s text-abr-grey-600">{task.description}</p>
          </div>
          {/* Task addition info (project name, date, comments) */}
          <div className="flex items-center gap-3.75 text-abr-grey-600 text-body-xs">
            <p className="flex items-center gap-2">
              <span className="text-abr-grey-400!">
                <FolderIcon className="w-4.5 h-3.5" />
              </span>
              {projectName}
            </p>
            <p className="text-abr-grey-600">|</p>
            <p className="flex items-center gap-2">
              <CalendarIcon className="w-3.75 h-3.5" />
              {formatDateShort(task.dueDate)}
            </p>
            <p>|</p>
            <p className="flex items-center gap-2">
              <MessageIcon className="w-3.75 h-3.75" />
              {task.comments?.length}
            </p>
          </div>
        </div>
        <div className="flex flex-col justify-between items-end my-6.25 mr-10">
          <div className="text-body-s">
            {task.status === "TODO" && <Label color="red" text="À faire" />}
            {task.status === "IN_PROGRESS" && (
              <Label color="warningOrangeLight" text="En cours" />
            )}
            {task.status === "DONE" && <Label color="green" text="Terminé" />}
            {task.status === "CANCELLED" && (
              <Label color="grey" text="Annulé" />
            )}
          </div>
          <AbrButton
            label="Voir"
            color="black"
            className="w-30.25 h-12.5"
            onClick={() => setIsModalOpen(true)}
          />
        </div>
      </div>
      {isModalOpen && (
        <TaskUpdateModal
          task={task}
          projectId={task.projectId}
          onClose={() => setIsModalOpen(false)}
          onUpdate={() => setIsModalOpen(false)}
        />
      )}
    </>
  );
}
