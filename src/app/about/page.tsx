'use client'

import Header from '@/components/Header'

export default function AboutPage() {
  const mainStyle = {
    width: '100%',
    minHeight: '100vh',
    backgroundColor: '#ffffff',
    paddingTop: '100px',
    paddingBottom: '80px',
  }

  const containerStyle = {
    maxWidth: '800px',
    margin: '0 auto',
    padding: '0 40px',
  }

  const mainTextStyle = {
    fontSize: '18px',
    lineHeight: '1.8',
    color: '#1a1a1a',
    textAlign: 'center' as const,
    marginBottom: '40px',
    fontWeight: '400',
    letterSpacing: '0.3px',
  }

  const creditStyle = {
    fontSize: '14px',
    color: '#666666',
    textAlign: 'center' as const,
    marginBottom: '36px',
    fontWeight: '300',
  }

  const creditLinksWrapStyle = {
    marginTop: '6px',
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    gap: '4px',
    padding: '0 16px',        
    wordBreak: 'break-word' as const, 
  }

  const creditLinkStyle = {
    fontSize: '14px',
    fontWeight: '300',
    color: '#666666',
    textDecoration: 'none',
    transition: 'color 0.2s',
  }
  
  const sectionTitleStyle = {
    fontSize: '25px',
    fontWeight: '600',
    letterSpacing: '2px',
    textAlign: 'center' as const,
    marginBottom: '32px',
    marginTop: '0px',
    color: '#1a1a1a',
  }

  const contactGridStyle = {
    display: 'grid',
    gridTemplateColumns: '1fr',
    gap: '48px',
    marginTop: '0px',
  }

  const contactItemStyle = {
    textAlign: 'center' as const,
  }

  const nameStyle = {
    fontSize: '15px',
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: '12px',
    letterSpacing: '0.5px',
  }

  const detailRowStyle = {
    fontSize: '14px',
    color: '#4a4a4a',
    marginBottom: '6px',
    lineHeight: '1.6',
  }

  const linkStyle = {
    color: '#1a1a1a',
    textDecoration: 'none',
    transition: 'color 0.2s',
  }

  const instagramMainStyle = {
    fontSize: '20px',
    fontWeight: '500',
    color: '#1a1a1a',
    textAlign: 'center' as const,
    marginTop: '0px',
    marginBottom: '0px',
    letterSpacing: '0.5px',
  }

  const dividerStyle = {
    width: '60px',
    height: '1px',
    backgroundColor: '#e0e0e0',
    margin: '120px auto',
  }

  const teamMembers = [
    {
      name: '나현우',
      phone: '010-4090-0861',
      email: 'nahw0861@kookmin.ac.kr',
      instagram: 'sigebert111',
    },
    {
      name: '선민제',
      phone: '010-3350-5474',
      email: 'minnnje@gmail.com',
      instagram: 'minnnje',
    },
    {
      name: '권세건',
      phone: '010-5229-5332',
      email: '@com',
      instagram: 'myststemissafe',
    },
  ]

  return (
    <div style={mainStyle}>
      <Header />
      
      <main style={containerStyle}>
        {/* 메인 소개 텍스트 */}
        <p style={mainTextStyle}>
          gri:d is a curation-based platform that connects creators and collectors.
          <br />
          We provide a minimal environment that allows full focus on the work itself,
          <br />
          aiming for an experience where design and storytelling are conveyed naturally.
        </p>

        {/* 디자이너 크레딧 */}
        <p style={creditStyle}>
          designed by Juhyun Sarah Na
        </p>
        <p style={creditLinksWrapStyle}>
          <a 
            href="mailto:jsnaadesign@gmail.com"
            style={creditLinkStyle}
            onMouseEnter={(e) => e.currentTarget.style.color = '#999'}
            onMouseLeave={(e) => e.currentTarget.style.color = '#666666'}
          >
            jsnaadesign@gmail.com
          </a>

          <a 
            href="https://juhyunsarahna.com"
            target="_blank" 
            rel="noopener noreferrer"
            style={creditLinkStyle}
            onMouseEnter={(e) => e.currentTarget.style.color = '#999'}
            onMouseLeave={(e) => e.currentTarget.style.color = '#666666'}
          >
            juhyunsarahna.com
          </a>
        </p>

        {/* 공식 인스타그램 */}
        <div style={{ margin: '150px 0' }}>
          <div style={instagramMainStyle}>
            <a 
              href="https://instagram.com/__griid__" 
              target="_blank" 
              rel="noopener noreferrer"
              style={linkStyle}
              onMouseEnter={(e) => e.currentTarget.style.color = '#999'}
              onMouseLeave={(e) => e.currentTarget.style.color = '#1a1a1a'}
            >
              @__griid__
            </a>
          </div>
        </div>

        {/* CONTACT 섹션 */}
        <h2 style={sectionTitleStyle}>Contact with director</h2>
        


        {/* 팀 멤버 정보 */}
        <div style={contactGridStyle}>
          {teamMembers.map((member, index) => (
            <div key={index} style={contactItemStyle}>
              <div style={nameStyle}>{member.name}</div>
              
              <div style={detailRowStyle}>
                {member.phone}
              </div>
              
              <div style={detailRowStyle}>
                <a 
                  href={`mailto:${member.email}`}
                  style={linkStyle}
                  onMouseEnter={(e) => e.currentTarget.style.color = '#999'}
                  onMouseLeave={(e) => e.currentTarget.style.color = '#1a1a1a'}
                >
                  {member.email}
                </a>
              </div>
              
              <div style={detailRowStyle}>
                <a 
                  href={`https://instagram.com/${member.instagram}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={linkStyle}
                  onMouseEnter={(e) => e.currentTarget.style.color = '#999'}
                  onMouseLeave={(e) => e.currentTarget.style.color = '#1a1a1a'}
                >
                  @{member.instagram}
                </a>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}