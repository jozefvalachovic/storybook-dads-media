import Link from "next/link";
import Image from "next/image";
// Components
import { Icon } from "@/components/icons/Icon";

export default function Page() {
  return (
    <main>
      <header>
        <div className="flex items-center justify-center">
          <Icon icon="logo-dads" />
          <Icon icon="logo-mums" />
        </div>
      </header>
      <section className="max-w-[var(--app-width-min)] gap-4 m-auto">
        <div className="h-full flex flex-col items-center justify-center mb-12">
          <Image src="/boy-reading.png" width={233} height={256} alt="Boy reading" />
          <h1 className="leading-normal !font-normal text-center">
            Connecting families through the magic of storytelling
          </h1>
        </div>
        <Link href="/auth/sign-in" className="btn-tertiary w-full">
          Sign In
        </Link>
        <Link href="/auth/sign-up?step=1" className="btn-blank w-full">
          Sign Up
        </Link>
      </section>
    </main>
  );
}
