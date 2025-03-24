import { sql, type Document } from "@/lib";

export async function documentsGet(email: string, documentId?: string) {
  const documents = await sql<Document[]>`
    select
      "Document"."id" as "documentId",
      "Document"."name" as "documentName",
      "Document"."type" as "documentType",
      "Document"."liked" as "documentLiked"
    from "User"
    left join
      "Prisoner" on "Prisoner"."user_id" = "User"."id"
    left join
        "Prison" on "Prison"."id" = "Prisoner"."prison_id"
    left join
      "Document" on "Document"."prisoner_id" = "Prisoner"."id"
    where
      "User"."email" = ${email}
      AND "Document"."published" = true
      ${documentId ? sql`AND "Document"."id" = ${documentId}` : sql``}
  `;

  if (documents.length === 0) {
    return [];
  }

  return documents;
}

export async function documentUpdateLiked(documentId: string, liked: boolean) {
  try {
    await sql<Document[]>`
      update "Document"
      set
        "liked" = ${liked}
      where
        "Document"."id" = ${documentId}
    `;

    return true;
  } catch (error) {
    console.error(error);

    return false;
  }
}
