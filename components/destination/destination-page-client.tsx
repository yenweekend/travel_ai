'use client'

import type { Destination } from '@/types/destination'
import { motion } from 'framer-motion'
import { MapPin, Star, SlidersHorizontal } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { DESTINATION_TYPES } from '@/lib/constants/common'
import Image from 'next/image'
import Link from 'next/link'
import { formatPrice } from '@/lib/utils/common'
import { SearchInput } from '../common/search-input'
import { useRouter, useSearchParams } from 'next/navigation'

interface DestinationProps {
  destinations: Destination[]
}

export const DestinationPageClient = ({ destinations }: DestinationProps) => {
  const router = useRouter()
  const searchParams = useSearchParams()

  const keyword = searchParams.get('keyword') || ''

  const selectedType = searchParams.get('type') || 'all'

  const handleSearchChange = (value: string) => {
    const params = new URLSearchParams(searchParams)
    if (value) {
      params.set('keyword', value)
    } else {
      params.delete('keyword')
    }
    router.push(`?${params.toString()}`)
  }

  const handleSelectType = (value: string) => {
    const params = new URLSearchParams(searchParams)
    if (value) {
      params.set('type', value)
    } else {
      params.delete('type')
    }
    router.push(`?${params.toString()}`)
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="mb-2 text-3xl font-bold lg:text-4xl">
          Khám phá <span className="text-gradient">điểm đến</span>
        </h1>
        <p className="text-muted-foreground">
          Tìm kiếm và khám phá những địa điểm du lịch tuyệt vời tại Việt Nam
        </p>
      </div>

      {/* Search & Filters */}
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

        {/* Type filters */}
        <div className="flex flex-wrap gap-2">
          <Badge
            variant={selectedType === '' ? 'default' : 'outline'}
            className="cursor-pointer"
            onClick={() => handleSelectType('')}
          >
            Tất cả
          </Badge>
          {DESTINATION_TYPES.map((type) => (
            <Badge
              key={type.value}
              variant={selectedType === type.value ? 'default' : 'outline'}
              className="cursor-pointer"
              onClick={() => handleSelectType(type.value)}
            >
              {type.icon} {type.label}
            </Badge>
          ))}
        </div>
      </div>

      <div className="text-muted-foreground mb-4 text-sm">
        {999} điểm đến được tìm thấy
      </div>
      {destinations.length > 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {destinations.map((dest, index) => (
            <motion.div
              key={dest.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Link href={`/destinations/${dest.slug}`}>
                <div className="group border-border card-hover overflow-hidden rounded-2xl border bg-white">
                  <div className="relative h-52 overflow-hidden">
                    {dest.cover_image ? (
                      <Image
                        src={dest.cover_image}
                        alt={dest.name}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    ) : (
                      <div className="bg-muted flex h-full w-full items-center justify-center">
                        <MapPin className="text-muted-foreground h-8 w-8" />
                      </div>
                    )}
                    <div className="absolute top-3 left-3">
                      <Badge variant="accent" className="backdrop-blur-sm">
                        {
                          DESTINATION_TYPES.find(
                            (t) => t.value === dest.destination_type
                          )?.icon
                        }{' '}
                        {
                          DESTINATION_TYPES.find(
                            (t) => t.value === dest.destination_type
                          )?.label
                        }
                      </Badge>
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="text-muted-foreground mb-1 flex items-center gap-1 text-sm">
                      <MapPin className="h-3.5 w-3.5" />
                      {dest.province}
                    </div>
                    <h3 className="group-hover:text-primary mb-1 text-lg font-semibold transition-colors">
                      {dest.name}
                    </h3>
                    <p className="text-muted-foreground mb-3 line-clamp-2 text-sm">
                      {dest.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        <Star className="fill-warning text-warning h-4 w-4" />
                        <span className="text-sm font-semibold">
                          {Number(dest.avg_rating).toFixed(1)}
                        </span>
                        <span className="text-muted-foreground text-xs">
                          ({dest.review_count})
                        </span>
                      </div>
                      <span className="text-primary text-sm font-medium">
                        Từ {formatPrice(dest.min_price ?? 0)}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <div className="py-16 text-center">
          <MapPin className="text-muted-foreground mx-auto mb-4 h-12 w-12" />
          <h3 className="mb-2 text-lg font-semibold">Không tìm thấy kết quả</h3>
          <p className="text-muted-foreground">
            Thử thay đổi từ khóa hoặc bộ lọc khác
          </p>
        </div>
      )}
    </div>
  )
}
