"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Heart, MessageCircle, Eye, SlidersHorizontal } from "lucide-react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { ScrollReveal } from "@/components/scroll-reveal";
import { Lightbox } from "@/components/lightbox";

interface Work {
  id: number;
  src: string;
  fullSrc: string;
  title: string;
  author: string;
  authorEmoji: string;
  likes: number;
  comments: number;
  views: number;
  tags: string[];
  camera: string;
  date: string;
  height: number;
}

const works: Work[] = [
  { id: 1, src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80", fullSrc: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1600&q=90", title: "阿尔卑斯之巅", author: "傅永康", authorEmoji: "📷", likes: 234, comments: 18, views: 1203, tags: ["风光", "山脉"], camera: "Sony A7R V · 24mm f/2.8", date: "2026-03-15", height: 400 },
  { id: 2, src: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600&q=80", fullSrc: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=1600&q=90", title: "午后光影", author: "李灿灿", authorEmoji: "🌟", likes: 189, comments: 12, views: 876, tags: ["人像", "光影"], camera: "Canon R5 · 85mm f/1.4", date: "2026-03-12", height: 300 },
  { id: 3, src: "https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=600&q=80", fullSrc: "https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=1600&q=90", title: "静谧海岸线", author: "吴冬阳", authorEmoji: "📷", likes: 312, comments: 24, views: 1567, tags: ["风光", "海洋"], camera: "Nikon Z8 · 14mm f/2.8", date: "2026-03-10", height: 280 },
  { id: 4, src: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=600&q=80", fullSrc: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=1600&q=90", title: "晨雾森林", author: "陈庆发", authorEmoji: "📸", likes: 456, comments: 35, views: 2341, tags: ["风光", "森林", "雾"], camera: "Fuji X-T5 · 16mm f/1.4", date: "2026-03-08", height: 420 },
  { id: 5, src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80", fullSrc: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1600&q=90", title: "城市剪影", author: "梁志强", authorEmoji: "🎞️", likes: 167, comments: 9, views: 678, tags: ["街拍", "城市"], camera: "Leica Q3 · 28mm f/1.7", date: "2026-03-05", height: 280 },
  { id: 6, src: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=600&q=80", fullSrc: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=1600&q=90", title: "金色麦田", author: "刘轶", authorEmoji: "✨", likes: 389, comments: 28, views: 1890, tags: ["风光", "乡村"], camera: "Sony A7C II · 35mm f/1.4", date: "2026-03-01", height: 350 },
  { id: 7, src: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=600&q=80", fullSrc: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1600&q=90", title: "星空下的山", author: "傅永康", authorEmoji: "📷", likes: 567, comments: 42, views: 3210, tags: ["风光", "星空", "山脉"], camera: "Sony A7R V · 14mm f/1.8", date: "2026-02-28", height: 320 },
  { id: 8, src: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&q=80", fullSrc: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=1600&q=90", title: "人像 · 晨光", author: "李灿灿", authorEmoji: "🌟", likes: 298, comments: 21, views: 1456, tags: ["人像", "光影"], camera: "Canon R5 · 50mm f/1.2", date: "2026-02-25", height: 380 },
  { id: 9, src: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=600&q=80", fullSrc: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=1600&q=90", title: "城市脉搏", author: "干珺", authorEmoji: "🐶", likes: 234, comments: 16, views: 1120, tags: ["街拍", "城市", "夜景"], camera: "Sony A7 IV · 35mm f/1.4", date: "2026-02-22", height: 300 },
  { id: 10, src: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=600&q=80", fullSrc: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=1600&q=90", title: "热带黄昏", author: "艾建勋", authorEmoji: "🏔️", likes: 445, comments: 33, views: 2100, tags: ["风光", "海洋", "日落"], camera: "Fuji X-T5 · 23mm f/1.4", date: "2026-02-20", height: 350 },
  { id: 11, src: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=600&q=80", fullSrc: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1600&q=90", title: "层峦叠嶂", author: "吴冬阳", authorEmoji: "📷", likes: 378, comments: 29, views: 1890, tags: ["风光", "山脉"], camera: "Nikon Z8 · 24-70mm f/2.8", date: "2026-02-18", height: 400 },
  { id: 12, src: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=600&q=80", fullSrc: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1600&q=90", title: "林间光影", author: "陈庆发", authorEmoji: "📸", likes: 267, comments: 19, views: 1345, tags: ["风光", "森林", "光影"], camera: "Canon R6 II · 70-200mm f/2.8", date: "2026-02-15", height: 320 },
  { id: 13, src: "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?w=600&q=80", fullSrc: "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?w=1600&q=90", title: "湖光山色", author: "梁志强", authorEmoji: "🎞️", likes: 412, comments: 31, views: 2056, tags: ["风光", "湖", "山脉"], camera: "Leica SL3 · 24-90mm f/2.8", date: "2026-02-12", height: 360 },
  { id: 14, src: "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=600&q=80", fullSrc: "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=1600&q=90", title: "胶片人像", author: "刘轶", authorEmoji: "✨", likes: 356, comments: 27, views: 1678, tags: ["人像", "胶片"], camera: "Contax T2 · 38mm f/2.8", date: "2026-02-10", height: 380 },
  { id: 15, src: "https://images.unsplash.com/photo-1495616811223-4d98c6e9c869?w=600&q=80", fullSrc: "https://images.unsplash.com/photo-1495616811223-4d98c6e9c869?w=1600&q=90", title: "街道故事", author: "干珺", authorEmoji: "🐶", likes: 198, comments: 14, views: 923, tags: ["街拍", "城市"], camera: "Ricoh GR III · 28mm f/2.8", date: "2026-02-08", height: 280 },
];

const allTags = Array.from(new Set(works.flatMap((w) => w.tags)));
type SortBy = "newest" | "popular" | "discussed";

function GalleryCard({ work, delay }: { work: Work; delay: number }) {
  return (
    <ScrollReveal delay={delay} className="break-inside-avoid mb-4">
      <Link href={`/works/${work.id}`}>
        <div data-lightbox={work.fullSrc} className="relative rounded-md overflow-hidden cursor-pointer group bg-[#0e0e14]">
        <img src={work.src} alt={work.title} loading="lazy" className="w-full object-cover transition-transform duration-[800ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04] group-hover:brightness-110" style={{ minHeight: work.height }} />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-1 group-hover:translate-y-0">
          <span className="text-[0.65rem] tracking-wider text-white/60 bg-black/50 backdrop-blur-sm px-2 py-1 rounded">{work.camera}</span>
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
          <div className="flex gap-1.5 mb-2 flex-wrap">
            {work.tags.map((tag) => (
              <span key={tag} className="text-[0.62rem] tracking-wider uppercase bg-[rgba(201,169,110,0.2)] text-[#c9a96e] px-1.5 py-0.5 rounded">#{tag}</span>
            ))}
          </div>
          <h3 className="font-serif text-[1rem] font-semibold mb-1.5 text-white">{work.title}</h3>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-[22px] h-[22px] rounded-full bg-[rgba(201,169,110,0.12)] flex items-center justify-center text-[0.55rem] text-[#c9a96e]">{work.authorEmoji}</span>
              <span className="text-[0.75rem] text-[#7a7874]">{work.author}</span>
            </div>
            <div className="flex gap-3 text-[0.7rem] text-[#5a5855]">
              <span className="flex items-center gap-1"><Heart className="w-3 h-3" /> {work.likes}</span>
              <span className="flex items-center gap-1"><MessageCircle className="w-3 h-3" /> {work.comments}</span>
              <span className="flex items-center gap-1"><Eye className="w-3 h-3" /> {work.views}</span>
            </div>
          </div>
        </div>
      </div>
      </Link>
    </ScrollReveal>
  );
}

export default function WorksPage() {
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<SortBy>("newest");

  const filteredWorks = useMemo(() => {
    let filtered = activeTag ? works.filter((w) => w.tags.includes(activeTag)) : [...works];
    switch (sortBy) {
      case "popular": filtered.sort((a, b) => b.likes - a.likes); break;
      case "discussed": filtered.sort((a, b) => b.comments - a.comments); break;
      default: filtered.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()); break;
    }
    return filtered;
  }, [activeTag, sortBy]);

  return (
    <>
      <Navbar />
      <main className="flex-1">
        <section className="pt-[clamp(7rem,10vh,9rem)] pb-8 px-[clamp(1.5rem,4vw,4rem)]">
          <ScrollReveal>
            <span className="block text-[0.72rem] font-medium tracking-[0.2em] uppercase text-gold mb-3">Gallery</span>
            <h1 className="font-serif text-[clamp(2.2rem,5vw,3.5rem)] font-bold leading-tight mb-3">作品长廊</h1>
            <p className="text-[#7a7874] text-[0.95rem] max-w-[500px] leading-relaxed">
              每一帧都是一个故事，每一次快门都值得被看见。<br />浏览理事会成员的精选摄影作品。
            </p>
          </ScrollReveal>
        </section>

        <section className="px-[clamp(1.5rem,4vw,4rem)] pb-6">
          <ScrollReveal>
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-2 flex-wrap">
                <SlidersHorizontal className="w-4 h-4 text-[#4a4845] mr-1" />
                <button onClick={() => setActiveTag(null)} className={`px-3 py-1.5 rounded text-[0.72rem] font-medium tracking-wider uppercase transition-all ${!activeTag ? "bg-gold text-[#08080c]" : "text-[#7a7874] hover:text-foreground bg-[#16161e] hover:bg-[#1a1a24]"}`}>全部</button>
                {allTags.map((tag) => (
                  <button key={tag} onClick={() => setActiveTag(activeTag === tag ? null : tag)} className={`px-3 py-1.5 rounded text-[0.72rem] font-medium tracking-wider uppercase transition-all ${activeTag === tag ? "bg-gold text-[#08080c]" : "text-[#7a7874] hover:text-foreground bg-[#16161e] hover:bg-[#1a1a24]"}`}>{tag}</button>
                ))}
              </div>
              <div className="flex items-center gap-1 text-[0.75rem]">
                {([ { key: "newest", label: "最新" }, { key: "popular", label: "最热" }, { key: "discussed", label: "热议" }] as const).map((s) => (
                  <button key={s.key} onClick={() => setSortBy(s.key)} className={`px-3 py-1.5 rounded transition-all ${sortBy === s.key ? "bg-[#1a1a24] text-foreground" : "text-[#4a4845] hover:text-[#7a7874]"}`}>{s.label}</button>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </section>

        <section className="px-[clamp(1.5rem,4vw,4rem)] pb-[clamp(4rem,8vh,6rem)]">
          <ScrollReveal>
            <p className="text-[0.75rem] text-[#4a4845] mb-6">
              共 {filteredWorks.length} 件作品{activeTag && <span> · 筛选: #{activeTag}</span>}
            </p>
          </ScrollReveal>
          <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4">
            {filteredWorks.map((work, i) => (
              <GalleryCard key={work.id} work={work} delay={i * 40} />
            ))}
          </div>
          {filteredWorks.length === 0 && (
            <div className="text-center py-20">
              <p className="text-[#4a4845] text-lg">没有找到匹配的作品</p>
              <button onClick={() => setActiveTag(null)} className="text-gold text-sm mt-3 hover:underline">清除筛选</button>
            </div>
          )}
        </section>
      </main>
      <Footer />
      <Lightbox />
    </>
  );
}
