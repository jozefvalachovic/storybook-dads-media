import { generateUUID, sql, type Profile } from "@/lib";

export async function profilesGet(email: string, profileId?: string) {
  const profiles = await sql<Profile[]>`
  select
      "Profile"."id" as "profileId",
      "Profile"."name" as "profileName",
      "Profile"."date_of_birth" as "profileDateOfBirth",
      "Profile"."avatar_slug" as "profileAvatarSlug"
    from "User"
    left join
      "Profile" on "Profile"."user_id" = "User"."id"
    where
      "User"."email" = ${email}
      ${profileId ? sql`AND "Profile"."id" = ${profileId}` : sql``}
  `;

  if (profiles.length === 0) {
    return [];
  }

  return profiles;
}

export async function profileCreate(profile: Profile, userId: string) {
  const id = generateUUID();
  const updatedAt = new Date();

  try {
    const profiles = await sql<Profile[]>`
      insert into "Profile" (
        "id",
        "user_id",
        "name",
        "avatar_slug", 
        "date_of_birth",
        "updated_at"
      ) values (
        ${id},
        ${userId},
        ${profile.profileName},
        ${profile.profileAvatarSlug},
        ${profile.profileDateOfBirth},
        ${updatedAt}
      ) returning
        "id" as "profileId"
    `;

    return profiles[0];
  } catch (error) {
    console.error(error);

    return null;
  }
}

export async function profileUpdate(profile: Profile) {
  const updatedAt = new Date();

  try {
    await sql<Profile[]>`
      update "Profile"
      set
        "name" = ${profile.profileName},
        "avatar_slug" = ${profile.profileAvatarSlug},
        "date_of_birth" = ${new Date(profile.profileDateOfBirth)},
        "updated_at" = ${updatedAt}
      where
        "id" = ${profile.profileId}
    `;

    return true;
  } catch (error) {
    console.error(error);

    return false;
  }
}
