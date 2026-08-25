"use client";

import * as Select from "@radix-ui/react-select";
import { BottomarrowIcon } from "@/components/ui/icons";

export interface SelectorInputProps {
  id: string;
  placeHolder: string;
  width?: number | string;
  className?: string;
  options: {
    value: string;
    text: string;
  }[];
}

export default function SelectorInput({
  id,
  placeHolder,
  width = 152,
  className = "",
  options,
}: SelectorInputProps) {
  // Convertit proprement en valeur CSS (ex: 300 -> "300px", "100%" -> "100%")
  const widthValue = typeof width === "number" ? `${width}px` : width;

  return (
    /* 1. Le conteneur externe fixe la largeur stricte */
    <div style={{ width: widthValue }} className={`inline-block ${className}`}>
      <Select.Root>
        <Select.Trigger className="w-full h-15.75 flex items-center justify-between gap-2 rounded-lg border border-gray-200 bg-white px-8 text-body-s text-gray-600 outline-none focus:outline-abr-dark-orange overflow-hidden box-border">
          {/* 2. Le texte est forcé de se couper sans pousser les bords */}
          <span className="truncate text-left flex-1 min-w-0">
            <Select.Value placeholder={placeHolder} />
          </span>

          {/* 3. L'icône conserve sa taille */}
          <Select.Icon className="shrink-0">
            <BottomarrowIcon />
          </Select.Icon>
        </Select.Trigger>

        <Select.Portal>
          <Select.Content
            position="popper"
            sideOffset={4}
            style={{ width: widthValue }}
            className="overflow-hidden rounded-lg border border-gray-200 bg-abr-white shadow-md z-50"
          >
            <Select.Viewport className="p-2 box-border w-full">
              {options.map((option, index) => (
                <Select.Item
                  key={index}
                  value={option.value}
                  className="relative flex cursor-default select-none items-center rounded-lg py-1.5 px-8 text-body-s text-abr-grey-800 outline-none data-highlighted:bg-abr-light-orange"
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
