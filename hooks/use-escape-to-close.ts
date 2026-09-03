"use client";

import { useEffect, useRef } from "react";

const closeHandlers: Array<() => void> = [];

const onKeyDown = (event: KeyboardEvent) => {
  if (event.key !== "Escape") return;
  event.preventDefault();
  closeHandlers[closeHandlers.length - 1]?.();
};

/**
 * Ferme le calque le plus haut (modale imbriquée) sur Escape.
 * Une pile globale évite que deux modales écoutent Escape en parallèle :
 * seule la dernière enregistrée se ferme.
 *
 * @param onClose - Callback de fermeture du calque courant.
 * @param enabled - Désactiver sans démonter le composant (défaut `true`).
 */
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
