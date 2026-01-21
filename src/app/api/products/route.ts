import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const limit = parseInt(searchParams.get('limit') || '20')
    const random = searchParams.get('random') === 'true'

    // 데이터베이스에서 제품 가져오기
    // 예: Prisma, MongoDB, PostgreSQL 등
    // const products = await db.product.findMany({
    //   take: limit,
    //   orderBy: random ? { _random: 'asc' } : { createdAt: 'desc' },
    //   include: {
    //     images: true,
    //     designer: true,
    //     category: true,
    //   },
    // })

    // 임시 Mock 데이터
    const products = [
      {
        id: 'F1',
        category: 'Dress',
        designer: 'Designer A',
        images: [
          '/image/dress/001.jpeg',
          '/image/dress/002.jpeg',
        ],
      },
      // ... 더 많은 제품
    ]

    // 랜덤 정렬이 요청된 경우
    if (random) {
      products.sort(() => Math.random() - 0.5)
    }

    return NextResponse.json({
      products: products.slice(0, limit),
      total: products.length,
    })
  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    )
  }
}