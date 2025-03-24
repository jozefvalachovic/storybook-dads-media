import { NextResponse } from "next/server";
import { documentUpdateLiked } from "@/lib";
// Assets
import { invalidRequest, serverError, sessionWrapper } from "@/app/api/assets";

const POST = sessionWrapper(async (request, _, session) => {
  const { documentId, documentLiked } = await request.json();

  if (documentId && documentLiked) {
    const updated = await documentUpdateLiked(documentId, documentLiked);

    if (updated) {
      return NextResponse.json(
        {
          updated: true,
        },
        {
          status: 200,
        }
      );
    } else {
      return serverError;
    }
  } else {
    return invalidRequest;
  }
});

export { POST };
