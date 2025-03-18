import { useRouter } from "next/navigation";
// Components
import { Icon } from "../icons/Icon";
// Types
type Navigate = {
  type: "home" | "back" | "forward";
};

export const Navigate = ({ type }: Navigate) => {
  const router = useRouter();
  const navigate = {
    home: () => router.push("/home"),
    back: () => router.back(),
    forward: () => router.forward(),
  };

  const handleClick = navigate[type];

  return (
    <div className="!w-fit cursor-pointer flex gap-4" onClick={handleClick}>
      <Icon icon="arrow-left" />
    </div>
  );
};
