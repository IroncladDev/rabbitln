"use client"

import Container from "../components/container"
import Flex from "../components/flex"
import Header from "./components/Header"
import Actions from "./components/Actions"
import ScreenContent from "./components/ScreenContent"
import { useState } from "react"

export default function Home() {
  const [recording, setRecording] = useState<"voice" | "multimodal" | false>(
    false,
  )

  return (
    <Container
      style={{
        // TODO: change based on mode? kinda annoying for now
        // backgroundImage: "url(/rabbit-bg.svg)",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      <Flex col grow justify="between" width="full" p={4}>
        <Header />
        <ScreenContent />
        {recording || "no"}
        <Actions recording={recording} setRecording={setRecording} />
      </Flex>
    </Container>
  )
}
