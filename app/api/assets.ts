import { type NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib";
// Types
import type { RouteParams } from "@/types";
import type { Session } from "next-auth";
// Helpers
export const invalidRequest = NextResponse.json(
  {
    error: "Invalid request",
  },
  {
    status: 400,
  }
);

export const unauthorized = NextResponse.json(
  {
    error: "Unauthorized",
  },
  {
    status: 401,
  }
);

export const notFound = NextResponse.json(
  {
    error: "Object not found",
  },
  {
    status: 404,
  }
);

export const serverError = NextResponse.json(
  {
    error: "Server error",
  },
  {
    status: 500,
  }
);
// Session guard
export function sessionWrapper(
  handler: (
    request: NextRequest,
    { params }: RouteParams,
    session: Session
  ) => Promise<NextResponse<any>>
) {
  return async (request: NextRequest, { params }: RouteParams) => {
    const session = await auth();
    if (!session) {
      return unauthorized;
    }

    return handler(request, { params }, session);
  };
}
