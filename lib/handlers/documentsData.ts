import { auth, documentsGet } from "..";
// Types
export type DocumentsData = Awaited<ReturnType<typeof getDocumentsData>>;

export async function getDocumentsData() {
  const session = await auth();

  if (session) {
    const documents = await documentsGet(session.user.userEmail);
    const data = documents.map((d) => {
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

    return data;
  } else {
    return [];
  }
}
