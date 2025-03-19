import { ProfilesSelect } from "@/components/ProfilesSelect";
// Types
import type { SignInData } from "../page";

export const Profile = (data: SignInData) => {
  return (
    <div className="m-auto">
      <h2 className="mb-6">Who's Listening?</h2>
      <ProfilesSelect {...data} />
    </div>
  );
};
