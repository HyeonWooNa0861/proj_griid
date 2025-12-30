'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

interface LoginModalProps {
  isOpen: boolean
  onClose: () => void
  onSwitchToRegister: () => void
  onLoginSuccess: () => void
}

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

export default function LoginModal({
  isOpen,
  onClose,
  onSwitchToRegister,
  onLoginSuccess,
}: LoginModalProps) {
  const router = useRouter()
  const [id, setId] = useState('')
  const [password, setPassword] = useState('')
  const [showPw, setShowPw] = useState(false)
  const [hovered, setHovered] = useState(false)

  // 오류 메시지 상태
  const [errors, setErrors] = useState({ id: '', password: '' })

  if (!isOpen) return null

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()

    // 검증: 비어 있으면 오류
    const newErrors = {
      id: id ? '' : '아이디를 입력하세요.',
      password: password ? '' : '비밀번호를 입력하세요.',
    }

    setErrors(newErrors)

    // 오류가 있으면 중단
    const hasError = Object.values(newErrors).some((msg) => msg !== '')
    if (hasError) return

    // 성공 시 로그인 처리 후 모달 닫기
    console.log('Login:', { id, password })
    onLoginSuccess()
    onClose()
  }

  return (
    <div className="fixed inset-0 z-[2000] flex items-center justify-center">
      {/* 배경 블러 */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />

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
        <p className="text-center text-sm text-gray-500 mb-8">Login</p>

        {/* 폼 영역 */}
        <form onSubmit={handleLogin} className="space-y-4">
          {/* ID */}
          <div>
            <label className="block text-sm mb-2 text-gray-700">ID</label>
            <input
              type="text"
              value={id}
              onChange={(e) => setId(e.target.value)}
              className={`w-full px-4 py-3 border focus:outline-none ${
                errors.id ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.id && (
              <p className="text-xs text-red-500 mt-1">{errors.id}</p>
            )}
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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

          {/* 버튼 */}
          <button
            type="submit"
            className="w-full py-3 bg-gray-900 text-white text-sm hover:bg-gray-800 transition"
          >
            Login
          </button>
        </form>

        {/* Register */}
        <button
          onClick={onSwitchToRegister}
          className="mt-4 w-full text-sm text-gray-500 hover:text-gray-800 transition"
        >
          Register
        </button>
      </div>
    </div>
  )
}
