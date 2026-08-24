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
      <div className="mt-10 md:mt-22.25 flex flex-col items-center">
        <div className="flex flex-col md:flex-row gap-5 md:gap-0 md:justify-between md:items-end max-w-308.75 w-full">
          <div className="flex flex-col gap-3.5 mx-2">
            <h1 aria-label="Tableau de bord Abricot" className="sr-only"></h1>
            <h4>Tableau de bord</h4>
            <p className="text-body-l">
              Bonjour Alice Dupont, voici un aperçu de vos projets et tâches
            </p>
          </div>
          <AbrButton
            color="black"
            label="+ Créer un projet"
            className="w-45.25 h-12.5 mx-2"
          />
        </div>
        <div className="flex flex-col max-w-308.75 w-full ">
          <div className="flex">
            <DashboardMenu className="mt-15 mx-3.25" />
          </div>
          <div className="flex flex-col mx-2">{children}</div>
        </div>
      </div>
    </>
  );
}
