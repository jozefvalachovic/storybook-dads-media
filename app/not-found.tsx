import Link from "next/link";

export default function NotFound() {
  return (
    <section>
      <div className="w-[var(--app-width-min)]">
        <h1>Not Found</h1>
        <p className="py-2 mb-2">
          Looks like you're lost. Let's get you{" "}
          <Link href="/" className="font-semibold !text-tertiary">
            back Home
          </Link>
          .
        </p>
      </div>
    </section>
  );
}
