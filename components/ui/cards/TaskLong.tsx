"use client";

import { useEffect, useState } from "react";
import { FolderIcon, CalendarIcon, MessageIcon } from "@/components/ui/icons";
import Label from "@/components/ui/labels/Label";
import AbrButton from "@/components/ui/buttons/AbrButton";
import { Task } from "@/types/task";

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
  status: "pending",
};

export default function Comments({ taskId }: TaskProps) {
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
    <div className="w-255.5 h-40.5 flex justify-between bg-white rounded-[10px]">
      {/* Left area */}
      <div className="flex flex-col gap-8 ml-7.5 my-[32.23px]">
        {/* Task info */}
        <div className="gap-1.75">
          <h5>{task.name}</h5>
          <p className="text-body-s text-abr-grey-600">{task.description}</p>
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
      <div className="flex flex-col justify-between items-end my-6.25 mr-10">
        <div className="text-body-s">
          {task.status === "pending" && <Label color="red" text="À faire" />}
          {task.status === "inprogress" && (
            <Label color="grey" text="En cours" />
          )}
          {task.status === "done" && <Label color="green" text="Terminé" />}
        </div>
        <AbrButton label="Voir" color="black" className="w-30.25 h-12.5" />
      </div>
    </div>
  );
}
