import postgres from "postgres";

const host = process.env.DB_HOST as string;
const port = process.env.DB_PORT as string;
const database = process.env.DB_NAME as string;
const user = process.env.DB_USER as string;
const password = process.env.DB_PASSWORD;

export const sql = postgres({
  host,
  port: parseInt(port),
  database,
  username: user,
  password,
  ssl: {
    rejectUnauthorized: false,
  },
  max: 5,
  idle_timeout: 30,
  max_lifetime: 600,
});

export * from "./types";

export * from "./handlers";
