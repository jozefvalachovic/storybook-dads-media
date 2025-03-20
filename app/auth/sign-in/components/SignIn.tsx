"use client";

import Link from "next/link";
import { redirect } from "next/navigation";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useFormHandler } from "@/hooks/formHandler";
import { emailPattern, emailPatternString } from "@/helpers";
// Components
import { Input, PasswordInput } from "@/components/form";
import { Icon } from "@/components/icons/Icon";

export function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const { handleSubmit, setSubmit } = useFormHandler(
    async () => {
      setShowPassword(false);
      const response = await signIn("credentials", { email, password, redirect: false });

      if (response?.error) {
        document.querySelector("input[name=email]")?.setAttribute("data-invalid", "true");
        document.querySelector("input[name=password]")?.setAttribute("data-invalid", "true");

        setSubmit(false);
      }
    },
    { refresh: true }
  );

  return (
    <form onSubmit={handleSubmit}>
      <div>
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
        <button className="btn-tertiary" disabled={!email || !password}>
          Sign In
        </button>
        <div className="flex justify-between">
          <p className="text-sm">Don't have an account?</p>
          <Link href="/auth/sign-up?step=1" className="!text-tertiary text-sm text-right">
            Sign Up
          </Link>
        </div>
      </div>
    </form>
  );
}
