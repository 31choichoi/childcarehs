/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Clock, ToyBrick, Bike, Heart, Users, Landmark, SearchCode, FolderOpen, ArrowRight } from "lucide-react";

interface ServiceGridProps {
  onSelectService: (service: string) => void;
}

export default function ServiceGrid({ onSelectService }: ServiceGridProps) {
  const services = [
    {
      title: "시간제보육",
      desc: "필요한 시간만 집중 돌봄",
      icon: Clock,
      color: "text-[#FD7700] bg-orange-50 group-hover:bg-[#FD7700] group-hover:text-white",
      borderColor: "border-[#FD7700]/10",
      slug: "시간제보육",
    },
    {
      title: "장난감대여",
      desc: "지점별 프리미엄 완구 무료 대여",
      icon: ToyBrick,
      color: "text-[#795900] bg-yellow-50 group-hover:bg-[#fec744] group-hover:text-[#311300]",
      borderColor: "border-[#fec744]/20",
      slug: "장난감대여",
    },
    {
      title: "놀이체험실",
      desc: "테마 상상 영유아 오감놀이터",
      icon: Bike,
      color: "text-[#0e60a9] bg-blue-50 group-hover:bg-[#0e60a9] group-hover:text-white",
      borderColor: "border-[#0e60a9]/10",
      slug: "놀이체험실",
    },
    {
      title: "상담신청",
      desc: "아동 발달 및 훈육 심리 상담소",
      icon: Heart,
      color: "text-rose-500 bg-rose-50 group-hover:bg-rose-500 group-hover:text-white",
      borderColor: "border-rose-500/10",
      slug: "상담신청",
    },
    {
      title: "부모교육",
      desc: "기질 양육 훈육 세미나 상상교실",
      icon: Users,
      color: "text-purple-600 bg-purple-50 group-hover:bg-purple-600 group-hover:text-white",
      borderColor: "border-purple-500/10",
      slug: "부모교육",
    },
    {
      title: "어린이집컨설팅",
      desc: "보육 시설 평가인증 및 컨설팅",
      icon: Landmark,
      color: "text-emerald-600 bg-emerald-50 group-hover:bg-emerald-600 group-hover:text-white",
      borderColor: "border-emerald-500/10",
      slug: "어린이집컨설팅",
    },
    {
      title: "구인구직",
      desc: "관내 어린이집 보육 인재 구인",
      icon: SearchCode,
      color: "text-slate-600 bg-slate-50 group-hover:bg-slate-700 group-hover:text-white",
      borderColor: "border-slate-500/10",
      slug: "구인구직",
    },
    {
      title: "서식자료실",
      desc: "기관 서식 및 이용 자료 다운로드",
      icon: FolderOpen,
      color: "text-teal-600 bg-teal-50 group-hover:bg-teal-600 group-hover:text-white",
      borderColor: "border-teal-500/10",
      slug: "서식자료실",
    },
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 md:px-8 -mt-10 md:-mt-12 relative z-20">
      
      {/* Cards container */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4">
        {services.map((svc, idx) => {
          const IconComponent = svc.icon;
          return (
            <button
              key={idx}
              onClick={() => onSelectService(svc.slug)}
              className="bg-white p-5 rounded-2xl shadow-md border border-stone-200/60 flex flex-col items-center gap-3 hover:-translate-y-1.5 transition-all duration-300 hover:shadow-xl group text-stone-800 text-left h-full w-full justify-between cursor-pointer"
            >
              <div className="flex flex-col items-center gap-3 w-full">
                {/* Smooth circular backdrop icon */}
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-300 ${svc.color} shadow-sm group-hover:rotate-6`}>
                  <IconComponent className="w-6 h-6" />
                </div>
                
                <div className="text-center">
                  <h3 className="text-sm sm:text-base md:text-lg font-black text-stone-800 group-hover:text-[#FD7700] transition-colors leading-snug">{svc.title}</h3>
                  <p className="text-xs text-stone-500 mt-1.5 line-clamp-2 md:block hidden leading-snug font-semibold text-center">
                    {svc.desc}
                  </p>
                </div>
              </div>

              {/* Minimal arrow footer */}
              <div className="mt-2 text-stone-300 group-hover:text-[#FD7700] transition-colors flex items-center justify-center">
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </button>
          );
        })}
      </div>

    </section>
  );
}
