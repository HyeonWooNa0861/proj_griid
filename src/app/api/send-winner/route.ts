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

    // 텍스트 이메일 템플릿
    const textTemplate = `
gri:d 낙찰 알림

안녕하세요,

축하드립니다! Product ${productId} 경매에서 낙찰되셨습니다.

상품 정보:
- 카테고리: ${category}
- 디자이너: ${designer}
- 최고 입찰가: ₩${finalPrice.toLocaleString()}
- 실제 결제금액 (차순위 입찰가): ₩${secondPrice.toLocaleString()}

아래 링크를 클릭하여 48시간 이내에 결제 정보를 입력해주세요:
${paymentUrl}

※ 기한 내 미입력 시 낙찰이 자동 취소됩니다.

감사합니다.
gri:d
    `

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: winnerEmail,
      subject: `[gri:d] 낙찰 축하 - Product ${productId}`,
      text: textTemplate,
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
