'use client'

import { useState } from 'react'

import { emailSchema } from '@/lib/schema/auth'
import { resetPasswordForEmail } from '@/components/forgot-password/actions/forgot-password-actions'
import { useFormWithServerAction } from '@/hooks/use-form-with-server-action'
import { useToast } from '@/hooks/use-toast-notifications'

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
import { SuccessMessage } from '@/components/forgot-password/success-message'
import { useWatch } from 'react-hook-form'

export const ForgotPasswordClient = () => {
  const [success, setSuccess] = useState(false)
  const { error } = useToast()
  const { form, handleSubmit, isPending, canSubmit } = useFormWithServerAction({
    schema: emailSchema,
    action: resetPasswordForEmail,
    defaultValues: {
      email: '',
    },
    onSuccess: () => {
      setSuccess(true)
    },
    onError: (errors) => {
      if (errors.root) {
        error(errors.root)
      }
    },
  })

  const email = useWatch({
    control: form.control,
    name: 'email',
  })

  return success ? (
    <SuccessMessage
      title="Check your email"
      description={
        <>
          We’ve sent a password reset link to{' '}
          <span className="font-medium">{email}</span>.
        </>
      }
      subDescription="If you don’t receive the email, please check your spam folder."
      link={{ title: 'Back to Login', href: '/login' }}
    />
  ) : (
    <Card className="w-full shadow-lg">
      <CardHeader className="space-y-1 text-center">
        <CardTitle className="text-2xl font-bold">Quên mật khẩu</CardTitle>

        <CardDescription>
          Nhập email để nhận link đặt lại mật khẩu
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
          </FieldGroup>

          <Button
            type="submit"
            className="w-full"
            disabled={isPending || !canSubmit}
          >
            {isPending ? 'Processing...' : 'Send email to reset'}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
