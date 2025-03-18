"use client";

import { type MouseEvent, useState } from "react";
// Componets
import { Input, Select, type SelectProps } from "@/components/form";
// Types
type PrisonerProps = {
  prisons: SelectProps["list"];
};

export const Prisoner = ({ prisons }: PrisonerProps) => {
  const [name, setName] = useState("A Test Prisoner");
  const [surname, setSurname] = useState("Account");
  const [number, setNumber] = useState("A123456");
  const [prison, setPrison] = useState("A Test Prison");
  function updatePrison(value: string[]) {
    setPrison(value[0]);
  }

  function handleClick(e: MouseEvent<HTMLButtonElement>) {
    const form = e.currentTarget.closest("form");
    if (form) {
      form.setAttribute("data-submit", "true");
    }
  }

  const disabled = !name || !surname || !number || !prison;
  return (
    <div>
      <h2>Prisoner Information</h2>
      <Input name="prisoner-name" label="First Name" value={name} setValue={setName} required />
      <Input
        name="prisoner-surname"
        label="Last Name"
        value={surname}
        setValue={setSurname}
        required
      />
      <Input
        name="prisoner-number"
        label="Prisoner Number"
        value={number}
        setValue={setNumber}
        required
        hint="Starts with A and continue with 6 digits"
        hintVisible
        pattern="A[0-9]{6}"
      />
      <Select
        name="prisoner-prison"
        label="Prison"
        list={prisons}
        selected={[prison]}
        setSelected={updatePrison}
        required
      />
      <button className="btn-tertiary" disabled={disabled} onClick={handleClick}>
        Continue
      </button>
    </div>
  );
};
