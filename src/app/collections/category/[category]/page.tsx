import Image from 'next/image'
import Link from 'next/link'
import Header from '@/components/Header'

const CATEGORY_IMAGES: Record<string, string[]> = {
  Dress: [
    '/logo/Griid_Brand_Logo_Toolkit/IG_Feed_WH/Griid_IG_Feed_Left_WH.png',
    '/logo/Griid_Brand_Logo_Toolkit/IG_Feed_WH/Griid_IG_Feed_Center_WH.png',
    '/logo/Griid_Brand_Logo_Toolkit/IG_Feed_WH/Griid_IG_Feed_Right_WH.png',
  ],
  Outer: [
    '/logo/Griid_Brand_Logo_Toolkit/IG_Feed_WH/Griid_IG_Feed_Left_WH.png',
    '/logo/Griid_Brand_Logo_Toolkit/IG_Feed_WH/Griid_IG_Feed_Center_WH.png',
    '/logo/Griid_Brand_Logo_Toolkit/IG_Feed_WH/Griid_IG_Feed_Right_WH.png',
  ],
  Top: [
    '/logo/Griid_Brand_Logo_Toolkit/IG_Feed_WH/Griid_IG_Feed_Left_WH.png',
    '/logo/Griid_Brand_Logo_Toolkit/IG_Feed_WH/Griid_IG_Feed_Center_WH.png',
    '/logo/Griid_Brand_Logo_Toolkit/IG_Feed_WH/Griid_IG_Feed_Right_WH.png',
  ],
  Bottom: [
    '/logo/Griid_Brand_Logo_Toolkit/IG_Feed_WH/Griid_IG_Feed_Left_WH.png',
    '/logo/Griid_Brand_Logo_Toolkit/IG_Feed_WH/Griid_IG_Feed_Center_WH.png',
    '/logo/Griid_Brand_Logo_Toolkit/IG_Feed_WH/Griid_IG_Feed_Right_WH.png',
  ],
  Acc: [
    '/logo/Griid_Brand_Logo_Toolkit/IG_Feed_WH/Griid_IG_Feed_Left_WH.png',
    '/logo/Griid_Brand_Logo_Toolkit/IG_Feed_WH/Griid_IG_Feed_Center_WH.png',
    '/logo/Griid_Brand_Logo_Toolkit/IG_Feed_WH/Griid_IG_Feed_Right_WH.png',
  ],
  Craft: [
    '/logo/Griid_Brand_Logo_Toolkit/IG_Feed_WH/Griid_IG_Feed_Left_WH.png',
    '/logo/Griid_Brand_Logo_Toolkit/IG_Feed_WH/Griid_IG_Feed_Center_WH.png',
    '/logo/Griid_Brand_Logo_Toolkit/IG_Feed_WH/Griid_IG_Feed_Right_WH.png',
  ],

  // ✅ Sidebar에 있는 Objet 추가
  Objet: [
    '/logo/Griid_Brand_Logo_Toolkit/IG_Feed_WH/Griid_IG_Feed_Left_WH.png',
    '/logo/Griid_Brand_Logo_Toolkit/IG_Feed_WH/Griid_IG_Feed_Center_WH.png',
    '/logo/Griid_Brand_Logo_Toolkit/IG_Feed_WH/Griid_IG_Feed_Right_WH.png',
  ],

  Jewelry: [
    '/logo/Griid_Brand_Logo_Toolkit/IG_Feed_WH/Griid_IG_Feed_Left_WH.png',
    '/logo/Griid_Brand_Logo_Toolkit/IG_Feed_WH/Griid_IG_Feed_Center_WH.png',
    '/logo/Griid_Brand_Logo_Toolkit/IG_Feed_WH/Griid_IG_Feed_Right_WH.png',
  ],
  ETC: [
    '/logo/Griid_Brand_Logo_Toolkit/IG_Feed_WH/Griid_IG_Feed_Left_WH.png',
    '/logo/Griid_Brand_Logo_Toolkit/IG_Feed_WH/Griid_IG_Feed_Center_WH.png',
    '/logo/Griid_Brand_Logo_Toolkit/IG_Feed_WH/Griid_IG_Feed_Right_WH.png',
  ],
}

// 한 화면에 카드 3개 보이도록 폭 계산 (gap-6 = 24px)
const getCardWidth = (cardsPerView: number) => {
  const gap = 24 * (cardsPerView - 1)
  return `calc((100% - ${gap}px) / ${cardsPerView})`
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ readonly category: string }>
}) {
  const { category: rawCategory } = await params
  const category = decodeURIComponent(rawCategory)

  const images = CATEGORY_IMAGES[category] ?? []

  return (
    <div className="min-h-screen bg-gray-50 pt-20 pb-16">
      <Header />

      <main className="max-w-7xl mx-auto px-6">
        <h1 className="text-3xl font-semibold text-gray-900 text-center mb-16">
          {category}
        </h1>

        {images.length === 0 ? (
          <p className="text-center text-sm text-gray-400">
            해당 카테고리에 등록된 상품이 없습니다.
          </p>
        ) : (
          <div
            className="
              flex gap-6
              overflow-x-auto overflow-y-hidden
              scroll-smooth
              pb-4
              scollbar-hide
            "
          >
            {images.map((src, idx) => (
              <Link
                key={idx}
                href={`/product/${category}-${idx}`}
                className="shrink-0 block"
                style={{ width: getCardWidth(3) }}
              >
                <div
                  className="
                    relative bg-white rounded-none
                    border border-gray-200 shadow-none
                    overflow-hidden transition-all duration-200
                    hover:scale-[1.02]
                  "
                  style={{ aspectRatio: '2 / 3' }}
                >
                  <Image
                    src={src}
                    alt={`${category} ${idx + 1}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw,
                           (max-width: 1024px) 50vw,
                           33vw"
                  />
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}