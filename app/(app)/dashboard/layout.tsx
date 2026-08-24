import React from "react";
import AbrButton from "@/components/ui/buttons/abr-button";
import DashboardMenu from "@/components/ui/dashboard/dashboard-menu";

export default function MainAppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="mt-10 flex flex-col items-center w-full">
        <div className="flex flex-col md:flex-row gap-5 md:gap-0 md:justify-between w-full pl-4 pr-4 lg:pl-25 lg:pr-31.25 box-border">
          <div className="flex flex-col gap-3.5">
            <h1 aria-label="Tableau de bord Abricot" className="sr-only"></h1>
            <h4>Tableau de bord</h4>
            <p className="text-body-l">
              Bonjour Alice Dupont, voici un aperçu de vos projets et tâches
            </p>
          </div>
          <AbrButton
            color="black"
            label="+ Créer un projet"
            className="w-45.25 h-12.5 shrink-0"
          />
        </div>
        <div className="flex flex-col w-full ">
          <div className="flex pl-4 lg:pl-26.25">
            <DashboardMenu className="mt-15" />
          </div>
          {children}
        </div>
      </div>
    </>
  );
}
