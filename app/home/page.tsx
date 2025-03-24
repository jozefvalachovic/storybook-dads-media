import { auth, documentsGet } from "@/lib";
// Components
import { ClientSessionProvider } from "@/components/ClientSessionProvider";
import { Content } from "./components";
import { MediaPlayer } from "@/components/MediaPlayer";
// Types
export type HomeData = Awaited<ReturnType<typeof getData>>;

async function getData() {
  const session = await auth();

  const userName = session?.user.userName ?? "";

  const documentsData = await documentsGet(session?.user.userEmail ?? "");
  const documents = documentsData.map((d) => {
    const fileName = d.documentName.split("/").pop();
    const fileType = fileName?.split(".").pop() ?? "";
    const title = fileName?.split(".").shift() ?? "";

    return {
      id: d.documentId,
      name: d.documentName,
      title,
      fileType,
      liked: d.documentLiked,
    };
  });

  return {
    userName,
    documents,
  };
}

export default async function Page() {
  const { userName, documents } = await getData();

  return (
    <ClientSessionProvider>
      <section>
        <h1 className="w-full max-w-[var(--app-width-max)] !font-normal mb-4">
          Welcome back, {userName}
        </h1>
        <Content documents={documents} type="audio" />
        <Content documents={documents} type="video" />
        <MediaPlayer />
      </section>
    </ClientSessionProvider>
  );
}
