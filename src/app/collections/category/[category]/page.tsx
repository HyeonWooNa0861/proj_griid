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

const ITEMS_PER_PAGE = 9

export default async function CategoryPage({
  params,
  searchParams,
}: {
  params: Promise<{ readonly category: string }>
  searchParams: Promise<{ readonly page?: string }>
}) {
  const { category: rawCategory } = await params
  const { page: pageParam } = await searchParams
  
  const category = decodeURIComponent(rawCategory)
  const currentPage = Math.max(1, parseInt(pageParam || '1', 10))

  const baseImages = CATEGORY_IMAGES[category] ?? []

  // 테스트용: 50개 상품 생성 (실제로는 서버에서 받아올 데이터)
  const allProducts =
    baseImages.length === 0
      ? []
      : Array.from({ length: 50 }, (_, i) => ({
          id: `${category}-${i}`,
          src: baseImages[i % baseImages.length],
          name: `${category} ${i + 1}`,
        }))

  // 페이지네이션 계산
  const totalItems = allProducts.length
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const endIndex = startIndex + ITEMS_PER_PAGE
  const currentProducts = allProducts.slice(startIndex, endIndex)

  // 페이지 번호 생성 (최대 5개 표시)
  const getPageNumbers = () => {
    const pages: (number | string)[] = []
    const maxVisible = 5

    if (totalPages <= maxVisible) {
      return Array.from({ length: totalPages }, (_, i) => i + 1)
    }

    // 첫 페이지
    pages.push(1)

    if (currentPage > 3) {
      pages.push('...')
    }

    // 현재 페이지 주변
    const start = Math.max(2, currentPage - 1)
    const end = Math.min(totalPages - 1, currentPage + 1)

    for (let i = start; i <= end; i++) {
      pages.push(i)
    }

    if (currentPage < totalPages - 2) {
      pages.push('...')
    }

    // 마지막 페이지
    if (totalPages > 1) {
      pages.push(totalPages)
    }

    return pages
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20 pb-16">
      <Header />

      <main className="max-w-7xl mx-auto px-6">
        {/* <h1 className="text-3xl font-semibold text-gray-900 text-center mb-4">
          {category}
        </h1>

        <p className="text-center text-sm text-gray-500 mb-12">
          총 {totalItems}개의 상품
        </p> */}

        {currentProducts.length === 0 ? (
          <p className="text-center text-sm text-gray-400">
            해당 카테고리에 등록된 상품이 없습니다.
          </p>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
              {currentProducts.map((product) => (
                <Link
                  key={product.id}
                  href={`/product/${product.id}`}
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
                      w-full
                    "
                    style={{
                      aspectRatio: '2 / 3',
                      paddingBottom: '150%',
                      position: 'relative',
                    }}
                  >
                    <Image
                      src={product.src}
                      alt={product.name}
                      fill
                      className="object-cover absolute inset-0"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </div>
                </Link>
              ))}
            </div>

            {/* 페이지네이션 */}
            {totalPages > 1 && (
              <nav className="flex justify-center items-center gap-4">
                {/* 이전 버튼 (5페이지씩) */}
                <Link
                  href={`/collections/category/${category}?page=${Math.max(1, currentPage - 5)}`}
                  className={`
                    text-sm font-medium transition-colors
                    ${
                      currentPage === 1
                        ? 'text-gray-400 pointer-events-none'
                        : 'text-gray-700 hover:text-gray-900'
                    }
                  `}
                  aria-disabled={currentPage === 1}
                >
                  prev
                </Link>

                {/* 페이지 번호 */}
                <div className="flex items-center gap-3">
                  {getPageNumbers().map((page, idx) =>
                    typeof page === 'number' ? (
                      <Link
                        key={idx}
                        href={`/collections/category/${category}?page=${page}`}
                        className={`
                          text-sm font-medium transition-colors
                          ${
                            currentPage === page
                              ? 'text-gray-900 underline underline-offset-4'
                              : 'text-gray-600 hover:text-gray-900'
                          }
                        `}
                      >
                        {page}
                      </Link>
                    ) : (
                      <span
                        key={idx}
                        className="text-sm text-gray-400"
                      >
                        {page}
                      </span>
                    )
                  )}
                </div>

                {/* 다음 버튼 (5페이지씩) */}
                <Link
                  href={`/collections/category/${category}?page=${Math.min(totalPages, currentPage + 5)}`}
                  className={`
                    text-sm font-medium transition-colors
                    ${
                      currentPage === totalPages
                        ? 'text-gray-400 pointer-events-none'
                        : 'text-gray-700 hover:text-gray-900'
                    }
                  `}
                  aria-disabled={currentPage === totalPages}
                >
                  next
                </Link>
              </nav>
            )}
          </>
        )}
      </main>
    </div>
  )
}