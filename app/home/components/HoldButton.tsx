import { MotionButton } from "@/app/components/motion"
import React, { useRef } from "react"
import { styled } from "react-tailwind-variants"

export function HoldButton({
  onClick,
  onTap,
  onRelease,
  isActive = false,
  ...props
}: Omit<React.ComponentProps<typeof HoldButtonBase>, "onClick"> & {
  onClick: () => void
  onTap?: () => void
  onRelease?: () => void
  isActive?: boolean
}) {
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const isPressing = useRef(false)

  const startPressTimer = () => {
    isPressing.current = true

    if (!timerRef.current) {
      timerRef.current = setTimeout(() => {
        if (isPressing.current) {
          onClick()
          stopPressTimer()
        }
      }, 500)
    }
  }

  const stopPressTimer = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current)
      timerRef.current = null
    }
    isPressing.current = false
  }

  const startTimerGesture = () => {
    onTap?.()
    startPressTimer()
  }

  const stopTimerGesture = () => {
    onRelease?.()
    stopPressTimer()
  }

  return (
    <HoldButtonBase
      {...props}
      onTouchStart={startTimerGesture}
      onTouchEnd={stopTimerGesture}
      onMouseDown={startTimerGesture}
      onMouseUp={stopTimerGesture}
      onMouseLeave={stopTimerGesture}
      whileTap={{
        scale: 1.1,
        filter: "brightness(110%)",
      }}
      isActive={isActive}
    >
      {props.children}
    </HoldButtonBase>
  )
}

const { HoldButtonBase } = {
  HoldButtonBase: styled(MotionButton, {
    base: "w-16 h-16 rounded-full flex items-center justify-center text-neutral-200 select-none",
    variants: {
      isActive: {
        true: "bg-red-500",
        false: "bg-neutral-900",
      },
    },
  }),
}
