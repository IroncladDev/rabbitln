"use client"

import { Icon, IconKey, useNostrContext, useWebLNContext } from "@fedibtc/ui"
import Container from "./container"
import { useFederationContext } from "./providers/federation-provider"
import { formatError } from "@/lib/errors"
import { styled } from "react-tailwind-variants"
import Flex from "./flex"
import { Text } from "./ui/text"
import { useAuth } from "./providers/auth-provider"
import { useMediaPermissions } from "./providers/media-permissions-provider"

export default function Fallback({ children }: { children: React.ReactNode }) {
  const { isLoading: isWeblnLoading, error: weblnError } = useWebLNContext()
  const { isLoading: isNostrLoading, error: nostrError } = useNostrContext()
  const { isLoading: isFederationLoading, error: federationError } =
    useFederationContext()
  const { isLoading: isAuthLoading, error: authError } = useAuth()
  const { isLoading: isPermissionsLoading, error: permissionsError } =
    useMediaPermissions()

  const errors = [
    weblnError,
    nostrError,
    federationError,
    authError,
    permissionsError,
  ]
  const loaders = [
    {
      loading: isWeblnLoading,
      label: "WebLN",
      icon: "IconBolt" as IconKey,
      color: "#fcd34d",
    },
    {
      loading: isNostrLoading,
      label: "Nostr",
      icon: "IconEye" as IconKey,
      color: "#7e22cc",
    },
    {
      loading: isFederationLoading,
      label: "Fedi",
      icon: "IconWorld" as IconKey,
      color: "#d97706",
    },
    {
      loading: isPermissionsLoading,
      label: "Perms",
      icon: "IconMicrophone" as IconKey,
      color: "#06b6d4",
    },
    {
      loading: isAuthLoading,
      label: "Auth",
      icon: "IconLock" as IconKey,
      color: "#22c55e",
    },
  ]

  const error = errors.find(Boolean)
  const isLoading = loaders.find(l => l.loading)

  if (isLoading?.loading) {
    return (
      <Container>
        <Wrapper>
          <Spinner />
          <Flex col gap={4} center className="absolute inset-2">
            <Flex row align="center" gap={4}>
              {loaders
                .sort((a, b) => Number(a.loading) - Number(b.loading))
                .map((l, i) => (
                  <Flex col gap={1} align="center" key={i}>
                    <Icon
                      icon={l.icon}
                      className="w-4 h-4"
                      style={{ color: l.color }}
                    />
                    <LoadingDot loading={l.loading} />
                    <Text size="xxs" color="dimmest">
                      {l.label}
                    </Text>
                  </Flex>
                ))}
            </Flex>
            <Text weight="medium" size="lg">
              Connecting...
            </Text>
          </Flex>
        </Wrapper>
      </Container>
    )
  }

  if (error) {
    return (
      <Container>
        <Wrapper>
          <ErrorIndicator />
          <Flex col gap={4} center className="absolute inset-4">
            <Text weight="medium" size="h2">
              An Error Occurred
            </Text>
            <Text size="lg" color="dimmer" multiline center>
              {formatError(error)}
            </Text>
          </Flex>
        </Wrapper>
      </Container>
    )
  }

  return <Container>{children}</Container>
}

const { LoadingDot, Wrapper, Spinner, ErrorIndicator } = {
  LoadingDot: styled("div", {
    base: "bg-white w-6 h-2 rounded-full transition-colors",
    variants: {
      loading: {
        true: "bg-neutral-600 animate-pulse",
      },
    },
  }),
  Wrapper: styled("div", {
    base: "relative w-[320px] h-[320px] flex",
  }),
  Spinner: styled("div", {
    base: "absolute w-full h-full rounded-full border-4 border-neutral-800 border-b-transparent animate-spin",
  }),
  ErrorIndicator: styled("div", {
    base: "absolute w-full h-full rounded-full border-4 border-red-900",
  }),
}
