import { getDestinations } from '@/components/destination/actions/destination-actions'
import { DestinationPageClient } from '@/components/destination/destination-page-client'

interface PageProps {
  searchParams: Promise<{
    keyword?: string
    type?: string
    region?: string
    limit?: number
    offset?: number
    featured?: boolean
  }>
}

export default async function DestinationsPage({ searchParams }: PageProps) {
  const params = await searchParams

  const results = await getDestinations({
    ...params,
    search: params.keyword,
  })

  return (
    <DestinationPageClient
      destinations={results.success ? results.data.destinations : []}
    />
  )
}
