"use client"

import { styled } from "react-tailwind-variants"

/**
 * Text Component with all the typography styles.
 */
export const Text = styled("span", {
  variants: {
    size: {
      xs: "text-xs",
      xxs: "text-[10px] leading-[14px]",
      sm: "text-sm",
      base: "text-base",
      lg: "text-lg",
      xl: "text-xl",
      h1: "text-6xl max-md:text-4xl",
      h2: "text-3xl",
      display: "text-[80px] max-md:text-[40px]",
    },
    color: {
      default: "text-white",
      dimmer: "text-neutral-400",
      dimmest: "text-neutral-600",
      inherit: "text-inherit",
    },
    weight: {
      default: "font-normal",
      medium: "font-medium",
      semibold: "font-semibold",
      bold: "font-bold",
    },
    multiline: {
      true: "",
      false: "truncate",
      "clamp-2": "line-clamp-2",
      "clamp-3": "line-clamp-3",
      "clamp-4": "line-clamp-4",
    },
    center: {
      true: "text-center",
    },
    paragraph: {
      true: "max-w-[480px]",
    },
  },
  defaultVariants: {
    color: "default",
    size: "sm",
    weight: "default",
    multiline: false,
    center: false,
  },
})
