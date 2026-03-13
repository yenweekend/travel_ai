import { z } from 'zod'
import { ValidationMessages } from '../utils/validation'

export const authSchema = z.object({
  email: z
    .string()
    .min(1, ValidationMessages.require('Email'))
    .max(50, ValidationMessages.maxLength('Email', 50))
    .pipe(
      z.email({
        message: ValidationMessages.email,
      })
    ),
  password: z
    .string()
    .min(1, ValidationMessages.require('Mật khẩu'))
    .min(6, ValidationMessages.minLength('Mật khẩu', 6))
    .max(50, ValidationMessages.maxLength('Mật khẩu', 50)),
})

export type AuthFormData = z.infer<typeof authSchema>

export const registerSchema = z
  .object({
    email: z
      .string()
      .min(1, ValidationMessages.require('Email'))
      .max(50, ValidationMessages.maxLength('Email', 50))
      .pipe(
        z.email({
          message: ValidationMessages.email,
        })
      ),
    password: z
      .string()
      .min(1, ValidationMessages.require('Mật khẩu'))
      .min(6, ValidationMessages.minLength('Mật khẩu', 6))
      .max(50, ValidationMessages.maxLength('Mật khẩu', 50)),
    confirmPassword: z.string().min(1, ValidationMessages.require('Mật khẩu')),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Mật khẩu không khớp',
    path: ['confirmPassword'],
  })

export type RegisterFormData = z.infer<typeof registerSchema>
