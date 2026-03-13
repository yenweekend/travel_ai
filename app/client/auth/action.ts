'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { AuthFormData, RegisterFormData } from '@/lib/schema/auth'

// 1. Định nghĩa kiểu dữ liệu cho State trả về
export type AuthState = {
  success: boolean
  message: string | null
}
export const loginAction = async (
  prevState: AuthState,
  data: AuthFormData
): Promise<AuthState> => {
  const supabase = await createClient()

  const { error } = await supabase.auth.signInWithPassword({
    email: data.email,
    password: data.password,
  })

  if (error) {
    let errorMessage = error.message
    if (errorMessage === 'Invalid login credentials') {
      errorMessage = 'Email hoặc mật khẩu không chính xác.'
    } else if (errorMessage === 'Email not confirmed') {
      errorMessage =
        'Vui lòng kiểm tra hộp thư để xác nhận email trước khi đăng nhập.'
    }

    return { success: false, message: errorMessage }
  }

  // Nếu thành công, xóa cache layout và chuyển hướng
  revalidatePath('/', 'layout')
  redirect('/dashboard')
}

export const registerAction = async (
  prevState: AuthState,
  data: RegisterFormData
): Promise<AuthState> => {
  const supabase = await createClient()

  const { error } = await supabase.auth.signUp({
    email: data.email,
    password: data.password,
  })

  if (error) {
    let errorMessage = error.message
    if (errorMessage === 'User already registered') {
      errorMessage = 'Email này đã được sử dụng. Vui lòng chọn email khác.'
    } else if (errorMessage.includes('Password should be at least')) {
      errorMessage = 'Mật khẩu quá yếu, vui lòng chọn mật khẩu dài hơn.'
    }
    return { success: false, message: errorMessage }
  }

  return {
    success: true,
    message:
      'Đăng ký thành công! Vui lòng kiểm tra hộp thư email (và thư mục Spam) của bạn để xác nhận tài khoản.',
  }
}
