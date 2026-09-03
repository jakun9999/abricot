"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import AbrButton from "@/components/ui/buttons/abr-button";
import {
  CalendarView,
  formatDateKey,
  formatPeriodLabel,
  parseDateKey,
  shiftCalendarDate,
} from "@/components/ui/dashboard/calendar-utils";

export default function CalendarNav({
  view,
  date,
}: {
  view: CalendarView;
  date: string;
}) {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();
  const currentDate = parseDateKey(date);

  const updateParams = (updates: Record<string, string>) => {
    const params = new URLSearchParams(searchParams.toString());
    Object.entries(updates).forEach(([key, value]) => {
      params.set(key, value);
    });
    replace(`${pathname}?${params.toString()}`);
  };

  const views: { value: CalendarView; label: string }[] = [
    { value: "day", label: "Jour" },
    { value: "week", label: "Semaine" },
    { value: "month", label: "Mois" },
  ];

  return (
    <div className="flex flex-col xl:flex-row gap-4 xl:items-center xl:justify-between">
      <div className="flex flex-col sm:flex-row gap-3 sm:items-center">
        <AbrButton
          type="button"
          color="outline"
          label="Précédent"
          className="w-full sm:w-32.5 px-4 shrink-0"
          onClick={() =>
            updateParams({
              date: formatDateKey(shiftCalendarDate(currentDate, view, -1)),
              view,
            })
          }
        />
        <h5 className="text-abr-grey-800 text-center capitalize min-w-0 flex-1">
          {formatPeriodLabel(currentDate, view)}
        </h5>
        <AbrButton
          type="button"
          color="outline"
          label="Suivant"
          className="w-full sm:w-32.5 px-4 shrink-0"
          onClick={() =>
            updateParams({
              date: formatDateKey(shiftCalendarDate(currentDate, view, 1)),
              view,
            })
          }
        />
      </div>
      <div className="flex gap-2.5 justify-center">
        {views.map((item) => {
          const isActive = view === item.value;
          return (
            <button
              key={item.value}
              type="button"
              onClick={() => updateParams({ view: item.value, date })}
              className={`flex items-center justify-center h-11.25 px-4 rounded-lg text-abr-dark-orange text-body-s hover:cursor-pointer ${
                isActive
                  ? "bg-abr-light-orange"
                  : "bg-abr-white hover:bg-abr-light-orange transition-colors duration-500"
              }`}
            >
              {item.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
