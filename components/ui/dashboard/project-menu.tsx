"use client";

import { usePathname, useSearchParams } from "next/navigation";
import Chips from "@/components/ui/chips/chips";

export interface ProjectMenuProps {
  projectId: string;
  className?: string;
}

/**
 * Vues Liste / Calendrier d’un projet. Les query `view` et `date` sont retirées
 * du lien Liste : elles n’ont de sens que sur le calendrier.
 */
export default function ProjectMenu({
  className = "",
  projectId,
}: ProjectMenuProps) {
  const pathName = usePathname();
  const searchParams = useSearchParams();

  const listParams = new URLSearchParams(searchParams.toString());
  listParams.delete("view");
  listParams.delete("date");
  const listQuery = listParams.toString();

  const calendarParams = new URLSearchParams(searchParams.toString());
  const calendarQuery = calendarParams.toString();

  const listHref = listQuery
    ? `/projects/${projectId}?${listQuery}`
    : `/projects/${projectId}`;
  const calendarHref = calendarQuery
    ? `/projects/${projectId}/calendar?${calendarQuery}`
    : `/projects/${projectId}/calendar`;

  const isCalendar = pathName === `/projects/${projectId}/calendar`;

  return (
    <nav className={`flex gap-2.5 ${className}`} aria-label="Vues du projet">
      <Chips
        href={listHref}
        icon="task"
        text="Liste"
        color={!isCalendar ? "light" : "white"}
        current={!isCalendar}
      />
      <Chips
        href={calendarHref}
        icon="calendar"
        text="Calendrier"
        color={isCalendar ? "light" : "white"}
        current={isCalendar}
      />
    </nav>
  );
}
