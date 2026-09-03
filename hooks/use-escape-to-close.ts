"use client";

import { useEffect, useRef } from "react";

const closeHandlers: Array<() => void> = [];

const onKeyDown = (event: KeyboardEvent) => {
  if (event.key !== "Escape") return;
  event.preventDefault();
  closeHandlers[closeHandlers.length - 1]?.();
};

export function useEscapeToClose(onClose: () => void, enabled = true) {
  const onCloseRef = useRef(onClose);

  useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);

  useEffect(() => {
    if (!enabled) return;

    const handler = () => onCloseRef.current();
    closeHandlers.push(handler);

    if (closeHandlers.length === 1) {
      window.addEventListener("keydown", onKeyDown);
    }

    return () => {
      const index = closeHandlers.lastIndexOf(handler);
      if (index >= 0) {
        closeHandlers.splice(index, 1);
      }
      if (closeHandlers.length === 0) {
        window.removeEventListener("keydown", onKeyDown);
      }
    };
  }, [enabled]);
}
