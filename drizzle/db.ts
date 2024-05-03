import { drizzle } from "drizzle-orm/node-postgres"
import { Client } from "pg"
import * as schema from "./schema"

export async function dbClient() {
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
  })

  await client.connect()

  const db = drizzle(client, { schema })

  return db
}
