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
        className={`
            w-5 h-5
            pointer-events-none
            transition-all duration-200
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

    if (!isOpen) return null

<<<<<<< HEAD
    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault()
        console.log('Login:', { id, password })

        onLoginSuccess()
        onClose()
    }

    return (
        <div
            className="fixed inset-0 z-[2000] flex items-center justify-center"
=======
  return (
    <div 
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-[2000]"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-none p-10 w-[90%] max-w-[400px] shadow-[0_20px_25px_rgba(0,0,0,0.15)] relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 닫기 버튼 */}
        <button 
          className="absolute top-4 right-4 w-8 h-8 border-none bg-transparent cursor-pointer flex items-center justify-center"
          onClick={onClose}
>>>>>>> 27f4b94e5b41ab0d585c09b4c4ad6ce7fbb9136f
        >
            {/* 배경 */}
            <div
                className="absolute inset-0 bg-black/40 backdrop-blur-sm"
                onClick={onClose}
            />

            {/* 모달 */}
            <div
                className="
                    relative z-10
                    w-[420px]
                    bg-white
                    border border-gray-200
                    p-10
                "
                onClick={(e) => e.stopPropagation()}
            >
                {/* 닫기 */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
                >
                    ✕
                </button>

                {/* 타이틀 */}
                <h2 className="text-2xl font-semibold text-center mb-2">
                    ɡriːd
                </h2>
                <p className="text-center text-sm text-gray-500 mb-8">
                    Login
                </p>

                {/* 폼 */}
                <form onSubmit={handleLogin} className="space-y-4">
                    {/* ID */}
                    <div>
                        <label className="block text-sm mb-2 text-gray-700">
                            ID
                        </label>
                        <input
                            type="text"
                            value={id}
                            onChange={(e) => setId(e.target.value)}
                            className="
                                w-full
                                px-4 py-3
                                border border-gray-300
                                text-base
                                focus:outline-none
                                focus:border-gray-500
                            "
                        />
                    </div>

                    {/* PW */}
                    <div>
                        <label className="block text-sm mb-2 text-gray-700">
                            PW
                        </label>
                        <div
                            className="relative"
                            onMouseEnter={() => setHovered(true)}
                            onMouseLeave={() => setHovered(false)}
                        >
                            <input
                                type={showPw ? 'text' : 'password'}
                                value={password}
                                onChange={(e) =>
                                    setPassword(e.target.value)
                                }
                                className="
                                    w-full
                                    px-4 py-3 pr-10
                                    border border-gray-300
                                    focus:outline-none
                                    focus:border-gray-500
                                "
                            />
                            <button
                                type="button"
                                onClick={() => setShowPw((p) => !p)}
                                className="absolute right-3 top-0 bottom-0 my-auto"
                            >
                                <EyeIcon active={hovered || showPw} />
                            </button>
                        </div>
                    </div>

                    {/* 버튼 */}
                    <button
                        type="submit"
                        className="
                            w-full
                            py-3
                            bg-gray-900
                            text-white
                            text-sm
                            hover:bg-gray-800
                            transition
                        "
                    >
                        Login
                    </button>
                </form>

                {/* Register */}
                <button
                    onClick={onSwitchToRegister}
                    className="
                        mt-4
                        w-full
                        text-sm
                        text-gray-500
                        hover:text-gray-800
                        transition
                    "
                >
                    Register
                </button>
            </div>
        </div>
    )
}
