import DashboardIcon from "@/components/ui/icons/DashboardIcon";
import FolderIcon from "@/components/ui/icons/FolderIcon";

export interface MenuItemProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * MenuItem variant colors.
   * - `black` : Black BG with white text and icon.
   * - `white` : White BG with dark orange text and icon.
   */
  color: "black" | "white";
  type: "dashboard" | "projects";
}

/**
 * Menu item for header navigation. It contains an icon and a label.
 * @example
 * ```tsx
 * <MenuItem aria-label="Dashboard" color="black" type="dashboard"/>
 * ```
 */
export default function MenuItem({
  color,
  type,
  className = "h-16.25 w-16.25",
  ...props
}: MenuItemProps) {
  const mode =
    color === "black"
      ? "bg-black text-white"
      : "bg-white text-abr-dark-orange hover:bg-black hover:text-white transition-colors duration-500";

  return (
    <div
      className={`flex items-center justify-center h-19.5 w-62 cursor-pointer text-body-m rounded-[10px] ${mode} ${className}`}
      {...props}
    >
      {type === "dashboard" ? (
        <>
          <DashboardIcon />
          <span className="ml-4">Tableau de bord</span>
        </>
      ) : (
        <>
          <FolderIcon />
          <span className="ml-4">Projets</span>
        </>
      )}
    </div>
  );
}
