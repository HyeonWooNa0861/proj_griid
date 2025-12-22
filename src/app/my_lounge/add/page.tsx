'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

export default function CreateProductPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    description: '',
  })
  const [images, setImages] = useState<File[]>([])
  const [imagePreviews, setImagePreviews] = useState<string[]>([])

  const mainStyle = {
    width: '100%',
    minHeight: '100vh',
    backgroundColor: '#f9fafb',
    padding: '40px 20px',
  }

  const containerStyle = {
    maxWidth: '800px',
    margin: '0 auto',
    backgroundColor: 'white',
    borderRadius: '0px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
    position: 'relative' as const,
  }

  const headerStyle = {
    padding: '32px 40px',
    borderBottom: '1px solid #e5e7eb',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  }

  const titleStyle = {
    fontSize: '24px',
    fontWeight: '600',
    color: '#1a1a1a',
    letterSpacing: '-0.5px',
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
    transition: 'background-color 0.2s',
    fontSize: '24px',
    color: '#1a1a1a',
  }

  const contentStyle = {
    padding: '40px',
  }

  const sectionStyle = {
    marginBottom: '32px',
  }

  const labelStyle = {
    display: 'block',
    fontSize: '14px',
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: '12px',
    letterSpacing: '0.3px',
  }

  const inputStyle = {
    width: '100%',
    padding: '12px 16px',
    border: '1px solid #d1d5db',
    borderRadius: '0px',
    fontSize: '15px',
    color: '#1a1a1a',
    boxSizing: 'border-box' as const,
    transition: 'border-color 0.2s',
    outline: 'none',
  }

  const textareaStyle = {
    ...inputStyle,
    minHeight: '120px',
    resize: 'vertical' as const,
    fontFamily: 'inherit',
    lineHeight: '1.6',
  }

  const imageUploadContainerStyle = {
    marginBottom: '32px',
  }

  const imageUploadAreaStyle = {
    display: 'block',
    width: '100%',
    boxSizing: 'border-box' as const,
    border: '2px dashed #d1d5db',
    borderRadius: '0px',
    padding: '80px 40px',
    textAlign: 'center' as const,
    cursor: 'pointer',
    transition: 'all 0.2s',
    backgroundColor: 'white',
    outline: 'none',
  }

  const uploadIconContainerStyle = {
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    justifyContent: 'center',
  }

  const uploadTextStyle = {
    color: '#6b7280',
    fontSize: '15px',
    marginTop: '16px',
    fontWeight: '500',
  }

  const uploadSubTextStyle = {
    color: '#9ca3af',
    fontSize: '13px',
    marginTop: '8px',
  }

  const imageGridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '16px',
    marginTop: '24px',
  }

  const imageItemStyle = {
    position: 'relative' as const,
    width: '100%',
    paddingBottom: '100%',
    backgroundColor: '#f9fafb',
    borderRadius: '0px',
    overflow: 'hidden',
    border: '1px solid #e5e7eb',
  }

  const imageContentStyle = {
    position: 'absolute' as const,
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
  }

  const removeImageButtonStyle = {
    position: 'absolute' as const,
    top: '8px',
    right: '8px',
    width: '28px',
    height: '28px',
    backgroundColor: 'rgba(0,0,0,0.8)',
    border: 'none',
    borderRadius: '2px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    fontSize: '18px',
    lineHeight: '1',
    transition: 'background-color 0.2s',
    zIndex: 10,
  }

  const footerStyle = {
    padding: '24px 40px',
    borderTop: '1px solid #e5e7eb',
    display: 'flex',
    gap: '12px',
    justifyContent: 'flex-end',
  }

  const buttonStyle = {
    padding: '12px 32px',
    border: 'none',
    borderRadius: '0px',
    fontSize: '15px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.2s',
  }

  const primaryButtonStyle = {
    ...buttonStyle,
    backgroundColor: '#1a1a1a',
    color: 'white',
  }

  const secondaryButtonStyle = {
    ...buttonStyle,
    backgroundColor: '#f3f4f6',
    color: '#1a1a1a',
  }

  const selectStyle = {
    ...inputStyle,
    cursor: 'pointer',
    appearance: 'none' as const,
    backgroundImage: `url("data:image/svg+xml,%3Csvg width='12' height='8' viewBox='0 0 12 8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1L6 6L11 1' stroke='%23666' stroke-width='2' stroke-linecap='round'/%3E%3C/svg%3E")`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'right 16px center',
    paddingRight: '40px',
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    setImages(prev => [...prev, ...files])
    
    files.forEach(file => {
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreviews(prev => [...prev, reader.result as string])
      }
      reader.readAsDataURL(file)
    })
  }

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index))
    setImagePreviews(prev => prev.filter((_, i) => i !== index))
  }

    const handleSubmit = async () => {
    try {
        // TODO: 백엔드 API 연동
        // await createProduct(formData, images)

        alert('제품이 등록되었습니다!')
        router.push('/')
    } catch (error) {
        console.error(error)
        alert('제품 등록 중 오류가 발생했습니다.')
    }
    }


  const handleSaveDraft = () => {
    console.log('임시저장:', { formData, images })
    alert('임시저장되었습니다!')
  }

  return (
    <div style={mainStyle}>
      <div style={containerStyle}>
        {/* 헤더 */}
        <div style={headerStyle}>
          <h1 style={titleStyle}>제품 등록</h1>
          <button 
            style={closeButtonStyle}
            onClick={() => router.back()}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f3f4f6'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
          >
            ✕
          </button>
        </div>

        {/* 콘텐츠 */}
        <div style={contentStyle}>
          {/* 이미지 업로드 */}
          <div style={imageUploadContainerStyle}>
            <p style={labelStyle}>제품 사진</p>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageUpload}
              style={{ display: 'none' }}
              id="image-upload"
            />
            <label 
              htmlFor="image-upload"
              style={imageUploadAreaStyle}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#9ca3af'
                e.currentTarget.style.backgroundColor = '#fafafa'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = '#d1d5db'
                e.currentTarget.style.backgroundColor = 'white'
              }}
            >
              <div style={uploadIconContainerStyle}>
                <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#d1d5db" strokeWidth="1.5">
                  <rect x="3" y="3" width="18" height="18" rx="0" ry="0"/>
                  <circle cx="8.5" cy="8.5" r="1.5"/>
                  <polyline points="21 15 16 10 5 21"/>
                </svg>
                <p style={uploadTextStyle}>
                  클릭하여 이미지 업로드
                </p>
                <p style={uploadSubTextStyle}>
                  JPG, PNG (최대 10MB)
                </p>
              </div>
            </label>

            {imagePreviews.length > 0 && (
              <div style={imageGridStyle}>
                {imagePreviews.map((preview, index) => (
                  <div key={index} style={imageItemStyle}>
                    <div style={imageContentStyle}>
                      <Image 
                        src={preview} 
                        alt={`Preview ${index + 1}`}
                        fill
                        style={{ objectFit: 'cover' }}
                      />
                    </div>
                    <button
                      style={removeImageButtonStyle}
                      onClick={(e) => {
                        e.preventDefault()
                        removeImage(index)
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(0,0,0,1)'}
                      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.8)'}
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* 제목 */}
          <div style={sectionStyle}>
            <p style={labelStyle}>제목</p>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="제품명을 입력하세요"
              style={inputStyle}
              onFocus={(e) => e.currentTarget.style.borderColor = '#1a1a1a'}
              onBlur={(e) => e.currentTarget.style.borderColor = '#d1d5db'}
            />
          </div>

          {/* 카테고리 */}
          <div style={sectionStyle}>
            <p style={labelStyle}>카테고리</p>
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              style={selectStyle}
              onFocus={(e) => e.currentTarget.style.borderColor = '#1a1a1a'}
              onBlur={(e) => e.currentTarget.style.borderColor = '#d1d5db'}
            >
              <option value="">선택하세요</option>
              <option value="top">Top</option>
              <option value="outer">Outer</option>
              <option value="bottom">Bottom</option>
              <option value="dress">Dress</option>
              <option value="acc">Acc</option>
              <option value="craft">Craft</option>
              <option value="objet">Objet</option>
              <option value="jewelry">Jewelry</option>
              <option value="etc">ETC</option>
            </select>
          </div>

          {/* 설명 */}
          <div style={sectionStyle}>
            <p style={labelStyle}>설명</p>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="제품에 대한 설명을 입력하세요"
              style={textareaStyle}
              onFocus={(e) => e.currentTarget.style.borderColor = '#1a1a1a'}
              onBlur={(e) => e.currentTarget.style.borderColor = '#d1d5db'}
            />
          </div>
        </div>

        {/* 푸터 */}
        <div style={footerStyle}>
          <button
            onClick={handleSaveDraft}
            style={secondaryButtonStyle}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#e5e7eb'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#f3f4f6'}
          >
            임시저장
          </button>
          <button
            onClick={handleSubmit}
            style={primaryButtonStyle}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#000'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#1a1a1a'}
          >
            등록하기
          </button>
        </div>
      </div>
    </div>
  )
}
