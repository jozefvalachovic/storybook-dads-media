import { auth } from "@/lib";
// Components
import { Header, Footer } from "./layout";

type Props = {
  children?: React.ReactNode;
};

export const SessionProvider = async ({ children }: Props) => {
  const session = await auth();
  if (!session) {
    return null;
  }

  return (
    <>
      <Header session={session} />
      <main>{children}</main>
      <Footer />
    </>
  );
};
