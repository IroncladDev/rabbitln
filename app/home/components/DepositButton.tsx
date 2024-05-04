import { useState } from "react"
import { useFederation } from "@/app/components/providers/federation-provider"
import { useAuth } from "@/app/components/providers/auth-provider"
import { Icon, useToast } from "@fedibtc/ui"
import { Button } from "@/app/components/ui/button"
import { deposit } from "../actions/deposit"

export default function DepositButton({
  children,
  ...props
}: Omit<React.ComponentProps<typeof Button>, "onClick" | "depositLoading">) {
  const [depositLoading, setDepositLoading] = useState(false)

  const { refetch } = useAuth()
  const federation = useFederation()
  const toast = useToast()

  const handleDeposit = async () => {
    setDepositLoading(true)

    try {
      let notes: string | undefined = undefined

      try {
        notes = await window.fediInternal?.generateEcash?.({})
      } catch {
        /* no-op */
      }

      if (!notes) {
        setDepositLoading(false)

        return
      }

      const res = await deposit({ federationId: federation.id, notes })

      if (!res.success) throw new Error(res.message)

      toast.show("Successfully Deposited " + res.amount + " sats")
      refetch()
    } catch (e) {
      toast.error(e)
    } finally {
      setDepositLoading(false)
    }
  }

  return (
    <Button {...props} onClick={handleDeposit} loading={depositLoading}>
      {depositLoading ? (
        <Icon icon="IconLoader2" className="w-4 h-4 animate-spin" />
      ) : (
        children
      )}
    </Button>
  )
}
