import { passwordPattern, passwordPatternString } from "@/helpers";
// Components
import { Input } from "@/components/form";
import { Icon } from "@/components/icons/Icon";
// Types
type PasswordInputProps = {
  name: string;
  label: string;
  password: string;
  setPassword: (value: string) => void;
  showPassword: boolean;
  setShowPassword: (value: boolean) => void;
  showHint?: boolean;
};

export function PasswordInput(props: PasswordInputProps) {
  const { password, setPassword, showPassword, setShowPassword } = props;

  return (
    <div className="relative">
      <Input
        name={props.name}
        label={props.label}
        value={password}
        setValue={setPassword}
        required
        type={showPassword ? "text" : "password"}
        pattern={passwordPatternString}
        icon={{
          position: "left",
          Icon: (
            <Icon
              icon="lock"
              iconColor={
                password.length
                  ? password.match(passwordPattern)
                    ? "var(--color-tertiary)"
                    : "var(--color-error)"
                  : "var(--color-icon)"
              }
            />
          ),
          widthXl: true,
        }}
        hint={
          props.showHint
            ? "Password must contain at least 16 characters, including one uppercase letter, one lowercase letter and one number."
            : ""
        }
        hintVisible={props.showHint}
      />
      <div
        className="h-[45px] absolute top-0 right-4 cursor-pointer flex items-center"
        onClick={() => setShowPassword(!showPassword)}
      >
        <Icon icon={showPassword ? "eye" : "eye-crossed"} iconColor="var(--color-dark-grey)" />
      </div>
    </div>
  );
}
