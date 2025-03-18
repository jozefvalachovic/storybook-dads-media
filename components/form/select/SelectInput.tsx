import { useState } from "react";
// Types
import type { SelectProps } from ".";
type SelectInputProps = {
  input: string;
  setInput: (input: string) => void;
  name: SelectProps["name"];
  label: SelectProps["label"];
  selected: string | null;
  required?: SelectProps["required"];
  disabled?: SelectProps["disabled"];
  style?: SelectProps["inputStyle"];
};

export const SelectInput = ({
  input,
  setInput,
  name,
  label,
  selected,
  required,
  disabled,
  style,
}: SelectInputProps) => {
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const targetValue = e.target.value;
    setInput(targetValue);
  };

  // Focus state handlers
  const [isFocus, setIsFocus] = useState(false);

  const onFocus = () => {
    setIsFocus(true);
  };

  const onBlur = () => {
    setIsFocus(false);
  };

  const formatLabel = selected || input.length > 0;

  return (
    <fieldset className="w-full">
      <input
        name={name}
        value={selected ? (isFocus ? input : selected) : input}
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
        disabled={disabled}
        autoComplete="off"
        style={style}
      />
      {label && (
        <label
          htmlFor={name}
          style={{
            top: formatLabel ? -9 : 10,
            left: 13,
            zIndex: 1,
            fontSize: formatLabel ? "13px" : "15px",
            color: formatLabel ? "#15803d" : "#272833",
          }}
        >
          {label}
          {required && " *"}
        </label>
      )}
    </fieldset>
  );
};
