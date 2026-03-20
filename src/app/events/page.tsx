"use client";

import { useState } from "react";
import Link from "next/link";
import { Calendar, MapPin, Users, ChevronRight, Camera, BookOpen, Image, Clock, Check, ArrowRight } from "lucide-react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { ScrollReveal } from "@/components/scroll-reveal";

/* ===== DATA ===== */
type Category = "全部" | "外拍" | "课程" | "影展";

interface Event {
  id: number;
  title: string;
  category: "外拍" | "课程" | "影展";
  date: string;
  time: string;
  location: string;
  cover: string;
  description: string;
  spots: number;
  registered: number;
  status: "upcoming" | "ongoing" | "past";
}

const events: Event[] = [
  {
    id: 1,
    title: "城市夜景外拍",
    category: "外拍",
    date: "2026-03-28",
    time: "18:30 - 22:00",
    location: "上海 · 陆家嘴",
    cover: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=600&q=80",
    description: "陆家嘴三件套夜景拍摄，学习长曝光与光轨技巧。带上你的三脚架和广角镜头，我们会在天桥和滨江步道取景。",
    spots: 20,
    registered: 14,
    status: "upcoming",
  },
  {
    id: 2,
    title: "人像摄影工作坊",
    category: "课程",
    date: "2026-04-05",
    time: "14:00 - 17:00",
    location: "线上 · 腾讯会议",
    cover: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&q=80",
    description: "室内布光基础 & 后期调色分享，适合新手入门。会邀请专业人像摄影师讲解不同布光方式的适用场景。",
    spots: 50,
    registered: 28,
    status: "upcoming",
  },
  {
    id: 3,
    title: "「春」主题线上影展",
    category: "影展",
    date: "2026-04-12",
    time: "全天",
    location: "线上 · 摄影社网站",
    cover: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=600&q=80",
    description: "以「春天」为主题，每人提交 3-5 张作品，线上投票评选最佳作品。前三名获得协会定制相机肩带。",
    spots: 100,
    registered: 45,
    status: "upcoming",
  },
  {
    id: 4,
    title: "崇明岛生态摄影",
    category: "外拍",
    date: "2026-04-19",
    time: "06:00 - 18:00（次日）",
    location: "上海 · 崇明岛东滩",
    cover: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=600&q=80",
    description: "两天一夜崇明岛湿地生态摄影之旅，拍摄候鸟、日出和湿地风光。含交通与住宿，名额有限先到先得。",
    spots: 12,
    registered: 12,
    status: "upcoming",
  },
  {
    id: 5,
    title: "手机摄影技巧分享",
    category: "课程",
    date: "2026-04-26",
    time: "19:30 - 21:00",
    location: "线上 · 腾讯会议",
    cover: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80",
    description: "不需要专业设备也能拍出好照片！分享手机构图、光线利用、后期 App 推荐等实用技巧。",
    spots: 80,
    registered: 52,
    status: "upcoming",
  },
  // Past events
  {
    id: 6,
    title: "新年第一拍 · 外滩日出",
    category: "外拍",
    date: "2026-01-01",
    time: "05:30 - 08:00",
    location: "上海 · 外滩",
    cover: "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?w=600&q=80",
    description: "2026年的第一缕阳光，在外滩用相机记录新年的第一刻。",
    spots: 25,
    registered: 25,
    status: "past",
  },
  {
    id: 7,
    title: "Lightroom 后期入门",
    category: "课程",
    date: "2026-01-18",
    time: "14:00 - 16:30",
    location: "线下 · 管院教室",
    cover: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=600&q=80",
    description: "从零开始学 Lightroom，包含导入、调色、预设管理和导出全流程。",
    spots: 30,
    registered: 30,
    status: "past",
  },
  {
    id: 8,
    title: "「冬」主题线上影展",
    category: "影展",
    date: "2026-02-15",
    time: "全天",
    location: "线上 · 摄影社网站",
    cover: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80",
    description: "冬季主题影展，最佳作品获得协会定制摄影包。",
    spots: 100,
    registered: 67,
    status: "past",
  },
];

const categoryIcons = {
  外拍: Camera,
  课程: BookOpen,
  影展: Image,
};

/* ===== CATEGORY PILL ===== */
function CategoryPill({ cat, active, onClick }: { cat: Category; active: boolean; onClick: () => void }) {
  const Icon = cat !== "全部" ? categoryIcons[cat] : null;
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-[0.78rem] font-medium tracking-[0.04em] transition-all border ${
        active
          ? "bg-gold text-[#08080c] border-gold"
          : "bg-[#0e0e14] text-[#7a7874] border-white/[0.06] hover:border-white/[0.12] hover:text-foreground"
      }`}
    >
      {Icon && <Icon className="w-3.5 h-3.5" />}
      {cat}
    </button>
  );
}

/* ===== EVENT CARD ===== */
function EventCard({ event, delay }: { event: Event; delay: number }) {
  const [registered, setRegistered] = useState(false);
  const isFull = event.registered >= event.spots;
  const isPast = event.status === "past";
  const progress = Math.round((event.registered / event.spots) * 100);

  return (
    <ScrollReveal delay={delay}>
      <div className={`group rounded-xl border overflow-hidden transition-all duration-300 bg-[#0e0e14] ${
        isPast ? "border-white/[0.03] opacity-80 hover:opacity-100" : "border-white/[0.06] hover:border-gold/20 hover:-translate-y-1 hover:shadow-[0_16px_48px_rgba(0,0,0,0.3)]"
      }`}>
        {/* Cover */}
        <div className="relative h-[clamp(12rem,18vw,16rem)] overflow-hidden">
          <img
            src={event.cover}
            alt={event.title}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-[800ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#08080c]/80 via-[#08080c]/20 to-transparent" />

          {/* Category Badge */}
          <div className="absolute top-4 left-4">
            <span className={`text-[0.65rem] font-medium tracking-wider uppercase px-2.5 py-1 rounded ${
              event.category === "外拍" ? "bg-emerald-500/15 text-emerald-400" :
              event.category === "课程" ? "bg-blue-500/15 text-blue-400" :
              "bg-purple-500/15 text-purple-400"
            }`}>
              {event.category}
            </span>
          </div>

          {/* Status Badge */}
          {isPast && (
            <div className="absolute top-4 right-4">
              <span className="text-[0.65rem] font-medium tracking-wider uppercase px-2.5 py-1 rounded bg-white/10 text-white/50">
                已结束
              </span>
            </div>
          )}
          {isFull && !isPast && (
            <div className="absolute top-4 right-4">
              <span className="text-[0.65rem] font-medium tracking-wider uppercase px-2.5 py-1 rounded bg-red-500/15 text-red-400">
                已满员
              </span>
            </div>
          )}

          {/* Date overlay */}
          <div className="absolute bottom-4 left-4 flex items-baseline gap-2">
            <span className="font-serif text-[2rem] font-bold text-white leading-none">
              {event.date.split("-")[2]}
            </span>
            <span className="text-[0.72rem] text-white/60 tracking-wider">
              {new Date(event.date).toLocaleDateString("zh-CN", { year: "numeric", month: "long" })}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-5">
          <h3 className="font-serif text-[1.1rem] font-semibold mb-2 group-hover:text-gold transition-colors">
            {event.title}
          </h3>
          <p className="text-[0.82rem] text-[#7a7874] leading-relaxed mb-4 line-clamp-2">
            {event.description}
          </p>

          {/* Meta */}
          <div className="flex flex-col gap-2 mb-5">
            <div className="flex items-center gap-2 text-[0.75rem] text-[#5a5855]">
              <Clock className="w-3.5 h-3.5 shrink-0" />
              <span>{event.date} · {event.time}</span>
            </div>
            <div className="flex items-center gap-2 text-[0.75rem] text-[#5a5855]">
              <MapPin className="w-3.5 h-3.5 shrink-0" />
              <span>{event.location}</span>
            </div>
          </div>

          {/* Spots Progress */}
          {!isPast && (
            <div className="mb-4">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[0.72rem] text-[#5a5855]">
                  <Users className="w-3.5 h-3.5 inline mr-1 -mt-0.5" />
                  {event.registered}/{event.spots} 人已报名
                </span>
                <span className="text-[0.68rem] text-[#4a4845]">{progress}%</span>
              </div>
              <div className="h-1.5 bg-white/[0.06] rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${
                    progress >= 90 ? "bg-red-500/70" : progress >= 60 ? "bg-gold/70" : "bg-gold/40"
                  }`}
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          )}

          {/* Action */}
          {isPast ? (
            <button className="w-full h-10 rounded-md border border-white/[0.06] text-[#5a5855] text-[0.8rem] font-medium hover:border-white/[0.12] hover:text-[#7a7874] transition-all flex items-center justify-center gap-2">
              <Image className="w-4 h-4" />
              查看作品
            </button>
          ) : registered ? (
            <button className="w-full h-10 rounded-md bg-gold/10 text-gold text-[0.8rem] font-medium flex items-center justify-center gap-2 cursor-default">
              <Check className="w-4 h-4" />
              已报名
            </button>
          ) : isFull ? (
            <button className="w-full h-10 rounded-md border border-white/[0.06] text-[#5a5855] text-[0.8rem] font-medium cursor-not-allowed" disabled>
              名额已满
            </button>
          ) : (
            <button
              onClick={() => setRegistered(true)}
              className="w-full h-10 rounded-md bg-gold text-[#08080c] text-[0.82rem] font-semibold hover:bg-[#d4b87a] transition-all flex items-center justify-center gap-2"
            >
              <ArrowRight className="w-4 h-4" />
              立即报名
            </button>
          )}
        </div>
      </div>
    </ScrollReveal>
  );
}

/* ===== PAGE ===== */
export default function EventsPage() {
  const [category, setCategory] = useState<Category>("全部");

  const upcoming = events.filter((e) => e.status !== "past");
  const past = events.filter((e) => e.status === "past");

  const filteredUpcoming = category === "全部" ? upcoming : upcoming.filter((e) => e.category === category);
  const filteredPast = category === "全部" ? past : past.filter((e) => e.category === category);

  return (
    <>
      <Navbar />
      <main className="flex-1">
        {/* Header */}
        <section className="pt-[clamp(9rem,14vh,12rem)] pb-6 px-[clamp(1.5rem,4vw,4rem)]">
          <span className="block text-[0.72rem] font-medium tracking-[0.2em] uppercase text-gold mb-3">Activities</span>
          <h1 className="font-serif text-[clamp(2rem,4vw,3rem)] font-bold leading-tight mb-2">协会活动</h1>
          <p className="text-[#7a7874] text-[0.9rem]">外拍、讲座、影展，总有适合你的活动。</p>
        </section>

        <div className="px-[clamp(1.5rem,4vw,4rem)] pb-[clamp(4rem,8vh,6rem)]">
          {/* Category Filter */}
          <div className="flex gap-2 flex-wrap mb-[clamp(2rem,4vh,3rem)]">
            {(["全部", "外拍", "课程", "影展"] as Category[]).map((cat) => (
              <CategoryPill key={cat} cat={cat} active={category === cat} onClick={() => setCategory(cat)} />
            ))}
          </div>

          {/* Upcoming */}
          {filteredUpcoming.length > 0 && (
            <section className="mb-[clamp(3rem,6vh,5rem)]">
              <div className="flex items-center gap-2 mb-6">
                <Calendar className="w-5 h-5 text-gold" />
                <h2 className="font-serif text-[1.2rem] font-semibold">即将举行</h2>
                <span className="text-[0.72rem] text-[#4a4845] ml-1">{filteredUpcoming.length} 场</span>
              </div>
              <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-5">
                {filteredUpcoming.map((e, i) => (
                  <EventCard key={e.id} event={e} delay={i * 60} />
                ))}
              </div>
            </section>
          )}

          {/* Past */}
          {filteredPast.length > 0 && (
            <section>
              <div className="flex items-center gap-2 mb-6">
                <Clock className="w-5 h-5 text-[#4a4845]" />
                <h2 className="font-serif text-[1.2rem] font-semibold">往期活动</h2>
                <span className="text-[0.72rem] text-[#4a4845] ml-1">{filteredPast.length} 场</span>
              </div>
              <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-5">
                {filteredPast.map((e, i) => (
                  <EventCard key={e.id} event={e} delay={i * 60} />
                ))}
              </div>
            </section>
          )}

          {/* Empty state */}
          {filteredUpcoming.length === 0 && filteredPast.length === 0 && (
            <div className="text-center py-16">
              <Calendar className="w-10 h-10 text-[#2a2a3e] mx-auto mb-3" />
              <p className="text-[#4a4845] text-[0.9rem]">暂无{category}类活动</p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
