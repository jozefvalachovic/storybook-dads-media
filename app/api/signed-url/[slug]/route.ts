import { NextResponse } from "next/server";
// Assets
import { serverError, sessionWrapper } from "@/app/api/assets";
import { type Document, documentsGet, getSignedUrl } from "@/lib";

const GET = sessionWrapper(async (request, { params }, session) => {
  const { slug } = await params;

  const documents = await documentsGet(session.user.userEmail, slug as string);

  if (documents[0] satisfies Document) {
    const signedUrl = await getSignedUrl(documents[0].documentName as string);

    return NextResponse.json({
      signedUrl,
    });
  } else {
    return serverError;
  }
});

export { GET };
