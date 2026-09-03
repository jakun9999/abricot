"use client";

import Link from "next/link";
import Header from "@/components/ui/header/header";
import Footer from "@/components/ui/footer/footer";
import { AbricotIcon } from "@/components/ui/icons";
import { useAuth } from "@/context/auth-context";

/**
 * 404 : chrome app (header/footer) seulement après lecture de `user_data`.
 * Sans ça, un utilisateur connecté verrait d’abord la version « guest ».
 */
export default function NotFoundPage() {
  const { user, isReady } = useAuth();

  if (!isReady) {
    return (
      <main
        className="flex min-h-screen w-full items-center justify-center bg-white"
        aria-busy="true"
        aria-label="Chargement"
      >
        <AbricotIcon
          className="w-[252.57px] max-w-full h-[32.17px] text-abr-dark-orange"
          aria-hidden="true"
        />
      </main>
    );
  }

  if (!user) {
    return (
      <main className="flex min-h-screen w-full flex-col items-center bg-white px-4 py-[111.92px]">
        <AbricotIcon
          className="w-[252.57px] max-w-full h-[32.17px] text-abr-dark-orange"
          aria-label="Logo Abricot"
          role="img"
        />
        <div className="flex flex-1 flex-col items-center justify-center gap-7.25">
          <h1 className="text-abr-dark-orange">404</h1>
          <p className="max-w-70.5 text-center text-body-m text-abr-grey-600">
            Cette page n&apos;existe pas ou a été déplacée.
          </p>
          <Link
            href="/login"
            className="flex h-12.5 w-62.25 max-w-full items-center justify-center rounded-[10px] bg-black text-body-m text-abr-white"
          >
            Se connecter
          </Link>
        </div>
      </main>
    );
  }

  return (
    <div className="app-container max-w-360 min-h-screen w-full mx-auto flex flex-col items-center overflow-x-hidden lg:overflow-x-visible">
      <a
        href="#contenu-principal"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-100 focus:bg-white focus:px-4 focus:py-2 focus:text-abr-grey-800"
      >
        Aller au contenu principal
      </a>
      <Header />
      <main
        id="contenu-principal"
        className="bg-abr-grey-50 w-full flex-1"
        tabIndex={-1}
      >
        <div className="px-4 lg:pl-25 lg:pr-31.25 py-14.25">
          <div className="flex flex-col w-full max-w-303.75 border border-abr-grey-200 rounded-[10px] bg-abr-white px-4 md:px-8 lg:px-14.75 py-10 gap-6">
            <div className="flex flex-col gap-2">
              <h1 className="sr-only">Page introuvable</h1>
              <h4 className="text-abr-grey-800" aria-hidden="true">
                Page introuvable
              </h4>
              <p className="text-abr-grey-600 text-body-l">
                Cette page n&apos;existe pas ou a été déplacée.
              </p>
            </div>
            <Link
              href="/dashboard"
              className="flex h-12.5 w-60.5 max-w-full items-center justify-center rounded-[10px] bg-gray-800 text-body-m text-white hover:cursor-pointer"
            >
              Retour au tableau de bord
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
