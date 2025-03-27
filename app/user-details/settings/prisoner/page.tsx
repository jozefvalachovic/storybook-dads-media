import { auth, prisonersGet } from "@/lib";
// Components
import { Content } from "./components";

export type PrisonerData = Awaited<ReturnType<typeof getData>>;

async function getData() {
  const session = await auth();

  const prisonerData = {
    name: "",
    surname: "",
    number: "",
    prison: "",
  };

  const prisoners = await prisonersGet(session?.user.userEmail ?? "");
  if (prisoners.length > 0) {
    prisonerData.name = prisoners[0].prisonerName;
    prisonerData.surname = prisoners[0].prisonerSurname;
    prisonerData.number = prisoners[0].prisonerNumber;
    prisonerData.prison = prisoners[0].prisonerPrison;
  }

  return prisonerData;
}

export default async function Page() {
  const prisonerData = await getData();

  return <Content {...prisonerData} />;
}
