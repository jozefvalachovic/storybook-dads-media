import { generateUUID, getHmac, sql, userGet, type UserVerificationToken } from "@/lib";

export async function userVerificationTokenGet(email: string) {
  const tokens = await sql<UserVerificationToken[]>`
    select
      "UserVerificationToken"."token" as "token"
    from "User"
    left join
      "UserVerificationToken" on "UserVerificationToken"."user_id" = "User"."id"
    where
      "User"."email" = ${email}
  `;

  if (tokens.length === 0) {
    return null;
  }

  return tokens[0];
}

export async function userVerificationTokenCreate(email: string, code: string) {
  const user = await userGet(email);
  if (!user) {
    return null;
  }

  const token = await getHmac(email, code);
  const id = generateUUID();

  try {
    const tokens = await sql<UserVerificationToken[]>`
    insert into "UserVerificationToken" (
      "user_id", "token", "id"
    ) values (
      ${user.userId}, ${token}, ${id}
    ) returning
      "token", "id", "user_id" as "userId"
  `;

    if (tokens.length === 0) {
      return null;
    }

    return tokens[0];
  } catch (error: any) {
    console.error(error);
    console.error("Failed to create verification token");

    return null;
  }
}

export async function userVerificationTokenDelete(token: string) {
  try {
    await sql<UserVerificationToken[]>`
      delete from "UserVerificationToken"
      where
        "UserVerificationToken"."token" = ${token}
    `;

    return true;
  } catch (error) {
    console.error(error);

    return false;
  }
}
