'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Header from '@/components/Header'
import Link from 'next/link'

/* ---------------- 타입 ---------------- */

type CardItem = {
    id: string
    label: string
    image: string | null
}

type RowConfig = {
    title: string
    items: Array<{
        id: string
        image: string
    }>
}

/* ---------------- 데이터 ---------------- */

const ROW_CONFIG: Record<string, RowConfig> = {
    Clothes_List: {
        title: 'Clothes',
        items: [
            { id: 'F1', image: '/image/dress/001.jpeg' },
            { id: 'F2', image: '/image/dress/002.jpeg' },
            { id: 'F3', image: '/image/dress/003.jpeg' },
            { id: 'F4', image: '/image/dress/004.jpeg' },
            { id: 'F5', image: '/image/outer/001.jpeg' },
            { id: 'F6', image: '/image/outer/002.jpeg' },
            { id: 'F7', image: '/image/outer/003.jpeg' },
            { id: 'F8', image: '/image/outer/004.jpeg' },
            { id: 'F9', image: '/image/outer/005.jpeg' },
            { id: 'F10', image: '/image/outer/006.jpeg' },
            { id: 'F11', image: '/image/outer/007.jpeg' },
        ],
    },

    Acc_List: {
        title: 'Acc',
        items: [
            { id: 'G1', image: '/image/hat/001.jpeg' },
            { id: 'G2', image: '/image/hat/002.jpeg' },
            { id: 'G3', image: '/image/hat/003.jpeg' },
            { id: 'G4', image: '/image/bag/001.jpeg' },
            { id: 'G5', image: '/image/bag/002.jpeg' },
            { id: 'G6', image: '/image/bag/003.jpeg' },
            { id: 'G7', image: '/image/shoes/001.jpeg' },
            { id: 'G8', image: '/image/shoes/002.jpeg' },
            { id: 'G9', image: '/image/shoes/003.jpeg' },
        ],
    },

    Jewelry_List: {
        title: 'Jewelry',
        items: [
            { id: 'H1', image: '/image/jewelry/001.jpeg' },
            { id: 'H2', image: '/image/jewelry/002.jpeg' },
            { id: 'H3', image: '/image/jewelry/003.jpeg' },
        ],
    },

    Object_List: {
        title: 'Object',
        items: [
            { id: 'I1', image: '/image/object/001.jpeg' },
            { id: 'I2', image: '/image/object/002.jpeg' },
            { id: 'I3', image: '/image/object/003.jpeg' },
            { id: 'I4', image: '/image/object/004.jpeg' },
        ],
    },

    Others_List: {
        title: 'Others',
        items: [
            { id: 'J1', image: '/image/object/001.jpeg' },
            { id: 'J2', image: '/image/object/002.jpeg' },
            { id: 'J3', image: '/image/object/003.jpeg' },
            { id: 'J4', image: '/image/object/004.jpeg' },
        ],
    },
}

const ROW_ORDER = [
    'Clothes_List',
    'Acc_List',
    'Jewelry_List',
    'Object_List',
    'Others_List',
] as const

/* ---------------- 컴포넌트 ---------------- */

export default function Home() {
    const [cardsPerView, setCardsPerView] = useState(3)

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

    const rows = ROW_ORDER.map((key) => {
        const config = ROW_CONFIG[key]

        const normalized: CardItem[] = config.items.map((item) => ({
            id: item.id,
            label: item.id,
            image: item.image,
        }))

        return {
            title: config.title,
            items: normalized, 
        }
    })

    const getCardWidth = () => {
        const gap = 24 * (cardsPerView - 1)
        return `calc((100% - ${gap}px) / ${cardsPerView})`
    }

    return (
        <div className="w-full min-h-screen bg-gray-50 pt-20 pb-12">
            <Header />

            <main className="max-w-7xl mx-auto px-6">
                {rows.map((row, rowIndex) => (
                    <section key={rowIndex} className="mb-14">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-5">
                            {row.title}
                        </h2>

                        <div
                            className="
                              flex gap-6 
                              overflow-x-scroll
                              overflow-y-hidden
                              scroll-smooth 
                              pb-4
                              scrollbar-hide
                            "
                        >
                            {row.items.map((item, index) => (
                                <Link
                                    key={`${item.id}-${index}`}
                                    href={`/product/${item.id}`}
                                    className="shrink-0 block"
                                    style={{ width: getCardWidth() }}
                                >
                                    <div
                                        className="
                                            relative
                                            bg-white rounded-none
                                            shadow-md
                                            overflow-hidden
                                            transition-all duration-200
                                            hover:scale-[1.02]
                                            hover:shadow-lg
                                        "
                                        style={{ aspectRatio: '2 / 3' }}
                                    >
                                        {item.image && (
                                            <Image
                                                src={item.image}
                                                alt={item.label}
                                                fill
                                                className="object-cover"
                                                sizes="(max-width: 768px) 100vw,
                                                       (max-width: 1024px) 50vw,
                                                       33vw"
                                            />
                                        )}
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </section>
                ))}
            </main>
        </div>
    )
}