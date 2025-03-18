import Image from "next/image";
import Link from "next/link";

export default function Page() {
  return (
    <section className="max-w-[var(--app-width-min)] gap-4 m-auto">
      <div className="h-full flex flex-col items-center justify-center mb-12">
        <Image src="/boy-reading.png" width={233} height={256} alt="Boy reading" />
        <h1 className="leading-normal !font-normal text-center">
          Connecting families through magical storytelling.
        </h1>
      </div>
      <Link href="/auth/sign-in?step=1" className="btn-tertiary w-full">
        Sign In
      </Link>
      <Link href="/auth/sign-up?step=1" className="btn-blank w-full">
        Sign Up
      </Link>
    </section>
  );
}
