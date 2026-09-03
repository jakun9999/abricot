import CheckedboxIcon from "@/components/ui/icons/checkedbox-icon";
import CalendarIcon from "@/components/ui/icons/calendar-icon";
import FolderIcon from "@/components/ui/icons/folder-icon";
import Link from "next/link";

export interface ChipsProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Pictogramme à gauche du libellé.
   * - `task` : case cochée (vue liste).
   * - `calendar` : calendrier / kanban.
   * - `folder` : dossier (projets).
   */
  icon: "task" | "calendar" | "folder";
  /**
   * Fond. `light` = état actif (orange clair), `white` = inactif.
   */
  color: "light" | "white";
  /** Texte affiché à droite de l’icône. */
  text?: string;
  /**
   * Si fourni, le chip est un lien Next.js (évite un bouton dans un `<Link>`).
   * Sinon c’est un `<button>`.
   */
  href?: string;
  /** Page courante : pose `aria-current="page"` sur le lien. */
  current?: boolean;
}

/**
 * Puce de navigation (Liste / Kanban / Calendrier). Lien si `href`, bouton sinon.
 *
 * @example
 * ```tsx
 * <Chips href="/dashboard" icon="task" text="Liste" color="light" current />
 * ```
 */
export default function Chips({
  icon,
  color,
  text,
  href,
  current = false,
  className = "",
  ...props
}: ChipsProps) {
  const mode =
    color === "white"
      ? "bg-abr-white hover:bg-abr-light-orange transition-colors duration-500"
      : "bg-abr-light-orange";

  const classes = `flex items-center justify-center h-11.25 px-4 gap-3.5 hover:cursor-pointer rounded-lg text-abr-dark-orange ${mode} ${className}`;

  const content = (
    <>
      {icon === "task" && <CheckedboxIcon className="size-4" aria-hidden="true" />}
      {icon === "calendar" && (
        <CalendarIcon className="size-4" aria-hidden="true" />
      )}
      {icon === "folder" && <FolderIcon className="size-4" aria-hidden="true" />}
      {text && <span className="text-body-s">{text}</span>}
    </>
  );

  if (href) {
    return (
      <Link
        href={href}
        className={classes}
        aria-current={current ? "page" : undefined}
      >
        {content}
      </Link>
    );
  }

  return (
    <button {...props} className={classes}>
      {content}
    </button>
  );
}
