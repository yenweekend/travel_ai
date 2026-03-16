import { ForgotPasswordClient } from '@/components/forgot-password/forgot-password-client'

export default function ForgotPasswordPage() {
  return (
    <div className="bg-muted/40 flex min-h-screen items-center justify-center p-4">
      <div className="w-full max-w-md">
        <ForgotPasswordClient />
      </div>
    </div>
  )
}
