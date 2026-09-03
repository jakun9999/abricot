"use client";

import * as Select from "@radix-ui/react-select";
import { BottomarrowIcon } from "@/components/ui/icons";

export interface SelectorInputProps {
  /** Identifiant du déclencheur (label `aria-labelledby` = `${id}-label`). */
  id: string;
  /** Texte affiché tant qu’aucune option n’est choisie. */
  placeHolder: string;
  /** Libellé visible. Absent sur le filtre Statut (WAVE « Missing label » : ce n’est pas un `<select>` natif). */
  label?: string;
  /** Valeur contrôlée (`option.value`). */
  value?: string;
  /** Valeur initiale en mode non contrôlé. */
  defaultValue?: string;
  /** Largeur CSS (`number` → px, sinon classe / valeur CSS). */
  width?: number | string;
  /** Classe de hauteur du déclencheur. */
  height?: number | string;
  className?: string;
  /** Callback à la sélection. */
  onChange?: (value: string) => void;
  options: {
    value: string;
    text: string;
  }[];
}

/**
 * Liste déroulante Radix (combobox), pas un `<select>` HTML : la liste ouverte
 * suit la maquette (survol orange). WAVE signale « Missing label » ; le nom
 * accessible est fourni via `aria-label` / `aria-labelledby`.
 *
 * @example
 * ```tsx
 * <SelectorInput
 *   id="priority"
 *   label="Priorité"
 *   placeHolder="Sélectionner une priorité"
 *   options={[{ value: "HIGH", text: "Haute" }]}
 *   onChange={setPriority}
 * />
 * ```
 */
export default function SelectorInput({
  id,
  placeHolder,
  width = 152,
  height = "h-[63px]",
  label = "",
  value,
  defaultValue,
  className = "",
  options,
  onChange,
}: SelectorInputProps) {
  const widthValue = typeof width === "number" ? `${width}px` : width;
  const labelId = `${id}-label`;
  const accessibleName = label || placeHolder;

  return (
    <div
      style={{ width: widthValue }}
      className={`inline-block max-w-full ${className}`}
    >
      {label ? (
        <span id={labelId} className="text-body-s text-black">
          {label}
        </span>
      ) : null}
      <Select.Root
        value={value}
        defaultValue={defaultValue}
        onValueChange={onChange}
      >
        <Select.Trigger
          id={id}
          aria-labelledby={label ? labelId : undefined}
          aria-label={accessibleName}
          className={`w-full ${label ? "mt-1.75" : ""} ${height} flex items-center justify-between gap-2 rounded-sm border border-abr-grey-200 bg-white px-4.25 text-body-s text-abr-grey-600 overflow-hidden box-border outline-none focus-visible:ring-2 focus-visible:ring-abr-dark-orange data-[state=open]:ring-2 data-[state=open]:ring-abr-dark-orange`}
        >
          <span className="truncate text-left flex-1 min-w-0">
            <Select.Value placeholder={placeHolder} />
          </span>

          <Select.Icon className="shrink-0">
            <BottomarrowIcon aria-hidden="true" />
          </Select.Icon>
        </Select.Trigger>

        <Select.Portal>
          <Select.Content
            position="popper"
            sideOffset={4}
            style={{ width: widthValue }}
            className="overflow-hidden rounded-lg border border-abr-grey-200 bg-abr-white shadow-md z-50"
          >
            <Select.Viewport className="p-2 box-border w-full">
              {options.map((option) => (
                <Select.Item
                  key={option.value}
                  value={option.value}
                  className="relative flex cursor-pointer select-none items-center rounded-lg py-1.5 px-8 text-body-s text-abr-grey-800 outline-none data-highlighted:bg-abr-light-orange"
                >
                  <Select.ItemText>
                    <span className="block truncate">{option.text}</span>
                  </Select.ItemText>
                </Select.Item>
              ))}
            </Select.Viewport>
          </Select.Content>
        </Select.Portal>
      </Select.Root>
    </div>
  );
}
