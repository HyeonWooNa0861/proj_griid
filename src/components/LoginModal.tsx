'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

interface LoginModalProps {
  isOpen: boolean
  onClose: () => void
  onSwitchToRegister: () => void
}

const EyeIcon = ({ active }: { active: boolean }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.5}
    className={`
      w-5 h-5 
      pointer-events-none 
      transition-all duration-300 ease-out
      ${active
        ? 'text-gray-700 drop-shadow-[0_0_6px_rgba(0,0,0,0.35)]'
        : 'text-gray-400'}
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

export default function LoginModal({ isOpen, onClose, onSwitchToRegister }: LoginModalProps) {
  const router = useRouter()
  const [id, setId] = useState('')
  const [password, setPassword] = useState('')
  const [showPw, setShowPw] = useState(false)
  const [hovered, setHovered] = useState(false)

  if (!isOpen) return null

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Login:', { id, password })
    router.push('/lounge')
    onClose()
  }

  return (
    <div 
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-[2000]"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-2xl p-10 w-[90%] max-w-[400px] shadow-[0_20px_25px_rgba(0,0,0,0.15)] relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 닫기 버튼 */}
        <button 
          className="absolute top-4 right-4 w-8 h-8 border-none bg-transparent cursor-pointer flex items-center justify-center"
          onClick={onClose}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        <h2 className="text-2xl font-semibold text-center mb-8 text-gray-800">ɡriːd</h2>
        <p className="text-center mb-6 text-gray-500">Enter</p>

        <form onSubmit={handleLogin}>
          {/* ID */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">ID</label>
            <input
              type="text"
              value={id}
              onChange={(e) => setId(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg text-base text-gray-800"
              placeholder="아이디를 입력하세요"
            />
          </div>

          {/* PW */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">PW</label>
            <div
              className="relative"
              onMouseEnter={() => setHovered(true)}
              onMouseLeave={() => setHovered(false)}
            >
              <input
                type={showPw ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 pr-11 border border-gray-300 rounded-lg text-base text-gray-800"
                placeholder="비밀번호를 입력하세요"
              />
              <button
                type="button"
                onClick={() => setShowPw((prev) => !prev)}
                aria-label="toggle password visibility"
                className="absolute right-3 top-0 bottom-0 my-auto flex items-center bg-transparent border-none p-0 cursor-pointer"
              >
                <EyeIcon active={hovered || showPw} />
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-gray-800 text-white border-none rounded-lg text-base font-semibold cursor-pointer mt-2 transition-colors duration-200 hover:bg-gray-900"
          >
            Join
          </button>
        </form>

        <button 
          className="w-full py-3 bg-transparent text-gray-500 border-none text-sm cursor-pointer mt-2"
          onClick={onSwitchToRegister}
        >
          Register
        </button>
      </div>
    </div>
  )
}
