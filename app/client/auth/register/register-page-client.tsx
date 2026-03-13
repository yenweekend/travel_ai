'use client'

import Link from 'next/link'
import { startTransition, useActionState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'

import { registerAction, type AuthState } from '@/app/client/auth/action'
import { RegisterFormData, registerSchema } from '@/lib/schema/auth'

import { Button } from '@/components/ui/button'
import { FieldGroup } from '@/components/ui/field'
import { ControlledInput } from '@/components/ui/controlled-input'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { toast } from 'sonner'

const initialState: AuthState = {
  success: false,
  message: null,
}

export const RegisterPageClient = () => {
  const router = useRouter()

  const [state, action, isPending] = useActionState(
    registerAction,
    initialState
  )

  const form = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
  })

  function onSubmit(values: RegisterFormData) {
    startTransition(() => {
      action(values)
    })
  }

  useEffect(() => {
    if (!state) return

    if (state.success) {
      toast.success('Đăng ký thành công', {
        description: state.message ?? 'Bạn có thể đăng nhập ngay',
      })
      setTimeout(() => {
        router.push('/auth/login')
      }, 1000)
    } else if (state.message) {
      toast.error(state.message)
    }
  }, [state, router])

  return (
    <Card className="w-full shadow-lg">
      <CardHeader className="space-y-1 text-center">
        <CardTitle className="text-2xl font-bold tracking-tight">
          Tạo tài khoản
        </CardTitle>
        <CardDescription>Nhập thông tin để tạo tài khoản mới</CardDescription>
      </CardHeader>

      <CardContent>
        {state.message && !state.success && (
          <div className="text-destructive bg-destructive/10 mb-4 rounded-md p-3 text-sm">
            {state.message}
          </div>
        )}

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FieldGroup>
            <ControlledInput
              control={form.control}
              name="email"
              label="Email"
              type="email"
              placeholder="name@example.com"
              disabled={isPending}
            />

            <ControlledInput
              control={form.control}
              name="password"
              label="Mật khẩu"
              type="password"
              placeholder="••••••••"
              disabled={isPending}
            />

            <ControlledInput
              control={form.control}
              name="confirmPassword"
              label="Xác nhận mật khẩu"
              type="password"
              placeholder="••••••••"
              disabled={isPending}
            />
          </FieldGroup>

          <Button type="submit" className="w-full" disabled={isPending}>
            {isPending ? 'Đang xử lý...' : 'Đăng ký'}
          </Button>

          {/* Divider */}
          <div className="flex items-center gap-2">
            <div className="bg-border h-px flex-1" />
            <span className="text-muted-foreground text-sm">hoặc</span>
            <div className="bg-border h-px flex-1" />
          </div>

          {/* Google login */}
          <Button variant="outline" className="w-full gap-2">
            Đăng nhập với Google
          </Button>

          {/* Login link */}
          <p className="text-muted-foreground text-center text-sm">
            Đã có tài khoản?{' '}
            <Link
              href="/auth/login"
              className="text-primary font-medium hover:underline"
            >
              Đăng nhập
            </Link>
          </p>
        </form>
      </CardContent>
    </Card>
  )
}
