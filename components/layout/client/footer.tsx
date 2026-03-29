import Link from 'next/link'
import { MapPin, Mail, Phone, Globe, Video } from 'lucide-react'
import { APP_NAME, NAV_ITEMS } from '@/lib/constants/common'

export default function Footer() {
  return (
    <footer className="bg-foreground text-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="bg-primary flex h-9 w-9 items-center justify-center rounded-xl">
                <MapPin className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold">{APP_NAME}</span>
            </Link>
            <p className="text-sm leading-relaxed text-white/60">
              Nền tảng du lịch thông minh giúp bạn khám phá vẻ đẹp Việt Nam. Tìm
              kiếm điểm đến, khách sạn và nhận gợi ý lịch trình từ AI.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4 font-semibold">Khám phá</h3>
            <ul className="space-y-2">
              {NAV_ITEMS.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-white/60 transition-colors hover:text-white"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="mb-4 font-semibold">Hỗ trợ</h3>
            <ul className="space-y-2">
              <li>
                <span className="text-sm text-white/60">
                  Hướng dẫn đặt tour
                </span>
              </li>
              <li>
                <span className="text-sm text-white/60">
                  Câu hỏi thường gặp
                </span>
              </li>
              <li>
                <span className="text-sm text-white/60">
                  Chính sách bảo mật
                </span>
              </li>
              <li>
                <span className="text-sm text-white/60">
                  Điều khoản sử dụng
                </span>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-4 font-semibold">Liên hệ</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-sm text-white/60">
                <Mail className="h-4 w-4 shrink-0" />
                contact@viettravel.vn
              </li>
              <li className="flex items-center gap-2 text-sm text-white/60">
                <Phone className="h-4 w-4 shrink-0" />
                1900 1234
              </li>
              <li className="flex items-center gap-2 text-sm text-white/60">
                <MapPin className="h-4 w-4 shrink-0" />
                Hà Nội, Việt Nam
              </li>
            </ul>
            <div className="mt-4 flex gap-3">
              <div className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-white/20">
                <Globe className="h-4 w-4" />
              </div>
              <div className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-white/20">
                <Video className="h-4 w-4" />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-white/10 pt-8 text-center text-sm text-white/40">
          © {new Date().getFullYear()} {APP_NAME}. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
