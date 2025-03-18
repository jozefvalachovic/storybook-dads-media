import { NextResponse } from "next/server";
import { updateSession, userUpdateActiveProfileId } from "@/lib";
// Assets
import { serverError, sessionWrapper } from "@/app/api/assets";

const POST = sessionWrapper(async (request, _, session) => {
  const { activeProfileId } = await request.json();

  // Update the user's active profile
  const updated = await userUpdateActiveProfileId(session.user.userEmail, activeProfileId);

  if (updated) {
    // Update the session
    await updateSession({
      user: {
        ...session.user,
        userActiveProfileId: activeProfileId,
      },
    });

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
});

export { POST };
