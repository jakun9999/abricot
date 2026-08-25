"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Chips from "@/components/ui/chips/chips";

export interface ProjectMenuProps {
  className?: string;
}

export default function ProjectMenu({ className = "" }: ProjectMenuProps) {
  const pathName = usePathname();

  return (
    <div className={`flex gap-2.5 ${className}`}>
      <Link href="/projects/1">
        <Chips
          icon="task"
          text="Liste"
          color={pathName === "/projects/1" ? "light" : "white"}
        />
      </Link>
      <Link href="/projects/1">
        <Chips
          icon="calendar"
          text="Calendrier"
          color={pathName === "/projects/1/kanban" ? "light" : "white"}
        />
      </Link>
    </div>
  );
}
