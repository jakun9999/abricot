"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { BottomarrowIcon, CheckedboxIcon } from "@/components/ui/icons";
import { ProjectMember } from "@/schemas/project-member-schema";

interface AssigneeSelectorInputProps {
  projectId: string;
  label?: string;
  width?: string;
  value?: string[];
  onChange?: (selectedIds: string[]) => void;
  placeholder?: string;
  className?: string;
}

export default function AssigneeSelectorInput({
  projectId,
  label = "Collaborateurs",
  width = "w-[220px]",
  value = [],
  onChange,
  placeholder = "Aucun collaborateur",
  className = "",
}: AssigneeSelectorInputProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [members, setMembers] = useState<ProjectMember[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!projectId) return;

    const loadMembers = async () => {
      setLoading(true);
      try {
        const response = await fetch(`/api/projects/${projectId}/members`);
        const payload = await response.json().catch(() => null);

        if (!response.ok) {
          throw new Error(
            payload?.message ?? "Impossible de charger les membres.",
          );
        }

        const membersFromApi = (payload?.members ?? []) as ProjectMember[];
        setMembers(membersFromApi);
      } catch (error) {
        console.error("Error loading project members:", error);
        setMembers([]);
      } finally {
        setLoading(false);
      }
    };

    loadMembers();
  }, [projectId]);

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

  const selectedMembers = useMemo(
    () => members.filter((member) => value.includes(member.user.id)),
    [members, value],
  );

  const toggleMember = (userId: string) => {
    const nextValue = value.includes(userId)
      ? value.filter((id) => id !== userId)
      : [...value, userId];

    onChange?.(nextValue);
  };

  const summaryText =
    selectedMembers.length === 0
      ? placeholder
      : selectedMembers.length === 1
        ? "1 collaborateur"
        : `${selectedMembers.length} collaborateurs`;

  return (
    <div className="flex flex-col gap-1.75">
      {label ? <label className="text-body-s text-black">{label}</label> : null}

      <div ref={containerRef} className={`relative ${width}`}>
        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          className={`
            flex h-13.25 w-full items-center justify-between gap-2
            rounded-sm border border-abr-grey-200 bg-white px-4.25
            text-body-s text-abr-grey-600 focus:outline-abr-dark-orange focus:outline focus:outline-offset-0 focus:outline-solid
            ${className}
          `}
        >
          <span className="truncate text-left text-body-s text-abr-grey-600">
            {loading ? "Chargement..." : summaryText}
          </span>

          <span className="flex shrink-0 items-center justify-center text-abr-grey-600">
            <BottomarrowIcon className="h-4 w-4" />
          </span>
        </button>

        {isOpen && (
          <div className="absolute left-0 top-[calc(100%+8px)] z-50 w-full max-w-[320px] lg:w-[320px] rounded-lg border border-abr-grey-200 bg-white p-3 shadow-md">
            <div className="mb-2 flex items-center justify-between">
              <span className="text-body-s text-abr-grey-800">
                Sélectionner
              </span>
              <span className="text-body-xs text-abr-grey-600">
                {selectedMembers.length} sélectionné(s)
              </span>
            </div>

            <div className="max-h-64 space-y-2 overflow-y-auto">
              {members.length === 0 ? (
                <p className="text-body-s text-abr-grey-600">
                  Aucun membre disponible.
                </p>
              ) : (
                members.map((member) => {
                  const selected = value.includes(member.user.id);

                  return (
                    <button
                      key={member.user.id}
                      type="button"
                      onClick={() => toggleMember(member.user.id)}
                      className={`
                        flex w-full items-center justify-between rounded-md border px-3 py-2 text-left
                        transition-colors
                        ${selected ? "border-abr-dark-orange bg-abr-light-orange" : "border-abr-grey-200 bg-white hover:bg-abr-grey-50"}
                      `}
                    >
                      <div className="flex min-w-0 items-center gap-3">
                        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-abr-grey-100 text-body-xs text-abr-grey-800">
                          {member.user.name
                            .split(" ")
                            .map((part) => part[0])
                            .join("")
                            .slice(0, 2)
                            .toUpperCase() || "U"}
                        </span>

                        <div className="min-w-0">
                          <p className="truncate text-body-s text-abr-grey-800">
                            {member.user.name}
                          </p>
                          <p className="truncate text-body-xs text-abr-grey-600">
                            {member.user.email}
                          </p>
                        </div>
                      </div>

                      <span className="ml-3 flex h-5 w-5 items-center justify-center rounded border border-abr-grey-300">
                        {selected ? (
                          <CheckedboxIcon className="h-4 w-4 text-abr-dark-orange" />
                        ) : null}
                      </span>
                    </button>
                  );
                })
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
