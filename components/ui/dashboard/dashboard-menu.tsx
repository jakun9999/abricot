"use client";

import { usePathname } from "next/navigation";
import Chips from "@/components/ui/chips/chips";

export interface DashboardMenuProps {
  className?: string;
}

export default function DashboardMenu({ className = "" }: DashboardMenuProps) {
  const pathName = usePathname();

  return (
    <nav className={`flex gap-2.5 ${className}`} aria-label="Vues du tableau de bord">
      <Chips
        href="/dashboard"
        icon="task"
        text="Liste"
        color={pathName === "/dashboard" ? "light" : "white"}
        current={pathName === "/dashboard"}
      />
      <Chips
        href="/dashboard/kanban"
        icon="calendar"
        text="Kanban"
        color={pathName === "/dashboard/kanban" ? "light" : "white"}
        current={pathName === "/dashboard/kanban"}
      />
    </nav>
  );
}
