'use client'

import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { useState, useRef } from 'react'

export default function ProductPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const scrollRef = useRef<HTMLDivElement | null>(null)

  /* ---------------- 상태 ---------------- */
  const [value, setValue] = useState('')
  const [logs, setLogs] = useState<number[]>([180000, 130000, 110000, 90000, 48000])
  const [expanded, setExpanded] = useState(false)
  const [error, setError] = useState('')

  /* ---------------- 계산 ---------------- */
  const maxLog = logs.length > 0 ? Math.max(...logs) : 0

  /* ---------------- 유틸 ---------------- */
  const formatNumber = (num: string) =>
    num.replace(/\B(?=(\d{3})+(?!\d))/g, ',')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const onlyNumber = e.target.value.replace(/[^\d]/g, '')
    setValue(formatNumber(onlyNumber))
    setError('')
  }

  const handleAddLog = () => {
    if (!value) return

    const rawNumber = Number(value.replaceAll(',', ''))

    if (rawNumber <= maxLog) {
      setError(`입력값은 ${maxLog.toLocaleString()} 보다 커야 합니다.`)
      return
    }

    setLogs((prev) => [rawNumber, ...prev])
    setValue('')
    setError('')
  }

  const handleHorizontalScroll = () => {
    if (!scrollRef.current) return

    const container = scrollRef.current
    const maxScroll = container.scrollWidth - container.clientWidth
    const current = container.scrollLeft

    if (current >= maxScroll - 10 || current <= 10) {
      container.scrollLeft = maxScroll / 3
    }
  }

  /* ---------------- 이미지 ---------------- */
  const images = [
    '/image/hat/image0.jpg',
    '/image/hat/image1.jpg',
    '/image/hat/image2.jpg',
  ]

  const infiniteImages = [...images, ...images, ...images]

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* 배경 */}
      <div className="absolute inset-0 bg-black/30 backdrop-blur-md" />

      {/* 카드 */}
      <div className="relative z-10 w-full max-w-4xl bg-white rounded-2xl shadow-xl max-h-[85vh] flex flex-col">

        {/* 헤더 */}
        <div className="flex items-center justify-between p-6 border-b">
          <h1 className="text-2xl font-semibold">Product {params.id}</h1>
          <button
            onClick={() => router.back()}
            className="w-8 h-8 flex items-center justify-center rounded-full text-gray-500 hover:bg-gray-100"
          >
            ✕
          </button>
        </div>

        {/* 스크롤 영역 */}
        <div className="flex-1 overflow-y-auto">

          {/* 이미지 가로 무한 루프 */}
          <div
            ref={scrollRef}
            onScroll={handleHorizontalScroll}
            className="flex gap-4 overflow-x-auto px-6 py-6 scroll-smooth"
          >
            {infiniteImages.map((src, idx) => (
              <div
                key={idx}
                className="relative w-64 h-64 shrink-0 rounded-xl overflow-hidden bg-gray-100"
              >
                <Image
                  src={src}
                  alt={`product image ${idx}`}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>

          {/* 숫자 입력 */}
          <div className="px-6 mb-2 flex flex-col gap-2">
            <div className="flex gap-3">
              <input
                type="text"
                value={value}
                onChange={handleChange}
                placeholder={`₩ ${maxLog.toLocaleString()} 보다 큰 금액 입력`}
                className={`
                  flex-1 border rounded-lg px-4 py-2 focus:outline-none
                  ${error ? 'border-red-400' : 'border-gray-300'}
                `}
              />
              <button
                onClick={handleAddLog}
                className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition"
              >
                입력
              </button>
            </div>

            {error && (
              <p className="text-sm text-red-500">{error}</p>
            )}
          </div>

          {/* 기록 리스트 */}
          <div className="px-6 mb-6">
            <div
              className={`
                border rounded-xl p-4 bg-gray-50
                transition-all duration-300
                ${expanded ? 'max-h-48 overflow-y-auto' : 'max-h-24 overflow-hidden'}
              `}
            >
              <ul className="space-y-2 text-sm text-gray-700">
                {logs.map((n, i) => (
                  <li key={i} className="flex justify-between">
                    <span>기록 {logs.length - i}</span>
                    <span className="font-medium">{n.toLocaleString()}</span>
                  </li>
                ))}
              </ul>
            </div>

            {logs.length > 4 && (
              <button
                onClick={() => setExpanded((p) => !p)}
                className="mt-2 text-sm text-gray-500 hover:text-gray-800 transition"
              >
                {expanded ? '접기 ▲' : '더보기 ▼'}
              </button>
            )}
          </div>

          {/* 설명 */}
          <div className="px-6 pb-6 text-gray-600 leading-relaxed">
            제품 상세 설명이 들어가는 영역입니다.
            설명이 길어지면 이 영역만 세로 스크롤됩니다.
            <br />
            מַה-נָּאוּ (mah-na’ú): 얼마나 아름다운가
            <br />
            עַל-הֶהָרִים (al-heharím): 산 위에
            <br />
            רַגְלֵי (raglé): 발들 (feet of…)
            <br />
            מְבַשֵּׂר / מַשְׁמִיעַ (mevasér / mashmi’a): 좋은 소식 전하는 자 / 알리는 자
            <br />
            שָׁלֹום…יְשׁוּעָה (shalóm…yeshu’á): 평화와 구원을
            <br />
            אֹמֵר לְצִיֹּון (omer le-Tsiyon): 시온에게 말하는 자
            <br />
            מָלַךְ אֱלֹהָיִךְ (malakh Elohayikh): “네 하나님이 통치하신다”
            <br />
            יְהוָה רֹעִי לֹא אֶחְסָר׃  
            בִּנְאוֹת דֶּשֶׁא יַרְבִּיצֵנִי  
            עַל־מֵי מְנֻחוֹת יְנַהֲלֵנִי׃  
            נַפְשִׁי יְשׁוֹבֵב  
            יַנְחֵנִי בְמַעְגְּלֵי־צֶדֶק  
            לְמַעַן שְׁמוֹ׃  
            <br />
            גַּם כִּי־אֵלֵךְ בְּגֵיא צַלְמָוֶת  
            לֹא־אִירָא רָע  
            כִּי־אַתָּה עִמָּדִי  
            שִׁבְטְךָ וּמִשְׁעַנְתֶּךָ  
            הֵמָּה יְנַחֲמֻנִי׃  
            <br />
            תַּעֲרֹךְ לְפָנַי שֻׁלְחָן  
            נֶגֶד צֹרְרָי  
            דִּשַּׁנְתָּ בַשֶּׁמֶן רֹאשִׁי  
            כּוֹסִי רְוָיָה׃  
            <br />
            אַךְ טוֹב וָחֶסֶד  
            יִרְדְּפוּנִי כָּל־יְמֵי חַיָּי  
            וְשַׁבְתִּי בְּבֵית־יְהוָה  
            לְאֹרֶךְ יָמִים׃
            <br />
            לַכֹּל זְמָן  
            וְעֵת לְכָל־חֵפֶץ  
            תַּחַת הַשָּׁמָיִם׃  
            <br />
            עֵת לָלֶדֶת וְעֵת לָמוּת  
            עֵת לָטַעַת וְעֵת לַעֲקוֹר נָטוּעַ׃  
            עֵת לַהֲרוֹג וְעֵת לִרְפּוֹא  
            עֵת לִפְרוֹץ וְעֵת לִבְנוֹת׃  
            <br />
            עֵת לִבְכּוֹת וְעֵת לִשְׂחוֹק  
            עֵת סְפוֹד וְעֵת רְקוֹד׃  
            עֵת לְהַשְׁלִיךְ אֲבָנִים  
            וְעֵת כְּנוֹס אֲבָנִים׃  
            <br />
            עֵת לַחֲבוֹק וְעֵת לִרְחוֹק מֵחַבֵּק׃  
            עֵת לְבַקֵּשׁ וְעֵת לְאַבֵּד  
            עֵת לִשְׁמוֹר וְעֵת לְהַשְׁלִיךְ׃  
            <br />
            עֵת לִקְרוֹעַ וְעֵת לִתְפּוֹר  
            עֵת לַחֲשׁוֹת וְעֵת לְדַבֵּר׃  
            עֵת לֶאֱהֹב וְעֵת לִשְׂנֹא  
            עֵת מִלְחָמָה וְעֵת שָׁלוֹם׃
            <br />
          </div>

        </div>
      </div>
    </div>
  )
}
