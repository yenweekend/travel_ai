'use client'

import { motion } from 'framer-motion'
import { Star, MapPin, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { formatPrice } from '@/lib/utils/common'
import { Hotel } from '@/types/hotel'

interface FeaturedHotelsProps {
  hotels: Hotel[]
}

export const FeaturedHotels = ({ hotels }: FeaturedHotelsProps) => {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
      <div className="mb-10 flex items-end justify-between">
        <div>
          <h2 className="mb-2 text-3xl font-bold lg:text-4xl">
            Khách sạn <span className="text-gradient">hàng đầu</span>
          </h2>
          <p className="text-muted-foreground">
            Những nơi lưu trú sang trọng, chất lượng cao
          </p>
        </div>
        <Link
          href="/hotels"
          className="text-primary hidden items-center gap-1 font-medium hover:underline sm:flex"
        >
          Xem tất cả
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
      >
        {hotels.map((hotel, index: number) => (
          <motion.div
            key={hotel.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            viewport={{ once: true }}
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
                      {hotel.avg_rating ?? 0}
                    </span>
                  </div>
                </div>
                <div className="p-5">
                  <div className="mb-2 flex items-center gap-2">
                    <div className="flex">
                      {Array.from({ length: hotel.star_rating || 0 }).map(
                        (_, i: number) => (
                          <Star
                            key={i}
                            className="fill-warning text-warning h-3.5 w-3.5"
                          />
                        )
                      )}
                    </div>
                    <span className="text-muted-foreground text-xs">
                      {hotel.review_count ?? 0} đánh giá
                    </span>
                  </div>
                  <h3 className="group-hover:text-primary mb-1 text-lg font-semibold transition-colors">
                    {hotel.name}
                  </h3>
                  <div className="text-muted-foreground mb-4 flex items-center gap-1 text-sm">
                    <MapPin className="h-3.5 w-3.5" />
                    {hotel.province}
                  </div>
                  <div className="border-border flex items-center justify-between border-t pt-3">
                    <div>
                      <span className="text-primary text-lg font-bold">
                        {formatPrice(hotel.min_price || 0)}
                      </span>
                      <span className="text-muted-foreground text-xs">
                        {' '}
                        /đêm
                      </span>
                    </div>
                    <span className="text-primary text-sm font-medium">
                      Xem chi tiết →
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}
