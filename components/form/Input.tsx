import type { ChangeEvent, FormEvent, ReactNode } from "react";
type InputProps = {
  name: string;
  label?: string;
  value?: string | number;
  setValue?: (value: string) => void;
  onFocus?: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  required?: boolean;
  disabled?: boolean;
  multiline?: boolean;
  type?: "text" | "number" | "email" | "password" | "date";
  pattern?: string;
  autocomplete?: boolean;
  hint?: string;
  hintVisible?: boolean;
  numberAttributes?: {
    min?: number;
    max?: number;
    step?: number;
  };
  dateAttributes?: {
    min?: string;
    max?: string;
  };
  icon?: {
    position: "left" | "right";
    Icon: ReactNode;
    widthXl?: boolean;
  };
};

export const Input = ({
  name,
  label,
  value,
  setValue,
  onFocus,
  required,
  disabled,
  multiline,
  type = "text",
  pattern,
  autocomplete = true,
  hint,
  hintVisible = false,
  numberAttributes,
  dateAttributes,
  icon,
}: InputProps) => {
  const onChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const dataInvalid = e.currentTarget.getAttribute("data-invalid") === "true";

    if (dataInvalid) {
      e.currentTarget.setAttribute("data-invalid", "false");
      e.currentTarget.setCustomValidity("");
      if (hint) {
        const hintWrapper = e.currentTarget.parentElement?.nextSibling as HTMLParagraphElement;
        const hintPTag = hintWrapper.children[0].children[0];
        if (!hintVisible) {
          hintWrapper.setAttribute("data-invalid", "false");
        }
        // Update p tag color
        hintPTag.classList.add("!text-secondary");
      }
    }
    if (setValue) {
      setValue(e.target.value);
    }
  };
  const onInvalid = (e: FormEvent<HTMLInputElement> | FormEvent<HTMLTextAreaElement>) => {
    e.currentTarget.setAttribute("data-invalid", "true");
    e.currentTarget.setCustomValidity(" ");
    if (hint) {
      const hintWrapper = e.currentTarget.parentElement?.nextSibling as HTMLParagraphElement;
      hintWrapper.setAttribute("data-invalid", "true");
      // Update p tag color
      const hintPTag = hintWrapper.children[0].children[0];
      hintPTag.classList.remove("!text-secondary");
    }
  };
  const InputComponent = multiline ? "textarea" : "input";
  const inputProps = {
    id: name,
    name,
    value,
    onChange,
    onFocus,
    onInvalid,
    required,
    disabled,
    placeholder: " ",
    ...(!multiline && { type }),
    ...(pattern && { pattern }),
    autoComplete: autocomplete ? "on" : "off",
    ...(type === "number" && numberAttributes),
    ...(type === "date" && dateAttributes),
    ...(icon?.position === "left" && {
      style: {
        paddingLeft: icon.widthXl ? "45px" : "40px",
      },
    }),
  };
  return (
    <div className="relative overflow-visible">
      <fieldset>
        <InputComponent {...inputProps} />
        {label && (
          <label
            htmlFor={name}
            data-icon-left={icon?.position === "left"}
            data-icon-width-xl={icon?.position === "left" && icon.widthXl}
          >
            {label}
            {required && " *"}
          </label>
        )}
      </fieldset>
      {hint && (
        <div data-invalid={hintVisible}>
          <div>
            <p className={hintVisible ? "!text-secondary" : ""}>{hint}</p>
          </div>
        </div>
      )}
      {icon && (
        <div
          className="absolute top-1/2 transform -translate-y-1/2"
          style={{
            left: icon.position === "left" ? "16px" : "auto",
            right: icon.position === "right" ? "16px" : "auto",
          }}
        >
          {icon.Icon}
        </div>
      )}
    </div>
  );
};
