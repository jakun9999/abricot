"use client";

import AiButton from "@/components/ui/buttons/AiButton";
import Chips from "@/components/ui/chips/Chips";
import Label from "@/components/ui/labels/Label";

export default function Page() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-start gap-2 p-24 bg-white">
      <div className="flex flex-row items-center justify-center gap-2">
        <div className="flex flex-col items-center justify-center gap-2">
          AiButton with dark color:
          <AiButton
            aria-label="Generate with AI"
            color="dark"
            onClick={() => alert("AI action triggered!")}
          />
          AiButton with light color:
          <AiButton
            aria-label="Generate with AI"
            color="light"
            onClick={() => alert("AI action triggered!")}
          />
        </div>
        <div className="flex flex-col items-center justify-center gap-2">
          Chips with task icon and white color:
          <Chips
            text="Tasks"
            aria-label="Access your tasks"
            icon="task"
            color="white"
            onClick={() => alert("Task action triggered!")}
          />
          Chips with calendar icon and light color:
          <Chips
            text="Calendar"
            aria-label="Access your calendar"
            icon="calendar"
            color="light"
            onClick={() => alert("Calendar action triggered!")}
          />
          Chips with folder icon and white color:
          <Chips
            text="Folders"
            aria-label="Access your folders"
            icon="folder"
            color="white"
            onClick={() => alert("Folder action triggered!")}
          />
        </div>
        <div className="flex flex-col items-center justify-center gap-2">
          Labels with different colors:
          <Label color="green" text="Success" />
          <Label color="red" text="Error" />
          <Label color="blue" text="Info" />
          <Label color="warningOrangeLight" text="Warning" />
          <Label color="lightOrange" text="Light Orange" />
          <Label color="grey" text="Grey" />
        </div>
      </div>
    </main>
  );
}
