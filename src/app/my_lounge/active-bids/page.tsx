'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

type ActiveBidItem = {
  id: string
  category: string
  designer: string
  thumb: string
  startedAt: number
}

const ACTIVE_BIDS_KEY = 'activeBids'

function readActiveBids(): ActiveBidItem[] {
  try {
    const raw = localStorage.getItem(ACTIVE_BIDS_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? (parsed as ActiveBidItem[]) : []
  } catch {
    return []
  }
}

export default function ActiveBidsPage() {
  const [items, setItems] = useState<ActiveBidItem[]>([])

  useEffect(() => {
    setItems(readActiveBids())

    // 다른 탭/창에서 localStorage 변경 시 반영
    const onStorage = (e: StorageEvent) => {
      if (e.key === ACTIVE_BIDS_KEY) setItems(readActiveBids())
    }
    window.addEventListener('storage', onStorage)
    return () => window.removeEventListener('storage', onStorage)
  }, [])

  const sorted = useMemo(() => {
    return [...items].sort((a, b) => b.startedAt - a.startedAt)
  }, [items])

  return (
    <div className="w-full">
      <h2 className="text-xl font-semibold mb-6">Active Bids</h2>

      {sorted.length === 0 ? (
        <div className="text-sm text-gray-500">
          아직 진행 중인 경매가 없습니다.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sorted.map((bid) => (
            <Link
              key={bid.id}
              href={`/product/${bid.id}`}
              className="block bg-white border border-gray-200 shadow-sm hover:shadow-md transition"
            >
              <div className="relative w-full" style={{ aspectRatio: '3 / 4' }}>
                <Image
                  src={bid.thumb}
                  alt={bid.id}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>

              <div className="p-4">
                <div className="text-sm text-gray-700">{bid.category}</div>
                <div className="text-xs text-gray-500 mt-1">
                  designed by {bid.designer}
                </div>
                <div className="text-[11px] text-gray-400 mt-2">
                  started {new Date(bid.startedAt).toLocaleString()}
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}