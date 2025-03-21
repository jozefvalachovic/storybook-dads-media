"use client";

import Link from "next/link";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { useFormHandler } from "@/hooks/formHandler";
// Components
import { Input } from "@/components/form";
// Types
import type { Session } from "next-auth";
type FormProps = {
  user: Session["user"];
};

export const Form = ({ user }: FormProps) => {
  const [name, setName] = useState(user.userName);
  const [surname, setSurname] = useState(user.userSurname);

  const { update } = useSession();
  const { handleSubmit, error } = useFormHandler(async () => {
    const response = await fetch("/api/user/update", {
      method: "POST",
      body: JSON.stringify({ name, surname }),
    });

    if (!response.ok || error) {
      console.error("Failed to update user details");

      setName(user.userName);
      setSurname(user.userSurname);
    } else {
      update({
        userName: name,
        userSurname: surname,
      });
    }
  });

  const disabled = name === user.userName && surname === user.userSurname;

  return (
    <form
      className="!w-[var(--app-width-min)] !flex-row flex-wrap !justify-end gap-4 mt-4"
      onSubmit={handleSubmit}
    >
      <Input name="name" label="Name" value={name} setValue={setName} />
      <Input name="surname" label="Surname" value={surname} setValue={setSurname} />
      <Link href="/user-details/settings/profiles" className="btn-blank w-[90px] !text-tertiary">
        Cancel
      </Link>
      <button className="btn-tertiary w-[90px]" disabled={disabled}>
        Save
      </button>
    </form>
  );
};
