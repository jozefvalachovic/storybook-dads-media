import {
  prisonerCreate,
  prisonerGetByNumberAndPrison,
  prisonGetByName,
  profileCreate,
  type SignUpObject,
  userCreate,
  userUpdateActiveProfileId,
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
    profileAvatar,
    profileName,
    profileDate,
    prisonerName,
    prisonerSurname,
    prisonerNumber,
    prisonerPrison,
  } = signUpObject;
  // User
  const user = await userCreate({
    userId: "",
    userActive: false,
    userName: name,
    userSurname: surname,
    userEmail: email,
    password: password,
    userActiveProfileId: "",
  });
  if (!user) {
    console.error("User not created");

    return null;
  }

  // Profile
  const profile = await profileCreate(
    {
      profileId: "",
      profileName,
      profileAvatarSlug: profileAvatar,
      profileDateOfBirth: new Date(profileDate),
    },
    user.userId
  );
  if (!profile) {
    console.error("Profile not created");

    return null;
  }
  const updatedUser = await userUpdateActiveProfileId(email, profile.profileId);
  if (!updatedUser) {
    console.error("User not updated");

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
