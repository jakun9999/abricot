"use client";

import { useEffect, useState } from "react";
import {
  BottomarrowIcon,
  UparrowIcon,
  CalendarIcon,
} from "@/components/ui/icons";
import Label from "@/components/ui/labels/Label";
import { Task } from "@/types/task";
import { Comment } from "@/types/comment";
import { getUserInitials, formatDateShort } from "@/lib/utils";
import Comments from "../comments/Comments";
import IconButton from "../buttons/IconButton";

interface TaskProps {
  taskId: string | number;
}

// Jeu de données de test (mock)
const MOCK_TASK_DATA: Task = {
  id: 1,
  name: "Nom de la tâche",
  description: "Description de la tâche",
  projectName: "Nom du projet",
  date: "2026-08-20T00:00:00Z",
  userId: "Matthieu LUCAS",
  assignedUsersId: ["Georges DUPONT", "Margaret DUBOIS"],
  comments: [
    {
      id: 1,
      description: "Un premier commentaire",
      userFullName: "David DUPONT",
      createdAt: "2026-08-21T10:21:00Z",
    },
    {
      id: 2,
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
  const [showComments, setShowComments] = useState(false);
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

  const commentsCount = task.comments?.length ?? 0;

  if (loading) {
    return (
      <div className="text-sm text-gray-500 animate-pulse">
        Chargement de la tâche...
      </div>
    );
  }

  return (
    <div className="w-255.5 flex flex-col justify-between py-6.25 px-10 bg-white rounded-[10px]">
      {/* Top area */}
      <div className="flex flex-col gap-6">
        {/* Task header (title status button description) */}
        <div className="flex items-start justify-between">
          <div className=" flex flex-col gap-1.75 mb-2">
            <div className="flex gap-2 items-center">
              <h5 className="font-semibold">{task.name}</h5>
              <div className="text-body-s">
                {task.status === "pending" && (
                  <Label color="red" text="À faire" />
                )}
                {task.status === "inprogress" && (
                  <Label color="grey" text="En cours" />
                )}
                {task.status === "done" && (
                  <Label color="green" text="Terminé" />
                )}
              </div>
            </div>
            <p className="text-body-s text-abr-grey-600">{task.description}</p>
          </div>
          <IconButton label="points" />
        </div>

        {/* Task deadline */}
        <div className="flex items-center">
          <p className="mr-1 text-body-xs text-abr-grey-600">Échéance :</p>
          <CalendarIcon className="w-3.75 h-[16.54px] text-abr-grey-800" />
          <p className="ml-2 text-abr-grey-800 text-body-xs">
            {formatDateShort(task.date)}
          </p>
        </div>
        {/* Assignement */}
        <div className="flex items-center">
          <p className="text-body-xs text-abr-grey-600 mr-2">Assigné à :</p>
          <div className="flex items-center gap-2">
            {task.assignedUsersId?.map((userFullName) => (
              <p key={userFullName} className="flex items-center">
                <span className="flex justify-center items-center mr-1 p-0 rounded-full border-2 border-abr-white w-6.25 h-6.25 bg-abr-grey-200 text-[10px] text-abr-grey-950">
                  {getUserInitials(userFullName)}
                </span>
                <Label color="grey" text={userFullName} />
              </p>
            ))}
          </div>
        </div>
        {/* Separator */}
        <div className="bg-abr-grey-200 h-px w-full"></div>
        {/* Comments */}
        <button
          onClick={() => setShowComments(!showComments)}
          className="text-abr-grey-950 hover:text-black"
          type="button"
        >
          <div className="flex justify-between items-center">
            <p className="text-abr-grey-800 text-body-s">
              Commentaires ({commentsCount})
            </p>

            {/* Alternance de l'icône selon l'état */}
            {showComments ? (
              <UparrowIcon className="w-4 h-2" />
            ) : (
              <BottomarrowIcon className="w-4 h-2" />
            )}
          </div>
        </button>
        {showComments && <Comments initialComments={task.comments} />}
      </div>
    </div>
  );
}
