import { Bell } from 'lucide-react'

import { Card } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

export default function Loading() {
  return (
    <div className="container mx-auto max-w-6xl px-6 py-8">
      <div className="mb-8">
        <div className="mb-3 flex items-center gap-3">
          <div className="bg-primary/10 flex h-12 w-12 items-center justify-center rounded-xl">
            <Bell className="text-primary h-6 w-6" />
          </div>
          <div>
            <h1 className="text-foreground text-3xl font-semibold tracking-tight">
              Latest Updates
            </h1>
            <p className="text-muted-foreground mt-0.5 text-sm">
              Stay up to date with the latest travel activities and updates
            </p>
          </div>
        </div>
      </div>

      <Card className="border-border/50 p-5 shadow-sm">
        <div className="flex gap-4">
          <div className="shrink-0">
            <Skeleton className="h-12 w-12 rounded-xl" />
          </div>

          <div className="min-w-0 flex-1">
            <div className="mb-2 flex items-start justify-between gap-3">
              <div className="min-w-0 flex-1 space-y-2">
                <Skeleton className="h-5 w-24" />
                <Skeleton className="h-5 w-3/4" />
              </div>
              <Skeleton className="h-4 w-10" />
            </div>

            <div className="mb-3 space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
            </div>

            <div className="border-border/50 flex items-center gap-2 border-t pt-2">
              <Skeleton className="h-4 w-24" />
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}
