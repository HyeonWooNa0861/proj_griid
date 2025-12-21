'use client'

import Image from 'next/image'
import Link from 'next/link'
import Header from '@/components/Header'
import { useRef } from 'react'

/* ---------------- 더미 이미지 ---------------- */

const images = [
    '/logo/Griid_Brand_Logo_Toolkit/IG_Feed_WH/Griid_IG_Feed_Left_WH.png',
    '/logo/Griid_Brand_Logo_Toolkit/IG_Feed_WH/Griid_IG_Feed_Center_WH.png',
    '/logo/Griid_Brand_Logo_Toolkit/IG_Feed_WH/Griid_IG_Feed_Right_WH.png',
]

/* ---------------- 섹션 정의 ---------------- */

const sections = [
    { key: 'active', title: 'Active Bids', items: images },
    { key: 'completed', title: 'Completed Bids', items: [] },
    { key: 'products', title: 'My Products', items: images },
    { key: 'watchlist', title: 'Watchlist', items: [] },
]

/* ---------------- 페이지 ---------------- */

export default function MyLoungePage() {
    return (
        <div className="min-h-screen bg-gray-50 pt-20 pb-16">
            <Header />

            <main className="max-w-7xl mx-auto px-6">

                {/* 상단 타이틀 */}
                <div className="flex items-center justify-between mb-16">
                    <h1 className="text-3xl font-semibold text-gray-900">
                        My Lounge
                    </h1>

                    <Link
                        href="/lounge/settings/password"
                        className="
                            px-4 py-2
                            text-sm
                            border border-gray-300
                            text-gray-600
                            hover:bg-gray-100
                            transition
                        "
                    >
                        Settings
                    </Link>
                </div>

                {/* 섹션들 */}
                <div className="space-y-20">
                    {sections.map((section) => (
                        <LoungeSection
                            key={section.key}
                            title={section.title}
                            images={section.items}
                        />
                    ))}
                </div>

            </main>
        </div>
    )
}

/* ---------------- 섹션 컴포넌트 ---------------- */

function LoungeSection({
    title,
    images,
}: {
    title: string
    images: string[]
}) {
    const scrollRef = useRef<HTMLDivElement | null>(null)

    /* 🔴 비어있으면 자동 숨김 */
    if (images.length === 0) {
        return (
            <section>
                <h2 className="text-xl font-medium text-gray-800 mb-4">
                    {title}
                </h2>
                <p className="text-sm text-gray-400 italic">
                    자동으로 숨김처리됨
                </p>
            </section>
        )
    }

    const infiniteImages = [...images, ...images, ...images]

    const handleScroll = () => {
        if (!scrollRef.current) return
        const el = scrollRef.current
        const maxScroll = el.scrollWidth - el.clientWidth
        const current = el.scrollLeft

        if (current <= 10 || current >= maxScroll - 10) {
            el.scrollLeft = maxScroll / 3
        }
    }

    return (
        <section>
            <h2 className="text-xl font-medium text-gray-800 mb-6">
                {title}
            </h2>

            <div
                ref={scrollRef}
                onScroll={handleScroll}
                className="flex gap-6 overflow-x-auto scroll-smooth pb-2"
            >
                {infiniteImages.map((src, idx) => (
                    <Link
                        key={idx}
                        href={`/product/${title}-${idx}`}
                        className="shrink-0"
                    >
                        <div
                            className="
                                relative
                                w-64 h-64
                                bg-gray-100
                                border border-gray-200
                                overflow-hidden
                                transition
                                hover:border-gray-400
                            "
                        >
                            <Image
                                src={src}
                                alt=""
                                fill
                                className="object-cover"
                            />
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    )
}
//마이 라운지 페이지