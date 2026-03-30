'use client'

import { motion } from 'framer-motion'
import {
  Star,
  MapPin,
  Clock,
  Users,
  SlidersHorizontal,
  CalendarDays,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import Image from 'next/image'
import Link from 'next/link'
import { formatPrice } from '@/lib/utils/common'
import { Tour } from '@/types/tour'
import { useRouter, useSearchParams } from 'next/navigation'
import { SearchInput } from '../common/search-input'

interface TourPageClientProps {
  tours: Tour[]
}

export const TourPageClient = ({ tours }: TourPageClientProps) => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const keyword = searchParams.get('keyword') || ''

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
          Tour du lịch <span className="text-gradient">hấp dẫn</span>
        </h1>
        <p className="text-muted-foreground">
          Hành trình được thiết kế bởi chuyên gia, trải nghiệm không giới hạn
        </p>
      </div>

      {/* Filters */}
      <div className="border-border mb-8 rounded-2xl border bg-white p-4">
        <div className="flex gap-3">
          <SearchInput
            className="flex-1"
            placeholder="Tìm tour theo tên..."
            value={keyword}
            onChange={handleSearchChange}
          />
          <Button variant="outline" className="gap-2">
            <SlidersHorizontal className="h-4 w-4" />
            Bộ lọc
          </Button>
        </div>
      </div>

      <div className="text-muted-foreground mb-4 text-sm">
        {tours.length}
        tour được tìm thấy
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {tours.map((tour, index) => (
          <motion.div
            key={tour.id as string}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <Link href={`/tours/${tour.slug}`}>
              <div className="group border-border card-hover overflow-hidden rounded-2xl border bg-white">
                <div className="relative h-56 overflow-hidden">
                  {tour.cover_image ? (
                    <Image
                      src={tour.cover_image as string}
                      alt={tour.name as string}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  ) : (
                    <div className="bg-muted flex h-full w-full items-center justify-center">
                      <MapPin className="text-muted-foreground h-8 w-8" />
                    </div>
                  )}
                  <div className="absolute top-3 left-3">
                    <Badge variant="warning">
                      {tour.duration_days as number}N
                      {(tour.duration_days as number) - 1}Đ
                    </Badge>
                  </div>
                  <div className="absolute top-3 right-3 flex items-center gap-1 rounded-lg bg-white/90 px-2 py-1 backdrop-blur-sm">
                    <Star className="fill-warning text-warning h-3.5 w-3.5" />
                    <span className="text-sm font-semibold">
                      {Number(tour.avg_rating).toFixed(1)}
                    </span>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="group-hover:text-primary mb-1 text-lg font-semibold transition-colors">
                    {tour.name as string}
                  </h3>
                  <p className="text-muted-foreground mb-3 line-clamp-2 text-sm">
                    {tour.description as string}
                  </p>
                  <div className="mb-4 flex flex-wrap gap-2">
                    <Badge variant="muted" className="gap-1">
                      <Clock className="h-3 w-3" />{' '}
                      {tour.duration_days as number} ngày
                    </Badge>
                    <Badge variant="muted" className="gap-1">
                      <Users className="h-3 w-3" /> Max{' '}
                      {(tour.max_group_size as number) || 20}
                    </Badge>
                  </div>
                  <div className="border-border flex items-center justify-between border-t pt-3">
                    <div>
                      <span className="text-primary text-lg font-bold">
                        {formatPrice(Number(tour.price))}
                      </span>
                      <span className="text-muted-foreground text-xs">
                        {' '}
                        /người
                      </span>
                    </div>
                    <span className="text-muted-foreground flex items-center gap-1 text-xs">
                      <CalendarDays className="h-3 w-3" />
                      {tour.review_count as number} đánh giá
                    </span>
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
