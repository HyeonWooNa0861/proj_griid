// Home

'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Header from '@/components/Header'
import Link from 'next/link'


type RowItem = { id: string; image?: string | null }
type RowConfig = { title: string; items: RowItem[] }

const ROW_CONFIG: Record<string, RowConfig> = {
  F: {
    title: 'Clothes',
    items: [
      { id: 'F1', image: '/Image/dress/001.jpeg' },
      { id: 'F2', image: '/Image/dress/002.jpeg' },
      { id: 'F3', image: '/Image/dress/003.jpeg' },
      { id: 'F4', image: '/Image/dress/004.jpeg' },
      { id: 'F5', image: '/Image/outer/001.jpeg' },
      { id: 'F6', image: '/Image/outer/002.jpeg' },
      { id: 'F7', image: '/Image/outer/003.jpeg' },
      { id: 'F8', image: '/Image/outer/004.jpeg' },
      { id: 'F9', image: '/Image/outer/005.jpeg' },
      { id: 'F10', image: '/Image/outer/006.jpeg' },
      { id: 'F11', image: '/Image/outer/007.jpeg' },
    ],
  },
  G: {
    title: 'Acc',
    items: [
      { id: 'G1', image: '/Image/hat/001.jpeg' },
      { id: 'G2', image: '/Image/hat/002.jpeg' },
      { id: 'G3', image: '/Image/hat/003.jpeg' },
      { id: 'G4', image: '/Image/bag/001.jpeg' },
      { id: 'G5', image: '/Image/bag/002.jpeg' },
      { id: 'G6', image: '/Image/bag/003.jpeg' },
      { id: 'G7', image: '/Image/shoes/001.jpeg' },
      { id: 'G8', image: '/Image/shoes/002.jpeg' },
      { id: 'G9', image: '/Image/shoes/003.jpeg' },
    ],
  },
  H: {
    title: "Jewelry",
    items: [
      { id: 'H1', image: '/Image/jewelry/001.jpeg' },
      { id: 'H2', image: '/Image/jewelry/002.jpeg' },
      { id: 'H3', image: '/Image/jewelry/003.jpeg' },
    ],
  },
  I: {
    title: "Object",
    items: [
      { id: 'I1', image: '/Image/object/001.jpeg' },
      { id: 'I2', image: '/Image/object/002.jpeg' },
      { id: 'I3', image: '/Image/object/003.jpeg' },
      { id: 'I4', image: '/Image/object/004.jpeg' },
    ]
  }
}
export default function Home() {
  const [cardsPerView, setCardsPerView] = useState(3)

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setCardsPerView(1)
      } else if (window.innerWidth < 1024) {
        setCardsPerView(2)
      } else {
        setCardsPerView(3)
      }
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const createInfiniteItems = (items: Array<{ id: string; label: string; image: string | null }>) => {
    return [...items, ...items, ...items] // 무한 루프를 위해 3번 반복
  }

  // 기본(텍스트) 카드 생성: ROW_CONFIG에 없는 행은 여기 개수만 바꾸면 됨
  const createDefaultItems = (prefix: string, count: number) => {
    return Array.from({ length: count }, (_, i) => {
      const id = `${prefix}${i + 1}`
      return { id, label: id, image: null }
    })
  }

  // 화면에 보여줄 row 순서 고정
  const ROW_ORDER = ['F', 'G', 'H', 'I'] as const

  const rows = ROW_ORDER.map((prefix) => {
    const config = ROW_CONFIG[prefix]

    if (config) {
      const normalized = config.items.map((it, idx) => {
        // id가 없거나 중복될 여지를 줄이기 위해 보정(선택)
        const id = it.id || `${prefix}${idx + 1}`
        return {
          id,
          label: id,
          image: it.image ?? null,
        }
      })

      return {
        title: config.title,
        items: createInfiniteItems(normalized),
      }
    }

    // config가 없는 row는 텍스트 카드로 유지
    const fallback = createDefaultItems(prefix, 4)
    return {
      items: createInfiniteItems(fallback),
    }
  })

  const getCardWidth = () => {
    const gap = 24 * (cardsPerView - 1)
    return `calc((100% - ${gap}px) / ${cardsPerView})`
  }

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const container = e.currentTarget
    const maxScroll = container.scrollWidth - container.clientWidth
    const currentScroll = container.scrollLeft

    if (currentScroll >= maxScroll - 10) {
      container.scrollLeft = container.scrollWidth / 3
    } else if (currentScroll <= 10) {
      container.scrollLeft = (container.scrollWidth / 3) * 2
    }
  }

  return (
    <div className="w-full min-h-screen bg-gray-50 pt-20 pb-12">
      <Header />
      <main className="max-w-7xl mx-auto px-6">
        {rows.map((row, rowIndex) => (
          <div key={rowIndex} className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-800 mb-5 pl-1">
              {row.title}
            </h2>
            <div 
              className="flex overflow-x-auto gap-6 scroll-smooth pb-4 scrollbar-thin"
              onScroll={handleScroll}
            >
              {row.items.map((item, index) => (
                <Link
                  key={`${item.id}-${index}`}
                  href={`/product/${item.id}`}
                  aria-label={`${item.label} 상세 페이지로 이동`}
                  className="shrink-0 block"
                  style={{ width: getCardWidth() }}
                >

                  <div
                    className="
                      w-full h-full
                      bg-white rounded-2xl shadow-md
                      flex items-center justify-center
                      cursor-pointer
                      transition-all duration-200
                      overflow-hidden relative
                      hover:scale-[1.02] hover:shadow-lg
                    "
                    style={{ aspectRatio: '2 / 3' }}
                  >
                    {item.image ? (
                      <Image
                        src={item.image}
                        alt={item.label}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                    ) : (
                      <span
                        className={`font-light text-gray-800 ${
                          cardsPerView === 1 ? 'text-6xl' : 'text-7xl'
                        }`}
                      >
                        {item.label}
                      </span>
                    )}
                  </div>
                </Link>
              ))}

            </div>
          </div>
        ))}
      </main>
    </div>
  )
}
