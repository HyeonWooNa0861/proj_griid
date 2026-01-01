'use client'

import Image from 'next/image'
import Link from 'next/link'
import Header from '@/components/Header'
import { useSearchParams } from 'next/navigation'
import { useState, useEffect } from 'react'

const images = [
  '/logo/Griid_Brand_Logo_Toolkit/IG_Feed_WH/Griid_IG_Feed_Left_WH.png',
  '/logo/Griid_Brand_Logo_Toolkit/IG_Feed_WH/Griid_IG_Feed_Center_WH.png',
  '/logo/Griid_Brand_Logo_Toolkit/IG_Feed_WH/Griid_IG_Feed_Right_WH.png',
  // 스크롤 확인하려고 반복 이미지
  '/logo/Griid_Brand_Logo_Toolkit/IG_Feed_WH/Griid_IG_Feed_Left_WH.png',
  '/logo/Griid_Brand_Logo_Toolkit/IG_Feed_WH/Griid_IG_Feed_Center_WH.png',
  '/logo/Griid_Brand_Logo_Toolkit/IG_Feed_WH/Griid_IG_Feed_Right_WH.png',
]

const sections = [
  'Dress',
  'Outer',
  'Top',
  'Bottom',
  'Acc',
  'Craft',
  'Objet',
  'Jewelry',
  'ETC',
]

export default function DesignerPage() {
  const searchParams = useSearchParams()
  const designerName = searchParams.get('designer') ?? 'Designer A'

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
        {/* 디자이너 이름 */}
        <h1 className="text-3xl font-semibold text-gray-900 text-center mb-16">
          {designerName}
        </h1>

        {/* 카테고리 섹션 */}
        <div className="space-y-20">
          {sections.map((section) => (
            <CollectionSection
              key={section}
              title={section}
              images={images}
              getCardWidth={getCardWidth}
            />
          ))}
        </div>
      </main>
    </div>
  )
}

/* ---------------- 섹션 컴포넌트 ---------------- */

function CollectionSection({
  title,
  images,
  getCardWidth,
}: {
  title: string
  images: string[]
  getCardWidth: () => string
}) {
  if (images.length === 0) {
    return (
      <section>
        <h2 className="text-2xl font-medium text-gray-800 mb-4">
          {title}
        </h2>
        <p className="text-sm text-gray-400 italic">
          표시할 항목이 없습니다
        </p>
      </section>
    )
  }

  return (
    <section>
      <h2 className="text-2xl font-medium text-gray-800 mb-6">
        {title}
      </h2>

      <div className="flex gap-6 overflow-x-auto scroll-smooth pb-2 scrollbar-hide">
        {images.map((src, idx) => (
          <Link
            key={idx}
            href={`/product/${title}-${idx}`}
            className="shrink-0 block"
            style={{ width: getCardWidth() }}
          >
            <div
              className="
                relative
                bg-white
                shadow-md
                overflow-hidden
                transition-all duration-200
                hover:scale-[1.02]
                hover:shadow-lg
              "
              style={{ aspectRatio: '2 / 3' }}
            >
              <Image
                src={src}
                alt=""
                fill
                className="object-cover"
                sizes="
                  (max-width: 768px) 100vw,
                  (max-width: 1024px) 50vw,
                  33vw
                "
              />
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
