import { auth, documentsGet } from "@/lib";
// Components
import { ClientSessionProvider } from "@/components/ClientSessionProvider";
import { Content } from "./components";
import { MediaPlayer } from "@/components/MediaPlayer";
// Types
export type FavoritesData = Awaited<ReturnType<typeof getData>>;

async function getData() {
  const session = await auth();

  const documentsData = await documentsGet(session?.user.userEmail ?? "");
  const documents = documentsData
    .filter((d) => d.documentLiked)
    .map((d) => {
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
    documents,
  };
}

export default async function Page() {
  const { documents } = await getData();

  return (
    <ClientSessionProvider>
      <section>
        <Content documents={documents} />
        <MediaPlayer />
      </section>
    </ClientSessionProvider>
  );
}
