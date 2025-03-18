export type VerificationCodeInputProps = {
  verificationCode: string[];
  setVerificationCode: (value: string[]) => void;
};

export const VerificationCodeInput = ({
  verificationCode,
  setVerificationCode,
}: VerificationCodeInputProps) => {
  const handleChange = (index: number, value: string) => {
    const newCode = [...verificationCode];
    newCode[index] = value.replace(/\D/g, ""); // Remove non-digit characters
    newCode[index] = newCode[index].slice(0, 1); // Limit to one digit

    // If the digit is deleted, focus on the previous input
    if (value.length === 0 && index > 0) {
      const prevInput = document.getElementById(`input-${index - 1}`);
      if (prevInput) {
        prevInput.focus();
      }
    } else {
      // Otherwise, focus on the next input
      if (value.length === 1 && index < 5) {
        const nextInput = document.getElementById(`input-${index + 1}`);
        if (nextInput) {
          nextInput.focus();
        }
      } else if (value.length === 1 && index === 5) {
        // Focus the submit button when the last input is filled
        const submitButton = document.querySelector("button[type=submit]") as HTMLButtonElement;
        if (submitButton) {
          submitButton.focus();
        }
      }
    }

    setVerificationCode(newCode);
  };

  return (
    <div className="grid grid-cols-6 gap-4">
      {verificationCode.map((digit, index) => (
        <input
          key={index}
          id={`input-${index}`}
          name={`verification-code-${index + 1}`}
          type="text"
          maxLength={1}
          value={digit}
          onChange={(e) => handleChange(index, e.target.value)}
          className={`text-center !text-lg ${
            digit.length === 1 ? "border-2 !border-tertiary" : ""
          }`}
          autoComplete="off"
        />
      ))}
    </div>
  );
};
