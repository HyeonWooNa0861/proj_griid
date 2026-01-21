export default function WinnerEmailPreviewPage() {
  // 테스트 데이터
  const testData = {
    orderId: 'test-order-123',
    productId: 'a1',
    productImage: '/logo/Griid_Brand_Logo_Toolkit/IG_Feed_WH/Griid_IG_Feed_Left_WH.png',
    designer: 'Designer A',
    category: 'Outer',
    finalPrice: 180000,
    secondPrice: 130000,
    paymentUrl: `http://localhost:3000/payment/test-order-123`,
  }

  return (
    <div style={{ margin: 0, padding: 0, fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif', backgroundColor: '#f9fafb' }}>
      <table role="presentation" style={{ width: '100%', borderCollapse: 'collapse' }}>
        <tbody>
          <tr>
            <td style={{ padding: '40px 20px' }}>
              <table role="presentation" style={{ maxWidth: '600px', margin: '0 auto', backgroundColor: '#ffffff', border: '1px solid #e5e7eb' }}>
                
                {/* 헤더 */}
                <tbody>
                  <tr>
                    <td style={{ padding: '40px 40px 30px', textAlign: 'center', borderBottom: '1px solid #e5e7eb' }}>
                      <h1 style={{ margin: 0, fontSize: '28px', fontWeight: 600, color: '#111827' }}>gri:d</h1>
                      <p style={{ margin: '8px 0 0', fontSize: '16px', color: '#16a34a', fontWeight: 600 }}>🎉 낙찰을 축하드립니다!</p>
                    </td>
                  </tr>

                  {/* 상품 정보 */}
                  <tr>
                    <td style={{ padding: '30px 40px' }}>
                      <h2 style={{ margin: '0 0 20px', fontSize: '18px', fontWeight: 600, color: '#111827' }}>낙찰 상품</h2>
                      
                      <table role="presentation" style={{ width: '100%', borderCollapse: 'collapse', backgroundColor: '#f9fafb', border: '1px solid #e5e7eb' }}>
                        <tbody>
                          <tr>
                            <td style={{ padding: '20px' }}>
                              <table role="presentation" style={{ width: '100%' }}>
                                <tbody>
                                  <tr>
                                    <td style={{ width: '80px', verticalAlign: 'top' }}>
                                      <img src={testData.productImage} alt="Product" style={{ width: '80px', height: '80px', objectFit: 'cover', border: '1px solid #e5e7eb' }} />
                                    </td>
                                    <td style={{ paddingLeft: '16px', verticalAlign: 'top' }}>
                                      <p style={{ margin: 0, fontSize: '12px', color: '#6b7280' }}>{testData.category}</p>
                                      <p style={{ margin: '4px 0', fontSize: '16px', fontWeight: 500, color: '#111827' }}>Product {testData.productId}</p>
                                      <p style={{ margin: '4px 0 0', fontSize: '14px', color: '#4b5563' }}>by {testData.designer}</p>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>

                  {/* 결제 금액 안내 */}
                  <tr>
                    <td style={{ padding: '0 40px 30px' }}>
                      <table role="presentation" style={{ width: '100%', backgroundColor: '#fef3c7', border: '1px solid #fbbf24' }}>
                        <tbody>
                          <tr>
                            <td style={{ padding: '20px' }}>
                              <p style={{ margin: '0 0 8px', fontSize: '14px', color: '#92400e', fontWeight: 500 }}>💡 차순위 입찰가 적용</p>
                              <p style={{ margin: 0, fontSize: '13px', color: '#78350f', lineHeight: 1.5 }}>
                                경매 규정에 따라 최고 입찰가가 아닌 <strong>차순위 입찰가(2등 금액)</strong>로 결제하시게 됩니다.
                              </p>
                              <table role="presentation" style={{ width: '100%', marginTop: '12px' }}>
                                <tbody>
                                  <tr>
                                    <td style={{ fontSize: '13px', color: '#78350f' }}>귀하의 최고 입찰가:</td>
                                    <td style={{ textAlign: 'right', fontSize: '13px', color: '#78350f', textDecoration: 'line-through' }}>₩ {testData.finalPrice.toLocaleString()}</td>
                                  </tr>
                                  <tr>
                                    <td style={{ fontSize: '16px', color: '#111827', fontWeight: 600, paddingTop: '4px' }}>실제 결제금액:</td>
                                    <td style={{ textAlign: 'right', fontSize: '18px', color: '#16a34a', fontWeight: 700, paddingTop: '4px' }}>₩ {testData.secondPrice.toLocaleString()}</td>
                                  </tr>
                                </tbody>
                              </table>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>

                  {/* 결제 링크 버튼 */}
                  <tr>
                    <td style={{ padding: '0 40px 30px', textAlign: 'center' }}>
                      <a href={testData.paymentUrl} style={{ display: 'inline-block', padding: '16px 40px', backgroundColor: '#111827', color: '#ffffff', textDecoration: 'none', fontSize: '16px', fontWeight: 600 }}>
                        결제 정보 입력하기
                      </a>
                      <p style={{ margin: '12px 0 0', fontSize: '12px', color: '#6b7280' }}>또는 아래 폼에서 직접 입력하실 수 있습니다</p>
                    </td>
                  </tr>

                  {/* 이메일 내 결제 폼 */}
                  <tr>
                    <td style={{ padding: '0 40px 40px' }}>
                      <div style={{ border: '1px solid #e5e7eb', padding: '24px', backgroundColor: '#f9fafb' }}>
                        <h3 style={{ margin: '0 0 16px', fontSize: '16px', fontWeight: 600, color: '#111827' }}>배송 정보 입력</h3>
                        <p style={{ margin: '0 0 16px', fontSize: '13px', color: '#6b7280' }}>※ 이메일에서는 직접 제출이 불가능합니다. 위 버튼을 클릭하여 웹페이지에서 입력해주세요.</p>
                        
                        <table role="presentation" style={{ width: '100%' }}>
                          <tbody>
                            <tr>
                              <td style={{ paddingBottom: '12px' }}>
                                <label style={{ display: 'block', fontSize: '13px', fontWeight: 500, color: '#374151', marginBottom: '4px' }}>이름 *</label>
                                <input type="text" disabled style={{ width: '100%', padding: '8px', border: '1px solid #d1d5db', backgroundColor: '#f3f4f6', fontSize: '14px' }} placeholder="홍길동" />
                              </td>
                            </tr>
                            <tr>
                              <td style={{ paddingBottom: '12px' }}>
                                <label style={{ display: 'block', fontSize: '13px', fontWeight: 500, color: '#374151', marginBottom: '4px' }}>연락처 *</label>
                                <input type="tel" disabled style={{ width: '100%', padding: '8px', border: '1px solid #d1d5db', backgroundColor: '#f3f4f6', fontSize: '14px' }} placeholder="010-1234-5678" />
                              </td>
                            </tr>
                            <tr>
                              <td style={{ paddingBottom: '12px' }}>
                                <label style={{ display: 'block', fontSize: '13px', fontWeight: 500, color: '#374151', marginBottom: '4px' }}>우편번호 *</label>
                                <input type="text" disabled style={{ width: '100%', padding: '8px', border: '1px solid #d1d5db', backgroundColor: '#f3f4f6', fontSize: '14px' }} placeholder="12345" />
                              </td>
                            </tr>
                            <tr>
                              <td style={{ paddingBottom: '12px' }}>
                                <label style={{ display: 'block', fontSize: '13px', fontWeight: 500, color: '#374151', marginBottom: '4px' }}>주소 *</label>
                                <input type="text" disabled style={{ width: '100%', padding: '8px', border: '1px solid #d1d5db', backgroundColor: '#f3f4f6', fontSize: '14px' }} placeholder="서울특별시 강남구 테헤란로 123" />
                              </td>
                            </tr>
                            <tr>
                              <td style={{ paddingBottom: '12px' }}>
                                <label style={{ display: 'block', fontSize: '13px', fontWeight: 500, color: '#374151', marginBottom: '4px' }}>상세주소 *</label>
                                <input type="text" disabled style={{ width: '100%', padding: '8px', border: '1px solid #d1d5db', backgroundColor: '#f3f4f6', fontSize: '14px' }} placeholder="아파트동/호수, 건물명, 층수 등" />
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <label style={{ display: 'block', fontSize: '13px', fontWeight: 500, color: '#374151', marginBottom: '4px' }}>배송 요청사항 (선택, 최대 100자)</label>
                                <textarea disabled rows={3} style={{ width: '100%', padding: '8px', border: '1px solid #d1d5db', backgroundColor: '#f3f4f6', fontSize: '14px', resize: 'none' }} placeholder="예: 부재 시 경비실에 맡겨주세요"></textarea>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </td>
                  </tr>

                  {/* 주의사항 */}
                  <tr>
                    <td style={{ padding: '0 40px 30px' }}>
                      <div style={{ backgroundColor: '#fef2f2', border: '1px solid #fca5a5', padding: '16px' }}>
                        <p style={{ margin: 0, fontSize: '13px', color: '#991b1b', fontWeight: 500 }}>⚠️ 결제 기한 안내</p>
                        <p style={{ margin: '8px 0 0', fontSize: '12px', color: '#991b1b', lineHeight: 1.5 }}>
                          낙찰 후 <strong>48시간 이내</strong>에 결제 정보를 입력하지 않으시면 낙찰이 자동 취소됩니다.
                        </p>
                      </div>
                    </td>
                  </tr>

                  {/* 푸터 */}
                  <tr>
                    <td style={{ padding: '30px 40px', backgroundColor: '#f9fafb', borderTop: '1px solid #e5e7eb', textAlign: 'center' }}>
                      <p style={{ margin: 0, fontSize: '12px', color: '#6b7280' }}>궁금하신 사항이 있으시면 언제든지 문의해주세요.</p>
                      <p style={{ margin: '8px 0 0', fontSize: '12px', color: '#9ca3af' }}>© {new Date().getFullYear()} gri:d. All rights reserved.</p>
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

// 2. 결제 페이지 직접 접속

// 결제 페이지를 직접 보려면 URL에 테스트 주문 ID를 입력하면 됩니다:

// http://localhost:3000/payment/test-order-123