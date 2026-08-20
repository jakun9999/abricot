"use client";

import { useEffect, useState } from "react";
import { BinIcon, ModifyIcon } from "@/components/ui/icons";
import Label from "@/components/ui/labels/Label";
import { Task } from "@/types/task";
import { Comment } from "@/types/comment";

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
  comments: [
    {
      description: "Un premier commentaire",
      userFullName: "David DUPONT",
      createdAt: "2026-08-212T10:21:00Z",
    },
    {
      description: "Un commentaire",
      userFullName: "Georges LUCAS",
      createdAt: "2026-08-20T05:21:00Z",
    },
  ],
  status: "pending",
};

export default function TaskDetailed({ taskId }: TaskProps) {
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
    <div className="w-255.5 h-[263.54px] flex flex-col justify-between py-6.25 pl-10 bg-white rounded-[10px]">
      {/* Top area */}
      <div className="flex flex-col gap-8">
        {/* Task info */}

        <div className=" flex flex-col gap-1.75">
          <div className="flex gap-2 items-center">
            <h5 className="font-semibold">{task.name}</h5>
            <div className="text-body-s">
              {task.status === "pending" && (
                <Label color="red" text="À faire" />
              )}
              {task.status === "inprogress" && (
                <Label color="grey" text="En cours" />
              )}
              {task.status === "done" && <Label color="green" text="Terminé" />}
            </div>
          </div>
          <p className="text-body-s text-abr-grey-600">{task.description}</p>
        </div>
      </div>
    </div>
  );
}
