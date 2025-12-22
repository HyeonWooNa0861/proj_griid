'use client'

import Image from 'next/image'
import Link from 'next/link'
import Header from '@/components/Header'
import { useState, useEffect, useRef } from 'react'

const images = [
  '/logo/Griid_Brand_Logo_Toolkit/IG_Feed_WH/Griid_IG_Feed_Left_WH.png',
  '/logo/Griid_Brand_Logo_Toolkit/IG_Feed_WH/Griid_IG_Feed_Center_WH.png',
  '/logo/Griid_Brand_Logo_Toolkit/IG_Feed_WH/Griid_IG_Feed_Right_WH.png',
]

const sections = [
  { key: 'active', title: 'Active Bids', items: images },
  { key: 'completed', title: 'Completed Bids', items: [] },
  { key: 'products', title: 'My Products', items: images },
  { key: 'watchlist', title: 'Watchlist', items: [] },
]

export default function MyLoungePage() {
  const [cardsPerView, setCardsPerView] = useState(3)

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) setCardsPerView(1)
      else if (window.innerWidth < 1024) setCardsPerView(2)
      else setCardsPerView(3)
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const getCardWidth = () => {
    const gap = 24 * (cardsPerView - 1)
    return `calc((100% - ${gap}px) / ${cardsPerView})`
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20 pb-16">
      <Header />

      <main className="max-w-7xl mx-auto px-6">
        {/* 타이틀 */}
        <div className="flex items-center justify-between mb-16">
          <h1 className="text-3xl font-semibold text-gray-900">
            My Lounge
          </h1>

          <Link
            href="/my_lounge/settings"
            className="px-4 py-2 text-sm border border-gray-300 text-gray-600 hover:bg-gray-100 transition"
          >
            Settings
          </Link>
        </div>

        {/* 섹션 */}
        <div className="space-y-20">
          {sections.map((section) => (
            <LoungeSection
              key={section.key}
              title={section.title}
              images={section.items}
              getCardWidth={getCardWidth}
              showAddButton={section.key === 'products'}
            />
          ))}
        </div>
      </main>
    </div>
  )
}

/* ---------------- 섹션 컴포넌트 ---------------- */
function LoungeSection({
  title,
  images,
  getCardWidth,
  showAddButton,
}: {
  title: string
  images: string[]
  getCardWidth: () => string
  showAddButton?: boolean
}) {
  const scrollRef = useRef<HTMLDivElement | null>(null)

  if (images.length === 0) {
    return (
      <section>
        <h2 className="text-xl font-medium text-gray-800 mb-4">
          {title}
        </h2>
        <p className="text-sm text-gray-400 italic">
          자동으로 숨김처리됨
        </p>
      </section>
    )
  }

  const infiniteImages = [...images, ...images, ...images]

  const handleScroll = () => {
    if (!scrollRef.current) return
    const el = scrollRef.current
    const maxScroll = el.scrollWidth - el.clientWidth
    const current = el.scrollLeft

    if (current <= 10 || current >= maxScroll - 10) {
      el.scrollLeft = maxScroll / 3
    }
  }

  return (
    <section>
      {/* 제목 + Add */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-medium text-gray-800">
          {title}
        </h2>

        {showAddButton && (
          <Link
            href="/my_lounge/add"
            className="px-3 py-1.5 text-sm border border-gray-300 text-gray-600 hover:bg-gray-100 transition"
          >
            + Add
          </Link>
        )}
      </div>

      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="flex gap-6 overflow-x-auto scroll-smooth pb-2 scrollbar-hide"
      >
        {infiniteImages.map((src, idx) => (
          <Link
            key={idx}
            href={`/product/${title}-${idx}`}
            className="shrink-0 block"
            style={{ width: getCardWidth() }}
          >
            <div
              className="relative bg-white shadow-md overflow-hidden transition-all duration-200 hover:scale-[1.02] hover:shadow-lg"
              style={{ aspectRatio: '2 / 3' }}
            >
              <Image
                src={src}
                alt=""
                fill
                className="object-cover"
              />
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
