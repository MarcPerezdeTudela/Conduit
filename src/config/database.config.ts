const user = process.env.POSTGRES_USER;
const password = process.env.POSTGRES_PASSWORD;
const host = process.env.POSTGRES_HOST;
const port = process.env.POSTGRES_PORT;
const database = process.env.POSTGRES_DB;
const postgresConnectionUri = process.env.DATABASE_URI;

export default () => ({
  user,
  password,
  host,
  port,
  database,
  postgresConnectionUri,
});
