'use client'

import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { useState, useRef } from 'react'

export default function ProductPage({ params }: { params: { id: string } }) {

    /* ---------------- 상품 메타 ---------------- */
    const productMeta: Record<
        string,
        { designer: string; category: string }
    > = {
        a1: { designer: 'Designer A', category: 'Outer' },
        a2: { designer: 'Designer A', category: 'Top' },
        b1: { designer: 'Designer B', category: 'Dress' },
    }

    const designer =
        productMeta[params.id]?.designer ?? 'Unknown Designer'
    const category =
        productMeta[params.id]?.category ?? 'ETC'

    const router = useRouter()
    const scrollRef = useRef<HTMLDivElement | null>(null)

    /* ---------------- 상태 ---------------- */
    const [value, setValue] = useState('')
    const [logs, setLogs] = useState<number[]>([
        180000, 130000, 110000, 90000, 48000,
    ])
    const [expanded, setExpanded] = useState(false)
    const [error, setError] = useState('')

    const maxLog =
        logs.length > 0 ? Math.max(...logs) : 0

    /* ---------------- 유틸 ---------------- */
    const formatNumber = (num: string) =>
        num.replace(/\B(?=(\d{3})+(?!\d))/g, ',')

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const onlyNumber =
            e.target.value.replace(/[^\d]/g, '')
        setValue(formatNumber(onlyNumber))
        setError('')
    }

    const handleAddLog = () => {
        if (!value) return

        const rawNumber =
            Number(value.replaceAll(',', ''))

        if (rawNumber <= maxLog) {
            setError(
                `입력값은 ${maxLog.toLocaleString()} 보다 커야 합니다.`
            )
            return
        }

        setLogs((prev) => [rawNumber, ...prev])
        setValue('')
        setError('')
    }

    const handleHorizontalScroll = () => {
        if (!scrollRef.current) return

        const el = scrollRef.current
        const maxScroll =
            el.scrollWidth - el.clientWidth
        const current = el.scrollLeft

        if (current <= 10 || current >= maxScroll - 10) {
            el.scrollLeft = maxScroll / 3
        }
    }

    /* ---------------- 이미지 ---------------- */
    const images = [
        '/logo/Griid_Brand_Logo_Toolkit/IG_Feed_WH/Griid_IG_Feed_Left_WH.png',
        '/logo/Griid_Brand_Logo_Toolkit/IG_Feed_WH/Griid_IG_Feed_Center_WH.png',
        '/logo/Griid_Brand_Logo_Toolkit/IG_Feed_WH/Griid_IG_Feed_Right_WH.png',
    ]

    const infiniteImages = [
        ...images,
        ...images,
        ...images,
    ]

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* 배경 */}
            <div className="absolute inset-0 bg-black/30 backdrop-blur-md" />

            {/* 카드 */}
            <div className="
                relative z-10
                w-full max-w-4xl
                bg-white rounded-none border border-gray-200 shadow-none
                max-h-[85vh]
                flex flex-col
            ">
                {/* 헤더 */}
                <div className="flex items-center justify-between p-6 border-b">
                    <h1 className="text-2xl font-semibold">
                        Product {params.id}
                    </h1>
                    <button
                        onClick={() => router.back()}
                        className="
                            w-8 h-8
                            flex items-center justify-center
                            rounded-full
                            text-gray-500
                            hover:bg-gray-100
                        "
                    >
                        ✕
                    </button>
                </div>

                {/* 스크롤 영역 */}
                <div className="flex-1 overflow-y-auto">

                    {/* 이미지 무한 스크롤 */}
                    <div
                        ref={scrollRef}
                        onScroll={handleHorizontalScroll}
                        className="
                            flex gap-4
                            overflow-x-auto
                            px-6 py-6
                            scroll-smooth
                        "
                    >
                        {infiniteImages.map((src, idx) => (
                            <div
                                key={idx}
                                className="
                                    relative
                                    w-64 h-64
                                    shrink-0
                                    rounded-xl
                                    overflow-hidden
                                    bg-gray-100
                                "
                            >
                                <Image
                                    src={src}
                                    alt=""
                                    fill
                                    className="object-cover"
                                />
                            </div>
                        ))}
                    </div>

                    {/* 카테고리 / 디자이너 메타 */}
                    <div className="px-6 -mt-2 mb-6">
                        <div className="flex items-center justify-between text-sm">

                            {/* Category */}
                            <button
                                onClick={() =>
                                    router.push(
                                        `/collections?category=${encodeURIComponent(category)}`
                                    )
                                }
                                className="
                                    text-gray-500
                                    hover:text-gray-800
                                    transition
                                "
                            >
                                {category}
                            </button>

                            {/* Designer */}
                            <button
                                onClick={() =>
                                    router.push(
                                        `/collections?designer=${encodeURIComponent(designer)}`
                                    )
                                }
                                className="
                                    text-gray-600
                                    hover:text-gray-900
                                    no-underline
                                    hover:no-underline
                                    transition
                                "
                            >
                                Designed by {designer}
                            </button>
                        </div>
                    </div>

                    {/* 숫자 입력 */}
                    <div className="px-6 mb-2 flex flex-col gap-2">
                        <div className="flex gap-3">
                            <input
                                type="text"
                                value={value}
                                onChange={handleChange}
                                placeholder={`₩ ${maxLog.toLocaleString()} 보다 큰 금액 입력`}
                                className={`
                                    flex-1
                                    border rounded-lg
                                    px-4 py-2
                                    focus:outline-none
                                    ${error ? 'border-red-400' : 'border-gray-300'}
                                `}
                            />
                            <button
                                onClick={handleAddLog}
                                className="
                                    px-4 py-2
                                    bg-gray-800 text-white
                                    rounded-lg
                                    hover:bg-gray-700
                                "
                            >
                                입력
                            </button>
                        </div>

                        {error && (
                            <p className="text-sm text-red-500">
                                {error}
                            </p>
                        )}
                    </div>

                    {/* 기록 리스트 */}
                    <div className="px-6 mb-6">
                        <div className={`
                            relative group
                            border rounded-xl
                            bg-gray-50
                            transition-all duration-300
                            ${expanded ? 'max-h-48' : 'max-h-24'}
                            overflow-hidden
                        `}>
                            <div className="p-4 overflow-y-auto">
                                <ul className="space-y-2 text-sm text-gray-700">
                                    {logs.map((n, i) => (
                                        <li
                                            key={i}
                                            className="flex justify-between"
                                        >
                                            <span>
                                                Log {logs.length - i}
                                            </span>
                                            <span className="font-medium">
                                                {n.toLocaleString()}
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {logs.length > 4 && (
                                <button
                                    onClick={() =>
                                        setExpanded((p) => !p)
                                    }
                                    className="
                                        absolute bottom-2
                                        left-1/2 -translate-x-1/2
                                        text-xs text-gray-500
                                        bg-white/80 backdrop-blur
                                        px-3 py-1
                                        rounded-full
                                        shadow-sm
                                        opacity-0
                                        group-hover:opacity-100
                                        hover:text-gray-800
                                    "
                                >
                                    {expanded
                                        ? 'Collapse ▲'
                                        : 'Expand ▼'}
                                </button>
                            )}
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}
