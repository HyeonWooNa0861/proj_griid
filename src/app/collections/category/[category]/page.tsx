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

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ readonly category: string }>
}) {
  const { category: rawCategory } = await params
  const category = decodeURIComponent(rawCategory)

  const baseImages = CATEGORY_IMAGES[category] ?? []

  // 3 x 4 행렬로 강제 확장 (임시)
  const images =
    baseImages.length === 0
      ? []
      : Array.from({ length: 12 }, (_, i) => baseImages[i % baseImages.length])

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
          <div className="grid grid-cols-3 gap-4">
            {images.map((src, idx) => (
              <Link
                key={idx}
                href={`/product/${category}-${idx}`}
                className="block"
              >
                <div
                  className="
                    relative
                    bg-white
                    border border-gray-200
                    overflow-hidden
                    transition-all duration-200
                    hover:scale-[1.01]
                  "
                  style={{ aspectRatio: '2 / 3' }} 
                >
                  <Image
                    src={src}
                    alt={`${category} ${idx + 1}`}
                    fill
                    className="object-cover"
                    sizes="33vw"
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