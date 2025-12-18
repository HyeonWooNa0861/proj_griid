// Home

'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Header from '@/components/Header'

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
      // image: i < 3 ? `/images/${prefix}${i + 1}.jpg` : null,
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

  const mainStyle = {
    width: '100%',
    minHeight: '100vh',
    backgroundColor: '#f9fafb',
    paddingTop: '80px',
    paddingBottom: '48px',
  }

  const containerStyle = {
    maxWidth: '1280px',
    margin: '0 auto',
    padding: '0 24px',
  }

  const rowStyle = {
    marginBottom: '48px',
  }

  const rowTitleStyle = {
    fontSize: '24px',
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: '20px',
    paddingLeft: '4px',
  }

  const scrollContainerStyle = {
    display: 'flex',
    overflowX: 'auto',
    gap: '24px',
    scrollBehavior: 'smooth' as const,
    paddingBottom: '16px',
    scrollbarWidth: 'thin' as const,
  }

  const getCardWidth = () => {
    const gap = 24 * (cardsPerView - 1)
    return `calc((100% - ${gap}px) / ${cardsPerView})`
  }

  const cardStyle = {
    minWidth: getCardWidth(),
    aspectRatio: '1',
    backgroundColor: 'white',
    borderRadius: '16px',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    cursor: 'pointer',
    transition: 'transform 0.2s, box-shadow 0.2s',
    overflow: 'hidden',
    position: 'relative' as const,
  }

  const imageStyle = {
    width: '100%',
    height: '100%',
    objectFit: 'cover' as const,
  }

  const textStyle = {
    fontSize: cardsPerView === 1 ? '64px' : '72px',
    fontWeight: '300',
    color: '#1f2937',
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
    <div style={mainStyle}>
      <Header />
      <main style={containerStyle}>
        {rows.map((row, rowIndex) => (
          <div key={rowIndex} style={rowStyle}>
            <h2 style={rowTitleStyle}>{row.title}</h2>
            <div 
              style={scrollContainerStyle}
              onScroll={handleScroll}
            >
              {row.items.map((item, index) => (
                <div 
                  key={`${item.id}-${index}`} 
                  style={cardStyle}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'scale(1.02)'
                    e.currentTarget.style.boxShadow = '0 10px 15px rgba(0,0,0,0.15)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'scale(1)'
                    e.currentTarget.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)'
                  }}
                  onClick={() => console.log(`Clicked: ${item.id}`)}
                >
                  {/* 이미지가 있으면 이미지 표시, 없으면 텍스트 표시 */}
                  {item.image ? (
                    <Image 
                      src={item.image} 
                      alt={item.label}
                      fill
                      style={imageStyle}
                      sizes={getCardWidth()}
                    />
                  ) : (
                    <span style={textStyle}>{item.label}</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </main>

      <style jsx global>{`
        div::-webkit-scrollbar {
          height: 6px;
        }
        div::-webkit-scrollbar-track {
          background: transparent;
        }
        div::-webkit-scrollbar-thumb {
          background: #d1d5db;
          border-radius: 10px;
        }
        div::-webkit-scrollbar-thumb:hover {
          background: #9ca3af;
        }
      `}</style>
    </div>
  )
}