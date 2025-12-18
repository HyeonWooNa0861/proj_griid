'use client'

import Header from '@/components/Header'

export default function AboutPage() {
  return (
    <div
      style={{
        width: '100%',
        minHeight: '100vh',
        backgroundColor: '#f9fafb',
        paddingTop: '80px',
        paddingBottom: '48px',
      }}
    >
      <Header />

      <main
        style={{
          maxWidth: '800px',
          margin: '0 auto',
          padding: '0 24px',
        }}
      >
        <h1
          style={{
            fontSize: '28px',
            fontWeight: '600',
            color: '#1f2937',
            marginBottom: '24px',
          }}
        >
          About gri:d
        </h1>

        <p
          style={{
            fontSize: '16px',
            lineHeight: 1.7,
            color: '#374151',
            marginBottom: '16px',
          }}
        >
          gri:d는 창작자와 컬렉터를 연결하는 큐레이션 기반 플랫폼입니다.
        </p>

        <p
          style={{
            fontSize: '16px',
            lineHeight: 1.7,
            color: '#374151',
          }}
        >
          우리는 작품 그 자체에 집중할 수 있는 미니멀한 환경을 제공하며,
          디자인과 스토리가 자연스럽게 전달되는 경험을 지향합니다.
        </p>
      </main>
    </div>
  )
}