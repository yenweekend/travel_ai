import { NextResponse } from 'next/server'

import { createClient } from '@/lib/supabase/server'

export async function GET(request: Request) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')
  const error = requestUrl.searchParams.get('error')
  const errorCode = requestUrl.searchParams.get('error_code')
  const redirectTo = requestUrl.searchParams.get('redirect_to')?.toString()

  if (error === 'access_denied' || errorCode === 'otp_expired') {
    return NextResponse.redirect(
      `${process.env.NEXT_PUBLIC_APP_URL}/link-expired`
    )
  }

  if (code) {
    const supabase = await createClient()
    const { error: exchangeError } =
      await supabase.auth.exchangeCodeForSession(code)

    if (exchangeError) {
      if (
        exchangeError.message?.includes('expired') ||
        exchangeError.code === 'otp_expired'
      ) {
        return NextResponse.redirect(
          `${process.env.NEXT_PUBLIC_APP_URL}/link-expired`
        )
      }

      return NextResponse.redirect(`${process.env.NEXT_PUBLIC_APP_URL}/login`)
    }
  }

  if (redirectTo) {
    return NextResponse.redirect(
      `${process.env.NEXT_PUBLIC_APP_URL}${redirectTo}`
    )
  }

  return NextResponse.redirect(`${process.env.NEXT_PUBLIC_APP_URL}`)
}
