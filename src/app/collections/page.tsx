'use client'

import Image from 'next/image'
import Link from 'next/link'
import Header from '@/components/Header'
import { useSearchParams } from 'next/navigation'
import { useRef, useState, useEffect } from 'react'

const images = [
  '/logo/Griid_Brand_Logo_Toolkit/IG_Feed_WH/Griid_IG_Feed_Left_WH.png',
  '/logo/Griid_Brand_Logo_Toolkit/IG_Feed_WH/Griid_IG_Feed_Center_WH.png',
  '/logo/Griid_Brand_Logo_Toolkit/IG_Feed_WH/Griid_IG_Feed_Right_WH.png',
]

const sections = ['Dress','Outer','Top','Bottom','Acc','Craft','Objet','Jewelry','ETC']

export default function CollectionsPage() {
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
        <h1 className="text-3xl font-semibold text-gray-900 text-center mb-16">
          {designerName}
        </h1>

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
  const scrollRef = useRef<HTMLDivElement | null>(null)

  if (images.length === 0) return null

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
      <h2 className="text-2xl font-medium text-gray-800 mb-6">
        {title}
      </h2>

      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="
            flex gap-6 
            overflow-x-auto 
            scroll-smooth 
            pb-2
            scrollbar-hide
        "
      >
        {infiniteImages.map((src, idx) => (
          <Link
            key={idx}
            href={`/product/${title}-${idx}`}
            className="shrink-0 block"
            style={{ width: getCardWidth() }}
          >
<<<<<<< HEAD
            <div
              className="
                relative
                bg-white
                rounded-none
                shadow-md
                overflow-hidden

                transition-all duration-200
                hover:scale-[1.02]
                hover:shadow-lg
              "
              style={{ aspectRatio: '2 / 3' }}
            >
=======
            <div className="relative w-64 h-64 rounded-none overflow-hidden bg-gray-100 shadow-sm hover:shadow-md transition">
>>>>>>> 27f4b94e5b41ab0d585c09b4c4ad6ce7fbb9136f
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
