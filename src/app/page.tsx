"use client";

import Link from "next/link";
import { ArrowRight, Heart, MessageCircle, ChevronRight } from "lucide-react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { ScrollReveal } from "@/components/scroll-reveal";
import { Counter } from "@/components/counter";
import { Lightbox } from "@/components/lightbox";

/* ===== DATA ===== */
const works = [
  { src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80", fullSrc: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1600&q=90", title: "阿尔卑斯之巅", author: "张明远", likes: 234, comments: 18, h: 380 },
  { src: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600&q=80", fullSrc: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=1600&q=90", title: "午后光影", author: "李雨桐", likes: 189, comments: 12, h: 280 },
  { src: "https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=600&q=80", fullSrc: "https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=1600&q=90", title: "静谧海岸线", author: "王思琪", likes: 312, comments: 24, h: 320 },
  { src: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=600&q=80", fullSrc: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=1600&q=90", title: "晨雾森林", author: "陈浩然", likes: 456, comments: 35, h: 400 },
  { src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80", fullSrc: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1600&q=90", title: "城市剪影", author: "赵一鸣", likes: 167, comments: 9, h: 260 },
  { src: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=600&q=80", fullSrc: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=1600&q=90", title: "金色麦田", author: "刘诗涵", likes: 389, comments: 28, h: 350 },
  { src: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=600&q=80", fullSrc: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1600&q=90", title: "星空下的山", author: "张明远", likes: 567, comments: 42, h: 300 },
  { src: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&q=80", fullSrc: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=1600&q=90", title: "人像 · 晨光", author: "李雨桐", likes: 298, comments: 21, h: 360 },
  { src: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=600&q=80", fullSrc: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=1600&q=90", title: "城市脉搏", author: "王思琪", likes: 234, comments: 16, h: 290 },
];

const members = [
  { name: "傅永康", role: "会长", works: 0, likes: "—", emoji: "📷" },
  { name: "陈庆发", role: "副会长", works: 0, likes: "—", emoji: "📸" },
  { name: "梁志强", role: "副会长", works: 0, likes: "—", emoji: "🎞️" },
  { name: "刘轶", role: "副会长 · 秘书长", works: 0, likes: "—", emoji: "✨" },
  { name: "艾建勋", role: "副会长", works: 0, likes: "—", emoji: "🏔️" },
  { name: "干珺", role: "副秘书长", works: 0, likes: "—", emoji: "🐶" },
  { name: "李灿灿", role: "副秘书长", works: 0, likes: "—", emoji: "🌟" },
  { name: "吴冬阳", role: "理事", works: 0, likes: "—", emoji: "📷" },
  { name: "谭越", role: "理事", works: 0, likes: "—", emoji: "📸" },
  { name: "潘洋", role: "理事", works: 0, likes: "—", emoji: "🎞️" },
  { name: "肖松", role: "理事", works: 0, likes: "—", emoji: "🌿" },
  { name: "邱莹", role: "理事", works: 0, likes: "—", emoji: "✨" },
  { name: "张毅", role: "理事", works: 0, likes: "—", emoji: "🏔️" },
  { name: "刘慧毅", role: "理事", works: 0, likes: "—", emoji: "📷" },
  { name: "王申", role: "理事", works: 0, likes: "—", emoji: "📸" },
  { name: "罗小庆", role: "理事", works: 0, likes: "—", emoji: "🎞️" },
  { name: "李蕴斐", role: "理事", works: 0, likes: "—", emoji: "🌊" },
  { name: "马瑞荃", role: "理事", works: 0, likes: "—", emoji: "✨" },
  { name: "刘正", role: "理事", works: 0, likes: "—", emoji: "🌿" },
];

const events = [
  { day: "28", month: "Mar", title: "城市夜景外拍", desc: "陆家嘴三件套夜景拍摄，带上你的三脚架和广角镜头。", tag: "外拍" },
  { day: "05", month: "Apr", title: "人像摄影工作坊", desc: "室内布光基础 & 后期调色分享，适合新手入门。", tag: "课程" },
  { day: "12", month: "Apr", title: "「春」主题线上影展", desc: '以"春天"为主题，每人提交3-5张作品，线上投票评选。', tag: "影展" },
  { day: "19", month: "Apr", title: "崇明岛生态摄影", desc: "两天一夜崇明岛湿地生态摄影之旅，名额有限先到先得。", tag: "外拍" },
];

/* ===== HERO ===== */
function HeroSection() {
  return (
    <section className="h-screen min-h-[700px] relative overflow-hidden flex items-end px-[clamp(1.5rem,4vw,4rem)] pb-[clamp(3rem,8vh,6rem)]">
      {/* Background */}
      <div
        className="absolute inset-0 ken-burns"
        style={{
          backgroundImage:
            "linear-gradient(to bottom, rgba(8,8,12,0.2) 0%, rgba(8,8,12,0) 30%, rgba(8,8,12,0.6) 70%, rgba(8,8,12,1) 100%), url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&q=80')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-[800px]">
        <div className="fade-up flex items-center gap-3 mb-6">
          <span className="w-8 h-px bg-gold" />
          <span className="text-[0.72rem] font-medium tracking-[0.2em] uppercase text-gold">
            FDSM Photo Club · Est. 2024
          </span>
        </div>
        <h1 className="fade-up fade-up-1 font-serif text-[clamp(2.8rem,6vw,5rem)] font-black leading-[1.15] -tracking-[0.02em] mb-6">
          用镜头记录
          <br />
          每一刻<em className="not-italic bg-gradient-to-r from-[#c9a96e] to-[#e8d5a8] bg-clip-text text-transparent">值得被看见</em>
        </h1>
        <p className="fade-up fade-up-2 text-[1.05rem] text-[#7a7874] leading-relaxed max-w-[520px] mb-10">
          复旦MBA摄影协会，汇集热爱光影的你。
          <br />
          在这里，每一张照片都是一个故事，每一次快门都值得被看见。
        </p>
        <div className="fade-up fade-up-3 flex gap-4 flex-wrap">
          <Link
            href="#works"
            className="px-8 py-3.5 bg-gold text-[#08080c] rounded-[4px] text-[0.82rem] font-semibold tracking-[0.1em] uppercase hover:bg-[#d4b87a] hover:-translate-y-[1px] transition-all"
          >
            浏览作品
          </Link>
          <Link
            href="#about"
            className="px-8 py-3.5 border border-white/[0.06] text-foreground rounded-[4px] text-[0.82rem] font-medium tracking-[0.1em] uppercase hover:border-[#7a7874] hover:bg-white/[0.02] transition-all"
          >
            了解更多
          </Link>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 fade-up fade-up-5">
        <span className="text-[0.65rem] tracking-[0.2em] uppercase text-[#4a4845]">Scroll</span>
        <div className="w-px h-10 relative overflow-hidden scroll-line-anim" />
      </div>
    </section>
  );
}

/* ===== STATS ===== */
function StatsSection() {
  const stats = [
    { target: 128, label: "会员" },
    { target: 2340, label: "作品" },
    { target: 36, label: "外拍活动" },
    { target: 15, label: "线上影展" },
  ];

  return (
    <div className="flex justify-center gap-[clamp(2rem,5vw,5rem)] flex-wrap py-12 border-y border-white/[0.06] bg-[#0e0e14]">
      {stats.map((stat) => (
        <ScrollReveal key={stat.label} className="text-center">
          <Counter target={stat.target} suffix="+" />
          <div className="text-[0.75rem] text-[#7a7874] tracking-[0.15em] uppercase mt-1">
            {stat.label}
          </div>
        </ScrollReveal>
      ))}
    </div>
  );
}

/* ===== FEATURED WORKS ===== */
function WorksSection() {
  return (
    <section id="works" className="py-[clamp(4rem,10vh,8rem)] px-[clamp(1.5rem,4vw,4rem)]">
      <ScrollReveal className="flex items-end justify-between mb-12 flex-wrap gap-4">
        <div>
          <span className="block text-[0.72rem] font-medium tracking-[0.2em] uppercase text-gold mb-2">
            Featured Works
          </span>
          <h2 className="font-serif text-[clamp(1.8rem,3vw,2.5rem)] font-bold">精选作品</h2>
        </div>
        <Link href="/works" className="flex items-center gap-1 text-[#7a7874] text-[0.82rem] font-medium hover:text-gold transition-colors group">
          查看全部
          <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
        </Link>
      </ScrollReveal>

      <div className="columns-1 sm:columns-2 lg:columns-3 gap-4">
        {works.map((work, i) => (
          <ScrollReveal key={i} delay={i * 60} className="break-inside-avoid mb-4">
            <div
              data-lightbox={work.fullSrc}
              className="relative rounded-md overflow-hidden cursor-pointer group bg-surface"
            >
              <img
                src={work.src}
                alt={work.title}
                loading="lazy"
                className="w-full object-cover transition-transform duration-[800ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04] group-hover:brightness-110"
                style={{ minHeight: work.h }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                <div className="font-serif text-[1rem] font-semibold">{work.title}</div>
                <div className="flex items-center gap-2 text-[0.78rem] text-[#7a7874] mt-1">
                  <span className="w-[22px] h-[22px] rounded-full bg-gold-dim flex items-center justify-center text-[0.6rem] text-gold">
                    {work.author[0]}
                  </span>
                  {work.author}
                </div>
                <div className="flex gap-3 mt-2 text-[0.72rem] text-[#4a4845]">
                  <span className="flex items-center gap-1">
                    <Heart className="w-3 h-3" /> {work.likes}
                  </span>
                  <span className="flex items-center gap-1">
                    <MessageCircle className="w-3 h-3" /> {work.comments}
                  </span>
                </div>
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}

/* ===== ABOUT / EDITORIAL ===== */
function AboutSection() {
  return (
    <section id="about">
      <div className="grid grid-cols-1 md:grid-cols-2 min-h-[80vh]">
        <div className="relative overflow-hidden img-zoom">
          <img
            src="https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=960&q=80"
            alt="摄影"
            loading="lazy"
            className="w-full h-full object-cover"
          />
        </div>
        <ScrollReveal className="flex flex-col justify-center px-[clamp(2rem,5vw,5rem)] py-[clamp(2rem,5vw,5rem)] bg-[#0e0e14]">
          <span className="text-[0.7rem] font-medium tracking-[0.2em] uppercase text-gold mb-6">
            About Us
          </span>
          <h3 className="font-serif text-[clamp(1.6rem,3vw,2.4rem)] font-bold leading-snug mb-6">
            不只是爱好，
            <br />
            是一种看世界的方式
          </h3>
          <p className="text-[#7a7874] leading-[1.9] text-[0.95rem] mb-4 max-w-[460px]">
            复旦MBA摄影协会成立于2024年，致力于为MBA同学打造一个分享摄影艺术、交流创作心得的平台。
            我们相信，摄影不只是按下快门，更是一种发现美、记录美、分享美的生活方式。
          </p>
          <p className="text-[#7a7874] leading-[1.9] text-[0.95rem] mb-8 max-w-[460px]">
            从城市街拍到山川湖海，从人像光影到微观世界——
            在这里，你能找到志同道合的伙伴，一起探索光影的无限可能。
          </p>
          <Link
            href="#"
            className="flex items-center gap-2 text-gold text-[0.82rem] font-medium tracking-[0.08em] uppercase hover:gap-4 transition-all"
          >
            了解更多 <ChevronRight className="w-4 h-4" />
          </Link>
        </ScrollReveal>
      </div>
    </section>
  );
}

/* ===== MEMBERS ===== */
function MembersSection() {
  const leadership = members.filter((m) =>
    ["会长", "副会长"].includes(m.role.split(" · ")[0]) || m.role.includes("秘书长")
  );
  const board = members.filter((m) => m.role === "理事");

  return (
    <section id="members" className="py-[clamp(4rem,10vh,8rem)] px-[clamp(1.5rem,4vw,4rem)]">
      <ScrollReveal className="flex items-end justify-between mb-12 flex-wrap gap-4">
        <div>
          <span className="block text-[0.72rem] font-medium tracking-[0.2em] uppercase text-gold mb-2">
            Our Members
          </span>
          <h2 className="font-serif text-[clamp(1.8rem,3vw,2.5rem)] font-bold">理事会成员</h2>
        </div>
        <Link href="#" className="flex items-center gap-1 text-[#7a7874] text-[0.82rem] font-medium hover:text-gold transition-colors group">
          查看全部
          <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
        </Link>
      </ScrollReveal>

      {/* Leadership */}
      <ScrollReveal className="mb-12">
        <div className="grid grid-cols-[repeat(auto-fill,minmax(180px,1fr))] gap-5">
          {leadership.map((m, i) => (
            <MemberCard key={i} member={m} delay={i * 60} />
          ))}
        </div>
      </ScrollReveal>

      {/* Board Members */}
      <ScrollReveal>
        <div className="grid grid-cols-[repeat(auto-fill,minmax(160px,1fr))] gap-4">
          {board.map((m, i) => (
            <MemberCard key={i} member={m} delay={i * 40} compact />
          ))}
        </div>
      </ScrollReveal>
    </section>
  );
}

function MemberCard({
  member: m,
  delay,
  compact,
}: {
  member: (typeof members)[0];
  delay: number;
  compact?: boolean;
}) {
  return (
    <ScrollReveal delay={delay}>
      <div
        className={`text-center border border-white/[0.06] rounded-lg transition-all duration-300 cursor-pointer hover:border-[rgba(201,169,110,0.3)] hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(0,0,0,0.3)] bg-[#0e0e14] group ${
          compact ? "p-5" : "p-7"
        }`}
      >
        <div
          className={`rounded-full mx-auto mb-3 bg-gradient-to-br from-gold-dim to-[rgba(201,169,110,0.05)] flex items-center justify-center border-2 border-white/[0.06] transition-colors group-hover:border-gold ${
            compact ? "w-14 h-14 text-[1.2rem]" : "w-[68px] h-[68px] text-[1.4rem]"
          }`}
        >
          {m.emoji}
        </div>
        <div className={`font-serif font-semibold mb-1 ${compact ? "text-[0.95rem]" : "text-[1rem]"}`}>
          {m.name}
        </div>
        <div className={`text-[#7a7874] tracking-[0.08em] uppercase ${compact ? "text-[0.68rem]" : "text-[0.72rem]"}`}>
          {m.role}
        </div>
        {m.works > 0 && (
          <div className="flex justify-center gap-5 mt-3 text-[0.72rem] text-[#4a4845]">
            <span>{m.works} 作品</span>
            <span>{m.likes} 赞</span>
          </div>
        )}
      </div>
    </ScrollReveal>
  );
}

/* ===== EVENTS ===== */
function EventsSection() {
  return (
    <section id="events" className="py-[clamp(4rem,10vh,8rem)] px-[clamp(1.5rem,4vw,4rem)]">
      <ScrollReveal className="mb-12">
        <span className="block text-[0.72rem] font-medium tracking-[0.2em] uppercase text-gold mb-2">
          Upcoming
        </span>
        <h2 className="font-serif text-[clamp(1.8rem,3vw,2.5rem)] font-bold">近期活动</h2>
      </ScrollReveal>

      <div className="max-w-[800px] mx-auto">
        {events.map((e, i) => (
          <ScrollReveal key={i} delay={i * 80}>
            <div className="flex gap-8 items-start py-8 border-b border-white/[0.06] last:border-b-0 cursor-pointer hover:pl-2 transition-all group">
              <div className="min-w-[60px] text-center shrink-0">
                <div className="font-serif text-[2rem] font-bold text-gold leading-none">{e.day}</div>
                <div className="text-[0.72rem] tracking-[0.15em] uppercase text-[#7a7874] mt-1">{e.month}</div>
              </div>
              <div>
                <h4 className="font-serif text-[1.15rem] font-semibold mb-1 group-hover:text-gold transition-colors">{e.title}</h4>
                <p className="text-[0.85rem] text-[#7a7874] leading-relaxed">{e.desc}</p>
                <span className="inline-block mt-2 px-2.5 py-1 rounded-[3px] bg-gold-dim text-gold text-[0.68rem] font-medium tracking-[0.08em] uppercase">
                  {e.tag}
                </span>
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}

/* ===== CTA ===== */
function CTASection() {
  return (
    <section
      id="join"
      className="text-center py-[clamp(5rem,12vh,10rem)] px-8"
      style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(201,169,110,0.06) 0%, transparent 60%)" }}
    >
      <ScrollReveal>
        <h2 className="font-serif text-[clamp(2rem,4vw,3rem)] font-bold mb-4">
          用你的视角，
          <br />
          定义美的标准
        </h2>
        <p className="text-[#7a7874] text-[1rem] max-w-[500px] mx-auto mb-10 leading-relaxed">
          无论你是摄影老手还是刚拿起相机的新手，
          只要你对光影有热情，这里就是你的舞台。
        </p>
        <Link
          href="#"
          className="inline-block px-10 py-3.5 bg-gold text-[#08080c] rounded-[4px] text-[0.82rem] font-semibold tracking-[0.1em] uppercase hover:bg-[#d4b87a] hover:-translate-y-[1px] transition-all"
        >
          申请加入
        </Link>
      </ScrollReveal>
    </section>
  );
}

/* ===== PAGE ===== */
export default function HomePage() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <HeroSection />
        <StatsSection />
        <WorksSection />
        <AboutSection />
        <MembersSection />
        <EventsSection />
        <CTASection />
      </main>
      <Footer />
      <Lightbox />
    </>
  );
}
