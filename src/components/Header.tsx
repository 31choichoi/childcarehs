/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { Baby, Menu, X, LogIn, UserPlus, Heart, Sparkles, BookOpen } from "lucide-react";

interface HeaderProps {
  onSelectService: (service: string) => void;
  isLoggedIn: boolean;
  onToggleLogin: () => void;
  onOpenConsulting: () => void;
}

export default function Header({
  onSelectService,
  isLoggedIn,
  onToggleLogin,
  onOpenConsulting,
}: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const menuItems = [
    { label: "센터소개", action: () => alert("화성시육아종합지원센터는 화성시 관내 영유아들을 위해 2012년 설립되어, 쾌적하고 신뢰 넘치는 양육·보육 환경 구축에 전력을 다하고 있습니다.") },
    { label: "어린이집지원", action: () => onSelectService("어린이집컨설팅") },
    { label: "가정양육지원", action: () => onSelectService("상담신청") },
    { label: "센터이용", action: () => onSelectService("놀이체험실") },
    { label: "정보공유", action: () => document.getElementById("community-section")?.scrollIntoView({ behavior: "smooth" }) },
    { label: "e-고객센터", action: () => document.getElementById("faq-civil-section")?.scrollIntoView({ behavior: "smooth" }) },
  ];

  return (
    <header className="bg-black/25 sticky top-0 z-50 border-b border-white/10 backdrop-blur-md shadow-md min-h-24 md:h-24 transition-all duration-300 flex items-center py-2 md:py-0">
      <div className="flex justify-between items-center w-full px-4 md:px-8 max-w-7xl mx-auto h-full gap-2">
        
        {/* LOGO AREA */}
        <a 
          className="flex items-start md:items-center gap-2 md:gap-3 group cursor-pointer shrink-0" 
          href="/"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        >
          <div className="w-11 h-11 rounded-full bg-orange-500 flex items-center justify-center text-white group-hover:scale-105 transition-transform duration-300 shrink-0 mt-1 md:mt-0">
            <Baby className="w-7 h-7 text-white" />
          </div>
          <div className="flex flex-col">
            <span className="text-lg sm:text-xl md:text-2xl font-black tracking-tight text-white font-sans flex items-start md:items-center gap-1 md:gap-1.5 leading-tight">
              <span className="md:hidden flex flex-col items-start leading-tight">
                <span>화성시</span>
                <span>육아종합</span>
                <span>지원센터</span>
              </span>
              <span className="hidden md:inline-block">
                화성시육아종합지원센터
              </span>
              <span className="inline-block w-2 h-2 rounded-full bg-[#fec744] animate-pulse mt-1 md:mt-0 shrink-0"></span>
            </span>
            <span className="text-xs font-mono text-orange-200/90 font-bold uppercase tracking-wider hidden sm:inline-block mt-0.5">
              Hwaseong Childcare Support Portal
            </span>
          </div>
        </a>

        {/* DESKTOP MAIN NAVIGATION */}
        <nav className="hidden lg:flex items-center gap-10">
          {menuItems.map((item, idx) => (
            <button
              key={idx}
              onClick={item.action}
              className="text-stone-100 hover:text-[#fec744] hover:scale-102 transition-all font-extrabold text-base py-2 relative group cursor-pointer"
            >
              {item.label}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#fec744] transition-all duration-300 group-hover:w-full"></span>
            </button>
          ))}
        </nav>

        {/* ACTIONS AREA (LOGIN / REGISTER) */}
        <div className="flex items-center gap-3 shrink-0">
          {isLoggedIn ? (
            <div className="flex items-center gap-3">
              <div className="hidden sm:flex flex-col text-right">
                <span className="text-sm font-black text-[#fec744] flex items-center gap-1 justify-end">
                  <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                  홍길동 학부모 회원
                </span>
                <span className="text-xs text-stone-300 font-semibold">종합 정회원</span>
              </div>
              <button
                onClick={onToggleLogin}
                className="bg-white/15 text-white border border-white/20 px-4 py-2.5 rounded-xl text-sm font-black hover:bg-white/25 active:scale-95 transition-all shadow-sm whitespace-nowrap cursor-pointer"
              >
                로그아웃
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2 whitespace-nowrap shrink-0">
              <button
                onClick={onToggleLogin}
                className="bg-white/10 text-white px-4 py-2.5 rounded-xl text-sm font-black hover:bg-white/20 transition-all border border-white/20 flex items-center gap-1 shadow-sm shrink-0 whitespace-nowrap cursor-pointer"
              >
                <LogIn className="w-4 h-4 shrink-0" />
                <span>로그인</span>
              </button>
              <button
                onClick={() => alert("화성시 아이들과 부모님을 위한 통합회원 가입 화면입니다. 가입 시 장난감 도서관 1년 대여료 혜택 및 놀이체험실 무료 관람 혜택을 드립니다.")}
                className="bg-[#FD7700] hover:bg-[#E05D00] text-white px-4 py-2.5 rounded-xl text-sm font-black transition-all shadow-md shadow-orange-500/15 flex items-center gap-1 shrink-0 whitespace-nowrap cursor-pointer"
              >
                <UserPlus className="w-4 h-4 shrink-0" />
                <span>회원가입</span>
              </button>
            </div>
          )}

          {/* MOBILE MENU TOGGLE */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2.5 rounded-xl hover:bg-white/10 lg:hidden text-white transition shrink-0"
            aria-label="메뉴 열기"
          >
            {mobileMenuOpen ? <X className="w-6.5 h-6.5" /> : <Menu className="w-6.5 h-6.5" />}
          </button>
        </div>
      </div>

      {/* MOBILE DRAWER MENU */}
      {mobileMenuOpen && (
        <div className="lg:hidden absolute top-24 left-0 w-full bg-stone-900/95 border-b border-stone-800 shadow-xl overflow-hidden py-4 animate-in slide-in-from-top duration-200 z-50">
          <div className="flex flex-col px-4 gap-2">
            {menuItems.map((item, idx) => (
              <button
                key={idx}
                onClick={() => {
                  item.action();
                  setMobileMenuOpen(false);
                }}
                className="w-full text-left py-3 px-2 text-stone-100 hover:text-[#fec744] text-base font-black border-b border-stone-800/60"
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
