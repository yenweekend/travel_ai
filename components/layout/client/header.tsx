'use client'

import { useRouter } from 'next/navigation'
import { LogOut } from 'lucide-react'

import { signOut } from '@/components/forgot-password/actions/forgot-password-actions'

import { ConfirmationDialog } from '@/components/common/comfirmation-dialog'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { useToast } from '@/hooks/use-toast-notifications'

interface HeaderProps {
  userEmail?: string | null
}

export const Header = ({ userEmail }: HeaderProps) => {
  const { success } = useToast()
  const router = useRouter()
  const handleLogout = async () => {
    await signOut()
    router.push('/login')
    router.refresh()
  }
  const handletoast = () => {
    success('/déc')
  }
  return (
    <div className="">
      <button onClick={handletoast}>toast</button>
      {userEmail ? (
        // ✅ ĐÃ LOGIN
        <>
          <span className="text-muted-foreground hidden text-sm sm:block">
            {userEmail}
          </span>

          <ConfirmationDialog
            trigger={
              <Button
                variant="ghost"
                size="icon"
                className="text-muted-foreground hover:text-destructive hover:bg-destructive/10 h-8 w-8"
              >
                <LogOut className="h-4 w-4" />
              </Button>
            }
            title="Are you sure you want to log out?"
            description="You will be redirected to the login page after logging out."
            confirmLabel="Log out"
            onConfirm={handleLogout}
          />
        </>
      ) : (
        // ❌ CHƯA LOGIN
        <>
          <Button asChild variant="ghost">
            <Link href="/login">Login</Link>
          </Button>

          <Button asChild>
            <Link href="/register">Register</Link>
          </Button>
        </>
      )}
    </div>
  )
}
