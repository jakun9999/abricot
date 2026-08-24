"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Chips from "@/components/ui/chips/chips";

export interface DashboardMenuProps extends React.HTMLAttributes<HTMLDivElement> {}

export default function DashboardMenu({ className = "" }: DashboardMenuProps) {
  const pathName = usePathname();

  return (
    <div className={`flex gap-2.5 ${className}`}>
      <Link href="/dashboard">
        <Chips
          icon="task"
          text="Liste"
          color={pathName === "/dashboard" ? "light" : "white"}
        />
      </Link>
      <Link href="/dashboard/kanban">
        <Chips
          icon="calendar"
          text="Kanban"
          color={pathName === "/dashboard/kanban" ? "light" : "white"}
        />
      </Link>
    </div>
  );
}
