"use server";

import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { encodeString, decodeString, userGet, signIn, userSignUp } from "@/lib";
// Types
import { SignUpObject } from "@/lib";
// Variables
const rootStepUrl = "/auth/sign-up?step=1";

// Handle Sign Up submission
export async function handleSignUp(formData: FormData) {
  const formObject = Object.fromEntries(formData);

  const currentStep = formObject["current-step"];
  const step = parseInt(currentStep as string);

  const cookieStore = await cookies();

  if (step === 1) {
    const object = {} as SignUpObject;
    // Credentials
    object.email = String(formObject.email);
    object.password = String(formObject.password);

    // Verify whether the user already exists
    const user = await userGet(object.email);
    if (user) {
      // If user exists, sign in
      return await signIn("credentials", {
        email: object.email,
        password: object.password,
        redirectTo: "/",
      });
    } else {
      const objectEncoded = await encodeString(JSON.stringify(object));
      cookieStore.set("object", objectEncoded);
    }
  }

  if (step === 2) {
    const object = await decodeObjectString(cookieStore.get("object")?.value ?? "{}");
    // Parent Information
    object.name = String(formObject.name);
    object.surname = String(formObject.surname);

    const objectEncoded = await encodeString(JSON.stringify(object));
    cookieStore.set("object", objectEncoded);
  }

  if (step === 3) {
    const object = await decodeObjectString(cookieStore.get("object")?.value ?? "{}");
    // Child Profile
    object.profileAvatar = String(formObject["profile-avatar"]);
    object.profileName = String(formObject["profile-name"]);
    object.profileDate = String(formObject["profile-date"]);

    const objectEncoded = await encodeString(JSON.stringify(object));
    cookieStore.set("object", objectEncoded);
  }

  if (step === 4) {
    const object = await decodeObjectString(cookieStore.get("object")?.value ?? "{}");
    // Delete object cookie
    cookieStore.delete("object");

    // Prisoner Information
    object.prisonerName = String(formObject["prisoner-name"]);
    object.prisonerSurname = String(formObject["prisoner-surname"]);
    object.prisonerNumber = String(formObject["prisoner-number"]);
    object.prisonerPrison = String(formObject["prisoner-prison"]);

    const created = await userSignUp(object);

    redirect(created ? "/auth/status?id=a5cd6f93-1d33-488c-8ea1-855997908b0d" : rootStepUrl);
  }

  redirect(`/auth/sign-up?step=${step + 1}`);
}

async function decodeObjectString(objectString: string) {
  return JSON.parse(await decodeString(objectString)) as SignUpObject;
}
