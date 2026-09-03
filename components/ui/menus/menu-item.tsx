import DashboardIcon from "@/components/ui/icons/dashboard-icon";
import FolderIcon from "@/components/ui/icons/folder-icon";

export interface MenuItemProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * État visuel. `black` = page active, `white` = inactif (hover inverse les couleurs).
   */
  color: "black" | "white";
  /** Entrée du header : tableau de bord ou liste des projets. */
  type: "dashboard" | "projects";
}

/**
 * Tuile de navigation du header. Rendu en `<div>` volontairement : le lien
 * accessibles est le `<Link>` parent (évite un contrôle imbriqué).
 *
 * @example
 * ```tsx
 * <Link href="/dashboard"><MenuItem color="black" type="dashboard" /></Link>
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
          <DashboardIcon aria-hidden="true" />
          <span className="ml-4">Tableau de bord</span>
        </>
      ) : (
        <>
          <FolderIcon aria-hidden="true" />
          <span className="ml-4">Projets</span>
        </>
      )}
    </div>
  );
}
