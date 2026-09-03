"use client";

import { useState } from "react";
import {
  BottomarrowIcon,
  UparrowIcon,
  CalendarIcon,
} from "@/components/ui/icons";
import Label from "@/components/ui/labels/label";
import { Task } from "@/schemas/task-schema";
import { Comment } from "@/schemas/comment-schema";
import { getUserInitials, formatDateShort } from "@/lib/utils";
import Comments from "../comments/comments";
import IconButton from "../buttons/icon-button";
import UpdateTaskModal from "../modals/update-task-modal";

interface TaskProps {
  task: Task;
  projectId?: string;
}

export default function TaskDetailed({ task, projectId }: TaskProps) {
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState<Comment[]>(task.comments ?? []);
  const commentsCount = comments.length;
  const resolvedProjectId = projectId ?? task.projectId;
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className="max-w-255.5 flex flex-col justify-between py-6.25 px-2.5 lg:px-10 bg-white rounded-[10px] border border-abr-grey-200">
        {/* Top area */}
        <div className="flex flex-col gap-6">
          {/* Task header (title status button description) */}
          <div className="flex items-start justify-between gap-2 min-w-0">
            <div className="flex flex-col gap-1.75 mb-2 min-w-0">
              <div className="flex flex-wrap gap-2 items-center min-w-0">
                <h5 className="font-semibold min-w-0 wrap-break-word">
                  {task.title}
                </h5>
                <div className="text-body-s shrink-0 mr-2 lg:mr-0">
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
              <p className="text-body-s text-abr-grey-600">
                {task.description}
              </p>
            </div>
            <IconButton
              label="points"
              className="h-14.25 w-14.25 shrink-0"
              aria-label="Modifier la tâche"
              onClick={() => setIsModalOpen(true)}
            />
          </div>

          {/* Task deadline */}
          <div className="flex items-center">
            <p className="mr-1 text-body-xs text-abr-grey-600">Échéance :</p>
            <CalendarIcon className="w-3.75 h-[16.54px] text-abr-grey-800" aria-hidden="true" />
            <p className="ml-2 text-abr-grey-800 text-body-xs">
              {formatDateShort(task.dueDate)}
            </p>
          </div>
          {/* Assignement */}
          <div className="flex items-center">
            <p className="text-body-xs text-abr-grey-600 mr-2">Assigné à :</p>
            <div className="flex flex-wrap items-center gap-2 min-w-0">
              {task.assignees?.map((taskAssignee) => (
                <p key={taskAssignee.id} className="flex items-center">
                  <span className="flex justify-center items-center mr-1 p-0 rounded-full border-2 border-abr-white w-6.25 h-6.25 bg-abr-grey-200 text-[10px] text-abr-grey-950">
                    {getUserInitials(taskAssignee.user.name)}
                  </span>
                  <Label color="grey" text={taskAssignee.user.name} />
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
            aria-expanded={showComments}
            aria-controls={task.id ? `commentaires-${task.id}` : undefined}
          >
            <div className="flex justify-between items-center">
              <p className="text-abr-grey-800 text-body-s">
                Commentaires ({commentsCount})
              </p>

              {showComments ? (
                <UparrowIcon className="w-4 h-2" aria-hidden="true" />
              ) : (
                <BottomarrowIcon className="w-4 h-2" aria-hidden="true" />
              )}
            </div>
          </button>
          {showComments && task.id && resolvedProjectId && (
            <div id={`commentaires-${task.id}`}>
              <Comments
                projectId={resolvedProjectId}
                taskId={task.id}
                comments={comments}
                onCommentAdded={(comment) =>
                  setComments((previousComments) => [
                    ...previousComments,
                    comment,
                  ])
                }
              />
            </div>
          )}
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
