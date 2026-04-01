'use server'

import { createServerAction } from '@/lib/utils/server-actions'
import { createClient } from '@/lib/supabase/server'
import { createValidatedAction } from '@/lib/utils/create-validated-action'
import { profileSchema } from '@/lib/schema/profile'

export const getMyProfile = createServerAction(async () => {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) return null

  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single()

  if (error) throw new Error(error.message)
  return data
})

export const updateProfile = createValidatedAction<typeof profileSchema, void>(
  profileSchema,
  async (validatedData) => {
    const supabase = await createClient()

    const {
      data: { user },
    } = await supabase.auth.getUser()
    if (!user) throw new Error('Chưa đăng nhập')

    const { data, error } = await supabase
      .from('profiles')
      .update(validatedData)
      .eq('id', user.id)
      .select()
      .single()

    if (error) throw new Error(error.message)
    return data
  }
)

export const getMyItineraries = createServerAction(async () => {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) return []

  const { data, error } = await supabase
    .from('ai_itineraries')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })

  if (error) throw new Error(error.message)

  return data || []
})

