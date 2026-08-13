"use client";

import { useEffect, useState } from "react";

export interface CommentData {
  id?: string | number;
  user: string;
  userInitiales: string;
  comment: string;
  createdAt?: string;
}

interface CommentsProps {
  taskId: string | number;
  currentUserInitials?: string;
}

// Jeu de données de test (mock)
const MOCK_COMMENTS: CommentData[] = [
  {
    id: 1,
    user: "Bertrand Dupont",
    userInitiales: "BD",
    comment:
      "Attention à bien gérer l'expiration des tokens et le refresh automatique côté client.",
    createdAt: "23 mars, 11:20",
  },
  {
    id: 2,
    user: "Alice Durand",
    userInitiales: "AD",
    comment: "C'est noté, je m'en occupe dans la journée !",
    createdAt: "23 mars, 11:45",
  },
];

export default function Comments({
  taskId,
  currentUserInitials = "AD",
}: CommentsProps) {
  // Initialisation directe avec les faux commentaires
  const [comments, setComments] = useState<CommentData[]>(MOCK_COMMENTS);
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
  }, [taskId]);

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const commentToAdd: CommentData = {
      id: Date.now(),
      user: "Vous",
      userInitiales: currentUserInitials,
      comment: newComment.trim(),
      createdAt: new Date().toLocaleDateString("fr-FR", {
        day: "numeric",
        month: "long",
        hour: "2-digit",
        minute: "2-digit",
      }),
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
    <div className="w-full max-w-2xl flex flex-col gap-5">
      {/* Liste des commentaires */}
      {comments.map((item) => (
        <div key={item.id} className="flex items-start gap-3.5">
          {/* Avatar initiales */}
          <div className="flex h-6.75 w-6.75 shrink-0 items-center justify-center rounded-full border border-white bg-gray-200 text-[10px] font-normal text-gray-950">
            {item.userInitiales}
          </div>

          {/* Contenu du commentaire */}
          <div className="flex-1 rounded-[10px] bg-gray-100 px-3.5 py-4.5  min-h-2.75">
            <div className="flex items-center justify-between mb-2">
              <span className="text-body-s text-black">{item.user}</span>
              {item.createdAt && (
                <span className="text-body-xs text-gray-600">
                  {item.createdAt}
                </span>
              )}
            </div>
            <p className="leading-relaxed text-black text-body-xs">
              {item.comment}
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
        <form onSubmit={handleAddComment} className="flex-1">
          <div className="rounded-[10px] bg-gray-50 px-3.5 py-4.5 min-h-2.75">
            <textarea
              rows={2}
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Ajouter un commentaire..."
              className="w-full resize-none bg-transparent text-body-xs text-gray-800 placeholder-gray-400 focus:outline-none"
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleAddComment(e);
                }
              }}
            />
          </div>
        </form>
      </div>
    </div>
  );
}
