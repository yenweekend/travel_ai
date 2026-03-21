'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'

import { registerAction } from '@/components/register/actions/register-action'
import { registerSchema } from '@/lib/schema/auth'

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
import { useToast } from '@/hooks/use-toast-notifications'

export const RegisterPageClient = () => {
  const router = useRouter()
  const { error, success } = useToast()

  const { form, handleSubmit, isPending, canSubmit } = useFormWithServerAction({
    schema: registerSchema,
    action: registerAction,
    defaultValues: {
      email: '',
      password: '',
      password_confirm: '',
    },
    onSuccess: () => {
      success('Registered successfully')
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
          Tạo tài khoản
        </CardTitle>
        <CardDescription>Nhập thông tin để tạo tài khoản mới</CardDescription>
      </CardHeader>

      <CardContent>
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

            <ControlledInput
              control={form.control}
              name="password_confirm"
              label="Confirm password"
              type="password"
              placeholder="••••••••"
              disabled={isPending}
            />
          </FieldGroup>

          <Button
            type="submit"
            className="w-full"
            disabled={isPending || !canSubmit}
          >
            {isPending ? 'Processing...' : 'Sign Up'}
          </Button>

          {/* Divider */}
          <div className="flex items-center gap-2">
            <div className="bg-border h-px flex-1" />
            <span className="text-muted-foreground text-sm">hoặc</span>
            <div className="bg-border h-px flex-1" />
          </div>

          {/* Google login */}
          <Button type="button" variant="outline" className="w-full gap-2">
            Đăng ký với Google
          </Button>

          {/* Login link */}
          <p className="text-muted-foreground text-center text-sm">
            Đã có tài khoản?{' '}
            <Link
              href="/login"
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
