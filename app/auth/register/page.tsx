import { RegisterPageClient } from '@/app/client/auth/register/register-page-client'

export default function Register() {
  return (
    <div className="bg-muted/40 flex min-h-screen items-center justify-center p-4">
      <div className="w-full max-w-md">
        <RegisterPageClient />
      </div>
    </div>
  )
}
