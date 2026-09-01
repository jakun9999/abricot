"use client";

import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebounceCallback } from "usehooks-ts";

export interface SearchInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  width: string;
  placeHolder?: string;
}

/**
 * Component providing ready to use search input
 *
 * @example
 * ```tsx
 * <SearchInput width="w-150" aria-label="Input for yyz" placeHolder="Tâche à rechercher"/>
 * ```
 */
export default function SearchInput({
  width,
  placeHolder = "",
  // selectorOptions = [],
  className = "",
  ...props
}: SearchInputProps) {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();

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
      className={`flex items-center justify-between px-8 h-15.75 ${width} bg-white border rounded-lg border-gray-200 focus-within:border-abr-dark-orange text-body-s text-gray-600`}
    >
      <input
        id="search"
        type="text"
        placeholder={placeHolder}
        className={`${className} placeholder:text-gray-300 w-full outline-0`}
        defaultValue={searchParams.get("search") ?? ""}
        onChange={(e) => handleSearch(e.target.value)}
        {...props}
      />
      <div className="pointer-events-none flex items-center pl-3">
        <Image src="/search-icon.svg" alt="" width={13.9} height={13.9} />
      </div>
    </div>
  );
}
