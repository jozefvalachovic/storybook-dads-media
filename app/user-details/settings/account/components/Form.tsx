"use client";

import Link from "next/link";
import { useState } from "react";
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
  // Check if the profile has been updated
  const updated = name !== user.userName || surname !== user.userSurname;

  return (
    <form className="!w-[var(--app-width-min)] !flex-row flex-wrap !justify-end gap-4 mt-4">
      <h2 className="w-full text-dark-grey">Credentials</h2>
      <Input name="name" label="Name" value={name} setValue={setName} />
      <Input name="surname" label="Surname" value={surname} setValue={setSurname} />
      <Link href="/user-details/settings/profiles" className="btn-blank w-[90px] !text-tertiary">
        Cancel
      </Link>
      <button className="btn-tertiary w-[90px]" disabled={!updated}>
        Save
      </button>
    </form>
  );
};
