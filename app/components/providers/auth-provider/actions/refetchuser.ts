"use server"

import { ServerActionResult } from "@/app/types/utils"
import { User } from "@/lib/drizzle/schema"
import { formatError } from "@/lib/errors"
import { getSession } from "@/lib/server/auth"

export async function refetchUser(): ServerActionResult<{ user: User }> {
  const session = await getSession()
  try {
    if (!session) throw new Error("Unauthorized, please log in")

    return { success: true, user: session.user }
  } catch (e) {
    return {
      success: false,
      message: formatError(e),
    }
  }
}
