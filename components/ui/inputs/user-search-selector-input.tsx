"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { BottomarrowIcon, CheckedboxIcon } from "@/components/ui/icons";
import { User } from "@/schemas/user-schema";

interface UserSearchSelectorInputProps {
  label?: string;
  width?: string;
  value?: string[];
  onChange?: (selectedEmails: string[]) => void;
  placeholder?: string;
  className?: string;
}

export default function UserSearchSelectorInput({
  label = "Contributeurs",
  width = "w-[220px]",
  value = [],
  onChange,
  placeholder = "Aucun contributeur",
  className = "",
}: UserSearchSelectorInputProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState<User[]>([]);
  const [selectedUsers, setSelectedUsers] = useState<Record<string, User>>({});
  const [loading, setLoading] = useState(false);

  const selectedEmails = useMemo(
    () => new Set(value.map((email) => email.trim().toLowerCase())),
    [value],
  );

  const handleQueryChange = (nextQuery: string) => {
    setQuery(nextQuery);

    if (!nextQuery.trim()) {
      setSearchResults([]);
      setLoading(false);
      return;
    }

    if (nextQuery.trim().length < 2) {
      setSearchResults([]);
      setLoading(false);
    }
  };

  useEffect(() => {
    const normalizedEmails = [
      ...new Set(value.map((email) => email.trim().toLowerCase())),
    ].filter(Boolean);

    if (normalizedEmails.length === 0) {
      return;
    }

    let cancelled = false;

    const loadSelectedUsers = async () => {
      const nextSelectedUsers: Record<string, User> = {};

      await Promise.all(
        normalizedEmails.map(async (email) => {
          try {
            const response = await fetch(
              `/api/users/search?query=${encodeURIComponent(email)}`,
            );
            const payload = await response.json().catch(() => null);

            if (!response.ok) {
              return;
            }

            const users = (payload?.users ?? []) as User[];
            const foundUser = users.find(
              (user) => user.email.trim().toLowerCase() === email,
            );

            if (foundUser) {
              nextSelectedUsers[email] = foundUser;
            }
          } catch (error) {
            console.error("Error loading selected user:", error);
          }
        }),
      );

      if (!cancelled) {
        setSelectedUsers(nextSelectedUsers);
      }
    };

    loadSelectedUsers();

    return () => {
      cancelled = true;
    };
  }, [value]);

  useEffect(() => {
    const trimmedQuery = query.trim();

    if (!trimmedQuery || trimmedQuery.length < 2) {
      return;
    }

    const controller = new AbortController();
    const timeoutId = window.setTimeout(async () => {
      setLoading(true);

      try {
        const response = await fetch(
          `/api/users/search?query=${encodeURIComponent(trimmedQuery)}`,
          { signal: controller.signal },
        );
        const payload = await response.json().catch(() => null);

        if (!response.ok) {
          throw new Error(
            payload?.message ?? "Impossible de charger les utilisateurs.",
          );
        }

        const results = (payload?.users ?? []) as User[];
        setSearchResults(results);

        setSelectedUsers((current) => {
          const next = { ...current };

          for (const user of results) {
            const normalizedEmail = user.email.trim().toLowerCase();
            if (selectedEmails.has(normalizedEmail)) {
              next[normalizedEmail] = user;
            }
          }

          return next;
        });
      } catch (error) {
        if (error instanceof DOMException && error.name === "AbortError") {
          return;
        }

        console.error("Error loading users:", error);
        setSearchResults([]);
      } finally {
        setLoading(false);
      }
    }, 500);

    return () => {
      controller.abort();
      window.clearTimeout(timeoutId);
    };
  }, [query, selectedEmails, value]);

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

  const displayedUsers = useMemo(() => {
    const map = new Map<string, User>();

    Object.values(selectedUsers).forEach((user) => {
      map.set(user.email.trim().toLowerCase(), user);
    });

    searchResults.forEach((user) => {
      const normalizedEmail = user.email.trim().toLowerCase();
      if (selectedEmails.has(normalizedEmail) || query.trim().length >= 2) {
        map.set(normalizedEmail, user);
      }
    });

    return Array.from(map.values());
  }, [query, searchResults, selectedEmails, selectedUsers]);

  const toggleUser = (user: User) => {
    const userEmail = user.email.trim().toLowerCase();
    const nextValue = selectedEmails.has(userEmail)
      ? value.filter((email) => email.trim().toLowerCase() !== userEmail)
      : [...value, user.email];

    onChange?.(nextValue);

    setSelectedUsers((current) => {
      const next = { ...current };

      if (next[userEmail]) {
        delete next[userEmail];
      } else {
        next[userEmail] = user;
      }

      return next;
    });
  };

  const summaryText =
    value.length === 0
      ? placeholder
      : value.length === 1
        ? "1 contributeur"
        : `${value.length} contributeurs`;

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
            {loading ? "Recherche..." : summaryText}
          </span>

          <span className="flex shrink-0 items-center justify-center text-abr-grey-600">
            <BottomarrowIcon className="h-4 w-4" />
          </span>
        </button>

        {isOpen && (
          <div className="absolute left-0 top-[calc(100%+8px)] z-50 w-full max-w-90 lg:w-90 rounded-lg border border-abr-grey-200 bg-white p-3 shadow-md">
            <div className="mb-2 flex items-center justify-between">
              <span className="text-body-s text-abr-grey-800">
                Sélectionner
              </span>
              <span className="text-body-xs text-abr-grey-600">
                {value.length} sélectionné(s)
              </span>
            </div>

            <div className="mb-3">
              <input
                type="text"
                value={query}
                onChange={(event) => handleQueryChange(event.target.value)}
                placeholder="Rechercher par nom ou email"
                className="w-full rounded-sm border border-abr-grey-200 bg-white px-3 py-2 text-body-s text-abr-grey-800 outline-none focus:border-abr-dark-orange"
              />
            </div>

            <div className="max-h-64 space-y-2 overflow-y-auto">
              {loading ? (
                <p className="text-body-s text-abr-grey-600">
                  Recherche en cours...
                </p>
              ) : displayedUsers.length === 0 ? (
                <p className="text-body-s text-abr-grey-600">
                  {query.trim()
                    ? "Aucun utilisateur trouvé."
                    : "Commencez à taper pour rechercher des contributeurs."}
                </p>
              ) : (
                displayedUsers.map((user) => {
                  const selected = selectedEmails.has(user.email);

                  return (
                    <button
                      key={user.email}
                      type="button"
                      onClick={() => toggleUser(user)}
                      className={`
                        flex w-full items-center justify-between rounded-md border px-3 py-2 text-left
                        transition-colors
                        ${selected ? "border-abr-dark-orange bg-abr-light-orange" : "border-abr-grey-200 bg-white hover:bg-abr-grey-50"}
                      `}
                    >
                      <div className="flex min-w-0 items-center gap-3">
                        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-abr-grey-100 text-body-xs text-abr-grey-800">
                          {user.name
                            .split(" ")
                            .map((part) => part[0])
                            .join("")
                            .slice(0, 2)
                            .toUpperCase() || "U"}
                        </span>

                        <div className="min-w-0">
                          <p className="truncate text-body-s text-abr-grey-800">
                            {user.name}
                          </p>
                          <p className="truncate text-body-xs text-abr-grey-600">
                            {user.email}
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
