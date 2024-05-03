"use client"

import { Icon, useNostrContext, useWebLNContext } from "@fedibtc/ui"
import Container from "./container"
// import { useAuth } from "./providers/auth-provider"
import { useFederationContext } from "./providers/federation-provider"
import { formatError } from "@/lib/errors"
import { styled } from "react-tailwind-variants"
import Flex from "./flex"
import { Text } from "./ui/text"
import { useAuth } from "./providers/auth-provider"

export default function Fallback({ children }: { children: React.ReactNode }) {
  const { isLoading: isWeblnLoading, error: weblnError } = useWebLNContext()
  const { isLoading: isNostrLoading, error: nostrError } = useNostrContext()
  const { isLoading: isFederationLoading, error: federationError } =
    useFederationContext()
  const { isLoading: isAuthLoading, error: authError } = useAuth()

  const errors = [weblnError, nostrError, federationError, authError]
  const loaders = [
    isWeblnLoading,
    isNostrLoading,
    isFederationLoading,
    isAuthLoading,
  ]

  const error = errors.find(Boolean)
  const isLoading = loaders.find(Boolean)

  if (isLoading) {
    return (
      <Container>
        <Flex row align="center" gap={2}>
          {loaders
            .sort((a, b) => Number(a) - Number(b))
            .map((l, i) => (
              <LoadingDot loading={l} key={i} />
            ))}
        </Flex>
        <Text>Loading... {loaders.filter(Boolean).length}</Text>
      </Container>
    )
  }

  if (error) {
    return (
      <Container className="p-2">
        <Icon icon="IconCircleX" size="lg" className="text-lightGrey" />
        <Text size="h2" weight="bold">
          An Error Occurred
        </Text>
        <Text className="text-center">{formatError(error)}</Text>
      </Container>
    )
  }

  return <Container>{children}</Container>
}

const { LoadingDot } = {
  LoadingDot: styled("div", {
    base: "bg-white w-4 h-4 rounded-full",
    variants: {
      loading: {
        true: "animate-ping",
      },
    },
  }),
}
