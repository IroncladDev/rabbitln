import plugin from "@fedibtc/tailwind-theme"
import type { Config } from "tailwindcss"

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}"],
  plugins: [plugin],
}
export default config
