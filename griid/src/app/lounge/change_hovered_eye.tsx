'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Header from '@/components/Header'


export default function LoungePage() {
  const router = useRouter()
  const [showPw, setShowPw] = useState(false);
  const [hovered, setHovered] = useState(false);

  const EyeIcon = ({ active }: { active: boolean }) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      className={`
        w-5 h-5 
        pointer-events-none 
        transition-all duration-300 ease-out
        ${active
          ? 'text-gray-700 drop-shadow-[0_0_6px_rgba(0,0,0,0.35)]'
          : 'text-gray-400'}
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
  );
  
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
    //marginBottom: '16px',
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
          <h2 style={titleStyle}>ɡriːd</h2>
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
            <div style={{ position: 'relative' }}>
              <input
                type={showPw ? 'text' : 'password'}
                value={formData.newPassword}
                onChange={(e) =>
                  setFormData({ ...formData, newPassword: e.target.value })
                }
                style={{ ...inputStyle, paddingRight: '44px' }}
                placeholder="새 비밀번호"
              />

              <button
                type="button"
                onClick={() => setShowPw((prev) => !prev)}
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
                aria-label="toggle password visibility"
                style={{
                  position: 'absolute',
                  right: '12px',
                  top: 0,
                  bottom: 0,
                  margin: 'auto',
                  //transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  padding: 0,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <EyeIcon active={hovered || showPw} />
              </button>
            </div>

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
