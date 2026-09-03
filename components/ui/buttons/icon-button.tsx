import BackarrowIcon from "@/components/ui/icons/backarrow-icon";
import PointsIcon from "@/components/ui/icons/points-icon";

export interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Pictogramme affiché. Le nom accessible est déduit si `aria-label` n’est pas fourni.
   * - `back` : retour (flèche).
   * - `points` : actions supplémentaires (trois points).
   */
  label: "back" | "points";
}

/**
 * Bouton icône bordé (carré arrondi). Taille par défaut 57×57 (`h-14.25`), pas 40×40 :
 * c’est la cote Figma du bouton « retour / plus ».
 *
 * @example
 * ```tsx
 * <IconButton label="back" aria-label="Retour à la liste des projets" />
 * ```
 */
export default function IconButton({
  label,
  className = "h-14.25 w-14.25",
  ...props
}: IconButtonProps) {
  let mode = "";

  if (label === "back") {
    mode =
      "text-black border-gray-200 hover:border-abr-dark-orange hover:text-abr-dark-orange transition-colors duration-500";
  } else {
    mode =
      "text-gray-600 border-gray-200 hover:border-abr-dark-orange hover:text-abr-dark-orange transition-colors duration-500";
  }

  const accessibleName =
    props["aria-label"] ??
    (label === "back" ? "Retour" : "Plus d'actions");

  return (
    <button
      type="button"
      className={`flex items-center justify-center text-caption-l cursor-pointer rounded-[10px] border bg-white ${mode} ${className}`}
      aria-label={accessibleName}
      {...props}
    >
      {label === "back" && <BackarrowIcon aria-hidden="true" />}
      {label === "points" && <PointsIcon aria-hidden="true" />}
    </button>
  );
}
