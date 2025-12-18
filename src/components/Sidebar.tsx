'use client'

import { useRouter } from 'next/navigation'

interface SidebarProps {
  isOpen: boolean
  onClose: () => void
  onLoginRequired: () => void
}

export default function Sidebar({ isOpen, onClose, onLoginRequired }: SidebarProps) {
  const router = useRouter()
  
  // 로그인 상태 확인 (나중에 실제 인증으로 교체)
  const isLoggedIn = false // TODO: 실제 인증 상태로 교체

  const handleMyLoungeClick = () => {
    if (isLoggedIn) {
      router.push('/lounge')
      onClose()
    } else {
      onLoginRequired()
      onClose()
    }
  }

  return (
    <>
      {/* 오버레이 */}
      <div 
        className={`fixed inset-0 bg-black/50 z-[999] transition-all duration-300 ${
          isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
        onClick={onClose} 
      />
      
      {/* 사이드바 */}
      <div 
        className={`fixed top-0 left-0 w-[280px] h-screen bg-white shadow-[2px_0_10px_rgba(0,0,0,0.1)] z-[1000] flex flex-col transition-transform duration-300 ease-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="p-6 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-800">Menu</h2>
          <button 
            className="w-8 h-8 border-none bg-transparent cursor-pointer flex items-center justify-center"
            onClick={onClose}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <div className="flex-1 py-4 overflow-y-auto">
          <div 
            className="px-6 py-4 cursor-pointer transition-colors text-base text-gray-700 border-b border-gray-100 hover:bg-gray-50"
            onClick={handleMyLoungeClick}
          >
            My Lounge
          </div>
          
          <div 
            className="px-6 py-4 cursor-pointer transition-colors text-base text-gray-700 border-b border-gray-100 hover:bg-gray-50"
            onClick={() => {
              console.log('Collections clicked')
              onClose()
            }}
          >
            Collections
          </div>
          
          <div 
            className="px-6 py-4 cursor-pointer transition-colors text-base text-gray-700 border-b border-gray-100 hover:bg-gray-50"
            onClick={() => {
              router.push('/about')
              onClose()
            }}
          >
            About
          </div>
        </div>
      </div>
    </>
  )
}
