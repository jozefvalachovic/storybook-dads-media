"use client";

import { type MouseEvent, useState } from "react";
import { handleSignUp } from "../../actions";
// Componets
import { Input, Select, type SelectProps } from "@/components/form";
// Types
type PrisonerProps = {
  prisons: SelectProps["list"];
};

export const Prisoner = ({ prisons }: PrisonerProps) => {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [number, setNumber] = useState("");
  const updateNumber = (value: string) => {
    setNumber(value.toUpperCase());
  };
  const [prison, setPrison] = useState("");
  function updatePrison(value: string[]) {
    setPrison(value[0]);
  }

  function handleSubmit(e: MouseEvent<HTMLButtonElement>) {
    const form = e.currentTarget.closest("form");
    if (form) {
      form.setAttribute("data-submit", "true");
      const formData = new FormData(form);

      handleSignUp(formData);
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
        setValue={updateNumber}
        required
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
      <button className="btn-tertiary" disabled={disabled} onClick={handleSubmit}>
        Continue
      </button>
    </div>
  );
};
