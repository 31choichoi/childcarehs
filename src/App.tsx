/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from "react";
import { CheckCircle2, Sparkles, X, Heart, AlertCircle, ArrowUp } from "lucide-react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import ServiceGrid from "./components/ServiceGrid";
import IntegratedNews from "./components/IntegratedNews";
import BannerZone from "./components/BannerZone";
import QuickLinks from "./components/QuickLinks";
import Footer from "./components/Footer";
import ServiceModals from "./components/ServiceModals";
import { CalendarEvent } from "./types";

export default function App() {
  // Global simulation state
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeModal, setActiveModal] = useState<string | null>(null);
  
  // Custom Toast/Notification State
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [toastTimer, setToastTimer] = useState<NodeJS.Timeout | null>(null);

  // Scroll to Top visibility state
  const [showScrollTop, setShowScrollTop] = useState(false);

  const triggerToast = (message: string) => {
    if (toastTimer) {
      clearTimeout(toastTimer);
    }
    setToastMessage(message);
    const timer = setTimeout(() => {
      setToastMessage(null);
    }, 6000);
    setToastTimer(timer);
  };

  const handleToggleLogin = () => {
    if (isLoggedIn) {
      setIsLoggedIn(false);
      triggerToast("👋 로그아웃 되었습니다. 방문해 주셔서 감사합니다.");
    } else {
      setIsLoggedIn(true);
      triggerToast("🔐 학부모님용 원스톱 포털 로그인 성공! (테스트 계정)");
    }
  };

  const handleSelectService = (slug: string) => {
    setActiveModal(slug);
  };

  const handleSelectCalendarEvent = (event: CalendarEvent) => {
    // Open appropriate booking or inform parents
    triggerToast(
      `📅 [${event.category}] 프로그램 신청 폼 자동연동 완료!\n\n과정명: ${event.title}\n일자: ${event.date}\n시간: ${event.time}\n\n정회원 자격을 기반으로 신청이 자동 접수되었습니다.`
    );
  };

  const handleCloseModal = () => {
    setActiveModal(null);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  // Setup scroll event listener and cleanup timers on unmount
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (toastTimer) {
        clearTimeout(toastTimer);
      }
    };
  }, [toastTimer]);

  return (
    <div className="min-h-screen bg-[#fbf9f8] text-[#1b1c1c] flex flex-col relative antialiased shadow-sm">
      
      {/* ========================================================= */}
      {/* MASTER TOP WRAPPER (HEADER & HERO WITH CONTINUOUS ZOOM INTRO COVERAGE) */}
      {/* ========================================================= */}
      <div className="relative w-full overflow-hidden bg-stone-950">
        {/* Continuous slow-zooming background image */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <img 
            src="https://mydrim.net/img/childcare_main.png" 
            alt="화성시육아종합지원센터 메인 통합 배경" 
            className="w-full h-full object-cover opacity-50 scale-100 animate-infiniteZoom origin-center"
            referrerPolicy="no-referrer"
          />
          {/* Dual layers gradient overlay to secure outstanding readability for all elements and text */}
          <div className="absolute inset-0 bg-gradient-to-b from-stone-950/80 via-stone-900/50 to-[#fbf9f8]" />
          <div className="absolute inset-0 bg-[#240c00]/30 mix-blend-multiply" />
        </div>

        {/* Unified Layout Body */}
        <div className="relative z-10 w-full flex flex-col">
          {/* 1. HEADER */}
          <Header
            onSelectService={handleSelectService}
            isLoggedIn={isLoggedIn}
            onToggleLogin={handleToggleLogin}
            onOpenConsulting={() => handleSelectService("어린이집컨설팅")}
          />

          {/* 2. HERO SLIDER */}
          <Hero 
            onRentClick={() => handleSelectService("장난감대여")}
            onPlayroomClick={() => handleSelectService("놀이체험실")}
          />
        </div>
      </div>

      {/* 3. CORE SERVICE BOXES */}
      <ServiceGrid onSelectService={handleSelectService} />

      {/* 4. INTEGRATED NEWSPRPRINT (NOTICES / SCHEDULES / GALLERY) */}
      <IntegratedNews 
        onSelectEvent={handleSelectCalendarEvent}
        onSuccess={triggerToast}
      />

      {/* 5. QUICKUTILITIES (FAQ / INTERACTIVE MAP / CIVIL COMPLAINTS) */}
      <QuickLinks onSuccess={triggerToast} />

      {/* 6. COOPERATIVE BRANDS PARTNERS */}
      <BannerZone />

      {/* 7. FOOTER FOOTNOTES */}
      <Footer />

      {/* ========================================================= */}
      {/* SERVICE MODALS (시간제보육, 장난감대여, 상담 등) */}
      {/* ========================================================= */}
      <ServiceModals
        activeModal={activeModal}
        onClose={handleCloseModal}
        onSuccess={triggerToast}
      />

      {/* ========================================================= */}
      {/* 8. FLOATING INTERACTIVE SCROLL TO TOP BUTTON */}
      {/* ========================================================= */}
      <button
        type="button"
        onClick={scrollToTop}
        className={`fixed bottom-6 right-6 z-[110] w-12 h-12 bg-[#FD7700] hover:bg-[#E05D00] text-white rounded-full shadow-2xl border border-orange-500/20 flex flex-col items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-orange-200 active:scale-95 group cursor-pointer ${
          showScrollTop 
            ? "opacity-100 translate-y-0 scale-100" 
            : "opacity-0 translate-y-4 scale-75 pointer-events-none"
        }`}
        aria-label="맨 위로 스크롤"
        id="scroll-to-top"
      >
        <ArrowUp className="w-5 h-5 group-hover:-translate-y-0.5 transition-transform duration-300" />
        <span className="text-[8px] font-black tracking-widest uppercase -mt-0.5">TOP</span>
      </button>

      {/* ========================================================= */}
      {/* INTERACTIVE COMPREHENSIVE TOAST TELEMETRY NOISE-FREE */}
      {/* ========================================================= */}
      {toastMessage && (
        <div className="fixed bottom-22 right-6 z-[120] max-w-sm w-full bg-[#1b1c1c] text-white p-5 rounded-2xl shadow-2xl border border-stone-800 flex items-start gap-3.5 animate-in slide-in-from-bottom duration-300">
          <div className="p-1.5 rounded-lg bg-orange-500/10 text-orange-500 shrink-0">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div className="flex-1 space-y-1">
            <div className="text-[10px] uppercase font-black text-amber-400 tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-3 h-3 text-amber-500 animate-pulse" />
              <span>화성종합지원센터 알림</span>
            </div>
            <p className="text-xs font-semibold leading-relaxed whitespace-pre-line text-stone-200">
              {toastMessage}
            </p>
          </div>
          <button
            onClick={() => setToastMessage(null)}
            className="p-1 rounded-full hover:bg-stone-800 text-stone-500 hover:text-stone-300 transition shrink-0"
            aria-label="알림 닫기"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

    </div>
  );
}
