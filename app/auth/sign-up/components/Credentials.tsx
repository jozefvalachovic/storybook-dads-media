"use client";

import Link from "next/link";
import { useState } from "react";
import { prisonerRelationshipList } from "./assets";
import { emailPattern, emailPatternString, passwordPattern } from "@/helpers";
// Componets
import { Input, PasswordInput, Select } from "@/components/form";
import { Icon } from "@/components/icons/Icon";

export const Credentials = () => {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [prisonerRelationship, setPrisonerRelationship] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const disabled =
    !name ||
    !surname ||
    !email.match(emailPattern) ||
    password !== confirmPassword ||
    !passwordPattern.test(password);

  return (
    <div>
      <div>
        <h2>Your Information</h2>
        <p className="text-[13px]">
          To register you must be an adult and the parent/guardian/carer of the child or children
          receiving the story
        </p>
      </div>
      <Input name="name" label="First Name" value={name} setValue={setName} required />
      <Input name="surname" label="Last Name" value={surname} setValue={setSurname} required />
      <Select
        name="prisoner-relationship"
        label="Relationship to Prisoner"
        selected={[prisonerRelationship]}
        setSelected={(value: string[]) => setPrisonerRelationship(value[0])}
        list={prisonerRelationshipList.map((item) => ({ value: item }))}
        required
      />
      <Input
        name="email"
        label="Email"
        value={email}
        setValue={setEmail}
        required
        pattern={emailPatternString}
        icon={{
          position: "left",
          Icon: (
            <Icon
              icon="email"
              iconColor={
                email.length
                  ? email.match(emailPattern)
                    ? "var(--color-tertiary)"
                    : "var(--color-error)"
                  : "var(--color-icon)"
              }
            />
          ),
          widthXl: true,
        }}
      />
      <PasswordInput
        name="password"
        label="Password"
        password={password}
        setPassword={setPassword}
        showPassword={showPassword}
        setShowPassword={setShowPassword}
      />
      <PasswordInput
        name="confirm-password"
        label="Confirm Password"
        password={confirmPassword}
        setPassword={setConfirmPassword}
        showPassword={showPassword}
        setShowPassword={setShowPassword}
      />
      <button className="btn-tertiary" disabled={disabled}>
        Continue
      </button>
      <div className="flex justify-between">
        <p className="text-sm">Already signed up?</p>
        <Link href="/auth/sign-in" className="!text-tertiary text-sm text-right">
          Sign In
        </Link>
      </div>
    </div>
  );
};
