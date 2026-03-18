import { Database } from '@/types/database'

export interface PasswordRequirement {
  label: string
  regex: RegExp
  match: boolean
}

export type UserRole = Database['public']['Enums']['user_role']
