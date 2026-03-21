import { createClient } from '@/lib/supabase/client'
import { UserRole } from '@/types/auth'

export const getUserRoleClient = async (): Promise<UserRole | null> => {
  const supabase = createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) return null

  const { data } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single()

  return (data?.role as UserRole) ?? null
}
