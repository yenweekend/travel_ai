import z from 'zod'
import { ValidationMessages } from '@/lib/utils/validation'

export const profileSchema = z.object({
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
  full_name: z
    .string()
    .trim()
    .min(1, ValidationMessages.require('Họ và tên'))
    .min(6, ValidationMessages.minLength('Họ và tên', 6))
    .max(100, ValidationMessages.maxLength('Họ và tên', 100)),
  phone: z
    .string()
    .trim()
    .min(1, ValidationMessages.require('Số điện thoại'))
    .regex(/^0\d{9,10}$/, {
      message: ValidationMessages.phone,
    }),
})

export type ProfileFormData = z.infer<typeof profileSchema>
