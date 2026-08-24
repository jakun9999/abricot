import { Metadata } from "next";
import Label from "@/components/ui/labels/label";
import TaskShort from "@/components/ui/cards/task-short";
import TaskLong from "@/components/ui/cards/task-long";

export const metadata: Metadata = {
  title: "Tableau de bord",
  description: "Tableau de bord Kanban Abricot - Suivi des tâches",
};

const elements: any = [];

for (let i = 0; i < 5; i++) {
  elements.push(
    <div key={i}>
      <TaskLong taskId={i} className="hidden md:flex lg:hidden" />
      <TaskShort taskId={i} className="flex md:hidden lg:flex" />
    </div>,
  );
}

export default function Kanban() {
  return (
    <div className="w-full min-h-screen 2xl:-mx-7.5 mt-12.75 mb-12">
      <div className="grid grid-cols-1 lg:grid-cols-3 justify-between items-start gap-2.5 md:gap-5.5">
        <div className="rounded-[10px] border border-abr-grey-200 bg-abr-white px-6 py-10">
          <div className="flex items-center gap-2 h-6.75">
            <h5>À faire</h5>
            <Label color="grey" text="4" />
          </div>
          <div className="flex flex-col gap-4 mt-10.25">{elements}</div>
        </div>
        <div className="rounded-[10px] border border-abr-grey-200 bg-abr-white px-6 py-10">
          <div className="flex items-center gap-2 h-6.75">
            <h5>En cours</h5>
            <Label color="grey" text="4" />
          </div>
          <div className="flex flex-col gap-4 mt-10.25">{elements}</div>
        </div>
        <div className="rounded-[10px] border border-abr-grey-200 bg-abr-white px-6 py-10">
          <div className="flex items-center gap-2 h-6.75">
            <h5>Terminées</h5>
            <Label color="grey" text="4" />
          </div>
          <div className="flex flex-col gap-4 mt-10.25">{elements}</div>
        </div>
      </div>
    </div>
  );
}
