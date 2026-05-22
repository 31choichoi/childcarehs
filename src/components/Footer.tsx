/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Heart } from "lucide-react";

export default function Footer() {
  const handlePrivacyAlert = () => {
    alert("화성시 개인정보 보호 조례에 근거한 정규 개인정보 보호 정책 요약서입니다.");
  };

  return (
    <footer className="bg-[#353b45] text-[#d1d5db] py-14 border-t border-stone-800 font-sans">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-center">
          
          {/* LEFT SIDE: Brand & Partnership Logo Area */}
          <div className="lg:col-span-5 flex items-center gap-4 text-white">
            {/* Elegant SVG Logo to match the image's logo style (USW/SC stylized family emblem) */}
            <div className="flex items-center gap-3 shrink-0">
              <div className="w-12 h-11 border border-white/20 rounded-xl flex items-center justify-center bg-white/5 shadow-inner">
                <Heart className="w-7 h-7 text-white/90 fill-white/20 animate-pulse" />
              </div>
              <div className="w-[1.5px] h-10 bg-white/20"></div>
            </div>

            <div className="flex flex-col text-left">
              <span className="text-xs sm:text-sm font-semibold text-[#a3aab5] tracking-tight leading-relaxed flex items-center gap-1.5 matches-usw">
                {/* Simulated USW Logo text in image */}
                <span className="font-bold border-r border-[#a3aab5]/45 pr-1.5 text-white/90 uppercase tracking-widest text-[10px] sm:text-xs">USW</span>
                <span>수원대학교 산학협력단 위탁운영</span>
              </span>
              <span className="text-lg sm:text-xl md:text-2xl font-black text-white tracking-wide mt-1">
                경기 화성시육아종합지원센터
              </span>
            </div>
          </div>

          {/* RIGHT SIDE: Contact Info, Legal, Copyright */}
          <div className="lg:col-span-7 flex flex-col items-start lg:items-end text-left lg:text-right gap-3 leading-relaxed text-sm">
            <address className="not-italic text-sm sm:text-base text-[#bcc2cc] font-medium tracking-tight">
              (18323) 경기도 화성시 효행구 봉담읍 와우안길 17 수원대학교 고운첨단과학기술연구원 11층
            </address>
            
            <div className="text-sm sm:text-base text-[#bcc2cc] font-bold flex flex-wrap gap-x-4 gap-y-1">
              <span><strong>TEL.</strong> 031)8059-1640</span>
              <span className="text-[#a3aab5]/40 hidden sm:inline">|</span>
              <span><strong>FAX.</strong> 031-8059-1643</span>
            </div>

            <div className="mt-2">
              <button
                type="button"
                onClick={handlePrivacyAlert}
                className="text-white hover:text-orange-400 font-extrabold text-base underline underline-offset-4 cursor-pointer"
              >
                개인정보처리방침
              </button>
            </div>

            <p className="text-xs sm:text-sm text-[#9da4b0] font-medium mt-1">
              Copyright 2026 화성시육아종합지원센터 All rights reserved.
            </p>
          </div>

        </div>

      </div>
    </footer>
  );
}
