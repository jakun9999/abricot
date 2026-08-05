import StarIcon from "@/components/ui/icons/StarIcon";

export default function AiButton({ color }: { color: string }) {
  const mode =
    color === "dark"
      ? "bg-abr-dark-orange text-white hover:bg-abr-main-orange"
      : "bg-abr-light-orange text-abr-dark-orange hover:bg-abr-main-orange/50";

  return (
    <button
      className={`flex items-center justify-center h-10 w-10 rounded-full ${mode}`}
    >
      <StarIcon className="size-3.5" />
    </button>
  );
}
