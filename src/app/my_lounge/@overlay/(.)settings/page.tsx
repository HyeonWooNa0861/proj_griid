'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

const EyeIcon = ({ active }: { active: boolean }) => (
  <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        className={`
            w-5 h-5
            transition-all duration-300
            ${active ? 'text-gray-700' : 'text-gray-400'}
        `}
    >
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M2.036 12.322a1.012 1.012 0 010-.639
            C3.423 7.51 7.36 4.5 12 4.5
            c4.638 0 8.573 3.007 9.963 7.178
            .07.207.07.431 0 .639
            C20.577 16.49 16.64 19.5 12 19.5
            c-4.638 0-8.573-3.007-9.963-7.178z"
        />
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
        />
    </svg>
)

export default function LoungeSettingsModal() {
  const router = useRouter()
  const [showPw, setShowPw] = useState(false)
  const [hovered, setHovered] = useState(false)

  const [formData, setFormData] = useState({
    id: 'user123',
    currentPw: '',
    newPassword: '',
    newEmail: '',
  })

  // 오류 메시지 상태
  const [errors, setErrors] = useState({
    currentPw: '',
    newPassword: '',
    newEmail: '',
  })

  const isValidEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()

    const newErrors = {
      currentPw: '',
      newPassword: '',
      newEmail: '',
    }

    // 실제 현재 비밀번호는 서버에서 검증해야 합니다. 여기서는 예시로 'user123' 사용.
    if (!formData.currentPw) {
      newErrors.currentPw = '현재 비밀번호를 입력하세요.'
    } else if (formData.currentPw !== 'user123') {
      newErrors.currentPw = '현재 비밀번호가 일치하지 않습니다.'
    }

    if (!formData.newPassword) {
      newErrors.newPassword = '새 비밀번호를 입력하세요.'
    }

    if (!formData.newEmail) {
      newErrors.newEmail = '새 이메일을 입력하세요.'
    } else if (!isValidEmail(formData.newEmail)) {
      newErrors.newEmail = '올바른 이메일 형식이 아닙니다.'
    }

    setErrors(newErrors)

    const hasError = Object.values(newErrors).some((msg) => msg !== '')
    if (hasError) {
      return
    }

    // 서버와 통신하여 비밀번호/이메일을 저장하는 로직 구현
    console.log('Save:', formData)
    router.back()
  }

  return (
    <div className="fixed inset-0 z-[2000] flex items-center justify-center">
      {/* 오버레이 */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-md"
        onClick={() => router.back()}
      />
      {/* 모달 카드 */}
      <div
        className="relative z-10 w-[90%] max-w-[480px] bg-white p-10 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 닫기 */}
        {/* … 생략 … */}

        <form onSubmit={handleSave} noValidate className="space-y-4">
          {/* ID (읽기 전용) */}
          {/* … 생략 … */}

          {/* 현재 비밀번호 */}
          <div>
            <label className="block text-sm mb-2">Current Password</label>
            <div className="relative">
                <input
                    type={showPw ? 'text' : 'password'}
                    value={formData.currentPw}
                    onChange={(e) =>
                        setFormData({ ...formData, currentPw: e.target.value })
                    }
                    className={`w-full px-4 py-3 border ${
                        errors.currentPw ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="현재 비밀번호"
                />
                <button
                    type="button"
                    onClick={() => setShowPw((prev) => !prev)}
                    onMouseEnter={() => setHovered(true)}
                    onMouseLeave={() => setHovered(false)}
                    className="absolute right-3 top-0 bottom-0 my-auto"
                >
                    <EyeIcon active={hovered || showPw} />
                </button>
            </div>
            {errors.currentPw && (
              <p className="text-xs text-red-500 mt-1">{errors.currentPw}</p>
            )}
          </div>

          {/* 새 비밀번호 */}
          <div>
            <label className="block text-sm mb-2">Change Password</label>
            <div className="relative">
              <input
                type={showPw ? 'text' : 'password'}
                value={formData.newPassword}
                onChange={(e) =>
                  setFormData({ ...formData, newPassword: e.target.value })
                }
                className={`w-full px-4 py-3 pr-10 border ${
                  errors.newPassword ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="새 비밀번호"
              />
              <button
                type="button"
                onClick={() => setShowPw((prev) => !prev)}
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
                className="absolute right-3 top-0 bottom-0 my-auto"
              >
                <EyeIcon active={hovered || showPw} />
              </button>
            </div>
            {errors.newPassword && (
              <p className="text-xs text-red-500 mt-1">{errors.newPassword}</p>
            )}
          </div>

          {/* 새 이메일 */}
          <div>
            <label className="block text-sm mb-2">Change Email</label>
            <input
              type="email"
              value={formData.newEmail}
              onChange={(e) =>
                setFormData({ ...formData, newEmail: e.target.value })
              }
              className={`w-full px-4 py-3 border ${
                errors.newEmail ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="새 이메일"
            />
            {errors.newEmail && (
              <p className="text-xs text-red-500 mt-1">{errors.newEmail}</p>
            )}
          </div>

          {/* 저장 버튼 */}
          <button
            type="submit"
            className="w-full py-3 bg-gray-800 text-white mt-4"
          >
            Save
          </button>
        </form>
      </div>
    </div>
  )
}
