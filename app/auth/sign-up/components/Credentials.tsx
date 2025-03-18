"use client";

import Link from "next/link";
import { useState } from "react";
import { emailPattern, emailPatternString, passwordPattern } from "@/helpers";
// Componets
import { Input, PasswordInput } from "@/components/form";
import { Icon } from "@/components/icons/Icon";

export const Credentials = () => {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
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
      <h2>Your Information</h2>
      <Input name="name" label="Name" value={name} setValue={setName} required />
      <Input name="surname" label="Surname" value={surname} setValue={setSurname} required />
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
