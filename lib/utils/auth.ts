import { UserRole } from '@/types/auth'
import { createClient } from '@/lib/supabase/server'

export const getUserRole = async (): Promise<UserRole | null> => {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) return null

  const { data, error } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single()

  if (error) return null

  return (data?.role as UserRole) ?? null
}

export const isSuperAdmin = async (): Promise<boolean> => {
  const role = await getUserRole()

  return role === 'admin'
}
