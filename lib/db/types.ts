export type Profile = {
  profileId: string;
  profileName: string;
  profileDateOfBirth: Date;
  profileAvatarSlug: string;
};

export type Document = {
  documentId: string;
  documentName: string;
  documentType: string;
  documentLiked: boolean;
};

export type User = {
  userId: string;
  userActive: boolean;
  userName: string;
  userSurname: string;
  userEmail: string;
  password: string;
  // Foreign keys
  userActiveProfileId: string;
};

export type UserVerificationToken = {
  id: string;
  token: string;
  // Foreign keys
  userId: string;
};

export type Prison = {
  prisonId: string;
  prisonName: string;
};

export type Prisoner = {
  prisonerId: string;
  prisonerName: string;
  prisonerSurname: string;
  prisonerNumber: string;
  prisonerPrison: Prison["prisonName"];
};

export type SignUpObject = {
  // Credentials
  email: string;
  password: string;
  // Parent Information
  name: string;
  surname: string;
  // Child Profile
  profileAvatar: string;
  profileName: string;
  profileDate: string;
  // Prisoner Information
  prisonerName: string;
  prisonerSurname: string;
  prisonerNumber: string;
  prisonerPrison: string;
};
