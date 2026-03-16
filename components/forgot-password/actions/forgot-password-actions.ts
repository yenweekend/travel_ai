'use server'

import { emailSchema, resetPasswordSchema } from '@/lib/schema/auth'
import { createClient } from '@/lib/supabase/server'
import { createValidatedAction } from '@/lib/utils/create-validated-action'
import { createServerAction } from '@/lib/utils/server-actions'

export const resetPasswordForEmail = createValidatedAction<
  typeof emailSchema,
  void
>(emailSchema, async (validatedData) => {
  const supabase = await createClient()
  const email = validatedData.email.toLowerCase()

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/auth/callback?redirect_to=/reset-password`,
  })

  if (error) {
    throw new Error(error.message)
  }
})

export const changePassword = createValidatedAction<
  typeof resetPasswordSchema,
  void
>(resetPasswordSchema, async (validatedData) => {
  const supabase = await createClient()

  const { error } = await supabase.auth.updateUser({
    password: validatedData.password,
  })

  if (error) {
    throw new Error(error.message)
  }
})

export const signOut = createServerAction(async () => {
  const supabase = await createClient()

  const { error } = await supabase.auth.signOut()

  if (error) {
    throw new Error(error.message)
  }
})
