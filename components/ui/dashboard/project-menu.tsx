"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import Chips from "@/components/ui/chips/chips";

export interface ProjectMenuProps {
  projectId: string;
  className?: string;
}

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
    <div className={`flex gap-2.5 ${className}`}>
      <Link href={listHref}>
        <Chips
          icon="task"
          text="Liste"
          color={!isCalendar ? "light" : "white"}
        />
      </Link>
      <Link href={calendarHref}>
        <Chips
          icon="calendar"
          text="Calendrier"
          color={isCalendar ? "light" : "white"}
        />
      </Link>
    </div>
  );
}
