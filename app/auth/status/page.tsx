import Image from "next/image";
import { redirect } from "next/navigation";
import { userGetById } from "@/lib/db/handlers";
// Types
import type { SearchParams } from "@/types";

export default async function Page({ searchParams }: { searchParams: SearchParams }) {
  const { id } = await searchParams;
  if (!id || Array.isArray(id)) {
    return null;
  }

  const user = await userGetById(id);

  if (!user) {
    redirect("/sign-up?step=1");
  }

  if (user.userActive) {
    redirect("/auth/sign-in");
  }

  return (
    <section className="flex-1 !justify-center">
      <div className="flex flex-col items-center justify-center mb-16">
        <Image src="/user-pending.png" width={76} height={76} alt="Boy reading" />
        <h1 className="max-w-[180px] leading-normal !font-normal text-center mt-4 mb-8">
          Your Account is being verified
        </h1>
        <p>You will recieve a confirmation email</p>
      </div>
    </section>
  );
}
