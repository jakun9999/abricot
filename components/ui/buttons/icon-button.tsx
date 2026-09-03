import BackarrowIcon from "@/components/ui/icons/backarrow-icon";
import PointsIcon from "@/components/ui/icons/points-icon";

export interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * IconButton predifined label.
   * - `back` : Icon which indicates to the user to go back to previous page.
   * - `points` : Icon which indicates to the user to have more details.
   */
  label: "back" | "points";
}

/**
 * Circular icon button (40x40px) containing the specified label.
 * @example
 * ```tsx
 * <IconButton aria-label="Retour à la liste des projets" label="back"/>
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
