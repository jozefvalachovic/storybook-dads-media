import { sql, type Prison } from "@/lib";

export async function prisonsGet() {
  const prisons = await sql<Prison[]>`
  select
      "Prison"."id" as "prisonId",
      "Prison"."name" as "prisonName"
    from "Prison"
  `;

  if (prisons.length === 0) {
    return [];
  }

  return prisons;
}

export async function prisonGetByName(prisonName: string) {
  const prisons = await sql<Prison[]>`
  select
      "Prison"."id" as "prisonId",
      "Prison"."name" as "prisonName"
    from "Prison"
    where
      "Prison"."name" = ${prisonName}
  `;

  if (prisons.length === 0) {
    return null;
  }

  return prisons[0];
}
