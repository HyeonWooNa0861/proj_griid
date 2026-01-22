'use client'

import { useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

export default function CreateProductOverlay() {
  const router = useRouter()

  const cardClass =
    'bg-white w-full max-w-[800px] max-h-[90vh] overflow-y-auto rounded-none border border-gray-200 shadow-none'
  const labelClass = 'text-sm font-medium text-gray-700 mb-1'
  const inputClass =
    'w-full border border-gray-300 px-3 py-2 text-black focus:outline-none focus:border-gray-500'
  const selectClass =
    'w-full border border-gray-300 px-3 py-2 text-black focus:outline-none focus:border-gray-500 bg-white'
  const textareaClass =
    'w-full border border-gray-300 px-3 py-2 text-black focus:outline-none focus:border-gray-500 placeholder:text-gray-400'
  const sectionTitleClass = 'text-sm font-semibold text-gray-800'

  const [formData, setFormData] = useState({
    title: '',
    category: '',
    description: '',

    startPrice: '',
    buyNowPrice: '',
    bidUnit: '',
    endAt: '',
  })

  const [images, setImages] = useState<File[]>([])
  const [imagePreviews, setImagePreviews] = useState<string[]>([])

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    setImages(prev => [...prev, ...files])

    files.forEach(file => {
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreviews(prev => [...prev, reader.result as string])
      }
      reader.readAsDataURL(file)
    })
  }

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index))
    setImagePreviews(prev => prev.filter((_, i) => i !== index))
  }

  // 숫자 입력(원) 안전 처리: 숫자만 허용
  const onlyDigits = (v: string) => v.replace(/[^\d]/g, '')

  const startPriceNum = useMemo(
    () => (formData.startPrice ? Number(formData.startPrice) : 0),
    [formData.startPrice]
  )
  const buyNowPriceNum = useMemo(
    () => (formData.buyNowPrice ? Number(formData.buyNowPrice) : 0),
    [formData.buyNowPrice]
  )

  // 간단 검증 (프론트 단계)
  const isValid = useMemo(() => {
    if (!formData.title.trim()) return false
    if (!formData.category) return false
    if (formData.description.trim().length < 10) return false
    if (!formData.startPrice || Number(formData.startPrice) <= 0) return false
    if (!formData.bidUnit || Number(formData.bidUnit) <= 0) return false
    if (!formData.endAt) return false
    if (formData.buyNowPrice && buyNowPriceNum <= startPriceNum) return false // 즉시구매가 > 시작가 권장
    return true
  }, [
    formData.title,
    formData.category,
    formData.description,
    formData.startPrice,
    formData.buyNowPrice,
    formData.bidUnit,
    formData.endAt,
    buyNowPriceNum,
    startPriceNum,
  ])

  const handleSubmit = async () => {
    if (!isValid) {
      alert('필수 항목을 확인해 주세요. (설명 10자 이상, 경매 정보/상태 입력)')
      return
    }

    // TODO: 백엔드 연동 시 formData + images 전송
    alert('제품이 등록되었습니다!')
    router.back()
  }

  const handleSaveDraft = () => {
    alert('임시저장되었습니다!')
  }

  return (
    <div
      className="
        fixed inset-0 z-[2000]
        bg-black/40 backdrop-blur-sm
        flex items-center justify-center
      "
      onClick={() => router.back()}
    >
      <div
        className={cardClass}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="relative px-10 pt-10 pb-6">
          <div className="text-center">
            <h1 className="text-3xl font-semibold text-gray-800">gri:d</h1>
            <p className="text-sm text-gray-500 mt-2">Product Upload</p>
          </div>

          <button
            onClick={() => router.back()}
            className="absolute right-8 top-8 w-8 h-8 flex items-center justify-center hover:bg-gray-100"
            aria-label="close"
          >
            ✕
          </button>
        </div>

        {/* Content */}
        <div className="px-10 pb-10 flex flex-col gap-6">
          {/* Image upload */}
          <div>
            <p className={labelClass}>제품 사진 *</p>
            <input
              type="file"
              multiple
              accept="image/*"
              id="image-upload"
              className="hidden"
              onChange={handleImageUpload}
            />
            <label
              htmlFor="image-upload"
              className="block w-full border border-dashed border-gray-300 py-16 text-center cursor-pointer hover:border-gray-500 text-gray-700"
            >
              이미지 업로드
            </label>

            {imagePreviews.length > 0 && (
              <div className="grid grid-cols-4 gap-4 mt-6">
                {imagePreviews.map((src, idx) => (
                  <div key={idx} className="relative aspect-square border">
                    <Image src={src} alt="" fill className="object-cover" />
                    <button
                      onClick={() => removeImage(idx)}
                      className="absolute top-2 right-2 w-7 h-7 bg-black text-white"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Title */}
          <div>
            <p className={labelClass}>제목 *</p>
            <input
              className={inputClass}
              placeholder="제품명"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            />
          </div>

          {/* Category */}
          <div>
            <p className={labelClass}>카테고리 *</p>
            <select
              className={selectClass}
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            >
              <option value="">선택</option>
              <option value="top">Dress</option>
              <option value="top">Outer</option>
              <option value="top">Top</option>
              <option value="outer">Bottom</option>
              <option value="dress">Acc</option>
              <option value="acc">Craft</option>
              <option value="acc">Jewelry</option>
              <option value="acc">ETC</option>
            </select>
          </div>

          {/* 경매 정보 */}
          <div className="space-y-6">
            <p className={sectionTitleClass}>Auction</p>

            {/* 시작가 / 즉시구매가 (2열) */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className={labelClass}>경매 시작가 *</p>
                <input
                  className={inputClass}
                  inputMode="numeric"
                  placeholder="예: 10000"
                  value={formData.startPrice}
                  onChange={(e) =>
                    setFormData({ ...formData, startPrice: onlyDigits(e.target.value) })
                  }
                />
              </div>

              <div>
                <p className={labelClass}>즉시 구매가 (선택)</p>
                <input
                  className={inputClass}
                  inputMode="numeric"
                  placeholder="예: 50000 (시작가보다 높게)"
                  value={formData.buyNowPrice}
                  onChange={(e) =>
                    setFormData({ ...formData, buyNowPrice: onlyDigits(e.target.value) })
                  }
                />
                {formData.buyNowPrice && buyNowPriceNum <= startPriceNum && (
                  <p className="text-xs text-red-500 mt-1">
                    즉시 구매가는 경매 시작가보다 높게 설정하는 것을 권장합니다.
                  </p>
                )}
              </div>
            </div>

            {/* 입찰 단위 / 종료시간 (2열) */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className={labelClass}>입찰 단위 *</p>
                <input
                  className={inputClass}
                  inputMode="numeric"
                  placeholder="예: 1000"
                  value={formData.bidUnit}
                  onChange={(e) =>
                    setFormData({ ...formData, bidUnit: onlyDigits(e.target.value) })
                  }
                />
              </div>

              <div>
                <p className={labelClass}>경매 종료 시간 *</p>
                <input
                  type="datetime-local"
                  className={inputClass}
                  value={formData.endAt}
                  onChange={(e) => setFormData({ ...formData, endAt: e.target.value })}
                />
              </div>
            </div>
          </div>

          {/* Description */}
          <div>
            <p className={labelClass}>설명 *</p>
            <textarea
              className={`${textareaClass} min-h-[120px]`}
              placeholder="제품에 대한 설명을 작성해 주세요. (최소 10자)"
              maxLength={2000}
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
            />
            <p className="text-xs text-gray-500 mt-1">
              {formData.description.length} / 2000
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="px-10 py-8 flex justify-end gap-3">
          <button onClick={handleSaveDraft} className="px-6 py-2 border border-gray-300 text-gray-700 hover:bg-gray-50">
            임시저장
          </button>
          <button
            onClick={handleSubmit}
            className={`px-6 py-2 text-white ${
              isValid ? 'bg-gray-900' : 'bg-gray-900/40 cursor-not-allowed'
            }`}
            disabled={!isValid}
          >
            등록하기
          </button>
        </div>
      </div>
    </div>
  )
}