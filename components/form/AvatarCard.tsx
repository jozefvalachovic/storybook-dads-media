import { Icon } from "@/components/icons/Icon";
// Types
type AvatarCardProps = {
  id: string;
  avatar: string;
  selected?: boolean;
  onClick: (id: string) => void;
};

export const AvatarCard = ({ id, avatar, selected, onClick }: AvatarCardProps) => {
  const handleClick = (id: string) => (onClick ? onClick(id) : null);

  return (
    <div
      className={`btn relative flex items-center justify-center bg-mid-grey p-4 rounded-2xl transition-colors border ${
        selected
          ? "pointer-events-none border-text"
          : "cursor-pointer opacity-30 border-transparent"
      }`}
      onClick={handleClick.bind(null, id)}
    >
      <Icon icon={`avatar${avatar}`} />
    </div>
  );
};
