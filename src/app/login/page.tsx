"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Camera } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Simulate login
    await new Promise((r) => setTimeout(r, 1200));

    if (email && password) {
      localStorage.setItem("fdsm-auth", "true");
      localStorage.setItem("fdsm-user", email);
      router.push("/");
    } else {
      setError("请填写邮箱和密码");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left: Hero Image */}
      <div
        className="hidden lg:flex lg:w-[55%] relative overflow-hidden"
      >
        <div
          className="absolute inset-0 ken-burns"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1600&q=80')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#08080c]/70 via-[#08080c]/40 to-[#08080c]" />

        {/* Content on hero */}
        <div className="relative z-10 flex flex-col justify-end p-[clamp(2rem,4vw,5rem)] pb-[clamp(3rem,6vh,5rem)]">
          <div className="flex items-center gap-3 mb-5">
            <span className="w-8 h-px bg-gold" />
            <span className="text-[0.7rem] font-medium tracking-[0.2em] uppercase text-gold">
              FDSM Photo Club
            </span>
          </div>
          <h2 className="font-serif text-[clamp(1.6rem,3vw,2.4rem)] font-bold leading-snug max-w-[420px] text-white/90">
            每一张照片
            <br />
            都值得被看见
          </h2>
          <p className="text-[#7a7874] text-[0.88rem] mt-3 max-w-[360px] leading-relaxed">
            登录复旦MBA摄影协会，与志同道合的伙伴一起探索光影的无限可能。
          </p>
        </div>

        {/* Corner branding */}
        <div className="absolute top-8 left-8 flex items-center gap-2">
          <div className="w-[5px] h-[5px] rounded-full bg-gold" />
          <span className="font-serif text-[0.95rem] font-bold tracking-wide text-white/80">
            复旦 MBA 摄影协会
          </span>
        </div>
      </div>

      {/* Right: Login Form */}
      <div className="flex-1 lg:w-[45%] flex flex-col justify-center px-[clamp(1.5rem,5vw,4rem)] py-12 bg-[#08080c]">
        {/* Mobile logo */}
        <div className="lg:hidden flex items-center gap-2 mb-10">
          <div className="w-[5px] h-[5px] rounded-full bg-gold" />
          <span className="font-serif text-[1rem] font-bold tracking-wide">复旦 MBA 摄影协会</span>
        </div>

        {/* Header */}
        <div className="mb-10">
          <h1 className="font-serif text-[1.8rem] font-bold mb-2">欢迎回来</h1>
          <p className="text-[#7a7874] text-[0.9rem]">
            登录你的账号，继续创作之旅
          </p>
        </div>

        {/* Error */}
        {error && (
          <div className="mb-6 px-4 py-3 rounded-md bg-[rgba(229,77,77,0.08)] border border-[rgba(229,77,77,0.2)] text-[#e54d4d] text-[0.82rem]">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-[0.78rem] font-medium text-[#7a7874] mb-2 tracking-wide">
              邮箱 / 手机号
            </label>
            <input
              id="email"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="请输入邮箱或手机号"
              className="w-full h-11 px-4 rounded-md border border-white/[0.08] bg-[#0e0e14] text-foreground text-[0.9rem] placeholder-[#4a4845] focus:outline-none focus:border-gold/50 focus:ring-1 focus:ring-gold/20 transition-all"
            />
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="block text-[0.78rem] font-medium text-[#7a7874] mb-2 tracking-wide">
              密码
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="请输入密码"
                className="w-full h-11 px-4 pr-11 rounded-md border border-white/[0.08] bg-[#0e0e14] text-foreground text-[0.9rem] placeholder-[#4a4845] focus:outline-none focus:border-gold/50 focus:ring-1 focus:ring-gold/20 transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#4a4845] hover:text-[#7a7874] transition-colors"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Remember + Forgot */}
          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 cursor-pointer group">
              <div
                onClick={() => setRemember(!remember)}
                className={`w-4 h-4 rounded border transition-all flex items-center justify-center cursor-pointer ${
                  remember
                    ? "bg-gold border-gold"
                    : "border-white/[0.15] hover:border-white/[0.3]"
                }`}
              >
                {remember && (
                  <svg className="w-3 h-3 text-[#08080c]" viewBox="0 0 12 12" fill="none">
                    <path d="M2.5 6L5 8.5L9.5 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </div>
              <span className="text-[0.78rem] text-[#7a7874] group-hover:text-[#a09e9a] transition-colors">
                记住我
              </span>
            </label>
            <Link
              href="#"
              className="text-[0.78rem] text-gold hover:text-[#d4b87a] transition-colors"
            >
              忘记密码？
            </Link>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full h-11 bg-gold text-[#08080c] rounded-md text-[0.82rem] font-semibold tracking-[0.06em] uppercase hover:bg-[#d4b87a] transition-all disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeDasharray="32" strokeDashoffset="32" className="text-[#08080c]/30" />
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeDasharray="32" strokeDashoffset="24" />
                </svg>
                登录中…
              </>
            ) : (
              "登录"
            )}
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center gap-4 my-8">
          <div className="flex-1 h-px bg-white/[0.06]" />
          <span className="text-[0.72rem] text-[#4a4845] tracking-wider">或</span>
          <div className="flex-1 h-px bg-white/[0.06]" />
        </div>

        {/* WeChat Login */}
        <button
          type="button"
          className="w-full h-11 rounded-md border border-white/[0.08] bg-[#0e0e14] text-[#7a7874] text-[0.82rem] font-medium tracking-[0.04em] hover:border-white/[0.15] hover:bg-[#131319] transition-all flex items-center justify-center gap-2.5"
        >
          {/* WeChat Icon */}
          <svg className="w-[18px] h-[18px]" viewBox="0 0 24 24" fill="currentColor">
            <path d="M9.5 4C5.36 4 2 6.69 2 10c0 1.89 1.08 3.56 2.78 4.66L4 17l2.5-1.18C7.55 16.27 8.5 16.5 9.5 16.5c.17 0 .33 0 .5-.02C9.68 15.99 9.5 15.51 9.5 15c0-3.04 2.69-5.5 6-5.5.17 0 .33.01.5.02C15.59 6.38 12.86 4 9.5 4zM7 9a1 1 0 110-2 1 1 0 010 2zm5 0a1 1 0 110-2 1 1 0 010 2zm2.5 3c-2.76 0-5 1.79-5 4s2.24 4 5 4c.83 0 1.61-.18 2.3-.48L20 21l-.62-2.06C20.55 17.92 21.5 16.58 21.5 15c0-2.21-2.24-4-5-4zm-1.5 4.5a.75.75 0 110-1.5.75.75 0 010 1.5zm3 0a.75.75 0 110-1.5.75.75 0 010 1.5z" />
          </svg>
          微信登录
        </button>

        {/* Footer */}
        <div className="mt-10 flex items-center justify-between text-[0.78rem]">
          <span className="text-[#4a4845]">
            还没有账号？
            <Link href="#" className="text-gold hover:text-[#d4b87a] ml-1 transition-colors">
              申请加入
            </Link>
          </span>
          <Link
            href="/"
            className="text-[#4a4845] hover:text-[#7a7874] transition-colors"
          >
            ← 返回首页
          </Link>
        </div>
      </div>
    </div>
  );
}
