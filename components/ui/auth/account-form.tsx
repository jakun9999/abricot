"use client";

import { useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/auth-context";
import FormInput from "@/components/ui/inputs/form-input";
import AbrButton from "@/components/ui/buttons/abr-button";
import { UpdateProfileSchema } from "@/schemas/update-profile-schema";
import ConfirmProfilUpdateModal from "@/components/ui/modals/confirm-profile-update-modal";
import { z } from "zod";

type ProfileFormData = z.infer<typeof UpdateProfileSchema>;

/**
 * Formulaire compte. La soumission n’envoie pas tout de suite : une modale
 * demande confirmation (et le mot de passe actuel si on change le MDP).
 */
export default function AccountForm() {
  const { user, setUser } = useAuth();
  const router = useRouter();

  const [pendingData, setPendingData] = useState<ProfileFormData | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors, isDirty },
  } = useForm<ProfileFormData>({
    resolver: zodResolver(UpdateProfileSchema),
    defaultValues: {
      name: user?.name ?? "",
      email: user?.email ?? "",
      newPassword: "",
    },
  });

  const newPasswordValue = useWatch({
    control,
    name: "newPassword",
  });

  const passwordChanged = (newPasswordValue ?? "").trim().length > 0;
  const hasFormChanges = isDirty || passwordChanged;
  const isSubmitDisabled = isSubmitting || !hasFormChanges;

  const handleValidatedSubmit = (data: ProfileFormData) => {
    if (!hasFormChanges) return;
    setSubmitError(null);
    setPendingData(data);
  };

  const handleConfirm = async (currentPasswordInput: string) => {
    if (!pendingData) return;

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const response = await fetch("/api/profile", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: pendingData.name,
          email: pendingData.email,
          // Ne pas envoyer les MDP si le champ est vide : le backend prendrait ça pour un changement.
          ...(passwordChanged
            ? {
                currentPassword: currentPasswordInput,
                newPassword: pendingData.newPassword,
              }
            : {}),
        }),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message ?? "Une erreur est survenue");
      }

      setUser(result.user);

      reset({
        name: result.user.name,
        email: result.user.email,
        newPassword: "",
      });

      setPendingData(null);
      router.refresh();
    } catch (err) {
      setSubmitError(
        err instanceof Error ? err.message : "Une erreur est survenue",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    if (isSubmitting) return;

    reset({
      name: user?.name ?? "",
      email: user?.email ?? "",
      newPassword: "",
    });

    setPendingData(null);
    setSubmitError(null);
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(handleValidatedSubmit)}
        className="flex flex-col gap-10.25"
      >
        <div className="flex flex-col gap-6">
          <FormInput
            inputId="name"
            width="max-[1092px]"
            className="w-full"
            placeHolder="Votre nom"
            label="Nom"
            inputType="text"
            {...register("name")}
          />
          {errors.name && (
            <p className="text-body-s text-abr-error-red" role="alert">
              {errors.name.message}
            </p>
          )}

          <FormInput
            inputId="email"
            width="max-[1092px]"
            className="w-full"
            placeHolder="Votre email"
            label="Email"
            inputType="email"
            {...register("email")}
          />
          {errors.email && (
            <p className="text-body-s text-abr-error-red" role="alert">
              {errors.email.message}
            </p>
          )}

          <FormInput
            inputId="password"
            width="max-[1092px]"
            className="w-full"
            placeHolder="Nouveau mot de passe (laisser vide pour ne pas changer)"
            label="Mot de passe"
            inputType="password"
            autoComplete="new-password"
            {...register("newPassword")}
          />
          {errors.newPassword && (
            <p className="text-body-s text-abr-error-red" role="alert">
              {errors.newPassword.message}
            </p>
          )}
        </div>

        <AbrButton
          type="submit"
          label="Modifier les informations"
          color="black"
          className="w-60.5 max-w-full"
          disabled={isSubmitDisabled}
        />
      </form>

      {pendingData && (
        <ConfirmProfilUpdateModal
          requiresCurrentPassword={Boolean(pendingData.newPassword)}
          isSubmitting={isSubmitting}
          hasChanges={hasFormChanges}
          error={submitError}
          onConfirm={handleConfirm}
          onCancel={handleCancel}
        />
      )}
    </>
  );
}
