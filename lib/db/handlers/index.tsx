import {
  getHmac,
  prisonerCreate,
  prisonerGetByNumberAndPrison,
  prisonGetByName,
  profileCreate,
  type SignUpObject,
  userCreate,
} from "@/lib";

export * from "./document";

export * from "./prison";

export * from "./prisoner";

export * from "./profile";

export * from "./token";

export * from "./user";

export async function userSignUp(signUpObject: SignUpObject) {
  const {
    email,
    password,
    name,
    surname,
    prisonerRelationship,
    profiles,
    prisonerName,
    prisonerSurname,
    prisonerNumber,
    prisonerPrison,
  } = signUpObject;
  const passwordHmac = await getHmac(password);
  // User
  const user = await userCreate({
    userId: "",
    userActive: false,
    userName: name,
    userSurname: surname,
    userPrisonerRelationship: prisonerRelationship,
    userEmail: email,
    password: passwordHmac,
    userActiveProfileId: "",
  });
  if (!user) {
    console.error("User not created");

    return null;
  }

  // Profiles
  const newProfiles = await Promise.all(
    profiles.map(async (profile) => {
      const newProfile = await profileCreate(
        {
          profileId: "",
          profileName: profile.profileName,
          profileAvatarSlug: profile.profileAvatar,
          profileDateOfBirth: new Date(profile.profileDate),
        },
        user.userId
      );
      if (!newProfile) {
        console.error("Profile not created", profile);

        return null;
      } else {
        return newProfile;
      }
    })
  ).then((profiles) => profiles.filter((profile) => profile !== null));
  if (newProfiles.length === 0) {
    console.error("Profiles not created");

    return null;
  }

  // Prisoner
  // Verify whether the prisoner already exists
  let prisoner = await prisonerGetByNumberAndPrison(prisonerNumber, prisonerPrison);
  if (!prisoner) {
    // Verify whether the prison exists
    const prison = await prisonGetByName(prisonerPrison);
    if (!prison) {
      console.error("Prison not found");

      return null;
    }

    // If prisoner does not exist, create it
    prisoner = await prisonerCreate(
      { prisonerId: "", prisonerName, prisonerSurname, prisonerNumber, prisonerPrison },
      user.userId,
      prison.prisonId
    );
    if (!prisoner) {
      console.error("Prisoner not created");

      return null;
    } else {
      console.log("Prisoner created");

      return user;
    }
  } else {
    console.log("Prisoner already exists");

    return user;
  }
}
