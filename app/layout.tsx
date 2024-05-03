import { NostrProvider, ToastProvider, WebLNProvider } from "@fedibtc/ui"
import "@fedibtc/ui/dist/index.css"
import type { Metadata } from "next"
import { Albert_Sans } from "next/font/google"
import Fallback from "./components/fallback"
import { FederationProvider } from "./components/providers/federation-provider"
import "./globals.css"
import { AuthProvider } from "./components/providers/auth-provider"

const albertSans = Albert_Sans({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "RabbitLN",
  description: "RabbitLN",
  icons: ["logo.png"],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={albertSans.className}>
        <ToastProvider>
          <FederationProvider>
            <WebLNProvider>
              <NostrProvider>
                <AuthProvider>
                  <Fallback>{children}</Fallback>
                </AuthProvider>
              </NostrProvider>
            </WebLNProvider>
          </FederationProvider>
        </ToastProvider>
      </body>
    </html>
  )
}
