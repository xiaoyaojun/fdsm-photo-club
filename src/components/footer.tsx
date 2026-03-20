import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-white/[0.06] px-[clamp(1.5rem,4vw,4rem)] py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
      <p className="text-[#4a4845] text-sm">
        &copy; 2024&ndash;2026 复旦MBA摄影协会 &middot; FDSM Photo Club
      </p>
      <div className="flex gap-8">
        {[
          { href: "#about", label: "关于我们" },
          { href: "#join", label: "加入协会" },
          { href: "#contact", label: "联系我们" },
          { href: "#privacy", label: "隐私政策" },
        ].map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="text-[#7a7874] text-sm hover:text-gold transition-colors"
          >
            {link.label}
          </Link>
        ))}
      </div>
    </footer>
  );
}
