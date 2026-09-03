"use client";

import Image from "next/image";
import { useId } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebounceCallback } from "usehooks-ts";

export interface SearchInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  /** Classe Tailwind de largeur du conteneur (ex. `w-full md:w-[357px]`). */
  width: string;
  /** Placeholder et libellé accessible (`sr-only`) si aucun `aria-label` n’est passé. */
  placeHolder?: string;
}

/**
 * Champ de recherche synchronisé avec `?search=` (debounce 500 ms) pour éviter
 * un `replace` à chaque frappe.
 *
 * @example
 * ```tsx
 * <SearchInput width="w-full md:w-[357px]" placeHolder="Rechercher une tâche" />
 * ```
 */
export default function SearchInput({
  width,
  placeHolder = "",
  className = "",
  ...props
}: SearchInputProps) {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();
  const inputId = useId();

  const handleSearch = useDebounceCallback((value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set("search", value);
    } else {
      params.delete("search");
    }
    replace(`${pathname}?${params.toString()}`);
  }, 500);

  return (
    <div
      className={`flex items-center justify-between px-8 h-15.75 ${width} bg-white border rounded-sm border-abr-grey-200 focus-within:border-abr-dark-orange text-body-s text-abr-grey-600`}
    >
      <label htmlFor={inputId} className="sr-only">
        {placeHolder || "Rechercher"}
      </label>
      <input
        id={inputId}
        type="search"
        placeholder={placeHolder}
        className={`${className} placeholder:text-abr-grey-300 w-full outline-0`}
        defaultValue={searchParams.get("search") ?? ""}
        onChange={(e) => handleSearch(e.target.value)}
        {...props}
      />
      <div className="pointer-events-none flex items-center pl-3">
        <Image src="/search-icon.svg" alt="" width={13.9} height={13.9} aria-hidden="true" />
      </div>
    </div>
  );
}
