'use client'

import { useState } from 'react'
import Header from '@/components/Header'

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

export default function LoungePage() {
  const [showPw, setShowPw] = useState(false)
  const [hovered, setHovered] = useState(false)
  const [formData, setFormData] = useState({
    id: 'user123',
    newPassword: '',
    newEmail: '',
  })

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Save changes:', formData)
    alert('변경사항이 저장되었습니다.')
  }

  return (
    <div className="w-full min-h-screen bg-gray-50 pt-20 pb-12">
      <Header />
      <main className="max-w-[500px] mx-auto px-6">
        <div className="bg-white rounded-2xl p-10 shadow-md">
          <h2 className="text-2xl font-semibold text-center mb-8 text-gray-800">
            ɡriːd
          </h2>
          <p className="text-center mb-6 text-gray-500">Lounge</p>

          <form onSubmit={handleSave} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                ID
              </label>
              <input
                type="text"
                value={formData.id}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg text-base bg-gray-100 text-gray-800"
                disabled
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                change PW
              </label>
              <div className="relative">
                <input
                  type={showPw ? 'text' : 'password'}
                  value={formData.newPassword}
                  onChange={(e) =>
                    setFormData({ ...formData, newPassword: e.target.value })
                  }
                  className="w-full px-4 py-3 pr-11 border border-gray-300 rounded-lg text-base text-gray-800"
                  placeholder="새 비밀번호"
                />
                <button
                  type="button"
                  onClick={() => setShowPw((prev) => !prev)}
                  onMouseEnter={() => setHovered(true)}
                  onMouseLeave={() => setHovered(false)}
                  aria-label="toggle password visibility"
                  className="absolute right-3 top-0 bottom-0 my-auto flex items-center bg-transparent border-none p-0 cursor-pointer"
                >
                  <EyeIcon active={hovered || showPw} />
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                change Email
              </label>
              <input
                type="email"
                value={formData.newEmail}
                onChange={(e) =>
                  setFormData({ ...formData, newEmail: e.target.value })
                }
                className="w-full px-4 py-3 border border-gray-300 rounded-lg text-base text-gray-800"
                placeholder="새 이메일"
              />
            </div>

            <p className="text-xs text-gray-500 text-center">개인정보수집동의</p>

            <button
              type="submit"
              className="w-full py-3 bg-gray-800 text-white border-none rounded-lg text-base font-semibold cursor-pointer mt-2 transition-colors duration-200 hover:bg-gray-900"
            >
              Save
            </button>
          </form>
        </div>
      </main>
    </div>
  )
}
