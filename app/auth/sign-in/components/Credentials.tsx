"use client";

import Link from "next/link";
import { useState } from "react";
import { emailPattern, emailPatternString } from "@/helpers";
// Components
import { Input, PasswordInput } from "@/components/form";
import { Icon } from "@/components/icons/Icon";
// Types
import { ProfilesProps } from "../page";
type CredentialsProps = {
  email: string;
  setEmail: (email: string) => void;
  password: string;
  setPassword: (password: string) => void;
  profiles: ProfilesProps;
  setProfiles: (profiles: ProfilesProps) => void;
};

export function Credentials({
  email,
  setEmail,
  password,
  setPassword,
  profiles,
  setProfiles,
}: CredentialsProps) {
  const [showPassword, setShowPassword] = useState(false);

  const [submit, setSubmit] = useState(false);
  async function handleProfiles() {
    setSubmit(true);
    const response = await fetch("/api/profile/get", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    const profiles = await response.json();

    if (profiles) {
      setProfiles(profiles);
    } else {
      console.error("Failed to get profiles");
    }
  }

  const disabled = !email || !password;

  return profiles.profiles.length > 0 ? null : (
    <div className={submit ? "opacity-30 pointer-events-none" : ""}>
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
      <Link href="/auth/forgot-password?step=1" className="!text-tertiary text-sm text-right">
        Forgot password?
      </Link>
      <button className="btn-tertiary" type="button" disabled={disabled} onClick={handleProfiles}>
        Sign In
      </button>
      <div className="flex !flex-row justify-between">
        <p className="text-sm">Don't have an account?</p>
        <Link href="/auth/sign-up?step=1" className="!text-tertiary text-sm text-right">
          Sign Up
        </Link>
      </div>
    </div>
  );
}
