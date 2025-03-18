import Image from "next/image";
import { redirect } from "next/navigation";
import { userGet } from "@/lib/db/handlers";
// Types
import type { SearchParams } from "@/types";

export default async function Page({ searchParams }: { searchParams: SearchParams }) {
  const { id } = await searchParams;
  if (!id || Array.isArray(id)) {
    return null;
  }

  const user = await userGet("", id);

  if (!user) {
    redirect("/auth/sign-up?step=1");
  }

  if (user.userActive) {
    redirect("/auth/sign-in");
  }

  return (
    <section>
      <div className="h-full flex flex-col items-center justify-center mb-12">
        <Image src="/user-pending.png" width={76} height={76} alt="Boy reading" />
        <h1 className="max-w-[180px] leading-normal !font-normal text-center mt-4 mb-8">
          Your Account is being verified
        </h1>
        <p>You will recieve a confirmation email</p>
      </div>
    </section>
  );
}
