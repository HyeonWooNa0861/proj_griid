import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      orderId,
      productId,
      productImage,
      designer,
      category,
      finalPrice,
      secondPrice,
      winnerEmail,
    } = body

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    })

    const paymentUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/payment/${orderId}`

    // HTML 이메일 템플릿 (결제 폼 포함)
    const htmlTemplate = `
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>낙찰 알림</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f9fafb;">
    <table role="presentation" style="width: 100%; border-collapse: collapse;">
        <tr>
            <td style="padding: 40px 20px;">
                <table role="presentation" style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border: 1px solid #e5e7eb;">
                    
                    <!-- 헤더 -->
                    <tr>
                        <td style="padding: 40px 40px 30px; text-align: center; border-bottom: 1px solid #e5e7eb;">
                            <h1 style="margin: 0; font-size: 28px; font-weight: 600; color: #111827;">gri:d</h1>
                            <p style="margin: 8px 0 0; font-size: 16px; color: #16a34a; font-weight: 600;">🎉 낙찰을 축하드립니다!</p>
                        </td>
                    </tr>

                    <!-- 상품 정보 -->
                    <tr>
                        <td style="padding: 30px 40px;">
                            <h2 style="margin: 0 0 20px; font-size: 18px; font-weight: 600; color: #111827;">낙찰 상품</h2>
                            
                            <table role="presentation" style="width: 100%; border-collapse: collapse; background-color: #f9fafb; border: 1px solid #e5e7eb;">
                                <tr>
                                    <td style="padding: 20px;">
                                        <table role="presentation" style="width: 100%;">
                                            <tr>
                                                <td style="width: 80px; vertical-align: top;">
                                                    <img src="${productImage}" alt="Product" style="width: 80px; height: 80px; object-fit: cover; border: 1px solid #e5e7eb;">
                                                </td>
                                                <td style="padding-left: 16px; vertical-align: top;">
                                                    <p style="margin: 0; font-size: 12px; color: #6b7280;">${category}</p>
                                                    <p style="margin: 4px 0; font-size: 16px; font-weight: 500; color: #111827;">Product ${productId}</p>
                                                    <p style="margin: 4px 0 0; font-size: 14px; color: #4b5563;">by ${designer}</p>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>

                    <!-- 결제 금액 안내 -->
                    <tr>
                        <td style="padding: 0 40px 30px;">
                            <table role="presentation" style="width: 100%; background-color: #fef3c7; border: 1px solid #fbbf24;">
                                <tr>
                                    <td style="padding: 20px;">
                                        <p style="margin: 0 0 8px; font-size: 14px; color: #92400e; font-weight: 500;">💡 차순위 입찰가 적용</p>
                                        <p style="margin: 0; font-size: 13px; color: #78350f; line-height: 1.5;">
                                            경매 규정에 따라 최고 입찰가가 아닌 <strong>차순위 입찰가(2등 금액)</strong>로 결제하시게 됩니다.
                                        </p>
                                        <table role="presentation" style="width: 100%; margin-top: 12px;">
                                            <tr>
                                                <td style="font-size: 13px; color: #78350f;">귀하의 최고 입찰가:</td>
                                                <td style="text-align: right; font-size: 13px; color: #78350f; text-decoration: line-through;">₩ ${finalPrice.toLocaleString()}</td>
                                            </tr>
                                            <tr>
                                                <td style="font-size: 16px; color: #111827; font-weight: 600; padding-top: 4px;">실제 결제금액:</td>
                                                <td style="text-align: right; font-size: 18px; color: #16a34a; font-weight: 700; padding-top: 4px;">₩ ${secondPrice.toLocaleString()}</td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>

                    <!-- 결제 링크 버튼 -->
                    <tr>
                        <td style="padding: 0 40px 30px; text-align: center;">
                            <a href="${paymentUrl}" style="display: inline-block; padding: 16px 40px; background-color: #111827; color: #ffffff; text-decoration: none; font-size: 16px; font-weight: 600; border-radius: 0;">
                                결제 정보 입력하기
                            </a>
                            <p style="margin: 12px 0 0; font-size: 12px; color: #6b7280;">또는 아래 폼에서 직접 입력하실 수 있습니다</p>
                        </td>
                    </tr>

                    <!-- 이메일 내 결제 폼 (참고: 실제 제출은 웹페이지에서만 가능) -->
                    <tr>
                        <td style="padding: 0 40px 40px;">
                            <div style="border: 1px solid #e5e7eb; padding: 24px; background-color: #f9fafb;">
                                <h3 style="margin: 0 0 16px; font-size: 16px; font-weight: 600; color: #111827;">배송 정보 입력</h3>
                                <p style="margin: 0 0 16px; font-size: 13px; color: #6b7280;">※ 이메일에서는 직접 제출이 불가능합니다. 위 버튼을 클릭하여 웹페이지에서 입력해주세요.</p>
                                
                                <table role="presentation" style="width: 100%;">
                                    <tr>
                                        <td style="padding-bottom: 12px;">
                                            <label style="display: block; font-size: 13px; font-weight: 500; color: #374151; margin-bottom: 4px;">이름 *</label>
                                            <input type="text" disabled style="width: 100%; padding: 8px; border: 1px solid #d1d5db; background-color: #f3f4f6; font-size: 14px;" placeholder="홍길동">
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style="padding-bottom: 12px;">
                                            <label style="display: block; font-size: 13px; font-weight: 500; color: #374151; margin-bottom: 4px;">연락처 *</label>
                                            <input type="tel" disabled style="width: 100%; padding: 8px; border: 1px solid #d1d5db; background-color: #f3f4f6; font-size: 14px;" placeholder="010-1234-5678">
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style="padding-bottom: 12px;">
                                            <label style="display: block; font-size: 13px; font-weight: 500; color: #374151; margin-bottom: 4px;">우편번호 *</label>
                                            <input type="text" disabled style="width: 100%; padding: 8px; border: 1px solid #d1d5db; background-color: #f3f4f6; font-size: 14px;" placeholder="12345">
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style="padding-bottom: 12px;">
                                            <label style="display: block; font-size: 13px; font-weight: 500; color: #374151; margin-bottom: 4px;">주소 *</label>
                                            <input type="text" disabled style="width: 100%; padding: 8px; border: 1px solid #d1d5db; background-color: #f3f4f6; font-size: 14px;" placeholder="서울특별시 강남구 테헤란로 123">
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style="padding-bottom: 12px;">
                                            <label style="display: block; font-size: 13px; font-weight: 500; color: #374151; margin-bottom: 4px;">상세주소 *</label>
                                            <input type="text" disabled style="width: 100%; padding: 8px; border: 1px solid #d1d5db; background-color: #f3f4f6; font-size: 14px;" placeholder="아파트동/호수, 건물명, 층수 등">
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <label style="display: block; font-size: 13px; font-weight: 500; color: #374151; margin-bottom: 4px;">배송 요청사항 (선택, 최대 100자)</label>
                                            <textarea disabled rows="3" style="width: 100%; padding: 8px; border: 1px solid #d1d5db; background-color: #f3f4f6; font-size: 14px; resize: none;" placeholder="예: 부재 시 경비실에 맡겨주세요"></textarea>
                                        </td>
                                    </tr>
                                </table>
                            </div>
                        </td>
                    </tr>

                    <!-- 주의사항 -->
                    <tr>
                        <td style="padding: 0 40px 30px;">
                            <div style="background-color: #fef2f2; border: 1px solid #fca5a5; padding: 16px;">
                                <p style="margin: 0; font-size: 13px; color: #991b1b; font-weight: 500;">⚠️ 결제 기한 안내</p>
                                <p style="margin: 8px 0 0; font-size: 12px; color: #991b1b; line-height: 1.5;">
                                    낙찰 후 <strong>48시간 이내</strong>에 결제 정보를 입력하지 않으시면 낙찰이 자동 취소됩니다.
                                </p>
                            </div>
                        </td>
                    </tr>

                    <!-- 푸터 -->
                    <tr>
                        <td style="padding: 30px 40px; background-color: #f9fafb; border-top: 1px solid #e5e7eb; text-align: center;">
                            <p style="margin: 0; font-size: 12px; color: #6b7280;">궁금하신 사항이 있으시면 언제든지 문의해주세요.</p>
                            <p style="margin: 8px 0 0; font-size: 12px; color: #9ca3af;">© ${new Date().getFullYear()} gri:d. All rights reserved.</p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>
    `

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: winnerEmail,
      subject: `[gri:d] 🎉 낙찰 축하드립니다 - Product ${productId}`,
      html: htmlTemplate,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Email sending error:', error)
    return NextResponse.json(
      { error: 'Failed to send email' },
      { status: 500 }
    )
  }
}