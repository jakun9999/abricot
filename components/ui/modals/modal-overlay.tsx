"use client";

import { useEscapeToClose } from "@/hooks/use-escape-to-close";

export const modalPanelClassName =
  "flex flex-col bg-white rounded-[10px] w-full max-w-[calc(100vw-1.5rem)] max-h-[90vh] overflow-y-auto lg:w-149.5 lg:max-w-149.5 lg:max-h-none lg:overflow-visible pt-9.25 pb-8 lg:pb-19.75 px-4 lg:px-[38.67px]";

export default function ModalOverlay({
  children,
  onClose,
  zClassName = "z-50",
  onBackdropClick,
}: {
  children: React.ReactNode;
  onClose: () => void;
  zClassName?: string;
  onBackdropClick?: () => void;
}) {
  useEscapeToClose(onClose);

  return (
    <div
      className={`fixed inset-0 ${zClassName} flex items-start lg:items-center justify-center bg-black/50 overflow-y-auto p-3 lg:p-0`}
      onClick={onBackdropClick}
    >
      {children}
    </div>
  );
}
