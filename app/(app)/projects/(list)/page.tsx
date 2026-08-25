import { Metadata } from "next";
import Project from "@/components/ui/cards/project";

export const metadata: Metadata = {
  title: "Projets",
  description: "Page projets Abricot",
};

const elements: any = [];

for (let i = 0; i < 9; i++) {
  elements.push(
    <div key={i}>
      <Project projectId={i} />
    </div>,
  );
}
export default function Page() {
  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 px-4 lg:px-34.25 gap-x-3.5 gap-y-4.5">
      {elements}
    </div>
  );
}
