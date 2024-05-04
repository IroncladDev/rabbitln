"use client"

import { useNostrContext } from "@fedibtc/ui"
import { Event, UnsignedEvent, getEventHash } from "nostr-tools"
import { createContext, useContext, useEffect, useState } from "react"
import { User } from "@/lib/drizzle/schema"
import { refetchUser } from "./actions/refetchuser"
import { connect } from "./actions/connect"
import { login } from "./actions/login"

interface AuthContextLoading {
  isLoading: true
  error: null
  user: null
  refetch: () => void
}

interface AuthContextError {
  isLoading: false
  error: Error
  user: null
  refetch: () => void
}

interface AuthContextUser {
  isLoading: false
  error: null
  user: User
  refetch: () => void
}

export type AuthContextValue =
  | AuthContextLoading
  | AuthContextError
  | AuthContextUser

export const AuthContext = createContext<AuthContextValue | null>(null)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [error, setError] = useState<Error | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [user, setUser] = useState<User | null>(null)

  const { nostr, isLoading: isNostrLoading } = useNostrContext()

  const refetch = () => {
    refetchUser().then(res => {
      if (res.success) setUser(res.user)
    })
  }

  useEffect(() => {
    async function attemptLogin() {
      try {
        if (!nostr) throw new Error("No nostr provider found")

        const connectionRes = await connect({ pubkey: nostr.pubkey })

        if (!connectionRes.success) throw new Error(connectionRes.message)

        if ("user" in connectionRes.data) {
          setUser(connectionRes.data.user)
          setIsLoading(false)

          return
        }

        const evt: UnsignedEvent = {
          kind: 22242,
          created_at: Math.floor(Date.now() / 1000),
          tags: [["challenge", connectionRes.data.sigToken]],
          content: "Log into RabbitLN",
          pubkey: nostr.pubkey,
        }

        const event: Omit<Event, "sig"> = {
          ...evt,
          id: getEventHash(evt),
        }

        const signedEvent: Event = (await nostr.signEvent(event)) as Event
        const loginRes = await login(signedEvent)

        if (!loginRes.success) throw new Error(loginRes.message)

        if (!loginRes.data?.user) throw new Error("No user returned from login")

        setUser(loginRes.data.user)
        setIsLoading(false)
      } catch (e) {
        setError(e as Error)
        setIsLoading(false)
      }
    }

    if (nostr) {
      attemptLogin()
    }
  }, [nostr, isNostrLoading])

  return (
    <AuthContext.Provider
      value={
        {
          isLoading,
          error,
          user,
          refetch,
        } as AuthContextValue
      }
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)

  if (context === null) {
    throw new Error("useAuth must be used within an AuthProvider")
  }

  return context
}
