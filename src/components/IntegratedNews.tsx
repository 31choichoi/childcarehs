/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { 
  Bell, 
  Calendar as CalendarIcon, 
  Image as ImageIcon, 
  Plus, 
  ChevronLeft, 
  ChevronRight, 
  Eye, 
  Heart, 
  MessageSquare,
  Sparkles,
  Award,
  BookOpen,
  Info,
  Send,
  X
} from "lucide-react";
import { initialNotices, initialCalendarEvents, initialGalleryNews } from "../data";
import { Notice, CalendarEvent, GalleryNews } from "../types";

interface IntegratedNewsProps {
  onSelectEvent: (event: CalendarEvent) => void;
  onSuccess: (message: string) => void;
}

export default function IntegratedNews({ onSelectEvent, onSuccess }: IntegratedNewsProps) {
  // 1. Notice logic
  const [notices, setNotices] = useState<Notice[]>(initialNotices);
  const [selectedNotice, setSelectedNotice] = useState<Notice | null>(null);
  const [noticeSearch, setNoticeSearch] = useState("");
  const [noticeFilter, setNoticeFilter] = useState<"All" | "Important" | "Notice">("All");
  const [showAllNotices, setShowAllNotices] = useState(false);

  // 2. Calendar logic (2026.06 representation)
  const [selectedDateStr, setSelectedDateStr] = useState<string>("2026.06.20"); // Default day active
  
  // 3. Gallery news detail modal
  const [selectedGallery, setSelectedGallery] = useState<GalleryNews | null>(null);
  const [galleryLikes, setGalleryLikes] = useState<Record<number, number>>({
    1: 42,
    2: 98,
    3: 31,
    4: 156
  });
  const [galleryComments, setGalleryComments] = useState<Record<number, Array<{author: string; text: string}>>>({
    1: [{ author: "김민수맘", text: "정말 깨끗하게 에어소독까지 해주셔서 놀이시설 이용할 때 너무 안심되고 든든해요!" }],
    2: [{ author: "하준아빠", text: "신형 키친 완구 새로 들어와서 너무 좋아요! 내일 아침에 바로 대여 신청 예정입니다." }]
  });
  const [newCommentAuthor, setNewCommentAuthor] = useState("");
  const [newCommentText, setNewCommentText] = useState("");

  const handleLikeGallery = (id: number) => {
    setGalleryLikes(prev => ({
      ...prev,
      [id]: prev[id] + 1
    }));
  };

  const handleAddComment = (e: React.FormEvent, id: number) => {
    e.preventDefault();
    if (!newCommentAuthor || !newCommentText) return;
    setGalleryComments(prev => ({
      ...prev,
      [id]: [...(prev[id] || []), { author: newCommentAuthor, text: newCommentText }]
    }));
    setNewCommentAuthor("");
    setNewCommentText("");
  };

  // Helper calendar days generator
  // June 2026 starts on Monday (1st)
  const calendarDays = [
    { dayNum: 31, isPrevMonth: true },
    { dayNum: 1, isPrevMonth: false, dateStr: "2026.06.01" },
    { dayNum: 2, isPrevMonth: false, dateStr: "2026.06.02" },
    { dayNum: 3, isPrevMonth: false, dateStr: "2026.06.03" },
    { dayNum: 4, isPrevMonth: false, dateStr: "2026.06.04" },
    { dayNum: 5, isPrevMonth: false, dateStr: "2026.06.05" },
    { dayNum: 6, isPrevMonth: false, dateStr: "2026.06.06" },
    { dayNum: 7, isPrevMonth: false, dateStr: "2026.06.07" },
    { dayNum: 8, isPrevMonth: false, dateStr: "2026.06.08" },
    { dayNum: 9, isPrevMonth: false, dateStr: "2026.06.09" },
    { dayNum: 10, isPrevMonth: false, dateStr: "2026.06.10" },
    { dayNum: 11, isPrevMonth: false, dateStr: "2026.06.11" },
    { dayNum: 12, isPrevMonth: false, dateStr: "2026.06.12" },
    { dayNum: 13, isPrevMonth: false, dateStr: "2026.06.13" },
    { dayNum: 14, isPrevMonth: false, dateStr: "2026.06.14" },
    { dayNum: 15, isPrevMonth: false, dateStr: "2026.06.15" },
    { dayNum: 16, isPrevMonth: false, dateStr: "2026.06.16" },
    { dayNum: 17, isPrevMonth: false, dateStr: "2026.06.17" },
    { dayNum: 18, isPrevMonth: false, dateStr: "2026.06.18" },
    { dayNum: 19, isPrevMonth: false, dateStr: "2026.06.19" },
    { dayNum: 20, isPrevMonth: false, dateStr: "2026.06.20" },
    { dayNum: 21, isPrevMonth: false, dateStr: "2026.06.21" },
    { dayNum: 22, isPrevMonth: false, dateStr: "2026.06.22" },
    { dayNum: 23, isPrevMonth: false, dateStr: "2026.06.23" },
    { dayNum: 24, isPrevMonth: false, dateStr: "2026.06.24" },
    { dayNum: 25, isPrevMonth: false, dateStr: "2026.06.25" },
    { dayNum: 26, isPrevMonth: false, dateStr: "2026.06.26" },
    { dayNum: 27, isPrevMonth: false, dateStr: "2026.06.27" },
    { dayNum: 28, isPrevMonth: false, dateStr: "2026.06.28" },
    { dayNum: 29, isPrevMonth: false, dateStr: "2026.06.29" },
    { dayNum: 30, isPrevMonth: false, dateStr: "2026.06.30" },
    { dayNum: 1, isNextMonth: true },
    { dayNum: 2, isNextMonth: true },
    { dayNum: 3, isNextMonth: true },
    { dayNum: 4, isNextMonth: true }
  ];

  // Map dates to categories for visual highlights in calendar
  const getDayHighlightClass = (dateStr?: string) => {
    if (!dateStr) return "";
    const ev = initialCalendarEvents.find(e => e.date === dateStr);
    if (!ev) return "";

    if (ev.category === "부모교육") {
      return "bg-[#FD7700] text-white font-bold relative ring-2 ring-orange-200";
    }
    if (ev.category === "행사") {
      return "bg-[#fec744] text-stone-900 font-bold relative ring-2 ring-yellow-100";
    }
    if (ev.category === "아이성장") {
      return "bg-[#0e60a9] text-white font-bold relative";
    }
    return "bg-[#eae8e7] text-stone-800 font-bold";
  };

  const getDayEventBadge = (dateStr?: string) => {
    if (!dateStr) return null;
    const ev = initialCalendarEvents.find(e => e.date === dateStr);
    if (!ev) return null;
    return (
      <span className="absolute -top-1.5 -right-1.5 flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500"></span>
      </span>
    );
  };

  // Find the event of the currently highlighted/selected date
  const selectedEvent = initialCalendarEvents.find(e => e.date === selectedDateStr);

  const filteredNotices = notices.filter(n => {
    const matchesFilter = noticeFilter === "All" || n.category === noticeFilter;
    const matchesSearch = n.title.toLowerCase().includes(noticeSearch.toLowerCase()) || 
                          n.content.toLowerCase().includes(noticeSearch.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const displayedNotices = showAllNotices ? filteredNotices : filteredNotices.slice(0, 5);

  const handleOpenNotice = (notice: Notice) => {
    // Increase read count locally
    setNotices(prev => prev.map(n => n.id === notice.id ? { ...n, views: n.views + 1 } : n));
    setSelectedNotice(notice);
  };

  return (
    <section id="community-section" className="py-12 md:py-20 max-w-7xl mx-auto px-4 md:px-8 bg-stone-50 rounded-b-[48px] border-b border-stone-200">
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* ========================================================= */}
        {/* COLUMN 1: 공지사항 (Notice) - 5 Cols */}
        {/* ========================================================= */}
        <div className="lg:col-span-4 flex flex-col h-full bg-white p-6 rounded-3xl border border-stone-100 shadow-sm">
          <div className="flex justify-between items-center mb-5 pb-3 border-b border-stone-50">
            <h2 className="text-xl font-black font-sans flex items-center gap-2 text-stone-900">
              <span className="p-1.5 rounded-xl bg-orange-50 text-[#FD7700]">
                <Bell className="w-5 h-5 animate-swing" />
              </span>
              <span>공지사항</span>
            </h2>
            <button 
              onClick={() => setShowAllNotices(!showAllNotices)}
              className="text-sm font-bold text-stone-500 hover:text-primary flex items-center gap-1 hover:underline cursor-pointer"
            >
              <span>{showAllNotices ? "접기" : "+ 더보기"}</span>
            </button>
          </div>

          {/* Filtering buttons */}
          <div className="flex flex-wrap gap-2 mb-4">
            {(["All", "Important", "Notice"] as const).map(f => (
              <button
                key={f}
                onClick={() => setNoticeFilter(f)}
                className={`px-4 py-1.5 text-xs sm:text-sm font-bold rounded-full border transition ${
                  noticeFilter === f
                    ? "bg-primary border-primary text-white"
                    : "bg-white border-stone-200 text-stone-600 hover:bg-stone-50"
                }`}
              >
                {f === "All" ? "전체" : f === "Important" ? "중요공지" : "일반안내"}
              </button>
            ))}
          </div>

          {/* Search notice */}
          {showAllNotices && (
            <input
              type="text"
              placeholder="공지 검색어 입력..."
              value={noticeSearch}
              onChange={(e) => setNoticeSearch(e.target.value)}
              className="w-full px-3 py-2 border rounded-xl text-sm mb-3 focus:ring-1 focus:ring-[#FD7700] focus:outline-none"
            />
          )}

          {/* Notice List */}
          <div className="flex-1 divide-y divide-stone-100 min-h-[360px]">
            {displayedNotices.length > 0 ? (
              displayedNotices.map((notice) => (
                <button
                  key={notice.id}
                  onClick={() => handleOpenNotice(notice)}
                  className="w-full block text-left p-3.5 hover:bg-orange-50/50 rounded-xl transition-all group cursor-pointer"
                >
                  <div className="flex justify-between items-center gap-2 mb-1.5">
                    <span className={`text-[10px] sm:text-xs px-2.5 py-0.5 rounded font-black tracking-wide uppercase ${
                      notice.category === "Important"
                        ? "bg-orange-100 text-[#FD7700]"
                        : "bg-stone-100 text-stone-500"
                    }`}>
                      {notice.category === "Important" ? "중요" : "일반"}
                    </span>
                    <span className="text-xs text-stone-400 font-bold">{notice.date}</span>
                  </div>
                  <h4 className="text-sm md:text-base font-bold text-stone-800 truncate group-hover:text-[#FD7700] transition-colors leading-tight">
                    {notice.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-stone-500 mt-1 line-clamp-1 truncate font-medium">
                    {notice.content}
                  </p>
                </button>
              ))
            ) : (
              <div className="text-center py-20 text-stone-400 text-sm">
                등록된 공지 내용이 존재하지 않습니다.
              </div>
            )}
          </div>
        </div>

        {/* ========================================================= */}
        {/* COLUMN 2: 행사/교육 일정 (Interactive Calendar) - 4 Cols */}
        {/* ========================================================= */}
        <div className="lg:col-span-4 flex flex-col h-full bg-white p-6 rounded-3xl border border-stone-100 shadow-sm">
          <div className="flex justify-between items-center mb-5 pb-3 border-b border-stone-50">
            <h2 className="text-xl font-black font-sans flex items-center gap-2 text-stone-900">
              <span className="p-1.5 rounded-xl bg-yellow-50 text-[#795900]">
                <CalendarIcon className="w-5 h-5" />
              </span>
              <span className="text-sm xs:text-base sm:text-xl font-black leading-tight flex flex-col sm:flex-row sm:items-center">
                <span className="whitespace-nowrap">행사/</span>
                <span className="whitespace-nowrap">교육일정</span>
              </span>
            </h2>
            <div className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm font-bold text-stone-800 bg-stone-100/80 px-2 sm:px-3 py-1 rounded-full">
              <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 text-stone-400 hover:text-stone-800 cursor-pointer" onClick={() => alert("현재 2026년 6월 예약 접수 일정만 제공됩니다.")} />
              <span className="font-sans text-stone-700 font-extrabold text-xs sm:text-base whitespace-nowrap">26년 6월</span>
              <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-stone-400 hover:text-stone-800 cursor-pointer" onClick={() => alert("다음 달 일정은 익월 1일에 공개됩니다.")} />
            </div>
          </div>

          {/* Calendar Grid */}
          <div className="mb-4">
            <div className="grid grid-cols-7 gap-1 text-center text-sm font-bold text-stone-400 mb-2">
              <div className="text-rose-500">일</div>
              <div>월</div>
              <div>화</div>
              <div>수</div>
              <div>목</div>
              <div>금</div>
              <div className="text-sky-600">토</div>
            </div>

            <div className="grid grid-cols-7 gap-1 flex-1">
              {calendarDays.map((cal, index) => {
                const isSelected = cal.dateStr === selectedDateStr;
                const highlightClass = getDayHighlightClass(cal.dateStr);

                return (
                  <button
                    key={index}
                    onClick={() => {
                      if (cal.dateStr) {
                        setSelectedDateStr(cal.dateStr);
                      }
                    }}
                    disabled={cal.isPrevMonth || cal.isNextMonth}
                    className={`h-10 w-full rounded-xl flex items-center justify-center text-sm font-bold shrink-0 transition-all relative ${
                      cal.isPrevMonth || cal.isNextMonth
                        ? "text-stone-300 pointer-events-none"
                        : isSelected
                        ? "border-2 border-stone-800 scale-105 shadow-md text-stone-900"
                        : "hover:bg-stone-50"
                    } ${highlightClass || "text-stone-700 bg-stone-50/50"}`}
                  >
                    <span>{cal.dayNum}</span>
                    {getDayEventBadge(cal.dateStr)}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active Highlighted Event detail panel below */}
          <div className="flex-1 border-t border-stone-100 pt-3">
            {selectedEvent ? (
              <div className="bg-orange-50/40 p-4 rounded-2xl border border-orange-100 flex flex-col justify-between h-full min-h-[160px] animate-fadeIn">
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="bg-primary hover:opacity-90 text-[11px] sm:text-xs font-black text-white px-2.5 py-0.5 rounded cursor-pointer">
                      {selectedEvent.category}
                    </span>
                    <span className="text-xs text-stone-500 font-extrabold flex items-center gap-1">
                      접수인원: {selectedEvent.registered} / {selectedEvent.capacity}명
                    </span>
                  </div>
                  <h4 className="text-sm sm:text-base font-black text-stone-800 font-sans mt-1">
                    {selectedEvent.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-stone-600 mt-2 line-clamp-2 leading-relaxed font-semibold">
                    {selectedEvent.description}
                  </p>
                  <div className="text-xs sm:text-sm text-stone-500 mt-2 font-bold flex flex-wrap gap-x-2">
                    <span>⏰ {selectedEvent.time}</span>
                    <span>|</span>
                    <span>📍 {selectedEvent.location}</span>
                  </div>
                </div>

                <div className="mt-3">
                  <button
                    type="button"
                    onClick={() => onSelectEvent(selectedEvent)}
                    className="w-full py-2.5 bg-[#FD7700] hover:bg-[#E05D00] text-sm font-black text-white rounded-xl shadow-md transition cursor-pointer"
                  >
                    프로그램 즉시 접수하기
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-center py-10 bg-stone-50 rounded-2xl border border-dashed border-stone-200 text-stone-500 text-sm text-balance flex flex-col items-center justify-center h-full min-h-[160px] font-semibold">
                <Info className="w-6 h-6 mb-1.5 text-stone-400" />
                선택된 일자({selectedDateStr.split(".")[2]}일)의 공식적인<br />센터 집합 프로그램 일정이 없습니다.
              </div>
            )}
          </div>
        </div>

        {/* ========================================================= */}
        {/* COLUMN 3: 센터 소식 (Gallery Board) - 3 Cols */}
        {/* ========================================================= */}
        <div className="lg:col-span-4 flex flex-col h-full bg-white p-6 rounded-3xl border border-stone-100 shadow-sm">
          <div className="flex justify-between items-center mb-5 pb-3 border-b border-stone-50">
            <h2 className="text-xl font-black font-sans flex items-center gap-2 text-stone-900">
              <span className="p-1.5 rounded-xl bg-blue-50 text-[#0e60a9]">
                <ImageIcon className="w-5 h-5" />
              </span>
              <span>센터 소식 / 갤러리</span>
            </h2>
            <button
              onClick={() => alert("화성시센터의 최신 갤러리 행사 앨범 목록 화면입니다.")}
              className="text-sm font-bold text-stone-500 hover:text-primary flex items-center gap-1 hover:underline cursor-pointer"
            >
              <span>+ 더보기</span>
            </button>
          </div>

          <div className="grid grid-cols-2 gap-3 flex-1">
            {initialGalleryNews.map((gNews) => (
              <button
                key={gNews.id}
                onClick={() => setSelectedGallery(gNews)}
                className="bg-stone-50 border border-stone-200/50 rounded-2xl overflow-hidden group shadow-sm flex flex-col text-left h-full transition-all hover:scale-102 hover:shadow-md cursor-pointer"
              >
                <div className="relative aspect-video overflow-hidden bg-stone-200">
                  <img
                    referrerPolicy="no-referrer"
                    src={gNews.image}
                    alt={gNews.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-2 right-2 bg-stone-900/60 text-white font-mono text-xs px-2 py-0.5 rounded-md backdrop-blur-sm font-bold">
                    {gNews.date}
                  </div>
                </div>

                <div className="p-3 flex flex-col justify-between flex-1">
                  <div>
                    <h4 className="text-sm font-bold text-stone-800 line-clamp-1 group-hover:text-[#FD7700] transition-colors leading-tight">
                      {gNews.title}
                    </h4>
                    <p className="text-xs text-stone-500 line-clamp-2 mt-1.5 leading-normal font-semibold">
                      {gNews.description}
                    </p>
                  </div>
                  <div className="flex items-center gap-2.5 mt-2.5 pt-2 border-t border-stone-200/40 text-xs text-stone-400 font-bold shrink-0">
                    <span className="flex items-center gap-1">
                      <Eye className="w-3.5 h-3.5" />
                      {gNews.views + (gNews.id * 15)}
                    </span>
                    <span className="flex items-center gap-1">
                      <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-100" />
                      {galleryLikes[gNews.id] || 0}
                    </span>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

      </div>

      {/* ========================================================= */}
      {/* LOCAL NOTICE DETAIL DIALOG MODAL */}
      {/* ========================================================= */}
      {selectedNotice && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-stone-950/40 backdrop-blur-sm" onClick={() => setSelectedNotice(null)} />
          <div className="relative bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl animate-in zoom-in-95 duration-200 border border-stone-100">
            <button
              onClick={() => setSelectedNotice(null)}
              className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-stone-100 text-stone-400 hover:text-stone-600 transition"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="mb-4">
              <span className={`text-[9px] px-2 py-0.5 rounded-full font-black tracking-wide uppercase ${
                selectedNotice.category === "Important"
                  ? "bg-orange-100 text-[#FD7700]"
                  : "bg-stone-100 text-stone-500"
              }`}>
                {selectedNotice.category === "Important" ? "중요 공지사항" : "일반 공지"}
              </span>
              <h3 className="text-lg font-bold text-stone-900 font-sans mt-2 pr-6">
                {selectedNotice.title}
              </h3>
              <div className="flex items-center gap-3 mt-1 text-[10px] font-semibold text-stone-400 border-b border-stone-100 pb-3">
                <span>등록일시: {selectedNotice.date}</span>
                <span>조회수: {selectedNotice.views}회</span>
                <span className="text-[#FD7700]">화성시 아동지원과</span>
              </div>
            </div>

            <div className="text-xs md:text-sm text-stone-600 leading-relaxed max-h-60 overflow-y-auto pr-1 no-scrollbar whitespace-pre-line font-medium mb-4">
              {selectedNotice.content}
            </div>

            <button
              onClick={() => setSelectedNotice(null)}
              className="w-full py-2.5 bg-stone-800 hover:bg-stone-950 text-white font-bold rounded-xl text-xs transition"
            >
              닫기
            </button>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* LOCAL GALLERY DETAILS & COMMENTS DIALOG MODAL */}
      {/* ========================================================= */}
      {selectedGallery && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-stone-950/40 backdrop-blur-sm" onClick={() => setSelectedGallery(null)} />
          <div className="relative bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200 border border-stone-100 flex flex-col">
            <button
              onClick={() => setSelectedGallery(null)}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-stone-900/60 hover:bg-stone-900 text-white transition shadow-md"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Scrollable container inside */}
            <div className="overflow-y-auto p-6 md:p-8 space-y-6 no-scrollbar">
              <div className="aspect-video w-full rounded-2xl overflow-hidden bg-stone-100">
                <img
                  referrerPolicy="no-referrer"
                  src={selectedGallery.image}
                  alt={selectedGallery.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div>
                <div className="flex justify-between items-center">
                  <span className="bg-blue-50 text-[#0e60a9] text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase">
                    현장 앨범
                  </span>
                  <span className="text-xs text-stone-400 font-bold">{selectedGallery.date}</span>
                </div>
                <h3 className="text-xl font-bold font-sans text-stone-800 mt-2">
                  {selectedGallery.title}
                </h3>
              </div>

              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-semibold">
                {selectedGallery.description}
              </p>

              {/* Likes Area */}
              <div className="flex items-center justify-between border-t border-b border-stone-100 py-3.5">
                <span className="text-xs text-stone-400 font-bold">
                  이 사진첩 소식이 마음에 드시나요?
                </span>
                <button
                  onClick={() => handleLikeGallery(selectedGallery.id)}
                  className="flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold transition-all bg-rose-50 text-rose-600 hover:bg-rose-100 ring-1 ring-rose-200 cursor-pointer"
                >
                  <Heart className="w-4 h-4 fill-current text-rose-500" />
                  <span>공감 {galleryLikes[selectedGallery.id] || 0}</span>
                </button>
              </div>

              {/* Comments Area */}
              <div>
                <h4 className="text-stone-800 font-bold text-sm mb-3 flex items-center gap-1.5">
                  <MessageSquare className="w-4 h-4 text-[#FD7700]" />
                  <span>학부모 한마디 ({galleryComments[selectedGallery.id]?.length || 0})</span>
                </h4>

                <div className="space-y-2 mb-4">
                  {(galleryComments[selectedGallery.id] || []).map((comment, index) => (
                    <div key={index} className="bg-stone-50 p-3 rounded-xl border border-stone-100 text-xs">
                      <div className="flex justify-between items-center mb-1">
                        <span className="font-bold text-stone-700">{comment.author}</span>
                        <span className="text-[10px] text-stone-400 font-mono">가등록</span>
                      </div>
                      <p className="text-stone-600 leading-relaxed font-semibold">{comment.text}</p>
                    </div>
                  ))}
                  {(!galleryComments[selectedGallery.id] || galleryComments[selectedGallery.id].length === 0) && (
                    <div className="text-center py-6 text-stone-400 text-xs">
                      첫 소감 댓글을 남겨주세요.
                    </div>
                  )}
                </div>

                {/* Comment Form */}
                <form onSubmit={(e) => handleAddComment(e, selectedGallery.id)} className="space-y-2 bg-stone-50/50 p-4 rounded-2xl border border-stone-100">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      required
                      placeholder="한글 닉네임"
                      value={newCommentAuthor}
                      onChange={(e) => setNewCommentAuthor(e.target.value)}
                      className="w-1/3 px-3 py-2 border rounded-xl bg-white text-xs text-stone-800 focus:outline-none focus:ring-1 focus:ring-[#FD7700]"
                    />
                    <input
                      type="text"
                      required
                      placeholder="학부모 소감 댓글을 자유롭게 남겨주세요."
                      value={newCommentText}
                      onChange={(e) => setNewCommentText(e.target.value)}
                      className="flex-1 px-3 py-2 border rounded-xl bg-white text-xs text-stone-800 focus:outline-none focus:ring-1 focus:ring-[#FD7700]"
                    />
                    <button
                      type="submit"
                      className="p-2 rounded-xl bg-[#FD7700] text-white hover:bg-[#E05D00] transition"
                    >
                      <Send className="w-4 h-4" />
                    </button>
                  </div>
                </form>
              </div>

            </div>

            <div className="p-4 bg-stone-50 border-t border-stone-100 flex gap-2">
              <button
                onClick={() => setSelectedGallery(null)}
                className="w-full py-2.5 bg-stone-800 hover:bg-stone-900 text-white font-bold text-xs rounded-xl"
              >
                소식첩 닫기
              </button>
            </div>
          </div>
        </div>
      )}

    </section>
  );
}
