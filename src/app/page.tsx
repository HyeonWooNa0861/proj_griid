// Home

'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Header from '@/components/Header'
import Link from 'next/link'

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

  const createCardData = (prefix: string) => {
    return Array.from({ length: 6 }, (_, i) => ({
      id: `${prefix}${i + 1}`,
      label: `${prefix}${i + 1}`,
      image: null
    }))
  }

  const createInfiniteArray = (prefix: string) => {
    const items = createCardData(prefix)
    return [...items, ...items, ...items] // 무한 루프를 위해 3번 반복
  }

  const rows = [
    { title: 'Featured Collection', items: createInfiniteArray('F') },
    { title: 'Gallery Series', items: createInfiniteArray('G') },
    { title: 'Highlights', items: createInfiniteArray('H') },
    { title: 'Inspirations', items: createInfiniteArray('I') },
    { title: 'Journal', items: createInfiniteArray('J') },
  ]

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
                >

                  <div
                    className="
                      bg-white rounded-2xl shadow-md
                      flex items-center justify-center
                      cursor-pointer
                      transition-all duration-200
                      overflow-hidden relative
                      hover:scale-[1.02] hover:shadow-lg
                    "
                    style={{ minWidth: getCardWidth(), aspectRatio: '1' }}
                  >
                    {item.image ? (
                      <Image
                        src={item.image}
                        alt={item.label}
                        fill
                        className="object-cover"
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
