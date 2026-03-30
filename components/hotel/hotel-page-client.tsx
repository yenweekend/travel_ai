'use client'

import { motion } from 'framer-motion'
import { Star, MapPin, SlidersHorizontal } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import Image from 'next/image'
import Link from 'next/link'
import { formatPrice } from '@/lib/utils/common'
import { Hotel } from '@/types/hotel'
import { useRouter, useSearchParams } from 'next/navigation'
import { SearchInput } from '../common/search-input'

interface HotelPageClientProps {
  hotels: Hotel[]
}

export const HotelPageClient = ({ hotels }: HotelPageClientProps) => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const keyword = searchParams.get('keyword') || ''

  const selectedStar = Number(searchParams.get('starRating') || null)

  const handleSelectRating = (value: number | null) => {
    const params = new URLSearchParams(searchParams)
    if (value) {
      params.set('starRating', value.toString())
    } else {
      params.delete('starRating')
    }
    router.push(`?${params.toString()}`)
  }

  const handleSearchChange = (value: string) => {
    const params = new URLSearchParams(searchParams)
    if (value) {
      params.set('keyword', value)
    } else {
      params.delete('keyword')
    }
    router.push(`?${params.toString()}`)
  }
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="mb-2 text-3xl font-bold lg:text-4xl">
          Khách sạn <span className="text-gradient">chất lượng</span>
        </h1>
        <p className="text-muted-foreground">
          Tìm nơi lưu trú hoàn hảo cho chuyến đi của bạn
        </p>
      </div>

      {/* Filters */}
      <div className="border-border mb-8 space-y-4 rounded-2xl border bg-white p-4">
        <div className="flex gap-3">
          <SearchInput
            className="flex-1"
            placeholder="Tìm theo tên, tỉnh thành..."
            value={keyword}
            onChange={handleSearchChange}
          />
          <Button variant="outline" className="gap-2">
            <SlidersHorizontal className="h-4 w-4" />
            Bộ lọc
          </Button>
        </div>
        <div className="flex flex-wrap gap-2">
          <Badge
            variant={selectedStar === null ? 'default' : 'outline'}
            className="cursor-pointer"
            onClick={() => handleSelectRating(null)}
          >
            Tất cả
          </Badge>
          {[3, 4, 5].map((s) => (
            <Badge
              key={s}
              variant={selectedStar === s ? 'default' : 'outline'}
              className="cursor-pointer"
              onClick={() => handleSelectRating(s)}
            >
              {s} sao ⭐
            </Badge>
          ))}
        </div>
      </div>

      <div className="text-muted-foreground mb-4 text-sm">
        {hotels.length} khách sạn được tìm thấy
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {hotels.map((hotel, index) => (
          <motion.div
            key={hotel.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <Link href={`/hotels/${hotel.slug}`}>
              <div className="group border-border card-hover overflow-hidden rounded-2xl border bg-white">
                <div className="relative h-56 overflow-hidden">
                  {hotel.cover_image ? (
                    <Image
                      src={hotel.cover_image}
                      alt={hotel.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  ) : (
                    <div className="bg-muted flex h-full w-full items-center justify-center">
                      <MapPin className="text-muted-foreground h-8 w-8" />
                    </div>
                  )}
                  <div className="absolute top-3 right-3 flex items-center gap-1 rounded-lg bg-white/90 px-2 py-1 backdrop-blur-sm">
                    <Star className="fill-warning text-warning h-3.5 w-3.5" />
                    <span className="text-sm font-semibold">
                      {Number(hotel.avg_rating).toFixed(1)}
                    </span>
                  </div>
                </div>
                <div className="p-5">
                  <div className="mb-2 flex items-center gap-2">
                    <div className="flex">
                      {Array.from({ length: hotel.star_rating || 0 }).map(
                        (_, i) => (
                          <Star
                            key={i}
                            className="fill-warning text-warning h-3.5 w-3.5"
                          />
                        )
                      )}
                    </div>
                    <span className="text-muted-foreground text-xs">
                      {hotel.review_count} đánh giá
                    </span>
                  </div>
                  <h3 className="group-hover:text-primary mb-1 text-lg font-semibold transition-colors">
                    {hotel.name}
                  </h3>
                  <div className="text-muted-foreground mb-2 flex items-center gap-1 text-sm">
                    <MapPin className="h-3.5 w-3.5" />
                    {hotel.province}
                  </div>
                  <p className="text-muted-foreground mb-3 line-clamp-1 text-sm">
                    {hotel.description}
                  </p>
                  <div className="border-border flex items-center justify-between border-t pt-3">
                    <div>
                      <span className="text-primary text-lg font-bold">
                        {formatPrice(Number(hotel.min_price))}
                      </span>
                      <span className="text-muted-foreground text-xs">
                        /đêm
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
