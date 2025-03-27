import { getDocumentsData } from "@/lib";
// Components
import { ClientSessionProvider } from "@/components/ClientSessionProvider";
import { Content } from "./components";
import { MediaPlayer } from "@/components/MediaPlayer";

export default async function Page() {
  const documentsData = await getDocumentsData();

  return (
    <ClientSessionProvider>
      <section>
        <Content documentsData={documentsData} />
        <MediaPlayer />
      </section>
    </ClientSessionProvider>
  );
}
