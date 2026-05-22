/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Notice {
  id: number;
  category: "Important" | "Notice";
  title: string;
  content: string;
  date: string;
  views: number;
}

export interface CalendarEvent {
  id: number;
  title: string;
  category: "부모교육" | "행사" | "아이성장" | "어린이집지원";
  date: string; // YYYY.MM.DD or YYYY-MM-DD
  time: string;
  location: string;
  target: string;
  fee: string;
  capacity: number;
  registered: number;
  description: string;
  important?: boolean;
}

export interface GalleryNews {
  id: number;
  title: string;
  image: string;
  date: string;
  description: string;
  views: number;
}

export interface FAQ {
  id: number;
  question: string;
  answer: string;
  category: "센터이용" | "보육료/지원" | "장난감대여" | "기타";
}

export interface Complaint {
  id: number;
  author: string;
  title: string;
  content: string;
  category: "불편사항" | "건의사항" | "칭찬양해";
  date: string;
  status: "접수대기" | "처리중" | "답변완료";
  reply?: string;
}

export interface HourlySupportBooking {
  childName: string;
  childBirth: string;
  date: string;
  hours: number[]; // e.g. [10, 11, 13]
  careCenter: string;
  parentPhone: string;
}

export interface ToyRentalBooking {
  toyId: number;
  userId: string;
  rentalDate: string;
  returnDate: string;
}

export interface PlayroomBooking {
  date: string;
  session: "1회기 (10:00~12:00)" | "2회기 (13:00~15:00)" | "3회기 (15:30~17:30)";
  adultCount: number;
  childCount: number;
  parentName: string;
}

export interface CounselingBooking {
  target: "영아부모" | "유아부모" | "보육교직원";
  counselorType: "발달상담" | "양육상담" | "심리치료";
  parentName: string;
  childAge: string;
  preferredDate: string;
  preferredTime: string;
  message: string;
}
