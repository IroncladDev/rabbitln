import { FedimintClientBuilder } from "fedimint-ts"
import { z } from "zod"

const { BASE_URL, PASSWORD } = process.env

export const createFedimintClient = async (federationId: string) => {
  const clientBuilder = new FedimintClientBuilder()
    .setBaseUrl(BASE_URL)
    .setPassword(PASSWORD)
    .setActiveFederationId(federationId)

  const client = clientBuilder.build()

  const { federationIds } = await client.federationIds()

  if (!federationIds.includes(federationId)) {
    throw new Error("RabbitLN has not joined this federation yet")
  }

  await client.useDefaultGateway()

  return client
}

export const federationIdSchema = z
  .string()
  .min(48)
  .max(192)
  .regex(/[a-f0-9]+/)
