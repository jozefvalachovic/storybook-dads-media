import { Icon } from "./icons/Icon";
// Types
type AvatarCardProps = {
  id: string;
  avatar: string;
  name?: string;
  selected?: boolean;
  onClick?: (id: string) => void;
  redirectOnUpdate?: boolean;
};

export const AvatarCard = ({
  id,
  avatar,
  selected,
  name,
  onClick,
  redirectOnUpdate,
}: AvatarCardProps) => {
  const handleClick = (id: string) => (onClick ? onClick(id) : null);

  return (
    <div
      className={`btn relative flex items-center justify-center bg-mid-grey p-4 rounded-2xl transition-colors border ${
        redirectOnUpdate
          ? "cursor-pointer border-transparent mb-4"
          : selected
          ? "pointer-events-none border-text"
          : "cursor-pointer opacity-30 border-transparent"
      }`}
      onClick={handleClick.bind(null, id)}
    >
      <Icon icon={`avatar${avatar}`} />
      {redirectOnUpdate && name && (
        <p className="absolute -bottom-5 leading-none text-xs text-center mt-2">
          {name.split(" ")[0]}
        </p>
      )}
    </div>
  );
};
