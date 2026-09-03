import React from "react";
import DashboardMenu from "@/components/ui/dashboard/dashboard-menu";
import AuthUserLabel from "@/components/ui/auth/auth-user-label";
import NewProjectButton from "@/components/ui/buttons/new-project-button";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="mt-10 flex flex-col items-center w-full">
        <div className="flex flex-col md:flex-row gap-5 md:gap-0 md:justify-between w-full pl-4 pr-4 lg:pl-25 lg:pr-31.25 box-border">
          <div className="flex flex-col gap-3.5">
            <h1 className="sr-only">Tableau de bord</h1>
            {/* h4 visuel : la maquette n’utilise pas un h1 40 px. */}
            <h4 aria-hidden="true">Tableau de bord</h4>
            <p className="text-body-l">
              Bonjour <AuthUserLabel />, voici un aperçu de vos projets et
              tâches
            </p>
          </div>
          <NewProjectButton />
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
