"use client";

import { redirect } from "next/navigation";
import { useState } from "react";
import { useFormHandler } from "@/hooks/formHandler";
import { emailPattern, emailPatternString } from "@/helpers";
// Components
import { Input } from "@/components/form";
import { Icon } from "@/components/icons/Icon";

export const Email = () => {
  const [email, setEmail] = useState("");

  const { handleSubmit } = useFormHandler(
    async () => {
      const url = `/api/user/password/forgot/${encodeURIComponent(email)}`;
      // Send email with verification code
      const response = await fetch(url);

      if (response.ok) {
        redirect(`/auth/forgot-password?step=2&email=${email}`);
      }
    },
    { refresh: false }
  );

  const disabled = !emailPattern.test(email);

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <p>
          Please enter your email address and we will send you a verification code to reset your
          password.
        </p>
        <Input
          name="email"
          label="Email"
          value={email}
          setValue={setEmail}
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
        <button className="btn-tertiary" disabled={disabled}>
          Request Reset
        </button>
      </div>
    </form>
  );
};
