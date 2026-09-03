"use client";

import { useState } from "react";
import { Comment } from "@/schemas/comment-schema";
import { getUserInitials, formatDateRelative } from "@/lib/utils";
import { useAuth } from "@/context/auth-context";
import AbrButton from "@/components/ui/buttons/abr-button";

export interface CommentsProps {
  projectId: string;
  taskId: string;
  comments?: Comment[];
  onCommentAdded?: (comment: Comment) => void;
}

/**
 * Fil de commentaires d’une tâche. Enter seul va à la ligne ; Ctrl/Cmd+Enter envoie
 * (habitude messagerie, évite les envois accidentels).
 */
export default function Comments({
  projectId,
  taskId,
  comments = [],
  onCommentAdded,
}: CommentsProps) {
  const { user } = useAuth();
  const [newComment, setNewComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const currentUserInitials = user ? getUserInitials(user.name) : "";

  const handleAddComment = async () => {
    if (!newComment.trim() || isSubmitting) return;

    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch(
        `/api/projects/${projectId}/tasks/${taskId}/comments`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ content: newComment.trim() }),
        },
      );

      const payload = await response.json().catch(() => null);

      if (!response.ok) {
        throw new Error(
          payload?.message ??
            "Impossible d'ajouter le commentaire. Veuillez réessayer.",
        );
      }

      const createdComment: Comment | null =
        payload?.data?.comment ?? payload?.comment ?? null;

      if (!createdComment) {
        throw new Error("Le commentaire a été créé mais n'a pas pu être lu.");
      }

      onCommentAdded?.(createdComment);
      setNewComment("");
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full flex flex-col gap-4">
      {comments.map((item, index) => (
        <div key={item.id ?? index} className="flex items-start gap-4.5">
          <div
            className="flex h-6.75 w-6.75 shrink-0 items-center justify-center rounded-full border border-white bg-gray-200 text-[10px] font-normal text-gray-950"
            aria-hidden="true"
          >
            {item.author?.name ? getUserInitials(item.author.name) : "?"}
          </div>

          <div className="flex-1 rounded-[10px] bg-gray-100 px-3.5 py-4.5  min-h-2.75 min-w-0">
            <div className="flex flex-wrap items-center justify-between gap-1 mb-2">
              <span className="text-body-s text-black">
                {item.author?.name ?? "Utilisateur"}
              </span>
              {item.createdAt && (
                <span className="text-body-xs text-gray-600">
                  {formatDateRelative(item.createdAt)}
                </span>
              )}
            </div>
            <p className="leading-relaxed text-black text-body-xs">
              {item.content}
            </p>
          </div>
        </div>
      ))}

      <div className="flex items-start gap-3.5">
        <div className="flex h-6.75 w-6.75 shrink-0 items-center justify-center border border-white rounded-full bg-abr-light-orange text-[10px] font-normal text-black">
          {currentUserInitials}
        </div>

        <div className="flex-1 flex flex-col">
          <div className="rounded-[10px] bg-gray-50  px-3.5 py-4.5 min-h-2.75">
            <textarea
              id={`comment-${taskId}`}
              rows={2}
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
                  e.preventDefault();
                  void handleAddComment();
                }
              }}
              placeholder="Ajouter un commentaire..."
              aria-label="Ajouter un commentaire"
              maxLength={2000}
              className="w-full resize-none text-body-xs text-gray-800 placeholder-gray-400 focus:outline-none"
              disabled={isSubmitting}
            />
          </div>
          <AbrButton
            type="button"
            color="black"
            label={isSubmitting ? "Envoi..." : "Envoyer"}
            className="place-self-end w-52.25 max-w-full mt-4"
            onClick={() => void handleAddComment()}
            disabled={isSubmitting || !newComment.trim()}
          />
          {error && (
            <p className="text-red-500 text-sm mt-2" role="alert">
              {error}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
