'use client'

export default function EmailTestPage() {
  const orderId = 'test_order_123'
  const productId = 'F1'
  const productImage = '/image/dress/001.jpeg'
  const designer = 'Designer A'
  const category = 'Dress'
  const finalPrice = 500000
  const secondPrice = 450000

  const paymentUrl = `http://localhost:3000/payment/${orderId}`

  return (
    <div style={{ margin: 0, padding: 0, fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif', backgroundColor: '#f9fafb' }}>
      <div style={{ padding: '40px 20px' }}>
        <div style={{ maxWidth: '600px', margin: '0 auto', backgroundColor: '#ffffff', border: '1px solid #e5e7eb' }}>
          
          {/* 헤더 */}
          <div style={{ padding: '40px 40px 30px', textAlign: 'center', borderBottom: '1px solid #e5e7eb' }}>
            <h1 style={{ margin: 0, fontSize: '28px', fontWeight: 600, color: '#111827' }}>gri:d</h1>
            <p style={{ margin: '8px 0 0', fontSize: '16px', color: '#16a34a', fontWeight: 600 }}>🎉 낙찰을 축하드립니다!</p>
          </div>

          {/* 상품 정보 */}
          <div style={{ padding: '30px 40px' }}>
            <h2 style={{ margin: '0 0 20px', fontSize: '18px', fontWeight: 600, color: '#111827' }}>낙찰 상품</h2>
            
            <div style={{ width: '100%', backgroundColor: '#f9fafb', border: '1px solid #e5e7eb' }}>
              <div style={{ padding: '20px' }}>
                <div style={{ display: 'flex', gap: '16px' }}>
                  <img src={productImage} alt="Product" style={{ width: '80px', height: '80px', objectFit: 'cover', border: '1px solid #e5e7eb' }} />
                  <div>
                    <p style={{ margin: 0, fontSize: '12px', color: '#6b7280' }}>{category}</p>
                    <p style={{ margin: '4px 0', fontSize: '16px', fontWeight: 500, color: '#111827' }}>Product {productId}</p>
                    <p style={{ margin: '4px 0 0', fontSize: '14px', color: '#4b5563' }}>by {designer}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 결제 금액 안내 */}
          <div style={{ padding: '0 40px 30px' }}>
            <div style={{ width: '100%', backgroundColor: '#fef3c7', border: '1px solid #fbbf24', padding: '20px' }}>
              <p style={{ margin: '0 0 8px', fontSize: '14px', color: '#92400e', fontWeight: 500 }}>💡 차순위 입찰가 적용</p>
              <p style={{ margin: 0, fontSize: '13px', color: '#78350f', lineHeight: 1.5 }}>
                경매 규정에 따라 최고 입찰가가 아닌 <strong>차순위 입찰가(2등 금액)</strong>로 결제하시게 됩니다.
              </p>
              <div style={{ marginTop: '12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                  <span style={{ fontSize: '13px', color: '#78350f' }}>귀하의 최고 입찰가:</span>
                  <span style={{ fontSize: '13px', color: '#78350f', textDecoration: 'line-through' }}>₩ {finalPrice.toLocaleString()}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: '16px', color: '#111827', fontWeight: 600 }}>실제 결제금액:</span>
                  <span style={{ fontSize: '18px', color: '#16a34a', fontWeight: 700 }}>₩ {secondPrice.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>

          {/* 결제 링크 버튼 */}
          <div style={{ padding: '0 40px 30px', textAlign: 'center' }}>
            <a href={paymentUrl} style={{ display: 'inline-block', padding: '16px 40px', backgroundColor: '#111827', color: '#ffffff', textDecoration: 'none', fontSize: '16px', fontWeight: 600 }}>
              결제 정보 입력하기
            </a>
            {/* <p style={{ margin: '12px 0 0', fontSize: '12px', color: '#6b7280' }}>또는 아래 폼에서 직접 입력하실 수 있습니다</p> */}
          </div>

          {/* 주의사항 */}
          <div style={{ padding: '0 40px 30px' }}>
            <div style={{ backgroundColor: '#fef2f2', border: '1px solid #fca5a5', padding: '16px' }}>
              <p style={{ margin: 0, fontSize: '13px', color: '#991b1b', fontWeight: 500 }}>⚠️ 결제 기한 안내</p>
              <p style={{ margin: '8px 0 0', fontSize: '12px', color: '#991b1b', lineHeight: 1.5 }}>
                낙찰 후 <strong>48시간 이내</strong>에 결제 정보를 입력하지 않으시면 낙찰이 자동 취소됩니다.
              </p>
            </div>
          </div>

          {/* 푸터 */}
          <div style={{ padding: '30px 40px', backgroundColor: '#f9fafb', borderTop: '1px solid #e5e7eb', textAlign: 'center' }}>
            <p style={{ margin: 0, fontSize: '12px', color: '#6b7280' }}>궁금하신 사항이 있으시면 언제든지 문의해주세요.</p>
            <p style={{ margin: '8px 0 0', fontSize: '12px', color: '#9ca3af' }}>© {new Date().getFullYear()} gri:d. All rights reserved.</p>
          </div>
        </div>
      </div>
    </div>
  )
}