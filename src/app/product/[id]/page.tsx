//상세페이지
// src/app/product/[id]/page.tsx

interface Props {
  params: { id: string }
}

export default function ProductPage({ params }: { params: { id: string } }) {
  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <h1 className="text-3xl">Product {params.id}</h1>
      <p>정식 상세 페이지</p>
    </div>
  )
}
//정식 상세페이지

