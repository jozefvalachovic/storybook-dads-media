import { NextResponse } from "next/server";
import { getHash, userAuthenticate } from "@/lib";
// Assets
import { sessionWrapper, unauthorized } from "@/app/api/assets";

const POST = sessionWrapper(async (request, _, session) => {
  const { password } = await request.json();

  const passwordHash = await getHash(password as string);

  const user = await userAuthenticate(session.user.userEmail, passwordHash);

  if (user) {
    return NextResponse.json(
      {
        verified: true,
      },
      {
        status: 200,
      }
    );
  } else {
    return unauthorized;
  }
});

export { POST };
