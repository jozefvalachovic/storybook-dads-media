"use client";

import { useState } from "react";
import { signOut } from "next-auth/react";
import { createState } from "@/app/state";
import { passwordPattern } from "@/helpers";
import { useFormHandler } from "@/hooks/formHandler";
// Components
import { PasswordInput } from "@/components/form";
// Types
import type { ReactNode } from "react";
type PasswordGuardProps = {
  children: ReactNode;
};

// State
type PasswordGuardState = {
  attempts: number;
  verified: boolean;
};
export const passwordGuardState = createState<PasswordGuardState>({ attempts: 0, verified: false });

export function PasswordGuard({ children }: PasswordGuardProps) {
  const { attempts, verified } = passwordGuardState.use((s) => s);

  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const { handleSubmit } = useFormHandler(
    async () => {
      // Sign out after 3 failed attempts
      if (attempts > 1) {
        await signOut();
      }

      const response = await fetch("/api/user/verify", {
        method: "POST",
        body: JSON.stringify({ password }),
      });

      if (response.ok) {
        setPassword("");
        setShowPassword(false);

        passwordGuardState.set({
          attempts: 0,
          verified: true,
        });
      } else {
        // Toggle the password visibility after 1 failed attempt
        if (attempts > 0) {
          setShowPassword(true);
        }

        passwordGuardState.set({
          attempts: attempts + 1,
          verified,
        });
      }
    },
    { refresh: false, resetSubmit: true }
  );

  return verified ? (
    children
  ) : (
    <form onSubmit={handleSubmit}>
      <div className="mt-4">
        <h2>To proceed, please enter the password</h2>
        <PasswordInput
          name="password"
          label="Password"
          password={password}
          setPassword={setPassword}
          showPassword={showPassword}
          setShowPassword={setShowPassword}
        />
        <button className="btn-tertiary" disabled={!passwordPattern.test(password)}>
          Continue
        </button>
      </div>
    </form>
  );
}
