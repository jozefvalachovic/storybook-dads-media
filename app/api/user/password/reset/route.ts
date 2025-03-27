import { type NextRequest, NextResponse } from "next/server";
import {
  getHash,
  getHmac,
  userGet,
  userUpdatePassword,
  userVerificationTokenDelete,
  userVerificationTokenGet,
} from "@/lib";
// Assets
import { invalidRequest, serverError, unauthorized } from "@/app/api/assets";

const POST = async (request: NextRequest) => {
  const { email, password, verificationCode } = await request.json();
  if (!email || !password || !verificationCode) {
    return invalidRequest;
  }

  // Check if the email is valid
  const user = await userGet(email);
  if (user) {
    const userVerificationToken = await userVerificationTokenGet(email);
    const token = await getHmac(email, verificationCode);

    // Compare the verification token
    if (userVerificationToken?.token === token) {
      const updated = await userUpdatePassword(email, await getHash(password));
      if (updated) {
        await userVerificationTokenDelete(userVerificationToken.token);

        return NextResponse.json({ status: 200 });
      } else {
        return serverError;
      }
    } else {
      return unauthorized;
    }
  } else {
    return unauthorized;
  }
};

export { POST };
