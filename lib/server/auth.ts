import { cookies } from "next/headers"
import { dbClient } from "../drizzle/db"

export async function getSession() {
  const token = cookies().get("session")

  if (!token?.value) return null

  const db = await dbClient

  const session = await db.query.session.findFirst({
    where: (s, { eq }) => eq(s.token, token.value),
    with: {
      user: true,
    },
  })

  return session
}
