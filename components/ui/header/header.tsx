"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import MenuItem from "@/components/ui/menus/menu-item";
import { AbricotIcon, UserIcon } from "../icons";
import { useAuth } from "@/context/auth-context";
import { getUserInitials } from "@/lib/utils";

/**
 * Header applicatif. Burger uniquement sous `md` (les MenuItem Figma sont trop
 * larges pour tenir à trois sur mobile).
 */
export default function Header() {
  const pathName = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user } = useAuth();

  const initials = user !== null ? getUserInitials(user.name) : "ER";
  const isActive = (targetPath: string) => {
    if (targetPath === "/") return pathName === "/";
    return pathName === targetPath || pathName.startsWith(`${targetPath}/`);
  };

  return (
    <header className="w-full mx-auto bg-white shadow-[0_4px_12px_1px_rgba(0,0,0,0.02)]">
      <div className="w-full h-23.5 px-4 sm:px-6 lg:px-25 flex items-center justify-between text-abr-dark-orange">
        <Link href="/dashboard" className="shrink-0" aria-label="Abricot, accueil">
          <AbricotIcon className="w-30 h-auto sm:w-36.75" aria-hidden="true" />
        </Link>

        <nav className="hidden md:flex items-center gap-6 text-body-m" aria-label="Navigation principale">
          <Link href="/dashboard" aria-current={isActive("/dashboard") ? "page" : undefined}>
            <MenuItem
              color={isActive("/dashboard") ? "black" : "white"}
              type="dashboard"
            />
          </Link>
          <Link href="/projects" aria-current={isActive("/projects") ? "page" : undefined}>
            <MenuItem
              color={isActive("/projects") ? "black" : "white"}
              type="projects"
            />
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          <Link href="/account" aria-label="Mon compte" aria-current={isActive("/account") ? "page" : undefined}>
            <UserIcon
              label={initials}
              color={isActive("/account") ? "dark" : "light"}
              aria-hidden="true"
            />
          </Link>

          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 md:hidden text-gray-600 hover:text-black"
            aria-label={isMobileMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
            aria-expanded={isMobileMenuOpen}
            aria-controls="menu-mobile"
          >
            {isMobileMenuOpen ? (
              <X size={24} aria-hidden="true" />
            ) : (
              <Menu size={24} aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <nav
          id="menu-mobile"
          className="md:hidden border-t border-gray-100 bg-white px-4 pt-3 pb-6 flex flex-col gap-4 items-center"
          aria-label="Navigation mobile"
        >
          <Link
            href="/dashboard"
            onClick={() => setIsMobileMenuOpen(false)}
            aria-current={isActive("/dashboard") ? "page" : undefined}
          >
            <MenuItem
              color={isActive("/dashboard") ? "black" : "white"}
              type="dashboard"
            />
          </Link>
          <Link
            href="/projects"
            onClick={() => setIsMobileMenuOpen(false)}
            aria-current={isActive("/projects") ? "page" : undefined}
          >
            <MenuItem
              color={isActive("/projects") ? "black" : "white"}
              type="projects"
            />
          </Link>
        </nav>
      )}
    </header>
  );
}
