import { getTours } from '@/components/tour/actions/tour-actions'
import { notFound } from 'next/navigation'
import { TourPageClient } from '@/components/tour/tour-page-client'

interface PageProps {
  searchParams: Promise<{
    keyword?: string
    starRating?: number
    province?: string
    limit?: number
    offset?: number
    featured?: boolean
  }>
}

export default async function TourPage({ searchParams }: PageProps) {
  const params = await searchParams

  const results = await getTours({
    ...params,
    search: params.keyword,
  })

  if (!results.success) {
    notFound()
  }

  return <TourPageClient tours={results.success ? results.data.tours : []} />
}
