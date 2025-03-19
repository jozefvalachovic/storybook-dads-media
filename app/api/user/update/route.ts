import { NextResponse } from "next/server";
import { updateSession, userUpdateActiveProfileId, userUpdateName } from "@/lib";
// Assets
import { invalidRequest, serverError, sessionWrapper } from "@/app/api/assets";

const POST = sessionWrapper(async (request, _, session) => {
  const { activeProfileId, name, surname } = await request.json();

  if (activeProfileId) {
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
  } else if (name && surname) {
    const updated = await userUpdateName(session.user.userEmail, name, surname);

    if (updated) {
      // Update the session
      await updateSession({
        user: {
          ...session.user,
          userName: name,
          userSurname: surname,
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
  } else {
    return invalidRequest;
  }
});

export { POST };
