import React from "react";
import Header from "@/components/ui/header/header";
import Footer from "@/components/ui/footer/footer";

export default function MainAppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="app-container max-w-360 min-h-screen w-full mx-auto flex flex-col items-center overflow-x-hidden lg:overflow-x-visible">
      <a
        href="#contenu-principal"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-100 focus:bg-white focus:px-4 focus:py-2 focus:text-abr-grey-800"
      >
        Aller au contenu principal
      </a>
      <Header />
      <main id="contenu-principal" className="bg-abr-grey-50 w-full" tabIndex={-1}>
        {children}
      </main>
      <Footer />
    </div>
  );
}
