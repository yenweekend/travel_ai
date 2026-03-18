'use client'

import { FileQuestion, Home, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="bg-muted mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full">
            <FileQuestion className="text-muted-foreground h-8 w-8" />
          </div>
          <CardTitle className="text-2xl">Page Not Found</CardTitle>
          <CardDescription>
            The page you’re looking for may have been moved or no longer exists.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="bg-muted/50 rounded-lg p-6 text-center">
            <p className="text-muted-foreground text-6xl font-bold">404</p>
          </div>

          <div className="text-muted-foreground space-y-2 text-sm">
            <p>Here are a few things you can try:</p>
            <ul className="ml-4 list-disc space-y-1">
              <li>Check if the URL was entered correctly</li>
              <li>Go back to the homepage and explore destinations</li>
              <li>Return to the previous page and try again</li>
            </ul>
          </div>
        </CardContent>

        <CardFooter className="flex flex-col gap-2 sm:flex-row">
          <Button asChild className="w-full sm:flex-1" variant="default">
            <Link href="/">
              <Home className="mr-2 h-4 w-4" />
              Back to Home
            </Link>
          </Button>
          <Button
            type="button"
            className="w-full sm:flex-1"
            variant="outline"
            onClick={() => window.history.back()}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Go Back
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
