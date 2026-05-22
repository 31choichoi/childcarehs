/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { X, Calendar, User, Clock, MapPin, Sparkles, Check, Baby, ToyBrick, Heart, Phone } from "lucide-react";
import { mockToys } from "../data";

interface ServiceModalsProps {
  activeModal: string | null;
  onClose: () => void;
  onSuccess: (message: string) => void;
}

export default function ServiceModals({ activeModal, onClose, onSuccess }: ServiceModalsProps) {
  if (!activeModal) return null;

  // 1. 시간제보육 (Hourly Care)
  const [hourlyDate, setHourlyDate] = useState("");
  const [hourlyCenter, setHourlyCenter] = useState("동탄본부 시간제영아돌봄터");
  const [childName, setChildName] = useState("");
  const [childBirth, setChildBirth] = useState("");
  const [selectedHours, setSelectedHours] = useState<number[]>([]);
  const [parentPhone, setParentPhone] = useState("");

  const handleHourToggle = (hour: number) => {
    if (selectedHours.includes(hour)) {
      setSelectedHours(selectedHours.filter((h) => h !== hour));
    } else {
      setSelectedHours([...selectedHours, hour].sort((a, b) => a - b));
    }
  };

  const handleHourlySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!childName || !childBirth || !hourlyDate || !parentPhone || selectedHours.length === 0) {
      alert("모든 필수 입력 정보를 기록하시고 필요 시간을 선택해 주세요.");
      return;
    }
    onSuccess(
      `🎉 시간제 보육 예약 완료!\n\n아동명: ${childName}\n지점: ${hourlyCenter}\n일자: ${hourlyDate}\n선택시간: ${selectedHours.map(
        (h) => `${h}:00`
      ).join(", ")}\n\n예약 확인 알림톡이 ${parentPhone}(으)로 발송됩니다.`
    );
    onClose();
  };

  // 2. 장난감대여 (Toy Rental Explorer)
  const [toySearch, setToySearch] = useState("");
  const [toyBranch, setToyBranch] = useState("전체");
  const [toyRentals, setToyRentals] = useState<number[]>([]);

  const filteredToys = mockToys.filter((toy) => {
    const matchesSearch = toy.name.toLowerCase().includes(toySearch.toLowerCase());
    const matchesBranch = toyBranch === "전체" || toy.branch === toyBranch;
    return matchesSearch && matchesBranch;
  });

  const handleRentToy = (toyId: number, toyName: string) => {
    onSuccess(
      `🎁 장난감 대여 예약 등록 완료!\n\n완구명: [${toyName}]\n수령지점: ${
        mockToys.find((t) => t.id === toyId)?.branch
      }\n기간: 수령일로부터 14일간\n\n지정 지점의 장난감 도서관 운영 시간 내에 주민등록등본 및 회원카드를 지참하시고 내방해 주세요.`
    );
    onClose();
  };

  // 3. 놀이체험실 (Playroom)
  const [playDate, setPlayDate] = useState("");
  const [playSession, setPlaySession] = useState("1회기 (10:00~12:00)");
  const [adultCount, setAdultCount] = useState(1);
  const [childCount, setChildCount] = useState(1);
  const [playParentName, setPlayParentName] = useState("");
  const [playPhone, setPlayPhone] = useState("");

  const handlePlaySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!playDate || !playParentName || !playPhone) {
      alert("모든 빈칸을 채워주세요.");
      return;
    }
    onSuccess(
      `🧸 놀이체험실 예약 성공!\n\n방문일: ${playDate}\n회기: ${playSession}\n입장 정원: 영유아 ${childCount}명, 양육자 ${adultCount}명\n예약자: ${playParentName}\n\n입장 시 양육자 양말 착용 필수이며, 현장에서 소정의 체험 이용비(2,000원) 결제가 이루어질 수 있습니다.`
    );
    onClose();
  };

  // 4. 상담신청 (Counseling)
  const [counselTarget, setCounselTarget] = useState<"영아부모" | "유아부모" | "보육교직원">("영아부모");
  const [counselType, setCounselType] = useState<"발달상담" | "양육상담" | "심리치료">("양육상담");
  const [counselorName, setCounselorName] = useState("");
  const [counselChildInfo, setCounselChildInfo] = useState("");
  const [counselPhone, setCounselPhone] = useState("");
  const [counselDate, setCounselDate] = useState("");
  const [counselDesc, setCounselDesc] = useState("");

  const handleCounselSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!counselorName || !counselPhone || !counselDate || !counselDesc) {
      alert("신청자명, 연락처, 희망일, 상담 사유는 필수입니다.");
      return;
    }
    onSuccess(
      `❤️ 아동/부모 전문 심리상담 신청이 완료되었습니다.\n\n대상: ${counselTarget} (${counselType})\n신청자: ${counselorName}\n희망일자: ${counselDate}\n\n신청 현황 정원 초과 여부 확인 후 담당 상담 지도교사가 개별 연락을 드려 본격적인 1:1 진단 예약을 확정합니다.`
    );
    onClose();
  };

  // Other modules (부모교육, 어린이집컨설팅, 구인구직, 서식자료실)
  const renderModalContent = () => {
    switch (activeModal) {
      case "시간제보육":
        return (
          <form onSubmit={handleHourlySubmit} className="space-y-4">
            <div className="flex items-center gap-2 text-primary pb-2 border-b border-orange-100">
              <Baby className="w-6 h-6 text-orange-500 animate-bounce" />
              <h3 className="text-xl font-bold font-sans">시간제보육 신청 (온라인 예약)</h3>
            </div>
            <p className="text-sm text-stone-600 leading-relaxed bg-stone-50 p-4 rounded-xl font-semibold">
              양육자의 부득이한 돌발 지출 병원 이용, 맞벌이 미팅, 외출 발생 시 지정 시간만큼 안심 보육을 유료 제공합니다. (시간당 4,000원 / 국가지원 대상자는 2,000원 결제)
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold text-stone-700 mb-1">지점 및 보육실 선택 <span className="text-red-500">*</span></label>
                <select
                  value={hourlyCenter}
                  onChange={(e) => setHourlyCenter(e.target.value)}
                  className="w-full px-3.5 py-2.5 border rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-primary-container font-semibold"
                >
                  <option value="동탄본부 시간제영아돌봄터">동탄본부 시간제영아돌봄터</option>
                  <option value="봉담분소 새일사랑 돌봄센터">봉담분소 새일사랑 돌봄센터</option>
                  <option value="남부종합 안심아이사랑키움실">남부종합 안심아이사랑키움실</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-bold text-stone-700 mb-1">예약 희망일 <span className="text-red-500">*</span></label>
                <input
                  type="date"
                  required
                  min="2026-05-22"
                  value={hourlyDate}
                  onChange={(e) => setHourlyDate(e.target.value)}
                  className="w-full px-3.5 py-2.5 border rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-primary-container font-semibold"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold text-stone-700 mb-1"> 아동 성명 <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  required
                  placeholder="예: 홍길동"
                  value={childName}
                  onChange={(e) => setChildName(e.target.value)}
                  className="w-full px-3.5 py-2.5 border rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-primary-container font-medium"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-stone-700 mb-1">아동 생년월일 <span className="text-red-500">*</span></label>
                <input
                  type="date"
                  required
                  max="2026-05-22"
                  placeholder="생년월일 입력"
                  value={childBirth}
                  onChange={(e) => setChildBirth(e.target.value)}
                  className="w-full px-3.5 py-2.5 border rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-primary-container font-semibold"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-stone-700 mb-1">보육 시간 선택 (중복가능) <span className="text-red-500">*</span></label>
              <div className="grid grid-cols-4 md:grid-cols-8 gap-2 mt-2">
                {[9, 10, 11, 12, 13, 14, 15, 16, 17].map((hour) => {
                  const isSelected = selectedHours.includes(hour);
                  return (
                    <button
                      key={hour}
                      type="button"
                      onClick={() => handleHourToggle(hour)}
                      className={`py-2 text-sm font-bold rounded-lg transition-all border ${
                        isSelected
                          ? "bg-primary border-primary text-white shadow-sm"
                          : "bg-white border-stone-200 text-stone-700 hover:bg-stone-50"
                      }`}
                    >
                      {hour}:00
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-stone-700 mb-1">비상 보호자 연락처 <span className="text-red-500">*</span></label>
              <input
                type="tel"
                required
                placeholder="예: 010-1234-5678"
                value={parentPhone}
                onChange={(e) => setParentPhone(e.target.value)}
                className="w-full px-3.5 py-2.5 border rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-primary-container font-medium"
              />
            </div>

            <div className="flex gap-4 pt-4 border-t border-stone-100">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 py-3 border rounded-xl text-stone-600 hover:bg-stone-50 font-bold transition-all text-sm sm:text-base cursor-pointer"
              >
                닫기
              </button>
              <button
                type="submit"
                className="flex-1 py-3 bg-primary text-white font-black rounded-xl shadow-lg shadow-orange-700/10 hover:opacity-90 transition-all text-sm sm:text-base cursor-pointer"
              >
                시간제 보육 예약하기
              </button>
            </div>
          </form>
        );

      case "장난감대여":
        return (
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-yellow-600 pb-2 border-b border-yellow-100">
              <ToyBrick className="w-6 h-6 text-yellow-500" />
              <h3 className="text-xl font-bold font-sans text-stone-800">장난감 도서관 실시간 검색 및 예약</h3>
            </div>
            <p className="text-sm text-stone-600 leading-relaxed bg-yellow-50/50 p-4 rounded-xl font-semibold">
              현재 지점별 보유 중인 아동 연령대 완구 현황입니다. 원하는 장난감을 홈페이지 상에서 우선 찜(가예약) 하고 3일 이내 회원카드 지참 후 내방 대여하실 수 있습니다.
            </p>

            <div className="flex flex-col md:flex-row gap-3">
              <div className="flex-1">
                <input
                  type="text"
                  placeholder="장난감 완구명 검색..."
                  value={toySearch}
                  onChange={(e) => setToySearch(e.target.value)}
                  className="w-full px-3.5 py-2.5 border rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-primary-container bg-white font-medium"
                />
              </div>

              <div className="w-full md:w-48">
                <select
                  value={toyBranch}
                  onChange={(e) => setToyBranch(e.target.value)}
                  className="w-full px-3.5 py-2.5 border rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-primary-container font-semibold"
                >
                  <option value="전체">전체 지점</option>
                  <option value="동탄본부">동탄본부</option>
                  <option value="봉담분소">봉담분소</option>
                </select>
              </div>
            </div>

            <div className="space-y-2 max-h-60 overflow-y-auto pr-1 no-scrollbar">
              {filteredToys.length > 0 ? (
                filteredToys.map((toy) => (
                  <div
                    key={toy.id}
                    className="flex flex-col md:flex-row items-start md:items-center justify-between p-3.5 border rounded-lg bg-white "
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-3xl bg-stone-100 p-2.5 rounded-lg">{toy.image}</span>
                      <div>
                        <h4 className="text-sm sm:text-base font-extrabold text-stone-800">{toy.name}</h4>
                        <div className="flex flex-wrap gap-2 mt-1">
                          <span className="text-[10px] sm:text-xs uppercase font-bold text-primary bg-orange-50 px-2.5 py-0.5 rounded">
                            {toy.branch}
                          </span>
                          <span className="text-[10px] sm:text-xs text-stone-500 px-2.5 py-0.5 rounded bg-stone-100 font-bold">
                            대상: {toy.age}
                          </span>
                          <span className="text-[10px] sm:text-xs bg-sky-50 text-sky-700 px-2.5 py-0.5 rounded font-bold">
                            분류: {toy.limit}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="mt-3 md:mt-0 w-full md:w-auto">
                      {toy.state === "대여가능" ? (
                        <button
                          type="button"
                          onClick={() => handleRentToy(toy.id, toy.name)}
                          className="w-full md:w-auto px-5 py-2 bg-secondary-container hover:bg-yellow-400 text-stone-800 text-sm font-black rounded-lg transition-all cursor-pointer"
                        >
                          대여 예약
                        </button>
                      ) : (
                        <button
                          disabled
                          className="w-full md:w-auto px-5 py-2 bg-stone-100 text-stone-400 text-sm font-bold rounded-lg cursor-not-allowed"
                        >
                          대여중 (일부 예약대기)
                        </button>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-stone-500 text-sm">
                  해당 조건에 맞는 대여 장난감이 없습니다.
                </div>
              )}
            </div>

            <div className="pt-2">
              <button
                type="button"
                onClick={onClose}
                className="w-full py-3 border rounded-xl text-stone-600 hover:bg-stone-50 font-black transition-all text-sm sm:text-base cursor-pointer"
              >
                닫기
              </button>
            </div>
          </div>
        );

      case "놀이체험실":
        return (
          <form onSubmit={handlePlaySubmit} className="space-y-4">
            <div className="flex items-center gap-2 text-blue-600 pb-2 border-b border-blue-100">
              <Sparkles className="w-6 h-6 text-indigo-500 animate-spin" />
              <h3 className="text-xl font-bold font-sans text-stone-800">놀이체험실 상상놀이터 예약</h3>
            </div>
            <p className="text-sm text-stone-600 leading-relaxed bg-blue-50/50 p-4 rounded-xl font-semibold">
              영유아 발달 수준에 최적화된 테마 감각 체험형 실내 오감 키즈그라운드를 이용하실 수 있습니다. 이용 쾌적성 확보를 위해 일일 3회기 시간제 정원 예약제로 운영됩니다.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold text-stone-700 mb-1">방문 희망일 <span className="text-red-500">*</span></label>
                <input
                  type="date"
                  required
                  min="2026-05-22"
                  value={playDate}
                  onChange={(e) => setPlayDate(e.target.value)}
                  className="w-full px-3.5 py-2.5 border rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-primary-container font-semibold"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-stone-700 mb-1">회기선택 (운영 교실 시간) <span className="text-red-500">*</span></label>
                <select
                  value={playSession}
                  onChange={(e) => setPlaySession(e.target.value)}
                  className="w-full px-3.5 py-2.5 border rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-primary-container font-semibold"
                >
                  <option value="1회기 (10:00~12:00)">1회기 (10:00 ~ 12:00)</option>
                  <option value="2회기 (13:00~15:00)">2회기 (13:00 ~ 15:00)</option>
                  <option value="3회기 (15:30~17:30)">3회기 (15:30 ~ 17:30)</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold text-stone-700 mb-1">입장 영유아 인원 (명) <span className="text-red-500">*</span></label>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setChildCount(Math.max(1, childCount - 1))}
                    className="w-10 h-10 rounded border flex items-center justify-center font-black font-mono hover:bg-stone-100 text-lg cursor-pointer"
                  >
                    -
                  </button>
                  <span className="flex-1 text-center font-black text-stone-800 text-lg">{childCount}</span>
                  <button
                    type="button"
                    onClick={() => setChildCount(Math.min(4, childCount + 1))}
                    className="w-10 h-10 rounded border flex items-center justify-center font-black font-mono hover:bg-stone-100 text-lg cursor-pointer"
                  >
                    +
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-stone-700 mb-1">입장 보호자 인원 (명) <span className="text-red-500">*</span></label>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setAdultCount(Math.max(1, adultCount - 1))}
                    className="w-10 h-10 rounded border flex items-center justify-center font-black font-mono hover:bg-stone-100 text-lg cursor-pointer"
                  >
                    -
                  </button>
                  <span className="flex-1 text-center font-black text-stone-800 text-lg">{adultCount}</span>
                  <button
                    type="button"
                    onClick={() => setAdultCount(Math.min(3, adultCount + 1))}
                    className="w-10 h-10 rounded border flex items-center justify-center font-black font-mono hover:bg-stone-100 text-lg cursor-pointer"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold text-stone-700 mb-1">신청자/보호자 이름 <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  required
                  placeholder="예: 홍길동"
                  value={playParentName}
                  onChange={(e) => setPlayParentName(e.target.value)}
                  className="w-full px-3.5 py-2.5 border rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-primary-container font-medium"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-stone-700 mb-1">보유 연락처 <span className="text-red-500">*</span></label>
                <input
                  type="tel"
                  required
                  placeholder="예: 010-1234-5678"
                  value={playPhone}
                  onChange={(e) => setPlayPhone(e.target.value)}
                  className="w-full px-3.5 py-2.5 border rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-primary-container font-medium"
                />
              </div>
            </div>

            <div className="flex gap-4 pt-4 border-t border-stone-100">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 py-3 border rounded-xl text-stone-600 hover:bg-stone-50 font-black transition-all text-sm sm:text-base cursor-pointer"
              >
                닫기
              </button>
              <button
                type="submit"
                className="flex-1 py-3 bg-primary text-white font-black rounded-xl shadow-lg shadow-orange-700/10 hover:opacity-90 transition-all text-sm sm:text-base cursor-pointer"
              >
                체험 정원 예약 확정
              </button>
            </div>
          </form>
        );

      case "상담신청":
        return (
          <form onSubmit={handleCounselSubmit} className="space-y-4">
            <div className="flex items-center gap-2 text-rose-600 pb-2 border-b border-rose-100">
              <Heart className="w-6 h-6 text-rose-500 animate-pulse" />
              <h3 className="text-xl font-bold font-sans text-stone-800">1:1 맞춤형 종합 육아 상담소</h3>
            </div>
            <p className="text-sm text-stone-600 leading-relaxed bg-rose-50/50 p-4 rounded-xl font-semibold">
              자녀의 인성, 성격 기질 유형 분석 및 자녀와의 의사소통 장애, 부모 우울, 부부 정서 진단 등의 문제를 센터 전문 보육상담 연구원이 마음 정서 치유를 무료 진단합니다.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold text-stone-700 mb-1">상담 상담자 대상 <span className="text-red-500">*</span></label>
                <div className="flex gap-2">
                  {(["영아부모", "유아부모", "보육교직원"] as const).map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setCounselTarget(t)}
                      className={`flex-1 py-2 rounded-lg border transition-all text-sm font-black cursor-pointer ${
                        counselTarget === t
                          ? "bg-rose-500 border-rose-500 text-white"
                          : "bg-white border-stone-200 text-stone-700 hover:bg-stone-50"
                      }`}
                    >
                      {t === "영아부모" ? "영아(0-2세)" : t === "유아부모" ? "유아(3-5세)" : "교직원"}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-stone-700 mb-1">상담 주제 분야 <span className="text-red-500">*</span></label>
                <select
                  value={counselType}
                  onChange={(e) => setCounselType(e.target.value as any)}
                  className="w-full px-3.5 py-2.5 border rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-rose-500 font-semibold"
                >
                  <option value="양육상담">양육상담 (상호작용, 훈육 지도)</option>
                  <option value="발달상담">발달상담 (언어 지연, 기질 행동)</option>
                  <option value="심리치료">심리치료 (정서 불안, 스트레스 치유)</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold text-stone-700 mb-1">신청자 성명 <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  required
                  placeholder="예: 홍길동"
                  value={counselorName}
                  onChange={(e) => setCounselorName(e.target.value)}
                  className="w-full px-3.5 py-2.5 border rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-rose-500 font-medium"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-stone-700 mb-1">자녀 생년월일 (및 월령) <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  required
                  placeholder="예: 2024년 2월생 (27개월)"
                  value={counselChildInfo}
                  onChange={(e) => setCounselChildInfo(e.target.value)}
                  className="w-full px-3.5 py-2.5 border rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-rose-500 font-medium"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold text-stone-700 mb-1">안내 수령 연락처 <span className="text-red-500">*</span></label>
                <input
                  type="tel"
                  required
                  placeholder="예: 010-1234-5678"
                  value={counselPhone}
                  onChange={(e) => setCounselPhone(e.target.value)}
                  className="w-full px-3.5 py-2.5 border rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-rose-500 font-medium"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-stone-700 mb-1">희망 1차 상담일 <span className="text-red-500">*</span></label>
                <input
                  type="date"
                  required
                  min="2026-05-22"
                  value={counselDate}
                  onChange={(e) => setCounselDate(e.target.value)}
                  className="w-full px-3.5 py-2.5 border rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-rose-500 font-semibold"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-stone-700 mb-1">고민되는 상담 사유 요약 (세부 기재) <span className="text-red-500">*</span></label>
              <textarea
                required
                rows={3}
                placeholder="상담을 신청하시게 된 원인이나 자녀의 주요 발달 특징, 고민사항을 자유롭게 요약 설명해 주세요."
                value={counselDesc}
                onChange={(e) => setCounselDesc(e.target.value)}
                className="w-full px-3.5 py-2.5 border rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-rose-500 bg-white font-medium"
              ></textarea>
            </div>

            <div className="flex gap-4 pt-4 border-t border-stone-100">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 py-3 border rounded-xl text-stone-600 hover:bg-stone-50 font-black transition-all text-sm sm:text-base cursor-pointer"
              >
                닫기
              </button>
              <button
                type="submit"
                className="flex-1 py-3 bg-rose-500 text-white font-black rounded-xl shadow-lg shadow-rose-700/10 hover:opacity-90 transition-all text-sm sm:text-base cursor-pointer"
              >
                전문 상담 신청하기
              </button>
            </div>
          </form>
        );

      case "부모교육":
        return (
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-indigo-700 pb-2 border-b border-indigo-100">
              <span className="text-xl font-bold font-sans text-stone-800">부모 교육 및 프로그램 연수 신청</span>
            </div>
            <p className="text-sm text-stone-600 leading-relaxed">
              화성시육아종합지원센터에서는 매월 유익한 양육 전문 명사 초청 세미나, 집체 교육 프로그램을 기획 운영하고 있습니다.
            </p>
            <div className="bg-indigo-50 p-4 rounded-xl border border-indigo-100">
              <h4 className="text-sm font-bold text-indigo-950 mb-1">📢 모집 예정 최신 부모 교육</h4>
              <p className="text-xs text-indigo-900 leading-relaxed">
                <strong>[영아기 발달의 이해]</strong><br />
                - 일시: 2024년 5월 27일 (월) 10:00<br />
                - 정원: 선착순 30명<br />
                - 아래 행사/교육 일정 달력의 일정을 클릭하시면, 바로 신청 페이지로 전환하여 간편 예약이 가능합니다.
              </p>
            </div>
            <button
              onClick={onClose}
              className="w-full py-2.5 bg-indigo-600 text-white text-xs font-bold rounded-lg hover:bg-indigo-700 transition"
            >
              상세 일정 달력에서 보기
            </button>
          </div>
        );

      case "어린이집컨설팅":
        return (
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-emerald-700 pb-2 border-b border-emerald-100">
              <span className="text-xl font-bold font-sans text-stone-800">어린이집 정밀 현장 컨설팅 지원</span>
            </div>
            <p className="text-sm text-stone-600 leading-relaxed">
              관내 영유아보육시설 및 신규 개원 예정 어린이집을 대상으로 평가인증 제도의 안정적 안착, 무장애 장애아 통합 환경 점검, 보육 재무회계 규칙 지원 등 전문가 컨설팅 매칭 서비스를 시행합니다.
            </p>
            <div className="bg-emerald-50 p-4 rounded-xl text-xs text-stone-700 space-y-2 border border-emerald-100">
              <p>📍 <strong>정기 현장 평가 자문단</strong>: 연중 수시 모집 및 파견</p>
              <p>📞 <strong>상담 및 배정 접수 문의</strong>: 031-123-4567 (내선 어린이집 지원과 2번)</p>
            </div>
            <button
              onClick={() => {
                onSuccess("어린이집 전담 컨설팅 지원 안내 자료 우편 요청이 완료에 가등록 되었습니다. 담당자가 검토 후 연락드립니다.");
                onClose();
              }}
              className="w-full py-2.5 bg-emerald-600 text-white text-xs font-bold rounded-lg hover:bg-emerald-700"
            >
              컨설팅 세부 가이드북 신청하기
            </button>
          </div>
        );

      case "구인구직":
        return (
          <div className="space-y-4 animate-fadeIn">
            <div className="flex items-center gap-2 text-slate-700 pb-2 border-b border-stone-200">
              <span className="text-xl font-bold font-sans text-stone-800">보육교사 및 구인구직 취업 지원실</span>
            </div>
            <p className="text-sm text-stone-600">
              화성시 관내 어린이집들의 정규 보육교사, 연장반 교사, 대체교사, 조리사 등 일자리 구인 및 구직 매칭 정보망을 제공합니다.
            </p>
            <div className="divide-y space-y-2 max-h-48 overflow-y-auto pr-1 no-scrollbar text-xs text-stone-700">
              <div className="py-2 flex justify-between items-center">
                <span>[구인] 신동 시립 어린이집 - 연장보육 전담교사 채용</span>
                <span className="text-primary font-bold">~ 05.29 만료</span>
              </div>
              <div className="py-2 flex justify-between items-center">
                <span>[구인] 동탄숲누리 어린이집 - 만 1세반 담임 교사 추가 충원</span>
                <span className="text-primary font-bold">~ 05.31 만료</span>
              </div>
              <div className="py-2 flex justify-between items-center">
                <span>[구인] 삼미 누리어린이집 - 토요일 대체교사 지원</span>
                <span className="text-stone-400">마감완료</span>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-full py-2.5 bg-stone-700 text-white text-xs font-bold rounded-lg"
            >
              구인 구직 세부 페이지 열기
            </button>
          </div>
        );

      case "서식자료실":
        return (
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-teal-700 pb-2 border-b border-teal-100">
              <span className="text-xl font-bold font-sans text-stone-800">센터 이용 및 보육 서식 자료실</span>
            </div>
            <p className="text-sm text-stone-600 leading-relaxed">
              시간제보육 동의서, 영유아 건강진단서 대체증명 양식, 장난감 도서관 개인정보 활용 양식 등 원활한 센터 서비스 전반 접수 신청용 양식을 바로 다운로드 하실 수 있습니다.
            </p>
            <div className="grid grid-cols-1 gap-2 text-xs">
              <button
                type="button"
                onClick={() => onSuccess("📥 '장난감도서관 가입용 위임장 서식.pdf' 가상 다운로드 완료")}
                className="p-3 border rounded-lg hover:bg-stone-50 text-left flex justify-between items-center bg-white"
              >
                <span>📄 [PDF] 장난감도서관 가입 제출 위임장 양식</span>
                <span className="text-teal-600 font-bold hover:underline font-mono">Download</span>
              </button>
              <button
                type="button"
                onClick={() => onSuccess("📥 '시간제보육 이용 동의서 및 아동조사서.hwp' 가상 다운로드 완료")}
                className="p-3 border rounded-lg hover:bg-stone-50 text-left flex justify-between items-center bg-white"
              >
                <span>📄 [HWP] 시간제보육 아동사전 관찰 및 이용 동의서</span>
                <span className="text-teal-600 font-bold hover:underline font-mono">Download</span>
              </button>
            </div>
            <button
              onClick={onClose}
              className="w-full py-2.5 border rounded-lg text-stone-600 text-xs font-bold hover:bg-stone-50"
            >
              닫기
            </button>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-stone-950/40 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Card */}
      <div className="relative bg-white rounded-3xl shadow-2xl max-w-2xl w-full p-6 md:p-8 overflow-hidden animate-in fade-in zoom-in duration-200">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-stone-100 text-stone-500 hover:text-stone-700 transition-colors"
          aria-label="닫기"
        >
          <X className="w-5 h-5" />
        </button>

        {renderModalContent()}
      </div>
    </div>
  );
}
