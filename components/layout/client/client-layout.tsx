'use client'

import React from 'react'

import { UserRole } from '@/types/auth'

import { PermissionsProvider } from '@/components/layout/permissions-provider'
import { Header } from '@/components/layout/client/header'

export default function ClientLayout({
  children,
  userEmail,
  initialRole,
  initialUserId,
}: Readonly<{
  children: React.ReactNode
  userEmail?: string
  initialRole?: UserRole | null
  initialUserId?: string | null
}>) {
  return (
    <PermissionsProvider
      initialRole={initialRole}
      initialUserId={initialUserId}
    >
      <Header userEmail={userEmail} />
      {children}
    </PermissionsProvider>
  )
}
