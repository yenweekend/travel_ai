'use client'

import Link from 'next/link'
import { useActionState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { AuthFormData, authSchema } from '@/lib/schema/auth'
import { loginAction, type AuthState } from '@/app/client/auth/action'

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

const initialState: AuthState = {
  success: false,
  message: null,
}

export const LoginPageClient = () => {
  const [state, action, isPending] = useActionState(loginAction, initialState)

  const form = useForm<AuthFormData>({
    resolver: zodResolver(authSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  function onSubmit(values: AuthFormData) {
    action(values)
  }

  return (
    <Card className="w-full shadow-lg">
      <CardHeader className="space-y-1 text-center">
        <CardTitle className="text-2xl font-bold tracking-tight">
          Đăng nhập
        </CardTitle>

        <CardDescription>
          Nhập email và mật khẩu để truy cập hệ thống
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Error message */}
        {state.message && !state.success && (
          <div className="text-destructive bg-destructive/10 rounded-md p-3 text-sm">
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
          </FieldGroup>

          {/* forgot password */}
          <div className="flex justify-end">
            <Link
              href="/auth/forgot-password"
              className="text-muted-foreground text-sm hover:underline"
            >
              Quên mật khẩu?
            </Link>
          </div>

          {/* login button */}
          <Button type="submit" className="w-full" disabled={isPending}>
            {isPending ? 'Đang xử lý...' : 'Đăng nhập'}
          </Button>
        </form>

        {/* divider */}
        <div className="flex items-center gap-2">
          <div className="bg-border h-px flex-1" />
          <span className="text-muted-foreground text-sm">hoặc</span>
          <div className="bg-border h-px flex-1" />
        </div>

        {/* Google login */}
        <Button type="button" variant="outline" className="w-full">
          Đăng nhập với Google
        </Button>

        {/* register link */}
        <p className="text-muted-foreground text-center text-sm">
          Chưa có tài khoản?{' '}
          <Link
            href="/auth/register"
            className="text-primary font-medium hover:underline"
          >
            Đăng ký
          </Link>
        </p>
      </CardContent>
    </Card>
  )
}
