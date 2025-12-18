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

  const sidebarStyle = {
    position: 'fixed' as const,
    top: 0,
    left: 0,
    width: '280px',
    height: '100vh',
    backgroundColor: 'white',
    boxShadow: '2px 0 10px rgba(0,0,0,0.1)',
    transform: isOpen ? 'translateX(0)' : 'translateX(-100%)',
    transition: 'transform 0.3s ease',
    zIndex: 1000,
    display: 'flex',
    flexDirection: 'column' as const,
  }

  const overlayStyle = {
    position: 'fixed' as const,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    opacity: isOpen ? 1 : 0,
    visibility: isOpen ? 'visible' : 'hidden',
    transition: 'opacity 0.3s ease, visibility 0.3s ease',
    zIndex: 999,
  } as React.CSSProperties

  const headerStyle = {
    padding: '24px',
    borderBottom: '1px solid #e5e7eb',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  }

  const titleStyle = {
    fontSize: '20px',
    fontWeight: '600',
    color: '#1f2937',
  }

  const closeButtonStyle = {
    width: '32px',
    height: '32px',
    border: 'none',
    background: 'transparent',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }

  const menuStyle = {
    flex: 1,
    padding: '16px 0',
    overflowY: 'auto' as const,
  }

  const menuItemStyle = {
    padding: '16px 24px',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
    fontSize: '16px',
    color: '#374151',
    borderBottom: '1px solid #f3f4f6',
  }

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
      <div style={overlayStyle} onClick={onClose} />
      
      {/* 사이드바 */}
      <div style={sidebarStyle}>
        <div style={headerStyle}>
          <h2 style={titleStyle}>Menu</h2>
          <button style={closeButtonStyle} onClick={onClose}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <div style={menuStyle}>
          <div 
            style={menuItemStyle}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f9fafb'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
            onClick={handleMyLoungeClick}
          >
            My Lounge
          </div>
          
          <div 
            style={menuItemStyle}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f9fafb'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
            onClick={() => {
              console.log('Collections clicked')
              onClose()
            }}
          >
            Collections
          </div>
          
          <div 
            style={menuItemStyle}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f9fafb'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
            onClick={() => {
              console.log('About clicked')
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