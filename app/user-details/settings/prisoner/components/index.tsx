"use client";

import { useState } from "react";
import { capitalize } from "@/helpers";
// Components
import { Input } from "@/components/form";
// Types
import type { SettingsPrisonerData } from "../page";

export const Content = (prisoner: SettingsPrisonerData) => {
  const fields = Object.entries(prisoner);

  const [confirmRequestPrisonerUpdate, setConfirmRequestPrisonerUpdate] = useState(false);
  function handleRequestPrisonerUpdate() {
    setConfirmRequestPrisonerUpdate(!confirmRequestPrisonerUpdate);
    if (confirmRequestPrisonerUpdate) {
      console.log("Prisoner Update");
    } else {
      setTimeout(() => setConfirmRequestPrisonerUpdate(false), 3_000);
    }
  }

  return (
    <div className="w-[var(--app-width-min)] flex flex-col gap-4 flex-1 mt-4">
      <h2 className="w-full text-dark-grey">Prisoner Information</h2>
      {fields.map(([key, value]) => {
        const label = capitalize(key);

        return <Input key={key} name={key} label={label} value={value} disabled />;
      })}
      <button
        className={`w-full flex justify-center !bg-[#6750a41f] p-3 rounded-xl !border ${
          confirmRequestPrisonerUpdate ? "!border-error" : "!border-transparent"
        } mt-auto`}
        onClick={handleRequestPrisonerUpdate}
      >
        <p className="!text-error">
          {confirmRequestPrisonerUpdate ? "Are you sure?" : "Request to Update Prisoner"}
        </p>
        {confirmRequestPrisonerUpdate && (
          <p className="font-semibold !text-light-red ml-1">Confirm</p>
        )}
      </button>
    </div>
  );
};
