/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { 
  HelpCircle, 
  MapPin, 
  FileText, 
  ChevronDown, 
  ChevronUp, 
  Search,
  BookOpen,
  Navigation,
  Bus,
  Train,
  Clock,
  Send,
  CheckCircle,
  ThumbsUp,
  AlertCircle
} from "lucide-react";
import { initialFAQs, initialComplaints } from "../data";
import { FAQ, Complaint } from "../types";

interface QuickLinksProps {
  onSuccess: (message: string) => void;
}

export default function QuickLinks({ onSuccess }: QuickLinksProps) {
  // Column-based menu selection so the section remains incredibly pristine
  const [activeTab, setActiveTab] = useState<"FAQ" | "MAP" | "CIVIL">("FAQ");

  // 1. FAQ States
  const [faqs, setFaqs] = useState<FAQ[]>(initialFAQs);
  const [faqSearch, setFaqSearch] = useState("");
  const [expandedFaqId, setExpandedFaqId] = useState<number | null>(null);
  const [selectedFaqCat, setSelectedFaqCat] = useState<string>("전체");

  const filteredFaqs = faqs.filter(faq => {
    const matchesSearch = faq.question.toLowerCase().includes(faqSearch.toLowerCase()) ||
                          faq.answer.toLowerCase().includes(faqSearch.toLowerCase());
    const matchesCategory = selectedFaqCat === "전체" || faq.category === selectedFaqCat;
    return matchesSearch && matchesCategory;
  });

  // 2. Map Directions States
  const [selectedBranch, setSelectedBranch] = useState<"head" | "branch">("head");

  const branchLocations = {
    head: {
      title: "화성시육아종합지원센터 [본부]",
      address: "경기도 화성시 동탄대로 9길 7 (신동 소아공원 옆 복합청사 3층)",
      tel: "031-123-4567 | Fax: 031-123-4568",
      bus: "일반버스 200번, 703번, 시직행 광역M4130번 (화성상록아파트 하차 도보 3분)",
      subway: "SRT/GTX-A 동탄역 2번 출구에서 동탄 순환선 마을버스 90번 승차 (동탄9동 행정센터 인근)",
      hours: "월~금 09:00 ~ 18:00 | 토 09:00 ~ 15:30 (공휴일 휴무)",
      markerX: 160,
      markerY: 110,
    },
    branch: {
      title: "화성시육아종합지원센터 [봉담분소]",
      address: "경기도 화성시 메타폴리스로 12 (봉담읍 아동문화융합센터 2층)",
      tel: "031-888-9999",
      bus: "일반버스 30번, 34번, 1004번 (봉담읍사무소 앞 하차 도보 5분)",
      subway: "수인분당선 오목천역 3번 출구에서 환승 시 버스 15분 소요",
      hours: "월~금 09:00 ~ 18:00 | 토 09:00 ~ 13:00 (공휴일 휴무)",
      markerX: 280,
      markerY: 180,
    }
  };

  const activeLoc = branchLocations[selectedBranch];

  // 3. Civil Complaints States
  const [complaintList, setComplaintList] = useState<Complaint[]>(initialComplaints);
  const [civilAuthor, setCivilAuthor] = useState("");
  const [civilTitle, setCivilTitle] = useState("");
  const [civilContent, setCivilContent] = useState("");
  const [civilCategory, setCivilCategory] = useState<"불편사항" | "건의사항" | "칭찬양해">("건의사항");

  const handleCivilSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!civilAuthor || !civilTitle || !civilContent) {
      alert("성명, 제목, 문의 내용을 작성해 주셔야 합니다.");
      return;
    }
    const today = new Date();
    const dateFormatted = `${today.getFullYear()}.${String(today.getMonth() + 1).padStart(2, '0')}.${String(today.getDate()).padStart(2, '0')}`;
    
    const newComplaint: Complaint = {
      id: complaintList.length + 1,
      author: civilAuthor.substring(0, 1) + "*" + (civilAuthor.length > 2 ? civilAuthor.substring(2) : "민"),
      title: civilTitle,
      content: civilContent,
      category: civilCategory,
      date: dateFormatted,
      status: "접수대기"
    };

    setComplaintList([newComplaint, ...complaintList]);
    onSuccess(
      `💌 민원 접수 정상 등록 완료!\n\n접수번호: WC-${1000 + newComplaint.id}\n신청자: ${civilAuthor}\n카테고리: ${civilCategory}\n\n행정 검토 후 3일 이내 정식 답변 알림 수령이 가능합니다. 화성시의 안전한 육아를 위해 최선을 다하겠습니다.`
    );

    // Reset Form
    setCivilAuthor("");
    setCivilTitle("");
    setCivilContent("");
  };

  return (
    <section id="faq-civil-section" className="max-w-7xl mx-auto px-4 md:px-8 py-16 md:py-24">
      
      {/* 3 Interactive trigger boxes acting as gorgeous tab bars */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        
        {/* TAB 1: FAQ Box */}
        <button
          onClick={() => setActiveTab("FAQ")}
          className={`p-8 rounded-3xl flex items-center gap-6 border-2 transition-all group cursor-pointer text-left ${
            activeTab === "FAQ"
              ? "bg-[#FD7700]/10 border-[#FD7700] shadow-xl"
              : "bg-white border-stone-200/50 hover:border-orange-200/80 hover:shadow-lg"
          }`}
        >
          <div className={`w-16 h-16 rounded-2xl flex items-center justify-center shadow-md transition-transform group-hover:scale-105 duration-300 shrink-0 ${
            activeTab === "FAQ" ? "bg-[#FD7700] text-white" : "bg-orange-50 text-[#FD7700]"
          }`}>
            <HelpCircle className="w-8 h-8" />
          </div>
          <div>
            <h4 className="text-lg sm:text-xl font-extrabold text-stone-900 font-sans">자주 묻는 질문 (FAQ)</h4>
            <p className="text-sm text-stone-500 mt-1 font-bold">
              센터 이용 자격, 연회비 및 장난감 대여 규칙
            </p>
          </div>
        </button>

        {/* TAB 2: MAP Box */}
        <button
          onClick={() => setActiveTab("MAP")}
          className={`p-8 rounded-3xl flex items-center gap-6 border-2 transition-all group cursor-pointer text-left ${
            activeTab === "MAP"
              ? "bg-[#795900]/10 border-yellow-500 shadow-xl"
              : "bg-white border-stone-200/50 hover:border-yellow-200/80 hover:shadow-lg"
          }`}
        >
          <div className={`w-16 h-16 rounded-2xl flex items-center justify-center shadow-md transition-transform group-hover:scale-105 duration-300 shrink-0 ${
            activeTab === "MAP" ? "bg-[#fec744] text-[#311300]" : "bg-yellow-50 text-yellow-600"
          }`}>
            <MapPin className="w-8 h-8" />
          </div>
          <div>
            <h4 className="text-lg sm:text-xl font-extrabold text-stone-900 font-sans">찾아오시는 길</h4>
            <p className="text-sm text-stone-500 mt-1 font-bold font-sans">
              본부 및 봉담분소 위치, 대중교통 노선 안내
            </p>
          </div>
        </button>

        {/* TAB 3: CIVIL Box */}
        <button
          onClick={() => setActiveTab("CIVIL")}
          className={`p-8 rounded-3xl flex items-center gap-6 border-2 transition-all group cursor-pointer text-left ${
            activeTab === "CIVIL"
              ? "bg-blue-50 border-[#0e60a9] shadow-xl"
              : "bg-white border-stone-200/50 hover:border-sky-300 hover:shadow-lg"
          }`}
        >
          <div className={`w-16 h-16 rounded-2xl flex items-center justify-center shadow-md transition-transform group-hover:scale-105 duration-300 shrink-0 ${
            activeTab === "CIVIL" ? "bg-[#0e60a9] text-white" : "bg-sky-50 text-[#0e60a9]"
          }`}>
            <FileText className="w-8 h-8" />
          </div>
          <div>
            <h4 className="text-lg sm:text-xl font-extrabold text-stone-900 font-sans">민원신청 및 건의함</h4>
            <p className="text-sm text-stone-500 mt-1 font-bold">
              불편 및 개선 요구사항 온라인 전담 접수
            </p>
          </div>
        </button>

      </div>

      {/* ========================================================= */}
      {/* RENDER ACTIVE TAB BODY CONTAINER */}
      {/* ========================================================= */}
      <div className="bg-white rounded-[32px] border border-stone-200/80 p-6 md:p-10 shadow-lg min-h-[420px] transition-all duration-300">
        
        {/* =================== CASE 1: FAQ TAB ====================== */}
        {activeTab === "FAQ" && (
          <div className="space-y-6 animate-fadeIn">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 border-b border-stone-100 pb-5">
              <div className="min-w-0 flex-1">
                <h3 className="text-base xs:text-lg sm:text-2xl font-black text-stone-900 font-sans truncate whitespace-nowrap">자주 물으시는 질문 아카이빙</h3>
                <p className="text-xs sm:text-sm text-stone-500 mt-1 font-semibold leading-relaxed">
                  회원분들이 센터 이용 시 가장 대표적으로 겪으시는 문의 사항을 정성껏 수합했습니다.
                </p>
              </div>

              {/* Categorical select pills - Perfectly aligned and filling beautifully on mobile */}
              <div className="flex flex-wrap gap-1.5 sm:gap-2 w-full lg:w-auto justify-start lg:justify-end items-center mt-2 lg:mt-0">
                {["전체", "센터이용", "장난감대여", "보육료/지원", "기타"].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedFaqCat(cat)}
                    className={`flex-1 sm:flex-initial text-center px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-extrabold transition border cursor-pointer shadow-sm whitespace-nowrap ${
                      selectedFaqCat === cat
                        ? "bg-[#FD7700] border-[#FD7700] text-white ring-2 ring-yellow-400"
                        : "bg-yellow-50/70 border-orange-200/60 text-orange-700 hover:bg-yellow-100/90 hover:border-orange-300"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Sub Search Panel */}
            <div className="relative max-w-md">
              <Search className="absolute left-3.5 top-3.5 w-5 h-5 text-stone-400" />
              <input
                type="text"
                placeholder="궁금한 키워드로 FAQ를 즉석 검색해 보세요..."
                value={faqSearch}
                onChange={(e) => setFaqSearch(e.target.value)}
                className="w-full pl-11 pr-4 py-3 border rounded-full text-sm focus:ring-2 focus:ring-primary-container focus:outline-none bg-stone-50/50 text-stone-800 font-semibold"
              />
            </div>

            {/* FAQ Accordions */}
            <div className="space-y-4 pt-2">
              {filteredFaqs.length > 0 ? (
                filteredFaqs.map((faq) => {
                  const isExpanded = expandedFaqId === faq.id;
                  return (
                    <div
                      key={faq.id}
                      className="border border-stone-100 rounded-2xl overflow-hidden shadow-sm transition bg-white"
                    >
                      <button
                        onClick={() => setExpandedFaqId(isExpanded ? null : faq.id)}
                        className="w-full px-6 py-5 flex justify-between items-center bg-stone-50/50 hover:bg-stone-50 text-left cursor-pointer"
                      >
                        <div className="flex items-center gap-2.5">
                          <span className="text-xs sm:text-sm font-black text-[#FD7700] bg-orange-50 px-3.5 py-1.5 rounded-full uppercase shrink-0">
                            {faq.category}
                          </span>
                          <span className="text-sm sm:text-base font-bold text-stone-800 leading-snug">
                            {faq.question}
                          </span>
                        </div>
                        {isExpanded ? <ChevronUp className="w-5 h-5 text-stone-500 shrink-0" /> : <ChevronDown className="w-5 h-5 text-stone-500 shrink-0" />}
                      </button>

                      {isExpanded && (
                        <div className="px-6 py-5 bg-white border-t border-stone-100 text-sm sm:text-base text-stone-600 leading-relaxed font-semibold whitespace-pre-line animate-fadeIn">
                          {faq.answer}
                        </div>
                      )}
                    </div>
                  );
                })
              ) : (
                <div className="text-center py-16 text-stone-400 text-sm">
                  검색어에 상응하는 FAQ 구문이 발견되지 않았습니다.
                </div>
              )}
            </div>
          </div>
        )}

        {/* =================== CASE 2: MAP TAB ====================== */}
        {activeTab === "MAP" && (
          <div className="space-y-6 animate-fadeIn">
            <div className="border-b border-stone-100 pb-5">
              <h3 className="text-xl font-bold text-stone-900 font-sans">센터 위치 오시는 길 안내</h3>
              <p className="text-xs text-stone-500 mt-1">
                자가용 방문 회원들 및 유모차 동반 대중교통 탑승 주민분들을 편의 지원합니다.
              </p>
            </div>

            {/* Branch selective toggle buttons */}
            <div className="flex gap-2">
              <button
                onClick={() => setSelectedBranch("head")}
                className={`flex-1 py-3 px-4 rounded-xl text-xs font-bold transition border cursor-pointer ${
                  selectedBranch === "head"
                    ? "bg-stone-800 border-stone-800 text-white"
                    : "bg-white border-stone-200 text-stone-600 hover:bg-stone-50"
                }`}
              >
                📍 [본부] 동탄대로 신동점
              </button>
              <button
                onClick={() => setSelectedBranch("branch")}
                className={`flex-1 py-3 px-4 rounded-xl text-xs font-bold transition border cursor-pointer ${
                  selectedBranch === "branch"
                    ? "bg-stone-800 border-stone-800 text-white"
                    : "bg-white border-stone-200 text-stone-600 hover:bg-stone-50"
                }`}
              >
                📍 [분소] 봉담 아동문화센터점
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-2">
              
              {/* Detailed directions text */}
              <div className="lg:col-span-6 space-y-4 text-xs font-semibold text-stone-700">
                <div className="bg-orange-50/50 p-4 rounded-2xl border border-orange-100">
                  <h4 className="text-sm font-extrabold text-stone-900 flex items-center gap-1.5 font-sans mb-1">
                    <span>{activeLoc.title}</span>
                  </h4>
                  <p className="text-stone-600 mt-1 leading-relaxed">
                    주소: {activeLoc.address}<br />
                    전화번호: {activeLoc.tel}
                  </p>
                </div>

                <div className="space-y-3 pl-1">
                  <div className="flex items-start gap-2.5">
                    <span className="p-1.5 rounded-lg bg-teal-50 text-teal-600 shrink-0">
                      <Bus className="w-4 h-4" />
                    </span>
                    <div>
                      <h5 className="font-bold text-stone-800">시내 일반 및 공항버스 노선</h5>
                      <p className="text-[11px] text-stone-500 leading-snug mt-0.5">{activeLoc.bus}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <span className="p-1.5 rounded-lg bg-indigo-50 text-indigo-600 shrink-0">
                      <Train className="w-4 h-4" />
                    </span>
                    <div>
                      <h5 className="font-bold text-stone-800">가장 인접한 전철 및 지하철/SRT역</h5>
                      <p className="text-[11px] text-stone-500 leading-snug mt-0.5">{activeLoc.subway}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <span className="p-1.5 rounded-lg bg-stone-100 text-stone-600 shrink-0">
                      <Clock className="w-4 h-4" />
                    </span>
                    <div>
                      <h5 className="font-bold text-stone-800">이용 지원 방문 가능 시간대</h5>
                      <p className="text-[11px] text-stone-500 leading-snug mt-0.5">{activeLoc.hours}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Vector SVG Styled Beautiful Interactive Map Area to replace dead standard maps */}
              <div className="lg:col-span-6">
                <div className="aspect-video w-full rounded-2xl border border-stone-200 bg-[#fbf9f8] p-4 relative overflow-hidden flex flex-col justify-between shadow-inner">
                  {/* Styled Grid Base */}
                  <div className="absolute inset-0 bg-[#f4ebe1]/30" />
                  
                  {/* Decorative Hand-drawn styled Road pathways */}
                  <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
                    <line x1="0" y1="120" x2="400" y2="120" stroke="#ffffff" strokeWidth="24" strokeLinecap="round" opacity="0.9" />
                    <line x1="160" y1="0" x2="160" y2="300" stroke="#ffffff" strokeWidth="18" strokeLinecap="round" opacity="0.9" />
                    <line x1="0" y1="120" x2="400" y2="120" stroke="#e8dfd5" strokeWidth="2" strokeDasharray="4 4" />
                    <line x1="160" y1="0" x2="160" y2="300" stroke="#e8dfd5" strokeWidth="2" strokeDasharray="4 2" />
                    
                    {/* Public park box */}
                    <rect x="220" y="20" width="120" height="70" rx="10" fill="#e2ede0" opacity="0.8" stroke="#cbdcc6" strokeWidth="1" />
                    <text x="240" y="60" fill="#718e68" fontSize="10" fontWeight="bold">동탄여울 소공원</text>

                    {/* Surrounding blocks */}
                    <rect x="20" y="160" width="100" height="80" rx="8" fill="#eae8e7" opacity="0.5" />
                    <text x="40" y="205" fill="#8a8a8a" fontSize="9">복합상가</text>

                    {/* Subway path mark */}
                    <path d="M 0 250 Q 150 250 400 200" fill="none" stroke="#68b4f1" strokeWidth="3" opacity="0.4" strokeDasharray="5" />
                  </svg>

                  {/* Dynamic marker */}
                  <div
                    className="absolute transition-all duration-500 ease-out flex flex-col items-center"
                    style={{ left: `${activeLoc.markerX}px`, top: `${activeLoc.markerY}px` }}
                  >
                    <div className="relative group">
                      <div className="absolute -top-1 left-2.5 w-3 h-3 bg-rose-500 rounded-full animate-ping"></div>
                      <MapPin className="w-8 h-8 text-rose-600 drop-shadow-md" />
                    </div>
                    <span className="bg-stone-900 text-white font-black text-[9px] px-2 py-0.5 rounded shadow-md mt-1 animate-fadeIn text-nowrap whitespace-nowrap">
                      {selectedBranch === "head" ? "본부 (여울공원점)" : "봉담분소 (문화청사)"}
                    </span>
                  </div>

                  {/* Operating brand watermark */}
                  <div className="z-10 bg-white/85 backdrop-blur-sm self-start px-2 py-1 rounded-lg border border-stone-200 text-[10px] font-bold text-stone-500 uppercase flex items-center gap-1">
                    <Navigation className="w-3 h-3 text-[#FD7700]" />
                    <span>Hwaseong Vector Map</span>
                  </div>

                  <div className="z-10 text-[9px] text-stone-400 font-mono text-right">
                    GPS Coordinates Active
                  </div>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* =================== CASE 3: CIVIL TAB ==================== */}
        {activeTab === "CIVIL" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start animate-fadeIn">
            
            {/* Input Form Column */}
            <form onSubmit={handleCivilSubmit} className="lg:col-span-5 space-y-4">
              <div className="border-b border-stone-100 pb-3">
                <h3 className="text-lg font-bold text-stone-900 font-sans">행정 신문고 건의함 접수</h3>
                <p className="text-[10px] text-stone-400 mt-0.5 leading-snug">
                  어린이집 개선 건의나 시간제 보육, 놀이방 이용 간 애로사항을 직접 개진하실 수 있습니다.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">성명 (실명 입력) *</label>
                  <input
                    type="text"
                    required
                    placeholder="예: 홍길동"
                    value={civilAuthor}
                    onChange={(e) => setCivilAuthor(e.target.value)}
                    className="w-full px-3 py-2 border rounded-xl text-xs focus:ring-1 focus:ring-sky-500 focus:outline-none bg-stone-50/50 text-[#1b1c1c] font-semibold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">민원 카테고리 *</label>
                  <select
                    value={civilCategory}
                    onChange={(e) => setCivilCategory(e.target.value as any)}
                    className="w-full px-3 py-2 border rounded-xl text-xs focus:ring-1 focus:ring-sky-500 focus:outline-none bg-stone-50/50"
                  >
                    <option value="건의사항">💡 건의사항 (제안 및 선호도)</option>
                    <option value="불편사항">⚠️ 불편사항 (시설/오작동 건)</option>
                    <option value="칭찬양해">💖 칭찬 및 양해 (보조 감사 건)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">제목 (30자 이하) *</label>
                <input
                  type="text"
                  required
                  placeholder="민원 핵심 요지 입력"
                  value={civilTitle}
                  onChange={(e) => setCivilTitle(e.target.value)}
                  className="w-full px-3 py-2 border rounded-xl text-xs focus:ring-1 focus:ring-sky-500 focus:outline-none bg-stone-50/50 text-[#1b1c1c] font-semibold"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">상세 건의사항 및 사유 설명 *</label>
                <textarea
                  required
                  rows={4}
                  placeholder="행정이 조치할 수 있도록 애로사항이나 개선 제안 내용을 가능한 세밀하게 기재 부탁드립니다."
                  value={civilContent}
                  onChange={(e) => setCivilContent(e.target.value)}
                  className="w-full px-3 py-2 border rounded-xl text-xs focus:ring-1 focus:ring-sky-500 focus:outline-none bg-white text-[#1b1c1c] font-semibold"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 shadow-md shadow-indigo-600/10 cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
                <span>민원 공식 접수</span>
              </button>
            </form>

            {/* List and transparency board Column */}
            <div className="lg:col-span-7 space-y-4">
              <div className="flex justify-between items-center bg-stone-50 p-3 rounded-2xl border border-stone-100">
                <span className="text-xs font-bold text-stone-700">실시간 민원 처리 및 답변 공개 현황</span>
                <span className="bg-emerald-50 text-emerald-700 font-mono text-[9px] px-2 py-0.5 rounded">투명 행정 신뢰</span>
              </div>

              <div className="space-y-3 max-h-[360px] overflow-y-auto pr-1 no-scrollbar">
                {complaintList.map((comp) => (
                  <div
                    key={comp.id}
                    className="p-4 border border-stone-100 rounded-2xl bg-white shadow-sm hover:shadow-md transition-all space-y-2 text-xs"
                  >
                    <div className="flex justify-between items-center">
                      <div className="flex gap-2 items-center">
                        <span className={`text-[9px] font-black px-2 py-0.5 rounded-full ${
                          comp.category === "불편사항"
                            ? "bg-rose-50 text-rose-600"
                            : comp.category === "건의사항"
                            ? "bg-emerald-50 text-emerald-600"
                            : "bg-blue-50 text-blue-600"
                        }`}>
                          {comp.category}
                        </span>
                        <span className="font-bold text-stone-800 truncate max-w-[120px] md:max-w-xs">{comp.title}</span>
                      </div>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                        comp.status === "답변완료"
                          ? "bg-stone-100 text-stone-500"
                          : comp.status === "처리중"
                          ? "bg-yellow-50 text-yellow-700"
                          : "bg-orange-50 text-orange-700"
                      }`}>
                        {comp.status}
                      </span>
                    </div>

                    <p className="text-stone-500 text-[11px] font-medium leading-relaxed bg-stone-50/50 p-2.5 rounded-xl">
                      {comp.content}
                    </p>

                    <div className="flex items-center justify-between text-[10px] text-stone-400">
                      <span>작성일시: {comp.date} | 작성자: {comp.author}</span>
                      <span>민원번호: WC-{1000 + comp.id}</span>
                    </div>

                    {/* Official replies accordion inside if answered */}
                    {comp.reply && (
                      <div className="mt-2.5 pt-2.5 border-t border-stone-100 bg-orange-50/40 p-3 rounded-xl border border-orange-100 text-[11px] leading-relaxed relative">
                        <div className="absolute top-2 right-2 flex items-center gap-1 text-[9px] text-[#FD7700] font-bold bg-white px-1.5 py-0.5 rounded shadow-sm">
                          <CheckCircle className="w-3 h-3" />
                          <span>정식 승인 답변</span>
                        </div>
                        <p className="font-extrabold text-[#FD7700] mb-0.5">답변인: 화성시종합보육상담소장</p>
                        <p className="text-stone-600 font-medium whitespace-pre-line pl-1">{comp.reply}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

      </div>

    </section>
  );
}
