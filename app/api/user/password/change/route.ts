import { NextResponse } from "next/server";
import { getHash, userUpdatePassword } from "@/lib";
// Assets
import { invalidRequest, serverError, sessionWrapper } from "@/app/api/assets";

const POST = sessionWrapper(async (request, { params }, session) => {
  const { password } = await request.json();
  if (!password) {
    return invalidRequest;
  }

  const updated = await userUpdatePassword(session.user.userEmail, await getHash(password));
  if (updated) {
    return NextResponse.json({ status: 200 });
  } else {
    return serverError;
  }
});

export { POST };
