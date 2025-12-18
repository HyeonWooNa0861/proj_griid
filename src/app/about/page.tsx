'use client'

import Header from '@/components/Header'

export default function AboutPage() {
  return (
    <div className="w-full min-h-screen bg-gray-50 pt-20 pb-12">
      <Header />

      <main className="max-w-3xl mx-auto px-6">
        <h1 className="text-[28px] font-semibold text-gray-800 mb-6">
          About gri:d
        </h1>

        <p className="text-base leading-relaxed text-gray-700 mb-4">
          gri:d는 창작자와 컬렉터를 연결하는 큐레이션 기반 플랫폼입니다.
        </p>

        <p className="text-base leading-relaxed text-gray-700">
          우리는 작품 그 자체에 집중할 수 있는 미니멀한 환경을 제공하며,
          디자인과 스토리가 자연스럽게 전달되는 경험을 지향합니다.
        </p>
      </main>
    </div>
  )
}
