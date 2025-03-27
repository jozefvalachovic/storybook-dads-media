"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useFormHandler } from "@/hooks/formHandler";
import { passwordPattern } from "@/helpers";
// Components
import { PasswordInput } from "@/components/form";

export const Content = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const router = useRouter();
  const { handleSubmit } = useFormHandler(
    async ({ event }) => {
      // Get form data
      const formData = new FormData(event.currentTarget);
      const password = formData.get("new-password") as string;
      const confirmPassword = formData.get("confirm-password") as string;
      if (password === confirmPassword) {
        // Change password
        const response = await fetch("/api/user/password/change", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ password }),
        });

        if (response.ok) {
          router.push("/user-details/settings/account");
        }
      }
    },
    { refresh: false }
  );

  const disabled = newPassword !== confirmPassword || !passwordPattern.test(newPassword);
  return (
    <form onSubmit={handleSubmit}>
      <div>
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
