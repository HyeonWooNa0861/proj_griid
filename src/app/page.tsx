'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import Header from '@/components/Header'
import { useRouter } from 'next/navigation'

/* ---------------- 타입 ---------------- */

type ProductItem = {
  id: string
  category: string
  designer: string
  images: string[]
}

/* ---------------- 임시 데이터 (추후 API/DB로 대체) ---------------- */

const MOCK_PRODUCTS: ProductItem[] = [
  {
    id: 'F1',
    category: 'Dress',
    designer: 'Designer A',
    images: [
      '/image/dress/001.jpeg',
      '/image/dress/002.jpeg',
      '/image/dress/003.jpeg',
    ],
  },
  {
    id: 'F2',
    category: 'Dress',
    designer: 'Designer B',
    images: [
      '/image/dress/002.jpeg',
      '/image/dress/003.jpeg',
      '/image/dress/004.jpeg',
    ],
  },
  {
    id: 'F3',
    category: 'Dress',
    designer: 'Designer A',
    images: ['/image/dress/003.jpeg', '/image/dress/001.jpeg'],
  },
  {
    id: 'F4',
    category: 'Dress',
    designer: 'Designer C',
    images: ['/image/dress/004.jpeg'],
  },
  {
    id: 'F5',
    category: 'Outer',
    designer: 'Designer A',
    images: ['/image/outer/001.jpeg', '/image/outer/002.jpeg'],
  },
  {
    id: 'F6',
    category: 'Outer',
    designer: 'Designer B',
    images: ['/image/outer/002.jpeg'],
  },
  {
    id: 'F7',
    category: 'Outer',
    designer: 'Designer D',
    images: ['/image/outer/003.jpeg', '/image/outer/004.jpeg'],
  },
  {
    id: 'F8',
    category: 'Outer',
    designer: 'Designer A',
    images: ['/image/outer/004.jpeg'],
  },
  {
    id: 'F9',
    category: 'Outer',
    designer: 'Designer E',
    images: ['/image/outer/005.jpeg'],
  },
  {
    id: 'F10',
    category: 'Outer',
    designer: 'Designer B',
    images: ['/image/outer/006.jpeg', '/image/outer/007.jpeg'],
  },
  {
    id: 'G1',
    category: 'Hat',
    designer: 'Designer F',
    images: ['/image/hat/001.jpeg'],
  },
  {
    id: 'G2',
    category: 'Hat',
    designer: 'Designer G',
    images: ['/image/hat/002.jpeg', '/image/hat/003.jpeg'],
  },
  {
    id: 'G4',
    category: 'Bag',
    designer: 'Designer H',
    images: ['/image/bag/001.jpeg'],
  },
  {
    id: 'G5',
    category: 'Bag',
    designer: 'Designer A',
    images: ['/image/bag/002.jpeg', '/image/bag/003.jpeg'],
  },
  {
    id: 'G7',
    category: 'Shoes',
    designer: 'Designer I',
    images: ['/image/shoes/001.jpeg'],
  },
  {
    id: 'G8',
    category: 'Shoes',
    designer: 'Designer J',
    images: ['/image/shoes/002.jpeg', '/image/shoes/003.jpeg'],
  },
  {
    id: 'H1',
    category: 'Jewelry',
    designer: 'Designer K',
    images: ['/image/jewelry/001.jpeg'],
  },
  {
    id: 'H2',
    category: 'Jewelry',
    designer: 'Designer A',
    images: ['/image/jewelry/002.jpeg', '/image/jewelry/003.jpeg'],
  },
  {
    id: 'I1',
    category: 'Object',
    designer: 'Designer L',
    images: ['/image/object/001.jpeg'],
  },
  {
    id: 'I2',
    category: 'Object',
    designer: 'Designer M',
    images: ['/image/object/002.jpeg', '/image/object/003.jpeg'],
  },
]

/* ---------------- 유틸리티 함수 ---------------- */

/**
 * Fisher-Yates 알고리즘을 사용한 배열 섞기
 */
function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

/**
 * 데이터 페칭 함수 (추후 실제 API 호출로 대체)
 */
async function fetchProducts(): Promise<ProductItem[]> {
  // TODO: 실제 구현 시 API 호출
  // const response = await fetch('/api/products?limit=20&random=true')
  // const data = await response.json()
  // return data.products

  // 현재는 Mock 데이터를 랜덤 정렬해서 반환
  return shuffleArray(MOCK_PRODUCTS)
}

/* ---------------- 메인 컴포넌트 ---------------- */

export default function Home() {
  const [products, setProducts] = useState<ProductItem[]>([])
  const [favorites, setFavorites] = useState<Set<string>>(new Set())
  const [loading, setLoading] = useState(true)
  const [containerWidth, setContainerWidth] = useState<number | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // 초기 데이터 로드
    const loadProducts = async () => {
      try {
        const data = await fetchProducts()
        setProducts(data)
      } catch (error) {
        console.error('Failed to load products:', error)
      } finally {
        setLoading(false)
      }
    }

    loadProducts()

    // 로컬 스토리지에서 찜 목록 불러오기
    const saved = localStorage.getItem('favorites')
    if (saved) {
      setFavorites(new Set(JSON.parse(saved)))
    }
  }, [])

  useEffect(() => {
    // 데스크탑 환경에서 컨테이너 너비 계산
    const calculateContainerWidth = () => {
      const screenWidth = window.innerWidth
      
      // 실제 viewport 높이 (헤더 제외)
      // visualViewport는 주소창 등을 제외한 실제 보이는 영역
      const viewportHeight = window.visualViewport?.height || window.innerHeight
      const headerHeight = 64 // pt-16 = 4rem = 64px
      const availableHeight = viewportHeight - headerHeight

      // 모바일/태블릿: 전체 너비 사용
      if (screenWidth < 1024) {
        setContainerWidth(null)
        return
      }

      // 데스크탑: 사용 가능한 높이에 맞춰 비율 계산 (9:16 기준)
      const idealWidth = availableHeight * (9 / 16)
      
      // 최대 너비 제한 (화면의 50%를 넘지 않도록)
      const maxWidth = screenWidth * 0.5
      
      // 최소 너비 설정 (너무 좁아지지 않도록)
      const minWidth = 400
      
      const calculatedWidth = Math.max(
        minWidth,
        Math.min(idealWidth, maxWidth)
      )
      
      setContainerWidth(calculatedWidth)
      
      // 디버깅용 로그 (개발 환경에서만)
      if (process.env.NODE_ENV === 'development') {
        console.log({
          screenWidth,
          viewportHeight,
          availableHeight,
          idealWidth,
          maxWidth,
          finalWidth: calculatedWidth,
        })
      }
    }

    // 초기 계산을 약간 지연시켜 레이아웃 안정화 대기
    const timeoutId = setTimeout(calculateContainerWidth, 100)

    // 리사이즈 이벤트 리스너
    window.addEventListener('resize', calculateContainerWidth)
    
    // visualViewport 변경 감지 (모바일 주소창 표시/숨김 등)
    if (window.visualViewport) {
      window.visualViewport.addEventListener('resize', calculateContainerWidth)
    }
    
    return () => {
      clearTimeout(timeoutId)
      window.removeEventListener('resize', calculateContainerWidth)
      if (window.visualViewport) {
        window.visualViewport.removeEventListener('resize', calculateContainerWidth)
      }
    }
  }, [])

  const toggleFavorite = (productId: string) => {
    setFavorites((prev) => {
      const newFavorites = new Set(prev)
      if (newFavorites.has(productId)) {
        newFavorites.delete(productId)
      } else {
        newFavorites.add(productId)
      }
      localStorage.setItem('favorites', JSON.stringify([...newFavorites]))
      return newFavorites
    })
  }

  if (loading) {
    return (
      <div className="w-full min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto"></div>
          <p className="mt-4 text-white text-sm">로딩 중...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full min-h-screen bg-black">
      <Header />

      {/* 스크롤 컨테이너 - 데스크탑에서 중앙 정렬 */}
      <div className="pt-16 flex justify-center bg-black">
        <div
          ref={containerRef}
          className="overflow-y-auto overflow-x-hidden snap-y snap-mandatory"
          style={{
            width: containerWidth ? `${containerWidth}px` : '100%',
            height: 'calc(100vh - 4rem)', // 헤더 높이(64px) 제외
            scrollSnapType: 'y mandatory',
          }}
        >
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              isFavorited={favorites.has(product.id)}
              onToggleFavorite={toggleFavorite}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

/* ---------------- 개별 상품 카드 ---------------- */

function ProductCard({
  product,
  isFavorited,
  onToggleFavorite,
}: {
  product: ProductItem
  isFavorited: boolean
  onToggleFavorite: (id: string) => void
}) {
  const router = useRouter()
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const scrollRef = useRef<HTMLDivElement>(null)

  const handleScroll = () => {
    if (!scrollRef.current) return

    const scrollLeft = scrollRef.current.scrollLeft
    const cardWidth = scrollRef.current.offsetWidth
    const newIndex = Math.round(scrollLeft / cardWidth)

    setCurrentImageIndex(newIndex)
  }

  const scrollToImage = (index: number) => {
    if (!scrollRef.current) return

    const cardWidth = scrollRef.current.offsetWidth
    scrollRef.current.scrollTo({
      left: cardWidth * index,
      behavior: 'smooth',
    })
  }

  return (
    <div className="relative w-full h-screen snap-start snap-always">
      {/* 이미지 스크롤 영역 */}
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="w-full h-full overflow-x-auto overflow-y-hidden snap-x snap-mandatory scrollbar-hide flex"
        style={{
          scrollSnapType: 'x mandatory',
          WebkitOverflowScrolling: 'touch',
        }}
      >
        {product.images.map((image, index) => (
          <div
            key={index}
            className="w-full h-full shrink-0 relative snap-center snap-always"
          >
            <Image
              src={image}
              alt={`${product.category} ${product.id}`}
              fill
              className="object-cover"
              priority={index === 0}
              sizes="100vw"
            />
          </div>
        ))}
      </div>

      {/* 이미지 인디케이터 (여러 이미지가 있을 때만 표시) */}
      {product.images.length > 1 && (
        <div className="absolute top-4 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
          {product.images.map((_, index) => (
            <button
              key={index}
              onClick={() => scrollToImage(index)}
              className={`h-1.5 rounded-full transition-all ${
                currentImageIndex === index
                  ? 'w-6 bg-white'
                  : 'w-1.5 bg-white/50'
              }`}
              aria-label={`이미지 ${index + 1}`}
            />
          ))}
        </div>
      )}

      {/* 하단 액션 버튼 영역 */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/60 to-transparent p-6 pb-8">
        {/* 상품 정보 */}
        <div className="mb-4">
          <p className="text-white text-sm font-medium mb-1">
            {product.category}
          </p>
          <p className="text-white/70 text-xs">by {product.designer}</p>
        </div>

        {/* 버튼 그룹 */}
        <div className="flex gap-3">
          {/* 상세보기 버튼 */}
          <button
            onClick={() => router.push(`/product/${product.id}`)}
            className="flex-1 py-3 bg-white text-black text-sm font-semibold rounded-sm hover:bg-gray-100 transition-colors"
          >
            상세보기
          </button>

          {/* 디자이너 버튼 */}
          <button
            onClick={() =>
              router.push(
                `/collections/designer/${encodeURIComponent(product.designer)}`
              )
            }
            className="flex-1 py-3 bg-white/10 backdrop-blur-sm text-white text-sm font-semibold rounded-sm border border-white/30 hover:bg-white/20 transition-colors"
          >
            디자이너
          </button>

          {/* 찜 버튼 */}
          <button
            onClick={() => onToggleFavorite(product.id)}
            className="w-12 h-12 flex items-center justify-center bg-white/10 backdrop-blur-sm rounded-sm border border-white/30 hover:bg-white/20 transition-colors"
            aria-label="찜하기"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill={isFavorited ? '#ef4444' : 'none'}
              stroke={isFavorited ? '#ef4444' : 'white'}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}