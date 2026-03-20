"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);

    const checkAuth = () => setIsLoggedIn(localStorage.getItem("fdsm-auth") === "true");
    checkAuth();

    // Listen for storage changes (login from other tabs)
    window.addEventListener("storage", checkAuth);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("storage", checkAuth);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("fdsm-auth");
    localStorage.removeItem("fdsm-user");
    setIsLoggedIn(false);
  };

  const links = [
    { href: "/works", label: "作品" },
    { href: "/discover", label: "发现" },
    { href: "/events", label: "活动" },
    { href: "#about", label: "关于" },
    { href: "#members", label: "成员" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 h-16 flex items-center justify-between px-[clamp(1.5rem,4vw,4rem)] transition-all duration-500 ${
        scrolled
          ? "bg-[#08080c]/92 backdrop-blur-xl border-b border-white/[0.06]"
          : "bg-[#08080c]/60 backdrop-blur-xl border-b border-transparent"
      }`}
    >
      {/* Logo */}
      <Link href="/" className="flex items-center gap-2">
        <div className="w-[6px] h-[6px] rounded-full bg-gold" />
        <span className="font-serif text-[1.1rem] font-bold tracking-wide">
          复旦 MBA 摄影协会
        </span>
      </Link>

      {/* Desktop Links */}
      <div className="hidden md:flex items-center gap-10">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="text-[0.82rem] font-medium tracking-[0.06em] uppercase text-[#7a7874] hover:text-foreground transition-colors relative group"
          >
            {link.label}
            <span className="absolute -bottom-[2px] left-0 w-0 h-px bg-gold transition-all duration-300 group-hover:w-full" />
          </Link>
        ))}

        {isLoggedIn ? (
          <>
            <Link
              href="/profile/1"
              className="text-[0.78rem] font-medium tracking-[0.1em] uppercase text-[#7a7874] hover:text-foreground transition-colors"
            >
              个人主页
            </Link>
            <Link
              href="/upload"
              className="text-[0.78rem] font-medium tracking-[0.1em] uppercase text-gold border border-gold px-4 py-2 rounded-sm hover:bg-gold hover:text-[#08080c] transition-all"
            >
              发布作品
            </Link>
            <button
              onClick={handleLogout}
              className="text-[0.78rem] font-medium tracking-[0.1em] uppercase text-[#4a4845] hover:text-[#7a7874] transition-colors flex items-center gap-1.5"
            >
              <LogOut className="w-3.5 h-3.5" />
              退出
            </button>
          </>
        ) : (
          <Link
            href="/login"
            className="text-[0.78rem] font-medium tracking-[0.1em] uppercase text-gold border border-gold px-4 py-2 rounded-sm hover:bg-gold hover:text-[#08080c] transition-all"
          >
            登录
          </Link>
        )}
      </div>

      {/* Mobile Menu Button */}
      <Button
        variant="ghost"
        size="icon"
        className="md:hidden text-foreground"
        onClick={() => setMobileOpen(!mobileOpen)}
      >
        {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </Button>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="absolute top-16 left-0 right-0 bg-[#08080c]/95 backdrop-blur-xl border-b border-white/[0.06] md:hidden">
          <div className="flex flex-col items-center gap-6 py-8">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="text-sm font-medium tracking-widest uppercase text-[#7a7874] hover:text-foreground transition-colors"
              >
                {link.label}
              </Link>
            ))}
            {isLoggedIn ? (
              <>
                <Link href="/profile/1" onClick={() => setMobileOpen(false)} className="text-sm font-medium tracking-widest uppercase text-[#7a7874]">
                  个人主页
                </Link>
                <Link href="/upload" onClick={() => setMobileOpen(false)} className="text-sm font-medium tracking-widest uppercase text-gold border border-gold px-6 py-2 rounded-sm">
                  发布作品
                </Link>
                <button onClick={() => { handleLogout(); setMobileOpen(false); }} className="text-sm font-medium tracking-widest uppercase text-[#4a4845]">
                  退出
                </button>
              </>
            ) : (
              <Link href="/login" onClick={() => setMobileOpen(false)} className="text-sm font-medium tracking-widest uppercase text-gold border border-gold px-6 py-2 rounded-sm">
                登录
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
