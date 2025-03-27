import { type NextRequest, NextResponse } from "next/server";
import {
  generateVerificationCode,
  userGet,
  userVerificationTokenCreate,
  userVerificationTokenDelete,
  userVerificationTokenGet,
} from "@/lib";
// Assets
import { invalidRequest, serverError, unauthorized } from "@/app/api/assets";
// Types;
import type { RouteParams } from "@/types";
import { passwordReset } from "@/lib/aws/ses";

const GET = async (request: NextRequest, { params }: RouteParams) => {
  const { slug } = await params;
  if (!slug || Array.isArray(slug)) {
    return invalidRequest;
  }

  // Get the user
  const user = await userGet(slug);

  if (user) {
    // Check if a verification token already exists
    let userVerificationToken = await userVerificationTokenGet(user.userEmail);
    if (userVerificationToken) {
      // Delete the existing verification token
      await userVerificationTokenDelete(userVerificationToken.token);
    }
    // Create a verification token
    const verificationCode = generateVerificationCode();
    userVerificationToken = await userVerificationTokenCreate(user.userEmail, verificationCode);

    console.log(userVerificationToken);

    if (userVerificationToken) {
      const email = await passwordReset(user.userEmail, user.userName, verificationCode);
      console.log("EMAIL SENT", email.$metadata.httpStatusCode);

      return NextResponse.json({ status: 201 });
    } else {
      return serverError;
    }
  } else {
    return unauthorized;
  }
};

export { GET };
