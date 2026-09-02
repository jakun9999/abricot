import React from "react";

import NewProjectButton from "@/components/ui/buttons/new-project-button";

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="mt-19 flex flex-col items-center w-full">
        <div className="flex flex-col md:flex-row gap-5 md:gap-0 md:justify-between md:items-end w-full px-4 lg:px-34.25 box-border">
          <div className="flex flex-col gap-3.5">
            <h1 aria-label="Liste des projets Abricot" className="sr-only"></h1>
            <h4>Mes projets</h4>
            <p className="text-body-l">Gérez vos projets</p>
          </div>
          <NewProjectButton />
        </div>
        <div className="flex flex-col w-full mt-16 mb-19.5">{children}</div>
      </div>
    </>
  );
}
