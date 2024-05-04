"use client"

import { AppState, ScreenName } from "@/app/types/state"
import { createContext, useContext, useState } from "react"

const AppStateContext = createContext<
  (AppState & { set: (partialState: Partial<AppState>) => void }) | null
>(null)

export function AppStateProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AppState>({
    screen: ScreenName.home,
  })

  const set = (partialState: Partial<AppState>) =>
    setState(s => ({
      ...s,
      ...partialState,
    }))

  return (
    <AppStateContext.Provider value={{ ...state, set }}>
      {children}
    </AppStateContext.Provider>
  )
}

export const useAppState = () => {
  const value = useContext(AppStateContext)

  if (value === null)
    throw new Error("useAppState must be used within AppStateProvider")

  return value
}
