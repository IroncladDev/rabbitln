import { useState } from "react"
import { useAuth } from "@/app/components/providers/auth-provider"
import { useFederation } from "@/app/components/providers/federation-provider"
import { Icon, useToast, useWebLN } from "@fedibtc/ui"
import { RequestInvoiceResponse } from "@fedibtc/api"
import { withdraw } from "../actions/withdraw"
import { Button } from "@/app/components/ui/button"

export default function WithdrawButton({
  children,
  ...props
}: Omit<React.ComponentProps<typeof Button>, "onClick" | "loading">) {
  const [withdrawLoading, setWithdrawLoading] = useState(false)

  const { user, refetch } = useAuth()
  const federation = useFederation()
  const toast = useToast()
  const webln = useWebLN()

  const handleWithdraw = async () => {
    setWithdrawLoading(true)

    try {
      let invoice: RequestInvoiceResponse | null = null

      try {
        invoice = await webln.makeInvoice({
          minimumAmount: 0,
          maximumAmount: user?.balance,
        })
      } catch {
        setWithdrawLoading(false)

        return
      }

      if (!invoice) throw new Error("Invalid invoice")

      const res = await withdraw({
        invoice: invoice.paymentRequest,
        federationId: federation.id,
      })

      if (!res.success) throw new Error(res.message)

      toast.show(res.amount + " Sats withdrawn successfully")
      refetch()
    } catch (e) {
      toast.error(e)
    } finally {
      setWithdrawLoading(false)
    }
  }

  return (
    <Button {...props} onClick={handleWithdraw}>
      {withdrawLoading ? (
        <Icon icon="IconLoader2" className="w-4 h-4 animate-spin" />
      ) : (
        children
      )}
    </Button>
  )
}
