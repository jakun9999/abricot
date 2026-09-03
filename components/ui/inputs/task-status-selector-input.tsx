"use client";

import { useId } from "react";
import Label from "@/components/ui/labels/label";

export type TaskStatusValue = "TODO" | "IN_PROGRESS" | "DONE" | "CANCELLED";

interface TaskStatusSelectorInputProps {
  label?: string;
  value: TaskStatusValue;
  onChange: (value: TaskStatusValue) => void;
  className?: string;
}

const STATUS_OPTIONS: {
  value: TaskStatusValue;
  label: string;
  color: "red" | "warningOrangeLight" | "green" | "grey";
}[] = [
  { value: "TODO", label: "À faire", color: "red" },
  { value: "IN_PROGRESS", label: "En cours", color: "warningOrangeLight" },
  { value: "DONE", label: "Terminée", color: "green" },
  { value: "CANCELLED", label: "Annulée", color: "grey" },
];

export default function TaskStatusSelectorInput({
  label = "Statut",
  value,
  onChange,
  className = "",
}: TaskStatusSelectorInputProps) {
  const statusLabelId = useId();

  return (
    <div className={`flex flex-col gap-4 ${className}`}>
      {label ? (
        <p id={statusLabelId} className="text-body-s text-black">
          {label}
        </p>
      ) : null}

      <div
        className="flex items-center gap-2"
        role="radiogroup"
        aria-labelledby={label ? statusLabelId : undefined}
        aria-label={label ? undefined : "Statut"}
      >
        {STATUS_OPTIONS.map((option) => {
          const isSelected = option.value === value;

          return (
            <button
              key={option.value}
              type="button"
              role="radio"
              aria-checked={isSelected}
              onClick={() => onChange(option.value)}
              className={`
                rounded-full transition-all
                ${isSelected ? "ring-2 ring-abr-dark-orange ring-offset-1" : ""}
              `}
            >
              <Label
                color={option.color}
                text={option.label}
                className={isSelected ? "shadow-sm" : ""}
              />
            </button>
          );
        })}
      </div>
    </div>
  );
}
