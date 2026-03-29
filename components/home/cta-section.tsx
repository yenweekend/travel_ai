'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Sparkles, ArrowRight, Bot, Calendar, Heart } from 'lucide-react'
import { Button } from '@/components/ui/button'

export const CtaSection = () => {
  return (
    <section className="px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="relative mx-auto max-w-5xl overflow-hidden rounded-3xl"
      >
        {/* Background */}
        <div className="from-primary via-primary to-secondary absolute inset-0 bg-linear-to-r" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iYSIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVHJhbnNmb3JtPSJyb3RhdGUoNDUpIj48cGF0aCBkPSJNMCAyMGgyMHYyMEgyMHoiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4wNSkiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjYSkiLz48L3N2Zz4=')] opacity-30" />

        <div className="relative z-10 px-8 py-16 text-center text-white lg:px-16 lg:py-20">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-1.5 text-sm font-medium backdrop-blur-sm">
            <Sparkles className="h-4 w-4" />
            Tính năng AI thông minh
          </div>

          <h2 className="mb-4 text-3xl leading-tight font-bold lg:text-5xl">
            Để AI lên kế hoạch
            <br />
            chuyến đi hoàn hảo cho bạn
          </h2>

          <p className="mx-auto mb-8 max-w-2xl text-lg text-white/80">
            Chỉ cần mô tả ước mơ du lịch của bạn, AI sẽ tạo lịch trình chi tiết
            từng ngày kèm gợi ý ẩm thực, chi phí ước tính và mẹo du lịch.
          </p>

          {/* Features */}
          <div className="mx-auto mb-10 grid max-w-2xl grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="flex flex-col items-center gap-2 rounded-xl bg-white/10 p-4 backdrop-blur-sm">
              <Bot className="h-8 w-8" />
              <span className="text-sm font-medium">AI thông minh</span>
            </div>
            <div className="flex flex-col items-center gap-2 rounded-xl bg-white/10 p-4 backdrop-blur-sm">
              <Calendar className="h-8 w-8" />
              <span className="text-sm font-medium">Chi tiết từng ngày</span>
            </div>
            <div className="flex flex-col items-center gap-2 rounded-xl bg-white/10 p-4 backdrop-blur-sm">
              <Heart className="h-8 w-8" />
              <span className="text-sm font-medium">Lưu lịch trình</span>
            </div>
          </div>

          <Button
            size="xl"
            className="text-primary bg-white shadow-xl hover:bg-white/90"
            asChild
          >
            <Link href="/ai-planner">
              Thử ngay AI Planner
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </motion.div>
    </section>
  )
}
