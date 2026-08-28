"use client";

import { useEffect } from "react";
import { FolderIcon, CalendarIcon, MessageIcon } from "@/components/ui/icons";
import Label from "@/components/ui/labels/label";
import AbrButton from "@/components/ui/buttons/abr-button";
import { Task } from "@/types/task";
import { formatDateShort } from "@/lib/utils";

interface TaskShortProps {
  task: Task;
  projectName: string;
  className?: string;
}

export default function TaskShort({
  task,
  projectName,
  className = "",
}: TaskShortProps) {
  // Initialisation directe avec les faux commentaires

  return (
    <div
      className={`${className} w-full h-[229.54px] flex flex-col justify-between py-6.25 px-10 bg-white rounded-[10px] border border-abr-grey-200`}
    >
      {/* Top area */}
      <div className="flex flex-col gap-8">
        {/* Task info */}
        <div className="flex justify-between">
          <div className="flex flex-col gap-1.75">
            <h5 className="font-semibold">{task.title}</h5>
            <p className="text-body-s text-abr-grey-600">{task.description}</p>
          </div>
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
        </div>

        {/* Task addition info (project name, date, comments) */}
        <div className="flex items-center gap-3.75 text-abr-grey-600 text-body-xs -mr-7">
          <p className="flex items-center gap-2">
            <span className="text-abr-grey-400!">
              <FolderIcon className="w-4.5 h-3.5" />
            </span>
            <span className="w-20.25 truncate">{projectName}</span>
          </p>
          <p className="p-0 box-border">|</p>
          <p className="flex items-center gap-2">
            <CalendarIcon className="w-3.75 h-[16.54px]" />
            <span className="w-9.75 truncate">
              {formatDateShort(task.dueDate)}
            </span>
          </p>
          <p>|</p>
          <p className="flex items-center gap-2">
            <MessageIcon className="w-3.75 h-3.75" />
            {task.comments?.length}
          </p>
        </div>
        <AbrButton label="Voir" color="black" className="w-30.25 h-12.5" />
      </div>
    </div>
  );
}
