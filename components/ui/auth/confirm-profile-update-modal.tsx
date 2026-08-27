"use client";

import { useState } from "react";

interface ConfirmModalProps {
  requiresCurrentPassword: boolean;
  isSubmitting: boolean;
  error: string | null;
  onConfirm: (currentPassword: string) => void;
  onCancel: () => void;
}

export default function ConfirmProfilUpdateModal({
  requiresCurrentPassword,
  isSubmitting,
  error,
  onConfirm,
  onCancel,
}: ConfirmModalProps) {
  const [currentPassword, setCurrentPassword] = useState("");
  const [touched, setTouched] = useState(false);

  const showPasswordError =
    touched && requiresCurrentPassword && !currentPassword;

  const handleConfirmClick = () => {
    if (requiresCurrentPassword && !currentPassword) {
      setTouched(true);
      return;
    }
    onConfirm(currentPassword);
  };

  const handleCancel = () => {
    if (isSubmitting) return;
    setCurrentPassword("");
    setTouched(false);
    onCancel();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      // Block user click on update profil form
      onClick={() => !isSubmitting && handleCancel()}
    >
      <div
        className="bg-white rounded-lg p-6 w-full max-w-sm"
        onClick={(e) => e.stopPropagation()} // avoid closing while user is in the modal
        role="dialog"
        aria-modal="true"
      >
        <h2 className="text-lg font-semibold mb-2">Confirmer la mise à jour</h2>
        <p className="text-sm text-gray-600 mb-4">
          {requiresCurrentPassword
            ? "Veuillez saisir votre mot de passe actuel pour confirmer le changement de mot de passe."
            : "Voulez-vous vraiment enregistrer ces modifications ?"}
        </p>

        {requiresCurrentPassword && (
          <div className="mb-4">
            <label htmlFor="current-password" className="sr-only">
              Mot de passe actuel
            </label>
            <input
              id="current-password"
              type="password"
              autoFocus
              autoComplete="current-password"
              placeholder="Mot de passe actuel"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              disabled={isSubmitting}
              className="w-full border rounded px-3 py-2 text-sm disabled:opacity-50"
            />
            {showPasswordError && (
              <p className="text-sm text-red-600 mt-1" role="alert">
                Le mot de passe actuel est requis
              </p>
            )}
          </div>
        )}

        {error && (
          <p className="text-sm text-red-600 mb-4" role="alert">
            {error}
          </p>
        )}

        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={handleCancel}
            disabled={isSubmitting}
            className="px-4 py-2 rounded border disabled:opacity-50"
          >
            Annuler
          </button>
          <button
            type="button"
            onClick={handleConfirmClick}
            disabled={isSubmitting}
            className="px-4 py-2 rounded bg-blue-600 text-white disabled:opacity-50"
          >
            {isSubmitting ? "Enregistrement..." : "Confirmer"}
          </button>
        </div>
      </div>
    </div>
  );
}
