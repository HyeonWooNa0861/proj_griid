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

/* ---------------- 디바이스별 최적 비율 설정 ---------------- */

const ASPECT_RATIOS = {
  mobile: 9 / 16,      // Instagram 릴스/스토리 (0.5625)
  tablet: 4 / 5,       // Instagram 피드 세로 (0.8)
  desktop: 9 / 16,     // 데스크탑도 릴스 비율 유지
}

function getDeviceAspectRatio(width: number): number {
  if (width < 768) return ASPECT_RATIOS.mobile
  if (width < 1024) return ASPECT_RATIOS.tablet
  return ASPECT_RATIOS.desktop
}

/* ---------------- 임시 데이터 (추후 API/DB로 대체) ---------------- */

const MOCK_PRODUCTS: ProductItem[] = [
  {
    id: 'F1',
    category: 'Dress',
    designer: 'Designer A',
    images: [
      '/image/dress/001.jpeg', '/image/dress/002.jpeg', '/image/dress/003.jpeg',
    ],
  },
  {
    id: 'F2',
    category: 'Dress',
    designer: 'Designer B',
    images: [
      '/image/dress/002.jpeg', '/image/dress/003.jpeg', '/image/dress/004.jpeg',
    ],
  },
  {
    id: 'F3',
    category: 'Dress',
    designer: 'Designer A',
    images: ['/image/dress/003.jpeg', '/image/dress/001.jpeg', '/image/dress/002.jpeg'],
  },
  {
    id: 'F4',
    category: 'Dress',
    designer: 'Designer C',
    images: ['/image/dress/004.jpeg', '/image/dress/002.jpeg', '/image/dress/004.jpeg'],
  },
  {
    id: 'F5',
    category: 'Outer',
    designer: 'Designer A',
    images: ['/image/outer/001.jpeg', '/image/outer/002.jpeg', '/image/outer/001.jpeg'],
  },
  {
    id: 'F6',
    category: 'Outer',
    designer: 'Designer B',
    images: ['/image/outer/002.jpeg', '/image/outer/003.jpeg', '/image/outer/002.jpeg'],
  },
  {
    id: 'F7',
    category: 'Outer',
    designer: 'Designer D',
    images: ['/image/outer/003.jpeg', '/image/outer/004.jpeg', '/image/outer/003.jpeg'],
  },
  {
    id: 'F8',
    category: 'Outer',
    designer: 'Designer A',
    images: ['/image/outer/004.jpeg', '/image/outer/005.jpeg', '/image/outer/004.jpeg'],
  },
  {
    id: 'F9',
    category: 'Outer',
    designer: 'Designer E',
    images: ['/image/outer/005.jpeg', '/image/outer/006.jpeg', '/image/outer/005.jpeg'],
  },
  {
    id: 'F10',
    category: 'Outer',
    designer: 'Designer B',
    images: ['/image/outer/006.jpeg', '/image/outer/007.jpeg', '/image/outer/006.jpeg'],
  },
  {
    id: 'G1',
    category: 'Hat',
    designer: 'Designer F',
    images: ['/image/hat/001.jpeg', '/image/hat/002.jpeg', '/image/hat/001.jpeg'],
  },
  {
    id: 'G2',
    category: 'Hat',
    designer: 'Designer G',
    images: ['/image/hat/002.jpeg', '/image/hat/003.jpeg', '/image/hat/002.jpeg'],
  },
  {
    id: 'G4',
    category: 'Bag',
    designer: 'Designer H',
    images: ['/image/bag/001.jpeg', '/image/bag/002.jpeg', '/image/bag/001.jpeg'],
  },
  {
    id: 'G5',
    category: 'Bag',
    designer: 'Designer A',
    images: ['/image/bag/002.jpeg', '/image/bag/003.jpeg', '/image/bag/002.jpeg'],
  },
  {
    id: 'G7',
    category: 'Shoes',
    designer: 'Designer I',
    images: ['/image/shoes/001.jpeg', '/image/shoes/002.jpeg', '/image/shoes/001.jpeg'],
  },
  {
    id: 'G8',
    category: 'Shoes',
    designer: 'Designer J',
    images: ['/image/shoes/002.jpeg', '/image/shoes/003.jpeg', '/image/shoes/002.jpeg'],
  },
  {
    id: 'H1',
    category: 'Jewelry',
    designer: 'Designer K',
    images: ['/image/jewelry/001.jpeg', '/image/jewelry/002.jpeg', '/image/jewelry/001.jpeg'],
  },
  {
    id: 'H2',
    category: 'Jewelry',
    designer: 'Designer A',
    images: ['/image/jewelry/002.jpeg', '/image/jewelry/003.jpeg', '/image/jewelry/002.jpeg'],
  },
  {
    id: 'I1',
    category: 'Object',
    designer: 'Designer L',
    images: ['/image/object/001.jpeg', '/image/object/002.jpeg', '/image/object/001.jpeg'],
  },
  {
    id: 'I2',
    category: 'Object',
    designer: 'Designer M',
    images: ['/image/object/002.jpeg', '/image/object/003.jpeg', '/image/object/002.jpeg'],
  },
]

/* ---------------- 유틸리티 함수 ---------------- */

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

async function fetchProducts(): Promise<ProductItem[]> {
  return shuffleArray(MOCK_PRODUCTS)
}

/* ---------------- 메인 컴포넌트 ---------------- */

export default function Home() {
  // State 선언
  const [products, setProducts] = useState<ProductItem[]>([])
  const [favorites, setFavorites] = useState<Set<string>>(new Set())
  const [loading, setLoading] = useState(true)
  const [containerWidth, setContainerWidth] = useState<number | null>(null)
  const [aspectRatio, setAspectRatio] = useState(9 / 16)
  const [headerHeight, setHeaderHeight] = useState(64)
  const [currentVisibleImage, setCurrentVisibleImage] = useState<string>('')
  const containerRef = useRef<HTMLDivElement>(null)

  // 초기 로드
  useEffect(() => {
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

    // localStorage에서 favorites 불러오기
    const saved = localStorage.getItem('favorites')
    if (saved) {
      try {
        const arr = JSON.parse(saved)
        if (Array.isArray(arr)) {
          setFavorites(new Set(arr.map(item => item.id)))
        }
      } catch (error) {
        console.error('Failed to parse favorites:', error)
        setFavorites(new Set())
      }
    }
  }, [])

  // localStorage 동기화 (다른 탭에서 변경 시)
  useEffect(() => {
    const handleStorage = () => {
      const saved = localStorage.getItem('favorites')
      if (saved) {
        try {
          const arr = JSON.parse(saved)
          if (Array.isArray(arr)) {
            setFavorites(new Set(arr.map(item => item.id)))
          }
        } catch {
          setFavorites(new Set())
        }
      }
    }
    window.addEventListener('storage', handleStorage)
    return () => window.removeEventListener('storage', handleStorage)
  }, [])

  // 컨테이너 크기 계산
  useEffect(() => {
    const calculateContainerSize = () => {
      const screenWidth = window.innerWidth
      const viewportHeight = window.visualViewport?.height || window.innerHeight
      
      let calculatedHeaderHeight = 64
      if (viewportHeight < 700) {
        calculatedHeaderHeight = 56
      } else if (viewportHeight < 900) {
        calculatedHeaderHeight = 64
      } else {
        calculatedHeaderHeight = 80
      }
      
      setHeaderHeight(calculatedHeaderHeight)
      
      const availableHeight = viewportHeight - calculatedHeaderHeight
      const deviceRatio = getDeviceAspectRatio(screenWidth)
      setAspectRatio(deviceRatio)

      if (screenWidth < 1024) {
        setContainerWidth(null)
        return
      }

      const idealWidth = availableHeight * deviceRatio
      const maxWidth = screenWidth * 0.5
      const minWidth = 400

      const calculatedWidth = Math.max(
        minWidth,
        Math.min(idealWidth, maxWidth)
      )

      setContainerWidth(calculatedWidth)

      if (process.env.NODE_ENV === 'development') {
        console.log({
          screenWidth,
          viewportHeight,
          calculatedHeaderHeight,
          availableHeight,
          deviceRatio,
          idealWidth,
          finalWidth: calculatedWidth,
        })
      }
    }

    const timeoutId = setTimeout(calculateContainerSize, 100)
    window.addEventListener('resize', calculateContainerSize)

    if (window.visualViewport) {
      window.visualViewport.addEventListener('resize', calculateContainerSize)
    }

    return () => {
      clearTimeout(timeoutId)
      window.removeEventListener('resize', calculateContainerSize)
      if (window.visualViewport) {
        window.visualViewport.removeEventListener('resize', calculateContainerSize)
      }
    }
  }, [])

  // IntersectionObserver
  useEffect(() => {
    if (!containerRef.current) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const imgPath = entry.target.getAttribute('data-current-image')
            if (imgPath) {
              setCurrentVisibleImage(imgPath)
            }
          }
        })
      },
      { threshold: 0.5 }
    )

    const cards = containerRef.current.querySelectorAll('[data-product-card]')
    cards.forEach((card) => observer.observe(card))

    return () => observer.disconnect()
  }, [products])

  // toggleFavorite 함수
  const toggleFavorite = (productId: string, productImage: string) => {
    setFavorites((prevFavorites) => {
        const newFavorites = new Set(prevFavorites)
        
        // localStorage에서 현재 배열 가져오기
        let arr: {id: string, image: string}[] = []
        try {
        const saved = localStorage.getItem('favorites')
        if (saved) {
            arr = JSON.parse(saved)
        }
        } catch (error) {
        console.error('Failed to parse localStorage:', error)
        arr = []
        }

        // 토글 로직
        if (newFavorites.has(productId)) {
        // 제거
        newFavorites.delete(productId)
        arr = arr.filter((item) => item.id !== productId)
        } else {
        // 추가
        newFavorites.add(productId)
        
        // localStorage 배열에도 추가 (중복 체크)
        const exists = arr.find(item => item.id === productId)
        if (!exists) {
            arr.push({
            id: productId,
            image: productImage
            })
        }
        }

        // localStorage에 저장
        localStorage.setItem('favorites', JSON.stringify(arr))
        
        console.log('Updated favorites:', {
        ids: Array.from(newFavorites),
        localStorage: arr
        })

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
    <div className="w-full min-h-screen bg-black relative">
      <Header />

      {/* 배경 블러 레이어 */}
      {currentVisibleImage && containerWidth && (
        <div 
          className="fixed inset-0 z-0"
          style={{ 
            top: `${headerHeight}px`,
          }}
        >
          <div className="relative w-full h-full">
            <Image
              src={currentVisibleImage}
              alt=""
              fill
              className="object-cover blur-3xl scale-125"
              style={{ opacity: 0.85 }}
              sizes="100vw"
            />
          </div>
        </div>
      )}

      {/* 컨테이너 래퍼 */}
      <div 
        className="flex justify-center relative z-10"
        style={{ paddingTop: `${headerHeight}px` }}
      >
        <div
          ref={containerRef}
          className="overflow-y-auto overflow-x-hidden snap-y snap-mandatory scrollbar-hide"
          style={{
            width: containerWidth ? `${containerWidth}px` : '100%',
            height: `calc(100vh - ${headerHeight}px)`,
            scrollSnapType: 'y mandatory',
          }}
        >
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              isFavorited={favorites.has(product.id)}
              onToggleFavorite={toggleFavorite}
              aspectRatio={aspectRatio}
              onImageChange={setCurrentVisibleImage}
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
  aspectRatio,
  onImageChange,
}: {
  product: ProductItem
  isFavorited: boolean
  onToggleFavorite: (id: string, image: string) => void
  aspectRatio: number
  onImageChange?: (imageUrl: string) => void
}) {
  const router = useRouter()
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const scrollRef = useRef<HTMLDivElement>(null)
  const cardRef = useRef<HTMLDivElement>(null)

  const handleScroll = () => {
    if (!scrollRef.current) return
    const scrollLeft = scrollRef.current.scrollLeft
    const cardWidth = scrollRef.current.offsetWidth
    const newIndex = Math.round(scrollLeft / cardWidth)
    
    if (newIndex !== currentImageIndex) {
      setCurrentImageIndex(newIndex)
      
      if (onImageChange && product.images[newIndex]) {
        onImageChange(product.images[newIndex])
      }
    }
  }

  const scrollToImage = (index: number) => {
    if (!scrollRef.current) return
    const cardWidth = scrollRef.current.offsetWidth
    scrollRef.current.scrollTo({
      left: cardWidth * index,
      behavior: 'smooth',
    })
  }

  useEffect(() => {
    if (onImageChange && product.images[currentImageIndex]) {
      const timer = setTimeout(() => {
        onImageChange(product.images[currentImageIndex])
      }, 100)
      return () => clearTimeout(timer)
    }
  }, [currentImageIndex, product.images, onImageChange])

  return (
    <div 
      ref={cardRef}
      data-product-card
      data-current-image={product.images[currentImageIndex]}
      className="relative w-full snap-start snap-always" 
      style={{ height: '100%' }}
    >
      {/* 이미지 스크롤 영역 */}
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="w-full h-full overflow-x-auto overflow-y-hidden snap-x snap-mandatory scrollbar-hide flex"
        style={{
          scrollSnapType: 'x mandatory',
          scrollSnapStop: 'always',
          WebkitOverflowScrolling: 'touch',
        }}
      >
        {product.images.map((image, index) => (
          <div
            key={index}
            className="w-full h-full shrink-0 relative snap-center snap-always"
          >
            {/* 블러 배경 레이어 */}
            <div className="absolute inset-0">
              <Image
                src={image}
                alt=""
                fill
                className="object-cover blur-3xl scale-110"
                style={{ opacity: 0.5 }}
                sizes="100vw"
              />
            </div>

            {/* 메인 이미지 레이어 */}
            <div className="absolute inset-0 flex items-center justify-center p-0">
              <div 
                className="relative max-w-full max-h-full"
                style={{
                  aspectRatio: `${aspectRatio}`,
                  width: '100%',
                  height: '100%',
                }}
              >
                <div className="relative w-full h-full flex items-center justify-center">
                  <div
                    className="relative"
                    style={{
                      width: '100%',
                      height: '100%',
                      maxWidth: '100%',
                      maxHeight: '100%',
                      aspectRatio: `${aspectRatio}`,
                    }}
                  >
                    <Image
                      src={image}
                      alt={`${product.category} ${product.id}`}
                      fill
                      className="object-contain"
                      priority={index === 0}
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 이미지 인디케이터 */}
      {product.images.length > 1 && (
        <div className="absolute top-4 left-1/2 -translate-x-1/2 flex gap-1.5 z-20">
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
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/60 to-transparent p-6 pb-8 z-20">
        <div className="mb-4">
          <p className="text-white text-sm font-medium mb-1">
            {product.category}
          </p>
          <p className="text-white/70 text-xs">designed by {product.designer}</p>
        </div>

        <div className="flex gap-3">
          <button
            onClick={() => router.push(`/product/${product.id}`)}
            className="flex-1 py-3 bg-white/10 backdrop-blur-sm text-white text-sm font-semibold rounded-sm border border-white/30 hover:bg-white/20 transition-colors"
            aria-label="상품 상세 설명 보기"
          >
            Description
          </button>

          <button
            onClick={() =>
              router.push(
                `/collections/designer/${encodeURIComponent(product.designer)}`
              )
            }
            className="flex-1 py-3 bg-white/10 backdrop-blur-sm text-white text-sm font-semibold rounded-sm border border-white/30 hover:bg-white/20 transition-colors"
            aria-label="디자이너 컬렉션 보기"
          >
            {product.designer}
          </button>

          <button
            onClick={() => onToggleFavorite(product.id, product.images[0])}
            className="w-12 h-12 flex items-center justify-center bg-transparent p-0 hover:bg-transparent border-none shadow-none"
            aria-label="저장하기"
          >
            <svg
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill={isFavorited ? '#b4c2ca' : 'none'}
              style={{ display: 'block', position: 'relative' }}
            >
              {!isFavorited && (
                <g>
                  <rect x="4" y="3" width="16" height="18" rx="2" fill="#000" opacity="0.25" filter="url(#bookmark-blur)" />
                  <filter id="bookmark-blur">
                    <feGaussianBlur stdDeviation="2" />
                  </filter>
                </g>
              )}
              <path
                d="M6 3a2 2 0 0 0-2 2v16l8-5.333L20 21V5a2 2 0 0 0-2-2H6z"
                stroke={isFavorited ? '#b4c2ca' : 'white'}
                strokeWidth="1"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill={isFavorited ? '#b4c2ca' : 'none'}
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}