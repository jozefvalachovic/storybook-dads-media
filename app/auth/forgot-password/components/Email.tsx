import { useState } from "react";
import { emailPattern, emailPatternString } from "@/helpers";
// Components
import { Input } from "@/components/form";
import { Icon } from "@/components/icons/Icon";
// Types
type EmailProps = {
  reset: boolean;
};

export const Email = ({ reset }: EmailProps) => {
  const [email, setEmail] = useState("");

  const disabled = !emailPattern.test(email);

  return reset ? (
    <div className="relative select-none flex bg-light-grey px-4 py-[10px] rounded-xl">
      <p className="absolute -top-[9px] left-[17px] text-[13px] !text-tertiary">
        Sent successfully
      </p>
      <Icon icon="email" iconColor={"var(--color-tertiary)"} />
      <p className="!text-dark-grey pl-3">{email}</p>
      <input type="hidden" name="email" value={email} />
    </div>
  ) : (
    <>
      <p>
        Please enter your email address and we will send you a verification code to reset your
        password.
      </p>
      <Input
        name="email"
        label="Email"
        value={email}
        setValue={setEmail}
        required={!reset}
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
        disabled={reset}
      />
      <button className="btn-tertiary" disabled={disabled}>
        Request Reset
      </button>
    </>
  );
};
