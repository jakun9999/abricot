"use client";

import { BinIcon, ModifyIcon } from "@/components/ui/icons";
import { Task } from "@/types/task";

interface TaskSimpleProps {
  /** Ignoré : la carte sandbox n’appelle pas l’API. */
  taskId: string | number;
}

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

/**
 * Carte sandbox (`/test/ui`) : données mock, pas d’API. Ne pas réutiliser en prod.
 */
export default function TaskSimple({ taskId: _taskId }: TaskSimpleProps) {
  const task = MOCK_TASK_DATA;

  return (
    <div className="w-123.5 h-36.5 flex flex-col justify-between py-6.25 pl-10 bg-white rounded-[10px]">
      <div className="flex flex-col gap-8">
        <div className="flex justify-between">
          <div className="flex flex-col gap-1.75">
            <h5 className="font-semibold">{task.title}</h5>
            <p className="text-body-s text-abr-grey-600">{task.description}</p>
          </div>
        </div>

        <div className="flex items-center gap-3.75 text-abr-grey-600 text-body-xs">
          <p className="flex items-center gap-2">
            <span className="text-abr-grey-400!">
              <BinIcon className="w-4.5 h-3.5" />
            </span>
            Supprimer
          </p>
          <p className="text-abr-grey-600">|</p>
          <p className="flex items-center gap-2">
            <ModifyIcon className="w-3.75 h-3.5" />
            Modifier
          </p>
        </div>
      </div>
    </div>
  );
}
