import { type NextRequest, NextResponse } from "next/server";
import { getHash, profilesGet, userAuthenticate } from "@/lib";
// Assets
import { invalidRequest, unauthorized } from "@/app/api/assets";

const POST = async (request: NextRequest) => {
  const { email, password } = await request.json();

  if (email && password) {
    const passwordHash = await getHash(password);
    const user = await userAuthenticate(email, passwordHash, undefined);
    if (user) {
      const profiles = await profilesGet(email);

      return NextResponse.json(
        {
          profiles,
          activeProfileId: user.userActiveProfileId,
        },
        {
          status: 200,
        }
      );
    } else {
      return unauthorized;
    }
  } else {
    return invalidRequest;
  }
};

export { POST };
