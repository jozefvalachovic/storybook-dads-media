import { AvatarCard } from "@/components/AvatarCard";

type AvatarSelectProps = {
  selected: string;
  setSelected: (avatar: string) => void;
};

const avatars = ["Cat", "Cow", "Frog", "Hamster", "Hedgehog", "Koala", "Panda", "Pig"];

export const AvatarSelect = ({ selected, setSelected }: AvatarSelectProps) => {
  return (
    <div className="!grid !grid-cols-4 gap-5">
      {avatars.map((a) => {
        const isSelected = selected === a || (!selected && a === avatars[0]);

        return <AvatarCard key={a} id={a} avatar={a} selected={isSelected} onClick={setSelected} />;
      })}
    </div>
  );
};
