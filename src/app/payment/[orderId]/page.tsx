'use client'

import { useState } from 'react'
import { use } from 'react'
import Header from '@/components/Header'

export default function PaymentPage({
  params,
}: {
  params: Promise<{ orderId: string }>
}) {
  const resolvedParams = use(params)
  const { orderId } = resolvedParams

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    postalCode: '',
    address: '',
    detailAddress: '',
    deliveryRequest: '',
  })

  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // 필수 필드 검증
    if (
      !formData.name ||
      !formData.phone ||
      !formData.postalCode ||
      !formData.address ||
      !formData.detailAddress
    ) {
      alert('필수 항목을 모두 입력해주세요.')
      return
    }

    setSubmitting(true)

    try {
      // 여기에 실제 결제 처리 API 호출
      const response = await fetch('/api/submit-payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          orderId,
          ...formData,
        }),
      })

      if (response.ok) {
        setSubmitted(true)
      } else {
        alert('제출에 실패했습니다. 다시 시도해주세요.')
      }
    } catch (error) {
      console.error('Payment submission error:', error)
      alert('오류가 발생했습니다. 다시 시도해주세요.')
    } finally {
      setSubmitting(false)
    }
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20 pb-16">
        <Header />
        <main className="max-w-2xl mx-auto px-6">
          <div className="bg-white border border-gray-200 p-12 text-center">
            <div className="text-6xl mb-6">✅</div>
            <h1 className="text-2xl font-semibold text-gray-900 mb-4">
              결제 정보가 제출되었습니다
            </h1>
            <p className="text-gray-600 mb-8">
              입력하신 정보로 배송이 진행됩니다.
              <br />
              감사합니다.
            </p>
            <button
              onClick={() => (window.location.href = '/')}
              className="px-6 py-3 bg-black text-white text-sm font-semibold hover:bg-gray-800 transition-colors"
            >
              홈으로 돌아가기
            </button>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20 pb-16">
      <Header />

      <main className="max-w-2xl mx-auto px-6">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold text-gray-900 mb-2">
            결제 정보 입력
          </h1>
          <p className="text-sm text-gray-600">
            주문 번호: <span className="font-mono">{orderId}</span>
          </p>
        </div>

        <div className="bg-white border border-gray-200 p-8">
          <form onSubmit={handleSubmit}>
            {/* 이름 */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                이름 <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:border-black"
                placeholder="홍길동"
                required
              />
            </div>

            {/* 연락처 */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                연락처 <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:border-black"
                placeholder="010-1234-5678"
                required
              />
            </div>

            {/* 우편번호 */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                우편번호 <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="postalCode"
                value={formData.postalCode}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:border-black"
                placeholder="12345"
                required
              />
            </div>

            {/* 주소 */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                주소 <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:border-black"
                placeholder="서울특별시 강남구 테헤란로 123"
                required
              />
            </div>

            {/* 상세주소 */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                상세주소 <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="detailAddress"
                value={formData.detailAddress}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:border-black"
                placeholder="아파트동/호수, 건물명, 층수 등"
                required
              />
            </div>

            {/* 배송 요청사항 */}
            <div className="mb-8">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                배송 요청사항 (선택)
              </label>
              <textarea
                name="deliveryRequest"
                value={formData.deliveryRequest}
                onChange={handleChange}
                rows={4}
                maxLength={100}
                className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:border-black resize-none"
                placeholder="예: 부재 시 경비실에 맡겨주세요 (최대 100자)"
              />
              <p className="text-xs text-gray-500 mt-1">
                {formData.deliveryRequest.length}/100
              </p>
            </div>

            {/* 주의사항 */}
            <div className="bg-red-50 border border-red-200 p-4 mb-6">
              <p className="text-sm text-red-900 font-medium mb-1">
                ⚠️ 결제 기한 안내
              </p>
              <p className="text-xs text-red-800">
                낙찰 후 <strong>48시간 이내</strong>에 결제 정보를 입력하지
                않으시면 낙찰이 자동 취소됩니다.
              </p>
            </div>

            {/* 제출 버튼 */}
            <button
              type="submit"
              disabled={submitting}
              className="w-full py-4 bg-black text-white text-sm font-semibold hover:bg-gray-800 disabled:bg-gray-400 transition-colors"
            >
              {submitting ? '제출 중...' : '결제 정보 제출'}
            </button>
          </form>
        </div>
      </main>
    </div>
  )
}