import { getHotelBySlug } from '@/components/hotel/actions/hotel-actions'
import { HotelDetailPageClient } from '@/components/hotel/hotel-detail-page-client'
import { notFound } from 'next/navigation'

interface PageProps {
  params: Promise<{ slug: string }>
}

export default async function HotelDetailPage({ params }: PageProps) {
  const { slug } = await params

  const result = await getHotelBySlug(slug)

  if (!result.success) {
    notFound()
  }

  return <HotelDetailPageClient hotel={result.data} />
}
