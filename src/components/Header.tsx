'use client'

import { useState } from 'react'
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

  return (
    <>
      <header className="fixed top-0 left-0 right-0 w-full h-16 bg-white border-b border-gray-200 z-50">
        <div className="relative w-full h-full flex items-center justify-between px-6 max-w-[1920px] mx-auto">
          {/* 메뉴 버튼 */}
          <button 
            className="flex items-center justify-center w-10 h-10 border-none bg-transparent cursor-pointer rounded-lg hover:bg-gray-100 transition-colors"
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
            <div className="fixed top-16 left-0 right-0 bg-white border-b border-gray-200 py-3 px-6 z-40 shadow-sm">
              <div className="max-w-3xl mx-auto flex items-center gap-3">
                <input
                  type="text"
                  placeholder="Search..."
                  autoFocus
                  className="flex-1 py-2.5 px-3.5 text-base border border-gray-300 rounded-lg outline-none focus:border-gray-500 text-gray-800"
                  onKeyDown={(e) => {
                    if (e.key === 'Escape') {
                      setIsSearchOpen(false)
                    }
                  }}
                />
                <button
                  className="py-2.5 px-4 rounded-lg border-none bg-gray-800 text-white cursor-pointer hover:bg-gray-900 transition-colors"
                  onClick={() => console.log('search submit')}
                >
                  Search
                </button>
              </div>
            </div>
          )}

          {/* 로고 */}
          <div className="absolute left-1/2 top-0 h-full -translate-x-1/2 flex items-center">
            <Link href="/" aria-label="Go to home">
              <Image 
                src="/logo/Griid_Brand_Logo_Toolkit/Logo_Files/Griid_Logo_BK.png"
                alt="griid logo"
                width={0}
                height={0}
                sizes="100vw"
                className="
                  h-12        /* ← 헤더에 딱 맞는 높이 */
                  w-auto
                  object-contain
                  cursor-pointer
                "
                priority
              />
            </Link>
          </div>


          {/* 검색 버튼 */}
          <button 
            className="flex items-center justify-center w-10 h-10 border-none bg-transparent cursor-pointer rounded-lg hover:bg-gray-100 transition-colors"
            onClick={() => setIsSearchOpen((prev) => !prev)}
            aria-label="toggle search"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.35-4.35" />
            </svg>
          </button>
        </div>
      </header>

      <Sidebar 
        isOpen={isSidebarOpen} 
        onClose={() => setIsSidebarOpen(false)}
        onLoginRequired={() => setIsLoginModalOpen(true)}
      />

      <LoginModal 
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onSwitchToRegister={() => {
          setIsLoginModalOpen(false)
          setIsRegisterModalOpen(true)
        }}
      />

      <RegisterModal 
        isOpen={isRegisterModalOpen}
        onClose={() => setIsRegisterModalOpen(false)}
        onSwitchToLogin={() => {
          setIsRegisterModalOpen(false)
          setIsLoginModalOpen(true)
        }}
      />
    </>
  )
}
