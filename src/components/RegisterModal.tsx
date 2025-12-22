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

export default function RegisterModal({
    isOpen,
    onClose,
    onSwitchToLogin,
}: RegisterModalProps) {
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
        <div className="fixed inset-0 z-[2000] flex items-center justify-center">
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
                    Register
                </p>

                {/* 폼 */}
                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* ID */}
                    <div>
                        <label className="block text-sm mb-2 text-gray-700">
                            ID
                        </label>
                        <input
                            type="text"
                            value={formData.id}
                            onChange={(e) =>
                                setFormData({ ...formData, id: e.target.value })
                            }
                            className="
                                w-full
                                px-4 py-3
                                border border-gray-300
                                focus:outline-none
                                focus:border-gray-500
                            "
                            required
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
                                value={formData.password}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        password: e.target.value,
                                    })
                                }
                                className="
                                    w-full
                                    px-4 py-3 pr-10
                                    border border-gray-300
                                    focus:outline-none
                                    focus:border-gray-500
                                "
                                required
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

                    {/* Gender */}
                    <div>
                        <label className="block text-sm mb-2 text-gray-700">
                            Gender
                        </label>
                        <select
                            value={formData.gender}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    gender: e.target.value,
                                })
                            }
                            className="
                                w-full
                                px-4 py-3
                                border border-gray-300
                                focus:outline-none
                                focus:border-gray-500
                            "
                            required
                        >
                            <option value="">Select</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                        </select>
                    </div>

                    {/* Birth */}
                    <div>
                        <label className="block text-sm mb-2 text-gray-700">
                            Birth
                        </label>
                        <input
                            type="date"
                            value={formData.birth}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    birth: e.target.value,
                                })
                            }
                            className="
                                w-full
                                px-4 py-3
                                border border-gray-300
                                focus:outline-none
                                focus:border-gray-500
                            "
                            required
                        />
                    </div>

                    {/* Region */}
                    <div>
                        <label className="block text-sm mb-2 text-gray-700">
                            Region
                        </label>
                        <input
                            type="text"
                            value={formData.region}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    region: e.target.value,
                                })
                            }
                            className="
                                w-full
                                px-4 py-3
                                border border-gray-300
                                focus:outline-none
                                focus:border-gray-500
                            "
                            required
                        />
                    </div>

                    {/* Email */}
                    <div>
                        <label className="block text-sm mb-2 text-gray-700">
                            Email
                        </label>
                        <input
                            type="email"
                            value={formData.email}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    email: e.target.value,
                                })
                            }
                            className="
                                w-full
                                px-4 py-3
                                border border-gray-300
                                focus:outline-none
                                focus:border-gray-500
                            "
                            required
                        />
                    </div>

                    {/* Submit */}
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
                        Join
                    </button>
                </form>

                {/* Login 전환 */}
                <button
                    onClick={onSwitchToLogin}
                    className="
                        mt-4
                        w-full
                        text-sm
                        text-gray-500
                        hover:text-gray-800
                        transition
                    "
                >
                    Back to Login
                </button>
            </div>
        </div>
    )
}
