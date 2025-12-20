'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'

interface SidebarProps {
  isOpen: boolean
  onClose: () => void
  onLoginRequired: () => void
}

export default function Sidebar({
  isOpen,
  onClose,
  onLoginRequired,
}: SidebarProps) {
  const router = useRouter()
  const isLoggedIn = false

  const [openCollections, setOpenCollections] = useState(false)

  const designers = ['Designer A', 'Designer B', 'Designer C']

  const handleMyLoungeClick = () => {
    if (isLoggedIn) {
      router.push('/lounge')
      onClose()
    } else {
      onLoginRequired()
      onClose()
    }
  }

  const handleDesignerClick = (name: string) => {
    router.push(`/collections?designer=${encodeURIComponent(name)}`)
    onClose()
  }

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black/50 z-[999] transition-all duration-300 ${
          isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
        onClick={onClose}
      />

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 w-[280px] h-screen bg-white z-[1000]
        shadow-[2px_0_10px_rgba(0,0,0,0.1)]
        transition-transform duration-300
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        {/* Header */}
        <div className="p-6 border-b flex justify-between items-center">
          <h2 className="text-xl font-semibold">Menu</h2>
          <button onClick={onClose}>✕</button>
        </div>

        {/* Menu */}
        <div className="py-4">

          {/* My Lounge */}
          <div
            className="px-6 py-4 cursor-pointer hover:bg-gray-50"
            onClick={handleMyLoungeClick}
          >
            My Lounge
          </div>

          {/* Collections */}
          <div
            className="px-6 py-4 cursor-pointer hover:bg-gray-50 flex justify-between items-center"
            onClick={() => setOpenCollections((p) => !p)}
          >
            <span>Collections</span>
            <span className="text-sm">{openCollections ? '▲' : '▼'}</span>
          </div>

          {/* Designer list */}
          {openCollections && (
            <div className="pl-10">
              {designers.map((name) => (
                <div
                  key={name}
                  className="py-2 text-sm text-gray-600 cursor-pointer hover:text-gray-900"
                  onClick={() => handleDesignerClick(name)}
                >
                  {name}
                </div>
              ))}
            </div>
          )}

          {/* About */}
          <div
            className="px-6 py-4 cursor-pointer hover:bg-gray-50"
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
