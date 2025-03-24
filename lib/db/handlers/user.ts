import { generateUUID, getHmac, profilesGet, sql, type Profile, type User } from "@/lib";

export async function userGet(email: string) {
  const user = await sql<User[]>`
    select
      "User"."id" as "userId",
      "User"."active" as "userActive",
      "User"."name" as "userName",
      "User"."surname" as "userSurname",
      "User"."email" as "userEmail",
      "User"."password",
      "User"."active_profile_id" as "userActiveProfileId"
    from "User"
    where
      "User"."email" = ${email}
      AND "User"."active" = true
  `;

  if (user.length === 0) {
    return null;
  }

  return user[0];
}

export async function userGetById(id: string) {
  const user = await sql<Pick<User, "userActive">[]>`
    select
      "User"."active" as "userActive"
    from "User"
    where
      "User"."id" = ${id}
  `;

  if (user.length === 0) {
    return null;
  }

  return user[0];
}

export async function userUpdateName(email: string, name: string, surname: string) {
  try {
    await sql<User[]>`
      update "User"
      set
        "name" = ${name},
        "surname" = ${surname}
      where
        "User"."email" = ${email}
    `;

    return true;
  } catch (error) {
    console.error(error);

    return false;
  }
}

export async function userUpdateActiveProfileId(email: string, activeProfileId: string) {
  try {
    await sql<User[]>`
      update "User"
      set
        "active_profile_id" = ${activeProfileId}
      where
        "User"."email" = ${email}
    `;

    return true;
  } catch (error) {
    console.error(error);

    return false;
  }
}

export async function userUpdatePassword(email: string, password: string) {
  const hmac = await getHmac(password);

  try {
    await sql<User[]>`
      update "User"
      set
        "password" = ${hmac}
      where
        "User"."email" = ${email}
    `;

    return true;
  } catch (error) {
    console.error(error);

    return false;
  }
}

export async function userAuthenticate(email: string, password: string, activeProfileId?: string) {
  const user = await userGet(email);
  // Compare the password
  const hmac = await getHmac(password);
  if (!user || user.password !== hmac) {
    return null;
  }

  if (activeProfileId) {
    // Update the active profile
    const updated = await userUpdateActiveProfileId(email, activeProfileId);
    if (!updated) {
      console.error("Failed to update the active profile");
    }
  }

  const userWithActiveProfile = user as User & { activeProfile: Profile };
  // Default active profile
  userWithActiveProfile.activeProfile = {
    profileId: "",
    profileName: "",
    profileDateOfBirth: new Date(),
    profileAvatarSlug: "Cat",
  };

  const profiles = await profilesGet(email);
  if (profiles.length > 0) {
    const activeProfile = profiles.find(
      (p) => p.profileId === (activeProfileId ?? user.userActiveProfileId)
    );
    if (activeProfile) {
      userWithActiveProfile.activeProfile = activeProfile;
    }
  }

  return userWithActiveProfile;
}

export async function userCreate(user: User) {
  const id = generateUUID();
  const updatedAt = new Date();
  const userType = "User";

  try {
    const users = await sql<User[]>`
      insert into "User" (
        "id",
        "type",
        "name",
        "surname",
        "email",
        "password",
        "prisoner_relationship",
        "active",
        "updated_at"
      ) values (
        ${id},
        ${userType},
        ${user.userName},
        ${user.userSurname},
        ${user.userEmail},
        ${user.password},
        ${user.userPrisonerRelationship},
        false,
        ${updatedAt}
      ) returning
        "id" as "userId"
    `;

    return users[0];
  } catch (error) {
    console.error(error);

    return null;
  }
}
