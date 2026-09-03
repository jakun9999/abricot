"use client";

import { StarIcon } from "@/components/ui/icons/star-icon";

export interface AiSquareButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Variante visuelle.
   * - `dark` : fond orange, texte et icône blancs.
   * - `light` : fond orange clair, texte orange.
   */
  color: "dark" | "light";
  /** Libellé visible (ex. « IA »). */
  label: string;
}

/**
 * Bouton IA avec icône étoile et libellé. Utilisé sur la fiche projet.
 *
 * @example
 * ```tsx
 * <AiSquareButton color="dark" label="IA" onClick={openAiModal} />
 * ```
 */
export default function AiSquareButton({
  label = "",
  className = "",
  color,
  ...props
}: AiSquareButtonProps) {
  const mode =
    color === "dark"
      ? "bg-abr-dark-orange text-white hover:bg-abr-main-orange"
      : "bg-abr-light-orange text-abr-dark-orange hover:bg-abr-main-orange/50";
  return (
    <button
      type="button"
      aria-label={props["aria-label"] ?? `Générer avec l'IA, ${label}`}
      className={`flex items-center justify-center h-12.5 text-body-m hover:cursor-pointer rounded-[10px] gap-2.5 ${mode} ${className}`}
      {...props}
    >
      <StarIcon className="size-5.25" aria-hidden="true" />
      <span className="text-body-m">{label}</span>
    </button>
  );
}
