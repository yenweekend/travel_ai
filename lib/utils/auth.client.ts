import { createClient } from '@/lib/supabase/client'
import { UserRole } from '@/types/auth'

export const getUserRoleClient = async (): Promise<UserRole | null> => {
  const supabase = createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) return null

  return (user.user_metadata?.role as UserRole) ?? null
}
