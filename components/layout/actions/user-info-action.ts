'use server'

import { createClient } from '@/lib/supabase/server'
import { createServerAction } from '@/lib/utils/server-actions'
import { UserRole } from '@/types/auth'

export const getCurrentUser = createServerAction(async () => {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  return user
})

export const getCurrentUserWithRole = createServerAction(
  async (): Promise<{
    email: string | undefined
    userId: string | undefined
    role: UserRole | null
  }> => {
    const supabase = await createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return { email: undefined, userId: undefined, role: null }
    }

    return {
      email: user.email,
      userId: user.id,
      role: (user.user_metadata?.role as UserRole) ?? null,
    }
  }
)
