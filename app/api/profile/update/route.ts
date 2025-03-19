import { NextResponse } from "next/server";
import { profileUpdate } from "@/lib";
// Assets
import { invalidRequest, serverError, sessionWrapper } from "@/app/api/assets";

const POST = sessionWrapper(async (request, _, session) => {
  const { profileId, profileName, profileAvatarSlug, profileDateOfBirth } = await request.json();

  if (profileId && profileName && profileAvatarSlug && profileDateOfBirth) {
    const updated = await profileUpdate({
      profileId,
      profileName,
      profileAvatarSlug,
      profileDateOfBirth,
    });

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
