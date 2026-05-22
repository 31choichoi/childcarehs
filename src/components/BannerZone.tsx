/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { Play, Pause, ChevronLeft, ChevronRight, Landmark, ExternalLink } from "lucide-react";

export default function BannerZone() {
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  const partners = [
    { name: "보건복지부", color: "text-orange-500 bg-orange-50/50", url: "https://www.mohw.go.kr" },
    { name: "화성시청", color: "text-[#0e60a9] bg-blue-50/50", url: "https://www.hscity.go.kr" },
    { name: "중앙육아종합지원센터", color: "text-emerald-500 bg-emerald-50/50", url: "https://central.childcare.go.kr" },
    { name: "아이사랑보육포털", color: "text-[#FD7700] bg-orange-50/50", url: "https://www.childcare.go.kr" },
    { name: "아동권리보장원", color: "text-rose-500 bg-rose-50/50", url: "https://www.ncrc.or.kr" }
  ];

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % partners.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + partners.length) % partners.length);
  };

  return (
    <section className="bg-stone-100 py-10 md:py-12 border-t border-b border-stone-200 overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        
        {/* Header toolbar */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 border-b border-stone-200 pb-4">
          <div className="flex items-center gap-3">
            <h3 className="text-sm sm:text-base font-black text-stone-800 uppercase tracking-wider flex items-center gap-2">
              <Landmark className="w-4.5 h-4.5 text-[#FD7700]" />
              <span>관련기관 배너존</span>
            </h3>
 
            {/* Play Pause actions */}
            <div className="flex items-center bg-white border border-stone-200 rounded-lg p-0.5 shadow-sm text-stone-400">
              <button
                type="button"
                onClick={() => setIsPlaying(true)}
                className={`p-1 rounded hover:bg-stone-50 ${isPlaying ? "text-primary bg-stone-100" : ""}`}
                aria-label="자동재생 시작"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
              </button>
              <button
                type="button"
                onClick={() => setIsPlaying(false)}
                className={`p-1 rounded hover:bg-stone-50 ${!isPlaying ? "text-primary bg-stone-100" : ""}`}
                aria-label="자동재생 일시정지"
              >
                <Pause className="w-3.5 h-3.5 fill-current" />
              </button>
            </div>
          </div>
 
          {/* Left right buttons */}
          <div className="flex gap-1.5 self-end sm:self-auto">
            <button
              onClick={handlePrev}
              className="w-8 h-8 flex items-center justify-center border border-stone-200 bg-white hover:bg-stone-50 rounded-full transition-all text-stone-500"
              aria-label="이전 배너"
            >
              <ChevronLeft className="w-4.5 h-4.5" />
            </button>
            <button
              onClick={handleNext}
              className="w-8 h-8 flex items-center justify-center border border-stone-200 bg-white hover:bg-stone-50 rounded-full transition-all text-stone-500"
              aria-label="다음 배너"
            >
              <ChevronRight className="w-4.5 h-4.5" />
            </button>
          </div>
        </div>
 
        {/* Carousel slide items list */}
        <div className="relative">
          {/* Static rendering with highlight on hovered */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {partners.map((partner, index) => {
              const isCircled = currentIndex === index;
              return (
                <a
                  key={index}
                  href={partner.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`px-5 py-4 rounded-2xl border transition-all duration-300 flex items-center justify-between cursor-pointer group bg-white shadow-sm ${
                    isCircled 
                      ? "border-primary-container ring-1 ring-primary-container scale-102" 
                      : "border-stone-200/60 hover:border-stone-300 hover:scale-101"
                  }`}
                >
                  <span className="text-sm sm:text-base font-black text-stone-700 group-hover:text-primary transition-colors">
                    {partner.name}
                  </span>
                  <ExternalLink className="w-3.5 h-3.5 text-stone-400 group-hover:text-primary group-hover:translate-x-0.5 transition" />
                </a>
              );
            })}
          </div>
          
          {isPlaying && (
            <div className="text-xs text-stone-500 mt-4 text-center italic font-bold animate-pulse">
              ℹ️ 배너 자동 스윙 순환 활성화 중
            </div>
          )}
        </div>

      </div>
    </section>
  );
}
