import { SessionProvider } from "@/components/SessionProvider";

export default function Page() {
  return (
    <SessionProvider>
      <section></section>
    </SessionProvider>
  );
}
