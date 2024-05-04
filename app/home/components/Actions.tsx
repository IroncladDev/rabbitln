import Flex from "@/app/components/flex"
import { HoldButton } from "./HoldButton"
import { Icon } from "@fedibtc/ui"
import { Text } from "@/app/components/ui/text"
import { Dispatch, SetStateAction, useState } from "react"

export default function Actions({
  recording,
  setRecording,
}: {
  recording: "voice" | "multimodal" | false
  setRecording: Dispatch<SetStateAction<"voice" | "multimodal" | false>>
}) {
  const [hasTapped, setHasTapped] = useState(false)

  const handleTap = () => {
    if (!hasTapped) setHasTapped(true)
  }

  const handleRelease = () => setRecording(false)

  return (
    <Flex row gap={2} justify="between" width="full">
      <HoldButton
        onClick={() => setRecording("voice")}
        onTap={handleTap}
        onRelease={handleRelease}
        isActive={recording === "voice"}
      >
        <Icon icon="IconMicrophone" className="w-8 h-8" />
      </HoldButton>
      {hasTapped ? null : (
        <Flex row center gap={2}>
          <Icon icon="IconArrowLeft" className="w-4 h-4 text-white" />
          <Text weight="medium">Press & Hold to speak</Text>
          <Icon icon="IconArrowRight" className="w-4 h-4 text-white" />
        </Flex>
      )}
      <HoldButton
        onClick={() => setRecording("multimodal")}
        onTap={handleTap}
        onRelease={handleRelease}
        isActive={recording === "multimodal"}
      >
        <Icon icon="IconScanEye" className="w-8 h-8" />
      </HoldButton>
    </Flex>
  )
}
