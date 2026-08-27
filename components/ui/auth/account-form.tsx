"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/auth-context";
import FormInput from "@/components/ui/inputs/form-input";
import AbrButton from "@/components/ui/buttons/abr-button";
import { UpdateProfileSchema } from "@/schemas/update-profile-schema";
import ConfirmProfilUpdateModal from "@/components/ui/auth/confirm-profile-update-modal";
import { z } from "zod";

type ProfileFormData = z.infer<typeof UpdateProfileSchema>;

export default function AccountForm() {
  const { user, setUser } = useAuth();
  const router = useRouter();

  const [pendingData, setPendingData] = useState<ProfileFormData | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileFormData>({
    resolver: zodResolver(UpdateProfileSchema),
    defaultValues: {
      name: user?.name ?? "",
      email: user?.email ?? "",
      newPassword: "",
    },
  });

  const handleValidatedSubmit = (data: ProfileFormData) => {
    setSubmitError(null);
    setPendingData(data);
  };

  const handleConfirm = async (currentPasswordInput: string) => {
    if (!pendingData) return;

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const passwordChanged = Boolean(pendingData.newPassword);

      const response = await fetch("/api/profile", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: pendingData.name,
          email: pendingData.email,
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
      setPendingData(null);
      router.push("/account");
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
            <p className="text-body-s text-abr-error-red">
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
            <p className="text-body-s text-abr-error-red">
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
            <p className="text-body-s text-abr-error-red">
              {errors.newPassword.message}
            </p>
          )}
        </div>

        <AbrButton
          type="submit"
          label="Modifier les informations"
          color="black"
          className="w-60.5"
        />
      </form>

      {pendingData && (
        <ConfirmProfilUpdateModal
          requiresCurrentPassword={Boolean(pendingData.newPassword)}
          isSubmitting={isSubmitting}
          error={submitError}
          onConfirm={handleConfirm}
          onCancel={handleCancel}
        />
      )}
    </>
  );
}
