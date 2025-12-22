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
        newPassword: '',
        newEmail: '',
    })

    const handleSave = (e: React.FormEvent) => {
        e.preventDefault()
        console.log('Save:', formData)
        router.back()
    }

    return (
        <div className="fixed inset-0 z-[2000] flex items-center justify-center">
            {/* 🔹 배경 오버레이 */}
            <div
                className="absolute inset-0 bg-black/40 backdrop-blur-md"
                onClick={() => router.back()}
            />

            {/* 🔹 모달 카드 */}
            <div className="relative z-10 w-[90%] max-w-[480px] bg-white p-10 shadow-xl">
                {/* 닫기 */}
                <button
                    onClick={() => router.back()}
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-700"
                >
                    ✕
                </button>

                <h2 className="text-2xl font-semibold text-center mb-8">
                    ɡriːd
                </h2>

                <p className="text-center mb-6 text-gray-500">
                    Lounge Settings
                </p>

                <form onSubmit={handleSave} className="space-y-4">
                    {/* ID */}
                    <div>
                        <label className="block text-sm mb-2">ID</label>
                        <input
                            type="text"
                            value={formData.id}
                            disabled
                            className="w-full px-4 py-3 border bg-gray-100"
                        />
                    </div>

                    {/* PW */}
                    <div>
                        <label className="block text-sm mb-2">
                            Change PW
                        </label>
                        <div className="relative">
                            <input
                                type={showPw ? 'text' : 'password'}
                                value={formData.newPassword}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        newPassword: e.target.value,
                                    })
                                }
                                className="w-full px-4 py-3 pr-10 border"
                                placeholder="새 비밀번호"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPw((p) => !p)}
                                onMouseEnter={() => setHovered(true)}
                                onMouseLeave={() => setHovered(false)}
                                className="absolute right-3 top-0 bottom-0 my-auto"
                            >
                                <EyeIcon active={hovered || showPw} />
                            </button>
                        </div>
                    </div>

                    {/* Email */}
                    <div>
                        <label className="block text-sm mb-2">
                            Change Email
                        </label>
                        <input
                            type="email"
                            value={formData.newEmail}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    newEmail: e.target.value,
                                })
                            }
                            className="w-full px-4 py-3 border"
                            placeholder="새 이메일"
                        />
                    </div>

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
//마이 라운지 설정 모달