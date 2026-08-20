"use client";

import { useEffect, useState } from "react";
import { Comment } from "@/types/comment";
import { getUserInitials, formatDateRelative } from "@/lib/utils";

interface CommentsProps {
  initialComments?: Comment[];
  currentUserInitials?: string;
}

// Jeu de données de test (mock)
const MOCK_COMMENTS: Comment[] = [
  {
    id: 1,
    userFullName: "Bertrand Dupont",
    description:
      "Attention à bien gérer l'expiration des tokens et le refresh automatique côté client.",
    createdAt: "2026-03-03T11:26:11Z",
  },
  {
    id: 2,
    userFullName: "Alice Durand",
    description: "C'est noté, je m'en occupe dans la journée !",
    createdAt: "2026-03-22T09:22:05Z",
  },
];

export default function Comments({
  initialComments,
  currentUserInitials = "AD",
}: CommentsProps) {
  // Initialisation directe avec les faux commentaires
  const [comments, setComments] = useState<Comment[]>(
    initialComments ?? MOCK_COMMENTS,
  );
  const [loading, setLoading] = useState<boolean>(false);
  const [newComment, setNewComment] = useState<string>("");

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
  }, [comments]);

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const commentToAdd: Comment = {
      id: Date.now(),
      userFullName: "Matthieu LUCAS",
      description: newComment.trim(),
      createdAt: new Date().toISOString(),
    };

    setComments((prev) => [...prev, commentToAdd]);
    setNewComment("");
  };

  if (loading) {
    return (
      <div className="text-sm text-gray-500 animate-pulse">
        Chargement des commentaires...
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col gap-4">
      {/* Liste des commentaires */}
      {comments.map((item) => (
        <div key={item.id} className="flex items-start gap-4.5">
          {/* Avatar initiales */}
          <div className="flex h-6.75 w-6.75 shrink-0 items-center justify-center rounded-full border border-white bg-gray-200 text-[10px] font-normal text-gray-950">
            {getUserInitials(item.userFullName)}
          </div>

          {/* Contenu du commentaire */}
          <div className="flex-1 rounded-[10px] bg-gray-100 px-3.5 py-4.5  min-h-2.75">
            <div className="flex items-center justify-between mb-2">
              <span className="text-body-s text-black">
                {item.userFullName}
              </span>
              {item.createdAt && (
                <span className="text-body-xs text-gray-600">
                  {formatDateRelative(item.createdAt)}
                </span>
              )}
            </div>
            <p className="leading-relaxed text-black text-body-xs">
              {item.description}
            </p>
          </div>
        </div>
      ))}

      {/* Champ d'ajout de commentaire */}
      <div className="flex items-start gap-3.5">
        {/* Avatar utilisateur actuel */}
        <div className="flex h-6.75 w-6.75 shrink-0 items-center justify-center border border-white rounded-full bg-abr-light-orange text-[10px] font-normal text-black">
          {currentUserInitials}
        </div>

        {/* Formulaire de saisie */}
        <form onSubmit={handleAddComment} className="flex-1 flex flex-col">
          <div className="rounded-[10px] bg-gray-50  px-3.5 py-4.5 min-h-2.75">
            <textarea
              rows={2}
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Ajouter un commentaire..."
              className="w-full resize-none text-body-xs text-gray-800 placeholder-gray-400 focus:outline-none"
            />
          </div>
          <button
            onClick={(e) => {
              e.preventDefault();
              handleAddComment(e);
            }}
            className="place-self-end w-52.25 h-12.5 mt-4 bg-abr-grey-200 rounded-[10px] text-abr-grey-400 text-body-m"
          >
            Envoyer
          </button>
        </form>
      </div>
    </div>
  );
}
