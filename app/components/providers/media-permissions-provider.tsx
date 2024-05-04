"use client"

import React, { createContext, useState, useEffect, useContext } from "react"

export const MediaPermissionContext = createContext<{
  error: Error | null
  isLoading: boolean
} | null>(null)

export const MediaPermissionProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const requestMediaPermission = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        })

        // Close the stream immediately
        stream.getTracks().forEach(track => track.stop())

        setIsLoading(false)
      } catch (err) {
        setError(err as Error)
        setIsLoading(false)
      }
    }

    requestMediaPermission()
  }, [])

  return (
    <MediaPermissionContext.Provider value={{ isLoading, error }}>
      {children}
    </MediaPermissionContext.Provider>
  )
}

export function useMediaPermissions() {
  const ctx = useContext(MediaPermissionContext)

  if (ctx === null)
    throw new Error(
      "useMediaPermissions must be used within a MediaPermissionProvider",
    )

  return ctx
}
