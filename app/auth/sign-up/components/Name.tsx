"use client";

import { useState } from "react";
// Componets
import { Input } from "@/components/form";

export const Name = () => {
  const [name, setName] = useState("Testing");
  const [surname, setSurname] = useState("Account");

  const disabled = !name || !surname;

  return (
    <div>
      <h2>Parent Informataion</h2>
      <Input name="name" label="Name" value={name} setValue={setName} required />
      <Input name="surname" label="Surname" value={surname} setValue={setSurname} required />
      <button className="btn-tertiary" disabled={disabled}>
        Continue
      </button>
    </div>
  );
};
