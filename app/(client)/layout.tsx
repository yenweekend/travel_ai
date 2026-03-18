import { getCurrentUserWithRole } from '@/components/layout/actions/user-info-action'
import ClientLayout from '@/components/layout/client/client-layout'

export default async function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const result = await getCurrentUserWithRole()
  const userEmail = result.success ? result.data?.email : undefined
  const initialRole = result.success ? result.data?.role : null
  const initialUserId = result.success ? result.data?.userId : null
  return (
    <ClientLayout
      userEmail={userEmail}
      initialRole={initialRole}
      initialUserId={initialUserId}
    >
      {children}
    </ClientLayout>
  )
}
