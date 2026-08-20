"use client";

import { useEffect } from "react";
import { FolderIcon, CalendarIcon, MessageIcon } from "@/components/ui/icons";
import Label from "@/components/ui/labels/label";
import AbrButton from "@/components/ui/buttons/abr-button";
import { Task } from "@/types/task";
import { formatDateShort } from "@/lib/utils";

interface TaskProps {
  taskId: string | number;
}

// Jeu de données de test (mock)
const MOCK_TASK_DATA: Task = {
  id: "1",
  title: "Nom de la tâche",
  description: "Description de la tâche",
  projectId: "Nom du projet",
  dueDate: "2026-08-20T00:00:00Z",
  creatorId: "Matthieu LUCAS",
  priority: "HIGH",
  assignees: [
    {
      id: "1",
      taskId: "1",
      userId: "1",
      user: { name: "Matthieu LUCAS", email: "matthieulucas457@outlook.fr" },
      assignedAt: "2026-08-18T10:00:00Z",
    },
  ],
  comments: [
    {
      id: "1",
      authorId: "1",
      author: { name: "Bertrand Dupont", email: "bd@demo.net" },
      content:
        "Attention à bien gérer l'expiration des tokens et le refresh automatique côté client.",
      createdAt: "2026-03-03T11:26:11Z",
    },
    {
      id: "2",
      authorId: "1",
      author: { name: "Bertrand Dupont", email: "bd@demo.net" },
      content:
        "Attention à bien gérer l'expiration des tokens et le refresh automatique côté client.",
      createdAt: "2026-03-03T11:26:11Z",
    },
  ],
  status: "TODO",
};

export default function TaskShort({ taskId }: TaskProps) {
  // Initialisation directe avec les faux commentaires
  const task = MOCK_TASK_DATA;

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

  return (
    <div className="w-92.75 h-[229.75px] flex flex-col justify-between py-6.25 px-10 bg-white rounded-[10px]">
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
        <div className="flex items-center gap-3.75 text-abr-grey-600 text-body-xs">
          <p className="flex items-center gap-2">
            <span className="text-abr-grey-400!">
              <FolderIcon className="w-4.5 h-3.5" />
            </span>
            {task.projectId}
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
      <AbrButton label="Voir" color="black" className="w-30.25 h-12.5" />
    </div>
  );
}
