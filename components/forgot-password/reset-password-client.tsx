'use client'

import { useState } from 'react'

import { resetPasswordSchema } from '@/lib/schema/auth'
import { useToast } from '@/hooks/use-toast-notifications'
import { useFormWithServerAction } from '@/hooks/use-form-with-server-action'
import {
  changePassword,
  signOut,
} from '@/components/forgot-password/actions/forgot-password-actions'

import { FieldGroup } from '@/components/ui/field'
import { Button } from '@/components/ui/button'
import { ControlledInput } from '@/components/ui/controlled-input'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { SuccessMessage } from '@/components/forgot-password/success-message'
import { useWatch } from 'react-hook-form'
import { validatePassword } from '@/lib/utils/validate-password'
import { PasswordRequirements } from '@/components/forgot-password/password-requirements'

export const ResetPasswordClient = () => {
  const [success, setSuccess] = useState(false)
  const { error } = useToast()

  const { form, handleSubmit, isPending } = useFormWithServerAction({
    schema: resetPasswordSchema,
    action: changePassword,
    defaultValues: {
      password: '',
      password_confirm: '',
    },
    onSuccess: async () => {
      await signOut()
      setSuccess(true)
    },
    onError: (errors) => {
      if (errors.root) {
        error(errors.root)
      }
    },
  })

  const password = useWatch({
    control: form.control,
    name: 'password',
  })
  const passwordRequirements = validatePassword(password)
  return success ? (
    <SuccessMessage
      title="Password has been updated"
      description="You can now log in with your new password."
      link={{ title: 'Go to Login', href: '/login' }}
    />
  ) : (
    <Card className="w-full shadow-lg">
      <CardHeader className="space-y-1 text-center">
        <CardTitle className="text-2xl font-bold">Đặt lại mật khẩu</CardTitle>

        <CardDescription>Nhập mật khẩu mới của bạn</CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        <form onSubmit={handleSubmit} className="space-y-4">
          <FieldGroup>
            <ControlledInput
              control={form.control}
              name="password"
              label="New password"
              type="password"
              placeholder="••••••••"
              disabled={isPending}
            />
            {password && (
              <PasswordRequirements requirements={passwordRequirements} />
            )}

            <ControlledInput
              control={form.control}
              name="password_confirm"
              label="Confirm password"
              type="password"
              placeholder="••••••••"
              disabled={isPending}
            />
          </FieldGroup>

          <Button type="submit" className="w-full" disabled={isPending}>
            {isPending ? 'Processing...' : 'Reset password'}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
