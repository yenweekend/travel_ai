import { getHotels } from '@/components/hotel/actions/hotel-actions'
import { HotelPageClient } from '@/components/hotel/hotel-page-client'
import { notFound } from 'next/navigation'

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

export default async function DestinationsPage({ searchParams }: PageProps) {
  const params = await searchParams

  const results = await getHotels({
    ...params,
    search: params.keyword,
  })

  if (!results.success) {
    notFound()
  }

  return <HotelPageClient hotels={results.success ? results.data.hotels : []} />
}
