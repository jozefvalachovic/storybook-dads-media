"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useFormHandler } from "@/hooks/formHandler";
import { passwordPattern } from "@/helpers";
// Componets
import { PasswordInput, VerificationCodeInput } from "@/components/form";
// Types
type InputsProps = {
  email: string;
};

export const Inputs = ({ email }: InputsProps) => {
  const defaultVerificationCode = ["", "", "", "", "", ""];
  const [verificationCode, setVerificationCode] = useState(defaultVerificationCode);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const { handleSubmit } = useFormHandler(
    async ({ event }) => {
      // Get form data
      const formData = new FormData(event.currentTarget);

      const password = formData.get("new-password") as string;
      // Get verification code
      const verificationInputs = Array.from(formData.entries())
        .filter(([key]) => key.startsWith("verification-code"))
        .sort((a, b) => a[0].localeCompare(b[0])) // Ensure correct order
        .map(([, value]) => value);
      const verificationCode = verificationInputs.join("");

      // Reset password
      const response = await fetch("/api/user/password/reset", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, verificationCode }),
      });

      if (response.ok) {
        await signIn("credentials", { email, password, redirectTo: "/home" });
      }
    },
    { refresh: false }
  );

  const disabled =
    newPassword !== confirmPassword ||
    !passwordPattern.test(newPassword) ||
    verificationCode.some((digit) => digit.length === 0);

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <p className="mt-2">Enter the verification code sent to your email.</p>
        <VerificationCodeInput
          verificationCode={verificationCode}
          setVerificationCode={setVerificationCode}
        />
        <p className="mt-2">Enter your new password below.</p>
        <PasswordInput
          name="new-password"
          label="New Password"
          password={newPassword}
          setPassword={setNewPassword}
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
          Reset Password
        </button>
      </div>
    </form>
  );
};
