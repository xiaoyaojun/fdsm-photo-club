"use client";

import { useState } from "react";
import Link from "next/link";
import { Heart, MessageCircle, Share2, Bookmark, Eye, ArrowLeft, ChevronRight, Camera, Aperture, Timer, Sun, Monitor, MapPin, Send } from "lucide-react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

/* ===== MOCK DATA ===== */
const work = {
  id: 1,
  title: "星空下的富士山",
  description: "今年二月和协会小伙伴一起驱车前往富士山，运气很好遇到了无云的夜晚。用14mm超广角拍下了这张星空与富士山的合影。银河横跨山巅，那一刻觉得所有的奔波都值得了。",
  src: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1600&q=90",
  author: { name: "傅永康", emoji: "📷", role: "会长", avatar: "" },
  likes: 567,
  comments: 42,
  views: 3210,
  bookmarks: 89,
  tags: ["风光", "星空", "山脉"],
  date: "2026-02-28",
  exif: {
    camera: "Sony A7R V",
    lens: "FE 14mm f/1.8 GM",
    focalLength: "14mm",
    aperture: "f/1.8",
    shutter: "20s",
    iso: "3200",
    location: "山梨县 · 富士山",
  },
};

interface Comment {
  id: number;
  author: string;
  emoji: string;
  content: string;
  time: string;
  likes: number;
  replies?: Comment[];
}

const comments: Comment[] = [
  {
    id: 1,
    author: "李灿灿",
    emoji: "🌟",
    content: "绝了！银河和富士山同框，太震撼了。请问是用赤道仪拍的吗？",
    time: "2小时前",
    likes: 23,
    replies: [
      {
        id: 11,
        author: "傅永康",
        emoji: "📷",
        content: "没有用赤道仪，就是普通三脚架长曝。关键是无月夜 + 高ISO + 后期堆栈降噪。",
        time: "1小时前",
        likes: 15,
      },
      {
        id: 12,
        author: "干珺",
        emoji: "🐶",
        content: "原来是堆栈降噪！我也试过类似参数但是噪点很多，下次试试你这个方法。",
        time: "45分钟前",
        likes: 8,
      },
    ],
  },
  {
    id: 2,
    author: "吴冬阳",
    emoji: "📷",
    content: "这个构图太妙了，银河正好穿过山尖。光线污染控制得也很好，前景的树剪影加分。",
    time: "3小时前",
    likes: 18,
    replies: [
      {
        id: 21,
        author: "刘轶",
        emoji: "✨",
        content: "对！前景剪影很重要，如果没有树的剪影，画面会少一个层次。",
        time: "2小时前",
        likes: 6,
      },
    ],
  },
  {
    id: 3,
    author: "陈庆发",
    emoji: "📸",
    content: "收藏了！下次去日本一定要打卡同款机位 📍",
    time: "5小时前",
    likes: 12,
  },
  {
    id: 4,
    author: "梁志强",
    emoji: "🎞️",
    content: "14mm 拍星空确实是最舒服的焦段。我用20mm总觉得差点意思。",
    time: "6小时前",
    likes: 9,
    replies: [
      {
        id: 41,
        author: "傅永康",
        emoji: "📷",
        content: "14mm 确实是星空利器，不过边缘慧差控制很重要。这颗GM头在这方面表现很出色。",
        time: "5小时前",
        likes: 11,
      },
    ],
  },
];

const relatedWorks = [
  { id: 2, src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&q=80", title: "阿尔卑斯之巅", author: "傅永康" },
  { id: 3, src: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=400&q=80", title: "层峦叠嶂", author: "吴冬阳" },
  { id: 4, src: "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?w=400&q=80", title: "湖光山色", author: "梁志强" },
  { id: 5, src: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=400&q=80", title: "热带黄昏", author: "艾建勋" },
];

/* ===== EXIF ROW ===== */
function ExifRow({ icon: Icon, label, value }: { icon: React.ElementType; label: string; value: string }) {
  return (
    <div className="flex items-center gap-3 py-2.5 border-b border-white/[0.04] last:border-b-0">
      <Icon className="w-4 h-4 text-[#4a4845] shrink-0" />
      <span className="text-[0.75rem] text-[#5a5855] w-16 shrink-0">{label}</span>
      <span className="text-[0.82rem] text-foreground">{value}</span>
    </div>
  );
}

/* ===== COMMENT COMPONENT ===== */
function CommentItem({ comment, isReply = false }: { comment: Comment; isReply?: boolean }) {
  const [liked, setLiked] = useState(false);
  const [showReplyInput, setShowReplyInput] = useState(false);

  return (
    <div className={isReply ? "ml-[clamp(2.5rem,5vw,3.5rem)]" : ""}>
      <div className="flex gap-3 py-4">
        {/* Avatar */}
        <div className={`shrink-0 rounded-full bg-gradient-to-br from-[rgba(201,169,110,0.12)] to-[rgba(201,169,110,0.03)] flex items-center justify-center border border-white/[0.06] ${isReply ? "w-8 h-8 text-[0.7rem]" : "w-10 h-10 text-[0.85rem]"}`}>
          {comment.emoji}
        </div>

        <div className="flex-1 min-w-0">
          {/* Author + time */}
          <div className="flex items-center gap-2 mb-1.5">
            <span className={`font-medium ${isReply ? "text-[0.82rem]" : "text-[0.88rem]"}`}>{comment.author}</span>
            <span className="text-[0.7rem] text-[#4a4845]">{comment.time}</span>
          </div>

          {/* Content */}
          <p className={`text-[#a09e9a] leading-relaxed ${isReply ? "text-[0.82rem]" : "text-[0.88rem]"}`}>
            {comment.content}
          </p>

          {/* Actions */}
          <div className="flex items-center gap-5 mt-2">
            <button
              onClick={() => setLiked(!liked)}
              className={`flex items-center gap-1.5 text-[0.72rem] transition-colors ${liked ? "text-gold" : "text-[#4a4845] hover:text-[#7a7874]"}`}
            >
              <Heart className={`w-3.5 h-3.5 ${liked ? "fill-gold" : ""}`} />
              {comment.likes + (liked ? 1 : 0)}
            </button>
            {!isReply && (
              <button
                onClick={() => setShowReplyInput(!showReplyInput)}
                className="flex items-center gap-1.5 text-[0.72rem] text-[#4a4845] hover:text-[#7a7874] transition-colors"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                回复
              </button>
            )}
          </div>

          {/* Reply input */}
          {showReplyInput && (
            <div className="flex gap-2 mt-3">
              <input
                type="text"
                placeholder={`回复 @${comment.author}…`}
                className="flex-1 h-9 px-3 rounded-md border border-white/[0.08] bg-[#0e0e14] text-[0.82rem] text-foreground placeholder-[#4a4845] focus:outline-none focus:border-gold/30 transition-all"
              />
              <button className="h-9 px-4 rounded-md bg-gold text-[#08080c] text-[0.75rem] font-medium hover:bg-[#d4b87a] transition-colors flex items-center gap-1.5">
                <Send className="w-3 h-3" />
                发送
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Nested replies */}
      {comment.replies?.map((reply) => (
        <CommentItem key={reply.id} comment={reply} isReply />
      ))}
    </div>
  );
}

/* ===== PAGE ===== */
export default function WorkDetailPage() {
  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [newComment, setNewComment] = useState("");

  return (
    <>
      <Navbar />
      <main className="flex-1">
        {/* Breadcrumb */}
        <div className="pt-[4.5rem] pb-3 px-[clamp(1.5rem,4vw,4rem)] flex items-center gap-2 text-[0.75rem] text-[#4a4845]">
          <Link href="/" className="hover:text-[#7a7874] transition-colors">首页</Link>
          <ChevronRight className="w-3 h-3" />
          <Link href="/works" className="hover:text-[#7a7874] transition-colors">作品长廊</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-[#7a7874]">{work.title}</span>
        </div>

        <div className="px-[clamp(1.5rem,4vw,4rem)] pb-[clamp(4rem,8vh,6rem)]">
          <div className="flex flex-col lg:flex-row gap-[clamp(1.5rem,3vw,2.5rem)]">
            {/* Left: Image + Description + Comments */}
            <div className="flex-1 min-w-0">
              {/* Main Image */}
              <div className="rounded-lg overflow-hidden mb-6 bg-[#0e0e14]">
                <img
                  src={work.src}
                  alt={work.title}
                  className="w-full object-cover"
                />
              </div>

              {/* Action Bar */}
              <div className="flex items-center justify-between py-4 border-y border-white/[0.06] mb-6">
                <div className="flex items-center gap-5">
                  <button
                    onClick={() => setLiked(!liked)}
                    className={`flex items-center gap-2 text-[0.82rem] font-medium transition-colors ${liked ? "text-gold" : "text-[#7a7874] hover:text-foreground"}`}
                  >
                    <Heart className={`w-[18px] h-[18px] ${liked ? "fill-gold" : ""}`} />
                    {work.likes + (liked ? 1 : 0)}
                  </button>
                  <span className="flex items-center gap-2 text-[0.82rem] text-[#7a7874]">
                    <MessageCircle className="w-[18px] h-[18px]" />
                    {work.comments}
                  </span>
                  <span className="flex items-center gap-2 text-[0.82rem] text-[#7a7874]">
                    <Eye className="w-[18px] h-[18px]" />
                    {work.views}
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setBookmarked(!bookmarked)}
                    className={`transition-colors ${bookmarked ? "text-gold" : "text-[#4a4845] hover:text-[#7a7874]"}`}
                  >
                    <Bookmark className={`w-[18px] h-[18px] ${bookmarked ? "fill-gold" : ""}`} />
                  </button>
                  <button className="text-[#4a4845] hover:text-[#7a7874] transition-colors">
                    <Share2 className="w-[18px] h-[18px]" />
                  </button>
                </div>
              </div>

              {/* Title + Description */}
              <div className="mb-8">
                <h1 className="font-serif text-[clamp(1.5rem,3vw,2rem)] font-bold mb-4">{work.title}</h1>
                <p className="text-[#7a7874] text-[0.9rem] leading-[1.9]">{work.description}</p>
                <div className="flex gap-2 mt-4 flex-wrap">
                  {work.tags.map((tag) => (
                    <span key={tag} className="text-[0.7rem] tracking-wider uppercase bg-gold-dim text-gold px-2.5 py-1 rounded">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Comments Section */}
              <div className="border-t border-white/[0.06] pt-8">
                <h3 className="font-serif text-[1.1rem] font-semibold mb-6 flex items-center gap-2">
                  <MessageCircle className="w-5 h-5 text-gold" />
                  评论 ({comments.reduce((sum, c) => sum + 1 + (c.replies?.length || 0), 0)})
                </h3>

                {/* New Comment Input */}
                <div className="flex gap-3 mb-8">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[rgba(201,169,110,0.12)] to-[rgba(201,169,110,0.03)] flex items-center justify-center border border-white/[0.06] text-[0.85rem] shrink-0">
                    👤
                  </div>
                  <div className="flex-1 flex gap-2">
                    <input
                      type="text"
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      placeholder="写下你的评论…"
                      className="flex-1 h-10 px-4 rounded-md border border-white/[0.08] bg-[#0e0e14] text-[0.88rem] text-foreground placeholder-[#4a4845] focus:outline-none focus:border-gold/30 transition-all"
                    />
                    <button className="h-10 px-5 rounded-md bg-gold text-[#08080c] text-[0.8rem] font-medium hover:bg-[#d4b87a] transition-colors flex items-center gap-1.5 shrink-0">
                      <Send className="w-3.5 h-3.5" />
                      发送
                    </button>
                  </div>
                </div>

                {/* Comment List */}
                <div className="divide-y divide-white/[0.04]">
                  {comments.map((comment) => (
                    <CommentItem key={comment.id} comment={comment} />
                  ))}
                </div>

                {/* Load More */}
                <button className="w-full py-3 mt-4 text-[0.82rem] text-[#7a7874] border border-white/[0.06] rounded-md hover:border-white/[0.12] hover:text-foreground transition-all">
                  加载更多评论
                </button>
              </div>
            </div>

            {/* Right Sidebar */}
            <div className="lg:w-[300px] shrink-0">
              {/* Author Card */}
              <div className="sticky top-20">
                <div className="p-5 rounded-lg border border-white/[0.06] bg-[#0e0e14] mb-5">
                  <div className="text-[0.7rem] font-medium tracking-[0.15em] uppercase text-[#4a4845] mb-4">摄影师</div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gold-dim to-[rgba(201,169,110,0.05)] flex items-center justify-center text-[1.2rem] border border-white/[0.06]">
                      {work.author.emoji}
                    </div>
                    <div>
                      <div className="font-serif font-semibold text-[0.95rem]">{work.author.name}</div>
                      <div className="text-[0.72rem] text-[#7a7874] tracking-wider">{work.author.role}</div>
                    </div>
                  </div>
                  <div className="flex gap-4 text-center py-3 border-y border-white/[0.04]">
                    <div className="flex-1">
                      <div className="text-[0.85rem] font-semibold text-foreground">89</div>
                      <div className="text-[0.65rem] text-[#4a4845] mt-0.5">作品</div>
                    </div>
                    <div className="flex-1">
                      <div className="text-[0.85rem] font-semibold text-foreground">2.3k</div>
                      <div className="text-[0.65rem] text-[#4a4845] mt-0.5">获赞</div>
                    </div>
                    <div className="flex-1">
                      <div className="text-[0.85rem] font-semibold text-foreground">156</div>
                      <div className="text-[0.65rem] text-[#4a4845] mt-0.5">粉丝</div>
                    </div>
                  </div>
                  <button className="w-full h-9 mt-4 rounded-md border border-gold text-gold text-[0.78rem] font-medium hover:bg-gold hover:text-[#08080c] transition-all">
                    关注
                  </button>
                </div>

                {/* EXIF Card */}
                <div className="p-5 rounded-lg border border-white/[0.06] bg-[#0e0e14] mb-5">
                  <div className="text-[0.7rem] font-medium tracking-[0.15em] uppercase text-[#4a4845] mb-4">拍摄参数</div>
                  <ExifRow icon={Camera} label="机身" value={work.exif.camera} />
                  <ExifRow icon={Aperture} label="镜头" value={work.exif.lens} />
                  <ExifRow icon={Monitor} label="焦距" value={work.exif.focalLength} />
                  <ExifRow icon={Sun} label="光圈" value={work.exif.aperture} />
                  <ExifRow icon={Timer} label="快门" value={work.exif.shutter} />
                  <ExifRow icon={Monitor} label="ISO" value={work.exif.iso} />
                  <ExifRow icon={MapPin} label="地点" value={work.exif.location} />
                </div>

                {/* Date */}
                <div className="p-5 rounded-lg border border-white/[0.06] bg-[#0e0e14]">
                  <div className="text-[0.7rem] font-medium tracking-[0.15em] uppercase text-[#4a4845] mb-2">发布日期</div>
                  <div className="text-[0.9rem] text-foreground">{work.date}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Related Works */}
          <section className="mt-[clamp(3rem,6vh,5rem)]">
            <div className="flex items-center justify-between mb-8">
              <h3 className="font-serif text-[1.2rem] font-semibold">更多作品</h3>
              <Link href="/works" className="flex items-center gap-1 text-[#7a7874] text-[0.82rem] hover:text-gold transition-colors group">
                查看全部 <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {relatedWorks.map((rw) => (
                <Link key={rw.id} href={`/works/${rw.id}`} className="group">
                  <div className="rounded-md overflow-hidden bg-[#0e0e14] mb-2">
                    <img
                      src={rw.src}
                      alt={rw.title}
                      loading="lazy"
                      className="w-full aspect-[4/3] object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="font-serif text-[0.88rem] font-medium group-hover:text-gold transition-colors">{rw.title}</div>
                  <div className="text-[0.72rem] text-[#4a4845]">{rw.author}</div>
                </Link>
              ))}
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
