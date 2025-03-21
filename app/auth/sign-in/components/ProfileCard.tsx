import { Icon } from "@/components/icons/Icon";
// Types
type ProfileCardProps = {
  id: string;
  avatar: string;
  name: string;
  selected: boolean;
  onClick: (id: string) => void;
};

export const ProfileCard = ({ id, avatar, selected, name, onClick }: ProfileCardProps) => {
  const handleClick = (id: string) => onClick(id);

  return (
    <div
      className={`btn relative cursor-pointer flex items-center justify-center bg-mid-grey p-4 rounded-2xl transition-colors border mb-4 ${
        selected ? "border-blac" : "border-transparent"
      }`}
      onClick={handleClick.bind(null, id)}
    >
      <Icon icon={`avatar${avatar}`} />
      <p className="absolute -bottom-5 leading-none text-xs text-center mt-2">
        {name.split(" ")[0]}
      </p>
    </div>
  );
};
