'use client'

import { useState } from 'react'

interface RegisterModalProps {
  isOpen: boolean
  onClose: () => void
  onSwitchToLogin: () => void
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

export default function RegisterModal({ isOpen, onClose, onSwitchToLogin }: RegisterModalProps) {
  const [showPw, setShowPw] = useState(false)
  const [hovered, setHovered] = useState(false)
  const [formData, setFormData] = useState({
    id: '',
    password: '',
    gender: '',
    birth: '',
    region: '',
    email: '',
  })

  if (!isOpen) return null

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Register:', formData)
    onSwitchToLogin()
  }

  return (
    <div 
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-[2000] overflow-y-auto"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-2xl p-10 w-[90%] max-w-[400px] shadow-[0_20px_25px_rgba(0,0,0,0.15)] relative my-5"
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
        <p className="text-center mb-6 text-gray-500">Register</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* ID */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">ID</label>
            <input
              type="text"
              value={formData.id}
              onChange={(e) => setFormData({ ...formData, id: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg text-base text-gray-800"
              placeholder="아이디"
              required
            />
          </div>

          {/* PW */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">PW</label>
            <div
              className="relative"
              onMouseEnter={() => setHovered(true)}
              onMouseLeave={() => setHovered(false)}
            >
              <input
                type={showPw ? 'text' : 'password'}
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full px-4 py-3 pr-11 border border-gray-300 rounded-lg text-base text-gray-800"
                placeholder="비밀번호"
                required
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

          <p className="text-xs text-gray-500 text-center">개인정보수집동의</p>

          {/* Gender */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Gender</label>
            <select
              value={formData.gender}
              onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg text-base text-gray-800"
              required
            >
              <option value="">선택</option>
              <option value="male">남성</option>
              <option value="female">여성</option>
              <option value="other">기타</option>
            </select>
          </div>

          {/* Birth */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Birth</label>
            <input
              type="date"
              value={formData.birth}
              onChange={(e) => setFormData({ ...formData, birth: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg text-base text-gray-800"
              required
            />
          </div>

          {/* Region */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Region</label>
            <input
              type="text"
              value={formData.region}
              onChange={(e) => setFormData({ ...formData, region: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg text-base text-gray-800"
              placeholder="지역"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg text-base text-gray-800"
              placeholder="이메일"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-gray-800 text-white border-none rounded-lg text-base font-semibold cursor-pointer mt-2 transition-colors duration-200 hover:bg-gray-900"
          >
            Join
          </button>
        </form>
      </div>
    </div>
  )
}
