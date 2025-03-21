import { ClientSessionProvider } from "@/components/ClientSessionProvider";

export default function Page() {
  return (
    <ClientSessionProvider>
      <section></section>
    </ClientSessionProvider>
  );
}
