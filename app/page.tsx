"use client"

import { useAppState } from "./components/providers/app-state-provider"
import Home from "./home"
import { ScreenName } from "./types/state"

export default function Index() {
  const { screen } = useAppState()

  switch (screen) {
    case ScreenName.home:
      return <Home />
    default:
      return null
  }
}
