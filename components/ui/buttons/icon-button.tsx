import BackarrowIcon from "@/components/ui/icons/backarrow-icon";
import PointsIcon from "@/components/ui/icons/points-icon";

export interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * IconButton variant colors.
   * - `black` : Orange Dark BG with white text.
   * - `dark` : Light orange BG with black text.
   */
  label: "back" | "points";
}

/**
 * Circular icon button (40x40px) containing the specified label.
 * @example
 * ```tsx
 * <IconButton aria-label="Back" color="dark" label="back"/>
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

  return (
    <button
      className={`flex items-center justify-center text-caption-l rounded-[10px] border bg-white ${mode} ${className}`}
      {...props}
    >
      {label === "back" && <BackarrowIcon />}
      {label === "points" && <PointsIcon />}
    </button>
  );
}
