'use client'

import { Check } from 'lucide-react'
import type { PasswordRequirement } from '@/types/auth'

interface PasswordRequirementsProps {
  requirements: PasswordRequirement[]
}

export const PasswordRequirements = ({
  requirements,
}: PasswordRequirementsProps) => {
  return (
    <div className="mt-2 space-y-1">
      <p className="text-muted-foreground text-sm">Password requirements:</p>
      <ul className="space-y-1">
        {requirements.map((req, index) => (
          <li
            key={index}
            className={`flex items-center gap-2 text-sm ${req.match ? 'text-green-600' : 'text-muted-foreground'}`}
          >
            <Check
              className={`h-4 w-4 ${req.match ? 'opacity-100' : 'opacity-30'}`}
            />
            {req.label}
          </li>
        ))}
      </ul>
    </div>
  )
}
