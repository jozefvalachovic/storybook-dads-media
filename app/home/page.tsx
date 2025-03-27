import { auth, getDocumentsData } from "@/lib";
// Components
import { ClientSessionProvider } from "@/components/ClientSessionProvider";
import { DocumentsList } from "./components";
import { MediaPlayer } from "@/components/MediaPlayer";

export default async function Page() {
  const session = await auth();
  const userName = session?.user.userName ?? "";

  const documentsData = await getDocumentsData();

  return (
    <ClientSessionProvider>
      <section>
        <div className="section-content hide-scrollbar">
          <h1 className="w-full max-w-[var(--app-width-max)] !font-normal mb-4">
            Welcome back, {userName}
          </h1>
          <DocumentsList documentsData={documentsData} type="audio" />
          <DocumentsList documentsData={documentsData} type="video" />
        </div>
        <MediaPlayer />
      </section>
    </ClientSessionProvider>
  );
}
