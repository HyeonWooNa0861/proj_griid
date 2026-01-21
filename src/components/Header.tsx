'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Sidebar from './Sidebar'
import LoginModal from './LoginModal'
import RegisterModal from './RegisterModal'
import Link from 'next/link'

export default function Header() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false)
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)
    const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false)
    const [isSearchOpen, setIsSearchOpen] = useState(false)
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    
    const [headerHeight, setHeaderHeight] = useState('h-16')
    const [logoHeight, setLogoHeight] = useState('h-8')

    useEffect(() => {
        const updateHeaderSize = () => {
            const screenHeight = window.innerHeight
            const screenWidth = window.innerWidth
            
            // 헤더 높이 계산
            let header = 'h-16'
            let logo = 'h-8'
            
            if (screenHeight < 700) {
                header = 'h-14' // 56px
                logo = 'h-7'    // 28px (헤더의 50%)
            } else if (screenHeight < 900) {
                header = 'h-16' // 64px
                logo = 'h-9'    // 36px (헤더의 56%)
            } else {
                header = 'h-20' // 80px
                logo = 'h-12'   // 48px (헤더의 60%)
            }
            
            // 모바일에서는 약간 더 작게
            if (screenWidth < 640) {
                if (header === 'h-20') logo = 'h-10'
                if (header === 'h-16') logo = 'h-8'
                if (header === 'h-14') logo = 'h-6'
            }
            
            setHeaderHeight(header)
            setLogoHeight(logo)
        }

        updateHeaderSize()
        window.addEventListener('resize', updateHeaderSize)
        return () => window.removeEventListener('resize', updateHeaderSize)
    }, [])

    return (
        <>
            <header className={`fixed top-0 left-0 right-0 w-full ${headerHeight} bg-white border-b border-gray-200 z-50 transition-all duration-300`}>
                <div className="relative w-full h-full flex items-center justify-between px-6 max-w-[1920px] mx-auto">

                    {/* 메뉴 버튼 */}
                    <button
                        className="flex items-center justify-center w-10 h-10 bg-transparent rounded-lg hover:bg-gray-100"
                        onClick={() => setIsSidebarOpen(true)}
                    >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <line x1="3" y1="6" x2="21" y2="6" />
                            <line x1="3" y1="12" x2="21" y2="12" />
                            <line x1="3" y1="18" x2="21" y2="18" />
                        </svg>
                    </button>

                    {/* 검색 바 */}
                    {isSearchOpen && (
                    <div
                        className="
                        absolute top-full left-0 right-0
                        bg-white/95
                        backdrop-blur-sm
                        z-40
                        border-b border-gray-200
                        transition-transform duration-300
                        "
                    >
                        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center gap-3">
                        <input
                            type="text"
                            placeholder="Find your Desire"
                            autoFocus
                            className="
                            flex-1
                            px-4 py-3
                            text-sm
                            border border-gray-300
                            outline-none
                            focus:border-gray-500
                            "
                            onKeyDown={(e) => {
                            if (e.key === 'Escape') {
                                setIsSearchOpen(false)
                            }
                            }}
                        />

                        <button
                            className="
                            px-6 py-3
                            text-sm
                            bg-gray-900
                            text-white
                            hover:bg-black
                            transition
                            "
                        >
                            Search
                        </button>
                        </div>
                    </div>
                    )}

                    {/* 로고 - 상하 여백 확보 */}
                    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center">
                        <Link 
                            href="/"
                            onClick={(e) => {
                                if (window.location.pathname === '/') {
                                    e.preventDefault()
                                    window.location.reload()
                                }
                            }}
                        >
                            <Image
                                src="/logo/Griid_Brand_Logo_Toolkit/Logo_Files/Griid_Logo_BK.png"
                                alt="griid logo"
                                width={0}
                                height={0}
                                sizes="100vw"
                                className={`${logoHeight} w-auto object-contain transition-all duration-300`}
                                priority
                            />
                        </Link>
                    </div>

                    {/* 검색 버튼 */}
                    <button
                        className="flex items-center justify-center w-10 h-10 bg-transparent rounded-lg hover:bg-gray-100"
                        onClick={() => setIsSearchOpen((p) => !p)}
                    >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <circle cx="11" cy="11" r="8" />
                            <path d="m21 21-4.35-4.35" />
                        </svg>
                    </button>
                </div>
            </header>

            {/* Sidebar */}
            <Sidebar
                isOpen={isSidebarOpen}
                onClose={() => setIsSidebarOpen(false)}
                isLoggedIn={isLoggedIn}
                onLoginRequired={() => setIsLoginModalOpen(true)}
            />

            {/* Login Modal */}
            <LoginModal
                isOpen={isLoginModalOpen}
                onClose={() => setIsLoginModalOpen(false)}
                onLoginSuccess={() => {
                    setIsLoggedIn(true)
                    setIsLoginModalOpen(false)
                }}
                onSwitchToRegister={() => {
                    setIsLoginModalOpen(false)
                    setIsRegisterModalOpen(true)
                }}
            />

            {/* Register Modal */}
            <RegisterModal
                isOpen={isRegisterModalOpen}
                onClose={() => setIsRegisterModalOpen(false)}
                onRegisterSuccess={() => {
                    setIsLoggedIn(true)
                    setIsRegisterModalOpen(false)
                }}
                onSwitchToLogin={() => {
                    setIsRegisterModalOpen(false)
                    setIsLoginModalOpen(true)
                }}
            />
        </>
    )
}