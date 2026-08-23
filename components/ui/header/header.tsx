"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react"; // Optionnel : icônes pour le menu burger
import MenuItem from "@/components/ui/menus/menu-item";
import { AbricotIcon, UserIcon } from "../icons";

export interface HeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Header parameters.
   * initials: user initials for user badge
   */
  initials: string;
}

export default function Header({ initials }: HeaderProps) {
  const pathName = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isActive = (targetPath: string) => {
    if (targetPath === "/") return pathName === "/";
    return pathName === targetPath || pathName.startsWith(`${targetPath}/`);
  };

  return (
    <header className="w-full bg-white shadow-[0_4px_12px_1px_rgba(0,0,0,0.02)]">
      <div className="w-full max-w-7xl mx-auto h-23.5 px-4 sm:px-6 lg:px-8 flex items-center justify-between text-abr-dark-orange">
        {/* Logo SVG - Responsive size */}
        <Link href="/" className="shrink-0">
          <AbricotIcon className="w-30 h-auto sm:w-36.75" />
        </Link>

        {/* Navigation Desktop & Tablette */}
        <nav className="hidden md:flex items-center gap-6 text-body-m">
          <Link href="/dashboard">
            <MenuItem
              color={isActive("/dashboard") ? "black" : "white"}
              type="dashboard"
            />
          </Link>
          <Link href="/projects">
            <MenuItem
              color={isActive("/projects") ? "black" : "white"}
              type="projects"
            />
          </Link>
        </nav>

        {/* Actions Droite : Profil + Toggle Mobile */}
        <div className="flex items-center gap-3">
          <Link href="/account">
            <UserIcon
              label={initials}
              color={isActive("/account") ? "dark" : "light"}
            />
          </Link>

          {/* Bouton Burger Mobile */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 md:hidden text-gray-600 hover:text-black focus:outline-none"
            aria-label="Afficher ou masquer le menu le menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Tiroir / Dropdown Mobile */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white px-4 pt-3 pb-6 flex flex-col gap-4 items-center">
          <Link href="/dashboard" onClick={() => setIsMobileMenuOpen(false)}>
            <MenuItem
              color={isActive("/dashboard") ? "black" : "white"}
              type="dashboard"
            />
          </Link>
          <Link href="/projects" onClick={() => setIsMobileMenuOpen(false)}>
            <MenuItem
              color={isActive("/projects") ? "black" : "white"}
              type="projects"
            />
          </Link>
        </div>
      )}
    </header>
  );
}
