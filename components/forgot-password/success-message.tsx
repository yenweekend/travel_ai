import { CheckCircle } from 'lucide-react'
import React from 'react'
import Link from 'next/link'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

interface SuccessMessageProps {
  title: string
  description?: React.ReactNode
  subDescription?: string
  link?: { title: string; href: string }
}

export const SuccessMessage = ({
  title,
  description,
  subDescription,
  link,
}: SuccessMessageProps) => {
  return (
    <Card>
      <CardContent>
        <div className="space-y-6 text-center">
          <div className="flex justify-center">
            <CheckCircle className="h-16 w-16 text-green-600" />
          </div>

          <div className="space-y-2">
            <h2 className="text-foreground text-2xl font-bold">{title}</h2>
            <p className="text-muted-foreground">{description}</p>
            <p className="text-muted-foreground text-sm">{subDescription}</p>
          </div>

          <Button asChild className="w-full">
            <Link href={link?.href || '/'}>{link?.title}</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
