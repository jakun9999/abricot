"use client";

import AiButton from "@/components/ui/buttons/AiButton";
import Chips from "@/components/ui/chips/Chips";
import Label from "@/components/ui/labels/Label";
import UserIcon from "@/components/ui/icons/UserIcon";
import MenuItem from "@/components/ui/menus/MenuItem";
import IconButton from "@/components/ui/buttons/IconButton";
import AbrButton from "@/components/ui/buttons/AbrButton";
import FormInput from "@/components/ui/inputs/FormInput";
import Header from "@/components/ui/header/Header";
import Footer from "@/components/ui/footer/Footer";

export default function Page() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-start gap-10 p-24 bg-white">
      <Header initials="ML" />
      <div className="flex flex-row items-center justify-center gap-10">
        <div className="flex flex-col items-center justify-center gap-4 rounded-2xl border-2 border-blue-400 border-dashed p-4 bg-gray-100">
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
        <div className="flex flex-col items-center justify-center gap-4 rounded-2xl border-2 border-blue-400 border-dashed p-4 bg-gray-100">
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
        <div className="flex flex-col items-center justify-center gap-4 rounded-2xl border-2 border-blue-400 border-dashed p-4 bg-gray-100">
          Labels with different colors:
          <Label color="green" text="Success" />
          <Label color="red" text="Error" />
          <Label color="blue" text="Info" />
          <Label color="warningOrangeLight" text="Warning" />
          <Label color="lightOrange" text="Light Orange" />
          <Label color="grey" text="Grey" />
        </div>
        <div className="flex flex-col items-center justify-center gap-4 rounded-2xl border-2 border-blue-400 border-dashed p-4 bg-gray-100">
          User icons:
          <UserIcon color="dark" label="AB" aria-label="User initials" />
          <UserIcon color="light" label="CD" aria-label="User initials" />
        </div>
      </div>
      <div className="flex flex-row items-center justify-center gap-10">
        <div className="flex flex-col items-center justify-center gap-4 rounded-2xl border-2 border-blue-400 border-dashed p-4 bg-gray-100">
          Menu items with different colors:
          <MenuItem
            color="white"
            type="dashboard"
            aria-label="Dashboard menu item"
          />
          <MenuItem
            color="black"
            type="dashboard"
            aria-label="Dashboard menu item"
          />
          <MenuItem
            color="white"
            type="projects"
            aria-label="Projects menu item"
          />
          <MenuItem
            color="black"
            type="projects"
            aria-label="Projects menu item"
          />
        </div>
        <div className="flex flex-col items-center justify-center gap-4 rounded-2xl border-2 border-blue-400 border-dashed p-4 bg-gray-100">
          Icon buttons :
          <IconButton
            label="back"
            aria-label="Back button"
            onClick={() => alert("Back button clicked!")}
          />
          <IconButton
            label="points"
            aria-label="Points button"
            onClick={() => alert("Points button clicked!")}
          />
        </div>
        <div className="flex flex-col items-center justify-center gap-4 rounded-2xl border-2 border-blue-400 border-dashed p-4 bg-gray-100">
          Buttons in different states (standard, focus, disabled, outline mode)
          :<AbrButton color="black" label="Label" />
          <AbrButton color="black" label="Label" />
          <AbrButton color="black" label="Label" disabled />
          <AbrButton color="outline" label="Label" />
        </div>
      </div>
      <div className="flex flex-row items-center justify-center gap-10">
        <div className="flex flex-col items-center justify-center gap-4 rounded-2xl border-2 border-blue-400 border-dashed p-4 bg-gray-100">
          Inputs:
          <FormInput
            inputId="login"
            inputType="text"
            mandatory={true}
            label="Login"
            placeHolder="Your login"
          />
          <FormInput
            inputId="password"
            inputType="password"
            mandatory={true}
            label="Password"
            placeHolder="Your password"
          />
        </div>
      </div>
      <Footer />
    </main>
  );
}
