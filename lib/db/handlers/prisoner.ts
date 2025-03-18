import { generateUUID, sql, type Prisoner } from "@/lib";

export async function prisonersGet(email: string) {
  const prisoners = await sql<Prisoner[]>`
  select
      "Prisoner"."name" as "prisonerName",
      "Prisoner"."surname" as "prisonerSurname",
      "Prisoner"."prisoner_number" as "prisonerNumber",

      "Prison"."name" as "prisonerPrison"
    from "User"
    left join
      "Prisoner" on "Prisoner"."user_id" = "User"."id"
    left join
      "Prison" on "Prisoner"."prison_id" = "Prison"."id"
    where
      "User"."email" = ${email}
  `;

  if (prisoners.length === 0) {
    return [];
  }

  return prisoners;
}

export async function prisonerGetByNumberAndPrison(prisonerNumber: string, prisonName: string) {
  const prisoners = await sql<Prisoner[]>`
  select
      "Prisoner"."name" as "prisonerName",
      "Prisoner"."surname" as "prisonerSurname",
      "Prisoner"."prisoner_number" as "prisonerNumber",

      "Prison"."name" as "prisonerPrison"
    from "Prisoner"
    left join
      "Prison" on "Prisoner"."prison_id" = "Prison"."id"
    where
      "Prisoner"."prisoner_number" = ${prisonerNumber}
      AND "Prison"."name" = ${prisonName}
  `;

  if (prisoners.length === 0) {
    return null;
  }

  return prisoners[0];
}

export async function prisonerCreate(prisoner: Prisoner, userId: string, prisonId: string) {
  const id = generateUUID();
  const updatedAt = new Date();

  try {
    const prisoners = await sql<Prisoner[]>`
      insert into "Prisoner" (
        "id",
        "user_id",
        "prison_id",
        "name",
        "surname",
        "prisoner_number",
        "updated_at"
      ) values (
        ${id},
        ${userId},
        ${prisonId},
        ${prisoner.prisonerName},
        ${prisoner.prisonerSurname},
        ${prisoner.prisonerNumber},
        ${updatedAt}
      ) returning
        "id" as "prisonerId"
    `;

    if (prisoners.length === 0) {
      return null;
    }

    return prisoners[0];
  } catch (error) {
    console.error(error);

    return null;
  }
}
