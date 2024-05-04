"use server"

import { ServerActionResult } from "@/app/types/utils"
import { dbClient } from "@/lib/drizzle/db"
import { user } from "@/lib/drizzle/schema"
import { formatError } from "@/lib/errors"
import { getSession } from "@/lib/server/auth"
import { createFedimintClient, federationIdSchema } from "@/lib/server/fedimint"
import bolt11 from "bolt11"
import { eq } from "drizzle-orm"
import { z } from "zod"

const redeemLightningInput = z.object({
  invoice: z.string(),
  federationId: federationIdSchema,
})

export async function withdraw(
  input: z.infer<typeof redeemLightningInput>,
): ServerActionResult<{ amount: number }> {
  const session = await getSession()

  try {
    if (!session) throw new Error("Unauthorized, please log in")

    const { invoice, federationId } = redeemLightningInput.parse(input)
    const decoded = bolt11.decode(invoice)

    if (!decoded.complete || !decoded.satoshis)
      throw new Error("Invalid invoice")

    const amount = decoded.satoshis

    if (amount > session.user.balance) throw new Error("Insufficient balance")

    const fedimint = await createFedimintClient(federationId)

    await fedimint.lightning.pay({
      paymentInfo: invoice,
    })

    const db = await dbClient

    await db
      .update(user)
      .set({ balance: session.user.balance - amount })
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
