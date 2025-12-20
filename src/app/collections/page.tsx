'use client'

import Image from 'next/image'
import Link from 'next/link'
import Header from '@/components/Header'
import { useSearchParams } from 'next/navigation'
import { useRef } from 'react'

const images = [
  '/logo/Griid_Brand_Logo_Toolkit/IG_Feed_WH/Griid_IG_Feed_Left_WH.png',
  '/logo/Griid_Brand_Logo_Toolkit/IG_Feed_WH/Griid_IG_Feed_Center_WH.png',
  '/logo/Griid_Brand_Logo_Toolkit/IG_Feed_WH/Griid_IG_Feed_Right_WH.png',
]

const sections = ['Dress','Outer','Top','Bottom','Acc','Craft','Objet','Jewelry','ETC']

export default function CollectionsPage() {
  const searchParams = useSearchParams()
  const designerName = searchParams.get('designer') ?? 'Designer A'

  return (
    <div className="min-h-screen bg-gray-50 pt-20 pb-16">
      <Header />

      <main className="max-w-7xl mx-auto px-6">
        
        {/* 디자이너 이름 */}
        <h1 className="text-3xl font-semibold text-gray-900 text-center mb-16">
          {designerName}
        </h1>

        {/* 섹션 리스트 */}
        <div className="space-y-20">
          {sections.map((section) => (
            <CollectionSection
              key={section}
              title={section}
              images={images}
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
}: {
  title: string
  images: string[]
}) {
  const scrollRef = useRef<HTMLDivElement | null>(null)

  /* 🔹 이미지 없을 경우 */
  if (images.length === 0) {
    return (
      <section>
        <h2 className="text-2xl font-medium text-gray-800 mb-4">
          {title}
        </h2>
        <p className="text-sm text-gray-400 italic">
          제품이 없어 숨김처리됨
        </p>
      </section>
    )
  }

  /* 🔹 이미지 있을 경우 */
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
      {/* 섹션 제목 */}
      <h2 className="text-2xl font-medium text-gray-800 mb-6">
        {title}
      </h2>

      {/* 가로 무한 스크롤 */}
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="flex gap-6 overflow-x-auto scroll-smooth pb-2"
      >
        {infiniteImages.map((src, idx) => (
          <Link
            key={idx}
            href={`/product/${title}-${idx}`}
            className="shrink-0"
          >
            <div className="relative w-64 h-64 rounded-2xl overflow-hidden bg-gray-100 shadow-sm hover:shadow-md transition">
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
