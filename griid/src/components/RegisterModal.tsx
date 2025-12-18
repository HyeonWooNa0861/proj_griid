'use client'

import { useState } from 'react'

interface RegisterModalProps {
  isOpen: boolean
  onClose: () => void
  onSwitchToLogin: () => void
}

export default function RegisterModal({ isOpen, onClose, onSwitchToLogin }: RegisterModalProps) {
  const [formData, setFormData] = useState({
    id: '',
    password: '',
    gender: '',
    birth: '',
    region: '',
    email: '',
  })

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
    overflowY: 'auto' as const,
  }

  const modalStyle = {
    backgroundColor: 'white',
    borderRadius: '16px',
    padding: '40px',
    width: '90%',
    maxWidth: '400px',
    boxShadow: '0 20px 25px rgba(0,0,0,0.15)',
    position: 'relative' as const,
    margin: '20px 0',
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

  const closeButtonStyle = {
    position: 'absolute' as const,
    top: '16px',
    right: '16px',
    width: '32px',
    height: '32px',
    border: 'none',
    background: 'transparent',
    cursor: 'pointer',
  }

  const noteStyle = {
    fontSize: '12px',
    color: '#6b7280',
    marginBottom: '16px',
    textAlign: 'center' as const,
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: 실제 회원가입 로직
    console.log('Register:', formData)
    onSwitchToLogin()
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
        <p style={{ textAlign: 'center', marginBottom: '24px', color: '#6b7280' }}>Register</p>

        <form onSubmit={handleSubmit}>
          <label style={labelStyle}>ID</label>
          <input
            type="text"
            value={formData.id}
            onChange={(e) => setFormData({...formData, id: e.target.value})}
            style={inputStyle}
            placeholder="아이디"
            required
          />

          <label style={labelStyle}>PW</label>
          <input
            type="password"
            value={formData.password}
            onChange={(e) => setFormData({...formData, password: e.target.value})}
            style={inputStyle}
            placeholder="비밀번호"
            required
          />

          <p style={noteStyle}>개인정보수집동의</p>

          <label style={labelStyle}>Gender</label>
          <select
            value={formData.gender}
            onChange={(e) => setFormData({...formData, gender: e.target.value})}
            style={inputStyle}
            required
          >
            <option value="">선택</option>
            <option value="male">남성</option>
            <option value="female">여성</option>
            <option value="other">기타</option>
          </select>

          <label style={labelStyle}>Birth</label>
          <input
            type="date"
            value={formData.birth}
            onChange={(e) => setFormData({...formData, birth: e.target.value})}
            style={inputStyle}
            required
          />

          <label style={labelStyle}>Region</label>
          <input
            type="text"
            value={formData.region}
            onChange={(e) => setFormData({...formData, region: e.target.value})}
            style={inputStyle}
            placeholder="지역"
            required
          />

          <label style={labelStyle}>Email</label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
            style={inputStyle}
            placeholder="이메일"
            required
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
      </div>
    </div>
  )
}