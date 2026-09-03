"use client";

import { useState } from "react";
import AbrButton from "@/components/ui/buttons/abr-button";
import ModalOverlay from "@/components/ui/modals/modal-overlay";

interface ConfirmModalProps {
  requiresCurrentPassword: boolean;
  isSubmitting: boolean;
  hasChanges: boolean;
  error: string | null;
  onConfirm: (currentPassword: string) => void;
  onCancel: () => void;
}

export default function ConfirmProfilUpdateModal({
  requiresCurrentPassword,
  isSubmitting,
  hasChanges,
  error,
  onConfirm,
  onCancel,
}: ConfirmModalProps) {
  const [currentPassword, setCurrentPassword] = useState("");
  const [touched, setTouched] = useState(false);

  const showPasswordError =
    touched && requiresCurrentPassword && !currentPassword;
  const isConfirmDisabled =
    isSubmitting ||
    !hasChanges ||
    (requiresCurrentPassword && !currentPassword);

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
    <ModalOverlay
      onClose={handleCancel}
      onBackdropClick={() => !isSubmitting && handleCancel()}
    >
      <div
        className="bg-white rounded-[10px] px-5 lg:px-7 py-6 w-full max-w-107.5 shadow-[0_8px_24px_rgba(0,0,0,0.12)]"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="confirm-profile-title"
      >
        <h2 id="confirm-profile-title" className="text-body-s text-abr-grey-800 mb-2">
          Confirmer la mise à jour
        </h2>
        <p className="text-body-xs text-abr-grey-600 mb-4">
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
              aria-invalid={showPasswordError || Boolean(error) || undefined}
              className="w-full border border-abr-grey-300 rounded-[10px] px-3 py-2 text-body-s text-abr-grey-800 placeholder:text-abr-grey-400 focus:outline-none focus:border-abr-dark-orange disabled:opacity-50"
            />
            {showPasswordError && (
              <p className="text-body-xs text-abr-error-red mt-1" role="alert">
                Le mot de passe actuel est requis
              </p>
            )}
          </div>
        )}

        {error && (
          <p className="text-body-xs text-abr-error-red mb-4" role="alert">
            {error}
          </p>
        )}

        <div className="flex flex-wrap justify-end gap-2 mt-2">
          <AbrButton
            type="button"
            onClick={handleCancel}
            disabled={isSubmitting}
            color="outline"
            label="Annuler"
            className="min-w-27.5"
          />
          <AbrButton
            type="button"
            onClick={handleConfirmClick}
            disabled={isConfirmDisabled}
            color="black"
            label={isSubmitting ? "Enregistrement..." : "Confirmer"}
            className="min-w-32.5"
          />
        </div>
      </div>
    </ModalOverlay>
  );
}
