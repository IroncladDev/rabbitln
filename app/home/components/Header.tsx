import Flex from "@/app/components/flex"
import Satoshi from "@/public/icons/satoshi.svg"
import { Text } from "@/app/components/ui/text"
import DepositButton from "./DepositButton"
import WithdrawButton from "./WithdrawButton"
import { styled } from "react-tailwind-variants"
import { useAppState } from "@/app/components/providers/app-state-provider"
import { useAuth } from "@/app/components/providers/auth-provider"
import { ScreenName } from "@/app/types/state"
import { Icon } from "@fedibtc/ui"

export default function Header() {
  const { user } = useAuth()
  const { set } = useAppState()

  return (
    <Flex gap={2} justify="between">
      <Flex center gap={2}>
        <Flex center gap={1}>
          <Satoshi className="w-6 h-6 text-white align-middle" />{" "}
          <Text size="lg">{user?.balance}</Text>
        </Flex>
        {(user?.balance || 0) > 0 && (
          <>
            <DepositButton size="small" variant="outline">
              Deposit
            </DepositButton>
            <WithdrawButton size="small" variant="outline">
              Withdraw
            </WithdrawButton>
          </>
        )}
      </Flex>
      <IconButton onClick={() => set({ screen: ScreenName.settings })}>
        <Icon icon="IconSettings" className="w-8 h-8" />
      </IconButton>
    </Flex>
  )
}

const IconButton = styled("button", { base: "w-8 h-8 text-neutral-500" })
