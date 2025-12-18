'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Header from '@/components/Header'

export default function LoungePage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    id: 'user123', // 현재 사용자 ID
    newPassword: '',
    newEmail: '',
  })

  const mainStyle = {
    width: '100%',
    minHeight: '100vh',
    backgroundColor: '#f9fafb',
    paddingTop: '80px',
    paddingBottom: '48px',
  }

  const containerStyle = {
    maxWidth: '500px',
    margin: '0 auto',
    padding: '0 24px',
  }

  const cardStyle = {
    backgroundColor: 'white',
    borderRadius: '16px',
    padding: '40px',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
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

  const noteStyle = {
    fontSize: '12px',
    color: '#6b7280',
    marginBottom: '16px',
    textAlign: 'center' as const,
  }

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: 실제 저장 로직
    console.log('Save changes:', formData)
    alert('변경사항이 저장되었습니다.')
  }

  return (
    <div style={mainStyle}>
      <Header />
      <main style={containerStyle}>
        <div style={cardStyle}>
          <h2 style={titleStyle}>gri:d</h2>
          <p style={{ textAlign: 'center', marginBottom: '24px', color: '#6b7280' }}>Lounge</p>

          <form onSubmit={handleSave}>
            <label style={labelStyle}>ID</label>
            <input
              type="text"
              value={formData.id}
              style={{...inputStyle, backgroundColor: '#f3f4f6'}}
              disabled
            />

            <label style={labelStyle}>change PW</label>
            <input
              type="password"
              value={formData.newPassword}
              onChange={(e) => setFormData({...formData, newPassword: e.target.value})}
              style={inputStyle}
              placeholder="새 비밀번호"
            />

            <label style={labelStyle}>change Email</label>
            <input
              type="email"
              value={formData.newEmail}
              onChange={(e) => setFormData({...formData, newEmail: e.target.value})}
              style={inputStyle}
              placeholder="새 이메일"
            />

            <p style={noteStyle}>개인정보수집동의</p>

            <button
              type="submit"
              style={buttonStyle}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#111827'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#1f2937'}
            >
              Save
            </button>
          </form>
        </div>
      </main>
    </div>
  )
}