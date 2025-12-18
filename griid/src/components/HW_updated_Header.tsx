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

  const headerStyle = {
    position: 'fixed' as const,
    top: 0,
    left: 0,
    right: 0,
    width: '100%',
    height: '64px',
    backgroundColor: 'white',
    borderBottom: '1px solid #e5e7eb',
    zIndex: 50,
  }

  const containerStyle = {
    position: 'relative' as const,
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 24px',
    maxWidth: '1920px',
    margin: '0 auto',
  }

  const buttonStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '40px',
    height: '40px',
    border: 'none',
    background: 'transparent',
    cursor: 'pointer',
    borderRadius: '8px',
  }

  const logoContainerStyle = {
    position: 'absolute' as const,
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)',
  }

  return (
    <>
      <header style={headerStyle}>
        <div style={containerStyle}>
          <button 
            style={buttonStyle} 
            onClick={() => setIsSidebarOpen(true)}
            onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#f3f4f6'}
            onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>

          {isSearchOpen && (
            <div
              style={{
                position: 'fixed',
                top: '64px', // header height
                left: 0,
                right: 0,
                backgroundColor: 'white',
                borderBottom: '1px solid #e5e7eb',
                padding: '12px 24px',
                zIndex: 40,
                boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
              }}
            >
              <div
                style={{
                  maxWidth: '800px',
                  margin: '0 auto',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                }}
              >
                <input
                  type="text"
                  placeholder="Search..."
                  autoFocus
                  style={{
                    flex: 1,
                    padding: '10px 14px',
                    fontSize: '16px',
                    border: '1px solid #d1d5db',
                    borderRadius: '8px',
                    outline: 'none',
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Escape') {
                      setIsSearchOpen(false)
                    }
                  }}
                />

                <button
                  style={{
                    padding: '10px 16px',
                    borderRadius: '8px',
                    border: 'none',
                    backgroundColor: '#1f2937',
                    color: 'white',
                    cursor: 'pointer',
                  }}
                  onClick={() => console.log('search submit')}
                >
                  Search
                </button>
              </div>
            </div>
          )}

          <div style={logoContainerStyle}>
            <Link href="/" aria-label="Go to home">
              <Image 
                src="/logo/Griid_IG_Profile_WH.png" 
                alt="griid logo" 
                width={140} 
                height={140} 
                priority 
                style={{
                  width: 'auto',
                  height: 'auto',
                  objectFit: 'contain',
                  cursor: 'pointer',   // UX 개선
                }}
              />
            </Link>
          </div>

          <button 
            style={buttonStyle} 
            onClick={() => setIsSearchOpen((prev) => !prev)}
            onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#f3f4f6'}
            onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
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
