"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import SelectorInput from "@/components/ui/inputs/selector-input";

export default function StatusFilterInput({
  width = 171.75,
}: {
  width?: number | string;
}) {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();
  const status = searchParams.get("status") ?? "";

  const handleChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value && value !== "ALL") {
      params.set("status", value);
    } else {
      params.delete("status");
    }
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <SelectorInput
      id="task-selector"
      width={width}
      placeHolder="Statut"
      value={status || undefined}
      onChange={handleChange}
      options={[
        { value: "ALL", text: "Tous" },
        { value: "TODO", text: "À faire" },
        { value: "IN_PROGRESS", text: "En cours" },
        { value: "DONE", text: "Terminé" },
        { value: "CANCELLED", text: "Annulé" },
      ]}
    />
  );
}
