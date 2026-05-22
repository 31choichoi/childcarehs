/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Notice, CalendarEvent, GalleryNews, FAQ, Complaint } from "./types";

export const initialNotices: Notice[] = [
  {
    id: 1,
    category: "Important",
    title: "2024년 상반기 장난감 도서관 신규 회원 모집 안내",
    content: "화성시육아종합지원센터에서 2024년 상반기 장난감 도서관 신규 회원을 모집합니다. 회원가입 신청은 홈페이지를 통해 선착순으로 진행되오니 일정을 꼭 확인해 주시기 바랍니다.\n\n■ 신청기간: 2024년 5월 20일(월) ~ 5월 27일(월)\n■ 모집인원: 동탄 장난감도서관 150명 / 봉담 장난감도서관 100명\n■ 대상: 화성시 관내 영유아 자녀를 둔 가정\n■ 연회비: 10,000원\n■ 제출서류: 주민등록등본 1부 (최근 3개월 이내 발급분)\n\n많은 관심과 참여를 부탁드립니다.",
    date: "2024.05.20",
    views: 421,
  },
  {
    id: 2,
    category: "Notice",
    title: "화성시 육아종합지원센터 임시 휴관 안내 (6/1)",
    content: "센터 전기설비 점검 및 내부 방역 소독 작업으로 인해 아래와 같이 임시 휴관하게 되었음을 안내해 드립니다.\n\n■ 휴관일시: 2024년 6월 1일(토) 전일\n■ 휴관대상: 본부 및 전 지점 (놀이체험실, 장난감교실 전 시설)\n■ 휴관사유: 전기 안전관리 점검 및 실내 소독 및 대청소\n\n휴관일에는 모든 시설 이용 및 장난감 반납이 불가하오니 이용에 착오 없으시길 바랍니다.",
    date: "2024.05.18",
    views: 189,
  },
  {
    id: 3,
    category: "Notice",
    title: "부모-자녀 놀이 프로그램 '함께해요' 참가자 모집",
    content: "부모와 아이가 긍정적인 애착을 형성하고 즐겁게 놀이하는 방법을 배우는 신체 오감 자극 놀이 프로그램 '함께해요' 참가 가정을 모집합니다.\n\n■ 교육일시: 2024년 5월 25일 ~ 6월 15일 (매주 토요일, 총 4회)\n■ 대상: 관내 만 1세~2세 영아 및 부모 (10가정)\n■ 장소: 화성센터 3층 오감놀이터\n■ 신청방법: 홈페이지 교육 신청 코너 선착순 안내",
    date: "2024.05.15",
    views: 312,
  },
  {
    id: 4,
    category: "Notice",
    title: "가정양육지원 '찾아가는 부모상담' 신청 안내",
    content: "가정 보육 중인 양육자의 양육 스트레스를 덜고 기질에 맞는 육아 방향을 돕기 위해 전문 임상 심리사/상담사가 직접 찾아가는 양육 상담 서비스를 운영합니다.\n\n■ 상담기간: 24년 6월 ~ 8월 중 (가정당 3회기 진행)\n■ 신청기간: 24년 5월 12일 ~ 5월 31일\n■ 대상: 관내 영유아를 가정 양육 중인 부모 및 양육자\n■ 상담비용: 무료 (화성시 지원)",
    date: "2024.05.12",
    views: 245,
  },
  {
    id: 5,
    category: "Notice",
    title: "제 10회 화성시 어린이 그림 그리기 대회 개최",
    content: "어린이날을 기념하여 화성시 어린이들이 꿈과 재능을 펼칠 수 있는 '제 10회 화성시 어린이 그림 그리기 대회'를 개최합니다.\n\n■ 행사일시: 2024년 6월 8일 (토) 10:00 ~ 15:00\n■ 장소: 동탄 여울공원 잔디마당\n■ 참여대상: 화성시 거주 5세 ~ 7세 영유아 및 초등 저학년\n■ 주제: '내가 꿈꾸는 미래의 친환경 우리 동네'",
    date: "2024.05.10",
    views: 512,
  },
  {
    id: 6,
    category: "Notice",
    title: "보육교직원 대상 아동학대 예방 의무 교육 시행 안내",
    content: "어린이집 보육교직원의 전문성 향상 및 안전한 보육 환경 조성을 위해 5월 직무 교육인 '인권 및 아동학대 예방 교육'을 온라인 및 오프라인 양방향으로 진행합니다.",
    date: "2024.05.08",
    views: 124,
  },
  {
    id: 7,
    category: "Notice",
    title: "[공지] 장난감 희망목록 신규 신청 설문조사",
    content: "장난감 대여 이용 성향과 선호 장난감 브랜드, 신설 요청 품목들을 파악하기 위해 이용 부모 대상 선호 장난감 목록 설문을 운영하오니 소중한 의견 반영을 바랍니다.",
    date: "2024.05.03",
    views: 156,
  }
];

export const initialCalendarEvents: CalendarEvent[] = [
  {
    id: 1,
    title: "부모교육: 영아기 발달의 이해",
    category: "부모교육",
    date: "2026.06.20",
    time: "10:00 ~ 12:00",
    location: "본부 2층 누리배움터",
    target: "만 0세~2세 자녀를 둔 백신부모",
    fee: "무료",
    capacity: 30,
    registered: 28,
    description: "영유아기의 가장 중요한 첫 단추인 애착 완성과 영아 놀이 상호작용 노하우를 배우는 전문 강좌.",
    important: true,
  },
  {
    id: 2,
    title: "토요 오감오색 미술체험놀이",
    category: "행사",
    date: "2026.06.08",
    time: "14:00 ~ 15:30",
    location: "남부센터 신체체험실",
    target: "만 3세 ~ 5세 동반 가정",
    fee: "5,000원",
    capacity: 15,
    registered: 15,
    description: "가정에서 하기 힘든 다양한 색감을 활용한 오감 자극 대형 드로잉 미술 놀이 행사.",
    important: true,
  },
  {
    id: 3,
    title: "영유아 소아 심폐소생술 및 안전 교육",
    category: "부모교육",
    date: "2026.06.03",
    time: "14:00 ~ 16:00",
    location: "본부 세미나실",
    target: "관내 부모 및 베이비시터",
    fee: "무료",
    capacity: 25,
    registered: 25,
    description: "가정 내 영유아 기도폐쇄 대처법 및 올바른 CPR 방법 실습 교육.",
  },
  {
    id: 4,
    title: "보육교직원 힐링 교육: 아로마 스트레스 테라피",
    category: "어린이집지원",
    date: "2026.06.24",
    time: "17:00 ~ 19:30",
    location: "동탄 숲 체험관",
    target: "화성시 관내 어린이집 교직원",
    fee: "무료",
    capacity: 40,
    registered: 32,
    description: "아이들을 지도하는 어린이집 보육 교사들을 위한 아로마 테라피 시음 및 휴식 심리 상담 프로그램.",
  },
  {
    id: 5,
    title: "발달 상담: 자녀 기질 분석 테스트 & 코칭",
    category: "아이성장",
    date: "2026.06.15",
    time: "09:30 ~ 12:00",
    location: "1:1 전문상담실",
    target: "만 1~3세 발달 정서 자극 고민 가정",
    fee: "무료",
    capacity: 6,
    registered: 6,
    description: "아이의 기질과 부모의 양육 태도를 사전에 파악하여 전문 임상 발달 상담사가 솔루션을 매칭해 드립니다.",
  },
  {
    id: 6,
    title: "장난감 교환 장터 & 벼룩시장",
    category: "행사",
    date: "2026.06.30",
    time: "11:00 ~ 16:00",
    location: "야외 잔디 광장",
    target: "화성시 영유아 가정 누구나",
    fee: "무료",
    capacity: 100,
    registered: 45,
    description: "사용하지 않는 깨끗한 완구를 가져와 이웃 완구와 물물교환 하거나 기부하는 플리마켓 행사.",
  }
];

export const initialGalleryNews: GalleryNews[] = [
  {
    id: 1,
    title: "봄맞이 대청소 현장",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuC1Nmdrn_DBuTZyaX4Ea9s4kwceRMUbUevIf_rh-pp9FkQ3pIjtZ-Klf0EI3BXhvJ0Vti90phz6pysHq_miNBcIY_k78Wu631FYNUy7A1u7_7iVCJ-99tX9gVJuOSeaGf7K60DnLYJskC2h4YXJql_4tbSXqhYeQ9I1Dj1BQNyJHHuyYFl_C4_034ubo57-UtbA0DSedKUJcTS_HzSblm7ZNyo3c2BjTtMlQRaOgGF1_jzlVOEix3nIbka2HmYn4jjMFQ-qVhctlNZm",
    date: "2024.05.15",
    description: "우리 센터에서는 봄을 맞이하여 아이들이 더욱 안심하고 쾌적하게 뛰놀 수 있도록 놀이시설, 교구, 매트 등 전 장비에 걸쳐 대대적인 전문 스팀 청소 및 항균 연무 소독을 실시하였습니다. 매일매일 안심하고 방문할 수 있는 청결하고 깨끗한 화성시 아동지원센터가 되기 위해 노력하겠습니다.",
    views: 231,
  },
  {
    id: 2,
    title: "장난감 신규 입고 안내",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDHPFcv6kuDHUJ54JIEYpg8rwXkyBBCSO_0-fbs7JhS_yGLdmUt5355wXHx-W6AYLN_BT4Lr4inDJ3i-D5WSrzlkwUKkvbGASbGwsgVYQ8sIBI2b8l-IC_TKEIe63Gvpc1LZ70iGxSYLpiFPQBIPDZq--ZTtZQ-9dRqAKJl4aoDr5VMY0CUqJMnEoqFdVMD9GE64m_kI_iP37Vu5ZC5-uP85OAntB34S2WMusRqLu-IM22Lwp0gP7Ys9sFUEHrBNe_c0SKEf3hf2zCp",
    date: "2024.05.10",
    description: "부모님들의 지속적인 건의와 영유아 교육용 완구 유행을 적극 반영하여 교류 소형 주방놀이 완구, 인지발달 원목 교구, 친환경 미끄럼틀 등 고급 수입 장난감 총 64여 종이 새롭게 입고되었습니다. 정기 살균 후 즉시 대여 활성화되오니 장난감 소식 및 대여 현황을 확인하여 예약을 서둘러 주세요!",
    views: 452,
  },
  {
    id: 3,
    title: "보육교직원 힐링 교육",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXu-tC1qSKhPR2kK93z9SzoofVamFPhwYWEbblbwqKJrc-IA21jijW_hl5oArXsrlSQOimh2GtMde_Hqk1UYEykXpsB-NPC5ky5HPKhmeF0zrPAa0JXdA3gm3YYrKaYMSSN-vVyb4vKvoafFpXtNZ-Y5Fd0-Qj-zkr-Qet2Y2IeU3xjbZUuEoIB9MOlgoO29Eqn0VEjJavqwMKrPkyib_nMM_W_uNuQJQupRjlDqxQYAITmz42PxpD_tHG4CvlRaiA9s1xq15XoVXsMN",
    date: "2024.05.05",
    description: "관내 어린이집 및 보육시설 보육 교직원의 정서적 환기 및 스트레스 경감을 위해 전문 치유 힐링 집합 연수를 주체하였습니다. 향기 오일 요법 체험, 심신 안정 요가, 소규모 교류 상담을 통해 평소 보육 현장에서 쌓인 지친 하루를 치유하고 보육의 행복과 초심을 충전하는 시간으로 활발히 소통하며 성료했습니다.",
    views: 187,
  },
  {
    id: 4,
    title: "제 9회 어린이 대잔치",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBnLc_naQEk4CgezxyR8UZ4nUwU0RmlJt79X8kNGHq64nQLDk5TxDRDRU6qBfcVD8xjbMqjHfi-T2Pp-AES-5nk16PRkI_LFT7O_5yNWRBlIeuSCWUZgliywJufVEkqbm9SIqox90XqX0MWTxsmxqJrPpQzY8xLyjlO1FgizJ7Ew7dPZo76WlvMsu5Ucj5LJhXqrYarPgfBtxOr9WJ8h9z7mk_29UjmWMbbTvdrKumYGXAfSB646VNCRUpoWmjw_Q6ohZSuCpJxXFHP",
    date: "2024.05.01",
    description: "봄 맞이 어린이날 특별 야외 축제 '제 9회 어린이 대잔치'가 수많은 화성 영유아 가족들의 열화와 같은 성원 속에 막을 내렸습니다. 물놀이 바운스파크 체험, 친환경 공예 우드랜드, 즉석 버블 마술 카니발까지 다채로운 프로그램으로 아이들의 해맑은 웃음소리가 가득한 활기찬 봄날의 추억을 쌓았습니다.",
    views: 613,
  }
];

export const initialFAQs: FAQ[] = [
  {
    id: 1,
    category: "센터이용",
    question: "회원 가입 및 센터 시설 이용 대상은 어떻게 되나요?",
    answer: "화성시육아종합지원센터 가입 및 놀이체험실, 장난감 도서관의 이용 지원 대상은 화성시에 주민등록이 되어있는 영유아(0세 ~ 만 5세) 자녀를 둔 직계 부모 또는 화성시 소재 어린이집에 근무하는 교직원입니다.\n\n가정 회원 가입 시 등본(3달 이내) 지참 필수이며 가입 연회비는 10,000원입니다."
  },
  {
    id: 2,
    category: "장난감대여",
    question: "장난감 대여는 몇 개까지 가능하고 반납 연장도 되나요?",
    answer: "가구당 1회 최대 2점의 장난감(대형 1점, 소형 1점 또는 소형 2점) 대여가 가능하며, 대여 기간은 대여일 포함 총 14일(2주일) 입니다.\n\n연장은 다음 예약자가 없는 경우에 한해 홈페이지 마이페이지에서 1회(최대 7일간) 추가 기간 연장이 가능합니다. 연체 시 연체 일수만큼 대여 자격 정지 패널티가 부과되오니 기간 엄수 부탁드립니다."
  },
  {
    id: 3,
    category: "보육료/지원",
    question: "시간제 보육 서비스 요금과 납부 방법은 어떻게 되나요?",
    answer: "시간제 보육 서비스의 정규 이용 단가는 시간당 4,000원입니다. 단, 정부 보육료 정부지원 자격 수급 영유아는 양육자 본인부담금 2,000원으로 서비스 이용이 가능합니다.\n\n이용 요금 결제는 매회 서비스 종료 후 국민행복카드로 결제해 주셔야 완료 지원됩니다."
  },
  {
    id: 4,
    category: "기타",
    question: "장난감이 고장나거나 분실된 경우에는 어떻게 처리해야 하나요?",
    answer: "대여하여 가져가신 완구가 가정 이용 중 부속품 분실이나 작동 파손 발생 시 동일 완구 구입 보상 혹은 지정 AS 수리 실비가 청구될 수 있습니다. 부득이한 손상이나 오작동 시에는 반납 전 미리 해당 교실로 전화 연락 부탁드립니다."
  }
];

export const initialComplaints: Complaint[] = [
  {
    id: 1,
    author: "박*연 (동탄)",
    category: "건의사항",
    title: "동탄 장난감도서관 주말 대여 부품 검수 시간 단축 건의",
    content: "주말 토요일 오전에는 장난감 대여/반납 이용자가 한 번에 몰려서 교사 분들이 바구니 속 부품을 일일이 다 세느라 대기 시간만 30분 이상 걸립니다. 미리 확인 패킹을 해두거나 세척 부서와 대여 접수 처리를 구분해 정리가 빠르면 좋겠습니다.",
    date: "2026.05.10",
    status: "답변완료",
    reply: "안녕하세요, 화성시육아종합지원센터 센터장입니다. 소중한 의견 진심으로 감사드립니다. 언급해주신 토요일 혼잡 대기 상황 해결을 위해 다가오는 6월부터 '조기 간이 반납함' 시스템을 시범 운영하여 부속 개수 2차 대리 대조 방식을 시행하고, 데스크 전담 인력을 일시적으로 2인 추가 배정할 것을 약속드립니다. 더욱 편리한 육아환경을 위해 힘쓰겠습니다."
  },
  {
    id: 2,
    author: "이*민 (봉담)",
    category: "불편사항",
    title: "놀이체험실 내부 에어컨 온도가 조금 낮았으면 좋겠어요",
    content: "5월인데 날씨가 벌써 여름마냥 너무 후덥지근하고 아이들이 방방 뛰며 뛰어 노는 신체 놀이터 내부 공간은 땀이 범벅이 됩니다. 에어컨 조기 가동이나 송풍 온도 설정을 낮춰 주시길 요청드립니다.",
    date: "2026.05.21",
    status: "처리중"
  }
];

export const mockToys = [
  { id: 1, name: "피셔프라이스 아기 피아노 체육관", branch: "동탄본부", state: "대여가능", age: "0~12개월", limit: "소형", image: "🎹" },
  { id: 2, name: "숲소리 원목 흔들 하마 교구세트", branch: "봉담분소", state: "대여중", age: "1~2세", limit: "소형", image: "🪵" },
  { id: 3, name: "스텝2 리틀 하우스 놀이터 소형 미끄럼틀", branch: "동탄본부", state: "대여가능", age: "2~4세", limit: "대형", image: "🏠" },
  { id: 4, name: "액티비티 영유아 에코 보행기 주차타워", branch: "봉담분소", state: "대여가능", age: "6~18개월", limit: "대형", image: "🚗" },
  { id: 5, name: "립프로그 신나는 한글 가방 놀이", branch: "동탄본부", state: "대여중", age: "3세 이상", limit: "소형", image: "🎒" }
];
