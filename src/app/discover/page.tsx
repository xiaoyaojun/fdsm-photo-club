"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, TrendingUp, Flame, Clock, Heart, Eye, MessageCircle, Camera, ChevronRight, X } from "lucide-react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { ScrollReveal } from "@/components/scroll-reveal";

/* ===== DATA ===== */
const trendingTags = [
  { name: "星空", count: 234, hot: true },
  { name: "人像", count: 189, hot: true },
  { name: "风光", count: 312, hot: false },
  { name: "街拍", count: 156, hot: true },
  { name: "胶片", count: 98, hot: false },
  { name: "夜景", count: 145, hot: false },
  { name: "日落", count: 201, hot: true },
  { name: "城市", count: 167, hot: false },
  { name: "海洋", count: 123, hot: false },
  { name: "山川", count: 89, hot: false },
  { name: "光影", count: 178, hot: true },
  { name: "雾", count: 67, hot: false },
  { name: "乡村", count: 54, hot: false },
  { name: "湖", count: 112, hot: false },
  { name: "森林", count: 95, hot: false },
];

const featuredWorks = [
  { id: 1, src: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=500&q=80", title: "星空下的富士山", author: "傅永康", likes: 567, views: 3210 },
  { id: 2, src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&q=80", title: "阿尔卑斯之巅", author: "傅永康", likes: 234, views: 1890 },
  { id: 3, src: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=500&q=80", title: "层峦叠嶂", author: "吴冬阳", likes: 378, views: 2456 },
  { id: 4, src: "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?w=500&q=80", title: "湖光山色", author: "梁志强", likes: 412, views: 2789 },
  { id: 5, src: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=500&q=80", title: "热带黄昏", author: "艾建勋", likes: 445, views: 3102 },
  { id: 6, src: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=500&q=80", title: "晨雾森林", author: "刘轶", likes: 456, views: 3045 },
  { id: 7, src: "https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=500&q=80", title: "静谧海岸线", author: "梁志强", likes: 312, views: 2134 },
  { id: 8, src: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=500&q=80", title: "林间光影", author: "陈庆发", likes: 267, views: 1876 },
];

const hotPhotographers = [
  { name: "傅永康", emoji: "📷", role: "会长", works: 89, followers: 156 },
  { name: "李灿灿", emoji: "🌟", role: "副会长", works: 67, followers: 134 },
  { name: "吴冬阳", emoji: "📷", role: "会员", works: 45, followers: 98 },
  { name: "刘轶", emoji: "✨", role: "会员", works: 52, followers: 87 },
  { name: "梁志强", emoji: "🎞️", role: "会员", works: 38, followers: 76 },
];

const recentSearches = ["富士山", "星空人像", "胶片色调", "长曝光"];

/* ===== TAG PILL ===== */
function TagPill({ tag }: { tag: { name: string; count: number; hot: boolean } }) {
  return (
    <Link
      href={`/works?tag=${tag.name}`}
      className={`group flex items-center gap-2 px-4 py-2.5 rounded-full border transition-all ${
        tag.hot
          ? "border-gold/20 bg-gold/[0.04] hover:border-gold/40 hover:bg-gold/[0.08]"
          : "border-white/[0.06] bg-[#0e0e14] hover:border-white/[0.12] hover:bg-[#131319]"
      }`}
    >
      <span className={`text-[0.82rem] font-medium ${tag.hot ? "text-gold" : "text-[#a09e9a] group-hover:text-foreground"}`}>
        #{tag.name}
      </span>
      <span className="text-[0.68rem] text-[#4a4845]">{tag.count}</span>
      {tag.hot && <Flame className="w-3 h-3 text-gold/60" />}
    </Link>
  );
}

/* ===== SEARCH RESULTS (mock) ===== */
interface SearchResult {
  type: "work" | "photographer";
  title: string;
  subtitle: string;
  src?: string;
  emoji?: string;
}

const mockResults: SearchResult[] = [
  { type: "work", title: "星空下的富士山", subtitle: "傅永康 · 风光 / 星空", src: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=120&q=80" },
  { type: "work", title: "星空长曝光", subtitle: "吴冬阳 · 夜景 / 星空", src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=120&q=80" },
  { type: "photographer", title: "傅永康", subtitle: "会长 · 89 作品 · 2.3k 获赞", emoji: "📷" },
  { type: "work", title: "银河拱桥", subtitle: "梁志强 · 风光 / 星空", src: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=120&q=80" },
];

/* ===== PAGE ===== */
export default function DiscoverPage() {
  const [query, setQuery] = useState("");
  const [focused, setFocused] = useState(false);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  const showResults = query.length > 0 && focused;

  return (
    <>
      <Navbar />
      <main className="flex-1">
        {/* Hero Search */}
        <section className="pt-[clamp(9rem,14vh,12rem)] pb-8 px-[clamp(1.5rem,4vw,4rem)]">
          <span className="block text-[0.72rem] font-medium tracking-[0.2em] uppercase text-gold mb-3">Discover</span>
          <h1 className="font-serif text-[clamp(2rem,4vw,3rem)] font-bold leading-tight mb-6">发现</h1>

          {/* Search Bar */}
          <div className="relative max-w-2xl">
            <div className={`flex items-center h-14 rounded-xl border-2 bg-[#0e0e14] transition-all ${
              focused ? "border-gold/50 shadow-[0_0_20px_rgba(201,169,110,0.08)]" : "border-white/[0.06]"
            }`}>
              <Search className="w-5 h-5 text-[#4a4845] ml-5 shrink-0" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onFocus={() => setFocused(true)}
                onBlur={() => setTimeout(() => setFocused(false), 200)}
                placeholder="搜索作品、摄影师、标签…"
                className="flex-1 h-full px-4 bg-transparent text-[0.95rem] text-foreground placeholder-[#4a4845] focus:outline-none"
              />
              {query && (
                <button onClick={() => setQuery("")} className="mr-3 text-[#4a4845] hover:text-[#7a7874] transition-colors">
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Dropdown Results */}
            {showResults && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-[#0e0e14] border border-white/[0.08] rounded-xl overflow-hidden shadow-[0_16px_64px_rgba(0,0,0,0.4)] z-30">
                <div className="px-4 py-2.5 text-[0.68rem] font-medium tracking-wider uppercase text-[#4a4845] border-b border-white/[0.04]">
                  搜索结果
                </div>
                {mockResults.map((r, i) => (
                  <div key={i} className="flex items-center gap-4 px-4 py-3 hover:bg-white/[0.02] transition-colors cursor-pointer">
                    {r.type === "work" && r.src ? (
                      <img src={r.src} alt="" className="w-10 h-10 rounded-md object-cover shrink-0" />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-gold-dim flex items-center justify-center text-[0.85rem] shrink-0">
                        {r.emoji}
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <div className="text-[0.85rem] font-medium truncate">{r.title}</div>
                      <div className="text-[0.72rem] text-[#4a4845] truncate">{r.subtitle}</div>
                    </div>
                    <span className="text-[0.68rem] text-[#4a4845] uppercase shrink-0">{r.type === "work" ? "作品" : "摄影师"}</span>
                  </div>
                ))}
                <div className="px-4 py-3 border-t border-white/[0.04]">
                  <button className="text-[0.78rem] text-gold hover:text-[#d4b87a] transition-colors flex items-center gap-1">
                    查看全部结果 <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Recent Searches */}
          {!focused && (
            <div className="flex items-center gap-3 mt-4 max-w-2xl">
              <Clock className="w-3.5 h-3.5 text-[#4a4845] shrink-0" />
              <div className="flex gap-2 flex-wrap">
                {recentSearches.map((s) => (
                  <button key={s} onClick={() => setQuery(s)} className="text-[0.75rem] text-[#5a5855] hover:text-[#7a7874] transition-colors px-2 py-1 rounded bg-[#0e0e14] hover:bg-[#131319]">
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}
        </section>

        <div className="px-[clamp(1.5rem,4vw,4rem)]">
          {/* Trending Tags */}
          <section className="mb-[clamp(3rem,6vh,5rem)]">
            <div className="flex items-center gap-2 mb-6">
              <TrendingUp className="w-5 h-5 text-gold" />
              <h2 className="font-serif text-[1.2rem] font-semibold">热门标签</h2>
            </div>
            <div className="flex gap-3 flex-wrap">
              {trendingTags.map((tag) => (
                <TagPill key={tag.name} tag={tag} />
              ))}
            </div>
          </section>

          {/* Featured Works */}
          <section className="mb-[clamp(3rem,6vh,5rem)]">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-serif text-[1.2rem] font-semibold">精选作品</h2>
              <Link href="/works" className="flex items-center gap-1 text-[#7a7874] text-[0.82rem] hover:text-gold transition-colors group">
                查看全部 <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
            <div className="grid grid-cols-[repeat(auto-fill,minmax(220px,1fr))] gap-4">
              {featuredWorks.map((w, i) => (
                <ScrollReveal key={w.id} delay={i * 50}>
                  <Link href={`/works/${w.id}`} className="group block">
                    <div className="relative rounded-md overflow-hidden bg-[#0e0e14]">
                      <img src={w.src} alt={w.title} loading="lazy" className="w-full aspect-square object-cover transition-transform duration-500 group-hover:scale-105" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="absolute bottom-3 left-3 right-3">
                          <div className="flex gap-3 text-[0.72rem] text-white/80">
                            <span className="flex items-center gap-1"><Heart className="w-3 h-3" /> {w.likes}</span>
                            <span className="flex items-center gap-1"><Eye className="w-3 h-3" /> {w.views}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="mt-2">
                      <div className="font-serif text-[0.88rem] font-medium group-hover:text-gold transition-colors truncate">{w.title}</div>
                      <div className="text-[0.72rem] text-[#4a4845]">{w.author}</div>
                    </div>
                  </Link>
                </ScrollReveal>
              ))}
            </div>
          </section>

          {/* Hot Photographers */}
          <section className="mb-[clamp(4rem,8vh,6rem)]">
            <div className="flex items-center gap-2 mb-6">
              <Camera className="w-5 h-5 text-gold" />
              <h2 className="font-serif text-[1.2rem] font-semibold">活跃摄影师</h2>
            </div>
            <div className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-3">
              {hotPhotographers.map((p, i) => (
                <ScrollReveal key={p.name} delay={i * 60}>
                  <Link href={`/profile/${i + 1}`} className="group flex items-center gap-3 p-4 rounded-lg border border-white/[0.04] bg-[#0e0e14] hover:border-white/[0.08] hover:bg-[#131319] transition-all">
                    <div className="w-11 h-11 rounded-full bg-gradient-to-br from-[rgba(201,169,110,0.12)] to-[rgba(201,169,110,0.03)] flex items-center justify-center text-[1rem] border border-white/[0.06] shrink-0">
                      {p.emoji}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-[0.85rem] font-medium group-hover:text-gold transition-colors">{p.name}</div>
                      <div className="text-[0.68rem] text-[#4a4845]">{p.role} · {p.works} 作品</div>
                    </div>
                    <div className="text-[0.68rem] text-[#5a5855]">{p.followers} 粉丝</div>
                  </Link>
                </ScrollReveal>
              ))}
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
