"use client";

import { AbricotIcon, UserIcon } from "@/components/ui/icons";
import MenuItem from "@/components/ui/menus/menu-item";
import { usePathname } from "next/navigation";
import Link from "next/link";

export interface HeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Header parameters.
   * initials: user initials for user badge
   */
  initials: string;
}

/**
 * Header component with current selected auth page.
 *
 * @example
 * ```tsx
 * <Header initals="ML"/>
 * ```
 */
export default function Header({ initials }: HeaderProps) {
  // Initialiaze usePathname to know current page and change
  // selected section.
  const pathName = usePathname();

  return (
    <div className="flex items-center justify-between h-23.5 mx-0 w-screen max-w-360 px-25 text-abr-dark-orange">
      <AbricotIcon className="w-36.75 h-[18.72px]" />
      <div className="flex items-center justify-center gap-4 text-body-m">
        <Link href="/dashboard">
          <MenuItem
            color={pathName.startsWith("/dashboard") ? "black" : "white"}
            type="dashboard"
          />
        </Link>
        <Link href="/projects">
          <MenuItem
            color={pathName === "/projects" ? "black" : "white"}
            type="projects"
          />
        </Link>
      </div>
      <UserIcon
        label={initials}
        color={pathName === "/account" ? "dark" : "light"}
      />
    </div>
  );
}
