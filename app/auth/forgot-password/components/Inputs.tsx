import { useState } from "react";
import { passwordPattern } from "@/helpers";
// Componets
import { PasswordInput, VerificationCodeInput } from "@/components/form";

export const Inputs = () => {
  const defaultVerificationCode = ["", "", "", "", "", ""];
  const [verificationCode, setVerificationCode] = useState(defaultVerificationCode);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const disabled =
    newPassword !== confirmPassword ||
    !passwordPattern.test(newPassword) ||
    verificationCode.some((digit) => digit.length === 0);

  return (
    <>
      <p className="mt-2">Enter the verification code into the boxes below.</p>
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
    </>
  );
};
