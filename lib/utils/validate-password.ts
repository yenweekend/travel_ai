import { PasswordRequirement } from '@/types/auth'

export const validatePassword = (password: string): PasswordRequirement[] => {
  return [
    {
      label: 'At least 8 characters',
      regex: /.{8,}/,
      match: /.{8,}/.test(password),
    },
    {
      label: 'Contains an uppercase letter',
      regex: /[A-Z]/,
      match: /[A-Z]/.test(password),
    },
    {
      label: 'Contains a lowercase letter',
      regex: /[a-z]/,
      match: /[a-z]/.test(password),
    },
    {
      label: 'Contains a number',
      regex: /[0-9]/,
      match: /[0-9]/.test(password),
    },
  ]
}
