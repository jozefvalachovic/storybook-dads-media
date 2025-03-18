import { auth, prisonersGet } from "@/lib";
// Components
import { Content } from "./components";

export type SettingsPrisonerData = Awaited<ReturnType<typeof getData>>;

async function getData() {
  const session = await auth();

  const prisoner = {
    name: "",
    surname: "",
    number: "",
    prison: "",
  };

  const prisoners = await prisonersGet(session?.user.userEmail ?? "");
  if (prisoners.length > 0) {
    prisoner.name = prisoners[0].prisonerName;
    prisoner.surname = prisoners[0].prisonerSurname;
    prisoner.number = prisoners[0].prisonerNumber;
    prisoner.prison = prisoners[0].prisonerPrison;
  }

  return prisoner;
}

export default async function Page() {
  const prisoner = await getData();

  return <Content {...prisoner} />;
}
