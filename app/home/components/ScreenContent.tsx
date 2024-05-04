import Flex from "@/app/components/flex"
import { Clock } from "./Clock"
import { useAuth } from "@/app/components/providers/auth-provider"
import { Text } from "@/app/components/ui/text"
import DepositButton from "./DepositButton"
import { Icon } from "@fedibtc/ui"

export default function ScreenContent() {
  const { user } = useAuth()

  return (
    <Flex
      col
      grow
      align="center"
      justify="between"
      width="full"
      className="max-h-[50vh]"
    >
      <Clock />
      <Flex col width="full">
        {user?.balance === 0 && (
          <Flex col gap={2} align="center">
            <Text color="dimmer">
              Deposit some Sats to start using RabbitLN
            </Text>
            <DepositButton>
              <Text className="text-black">Deposit Sats</Text>
              <Icon icon="IconArrowUp" className="w-4 h-4" />
            </DepositButton>
          </Flex>
        )}
      </Flex>
    </Flex>
  )
}
