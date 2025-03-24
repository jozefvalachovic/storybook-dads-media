"use server";

import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { encodeString, decodeString, userGet, signIn, userSignUp, getHash } from "@/lib";
// Types
import type { SignUpObject } from "@/lib";

export async function handleSignIn(formData: FormData) {
  const formObject = Object.fromEntries(formData);

  const email = String(formObject.email);
  const password = String(formObject.password);

  const activeProfileId = String(formObject["active-profile-id"]);

  return await signIn("credentials", {
    email,
    password,
    activeProfileId,
    redirectTo: "/home",
  });
}

export async function handleSignUp(formData: FormData) {
  const formObject = Object.fromEntries(formData);

  const currentStep = formObject["current-step"];
  const step = parseInt(currentStep as string);

  const cookieStore = await cookies();
  const expires = new Date(Date.now() + 1_000 * 60 * 30); // 30 minutes

  if (step === 1) {
    const object = {} as SignUpObject;
    // Credentials
    object.name = String(formObject.name);
    object.surname = String(formObject.surname);
    object.prisonerRelationship = String(formObject["prisoner-relationship"]);
    object.email = String(formObject.email);
    object.password = String(formObject.password);

    // Verify whether the user already exists
    const user = await userGet(object.email);
    if (user) {
      // If user exists, sign in
      return await signIn("credentials", {
        email: object.email,
        password: object.password,
        redirectTo: "/home",
      });
    } else {
      // Hash only for the cookie
      object.password = await getHash(object.password);
      const objectEncoded = await encodeString(JSON.stringify(object));
      // Set expiry date for the object cookie
      cookieStore.set("object", objectEncoded, { expires });
    }
  }

  if (step === 2) {
    const object = await decodeObjectString(cookieStore.get("object")?.value ?? "{}");
    // Child Profiles
    object.profiles = JSON.parse(formObject["profiles"] as string);

    const objectEncoded = await encodeString(JSON.stringify(object));
    cookieStore.set("object", objectEncoded, { expires });
  }

  if (step === 3) {
    const object = await decodeObjectString(cookieStore.get("object")?.value ?? "{}");
    // Delete object cookie
    cookieStore.delete("object");

    // Prisoner Information
    object.prisonerName = String(formObject["prisoner-name"]);
    object.prisonerSurname = String(formObject["prisoner-surname"]);
    object.prisonerNumber = String(formObject["prisoner-number"]);
    object.prisonerPrison = String(formObject["prisoner-prison"]);

    const user = await userSignUp(object);

    redirect(user ? `/auth/status?id=${user.userId}` : "/auth/sign-up?step=1");
  }

  redirect(`/auth/sign-up?step=${step + 1}`);
}

async function decodeObjectString(objectString: string) {
  return JSON.parse(await decodeString(objectString)) as SignUpObject;
}
