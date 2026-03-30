import { z } from 'zod'
import { ValidationMessages } from '@/lib/utils/validation'

export const emailSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, ValidationMessages.require('Email'))
    .max(50, ValidationMessages.maxLength('Email', 50))
    .pipe(
      z.email({
        message: ValidationMessages.email,
      })
    ),
})

export type EmailFormData = z.infer<typeof emailSchema>

export const loginSchema = z.object({
  ...emailSchema.shape,
  password: z
    .string()
    .trim()
    .min(1, ValidationMessages.require('Password'))
    .min(6, ValidationMessages.minLength('Password', 6))
    .max(50, ValidationMessages.maxLength('Password', 50)),
})

export type LoginFormData = z.infer<typeof loginSchema>

export const registerSchema = z
  .object({
    ...emailSchema.shape,
    full_name: z
      .string()
      .trim()
      .min(1, ValidationMessages.require('Họ và tên'))
      .min(6, ValidationMessages.minLength('Họ và tên', 6))
      .max(100, ValidationMessages.maxLength('Họ và tên', 100)),
    password: z
      .string()
      .trim()
      .min(1, ValidationMessages.require('Mật khẩu'))
      .min(6, ValidationMessages.minLength('Mật khẩu', 6))
      .max(50, ValidationMessages.maxLength('Mật khẩu', 50)),
    password_confirm: z
      .string()
      .trim()
      .min(1, ValidationMessages.require('Mật khẩu xác nhận')),
  })
  .refine((data) => data.password === data.password_confirm, {
    message: 'Mật khẩu không khớp',
    path: ['password_confirm'],
  })

export type RegisterFormData = z.infer<typeof registerSchema>

export const resetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(1, ValidationMessages.require('Password'))
      .min(6, ValidationMessages.minLength('Password', 6))
      .max(50, ValidationMessages.maxLength('Password', 50)),
    password_confirm: z.string().min(1, ValidationMessages.require('Password')),
  })
  .refine((data) => data.password === data.password_confirm, {
    message: 'Password không khớp',
    path: ['password_confirm'],
  })

export type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>
