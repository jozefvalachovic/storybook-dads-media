import { auth } from "@/lib";
// Components
import { Content } from "./components";

export default async function Page() {
  const session = await auth();
  if (!session) {
    return null;
  }

  return <Content />;
}
