import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

function getEnvironmentVariables() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error(
      'Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY'
    )
  }

  return { supabaseUrl, supabaseAnonKey }
}

export async function createClient() {
  const { supabaseUrl, supabaseAnonKey } = getEnvironmentVariables()

  const cookieStore = await cookies()

  return createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll()
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options)
          )
        } catch (error) {
          console.log(error)
          // Lỗi này thường xảy ra khi gọi từ Server Component
          // (Nơi không cho phép set cookie, chỉ Middleware/Action mới cho phép)
        }
      },
    },
  })
}
