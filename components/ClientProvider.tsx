import { auth } from "@/lib";
// Components
import { Header, Footer } from "./layout";

type Props = {
  children?: React.ReactNode;
};

export const ClientProvider = async ({ children }: Props) => {
  const session = await auth();

  return (
    <>
      <Header session={session} />
      <main>{children}</main>
      {session && <Footer />}
    </>
  );
};
