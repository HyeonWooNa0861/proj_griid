'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { use } from 'react'

interface OrderData {
  orderId: string
  productId: string
  productImage: string
  designer: string
  category: string
  finalPrice: number
  secondPrice: number
  status: 'pending' | 'completed' | 'expired'
  expiresAt: string
}

// 개발 환경에서 Mock 데이터 사용
const MOCK_ORDER_DATA: OrderData = {
  orderId: 'test-order-123',
  productId: 'a1',
  productImage: '/logo/Griid_Brand_Logo_Toolkit/IG_Feed_WH/Griid_IG_Feed_Left_WH.png',
  designer: 'Designer A',
  category: 'Outer',
  finalPrice: 180000,
  secondPrice: 130000,
  status: 'pending',
  expiresAt: new Date(Date.now() + 48 * 60 * 60 * 1000).toISOString(),
}

export default function PaymentPage({
  params,
}: {
  params: Promise<{ orderId: string }>
}) {
  // params를 unwrap
  const unwrappedParams = use(params)
  const router = useRouter()
  const [orderData, setOrderData] = useState<OrderData | null>(null)
  const [loading, setLoading] = useState(true)
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    detailedAddress: '',
    zipCode: '',
    specialRequest: '',
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    // 주문 정보 가져오기
    const fetchOrderData = async () => {
      try {
        // 개발 환경에서는 Mock 데이터 사용
        if (process.env.NODE_ENV === 'development' && unwrappedParams.orderId.startsWith('test-')) {
          setOrderData(MOCK_ORDER_DATA)
          setLoading(false)
          return
        }

        // 실제 API 호출
        const response = await fetch(`/api/orders/${unwrappedParams.orderId}`)
        if (!response.ok) {
          throw new Error('주문을 찾을 수 없습니다.')
        }
        const data = await response.json()
        setOrderData(data)
      } catch (error) {
        alert('주문 정보를 불러오는데 실패했습니다.')
        router.push('/')
      } finally {
        setLoading(false)
      }
    }

    fetchOrderData()
  }, [unwrappedParams.orderId, router])

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target

    if (name === 'specialRequest' && value.length > 100) {
      return
    }

    if (name === 'phone') {
      const onlyNumbers = value.replace(/[^\d]/g, '')
      let formatted = onlyNumbers

      if (onlyNumbers.length <= 3) {
        formatted = onlyNumbers
      } else if (onlyNumbers.length <= 7) {
        formatted = `${onlyNumbers.slice(0, 3)}-${onlyNumbers.slice(3)}`
      } else if (onlyNumbers.length <= 11) {
        formatted = `${onlyNumbers.slice(0, 3)}-${onlyNumbers.slice(
          3,
          7
        )}-${onlyNumbers.slice(7)}`
      }

      setFormData((prev) => ({ ...prev, [name]: formatted }))
      return
    }

    setFormData((prev) => ({ ...prev, [name]: value }))

    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) {
      newErrors.name = '이름을 입력해주세요.'
    }

    if (!formData.phone.trim()) {
      newErrors.phone = '연락처를 입력해주세요.'
    } else if (!/^\d{3}-\d{3,4}-\d{4}$/.test(formData.phone)) {
      newErrors.phone = '올바른 연락처 형식이 아닙니다.'
    }

    if (!formData.zipCode.trim()) {
      newErrors.zipCode = '우편번호를 입력해주세요.'
    }

    if (!formData.address.trim()) {
      newErrors.address = '주소를 입력해주세요.'
    }

    if (!formData.detailedAddress.trim()) {
      newErrors.detailedAddress = '상세주소를 입력해주세요.'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async () => {
    if (!validateForm() || !orderData) return

    setIsSubmitting(true)

    try {
      const response = await fetch('/api/complete-payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          orderId: unwrappedParams.orderId,
          buyer: formData,
        }),
      })

      if (!response.ok) {
        throw new Error('결제 처리에 실패했습니다.')
      }

      alert('결제가 완료되었습니다!')
      router.push('/payment/success')
    } catch (error) {
      alert('결제 처리 중 오류가 발생했습니다.')
      console.error(error)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-4 text-gray-600">주문 정보를 불러오는 중...</p>
        </div>
      </div>
    )
  }

  if (!orderData) {
    return null
  }

  if (orderData.status === 'completed') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <p className="text-xl font-medium text-gray-900">
            이미 완료된 주문입니다.
          </p>
          <button
            onClick={() => router.push('/')}
            className="mt-4 px-6 py-2 bg-gray-900 text-white hover:bg-gray-800"
          >
            홈으로 돌아가기
          </button>
        </div>
      </div>
    )
  }

  if (orderData.status === 'expired') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <p className="text-xl font-medium text-gray-900">
            결제 기간이 만료되었습니다.
          </p>
          <button
            onClick={() => router.push('/')}
            className="mt-4 px-6 py-2 bg-gray-900 text-white hover:bg-gray-800"
          >
            홈으로 돌아가기
          </button>
        </div>
      </div>
    )
  }

  const inputClass = `
    w-full border px-3 py-2.5 text-sm
    focus:outline-none focus:border-gray-900
    transition-colors
  `

  const labelClass = 'text-sm font-medium text-gray-700 mb-1.5'

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-2xl mx-auto px-4">
        <div className="bg-white border border-gray-200 shadow-sm">
          {/* 헤더 */}
          <div className="px-8 py-6 border-b border-gray-200">
            <h1 className="text-2xl font-semibold text-gray-900 text-center">
              gri:d
            </h1>
            <p className="text-center text-sm text-gray-500 mt-2">
              낙찰 축하드립니다! 결제 정보를 입력해주세요
            </p>
          </div>

          {/* 주문 정보 요약 */}
          <div className="px-8 py-6 bg-gray-50 border-b border-gray-200">
            <div className="flex items-center gap-4">
              <div className="relative w-20 h-20 border border-gray-200 bg-white shrink-0">
                <Image
                  src={orderData.productImage}
                  alt="product"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-500">{orderData.category}</p>
                <p className="text-base font-medium text-gray-900">
                  Product {orderData.productId}
                </p>
                <p className="text-sm text-gray-600">
                  by {orderData.designer}
                </p>
              </div>
              <div className="text-right">
                <p className="text-lg font-semibold text-gray-900">
                  ₩ {orderData.secondPrice.toLocaleString()}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  (차순위 입찰가)
                </p>
              </div>
            </div>
          </div>

          {/* 폼 */}
          <div className="px-8 py-6">
            <div className="space-y-5">
              {/* 이름 */}
              <div>
                <label className={labelClass}>
                  이름 <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="홍길동"
                  className={`${inputClass} ${
                    errors.name ? 'border-red-400' : 'border-gray-300'
                  }`}
                />
                {errors.name && (
                  <p className="text-xs text-red-500 mt-1">{errors.name}</p>
                )}
              </div>

              {/* 연락처 */}
              <div>
                <label className={labelClass}>
                  연락처 <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="010-1234-5678"
                  className={`${inputClass} ${
                    errors.phone ? 'border-red-400' : 'border-gray-300'
                  }`}
                />
                {errors.phone && (
                  <p className="text-xs text-red-500 mt-1">{errors.phone}</p>
                )}
              </div>

              {/* 우편번호 */}
              <div>
                <label className={labelClass}>
                  우편번호 <span className="text-red-500">*</span>
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    name="zipCode"
                    value={formData.zipCode}
                    onChange={handleChange}
                    placeholder="12345"
                    maxLength={5}
                    className={`${inputClass} ${
                      errors.zipCode ? 'border-red-400' : 'border-gray-300'
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => {
                      alert('우편번호 검색 기능 연동 필요')
                    }}
                    className="px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-sm font-medium whitespace-nowrap"
                  >
                    우편번호 찾기
                  </button>
                </div>
                {errors.zipCode && (
                  <p className="text-xs text-red-500 mt-1">{errors.zipCode}</p>
                )}
              </div>

              {/* 주소 */}
              <div>
                <label className={labelClass}>
                  주소 <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="서울특별시 강남구 테헤란로 123"
                  className={`${inputClass} ${
                    errors.address ? 'border-red-400' : 'border-gray-300'
                  }`}
                />
                {errors.address && (
                  <p className="text-xs text-red-500 mt-1">{errors.address}</p>
                )}
              </div>

              {/* 상세주소 */}
              <div>
                <label className={labelClass}>
                  상세주소 <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="detailedAddress"
                  value={formData.detailedAddress}
                  onChange={handleChange}
                  placeholder="아파트동/호수, 건물명, 층수 등"
                  className={`${inputClass} ${
                    errors.detailedAddress
                      ? 'border-red-400'
                      : 'border-gray-300'
                  }`}
                />
                {errors.detailedAddress && (
                  <p className="text-xs text-red-500 mt-1">
                    {errors.detailedAddress}
                  </p>
                )}
              </div>

              {/* 배송 요청사항 */}
              <div>
                <label className={labelClass}>
                  배송 요청사항{' '}
                  <span className="text-gray-400 text-xs font-normal">
                    (선택, 최대 100자)
                  </span>
                </label>
                <textarea
                  name="specialRequest"
                  value={formData.specialRequest}
                  onChange={handleChange}
                  placeholder="예: 부재 시 경비실에 맡겨주세요"
                  rows={3}
                  className={`${inputClass} border-gray-300 resize-none`}
                />
                <p className="text-xs text-gray-500 mt-1 text-right">
                  {formData.specialRequest.length}/100
                </p>
              </div>
            </div>
          </div>

          {/* 푸터 */}
          <div className="px-8 py-6 border-t border-gray-200">
            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="w-full px-6 py-4 bg-gray-900 text-white font-semibold text-lg hover:bg-gray-800 disabled:bg-gray-400"
            >
              {isSubmitting
                ? '처리 중...'
                : `₩ ${orderData.secondPrice.toLocaleString()} 결제하기`}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}