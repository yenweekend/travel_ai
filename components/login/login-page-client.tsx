'use client'

import Link from 'next/link'

import { loginSchema } from '@/lib/schema/auth'
import { loginAction } from '@/components/login/actions/login-action'

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
import { useFormWithServerAction } from '@/hooks/use-form-with-server-action'
import { useToastMessage } from '@/hooks/use-toast-message'
import { useRouter } from 'next/navigation'

export const LoginPageClient = () => {
  const router = useRouter()
  const { error, success } = useToastMessage()

  const { form, handleSubmit, isPending, canSubmit } = useFormWithServerAction({
    schema: loginSchema,
    action: loginAction,
    defaultValues: {
      email: '',
      password: '',
    },
    onSuccess: () => {
      success('Register successfully')
      router.replace('/')
    },
    onError: (errors) => {
      if (errors.root) {
        error(errors.root)
      }
    },
  })

  return (
    <Card className="w-full shadow-lg">
      <CardHeader className="space-y-1 text-center">
        <CardTitle className="text-2xl font-bold tracking-tight">
          Log In
        </CardTitle>

        <CardDescription>
          Enter email and password to access the website
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        <form onSubmit={handleSubmit} className="space-y-4">
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
              label="Password"
              type="password"
              placeholder="••••••••"
              disabled={isPending}
            />
          </FieldGroup>

          {/* forgot password */}
          <div className="flex justify-end">
            <Link
              href="/forgot-password"
              className="text-muted-foreground text-sm hover:underline"
            >
              Quên mật khẩu?
            </Link>
          </div>

          {/* login button */}
          <Button
            type="submit"
            className="w-full"
            disabled={isPending || !canSubmit}
          >
            {isPending ? 'Processing...' : 'Log In'}
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
            href="/register"
            className="text-primary font-medium hover:underline"
          >
            Đăng ký
          </Link>
        </p>
      </CardContent>
    </Card>
  )
}
