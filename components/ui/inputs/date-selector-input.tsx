"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { ChangeEvent, InputHTMLAttributes } from "react";
import { CalendarIcon } from "@/components/ui/icons";
import { formatDateShort } from "@/lib/utils";

const toSafeDate = (value: unknown, fallback = new Date()) => {
  if (value instanceof Date && Number.isFinite(value.getTime())) {
    return value;
  }

  if (typeof value === "string" && value.trim()) {
    const trimmed = value.trim();

    const candidates = [
      trimmed,
      trimmed.includes("T") ? trimmed : `${trimmed}T12:00:00`,
      trimmed.includes("T") && trimmed.endsWith("Z")
        ? trimmed.replace(/Z$/, "")
        : null,
    ].filter(Boolean) as string[];

    for (const candidate of candidates) {
      const parsed = new Date(candidate);
      if (Number.isFinite(parsed.getTime())) {
        return parsed;
      }
    }
  }

  return fallback;
};

const formatDisplayDate = (value?: string) => {
  if (!value) return "";

  const date = toSafeDate(value);
  if (!Number.isFinite(date.getTime())) {
    return "";
  }

  return formatDateShort(date.toISOString());
};

const formatDateForInput = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const getCalendarDays = (monthDate: Date) => {
  const firstDayOfMonth = new Date(
    monthDate.getFullYear(),
    monthDate.getMonth(),
    1,
  );
  const firstWeekDay = (firstDayOfMonth.getDay() + 6) % 7;
  const start = new Date(firstDayOfMonth);
  start.setDate(firstDayOfMonth.getDate() - firstWeekDay);

  return Array.from({ length: 42 }, (_, index) => {
    const day = new Date(start);
    day.setDate(start.getDate() + index);
    return day;
  });
};

export interface DateSelectorInputProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "type"
> {
  label?: string;
  width?: string;
  placeHolder?: string;
  inputId?: string;
}

export default function DateSelectorInput({
  label = "",
  inputId,
  width = "w-[220px]",
  placeHolder = "Sélectionner une date",
  className = "",
  value,
  onChange,
  ...props
}: DateSelectorInputProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [calendarMonth, setCalendarMonth] = useState(() =>
    toSafeDate(value ?? undefined),
  );

  const selectedDate = typeof value === "string" && value ? value : "";
  const displayValue = formatDisplayDate(selectedDate);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!containerRef.current) return;
      if (!containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const calendarDays = useMemo(
    () => getCalendarDays(calendarMonth),
    [calendarMonth],
  );

  const handleSelectDate = (date: Date) => {
    const nextValue = formatDateForInput(date);

    setIsOpen(false);
    setCalendarMonth(new Date(`${nextValue}T12:00:00`));

    const syntheticEvent = {
      target: {
        name: props.name ?? "",
        value: nextValue,
      },
    } as ChangeEvent<HTMLInputElement>;

    onChange?.(syntheticEvent);
  };

  return (
    <div className="flex flex-col gap-1.75">
      {label ? (
        <label htmlFor={inputId} className="text-body-s text-black">
          {label}
        </label>
      ) : null}

      <div ref={containerRef} className={`relative inline-block ${width}`}>
        <button
          id={inputId}
          type="button"
          aria-label={props["aria-label"] ?? "Sélectionner une date"}
          onClick={() => {
            if (selectedDate) {
              setCalendarMonth(toSafeDate(selectedDate));
            }
            setIsOpen((prev) => !prev);
          }}
          className={`
            flex h-13.25 w-full items-center justify-between gap-2
            rounded-sm border border-abr-grey-200 bg-white px-4.25
            text-body-s text-abr-grey-600 placeholder:text-abr-grey-300 focus:outline-abr-dark-orange focus:outline focus:outline-offset-0 focus:outline-solid
            ${className}
          `}
        >
          <span className="truncate text-left text-body-s text-abr-grey-600 placeholder:text-abr-grey-300">
            {displayValue || placeHolder}
          </span>

          <span className="flex shrink-0 items-center justify-center text-abr-grey-600">
            <CalendarIcon className="h-4 w-4" />
          </span>
        </button>

        {isOpen && (
          <div className="absolute left-0 top-[calc(100%+8px)] z-50 w-70 rounded-lg border border-abr-grey-200 bg-white p-3 shadow-md">
            <div className="mb-3 flex items-center justify-between gap-2 text-body-xs text-abr-grey-800">
              <button
                type="button"
                onClick={() =>
                  setCalendarMonth(
                    new Date(
                      calendarMonth.getFullYear(),
                      calendarMonth.getMonth() - 1,
                      1,
                    ),
                  )
                }
                className="flex h-7 w-7 items-center justify-center rounded-md hover:bg-abr-light-orange"
                aria-label="Mois précédent"
              >
                ←
              </button>

              <span className="font-medium">
                {Number.isFinite(calendarMonth.getTime())
                  ? new Intl.DateTimeFormat("fr-FR", {
                      month: "long",
                      year: "numeric",
                    }).format(calendarMonth)
                  : new Intl.DateTimeFormat("fr-FR", {
                      month: "long",
                      year: "numeric",
                    }).format(new Date())}
              </span>

              <button
                type="button"
                onClick={() =>
                  setCalendarMonth(
                    new Date(
                      calendarMonth.getFullYear(),
                      calendarMonth.getMonth() + 1,
                      1,
                    ),
                  )
                }
                className="flex h-7 w-7 items-center justify-center rounded-md hover:bg-abr-light-orange"
                aria-label="Mois suivant"
              >
                →
              </button>
            </div>

            <div className="mb-2 grid grid-cols-7 gap-1 text-center text-[10px] font-medium text-abr-grey-600">
              {["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"].map((day) => (
                <span key={day} className="py-1">
                  {day}
                </span>
              ))}
            </div>

            <div className="grid grid-cols-7 gap-1">
              {calendarDays.map((day, index) => {
                const dateKey = formatDateForInput(day);
                const isCurrentMonth =
                  day.getMonth() === calendarMonth.getMonth();
                const isSelected = selectedDate === dateKey;
                const isToday = formatDateForInput(new Date()) === dateKey;

                return (
                  <button
                    key={`${dateKey}-${index}`}
                    type="button"
                    onClick={() => handleSelectDate(day)}
                    className={`
                      flex h-8 w-8 items-center justify-center rounded-md text-body-xs
                      transition-colors
                      ${isCurrentMonth ? "text-abr-grey-800" : "text-abr-grey-400"}
                      ${isSelected ? "bg-abr-dark-orange text-white" : "hover:bg-abr-light-orange"}
                      ${isToday && !isSelected ? "border border-abr-dark-orange/30" : ""}
                    `}
                  >
                    {day.getDate()}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
