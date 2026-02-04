'use client'

import Image from 'next/image'
import Link from 'next/link'
import Header from '@/components/Header'
import { useState, useEffect } from 'react'

// 임시 이미지 (실제로는 API에서 가져올 데이터)
const PLACEHOLDER_IMAGES = [
  '/logo/Griid_Brand_Logo_Toolkit/IG_Feed_WH/Griid_IG_Feed_Left_WH.png',
  '/logo/Griid_Brand_Logo_Toolkit/IG_Feed_WH/Griid_IG_Feed_Center_WH.png',
  '/logo/Griid_Brand_Logo_Toolkit/IG_Feed_WH/Griid_IG_Feed_Right_WH.png',
]

type FavoriteItem = {
  id: string
  image: string
}

export default function MyLoungePage() {
  const [cardsPerView, setCardsPerView] = useState(3)
  const [watchlistItems, setWatchlistItems] = useState<FavoriteItem[]>([])
  const [loading, setLoading] = useState(true)

  // localStorage에서 watchlist 불러오기
  useEffect(() => {
    try {
      const saved = localStorage.getItem('favorites')
      if (saved) {
        const parsed = JSON.parse(saved)
        if (Array.isArray(parsed)) {
          setWatchlistItems(parsed)
        }
      }
    } catch (error) {
      console.error('Failed to load favorites:', error)
    } finally {
      setLoading(false)
    }
  }, [])

  // 카드 개수 계산
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

  // Watchlist에서 항목 제거
  const removeFromWatchlist = (productId: string) => {
    try {
      const saved = localStorage.getItem('favorites')
      if (saved) {
        let arr: FavoriteItem[] = JSON.parse(saved)
        arr = arr.filter((item) => item.id !== productId)
        localStorage.setItem('favorites', JSON.stringify(arr))
        setWatchlistItems(arr)
      }
    } catch (error) {
      console.error('Failed to remove from watchlist:', error)
    }
  }

  const sections = [
    { 
      key: 'active', 
      title: 'Active Bids', 
      items: PLACEHOLDER_IMAGES,
      type: 'placeholder' as const
    },
    { 
      key: 'completed', 
      title: 'Completed Bids', 
      items: [],
      type: 'placeholder' as const
    },
    { 
      key: 'products', 
      title: 'My Products', 
      items: PLACEHOLDER_IMAGES,
      type: 'placeholder' as const
    },
    { 
      key: 'watchlist', 
      title: 'Watchlist', 
      items: watchlistItems,
      type: 'watchlist' as const
    },
  ]

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20 pb-16">
        <Header />
        <main className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
          </div>
        </main>
      </div>
    )
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
              items={section.items}
              type={section.type}
              getCardWidth={getCardWidth}
              showAddButton={section.key === 'products'}
              onRemove={section.key === 'watchlist' ? removeFromWatchlist : undefined}
            />
          ))}
        </div>
      </main>
    </div>
  )
}

function LoungeSection({
  title,
  items,
  type,
  getCardWidth,
  showAddButton,
  onRemove,
}: {
  title: string
  items: string[] | FavoriteItem[]
  type: 'placeholder' | 'watchlist'
  getCardWidth: () => string
  showAddButton?: boolean
  onRemove?: (id: string) => void
}) {
  if (items.length === 0) {
    return (
      <section>
        <h2 className="text-xl font-medium text-gray-800 mb-4">
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

      {/* 가로 스크롤 */}
      <div className="flex gap-6 overflow-x-auto scroll-smooth pb-2 scrollbar-hide">
        {items.map((item, idx) => {
          // Watchlist: FavoriteItem 구조
          // Placeholder: string 구조
          const imageSrc = type === 'watchlist' ? (item as FavoriteItem).image : (item as string)
          const itemId = type === 'watchlist' ? (item as FavoriteItem).id : `${title}-${idx}`

          return (
            <div 
              key={type === 'watchlist' ? (item as FavoriteItem).id : idx} 
              className="shrink-0 relative" 
              style={{ width: getCardWidth() }}
            >
              <Link href={`/product/${itemId}`}>
                <div
                  className="relative bg-white shadow-md overflow-hidden transition-all duration-200 hover:scale-[1.02] hover:shadow-lg"
                  style={{ aspectRatio: '2 / 3' }}
                >
                  <Image
                    src={imageSrc}
                    alt=""
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
              </Link>

              {/* 저장하기 버튼: watchlist에만 노출 */}
              {type === 'watchlist' && onRemove && (
                <button
                  onClick={e => {
                    e.currentTarget.disabled = true;
                    onRemove((item as FavoriteItem).id);
                  }}
                  className="absolute top-2 right-2 flex items-center justify-center p-0 border-none bg-transparent shadow-none"
                  aria-label="저장 해제"
                  style={{ outline: 'none', width: '48px', height: '48px' }}
                >
                  <svg
                    width="36"
                    height="36"
                    viewBox="0 0 24 24"
                    fill="#000000"
                    stroke="none"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="transition-colors duration-150 hover:stroke-[#000000]"
                  >
                    <path d="M6 3a2 2 0 0 0-2 2v16l8-5.333L20 21V5a2 2 0 0 0-2-2H6z" />
                  </svg>
                </button>
              )}
            </div>
          )
        })}
      </div>
    </section>
  )
}