"use client";

import * as Select from "@radix-ui/react-select";
import { BottomarrowIcon } from "@/components/ui/icons";

export interface SelectorInputProps {
  id: string;
  placeHolder: string;
  label?: string;
  value?: string;
  defaultValue?: string;
  width?: number | string;
  className?: string;
  onChange?: (value: string) => void;
  options: {
    value: string;
    text: string;
  }[];
}

export default function SelectorInput({
  placeHolder,
  width = 152,
  label = "",
  value,
  defaultValue,
  className = "",
  options,
  onChange,
}: SelectorInputProps) {
  const widthValue = typeof width === "number" ? `${width}px` : width;

  return (
    <div style={{ width: widthValue }} className={`inline-block ${className}`}>
      {label && <label className="text-body-s text-black">{label}</label>}
      <Select.Root
        value={value}
        defaultValue={defaultValue}
        onValueChange={onChange}
      >
        <Select.Trigger
          className={`w-full ${label ? "mt-1.75" : ""} h-13.25 flex items-center justify-between gap-2 rounded-lg border border-abr-grey-200 bg-white px-4.25 text-body-s text-abr-grey-600 overflow-hidden box-border outline-none focus-visible:ring-2 focus-visible:ring-abr-dark-orange data-[state=open]:ring-2 data-[state=open]:ring-abr-dark-orange`}
        >
          <span className="truncate text-left flex-1 min-w-0">
            <Select.Value placeholder={placeHolder} />
          </span>

          <Select.Icon className="shrink-0">
            <BottomarrowIcon />
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
