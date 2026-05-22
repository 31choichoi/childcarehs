/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Flame, Star, Sparkles, AlertCircle, Calendar, Users, Heart } from "lucide-react";

interface HeroProps {
  onRentClick: () => void;
  onPlayroomClick: () => void;
}

export default function Hero({ onRentClick, onPlayroomClick }: HeroProps) {
  return (
    <section className="relative w-full overflow-hidden bg-transparent text-white pt-8 pb-16 md:py-20">
      <div className="relative max-w-7xl mx-auto px-6 md:px-10 flex flex-col lg:flex-row items-center justify-between gap-12 md:gap-16">
        
        {/* Left text message */}
        <div className="flex-1 space-y-8 text-left">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 shadow-sm text-sm font-extrabold uppercase tracking-widest text-[#FFF9E9]">
            <Sparkles className="w-4.5 h-4.5 text-yellow-300 animate-spin" />
            <span>Together with Children</span>
          </div>
 
          <h1 className="text-lg xs:text-xl sm:text-3xl md:text-4xl font-black leading-tight font-sans text-white drop-shadow-md flex flex-col gap-1 sm:gap-2">
            <span className="text-base xs:text-lg sm:text-2xl md:text-3.5xl lg:text-[34px] block whitespace-nowrap mb-0.5">함께 키우고 함께 웃는</span>
            <span className="block">
              <span className="text-[#fec744] drop-shadow-sm font-black relative px-1 inline-block">
                행복한 육아
                <span className="absolute bottom-1.5 left-0 w-full h-2 bg-yellow-400/30 -z-10"></span>
              </span>
              <span className="text-white">,</span>
            </span>
            <span className="text-lg sm:text-2xl md:text-3xl block mt-0.5 sm:mt-1 leading-tight font-bold text-stone-100">
              화성시육아종합지원센터
            </span>
          </h1>
 
          <p className="text-xs sm:text-base md:text-lg text-orange-50/80 leading-relaxed max-w-xl font-normal">
            화성시 부모님과 소중한 아동들을 위한 최적의 생애주기별 맞춤형 육아 서비스를 전격 제공합니다. 
            안심하고 자녀를 키우며 성장을 체감할 수 있는 따뜻한 돌봄 환경을 신속히 구축합니다.
          </p>
 
          <div className="flex flex-wrap gap-4 pt-4">
            <button
              onClick={onPlayroomClick}
              className="px-6 py-4 rounded-2xl bg-[#fec744] hover:bg-yellow-400 text-[#311300] font-black text-base sm:text-lg transition-all transform hover:-translate-y-0.5 active:translate-y-0 flex items-center gap-2.5 shadow-xl shadow-yellow-600/30 cursor-pointer"
            >
              <span>놀이체험실 상상이용 예약</span>
              <span className="bg-white/95 text-[#FD7700] px-2.5 py-0.5 rounded-lg text-xs uppercase font-black tracking-wider">
                즉시 예약
              </span>
            </button>
            <button
              onClick={onRentClick}
              className="px-6 py-4 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-black text-base sm:text-lg transition-all backdrop-blur-sm border border-white/25 hover:border-white/40 flex items-center gap-2 cursor-pointer"
            >
              <span>장난감 무료대여 순위</span>
            </button>
          </div>
        </div>
 
        {/* Right column: Elegant glassy dashboard cards of center operations */}
        <div className="w-full lg:w-[480px] xl:w-[500px] shrink-0">
          <div className="relative overflow-hidden rounded-3xl border border-white/15 p-6 md:p-8 shadow-2xl bg-black/30 backdrop-blur-xl group hover:border-yellow-400/20 transition-all duration-300">
            <div className="flex justify-between items-center mb-6 pb-4 border-b border-white/10">
              <h3 className="text-lg font-black text-white flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#fec744] animate-ping" />
                <span>오늘의 센터 운영 현황</span>
              </h3>
              <span className="text-xs font-mono text-orange-200 bg-white/10 px-2.5 py-1 rounded-full font-bold">LIVE ON</span>
            </div>

            <div className="space-y-4">
              <div className="relative flex items-center justify-between p-3.5 pl-10 sm:pl-11 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition">
                <span className="absolute -left-3.5 top-1/2 -translate-y-1/2 text-lg sm:text-xl w-8 h-8 sm:w-9 sm:h-9 bg-stone-900/80 border border-white/15 rounded-full flex items-center justify-center shadow-lg select-none shrink-0">🧸</span>
                <div className="flex-1 min-w-0 pr-1">
                  <h4 className="text-xs sm:text-sm font-black text-white truncate whitespace-nowrap">동탄본부 장난감도서관</h4>
                  <p className="text-[10px] sm:text-[11px] text-orange-200/80 font-semibold mt-0.5 truncate whitespace-nowrap">대여 및 가예약 실시간 접수 중</p>
                </div>
                <span className="text-[10px] sm:text-xs bg-emerald-500/20 text-emerald-300 font-extrabold px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full shrink-0 ml-1">정상운영</span>
              </div>

              <div className="relative flex items-center justify-between p-3.5 pl-10 sm:pl-11 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition">
                <span className="absolute -left-3.5 top-1/2 -translate-y-1/2 text-lg sm:text-xl w-8 h-8 sm:w-9 sm:h-9 bg-stone-900/80 border border-white/15 rounded-full flex items-center justify-center shadow-lg select-none shrink-0">🪁</span>
                <div className="flex-1 min-w-0 pr-1">
                  <h4 className="text-xs sm:text-sm font-black text-white truncate whitespace-nowrap">놀이체험실 상상놀이터</h4>
                  <p className="text-[10px] sm:text-[11px] text-orange-200/80 font-semibold mt-0.5 truncate whitespace-nowrap">회기별 쾌적 정원 예약제 적용</p>
                </div>
                <span className="text-[10px] sm:text-xs bg-emerald-500/20 text-emerald-300 font-extrabold px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full shrink-0 ml-1">정상운영</span>
              </div>

              <div className="relative flex items-center justify-between p-3.5 pl-10 sm:pl-11 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition">
                <span className="absolute -left-3.5 top-1/2 -translate-y-1/2 text-lg sm:text-xl w-8 h-8 sm:w-9 sm:h-9 bg-stone-900/80 border border-white/15 rounded-full flex items-center justify-center shadow-lg select-none shrink-0">🍼</span>
                <div className="flex-1 min-w-0 pr-1">
                  <h4 className="text-xs sm:text-sm font-black text-white truncate whitespace-nowrap">시간제보육 영아돌봄</h4>
                  <p className="text-[10px] sm:text-[11px] text-orange-200/80 font-semibold mt-0.5 truncate whitespace-nowrap">당일 및 우선 시간 예약 가능</p>
                </div>
                <span className="text-[10px] sm:text-xs bg-emerald-500/20 text-emerald-300 font-extrabold px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full shrink-0 ml-1">예약가능</span>
              </div>

              <div className="relative flex items-center justify-between p-3.5 pl-10 sm:pl-11 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition">
                <span className="absolute -left-3.5 top-1/2 -translate-y-1/2 text-lg sm:text-xl w-8 h-8 sm:w-9 sm:h-9 bg-stone-900/80 border border-white/15 rounded-full flex items-center justify-center shadow-lg select-none shrink-0">💖</span>
                <div className="flex-1 min-w-0 pr-1">
                  <h4 className="text-xs sm:text-sm font-black text-white truncate whitespace-nowrap">1:1 온라인 마음종합상담</h4>
                  <p className="text-[10px] sm:text-[11px] text-orange-200/80 font-semibold mt-0.5 truncate whitespace-nowrap">종합 아동기질 진단 온라인 지원</p>
                </div>
                <span className="text-[10px] sm:text-xs bg-emerald-500/20 text-emerald-300 font-extrabold px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full shrink-0 ml-1">상담중</span>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-white/15 flex justify-between items-center text-xs text-orange-100/70 font-bold">
              <span>⏰ 평일 09:00 ~ 18:00 (토,일 휴무)</span>
              <span>📍 동탄본부 / 봉담분소</span>
            </div>
          </div>
        </div>
 
      </div>
    </section>
  );
}
