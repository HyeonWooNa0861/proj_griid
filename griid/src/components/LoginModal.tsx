'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

interface LoginModalProps {
  isOpen: boolean
  onClose: () => void
  onSwitchToRegister: () => void
}

export default function LoginModal({ isOpen, onClose, onSwitchToRegister }: LoginModalProps) {
  const router = useRouter()
  const [id, setId] = useState('')
  const [password, setPassword] = useState('')

  if (!isOpen) return null

  const overlayStyle = {
    position: 'fixed' as const,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2000,
  }

  const modalStyle = {
    backgroundColor: 'white',
    borderRadius: '16px',
    padding: '40px',
    width: '90%',
    maxWidth: '400px',
    boxShadow: '0 20px 25px rgba(0,0,0,0.15)',
    position: 'relative' as const,
  }

  const titleStyle = {
    fontSize: '24px',
    fontWeight: '600',
    textAlign: 'center' as const,
    marginBottom: '32px',
    color: '#1f2937',
  }

  const labelStyle = {
    display: 'block',
    fontSize: '14px',
    fontWeight: '500',
    color: '#374151',
    marginBottom: '8px',
  }

  const inputStyle = {
    width: '100%',
    padding: '12px 16px',
    border: '1px solid #d1d5db',
    borderRadius: '8px',
    fontSize: '16px',
    marginBottom: '16px',
    boxSizing: 'border-box' as const,
  }

  const buttonStyle = {
    width: '100%',
    padding: '12px',
    backgroundColor: '#1f2937',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    marginTop: '8px',
    transition: 'background-color 0.2s',
  }

  const linkButtonStyle = {
    width: '100%',
    padding: '12px',
    backgroundColor: 'transparent',
    color: '#6b7280',
    border: 'none',
    fontSize: '14px',
    cursor: 'pointer',
    marginTop: '8px',
  }

  const closeButtonStyle = {
    position: 'absolute' as const,
    top: '16px',
    right: '16px',
    width: '32px',
    height: '32px',
    border: 'none',
    background: 'transparent',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: 실제 로그인 로직
    console.log('Login:', { id, password })
    router.push('/lounge')
    onClose()
  }

  return (
    <div style={overlayStyle} onClick={onClose}>
      <div style={modalStyle} onClick={(e) => e.stopPropagation()}>
        <button style={closeButtonStyle} onClick={onClose}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        <h2 style={titleStyle}>gri:d</h2>
        <p style={{ textAlign: 'center', marginBottom: '24px', color: '#6b7280' }}>Enter</p>

        <form onSubmit={handleLogin}>
          <label style={labelStyle}>ID</label>
          <input
            type="text"
            value={id}
            onChange={(e) => setId(e.target.value)}
            style={inputStyle}
            placeholder="아이디를 입력하세요"
          />

          <label style={labelStyle}>PW</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={inputStyle}
            placeholder="비밀번호를 입력하세요"
          />

          <button
            type="submit"
            style={buttonStyle}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#111827'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#1f2937'}
          >
            Join
          </button>
        </form>

        <button style={linkButtonStyle} onClick={onSwitchToRegister}>
          Register
        </button>
      </div>
    </div>
  )
}