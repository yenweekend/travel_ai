import Link from 'next/link'
import { XCircle } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

export default async function LinkExpiredPage() {
  return (
    <div className="bg-background flex h-full items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center">Brand Logo</div>
        <Card>
          <CardContent>
            <div className="space-y-6 text-center">
              <div className="flex justify-center">
                <XCircle className="h-16 w-16 text-red-600" />
              </div>

              <div className="space-y-2">
                <h2 className="text-foreground text-2xl font-bold">
                  The link has expired.
                </h2>
              </div>

              <Button asChild className="w-full">
                <Link href="/login">Return to login screen</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
