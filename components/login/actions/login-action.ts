'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { loginSchema } from '@/lib/schema/auth'
import { createValidatedAction } from '@/lib/utils/create-validated-action'

export const loginAction = createValidatedAction<typeof loginSchema, void>(
  loginSchema,
  async (validatedData) => {
    const supabase = await createClient()

    const { error } = await supabase.auth.signInWithPassword({
      email: validatedData.email,
      password: validatedData.password,
    })

    if (error) {
      if (error.message === 'Invalid login credentials') {
        throw new Error('Email or password is incorrect.')
      }
    }

    revalidatePath('/', 'layout')
    redirect('/')
  }
)
