import { ResetPasswordClient } from '@/components/forgot-password/reset-password-client'

export default function ForgotPasswordPage() {
  return (
    <div className="bg-muted/40 flex min-h-screen items-center justify-center p-4">
      <div className="w-full max-w-md">
        <ResetPasswordClient />
      </div>
    </div>
  )
}
