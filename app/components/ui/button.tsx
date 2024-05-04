import { styled } from "react-tailwind-variants"

export const Button = styled("button", {
  base: "flex gap-2 items-center justify-center border-0 outline-none transition-colors",
  variants: {
    variant: {
      default: "bg-white text-black active:bg-neutral-300",
      outline:
        "border border-solid !border-2 border-neutral-800 active:bg-neutral-900",
    },
    size: {
      default: "text-base h-10 px-4 py-2 rounded-lg",
      small: "text-sm h-8 px-3 py-1.5 rounded-md",
      icon: "w-10 h-10 p-2 rounded-lg",
    },
    width: {
      unset: "",
      auto: "w-auto",
      full: "w-full",
    },
    disabled: {
      true: "opacity-50 pointer-events-none",
    },
    loading: {
      true: "opacity-75 animate-pulse pointer-events-none",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
    width: "unset",
  },
})
