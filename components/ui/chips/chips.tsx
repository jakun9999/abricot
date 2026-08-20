"use client";

import CheckedboxIcon from "@/components/ui/icons/checkedbox-icon";
import CalendarIcon from "@/components/ui/icons/calendar-icon";
import FolderIcon from "@/components/ui/icons/folder-icon";

export interface ChipsProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Button variant icons.
   * - `task` : Task icon.
   * - `calendar` : Calendar icon.
   * - `folder` : Folder icon.
   *
   * Button variant colors.
   * - `light` : Light orange BG with dark orange icon and text.
   * - `white` : White BG with dark orange icon and text.
   */
  icon: "task" | "calendar" | "folder";
  color: "light" | "white";
  text?: string;
}

/**
 * Chips containing an icon (task, calendar, folder) and the feature name.
 *
 * @example
 * ```tsx
 * <Chips aria-label="Access your tasks" icon="task" color="white" onClick="{handleAiAction}"/>
 * ```
 */
export default function Chips({
  icon,
  color,
  text,
  className = "",
  ...props
}: ChipsProps) {
  const mode =
    color === "white"
      ? "bg-abr-white hover:bg-abr-light-orange transition-colors duration-500"
      : "bg-abr-light-orange";

  return (
    <button
      {...props}
      className={`flex items-center justify-center h-11.25 px-4 gap-3.5 rounded-lg text-abr-dark-orange ${mode} ${className}`}
    >
      {icon === "task" && <CheckedboxIcon className="size-4" />}
      {icon === "calendar" && <CalendarIcon className="size-4" />}
      {icon === "folder" && <FolderIcon className="size-4" />}
      {text && <span className="text-body-s">{text}</span>}
    </button>
  );
}
