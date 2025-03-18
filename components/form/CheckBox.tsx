import type { ChangeEvent } from "react";
type CheckboxProps = {
  checked: boolean;
  label?: string;
  disabled?: boolean;
  onCheck?: (e: ChangeEvent<HTMLInputElement>) => void;
  labelGap?: string;
  className?: string;
};

export const CheckBox = ({
  label,
  checked,
  disabled,
  onCheck = () => {},
  labelGap = "8px",
  className,
}: CheckboxProps) => {
  const name = label?.toLowerCase().replaceAll(" ", "-") ?? "checkbox";
  return (
    <div className={className}>
      <label
        style={{
          cursor: disabled ? "not-allowed" : "pointer",
        }}
        className="flex items-center transition-all duration-200"
      >
        <input
          name={name}
          type="checkbox"
          checked={checked}
          disabled={disabled}
          onChange={onCheck}
        />
        {label && (
          <span
            style={{
              userSelect: "none",
              color: disabled ? "#bfbfbf" : checked ? "#37575e" : "#777777",
              marginLeft: labelGap,
            }}
          >
            {label}
          </span>
        )}
      </label>
    </div>
  );
};
