'use server'

import { AuthError } from '@supabase/supabase-js'

import { createClient } from '@/lib/supabase/server'
import { loginSchema } from '@/lib/schema/auth'
import { createValidatedAction } from '@/lib/utils/create-validated-action'

const mapAuthError = (error: AuthError): string => {
  switch (error.message) {
    case 'Invalid login credentials':
      return 'Incorrect email or password'
    case 'Email not confirmed':
      return 'Your email has not been confirmed. Please check your inbox'
    default:
      return error.message
  }
}

export const loginAction = createValidatedAction<typeof loginSchema, void>(
  loginSchema,
  async (validatedData) => {
    const supabase = await createClient()

    const { error } = await supabase.auth.signInWithPassword({
      email: validatedData.email,
      password: validatedData.password,
    })

    if (error) {
      throw new Error(mapAuthError(error))
    }
  }
)
