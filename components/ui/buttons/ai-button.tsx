"use client";

import StarIcon from "@/components/ui/icons/star-icon";

export interface AiButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Variante visuelle.
   * - `dark` : fond orange, icône blanche.
   * - `light` : fond orange clair, icône orange.
   */
  color: "dark" | "light";
}

/**
 * Bouton circulaire (40×40) pour lancer une action IA. Sans texte visible :
 * fournir `aria-label` ou laisser le libellé par défaut « Générer avec l'IA ».
 *
 * @example
 * ```tsx
 * <AiButton color="dark" aria-label="Générer des tâches" onClick={handleGenerate} />
 * ```
 */
export default function AiButton({
  color,
  className = "",
  ...props
}: AiButtonProps) {
  const mode =
    color === "dark"
      ? "bg-abr-dark-orange text-white hover:bg-abr-main-orange"
      : "bg-abr-light-orange text-abr-dark-orange hover:bg-abr-main-orange/50";

  return (
    <button
      {...props}
      type={props.type ?? "button"}
      aria-label={props["aria-label"] ?? "Générer avec l'IA"}
      className={`flex items-center justify-center h-10 w-10 hover:cursor-pointer rounded-full transition-colors duration-500 ${mode} ${className}`}
    >
      <StarIcon className="size-3.5" aria-hidden="true" />
    </button>
  );
}
