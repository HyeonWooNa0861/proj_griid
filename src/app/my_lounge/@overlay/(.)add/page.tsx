'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

export default function CreateProductOverlay() {
  const router = useRouter()

  const [formData, setFormData] = useState({
    title: '',
    category: '',
    description: '',
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

  const handleSubmit = async () => {
    alert('제품이 등록되었습니다!')
    router.back()
  }

  const handleSaveDraft = () => {
    alert('임시저장되었습니다!')
  }

  return (
    /* 🔹 Overlay background */
    <div
      className="
        fixed inset-0 z-[2000]
        bg-black/40 backdrop-blur-sm
        flex items-center justify-center
      "
      onClick={() => router.back()}
    >
      {/* 🔹 Card */}
      <div
        className="
          bg-white
          w-full max-w-[800px]
          max-h-[90vh]
          overflow-y-auto
          shadow-xl
          border border-gray-200
        "
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-10 py-8 border-b flex justify-between items-center">
          <h1 className="text-2xl font-semibold">제품 등록</h1>
          <button
            onClick={() => router.back()}
            className="w-8 h-8 flex items-center justify-center hover:bg-gray-100"
          >
            ✕
          </button>
        </div>

        {/* Content */}
        <div className="p-10 space-y-8">
          {/* Image upload */}
          <div>
            <p className="text-sm font-semibold mb-3">제품 사진</p>
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
              className="
                block w-full
                border-2 border-dashed border-gray-300
                p-20 text-center
                cursor-pointer
                hover:border-gray-400
              "
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
                      className="
                        absolute top-2 right-2
                        w-7 h-7
                        bg-black text-white
                      "
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
            <p className="text-sm font-semibold mb-2">제목</p>
            <input
              className="w-full border px-4 py-3"
              placeholder="제품명"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
            />
          </div>

          {/* Category */}
          <div>
            <p className="text-sm font-semibold mb-2">카테고리</p>
            <select
              className="w-full border px-4 py-3"
              value={formData.category}
              onChange={(e) =>
                setFormData({ ...formData, category: e.target.value })
              }
            >
              <option value="">선택</option>
              <option value="top">Top</option>
              <option value="outer">Outer</option>
              <option value="dress">Dress</option>
              <option value="acc">Acc</option>
            </select>
          </div>

          {/* Description */}
          <div>
            <p className="text-sm font-semibold mb-2">설명</p>
            <textarea
              className="w-full border px-4 py-3 min-h-[120px]"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
            />
          </div>
        </div>

        {/* Footer */}
        <div className="px-10 py-6 border-t flex justify-end gap-3">
          <button
            onClick={handleSaveDraft}
            className="px-6 py-3 bg-gray-100"
          >
            임시저장
          </button>
          <button
            onClick={handleSubmit}
            className="px-6 py-3 bg-black text-white"
          >
            등록하기
          </button>
        </div>
      </div>
    </div>
  )
}
