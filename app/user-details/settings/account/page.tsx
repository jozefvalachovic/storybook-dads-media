import { auth } from "@/lib";
// Components
import { Form, RequestAdminUpdate } from "./components";

export default async function Page() {
  const session = await auth();
  if (!session) return null;

  return (
    <>
      <Form user={session.user} />
      <RequestAdminUpdate />
    </>
  );
}
