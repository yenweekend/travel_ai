'use client'

import { motion } from 'framer-motion'
import { MapPin, Star, ArrowRight } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'
import Image from 'next/image'
import { formatPrice } from '@/lib/utils/common'
import { Destination } from '@/types/destination'

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
}

interface FeaturedDestinationsProps {
  destinations: Destination[]
}

export const FeaturedDestinations = ({
  destinations,
}: FeaturedDestinationsProps) => {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
      <div className="mb-10 flex items-end justify-between">
        <div>
          <h2 className="mb-2 text-3xl font-bold lg:text-4xl">
            Điểm đến <span className="text-gradient">nổi bật</span>
          </h2>
          <p className="text-muted-foreground">
            Những địa điểm được yêu thích nhất Việt Nam
          </p>
        </div>
        <Link
          href="/destinations"
          className="text-primary hidden items-center gap-1 font-medium hover:underline sm:flex"
        >
          Xem tất cả
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
      >
        {destinations.map((dest) => (
          <motion.div key={dest.id} variants={item}>
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
                      {dest.destination_type === 'beach'
                        ? '🏖️ Biển'
                        : dest.destination_type === 'mountain'
                          ? '⛰️ Núi'
                          : dest.destination_type === 'culture'
                            ? '🏛️ Văn hóa'
                            : dest.destination_type === 'island'
                              ? '🏝️ Đảo'
                              : dest.destination_type}
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
                        {dest.avg_rating ?? 0}
                      </span>
                      <span className="text-muted-foreground text-xs">
                        ({dest.review_count ?? 0})
                      </span>
                    </div>
                    {dest.min_price !== null && dest.min_price > 0 && (
                      <span className="text-primary text-sm font-medium">
                        Từ {formatPrice(dest.min_price)}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </motion.div>

      <div className="mt-8 text-center sm:hidden">
        <Link
          href="/destinations"
          className="text-primary inline-flex items-center gap-1 font-medium"
        >
          Xem tất cả điểm đến
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </section>
  )
}
