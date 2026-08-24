import { Metadata } from "next";
import SearchInput from "@/components/ui/inputs/search-input";
import TaskLong from "@/components/ui/cards/task-long";
import TaskShort from "@/components/ui/cards/task-short";

export const metadata: Metadata = {
  title: "Tableau de bord",
  description: "Tableau de bord Abricot - Suivi des tâches",
};

// Test data for ui display
const elements: any = [];

for (let i = 0; i < 7; i++) {
  elements.push(
    <div key={i}>
      <TaskLong taskId={i} className="hidden md:flex" />
      <TaskShort taskId={i} className="flex md:hidden" />
    </div>,
  );
}

export default function Page() {
  return (
    <div className="w-full min-h-screen mt-7.5 rounded-[10px] border border-abr-grey-200 bg-abr-white px-2.5 md:px-14.75 py-10 ">
      <div className="flex flex-col md:flex-row justify-between items-start gap-1.5 md:gap-0">
        <div className="flex flex-col">
          <h5 className="text-abr-grey-800">Mes tâches assignées</h5>
          <p className="text-abr-grey-600 text-body-m">Par ordre de priorité</p>
        </div>
        <SearchInput
          width="w-full md:w-[357px]"
          placeHolder="Rechercher une tâche"
        />
      </div>
      <div className="flex flex-col mt-10.25 gap-4.25">{elements}</div>
    </div>
  );
}
