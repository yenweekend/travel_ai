'use client'

import { motion } from 'framer-motion'
import { Search, MapPin, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function HeroSection() {
  const [searchQuery, setSearchQuery] = useState('')
  const router = useRouter()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/destinations?q=${encodeURIComponent(searchQuery.trim())}`)
    }
  }

  return (
    <section className="relative flex min-h-[85vh] items-center justify-center overflow-hidden">
      {/* Background gradient */}
      <div className="from-primary/5 via-secondary/5 to-accent/5 absolute inset-0 bg-linear-to-br" />
      <div className="bg-primary/10 absolute top-20 -left-40 h-80 w-80 rounded-full blur-3xl" />
      <div className="bg-secondary/10 absolute -right-40 bottom-20 h-96 w-96 rounded-full blur-3xl" />
      <div className="bg-accent/5 absolute top-1/2 left-1/2 h-150 w-150 -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl" />

      {/* Floating elements */}
      <motion.div
        animate={{ y: [0, -15, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-32 left-[15%] text-5xl"
      >
        🏖️
      </motion.div>
      <motion.div
        animate={{ y: [0, 15, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-40 right-[20%] text-4xl"
      >
        ⛰️
      </motion.div>
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute bottom-40 left-[25%] text-4xl"
      >
        🏛️
      </motion.div>
      <motion.div
        animate={{ y: [0, 12, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute right-[15%] bottom-32 text-5xl"
      >
        🌴
      </motion.div>

      <div className="relative z-10 mx-auto max-w-4xl px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <div className="bg-primary/10 text-primary mb-6 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-medium">
            <Sparkles className="h-4 w-4" />
            Gợi ý lịch trình thông minh bằng AI
          </div>

          <h1 className="mb-6 text-4xl leading-tight font-bold sm:text-5xl lg:text-7xl">
            Khám phá vẻ đẹp <span className="text-gradient">Việt Nam</span>
            <br />
            cùng bạn
          </h1>

          <p className="text-muted-foreground mx-auto mb-10 max-w-2xl text-lg sm:text-xl">
            Tìm kiếm điểm đến hoàn hảo, đặt khách sạn tuyệt vời và để AI lên kế
            hoạch chuyến đi trong mơ cho bạn.
          </p>
        </motion.div>

        {/* Search Bar */}
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          onSubmit={handleSearch}
          className="mx-auto max-w-2xl"
        >
          <div className="shadow-primary/10 border-border flex items-center rounded-2xl border bg-white p-2 shadow-xl">
            <div className="flex flex-1 items-center px-4">
              <MapPin className="text-primary h-5 w-5 shrink-0" />
              <input
                type="text"
                placeholder="Bạn muốn đi đâu? (Đà Nẵng, Phú Quốc, Sapa...)"
                className="placeholder:text-muted-foreground flex-1 bg-transparent px-3 py-3 text-sm outline-none sm:text-base"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button type="submit" size="lg" className="shrink-0 rounded-xl">
              <Search className="mr-2 h-4 w-4" />
              Tìm kiếm
            </Button>
          </div>
        </motion.form>

        {/* Quick filters */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mt-8 flex flex-wrap items-center justify-center gap-3"
        >
          <span className="text-muted-foreground text-sm">Phổ biến:</span>
          {['Đà Nẵng', 'Phú Quốc', 'Hội An', 'Sapa', 'Nha Trang', 'Đà Lạt'].map(
            (place) => (
              <button
                key={place}
                onClick={() => {
                  setSearchQuery(place)
                  router.push(`/destinations?q=${encodeURIComponent(place)}`)
                }}
                className="border-border hover:border-primary hover:text-primary cursor-pointer rounded-full border bg-white px-4 py-1.5 text-sm transition-colors"
              >
                {place}
              </button>
            )
          )}
        </motion.div>
      </div>
    </section>
  )
}
