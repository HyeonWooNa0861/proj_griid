'use client'

import { useState, FormEvent } from 'react'

interface RegisterModalProps {
  isOpen: boolean
  onClose: () => void
  onSwitchToLogin: () => void
}

// 눈 모양 아이콘
const EyeIcon = ({ active }: { active: boolean }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.5}
    className={`w-5 h-5 pointer-events-none transition-all duration-200 ${
      active ? 'text-gray-700' : 'text-gray-400'
    }`}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
    />
  </svg>
)

export default function RegisterModal({
  isOpen,
  onClose,
  onSwitchToLogin,
}: RegisterModalProps) {
  const [showPw, setShowPw] = useState(false)
  const [hovered, setHovered] = useState(false)

  // 입력값과 오류 메시지를 상태로 관리
  const [formData, setFormData] = useState({
    id: '',
    password: '',
    gender: '',
    birth: '',
    region: '',
    email: '',
  })
  const [errors, setErrors] = useState({
    id: '',
    password: '',
    gender: '',
    birth: '',
    region: '',
    email: '',
  })

  if (!isOpen) return null

  // 이메일 형식 체크 함수
  const isValidEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()

    // 필수 입력 검증
    const newErrors = {
      id: formData.id ? '' : '아이디를 입력하세요.',
      password: formData.password ? '' : '비밀번호를 입력하세요.',
      gender: formData.gender ? '' : '성별을 선택하세요.',
      birth: formData.birth ? '' : '생년월일을 입력하세요.',
      region: formData.region ? '' : '지역을 입력하세요.',
      email: '',
    }
    if (!formData.email) {
      newErrors.email = '이메일을 입력하세요.'
    } else if (!isValidEmail(formData.email)) {
      newErrors.email = '올바른 이메일 형식이 아닙니다.'
    }

    setErrors(newErrors)

    // 오류가 하나라도 있으면 제출 금지
    const hasError = Object.values(newErrors).some((msg) => msg !== '')
    if (hasError) return

    // 성공적으로 제출하면 회원가입 처리 후 로그인 창으로
    console.log('Register:', formData)
    onSwitchToLogin()
  }

  return (
    <div className="fixed inset-0 z-[2000] flex items-center justify-center">
      {/* 배경 블러 */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />

      {/* 모달 본체 */}
      <div
        className="relative z-10 w-[420px] bg-white border border-gray-200 p-10"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 닫기 버튼 */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
        >
          ✕
        </button>

        {/* 타이틀 */}
        <h2 className="text-2xl font-semibold text-center mb-2">ɡriːd</h2>
        <p className="text-center text-sm text-gray-500 mb-8">Register</p>

        {/* 폼 영역 */}
        <form onSubmit={handleSubmit} noValidate className="space-y-4">
          {/* ID */}
          <div>
            <label className="block text-sm mb-2 text-gray-700">ID</label>
            <input
              type="text"
              value={formData.id}
              onChange={(e) => setFormData({ ...formData, id: e.target.value })}
              className={`w-full px-4 py-3 border focus:outline-none ${
                errors.id ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.id && <p className="text-xs text-red-500 mt-1">{errors.id}</p>}
          </div>

          {/* PW */}
          <div>
            <label className="block text-sm mb-2 text-gray-700">PW</label>
            <div
              className="relative"
              onMouseEnter={() => setHovered(true)}
              onMouseLeave={() => setHovered(false)}
            >
              <input
                type={showPw ? 'text' : 'password'}
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className={`w-full px-4 py-3 pr-10 border focus:outline-none ${
                  errors.password ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPw((prev) => !prev)}
                className="absolute right-3 top-0 bottom-0 my-auto"
              >
                <EyeIcon active={hovered || showPw} />
              </button>
            </div>
            {errors.password && (
              <p className="text-xs text-red-500 mt-1">{errors.password}</p>
            )}
          </div>

          {/* Gender */}
          <div>
            <label className="block text-sm mb-2 text-gray-700">Gender</label>
            <select
              value={formData.gender}
              onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
              className={`w-full px-4 py-3 border focus:outline-none ${
                errors.gender ? 'border-red-500' : 'border-gray-300'
              }`}
            >
              <option value="">Select</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
            {errors.gender && (
              <p className="text-xs text-red-500 mt-1">{errors.gender}</p>
            )}
          </div>

          {/* Birth */}
          <div>
            <label className="block text-sm mb-2 text-gray-700">Birth</label>
            <input
              type="date"
              value={formData.birth}
              onChange={(e) => setFormData({ ...formData, birth: e.target.value })}
              className={`w-full px-4 py-3 border focus:outline-none ${
                errors.birth ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.birth && <p className="text-xs text-red-500 mt-1">{errors.birth}</p>}
          </div>

          {/* Region */}
          <div>
            <label className="block text-sm mb-2 text-gray-700">Region</label>
            <input
              type="text"
              value={formData.region}
              onChange={(e) => setFormData({ ...formData, region: e.target.value })}
              className={`w-full px-4 py-3 border focus:outline-none ${
                errors.region ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.region && (
              <p className="text-xs text-red-500 mt-1">{errors.region}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm mb-2 text-gray-700">Email</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className={`w-full px-4 py-3 border focus:outline-none ${
                errors.email ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
          </div>

          {/* 제출 버튼 */}
          <button
            type="submit"
            className="w-full py-3 bg-gray-900 text-white text-sm hover:bg-gray-800 transition"
          >
            Join
          </button>
        </form>

        {/* 로그인 전환 버튼 */}
        <button
          onClick={onSwitchToLogin}
          className="mt-4 w-full text-sm text-gray-500 hover:text-gray-800 transition"
        >
          Back to Login
        </button>
      </div>
    </div>
  )
}
