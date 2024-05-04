import React, { useState, useEffect } from "react"
import { Text } from "@/app/components/ui/text"
import Flex from "@/app/components/flex"

export function Clock() {
  const [hours, setHours] = useState(new Date().getHours())
  const [minutes, setMinutes] = useState(new Date().getMinutes())

  useEffect(() => {
    const interval = setInterval(() => {
      setMinutes(new Date().getMinutes())
      setHours(new Date().getHours())
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  return (
    <Flex col gap={2} align="center" className="h-[320px]">
      <Text size="display" weight="medium" className="drop-shadow-xl">
        {hours % 12}:{minutes.toString().padStart(2, "0")}
      </Text>
    </Flex>
  )
}
