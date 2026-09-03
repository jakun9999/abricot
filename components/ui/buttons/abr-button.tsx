"use client";

export interface AbrButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Variante visuelle.
   * - `black` : fond gris foncé, texte blanc (actions principales).
   * - `outline` : fond blanc, bordure et texte orange.
   * - `disabled` : conservé pour le typage Storybook ; passer aussi `disabled` HTML.
   */
  color: "black" | "outline" | "disabled";
  /** Libellé affiché dans le bouton. */
  label: string;
}

/**
 * Bouton d’action principal d’Abricot (création, soumission, navigation).
 *
 * @example
 * ```tsx
 * <AbrButton type="button" color="black" label="Créer un projet" />
 * ```
 */
export default function AbrButton({
  label = "",
  className = "",
  color,
  ...props
}: AbrButtonProps) {
  const mode =
    color === "black"
      ? "bg-gray-800 text-white focus:bg-gray-950 disabled:bg-gray-200 disabled:text-gray-400"
      : "bg-white text-abr-dark-orange border border-abr-dark-orange";
  return (
    <button
      className={`${props.disabled ? "cursor-not-allowed" : "hover:cursor-pointer"} flex items-center justify-center h-12.5 text-body-m rounded-[10px] ${mode} ${className}`}
      {...props}
    >
      {label}
    </button>
  );
}
