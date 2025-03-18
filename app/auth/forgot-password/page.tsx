"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useFormHandler } from "@/hooks/formHandler";
// Components
import { Email, Inputs } from "./components";

export default function Page() {
  const [reset, setReset] = useState(false);

  const { handleSubmit, setSubmit } = useFormHandler(
    async ({ event }) => {
      // Get form data
      const formData = new FormData(event.currentTarget);
      const email = formData.get("email") as string;

      const urlBase = "/api/user/password";

      if (reset) {
        const password = formData.get("new-password") as string;
        // Get verification code
        const verificationInputs = Array.from(formData.entries())
          .filter(([key]) => key.startsWith("verification-code"))
          .sort((a, b) => a[0].localeCompare(b[0])) // Ensure correct order
          .map(([, value]) => value);
        const verificationCode = verificationInputs.join("");

        // Reset password
        const response = await fetch(`${urlBase}/reset`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password, verificationCode }),
        });

        if (response.ok) {
          await signIn("credentials", { email, password });
        }
      } else {
        const url = `${urlBase}/forgot/${encodeURIComponent(email)}`;
        // Send email with verification code
        const response = await fetch(url);

        if (response.ok) {
          setSubmit(false);
          setReset(true);
        }
      }
    },
    { refresh: false, resetSubmit: false }
  );

  return (
    <section>
      <form onSubmit={handleSubmit}>
        <div>
          <Email reset={reset} />
          {reset && <Inputs />}
        </div>
      </form>
    </section>
  );
}
