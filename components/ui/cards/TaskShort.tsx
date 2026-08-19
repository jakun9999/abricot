"use client";

import { useEffect, useState } from "react";
import { FolderIcon, CalendarIcon, MessageIcon } from "@/components/ui/icons";
import Label from "@/components/ui/labels/Label";
import AbrButton from "@/components/ui/buttons/AbrButton";

export interface Task {
  id?: string | number;
  name: string;
  description: string;
  projectName: string;
  date: string;
  comments: number;
  status: "todo" | "started" | "finished";
}

interface TaskProps {
  taskId: string | number;
}

// Jeu de données de test (mock)
const MOCK_TASK_DATA: Task = {
  id: 1,
  name: "Nom de la tâche",
  description: "Description de la tâche",
  projectName: "Nom du projet",
  date: "9 mars",
  comments: 2,
  status: "todo",
};

export default function TaskShort({ taskId }: TaskProps) {
  // Initialisation directe avec les faux commentaires
  const [task, setTask] = useState<Task>(MOCK_TASK_DATA);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    /*
        // --- CODE D'APPEL API EN ATTENTE ---
        async function fetchComments() {
          try {
            setLoading(true);
            const response = await fetch(`/api/tasks/${taskId}/comments`);
            if (!response.ok) throw new Error('Erreur lors de la récupération');
            
            const data: CommentData[] = await response.json();
            setComments(data);
          } catch (error) {
            console.error(error);
          } finally {
            setLoading(false);
          }
        }
    
        if (taskId) {
          fetchComments();
        }
        */
  }, [taskId]);

  if (loading) {
    return (
      <div className="text-sm text-gray-500 animate-pulse">
        Chargement de la tâche...
      </div>
    );
  }

  return (
    <div className="w-92.75 h-[229.75px] flex flex-col justify-between py-6.25 px-10 bg-white rounded-[10px]">
      {/* Top area */}
      <div className="flex flex-col gap-8">
        {/* Task info */}
        <div className="flex justify-between">
          <div className="gap-1.75">
            <h5 className="font-semibold">{task.name}</h5>
            <p className="text-body-s text-abr-grey-600">{task.description}</p>
          </div>
          <div className="text-body-s">
            {task.status === "todo" && <Label color="red" text="À faire" />}
            {task.status === "started" && (
              <Label color="grey" text="En cours" />
            )}
            {task.status === "finished" && (
              <Label color="green" text="Terminé" />
            )}
          </div>
        </div>

        {/* Task addition info (project name, date, comments) */}
        <div className="flex items-center gap-3.75 text-abr-grey-600 text-body-xs">
          <p className="flex items-center gap-2">
            <span className="text-abr-grey-400!">
              <FolderIcon className="w-4.5 h-3.5" />
            </span>
            {task.projectName}
          </p>
          <p className="text-abr-grey-600">|</p>
          <p className="flex items-center gap-2">
            <CalendarIcon className="w-3.75 h-3.5" />
            {task.date}
          </p>
          <p>|</p>
          <p className="flex items-center gap-2">
            <MessageIcon className="w-3.75 h-3.75" />
            {task.comments}
          </p>
        </div>
      </div>
      <AbrButton label="Voir" color="black" className="w-30.25 h-12.5" />
    </div>
  );
}
