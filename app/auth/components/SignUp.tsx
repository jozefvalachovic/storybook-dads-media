"use client";

import { useState } from "react";
import { emailPattern, emailPatternString } from "@/helpers";
// Components
import { Input } from "@/components/form";
import { Icon } from "@/components/icons/Icon";

export function SignUp() {
  const [email, setEmail] = useState("");

  return (
    <form>
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
      </div>
    </form>
  );
}
