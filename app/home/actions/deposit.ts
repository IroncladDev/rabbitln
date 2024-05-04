"use server"

import { ServerActionResult } from "@/app/types/utils"
import { dbClient } from "@/lib/drizzle/db"
import { user } from "@/lib/drizzle/schema"
import { formatError } from "@/lib/errors"
import { getSession } from "@/lib/server/auth"
import { createFedimintClient, federationIdSchema } from "@/lib/server/fedimint"
import { eq } from "drizzle-orm"
import { z } from "zod"

const depositEcashInput = z.object({
  notes: z.string(),
  federationId: federationIdSchema,
})

export async function deposit(
  input: z.infer<typeof depositEcashInput>,
): ServerActionResult<{ amount: number }> {
  const session = await getSession()

  try {
    const { notes, federationId } = depositEcashInput.parse(input)

    if (!session) throw new Error("Unauthorized, please log in")

    const fedimint = await createFedimintClient(federationId)
    const { amountMsat } = await fedimint.mint.reissue(notes)

    const amount = Math.round(amountMsat / 1000)
    const db = await dbClient

    await db
      .update(user)
      .set({
        balance: session.user.balance + amount,
      })
      .where(eq(user.id, session.userId))

    return {
      success: true,
      amount,
    }
  } catch (e) {
    return {
      success: false,
      message: formatError(e),
    }
  }
}
