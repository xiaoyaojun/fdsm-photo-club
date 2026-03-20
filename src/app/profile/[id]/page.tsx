"use client";

import { useState } from "react";
import Link from "next/link";
import { Heart, MessageCircle, Eye, Camera, MapPin, Calendar, Settings, Grid3X3, FolderHeart, Bookmark, ChevronRight } from "lucide-react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { ScrollReveal } from "@/components/scroll-reveal";
import { Lightbox } from "@/components/lightbox";

/* ===== DATA ===== */
const profile = {
  name: "傅永康",
  emoji: "📷",
  role: "会长",
  bio: "风光摄影爱好者，喜欢在凌晨四点的山巅等待第一缕光。相信最好的照片永远是下一张。",
  location: "上海",
  joinedAt: "2024年9月",
  equipment: ["Sony A7R V", "FE 14mm f/1.8 GM", "FE 24-70mm f/2.8 GM II", "FE 70-200mm f/2.8 GM II"],
  website: "https://fuyongkang.com",
  stats: { works: 89, likes: "2.3k", followers: 156, following: 42 },
  coverUrl: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1600&q=80",
};

const myWorks = [
  { id: 1, src: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=500&q=80", title: "星空下的富士山", likes: 567, comments: 42 },
  { id: 7, src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&q=80", title: "阿尔卑斯之巅", likes: 234, comments: 18 },
  { id: 20, src: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=500&q=80", title: "层峦叠嶂", likes: 378, comments: 29 },
  { id: 21, src: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=500&q=80", title: "热带黄昏", likes: 445, comments: 33 },
  { id: 22, src: "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?w=500&q=80", title: "湖光山色", likes: 412, comments: 31 },
  { id: 23, src: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=500&q=80", title: "晨雾森林", likes: 456, comments: 35 },
  { id: 24, src: "https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=500&q=80", title: "静谧海岸线", likes: 312, comments: 24 },
  { id: 25, src: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=500&q=80", title: "林间光影", likes: 267, comments: 19 },
  { id: 26, src: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=500&q=80", title: "金色麦田", likes: 389, comments: 28 },
  { id: 27, src: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=500&q=80", title: "城市脉搏", likes: 234, comments: 16 },
  { id: 28, src: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&q=80", title: "人像·晨光", likes: 298, comments: 21 },
  { id: 29, src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&q=80", title: "城市剪影", likes: 167, comments: 9 },
];

const collections = [
  { id: 1, name: "星空系列", cover: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=400&q=80", count: 12 },
  { id: 2, name: "山川湖海", cover: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&q=80", count: 28 },
  { id: 3, name: "城市印象", cover: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=400&q=80", count: 15 },
  { id: 4, name: "旅途碎片", cover: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=400&q=80", count: 22 },
];

type Tab = "works" | "collections" | "liked";

/* ===== STAT BLOCK ===== */
function StatBlock({ value, label }: { value: string | number; label: string }) {
  return (
    <div className="text-center">
      <div className="text-[1.3rem] font-serif font-bold text-foreground">{value}</div>
      <div className="text-[0.7rem] text-[#5a5855] mt-1 tracking-wider uppercase">{label}</div>
    </div>
  );
}

/* ===== PAGE ===== */
export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState<Tab>("works");
  const [isOwner] = useState(true); // mock: viewing own profile

  return (
    <>
      <Navbar />
      <main className="flex-1">
        {/* Cover */}
        <div className="relative h-[clamp(16rem,28vw,26rem)] overflow-hidden">
          <div
            className="absolute inset-0 ken-burns"
            style={{
              backgroundImage: `url('${profile.coverUrl}')`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#08080c]/40 via-transparent to-[#08080c]" />
        </div>

        {/* Profile Info */}
        <div className="relative px-[clamp(1.5rem,4vw,4rem)] -mt-[clamp(3rem,5vw,4.5rem)]">
          <div className="flex flex-col md:flex-row md:items-end gap-5">
            {/* Avatar */}
            <div className="w-[clamp(5rem,8vw,7rem)] h-[clamp(5rem,8vw,7rem)] rounded-full bg-gradient-to-br from-gold-dim to-[rgba(201,169,110,0.05)] flex items-center justify-center text-[2.5rem] border-4 border-[#08080c] shadow-[0_8px_32px_rgba(0,0,0,0.4)] shrink-0 -mt-[clamp(1.5rem,3vw,2.5rem)]">
              {profile.emoji}
            </div>

            {/* Name + Role + Actions */}
            <div className="flex-1 flex flex-col md:flex-row md:items-end md:justify-between gap-4 pb-4">
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <h1 className="font-serif text-[clamp(1.5rem,3vw,2rem)] font-bold">{profile.name}</h1>
                  <span className="text-[0.68rem] font-medium tracking-wider uppercase bg-gold-dim text-gold px-2 py-0.5 rounded">
                    {profile.role}
                  </span>
                </div>
                <div className="flex items-center gap-4 text-[0.78rem] text-[#5a5855]">
                  <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" /> {profile.location}</span>
                  <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> {profile.joinedAt} 加入</span>
                </div>
              </div>

              <div className="flex gap-3">
                {isOwner ? (
                  <button className="h-10 px-6 rounded-md border border-white/[0.1] text-[#7a7874] text-[0.8rem] font-medium hover:border-white/[0.2] hover:text-foreground transition-all flex items-center gap-2">
                    <Settings className="w-4 h-4" />
                    编辑资料
                  </button>
                ) : (
                  <button className="h-10 px-6 rounded-md bg-gold text-[#08080c] text-[0.82rem] font-semibold hover:bg-[#d4b87a] transition-all">
                    关注
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Bio */}
          <p className="text-[#7a7874] text-[0.9rem] leading-relaxed max-w-[600px] mt-4 mb-3">
            {profile.bio}
          </p>

          {/* Equipment Tags */}
          <div className="flex gap-2 flex-wrap mb-6">
            {profile.equipment.map((eq) => (
              <span key={eq} className="text-[0.68rem] tracking-wider bg-[#16161e] text-[#7a7874] px-2.5 py-1 rounded">
                {eq}
              </span>
            ))}
          </div>

          {/* Stats */}
          <div className="flex gap-[clamp(2rem,5vw,4rem)] py-5 border-y border-white/[0.06]">
            <StatBlock value={profile.stats.works} label="作品" />
            <StatBlock value={profile.stats.likes} label="获赞" />
            <StatBlock value={profile.stats.followers} label="粉丝" />
            <StatBlock value={profile.stats.following} label="关注" />
          </div>
        </div>

        {/* Tabs */}
        <div className="px-[clamp(1.5rem,4vw,4rem)] mt-6">
          <div className="flex gap-1 border-b border-white/[0.06]">
            {([
              { key: "works", label: "作品", icon: Grid3X3, count: profile.stats.works },
              { key: "collections", label: "合集", icon: FolderHeart, count: collections.length },
              { key: "liked", label: "赞过", icon: Heart, count: "—" },
            ] as const).map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`flex items-center gap-2 px-5 py-3 text-[0.82rem] font-medium tracking-wide border-b-2 -mb-px transition-all ${
                  activeTab === tab.key
                    ? "border-gold text-foreground"
                    : "border-transparent text-[#5a5855] hover:text-[#7a7874]"
                }`}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
                <span className="text-[0.7rem] text-[#4a4845]">{tab.count}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="px-[clamp(1.5rem,4vw,4rem)] py-[clamp(2rem,4vh,3rem)] pb-[clamp(4rem,8vh,6rem)]">
          {/* Works Grid */}
          {activeTab === "works" && (
            <div className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-3">
              {myWorks.map((w, i) => (
                <ScrollReveal key={w.id} delay={i * 40}>
                  <Link href={`/works/${w.id}`} className="group block">
                    <div className="relative rounded-md overflow-hidden bg-[#0e0e14]">
                      <img
                        src={w.src}
                        alt={w.title}
                        loading="lazy"
                        className="w-full aspect-square object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-6 text-white">
                        <span className="flex items-center gap-1.5 text-[0.82rem]">
                          <Heart className="w-4 h-4" /> {w.likes}
                        </span>
                        <span className="flex items-center gap-1.5 text-[0.82rem]">
                          <MessageCircle className="w-4 h-4" /> {w.comments}
                        </span>
                      </div>
                    </div>
                    <div className="mt-1.5 font-serif text-[0.82rem] text-[#a09e9a] group-hover:text-gold transition-colors truncate">
                      {w.title}
                    </div>
                  </Link>
                </ScrollReveal>
              ))}
            </div>
          )}

          {/* Collections */}
          {activeTab === "collections" && (
            <div className="grid grid-cols-[repeat(auto-fill,minmax(240px,1fr))] gap-4">
              {collections.map((c, i) => (
                <ScrollReveal key={c.id} delay={i * 60}>
                  <div className="group cursor-pointer">
                    <div className="relative rounded-md overflow-hidden bg-[#0e0e14] mb-2">
                      <img
                        src={c.cover}
                        alt={c.name}
                        loading="lazy"
                        className="w-full aspect-[16/10] object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end p-4">
                        <div>
                          <div className="font-serif text-[1rem] font-semibold text-white">{c.name}</div>
                          <div className="text-[0.72rem] text-white/60 mt-0.5">{c.count} 张作品</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          )}

          {/* Liked (placeholder) */}
          {activeTab === "liked" && (
            <div className="text-center py-16">
              <Heart className="w-10 h-10 text-[#2a2a3e] mx-auto mb-3" />
              <p className="text-[#4a4845] text-[0.9rem]">
                {isOwner ? "你赞过的作品会出现在这里" : "TA赞过的作品仅自己可见"}
              </p>
            </div>
          )}
        </div>
      </main>
      <Footer />
      <Lightbox />
    </>
  );
}
